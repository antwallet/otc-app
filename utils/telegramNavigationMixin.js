// 这个 mixin 可以在所有需要控制返回按钮的页面中使用
const telegramNavigationMixin = {
	data() {
		return {
			backButtonHandler: null,
			isRootPage: false // 标记是否为根页面（如 index 页面）
		}
	},
	onLoad() {
		// 检查当前页面是否为根页面
		const pages = getCurrentPages();
		this.isRootPage = pages.length === 1;
		this.setupBackButton();
	},
	onShow() {
		this.ensureBackButtonVisibility();
	},
	onHide() {
		this.removeBackButtonHandler();
	},
	onUnload() {
		this.removeBackButtonHandler();
	},
	methods: {
		setupBackButton() {
			if (window.Telegram && window.Telegram.WebApp) {
				this.removeBackButtonHandler();

				this.backButtonHandler = () => {
					console.log('返回按钮被点击');
					this.handleBackNavigation();
				};

				window.Telegram.WebApp.onEvent('backButtonClicked', this.backButtonHandler);

				if (!this.isRootPage) {
					window.Telegram.WebApp.BackButton.show();
				} else {
					window.Telegram.WebApp.BackButton.hide();
				}

				console.log('返回按钮设置完成，isRootPage:', this.isRootPage);
			}
		},
		handleBackNavigation() {
			const pages = getCurrentPages();
			console.log('当前页面栈:', pages.map(p => p.route));

			if (this.isRootPage || pages.length === 1) {
				console.log('尝试关闭 WebApp');
				if (window.Telegram && window.Telegram.WebApp) {
					window.Telegram.WebApp.close();
				}
			} else {
				console.log('尝试返回上一页');
				uni.navigateBack({
					delta: 1,
					fail: (err) => {
						console.error('返回上一页失败:', err);
						this.navigateToIndex();
					}
				});
			}
		},
		navigateToIndex() {
			console.log('尝试跳转到首页');
			uni.reLaunch({
				url: '/pages/index/index',
				success: () => {
					console.log('成功跳转到首页');
				},
				fail: (err) => {
					console.error('跳转到首页失败:', err);
				}
			});
		},
		ensureBackButtonVisibility() {
			if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.BackButton) {
				if (this.isRootPage) {
					window.Telegram.WebApp.BackButton.hide();
				} else if (!window.Telegram.WebApp.BackButton.isVisible) {
					window.Telegram.WebApp.BackButton.show();
				}
			}
		},
		removeBackButtonHandler() {
			if (window.Telegram && window.Telegram.WebApp) {
				window.Telegram.WebApp.offEvent('backButtonClicked', this.backButtonHandler);
				this.backButtonHandler = null;
				console.log('返回按钮处理程序已移除');
			}
		}
	}
};