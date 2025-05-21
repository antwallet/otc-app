<!-- InteractiveAd.vue -->
<template>
	<view class="ad-container" :style="show ? '':'filter: grayscale(100%);'">
		<view class="chakan fl_al" @tap="handleShowAd" :disabled="!sdkReady || loading"
			:class="{'btn-disabled': !sdkReady || loading}"  v-if="sendLotteryCount">
			<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/ticket.png"
				style="width: 44rpx;height: 40rpx;margin-left: 10rpx;" mode="">
			</image>
			<view class="" style="margin-top: 5rpx;margin-left: 5rpx;">
				+{{sendLotteryCount}}
			</view>
		</view>
		<!-- 		<button>
			{{ buttonText }}
		</button> -->
	</view>
</template>

<script>
	export default {
		name: 'InteractiveAd',
		props: {
			zoneId: {
				type: Number,
				required: true
			},
			publisherId: {
				type: Number,
				required: true
			},
			sendLotteryCount: {
				type: Number,
				required: true
			},
			userInfo: {
				type: Object,
				default: () => ({
					userId: '',
					firstName: '',
					lastName: '',
					userName: ''
				})
			},
			appVersion: {
				type: String,
				default: ''
			}
		},

		data() {
			return {
				sdkReady: false,
				loading: false,
				initTimeout: null,
				show: true
			}
		},

		computed: {
			buttonText() {
				if (this.loading) return '加载中...'
				if (!this.sdkReady) return 'SDK初始化中...'
				return '显示广告'
			}
		},

		methods: {
			async checkSDKStatus() {
				const sdkStatus = uni.getStorageSync('sdkLoaded');
				console.log('当前SDK状态:', sdkStatus);

				if (!window.openADJsSDK) {
					console.log('SDK未加载，尝试重新加载');
					await this.$loadOpenAdSDK();
				}
			},
			// 初始化SDK - 使用Vue原型上的方法
			async initSDK() {
				try {
					let retryCount = 0
					const maxRetries = 3

					while (retryCount < maxRetries) {
						console.log(`尝试初始化SDK: 第${retryCount + 1}次`)

						const sdkLoaded = await this.$loadOpenAdSDK()
						if (sdkLoaded && window.openADJsSDK?.interactive) {
							console.log('SDK初始化成功')
							this.sdkReady = true
							return true
						}

						retryCount++
						if (retryCount < maxRetries) {
							console.log('SDK未就绪，等待1秒后重试...')
							await new Promise(resolve => setTimeout(resolve, 1000))
						}
					}

					console.error(`SDK初始化失败: 已重试${maxRetries}次`)
					this.sdkReady = false
					return false
				} catch (error) {
					console.error('初始化SDK出错:', error)
					this.sdkReady = false
					return false
				}
			},

			// 初始化广告
			async initAd() {
				if (!this.sdkReady) {
					console.warn('SDK未就绪，无法初始化广告')
					return false
				}

				try {
					const adParams = {
						version: this.appVersion,
						TG: {
							type: 'noSDK',
							FN: null
						}
					}

					const adInfo = {
						zoneId: this.zoneId,
						publisherId: this.publisherId,
						eventId: 0,

					}

					const res = await window.openADJsSDK.interactive.init({
						adParams,
						adInfo,
						userInfo: this.userInfo
					})

					console.log('广告初始化结果:', res)
					return res.code === 0
				} catch (error) {
					console.error('广告初始化失败:', error)
					return false
				}
			},

			// 显示广告
			showAd() {
				const adInfo = {
					zoneId: this.zoneId,
					publisherId: this.publisherId,
					eventId: 0
				}
				let tgBackButton = window.Telegram?.WebApp?.BackButton;
				const callbackFunc = {
					adResourceLoad: (e) => {
						console.log('广告资源加载:', e)
						this.$emit('adResourceLoad', e)
						this.loading = false
					},
					adOpening: (e) => {
						console.log('广告开始打开:', e)
						this.$emit('adOpening', e)
					},
					adOpened: (e) => {
						console.log('广告已打开:', e)
						// this.$emit('adOpened', e)
						// 广告打开时创建返回按钮
						// 使用 Telegram BackButton
						// 使用 Telegram BackButton
						if (window.Telegram?.WebApp) {
							const tg = window.Telegram.WebApp;

							// 定义返回处理函数
							const handleBackButton = () => {
								console.log('返回按钮被点击');
								// 移除当前监听器
								tg.onEvent('backButtonClicked', handleBackButton);
								// 启用返回按钮
								tg.enableClosingConfirmation();
								// // 主动关闭 WebApp

								// 跳转页面
								Telegram.WebApp.openTelegramLink(
									'https://t.me/grab_redpacket_bot/redpacket_manage?startapp=tKtHraxOpqOHKUZbB1yC'
								)
								tg.close();
							};

							// 添加返回按钮监听器
							tg.onEvent('backButtonClicked', handleBackButton);
							// 显示返回按钮
							tg.BackButton.show();
						}
					},
					adTaskFinished: (e) => {
						console.log('广告任务完成:', e)
						this.$emit('adTaskFinished', e)
					},
					adClosing: (e) => {
						console.log('广告关闭中:', e)
						// 确保广告关闭时隐藏返回按钮
						if (window.Telegram?.WebApp) {
							const tg = window.Telegram.WebApp;
							// 清理所有事件监听
							tg.offEvent('backButtonClicked');
							// 隐藏返回按钮
							tg.BackButton.hide();
						}

						clearTimeout(this.initTimeout)
						this.initTimeout = setTimeout(() => {
							this.initAd()
						}, 500)

						this.$emit('adClosing', e)
					},
					adClosed: async (e) => {
						console.log('广告已关闭:', e)
						this.$emit('adClosed', e)
						// 广告关闭后重新初始化
						clearTimeout(this.initTimeout)
						this.initTimeout = setTimeout(() => {
							this.initAd()
						}, 500)
					},
					// 点击广告回调按钮
					adClick: (e) => {
						console.log('广告点击:', e)
						this.$emit('adClick', e)
					}
				}

				window.openADJsSDK.interactive.getRender({
					adInfo,
					cb: callbackFunc
				})
			},

			// 处理显示广告
			async handleShowAd() {
				if (this.loading || !this.sdkReady) return

				this.loading = true
				try {
					const initialized = await this.initAd()
					if (initialized) {
						this.showAd()
					} else {
						this.loading = false
						this.show = false
						uni.showToast({
							title: '今日广告次数以用完',
							icon: 'none'
						})
					}
				} catch (error) {
					this.loading = false
					console.error('显示广告失败:', error)
				}
			}
		},



		async mounted() {
			await this.checkSDKStatus();
			await this.initSDK()
			if (this.sdkReady) {
				await this.initAd()
			}
		},

		beforeDestroy() {
			if (window.Telegram?.WebApp) {
				const tg = window.Telegram.WebApp;
				tg.offEvent('backButtonClicked');
				tg.BackButton.hide();
			}
			clearTimeout(this.initTimeout)
		}
	}
</script>

<style scoped>
	.chakan {
		position: relative;
		z-index: 1;
		cursor: pointer;
		background: linear-gradient(180deg, #F5DCA2 0%, #E9BB5E 100%);
		color: #593300;
		border-radius: 40rpx;
		padding: 14rpx 30rpx;
		box-sizing: border-box;
		font-weight: 600;
	}


	/* 添加触摸反馈 */
	.chakan:active {
		opacity: 0.8;
	}
</style>