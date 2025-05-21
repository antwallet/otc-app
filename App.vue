<script>
	import {
		CreationDate
	} from "@/utils/TelegramCreationDatePredictor.js"; //计算注册时间
	import {
		HTTP_REQUEST_URL
	} from './config/app';
	import {
		getUrlParam,
		aseDecrypt
	} from "./utils/util.js"; //获取网址参数
	import store from "@/store/index.js";
	import {
		getOriginalData,
	} from '@/api/group_receive_redpacket.js'; //获取网链入参
	import {
		loginUser,
	} from '@/api/user.js'; //login接口
	import {
		setTokenLocal,
		getTokenLocal
	} from "@/utils/localData.js"; //存/取token
	import {
		getUserInfo, //获取用户信息
		queryUserInfo, //获取拼多多活动参与资格
		recordTaskInfo //初始化拼多多
	} from '@/api/index.js';
	import gaMixin from '@/components/ga.js'; // 引入公共脚本
	export default {
		mixins: [gaMixin],
		globalData: {
			spid: 0,
			code: 0,
			isLogin: false,
			userInfo: {},
			MyMenus: [],
		},
		data() {
			return {
				networkType: ''
			}
		},
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		onLoad() {

		},

		onUnload() {},
		onLaunch: function(option) {
			// 在小程序启动时，设置一个标志表示需要显示 loading
			uni.setStorageSync('needShowLoading', true)
			if (uni.getStorageSync('i18n')) {
				this._i18n.locale = uni.getStorageSync('i18n')
			} else {
				const userLanguage = Telegram.WebApp.initDataUnsafe.user.language_code;
				uni.setStorageSync('userLanguage', userLanguage)
				console.log(userLanguage, 'userLanguage')
				if (userLanguage == 'zh-hans') {
					this._i18n.locale = 'zh-CN'
					uni.setStorageSync('i18n', 'zh-CN')
				} else if (userLanguage == 'ru') {
					this._i18n.locale = 'ru-RU'
					uni.setStorageSync('i18n', 'ru-RU')
				} else {
					this._i18n.locale = 'en-US'
					uni.setStorageSync('i18n', 'en-US')
				}
			}
			// 

			// 禁用右键菜单+禁用 F12
			document.oncontextmenu = () => false;
			// document.onkeydown = (e) => {
			// 	if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
			// 		return false;
			// 	}

			// 	// 禁用 Ctrl + Shift + C
			// 	if (e.ctrlKey && e.shiftKey && e.key === 'C') {
			// 		return false;
			// 	}
			// 	// 禁用 Ctrl + Shift + J
			// 	if (e.ctrlKey && e.shiftKey && e.key === 'J') {
			// 		return false;
			// 	}
			// 	// 禁用 Ctrl + U (查看源代码)
			// 	if (e.ctrlKey && e.key === 'U') {
			// 		return false;
			// 	}
			// }
			let that = this;
			// #ifdef MP
			if (HTTP_REQUEST_URL == '') {
				console.error(
					"请配置根目录下的config.js文件中的 'HTTP_REQUEST_URL'\n\n请修改开发者工具中【详情】->【AppID】改为自己的Appid\n\n请前往后台【小程序】->【小程序配置】填写自己的 appId and AppSecret"
				);
				return false;
			}
			if (option.query.hasOwnProperty('scene')) {
				switch (option.scene) {
					//扫描小程序码
					case 1047:
						let val = that.$util.getUrlParams(decodeURIComponent(option.query.scene));
						that.globalData.code = val.pid;
						break;
						//长按图片识别小程序码
					case 1048:
						that.globalData.code = option.query.scene;
						break;
						//手机相册选取小程序码
					case 1049:
						that.globalData.code = option.query.scene;
						break;
						//直接进入小程序
					case 1001:
						that.globalData.spid = option.query.scene;
						break;
				}
			}
			// #endif
			// 获取导航高度；
			uni.getSystemInfo({
				success: function(res) {
					that.globalData.navHeight = res.statusBarHeight * (750 / res.windowWidth) + 91;
				}
			});
		},
		created() {
			// this.fetchData().then(() => {
			// 	// 假设fetchData是一个返回Promise的异步函数  
			// 	this.$store.commit('setAppReady'); // 异步操作完成后，修改状态  
			// });
		},
		mounted() {},
		methods: {
			// 识别当前是pc还是移动端
			detectDevice() {
				if (window.Telegram && window.Telegram.WebApp) {
					const webApp = window.Telegram.WebApp;

					// 检查是否支持触摸
					const isTouchCapable = ('ontouchstart' in window) ||
						(navigator.maxTouchPoints > 0) ||
						(navigator.msMaxTouchPoints > 0);

					// 检查平台信息
					const platform = webApp.platform;

					uni.setStorageSync('platform', platform)
					// 检查是否可以扩展视图（通常在桌面端可用）
					const canExpand = webApp.isExpanded !== undefined && !webApp.isExpanded;

					// 检查是否支持主按钮（通常在移动端更常见）
					const hasMainButton = webApp.MainButton && webApp.MainButton.isVisible;

					if (platform === 'android' || platform === 'ios' || platform === 'wphone') {
						return 'Mobile App';
					} else if (platform === 'tdesktop' || platform === 'macos' || platform === 'windows') {
						return 'Desktop App';
					} else if (platform === 'web') {
						if (isTouchCapable && !canExpand) {
							return 'Mobile Browser';
						} else if (!isTouchCapable || canExpand) {
							return 'Desktop Browser';
						}
					}
				}
				// 如果无法确定，返回 Unknown
				return 'Unknown';
			},
			showTelegramBackButton() {
				if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.BackButton) {
					window.Telegram.WebApp.BackButton.show()
				}
			},
			setCustomTheme() {
				Telegram.WebApp.setHeaderColor('#fff');
				Telegram.WebApp.setBackgroundColor('#fff');
			},
			// 正则获取设备信息
			parseUserAgent(ua) {
				const regex = /\((.*?)\)/;
				const match = ua.match(regex);
				if (match && match[1]) {
					return match[1];
				}
				return [];
			},
			// 标准时间转换
			formatDateForBackend(dateString) {
				const date = new Date(dateString * 1000);

				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const day = String(date.getDate()).padStart(2, '0');

				return `${year}/${month}/${day}`;
			},
			// 随机头像背景
			setRandomGradient() {
				const randomColor = () => {
					const r = Math.floor(Math.random() * 256);
					const g = Math.floor(Math.random() * 256);
					const b = Math.floor(Math.random() * 256);
					return `rgba(${r}, ${g}, ${b}, 1)`;
				};
				const color1 = randomColor();
				const color2 = randomColor();
				const color3 = randomColor();
				const color4 = randomColor();

				const gradient = `linear-gradient(45deg, ${color1} 0%, ${color2} 33%, ${color3} 66%, ${color4} 100%)`;
				return gradient;
			},
			// 获取用户信息
			runSomeCode() { //这个要走在share那个前面
				getUserInfo().then(res => {
					if (res.data && res.data.code === 0) {
						var data = res.data.userInfo
						data.gradient = this.setRandomGradient()
						uni.setStorageSync('user', data)
						uni.setStorageSync('isSetChargePsw', res.data.userInfo.setChargePsw)
						this.$store.dispatch('changeRechargeAmount', res.data.userInfo.setChargePsw);
					}
				}).catch(errors => {});
			},
			// 根据状态跳转
			chushihua() {
				// let tgWebAppStartParam = aseDecrypt(getUrlParam('tgWebAppStartParam', null)) //获取tgWebAppStartParam
				let tgWebAppSurl = getUrlParam('tgWebAppStartParam', null) //获取tgWebAppStartParam
				uni.setStorageSync('tgWebAppStartParam', tgWebAppSurl)
				if (tgWebAppSurl) {
					const new_token = getTokenLocal();
					var redpacketId;
					getOriginalData(tgWebAppSurl).then(res => {
						if (res.data && res.data.code === 0) {
							redpacketId = res.data.data
							if (redpacketId) {
								// 个人
								if (redpacketId.startsWith('single_redpacket')) {
									uni.navigateTo({
										url: `/pages/single_receive_redpacket/index?token=${new_token}&redpacketId=${redpacketId}`
									})
									// 群组
								} else if (redpacketId.startsWith('group_redpacket')) {
									uni.navigateTo({
										url: `/pages/group_receive_redpacket/index?token=${new_token}&redpacketId=${redpacketId}`
									})
									// 活动
								} else if (redpacketId.startsWith('share_redpacket')) {
									let redpacketId_arr = redpacketId.split(":")
									if (redpacketId_arr.length != 3) {
										uni.showToast({
											title: '领取红包失败',
											icon: 'error',
											duration: 2000
										});
									}
									uni.navigateTo({
										url: `/pages/group_receive_redpacket/share_condition?token=${new_token}&redpacketId=${redpacketId_arr[0]}&activityId=${redpacketId_arr[1]}&shareUserId=${redpacketId_arr[2]}`
									})
								} else if (redpacketId == 'account_balance_details') {
									uni.navigateTo({
										url: '/pages/index/assets'
									})
								} else if (redpacketId == 'personal_center') {
									uni.navigateTo({
										url: '/pages/user/index'
									})
								} else if (redpacketId == 'charge_psw') {
									uni.navigateTo({
										url: '/pages/charge_psw/set_index?type=my'
									})
								} else if (redpacketId.startsWith('premium_buy_')) {
									uni.navigateTo({
										url: '/pages/market/index'
									})
								} else if (redpacketId.startsWith('tron_trans_')) {
									let redpacketId_arr = redpacketId.split(":")
									uni.navigateTo({
										url: `/pages/index/subscribeTo?tronTransId=${redpacketId_arr[0]}&shareUserId=${redpacketId_arr[1]}`
									})
								} else if (redpacketId == 'lottery') {
									uni.navigateTo({
										url: `/pages/index/gambling`
									})
								} else if (redpacketId == 'sponsors') {
									uni.navigateTo({
										url: `/pages/group_receive_redpacket/redpacket_more`
									})
								} else if (redpacketId == 'pddWithdrawal') {
									uni.navigateTo({
										url: `/pages/premium_tonenergy/index`
									})
								} else {
									uni.showToast({
										title: '领取红包失败',
										icon: 'error',
										duration: 2000
									});
								}
							} else {
								uni.showToast({
									title: '领取红包失败',
									icon: 'error',
									duration: 2000
								});
							}
						}
					})
				} else {
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/index/index'
						});
					}, 1000);
				}
			},
			// 初始化2-1
			yaoyiyao(redpacket, activityId, shareUserId) {
				recordTaskInfo({
					step: 2,
					taskStatus: 1,
					withdrawalType: '',
					inviteUserId: shareUserId || '',
					acvityId: activityId || '',
					redpacketId: redpacket || ''
				}).then(res => {
					if (res.data && res.data.code === 0) {
						uni.navigateTo({
							url: '/pages/single_receive_redpacket/market'
						})
					}
				}).catch(errors => {
					this.$refs.uToast.error(errors.data.msg)
				});
			},
			// 先看是不是满足pdd并且是第一次
			daicantiaozhuan() {
				queryUserInfo().then(res => {
					if (res.data && res.data.code === 0) {
						if (!res.data.data.hasPemission) {
							// 不满足拼多多
							this.chushihua()
						} else {
							// 满足拼多多，且第一次参与
							if (res.data.data.step == 0) {
								let tgWebAppSurl = getUrlParam('tgWebAppStartParam', null) //获取tgWebAppStartParam
								uni.setStorageSync('tgWebAppStartParam', tgWebAppSurl)
								// 被人邀请进入miniapp
								if (tgWebAppSurl) {
									var redpacketId;
									const new_token = getTokenLocal();
									getOriginalData(tgWebAppSurl).then(res => {
										if (res.data && res.data.code === 0) {
											redpacketId = res.data.data
											if (redpacketId) {
												if (redpacketId.startsWith('share_redpacket')) {
													let redpacketId_arr = redpacketId.split(":")
													if (redpacketId_arr.length != 3) {
														uni.showToast({
															title: '领取红包失败',
															icon: 'error',
															duration: 2000
														});
													}
													uni.navigateTo({
														url: `/pages/group_receive_redpacket/share_condition?token=${new_token}&redpacketId=${redpacketId_arr[0]}&activityId=${redpacketId_arr[1]}&shareUserId=${redpacketId_arr[2]}`
													})
												} else {
													this.yaoyiyao()
												}
											}
										}
									})
								} else {
									// 自己进入miniapp
									this.yaoyiyao()
								}

							}
						}

					}
				}).catch(errors => {});

			},
			// 这里是根据各种场景进入小程序直接跳指定页面
			getTgWebAppStartParam() {
				//小程序下拉不会关闭
				// window.Telegram.WebApp.isVerticalSwipesEnabled = false;
				window.Telegram.WebApp.disableVerticalSwipes()
				// 控制webapp主题颜色不被Telegram黑主题影响
				document.body.style.backgroundColor = '#fff';
				this.setCustomTheme()
				// 禁用下滑关闭
				window.Telegram.WebApp.disableClosingConfirmation();
				// 请求将小程序展开到全屏模式
				window.Telegram.WebApp.expand();
				const user = window.Telegram.WebApp.initDataUnsafe.user;
				var initData = Telegram.WebApp.initData
				const isPremium = user.is_premium || false
				const name = user.first_name + user.last_name
				const userAgent = navigator.userAgent;
				const parsed = this.parseUserAgent(userAgent);
				const deviceModel = parsed //设备信息
				var date = CreationDate(user.id) //tg注册时间
				const registrationDate = this.formatDateForBackend(date[1])
				var networkType = '';
				uni.getNetworkType({
					success: (res) => {
						networkType = res.networkType // wifi/2g/3g/4g/5g/unknown/none
					},
					fail: () => {
						resolve({
							type: 'unknown',
							timestamp: Date.now()
						})
					}
				})
				// 获取网络速度
				const getNetworkSpeed = () => {
					const startTime = Date.now()
					// 使用小文件测速(建议使用自己的文件地址)
					const testUrl = 'https://www.w3.org/TR/html4/loose.dtd'

					const result = uni.downloadFile({
						url: testUrl,
					})
					const endTime = Date.now()
					const duration = endTime - startTime // 耗时(ms)
					// 获取下载文件大小(字节)
					const bytes = 45434

					// 计算速度(kb/s)
					const speed = (bytes / 1024 / 1024) / (duration / 1000)
					var sudu = {
						speed: speed.toFixed(2),
						unit: 'mb/s',
						timestamp: endTime
					}
					return speed.toFixed(2) + 'mb/s'
				}
				loginUser({
					userTGID: user.id,
					firstName: user.first_name,
					userName: user.username,
					data: initData,
					deviceModel: deviceModel,
					isPremium: isPremium || false, //是否是会员
					registrationDate: registrationDate,
					resolution: `${window.screen.width}x${window.screen.height}`,
					networkType: networkType,
					networkStatus: getNetworkSpeed()
				}).then(res => {
					if (res.data && res.data.code === 0) {
						const token = res.data.token
						uni.setStorageSync('isopen', true)
						this.$store.commit('user/tokenFun', token)
						setTokenLocal(token || '') //放在本地缓存
						uni.$emit('appMethodCompleted');
						// 获取个人信息
						this.runSomeCode()
						this.daicantiaozhuan()
					}
				}).catch(errors => {
					uni.showToast({
						title: errors.msg,
						icon: 'none',
						duration: 2000
					});
				});
			}
		},
		onShow: function() {
			console.log("👍👍我是app.vue页面");
			uni.$on('callAppMethod', this.getTgWebAppStartParam)
		},
		onHide: function() {
			// 当小程序隐藏时，也设置标志为 true，这样下次打开时也会显示 loading
			uni.setStorageSync('needShowLoading', true)
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import url("@/plugin/animate/animate.min.css");
	@import 'static/css/common.css';

	/* 条件编译，仅在H5平台生效 */
	body::-webkit-scrollbar,
	html::-webkit-scrollbar {
		display: none;
	}

	view {
		box-sizing: border-box;
	}

	.btnGg {
		border: none;
		cursor: pointer;
		outline: none;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		/* transition: background-color 0.3s; */
	}

	.error-message {
		font-size: 30rpx;
		position: absolute;
		left: 0;
		right: 0;
		top: 50rpx;
		z-index: 100;
		text-align: center;
		color: #000000;
		opacity: 0;
		animation: fadeIn 0.5s ease-out 0.3s forwards;

		.shauxing {
			text-decoration: underline;
			margin: 0 10rpx;
			color: #f0614f;
			font-weight: 600;
			cursor: pointer;
		}


		@keyframes fadeIn {
			from {
				opacity: 0;
			}

			to {
				opacity: 1;
			}
		}
	}

	.btnGg:active {
		transform: scale(0.9);
		/* 点击时缩小 */
		box-shadow: 0 4px 8px rgba(252, 87, 95, 0.2);
		/* 添加阴影 */
	}

	.bg-color-red {
		background-color: #e93323 !important;
	}

	.u-tabbar__content__item-wrapper {
		height: 110rpx !important;
		padding-bottom: 20rpx;
	}

	.syspadding {
		padding-top: var(--status-bar-height);
	}

	.flex {
		display: flex;
	}

	.cu {
		font-weight: 600;
	}

	.fl_al {
		display: flex;
		align-items: center;
	}

	.fl_ju {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}


	.uni-scroll-view::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none
	}

	/deep/.uni-tabbar {
		padding-bottom: 10rpx !important;
	}

	.fl_jue {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}

	.fl_cen {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.fl_end {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.overlay {
		height: 100vh;
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}

	.fl_wl {
		display: flex;
		flex-wrap: wrap;
	}

	.fl_sw {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	ul {
		padding-left: 30rpx;
		margin: 0;
		/* 移除外边距 */
	}
</style>