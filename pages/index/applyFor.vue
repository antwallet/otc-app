<template>
	<view class="page flex-col">
		<block v-if="!loading">
			<u-navbar :fixed="true" :safeAreaInsetTop="false" bgColor="#fff" style="position: relative;z-index: 999;">
				<view class="u-nav-slot fl_al" slot="left" style="font-weight: 600;">
					{{i18n.applyFor.title}}
				</view>
				<view class="u-nav-slot" style="color: #333;font-size: 32rpx;font-weight: bold;" slot="center">
				</view>
			</u-navbar>
			<view class="" style="height: 88rpx;">
			</view>
			<view class="box" v-if="type == 2 || type == ''">
				<view class="title">
					{{i18n.applyFor.type.title}}
				</view>
				<view class="tishi">
					{{i18n.applyFor.type.tishi.title}}
					<br />
					{{i18n.applyFor.type.tishi.txt1}}
					<br />
					{{i18n.applyFor.type.tishi.txt2}}
					<br />
					{{i18n.applyFor.type.tishi.txt3}}
				</view>

				<u--form labelPosition="left" :model="model1" :rules="rules" ref="uForm">
					<view class="name">
						<text>*</text>{{i18n.applyFor.type.name1}}
					</view>
					<u-form-item label="" prop="projectName" ref="item1">
						<u--input :placeholder="i18n.applyFor.type.put1" border="surround"
							v-model="model1.projectName"></u--input>
					</u-form-item>
					<view class="name">
						<text>*</text>{{i18n.applyFor.type.name2}}
					</view>
					<u-form-item label="" prop="userInfo" ref="item1">
						<u--input :placeholder="i18n.applyFor.type.put2" border="surround"
							v-model="model1.userInfo"></u--input>
					</u-form-item>
					<view class="name">
						<text>*</text>{{i18n.applyFor.type.name3}}
					</view>
					<u-form-item label="" prop="applicationReason" ref="item1">
						<u--textarea v-model="model1.applicationReason" :placeholder="i18n.applyFor.type.put3"
							count></u--textarea>
					</u-form-item>
					<u-button
						:customStyle="{background:'#0d6efd',border:'1px solid #0d6efd',color:'#fff',marginTop:'20rpx'}"
						shape="square" @click="submit">{{i18n.applyFor.type.maxbtn}}</u-button>
				</u--form>
			</view>
			<view class="dengdai" v-else-if="type == 1">
				<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/11/28/bc600f9b-fb01-4358-a568-82a39f0ce400.png" mode=""></image>
				<view class="shtitle">
					{{i18n.applyFor.type2.title}}
				</view>
				<view class="shtishi">
					{{i18n.applyFor.type2.tishi}}
				</view>
			</view>
			<view class="dengdai" v-else>
				<view class="shtitle2">
					{{i18n.applyFor.type3.title}}
				</view>
				<view class="btn">
					<u-button
						:customStyle="{background:'#0d6efd',border:'1px solid #0d6efd',color:'#fff',marginTop:'20rpx'}"
						shape="square" @click="kefu">{{i18n.applyFor.type3.btn1}}</u-button>
				</view>
				<view class="btn">
					<u-button
						:customStyle="{background:'#0d6efd',border:'1px solid #0d6efd',color:'#fff',marginTop:'20rpx'}"
						shape="square" @click="gohtml">{{i18n.applyFor.type3.btn2}}</u-button>
				</view>
				<view class="btn">
					<u-button
						:customStyle="{background:'#0d6efd',border:'1px solid #0d6efd',color:'#fff',marginTop:'20rpx'}"
						shape="square" @click="copy">{{i18n.applyFor.type3.btn3}}</u-button>
				</view>
				<view class="mintishi">
					{{i18n.applyFor.type3.tishi}}
				</view>
			</view>
		</block>
		<u-toast ref="uToast" />
		<u-loading-page :loading="loading" :loading-text="i18n.page.text59"></u-loading-page>
	</view>
</template>

