<template>
	<view class="page flex-col">
		<u-navbar :fixed="true" :safeAreaInsetTop="false" bgColor="#fff" style="position: relative;z-index: 999;">
			<view class="u-nav-slot fl_al" slot="left" style="color: #f0614f;font-weight: 600;" @click="goHome">
			</view>
			<view class="u-nav-slot" style="color: #333;font-size: 32rpx;font-weight: bold;" slot="center">
				{{i18n.chargePsw.title}}
			</view>
		</u-navbar>
		<view class="" style="height: 88rpx;">
		</view>
<!-- 		<u-loading-page :loadingText="loadingPageData.loadingText" :loadingMode="loadingPageData.loadingMode"
			:loading="loading" :color="loadingPageData.color" :loadingColor="loadingPageData.loadingColor"> -->

		</u-loading-page>
		<view class="group_1 flex-row" v-if="isShow">
			<view class="section_5 flex-col">
				<view class="section_6 flex-col"><span class="text_2">{{i18n.chargePsw.text2}}</span></view>
				<view class="section_7 flex-col">
					<view class="section_8">
						<u-code-input v-model="chargePassword" mode="box" :dot="show" @showDot="showDot" :space="2"
							:maxlength="6" :focus="true" :disabledDot="true" :size="40"
							@finish="chargePasswordFinish"></u-code-input>
					</view>
				</view>
				<view class="tishi fl_cen">
					<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/jubao.png" mode=""></image>{{i18n.page.text34}}
				</view>
			</view>
		</view>
		<!-- 		<view class="kefu" @click="kefu">
			{{ i18n.my.tabs.title5}}
		</view> -->
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import {
		checkChargePsw
	} from '@/api/set_charge_psw.js';
	import {
		applyTronWithdrawMoney,
		handleUserBuyEnergy,
		handleUserBuyPremium,
		applyWithdrawal
	} from '@/api/withdrawal.js';
	import {
		packetgiftbot
	} from "@/utils/util.js";
	import {
		handleUserPayment
	} from '@/api/sendpacket.js';
	export default {
		data() {
			return {
				show: true,  //查看密码
				loading: false, // 控制加载效果显示与隐藏的变量
				isShow: true,  //二次密码切换
				chargePassword: '',  //密码值
				psd: '',  //密码加密
				tronWithdrawMoneyData: {},  //提现
				powerData: {}, //能量
				premiumData: {}, //会员
				subscribeToData: {}, //收款
				// loadingPageData: {
				// 	loadingMode: 'circle',
				// 	loadingText: "",
				// 	color: '#C8C8C8',
				// 	loadingColor: '#C8C8C8',
				// },
				type: ''  //从哪来回哪去
			};
		},
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		onShow() {
			// this.loadingPageData.loadingText = this.i18n.page.text32
			uni.setNavigationBarTitle({
				title: this.i18n.chargePsw.title
			});
			setTimeout(() => {
				window.Telegram.WebApp.MainButton.hide()
				this.showTelegramBackButton() // 再次尝试显示返回按钮
			}, 50)
		},
		onLoad(options) {
			if (options.type) {
				this.type = options.type
			}
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('tronWithdrawMoneyData', (data) => {
				this.tronWithdrawMoneyData = data;
			})
			eventChannel.on('powerData', (data) => {
				this.powerData = data;
			})
			eventChannel.on('premiumData', (data) => {
				this.premiumData = data;
			})
			eventChannel.on('subscribeToData', (data) => {
				this.subscribeToData = data;
				console.log(this.subscribeToData)
			})

			if (window.Telegram) {
				Telegram.WebApp.BackButton.show(); // 显示返回按钮
				Telegram.WebApp.BackButton.onClick(() => {
					// 处理返回逻辑
					if (this.type == 'market') {
						uni.navigateTo({
							url: '/pages/market/index'
						})
					} else if (this.type == 'withdrawal') {
						uni.navigateTo({
							url: '/pages/withdrawal/index'
						})
					} else if (this.type == 'subscribeTo') {
						uni.navigateTo({
							url: '/pages/index/subscribeTo'
						})
					}
				});
			}
		},

		methods: {
			// tg自带按钮
			showTelegramBackButton() {
				if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.BackButton) {
					window.Telegram.WebApp.BackButton.show()
				}
			},
			// 查看密码事件
			showDot(e) {
				this.show = e
				this.$forceUpdate();
			},
			// 密码完成回调
			checkChargePsw: function(chargePsw) {
				var pages = getCurrentPages(); // 当前页面
				var beforePage = pages[pages.length - 2]; // 前一个页面
				checkChargePsw(chargePsw).then(result => {
					console.log(result,'result')
					if (result.data && result.data.code === 0) {
						this.$refs.uToast.success(this.i18n.page.text8)
						this.showLoading();
						// 判断是从哪个页面跳转
						if (beforePage.route == 'pages/withdrawal/index') {
							// 提现
							this.applyTronWithdrawMoney()
						} else if (beforePage.route == 'pages/market/index') {
							if (this.powerData.energyType) {
								// 能量
								this.marketClick()
							} else {
								// 会员
								this.marketClickvpi()
							}
						} else if (beforePage.route == 'pages/index/subscribeTo') {
							this.subscrClick()
						} else {
							this.chargePassword = ''
						}
					}
				}).catch(errors => {
					console.log(errors, 'errors')
					this.$refs.uToast.error(errors)
					this.chargePassword = ''
				})
			},
			// 付款回调
			subscrClick() {
				console.log(this.subscribeToData)
				handleUserPayment(this.subscribeToData.tronTransId, this.subscribeToData.shareUserId, this.psd).then(
					result => {
						this.$refs.uToast.success(this.i18n.page.text9)
						setTimeout(() => {
							this.hideLoading();
							uni.setStorageSync('tank', 'yes')
							uni.navigateTo({
								url: '/pages/index/subscribeTo'
							})
						}, 1000); // 2000 毫秒，即 2 秒后执行操作
					}).catch(errors => {
					this.$refs.uToast.error(errors.data.msg)
					// 延迟一段时间后执行操作
					this.hideLoading()
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/index/subscribeTo'
						});
					}, 2000); // 2000 毫秒，即 2 秒后执行操作
				})
			},
			// 密码输入完回调
			chargePasswordFinish(e) {
				this.chargePassword = this.chargePassword.toLowerCase()
				console.log(this.chargePassword)
				this.psd = this.AES.encrypt(this.chargePassword, '94E113C6A898CD39', '94E113C6A898CD39')
				this.checkChargePsw(this.psd)
			},
			// 提现
			applyTronWithdrawMoney() {
				this.tronWithdrawMoneyData.chargePsw = this.psd
				console.log(this.tronWithdrawMoneyData);
				applyTronWithdrawMoney(this.tronWithdrawMoneyData).then(res => {
					this.$refs.uToast.success(this.i18n.page.text10)
				}).catch(errors => {
					this.$refs.uToast.error(errors.data.msg)
				}).finally(() => {
					this.hideLoading()
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/index/index'
						});
					}, 2000); // 2000 毫秒，即 2 秒后执行操作
				})
			},
			// 能量下单
			marketClick() {
				this.powerData.chargePassword = this.psd
				handleUserBuyEnergy(this.powerData).then(res => {
					this.$refs.uToast.success(res.data.message)
				}).catch(errors => {
					this.$refs.uToast.error(errors.data.msg)
				}).finally(() => {
					this.hideLoading()
					uni.removeStorage({
						key: 'powerData',
						success: function(res) {
							console.log('success');
						}
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/market/index'
						});
					}, 2000); // 2000 毫秒，即 2 秒后执行操作
				})
			},
			// 会员
			marketClickvpi() {
				handleUserBuyPremium(this.premiumData, this.psd).then(res => {
					this.$refs.uToast.success(res.data.msg)
				}).catch(errors => {
					this.$refs.uToast.error(errors.message)
				}).finally(() => {
					this.hideLoading()
					uni.removeStorage({
						key: 'premiumData',
						success: function(res) {
							console.log('success');
						}
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/market/index'
						});
					}, 2000); // 2000 毫秒，即 2 秒后执行操作
				})
			},
			// 客服
			kefu() {
				location.href = packetgiftbot()
			},
			showLoading() {
				this.loading = true; // 显示加载效果
				this.isShow = false;
			},
			hideLoading() {
				this.loading = false; // 隐藏加载效果
			}
		}
	};
</script>
<style lang="scss">
	@import '../../static/css/set_charge_psw/index.css';
	@import '../../static/css/common.css';

	.page {
		height: calc(100vh - 44px);
		background-color: #fff;
	}

	.tishi {
		font-size: 24rpx;
		margin-top: 100rpx;

		image {
			width: 30rpx;
			height: 30rpx;
			margin-right: 10rpx;
		}
	}
</style>