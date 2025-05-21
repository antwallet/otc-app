// / 创建一个全局事件管理器
const EventBus = {
	events: {},
	subscribe(event, callback) {
		if (!this.events[event]) this.events[event] = [];
		this.events[event].push(callback);
	},
	publish(event, data) {
		if (!this.events[event]) return;
		this.events[event].forEach(callback => callback(data));
	}
};

// 全局返回按钮管理
const BackButtonManager = {
	isTabbarPage: false,

	init() {
		document.addEventListener('DOMContentLoaded', () => {
			this.setupBackButton();
			this.saveCurrentPageToHistory();
		});

		// 监听路由变化（如果使用了前端路由）
		// 这里使用 popstate 事件作为示例，实际使用时可能需要根据您的路由库进行调整
		window.addEventListener('popstate', () => {
			this.setupBackButton();
			this.saveCurrentPageToHistory();
		});
	},

	setupBackButton() {
		if (this.isTabbarPage) {
			Telegram.WebApp.BackButton.hide();
		} else if (window.history.length > 1) {
			Telegram.WebApp.BackButton.show();
			Telegram.WebApp.BackButton.onClick(() => {
				EventBus.publish('backButtonClicked');
				window.history.back();
			});
		} else {
			Telegram.WebApp.BackButton.hide();
		}
	},

	saveCurrentPageToHistory() {
		const currentPage = window.location.href;
		sessionStorage.setItem('previousPage', currentPage);

		// 检查是否是页面刷新
		if (sessionStorage.getItem('previousPage') === currentPage) {
			// 如果是刷新，手动添加一个历史记录
			window.history.pushState(null, '', currentPage);
		}
	},

	setTabbarPage(isTabbar) {
		this.isTabbarPage = isTabbar;
		this.setupBackButton();
	}
};

// 初始化返回按钮管理器
BackButtonManager.init();