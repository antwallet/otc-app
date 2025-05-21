<template>
	<view class="page flex-col">
		<u-navbar :fixed="true" :safeAreaInsetTop="false" bgColor="#fff">
			<view class="u-nav-slot fl_al" slot="left" style="color: #f0614f;font-weight: 600;" @click="goHome">
			</view>
			<view class="u-nav-slot" style="color: #333;font-size: 32rpx;font-weight: bold;" slot="center">
				{{i18n.charge.title}}
			</view>
		</u-navbar>
		<view class="" style="height: 88rpx;">
		</view>
		<view class="box_1 flex-col">
			<view v-if="chooseShow">
				<u-form labelPosition="left" :model="model" ref="uForm">
					<view class="group_1 flex-col">
						<view class="box_3 flex-col">
							<view class="box_4 flex-row">
								<view class="image-text_1">
									<u-form-item prop="accountType" ref="item1" :label="i18n.charge.text1" borderBottom>
										<view class="fl_al" slot="right" style="text-align: right;">
											<text style="margin-right: 10rpx;">{{model.accountType}}</text>
										</view>
									</u-form-item>
								</view>
							</view>
							<view class="text-wrapper_charge_1">
								<u-form-item prop="money" ref="item1">
									<u-input v-model="model.money" type="number" border="none"
										:placeholder="i18n.charge.text2" inputAlign="left"></u-input>
								</u-form-item>
							</view>
						</view>
						<view class="text_13">{{model.money}}&nbsp;{{model.accountType}}</view>
					</view>
				</u-form>
				<view class="text-wrapper_charge_2 flex-col btnGg" @click='createChargeQrCode()'>
					<text class="text_charge_5">{{i18n.charge.btn}}</text>
				</view>
			</view>
			<view v-if="!chooseShow">
				<view class="group_3 flex-row" style="padding: 6px 0;display: flex;justify-content: center;">
					<view class="image-text_5 flex-row">
						<view class="text-group_1 fl_cen">
							请于<view style="margin: 0 10rpx;font-size: 40rpx;">
								<u-count-down :time="expireTime" format="mm:ss" autoStart>
								</u-count-down>
							</view>内转账 <view style="font-size: 40rpx;font-weight: 600;margin: 0 10rpx;color: #e2bd05;">
								{{chargeMoney}}
							</view> USDT
						</view>
						<!-- {{i18n.charge.text5}} -->
					</view>
				</view>

				<view class="group_4 flex-col">
					<img :src="qrcode_img" alt="">
				</view>
				<view class="group_3 flex-row">
					<view class="image-text_5 flex-row">
						<span class="text-group_1">{{i18n.charge.text3}}<br />需支付与订单一致的金额</span>
						<!-- {{i18n.charge.text4}} -->
					</view>
				</view>
				<view class="block_5 flex-col">
					<view class="text-wrapper_1 flex-row" style="display: flex;justify-content: space-between;">
						<span class="text_3">{{i18n.charge.title2}}</span>
						<u-tag :text="i18n.charge.btn3" plain plainFill size="mini" @click="onClipboard"></u-tag>
					</view>

					<view>
						<span class="paragraph_1">{{address}}</span>
					</view>
				</view>
				<view class="text-wrapper_charge_2 flex-col" @click='cancelTronCharge()'>
					<text class="text_charge_5">{{i18n.charge.btn2}}</text>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import {
		getChargeQrCode,
		createChargeQrCode,
		cancelTronCharge,
	} from '@/api/charge.js';
	import {
		Debounce
	} from '@/utils/debounce.js';
	export default {
		data() {
			return {
				qrcode_img: '', //二维码值
				address: '', //充值地址
				chargeMoney: '', //充值金额
				model: {
					accountType: 'USDT',
					money: '',
				}, //充值信息
				rules: {
					accountType: {
						type: 'string',
						required: true,
						message: '123',
						trigger: ['blur', 'change']
					},
					money: [{
							type: 'number',
							required: true,
							message: '',
							trigger: ['blur', 'change']
						},
						{
							// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return parseInt(value) >= 1;
							},
							message: "",
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ["change", "blur"],
						}
					],
				}, //表单正则
				expireTime: 0, //充值倒计时
				chooseShow: true, //充值状态
				debounce: new Debounce(), //状态锁
				orderId: '', //订单id

			};
		},
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		onLoad() {
			const pages = getCurrentPages()
			const currentPage = pages[pages.length - 1]
			const previousPage = pages[pages.length - 2]
			console.log(previousPage, 'previousPage')
			if (previousPage) {
				var obj = {
					previousPage: previousPage.route
				}
				uni.setStorageSync('obj', obj)
			}
			if (window.Telegram) {
				Telegram.WebApp.BackButton.show(); // 显示返回按钮
				Telegram.WebApp.BackButton.onClick(() => {
					// 处理返回逻辑

					if (uni.getStorageSync('obj').previousPage == 'pages/index/assets') {
						uni.redirectTo({
							url: '/pages/index/assets'
						})
					} else if (uni.getStorageSync('obj').previousPage == 'pages/index/subscribeTo') {
						uni.redirectTo({
							url: '/pages/index/subscribeTo'
						})
					} else {
						uni.redirectTo({
							url: '/pages/index/index'
						})
					}
				});
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.charge.title
			});

		},
		created() {
			this.getChargeQrCode()
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			this.rules.accountType.message = this.i18n.charge.rules.text1
			this.rules.money[0].message = this.i18n.charge.rules.text2
			this.rules.money[1].message = this.i18n.charge.rules.text3
		},
		methods: {
			// 点击actions回调
			accountTypeSelect(e) {
				this.model.accountType = e.name
				this.$refs.uForm.validateField('accountType')
			},
			// 获取二维码
			getChargeQrCode: function() {
				getChargeQrCode().then(res => {
					if (res.data && res.data.code === 0) {
						if (res.data.data.isExistCharge) {
							this.qrcode_img = res.data.data.qrCodeImageBase64
							this.address = res.data.data.base58CheckAddress
							this.expireTime = res.data.data.expireTime
							this.orderId = res.data.data.orderId
							this.chargeMoney = res.data.data.money
							this.chargeMoney = this.chargeMoney.replace("USDT", "");
							this.chooseShow = false
						} else {
							this.chooseShow = true
						}
					}
				}).catch(errors => {
					this.chooseShow = true
				});
			},
			// 确认充值
			createChargeQrCode: function() {
				this.$refs.uForm.validate().then(result => {
					if (result) {
						this.debounce.use(() => {
							createChargeQrCode({
								accountType: this.model.accountType,
								money: this.model.money
							}).then(res => {
								if (res.data && res.data.code === 0) {
									this.$refs.uToast.success(this.i18n.page.text4)
									this.qrcode_img = res.data.data.qrCodeImageBase64
									this.address = res.data.data.base58CheckAddress
									this.expireTime = res.data.data.expireTime
									this.orderId = res.data.data.orderId
									this.chargeMoney = res.data.data.money
									this.chargeMoney = this.chargeMoney.replace("USDT", "");
									this.chooseShow = false
								}
							}).catch(errors => {
								this.$refs.uToast.error(errors.msg)
								this.chooseShow = true
							});
						}, 500);
					} else {
						uni.$u.toast(this.i18n.page.text3)
					}
				}).catch(errors => {})
			},
			// 取消
			cancelTronCharge: function() {
				this.$nextTick(() => {
					cancelTronCharge(`order/cancelTronCharge/${this.orderId}`).then(res => {
						if (res.data && res.data.code === 0) {
							this.$refs.uToast.success(this.i18n.page.text2)
							// 延迟一段时间后执行操作
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/index/index'
								});
							}, 2000); // 2000 毫秒，即 2 秒后执行操作
						}
					}).catch(errors => {
						this.$refs.uToast.error(errors.msg)
					});
				})
			},
			// 充值地址复制
			onClipboard: function() {
				var that = this
				uni.setClipboardData({
					data: this.address,
					success: function() {
						console.log('success');
						uni.showToast({
							title: that.i18n.page.text1,
							icon: 'success',
							duration: 2000
						});
					},
					fail: (error) => {
						uni.showToast({
							title: '充值地址复制失败',
							icon: 'none'
						});
					}
				})
			},
		},
	};
