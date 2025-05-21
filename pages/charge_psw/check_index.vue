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
		<view class="group_1 flex-row">
			<view class="section_5 flex-col" style="background-color: #fff;height: calc(100vh - 44px);">
				<view class="section_6 flex-col"><span class="text_2">{{i18n.chargePsw.text}}</span></view>
				<view class="section_7 flex-col">
					<view class="section_8">
						<u-code-input v-model="chargePassword" mode="box" :dot="show" @showDot="showDot" hairline
							:space="2" :maxlength="6" :focus="true" :disabledDot="true" :size="40"
							@finish="chargePasswordFinish"></u-code-input>
					</view>
				</view>
				<view class="tishi fl_cen">
					{{i18n.page.text34}}
					<br />
					{{i18n.page.text35}}
				</view>
			</view>
		</view>
		<view class="kefu">
			<!-- <view @click="kefu" class="kf">{{ i18n.my.tabs.title5}}</view> -->
			<view class="reset" @click="showMod = true">
				{{i18n.chargePsw.reset.title}}
			</view>
		</view>
		<u-popup mode="center" round="10" :show="showMod" :overlay="true" :closeOnClickOverlay="true"
			:safeAreaInsetBottom="true" :safeAreaInsetTop="true" :closeable="true" :customStyle="{
		          width: '90%',
		        }" @close="showMod = false">
			<view class="u-popup-slot">
				<view class="title">
					{{i18n.chargePsw.reset.title}}
				</view>
				<view class="content" v-if="!ok">
					{{i18n.chargePsw.reset.text1}}
				</view>
				<view class="content" v-else>
					{{i18n.chargePsw.reset.text2}}
				</view>
				<view class="status_button">
					<view class="deposit" v-if="!ok" @click="showMod = false"> {{i18n.chargePsw.reset.btn1}}</view>
					<view class="doubling" v-if="!ok" @click="queren">{{i18n.chargePsw.reset.btn2}}</view>
					<view class="doubling2" v-if="ok" @click="open">{{i18n.chargePsw.reset.btn3}}</view>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import {
		checkChargePsw,
		resetPassword
	} from '@/api/set_charge_psw.js';
	import {
		packetgiftbot,
		antwalletbot,
	} from "@/utils/util.js";
	export default {
		data() {
			return {
				show: true,  //密码显隐
				loading: false, // 控制加载效果显示与隐藏的变量
				chargePassword: '',  //密码值
				type: false,  //判断从哪来
				ok: false,  //充值密码按钮状态
				showMod: false,  //重置密码弹框状态
				error: true // 用于显示错误信息
			};
		},
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		onLoad(options) {
			if (options.type) {
				this.type = true
			}
			if (window.Telegram) {
				Telegram.WebApp.BackButton.show(); // 显示返回按钮
				Telegram.WebApp.BackButton.onClick(() => {
					// 处理返回逻辑
					uni.redirectTo({
						url: '/pages/user/index'
					})
				});
			}

		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.chargePsw.title
			});
		},
		methods: {
			// 打开机器人
			open() {
				location.href = antwalletbot()
				if (window.Telegram && window.Telegram.WebApp) {
					Telegram.WebApp.close();
				}
			},
			// 确认重置密码
			queren() {
				resetPassword().then(result => {
					if (result.data && result.data.code === 0) {
						this.ok = true
					}
				}).catch(errors => {
					this.showMod = false
					this.$refs.uToast.error(errors.data.msg)
				})
			},
			// 查看密码事件
			showDot(e) {
				this.show = e
				this.$forceUpdate();
			},
			// 验证完成回调
			checkChargePsw(chargePsw) {
				checkChargePsw(chargePsw).then(result => {
					if (result.data && result.data.code === 0) {
						this.$refs.uToast.success(this.i18n.page.text8)
						// 延迟一段时间后执行操作

						setTimeout(() => {
							if (this.type) {
								uni.navigateTo({
									url: '/pages/charge_psw/set_index?type=my'
								})
							} else {
								uni.navigateTo({
									url: '/pages/charge_psw/set_index'
								})
							}

						}, 1000); // 2000 毫秒，即 2 秒后执行操作
					} else {
						this.$refs.uToast.error(result.data.msg)
						this.chargePassword = ''
					}
				}).catch(errors => {
					if (!this.error) {
						this.$refs.uToast.error(this.i18n.page.text36)
					} else {
						this.$refs.uToast.error(errors.data.msg)
					}
					this.chargePassword = ''
				})
			},
			// 联系客服
			kefu() {
				location.href = packetgiftbot()
			},
			// 密码输完回调
			chargePasswordFinish() {
				this.chargePassword = this.chargePassword.toLowerCase()
				let psd = this.AES.encrypt(this.chargePassword, '94E113C6A898CD39', '94E113C6A898CD39')
				this.checkChargePsw(psd)
			},
		}
	};
</script>
<style lang="scss">
	@import '../../static/css/set_charge_psw/index.css';
	@import '../../static/css/common.css';

	.u-popup-slot {
		padding: 25rpx;
		box-sizing: border-box;

		.title {
			text-align: center;
			font-size: 32rpx;
		}

		.content {
			text-align: center;
			font-size: 30rpx;
			color: #606266;
			margin-top: 80rpx;
		}

		.status_button {
			display: flex;
			margin-top: 70rpx;
			justify-content: space-around;
			align-items: center;

			.deposit,
			.doubling {
				width: 300rpx;
				border-radius: 45rpx;
				padding: 20rpx 60rpx;
				font-weight: 500;
				font-size: 36rpx;
				text-align: center;
			}

			.doubling2 {
				width: 600rpx;
				border-radius: 45rpx;
				padding: 20rpx 60rpx;
				font-weight: 500;
				font-size: 36rpx;
				text-align: center;
				background-color: #1651f1;
				color: #fff;
				font-weight: 600;
			}

			.deposit {
				color: #333333;
				border: 2rpx solid #E5E5E5;
				margin-right: 30rpx;
			}

			.doubling {
				background: #1651f1;
				color: #fff;
			}
		}
	}

	.kefu {
		font-size: 26rpx;
	}

	.kf:hover {
		color: rgb(240, 97, 79);
	}

	.reset {
		margin-top: 20rpx;
	}

	.reset:hover {
		color: rgb(240, 97, 79);
	}

	.tishi {
		font-size: 24rpx;
		width: 90%;
		margin: 0 auto;
		margin-top: 100rpx;
		line-height: 40rpx;

		image {
			width: 30rpx;
			height: 30rpx;
			margin-right: 10rpx;
		}
	}
</style>