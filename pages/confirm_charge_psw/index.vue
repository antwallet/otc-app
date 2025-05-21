<template>
	<view class="page flex-col">
		<u-navbar :fixed="true" :safeAreaInsetTop="false" bgColor="#fff" style="position: relative;z-index: 999;">
			<view class="u-nav-slot fl_al" slot="left" style="color: #f0614f;font-weight: 600;" @click="goHome">
			</view>
			<view class="u-nav-slot" style="color: #333;font-size: 32rpx;font-weight: bold;" slot="center">
				{{i18n.chargePsw.title3}}
			</view>
		</u-navbar>
		<view class="" style="height: 88rpx;">
		</view>
		<view class="group_1 flex-row">
			<view class="section_5 flex-col">
				<view class="section_6 flex-col"><span class="text_2">{{i18n.chargePsw.text4}}</span></view>
				<view class="section_7 flex-col">
					<view class="section_8">
						<u-code-input v-model="chargeConfirmPassword" mode="box" :dot="show" @showDot="showDot" hairline
							:space="2" :maxlength="6" :focus="true" :disabledDot="true" :size="40"
							@finish="chargeConfirmPasswordFinish"></u-code-input>
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
	import CryptoJS from 'crypto-js'; // 导入加密库
	import {
		resetChargePsw
	} from '@/api/set_charge_psw.js';
	import {
		packetgiftbot
	} from "@/utils/util.js";
	import {
		handleUserPayment
	} from "@/api/sendpacket.js";
	import {
		applyTronWithdrawMoney,
		handleUserBuyEnergy,
		handleUserBuyPremium
	} from '@/api/withdrawal.js';
	import {
		getUserInfo,
	} from '@/api/index.js';
	export default {
		data() {
			return {
				showConfirmVisible: false,
				chargePassword: '',
				chargeConfirmPassword: '',
				type: '',
				error: true,
				show: true,
				tronWithdrawMoneyData: {}, //提现
				subscribeToData: {}, //收款
				psd: ''
			};
		},
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		onLoad(options) {
			console.log(options)
			this.chargePassword = uni.getStorageSync('chargePassword')
			if (options.type) {
				this.type = options.type
			}
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('tronWithdrawMoneyData', (data) => {
				this.tronWithdrawMoneyData = data;
				console.log(this.tronWithdrawMoneyData)
			})
			eventChannel.on('subscribeToData', (data) => {
				this.subscribeToData = data;
				console.log(this.subscribeToData)
			})
			if (window.Telegram) {
				Telegram.WebApp.BackButton.show(); // 显示返回按钮
				Telegram.WebApp.BackButton.onClick(() => {
					// 处理返回逻辑
					uni.navigateTo({
						url: '/pages/charge_psw/set_index?type=' + this.type
					})
				});
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.chargePsw.title3
			});
		},
		methods: {
			// 查看密码事件
			showDot(e) {
				console.log(e)
				this.show = e
				this.$forceUpdate();
			},
			// 事件回调
			resetChargePsw: function(chargePsw) {
				resetChargePsw(chargePsw).then(result => {
					this.$refs.uToast.success(this.i18n.page.text13)
					this.$store.dispatch('changeRechargeAmount', true);
					console.log(this.type, 'this.type')
					// 延迟一段时间后执行操作
					setTimeout(() => {
						uni.removeStorageSync('chargePassword')
						if (this.type == 'my') {
							uni.redirectTo({
								url: '/pages/user/index'
							});
						} else if (this.type == 'market') {
							uni.redirectTo({
								url: '/pages/market/index'
							});
						} else if (this.type == 'send') {
							var user = uni.getStorageSync('user')
							user.setChargePsw = true
							uni.setStorageSync('user', user)
							// setChargePsw
							uni.redirectTo({
								url: '/pages/sendpacket/index'
							});
						} else if (this.type == 'withdrawal') {
							// uni.redirectTo({
							// 	url: '/pages/withdrawal/index'
							// });
							this.applyTronWithdrawMoney()
						} else if (this.type == 'subscribeTo') {
							this.subscribeToClick()
						}

					}, 2000); // 2000 毫秒，即 2 秒后执行操作
				}).catch(errors => {
					this.$refs.uToast.error(errors.msg)
					this.chargeConfirmPassword = ''
					setTimeout(() => {
						uni.navigateBack()
					}, 2000); // 2000 毫秒，即 2 秒后执行操作
				})
			},
			// 客服
			kefu() {
				location.href = packetgiftbot()
			},
			// 收款
			subscribeToClick() {
				handleUserPayment(this.subscribeToData.tronTransId, this.subscribeToData.shareUserId, this.psd).then(
					result => {
						this.$refs.uToast.success(this.i18n.page.text9)
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/index/subscribeTo'
							})
						}, 1000); // 2000 毫秒，即 2 秒后执行操作
					}).catch(errors => {
					this.$refs.uToast.error(errors.msg)
					// 延迟一段时间后执行操作
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/index/subscribeTo'
						});
					}, 2000); // 2000 毫秒，即 2 秒后执行操作
				})
			},
			// 提现
			applyTronWithdrawMoney() {
				this.tronWithdrawMoneyData.chargePsw = this.psd
				console.log(this.tronWithdrawMoneyData);
				applyTronWithdrawMoney(this.tronWithdrawMoneyData).then(res => {
					this.$refs.uToast.success(this.i18n.page.text10)
				}).catch(errors => {
					this.$refs.uToast.error(errors.msg)
				}).finally(() => {
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/index/index'
						});
					}, 2000); // 2000 毫秒，即 2 秒后执行操作
				})
			},
			// 重置
			chongzhi() {
				getUserInfo().then(res => {
					this.chargeConfirmPassword = ''
				}).catch(errors => {
					this.chargeConfirmPassword = ''
				});
			},
			// 字符转换
			chargeConfirmPasswordFinish(e) {
				console.log(this.type)
				// 大写字母转小写
				this.chargeConfirmPassword = this.chargeConfirmPassword.toLowerCase()
				let hexPassword = CryptoJS.SHA256(this.chargeConfirmPassword).toString(CryptoJS.enc.Hex);
				if (this.chargePassword === hexPassword) {
					let psd = this.AES.encrypt(this.chargeConfirmPassword, '94E113C6A898CD39', '94E113C6A898CD39')
					this.resetChargePsw(psd);
					this.psd = psd
				} else {
					this.$refs.uToast.error(this.i18n.page.text37)
					this.chongzhi()
				}
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