<script>
	import {
		cooperationApplication,
	} from '@/api/index.js';
	import {
		packetgiftbot,
		shangjia
	} from "@/utils/util.js";
	import {
		cooperationApplicationPermission
	} from '@/api/group_receive_redpacket.js';
	export default {
		data() {
			return {
				loading: true,
				type: '', //0：审核通过，1：审核中，2：驳回,''未提交
				model1: {
					projectName: '',
					applicationReason: '',
					userInfo: '',
				},
				rules: {
					'projectName': {
						type: 'string',
						required: true,
						message: '',
						trigger: ['blur', 'change']
					},
					'userInfo': {
						type: 'string',
						required: true,
						message: '请填写用户信息',
						trigger: ['blur', 'change']
					},
					'applicationReason': {
						type: 'string',
						required: true,
						message: '请填写申请说明',
						trigger: ['blur', 'change']
					},
				},
				radio: '',
				switchVal: false
			};
		},
		computed: {
			i18n() {
				return this.$t('message')
			},
			rechargeAmount() {
				return this.$store.state.rechargeAmount;
			},
		},
		onLoad(options) {
			console.log(options)
			this.type = options.type
			if (window.Telegram) {
				Telegram.WebApp.BackButton.show(); // 显示返回按钮
				Telegram.WebApp.BackButton.onClick(() => {
					// 处理返回逻辑
					uni.navigateTo({
						url: '/pages/index/index'
					})

				});
			}
		},
		onShow() {
			this.rules.projectName.message = this.i18n.applyFor.type.jiaoyan1
			this.rules.userInfo.message = this.i18n.applyFor.type.jiaoyan2
			this.rules.applicationReason.message = this.i18n.applyFor.type.jiaoyan3
			uni.setNavigationBarTitle({
				title: this.i18n.accountTrade.title
			});
			this.model1.userInfo = uni.getStorageSync('user').userName
			if (this.model1.userInfo == '未设置') {
				this.model1.userInfo = ''
			}
			setTimeout(() => {
				window.Telegram.WebApp.MainButton.hide()
				this.showTelegramBackButton() // 再次尝试显示返回按钮
			}, 50)
			this.cooper()
		},
		methods: {
			// 是否有权限
			cooper() {
				cooperationApplicationPermission().then(res => {
					console.log(res)
					this.type = res.data.data
					this.loading = false
				}).catch(errors => {});
			},
			// 导航按钮
			showTelegramBackButton() {
				if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.BackButton) {
					window.Telegram.WebApp.BackButton.show()
				}
			},
			// kefu
			kefu() {
				location.href = packetgiftbot()
			},
			// 打开浏览器
			gohtml() {
				const url = shangjia() + uni.getStorageSync('token')
				// 最推荐的方法
				Telegram.WebApp.openLink(url, {
					try_instant_view: false // 禁用即时视图，强制在外部浏览器打开
				});
			},
			// 复制收款编号
			copy() {
				var that = this
				uni.setClipboardData({
					data: shangjia() + uni.getStorageSync('token'),
					success: function() {
						uni.showToast({
							title: that.i18n.page.text33,
							icon: 'none'
						});
					},
					fail: (error) => {
						uni.showToast({
							title: '',
							icon: 'none'
						});
					}
				})
			},
			/**
			 * 表单提交
			 */
			submit() {
				this.$refs.uForm.validate().then(res => {
					cooperationApplication(this.model1).then(res => {
						if (res.data && res.data.code === 0) {
							uni.$u.toast(this.i18n.page.text60)
							this.cooper()
						}
					}).catch(errors => {
						this.$refs.uToast.error(errors.data.message)
					});
				}).catch(errors => {})
			}
		},
	};
</script>

<style lang="less">
	page {
		background-color: #fff;

	}

	.dengdai {
		text-align: center;

		.btn {
			width: 50%;
			margin: 0 auto;
			margin-top: 50rpx;
		}

		.mintishi {
			font-weight: 800;
			font-size: 24rpx;
			color: #333333;
			margin-top: 100rpx;
		}

		image {
			width: 728rpx;
			height: 728rpx;
		}

		.shtitle {
			font-size: 48rpx;
			font-weight: 600;
			color: #111827;
			margin-bottom: 24rpx;
		}

		.shtitle2 {
			font-size: 48rpx;
			font-weight: 600;
			color: #111827;
			margin-bottom: 24rpx;
			margin-top: 200rpx;
		}

		.shtishi {
			color: #4b5563;
			font-size: 36rpx;
		}
	}

	.box {
		padding: 10rpx 48rpx;
		box-sizing: border-box;

		.name {
			margin: 32rpx 0 8rpx;
			color: #4b5563;
			font-size: 28rpx;
			font-weight: 600;

			text {
				color: red;
			}
		}

		.tishi {
			font-size: 28rpx;
			color: #666666;
		}

		.title {
			font-weight: 800;
			font-size: 40rpx;
			color: #000000;
			margin: 10rpx 0 24rpx;
			text-align: center;
		}

		.logo {
			width: 336rpx;
			height: 80rpx;
		}
	}
</style>