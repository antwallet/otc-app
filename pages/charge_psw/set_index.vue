<template>
	<view class="page flex-col">
		<u-navbar :fixed="true" :safeAreaInsetTop="false" bgColor="#fff" style="position: relative;z-index: 999;">
			<view class="u-nav-slot fl_al" slot="left" style="color: #f0614f;font-weight: 600;" @click="goHome">
			</view>
			<view class="u-nav-slot" style="color: #333;font-size: 32rpx;font-weight: bold;" slot="center">
				{{i18n.chargePsw.title2}}
			</view>
		</u-navbar>
		<view class="" style="height: 88rpx;">
		</view>
		<view class="group_1 flex-row">
			<view class="section_5 flex-col">
				<view class="section_6 flex-col"><span class="text_2">{{i18n.chargePsw.text3}}</span></view>
				<view class="section_7 flex-col">
					<view class="section_8">
						<u-code-input v-model="chargePassword" mode="box" :dot="show" @showDot="showDot" hairline
							:space="2" :maxlength="6" :focus="true" :disabledDot="true" :size="40" @change="change"
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
	import CryptoJS from 'crypto-js'; // 导入加密库
	import {
		getUserInfo,
	} from '@/api/index.js';
	import {
		packetgiftbot
	} from "@/utils/util.js";
	export default {
		data() {
			return {
				chargePassword: '',  //密码的值
				type: false,  //页面去向
				show: true,  //查看密码状态
				tronWithdrawMoneyData: {}, //提现
				subscribeToData: {} //收款
			};
		},
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		onLoad(options) {
			console.log(options)
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
					if (this.type == 'my') {
						uni.navigateTo({
							url: '/pages/user/index'
						})
					} else if (this.type == 'send') {
						// uni.navigateBack()
						uni.navigateTo({
							url: '/pages/index/index'
						})
					} else if (this.type == 'market') {
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
					} else {
						uni.navigateTo({
							url: '/pages/user/index'
						})
					}
				});
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.chargePsw.title2
			});
			this.chargePassword = ''
			setTimeout(() => {
				window.Telegram.WebApp.MainButton.hide()
				this.showTelegramBackButton() // 再次尝试显示返回按钮
			}, 50)
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
				console.log(e)
				this.show = e
				this.$forceUpdate();
			},
			// 正则,首字符必须是字母
			change(event) {
				if (!this.isValidFirstCharacter(event[0])) {
					this.$refs.uToast.error(this.i18n.page.text36)
					this.chongzhi()
				}
			},
			// 重置
			chongzhi() {
				getUserInfo().then(res => {
					this.chargePassword = ''
				}).catch(errors => {
					this.chargePassword = ''
				});
			},
			// 验证首字符是字母
			isValidFirstCharacter(char) {
				// 正则表达式匹配字母
				const regex = /^[A-Za-z]/;
				return regex.test(char);
			},
			// 新密码存入缓存
			chargePasswordFinish(e) {
				var that = this
				that.chargePassword = that.chargePassword.toLowerCase()
				console.log(that.chargePassword)
				const hexPassword = CryptoJS.SHA256(that.chargePassword).toString(CryptoJS.enc.Hex);
				uni.setStorageSync('chargePassword', hexPassword); // 将加密后的支付密码存储在本地存储中
				uni.setStorageSync('isSetChargePsw', true); // 将加密后的支付密码存储在本地存储中
				if (that.type == 'my') {
					uni.navigateTo({
						url: '/pages/confirm_charge_psw/index?type=my'
					})
				} else if (that.type == 'send') {
					// uni.navigateBack()
					uni.navigateTo({
						url: '/pages/confirm_charge_psw/index?type=send'
					})
				} else if (that.type == 'market') {
					uni.navigateTo({
						url: '/pages/confirm_charge_psw/index?type=market'
					})
				} else if (that.type == 'withdrawal') {
					uni.navigateTo({
						url: '/pages/confirm_charge_psw/index?type=withdrawal',
						success: function(res) {
							const eventChannel = res.eventChannel;
							console.log(eventChannel)
							console.log(that.tronWithdrawMoneyData)
							eventChannel.emit('tronWithdrawMoneyData',
								that.tronWithdrawMoneyData);
						}
					})
				} else if (that.type == 'subscribeTo') {
					uni.navigateTo({
						url: '/pages/confirm_charge_psw/index?type=subscribeTo',
						success: function(res) {
							const eventChannel = res.eventChannel;
							eventChannel.emit('subscribeToData',
								that.subscribeToData);
						}
					})
				} else {
					uni.navigateTo({
						url: '/pages/confirm_charge_psw/index'
					})
				}

			},
			// 客服
			kefu() {
				location.href = packetgiftbot()
			},
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