</script>

<style lang="scss">
	page {
		background-color: rgba(255, 255, 255, 1);
	}

	.box_1 {
		margin-top: 20px;
	}

	.group_1 {
		margin-bottom: 33px;
		padding: 14px 10px 16px 0;
	}

	.box_3 {
		background-color: rgba(255, 255, 255, 1);
		border-radius: 10px;
		margin: 10px 0 0 10px;
		padding: 15px 15px 20px 15px;
	}

	.box_4 {}

	.image-text_1 {
		width: 100%;
		margin: 4px 0 4px 10px;
	}

	.text-wrapper_charge_1 {
		padding: 0 10px;
	}


	.text-wrapper_charge_2 {
		background-color: rgba(22, 81, 241, 1);
		border-radius: 22px;
		padding: 10px 127px 10px 127px;
		margin: 24px 10px 0 10px;
		cursor: pointer;
	}

	.text_charge_5 {
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1);
		font-size: 18px;
		font-weight: normal;
		text-align: center;
		white-space: nowrap;
		line-height: 25px;
	}

	.group_3 {
		background-color: rgba(255, 240, 237, 1);
		border-radius: 22px;
		padding: 6px 36px 6px 36px;
		margin-left: auto;
		margin-right: auto;
		width: 90%;
	}

	.image-text_5 {
		width: 100%;
	}

	.thumbnail_3 {
		width: 16px;
		height: 16px;
		margin: 2px 0 2px 0;
	}

	.text-group_1 {
		overflow-wrap: break-word;
		color: rgba(255, 97, 70, 1);
		font-size: 12px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: center;
		white-space: nowrap;
		line-height: 20px;
		width: 100%;
	}

	.group_4 {
		width: 180px;
		height: 180px;
		margin-left: auto;
		margin-right: auto;
	}

	.block_5 {
		border-radius: 10px;
		width: 90%;
		border: 1px solid rgba(229, 229, 229, 1);
		padding: 14px 14px 14px 14px;
		margin-top: 20px;
		margin-left: auto;
		margin-right: auto;
	}

	.text-wrapper_1 {
		height: 20px;
		overflow-wrap: break-word;
		font-size: 0;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		line-height: 24px;
		align-items: center;
	}

	.text_3 {
		overflow-wrap: break-word;
		color: rgba(142, 142, 142, 1);
		font-size: 12px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		line-height: 24px;
	}

	.paragraph_1 {
		width: 300px;
		height: 48px;
		overflow-wrap: break-word;
		color: rgba(51, 51, 51, 1);
		font-size: 12px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		line-height: 24px;
	}

	.text-wrapper_2 {
		background-color: rgba(245, 245, 245, 1);
		border-radius: 15px;
		margin: 6px 0 6px auto;
		padding: 5px 10px 5px 10px;
	}

	.text_6 {
		overflow-wrap: break-word;
		color: rgba(51, 51, 51, 1);
		font-size: 24rpx;
		font-family: PingFangSC-Medium;
		font-weight: 700;
		text-align: center;
		white-space: nowrap;
		line-height: 40rpx;
	}

	.text_13 {
		overflow-wrap: break-word;
		color: rgba(51, 51, 51, 1);
		font-size: 28px;
		font-family: PingFangSC-Semibold;
		font-weight: 700;
		text-align: center;
		white-space: nowrap;
		line-height: 40px;
		align-self: center;
	}

	.text_14 {
		overflow-wrap: break-word;
		color: rgba(51, 51, 51, 1);
		font-size: 16px;
		font-family: PingFangSC-Semibold;
		font-weight: 700;
		text-align: center;
		white-space: nowrap;
		line-height: 20px;
		align-self: center;
	}

	/deep/ .u-count-down__text {
		font-size: 40rpx !important;
	}
</style>