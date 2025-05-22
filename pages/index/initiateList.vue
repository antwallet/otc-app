<template>
	<view class="page flex-col">
		<u-navbar :fixed="true" :safeAreaInsetTop="false" bgColor="transparent"
			style="position: relative;z-index: 999;">
			<view class="u-nav-slot fl_al" slot="left" style="color: #f0614f;font-weight: 600;" @click="goHome">
			</view>
			<view class="u-nav-slot" style="color: #333333FF;font-size: 36rpx;font-weight: bold;" slot="center">
				{{i18n.initiateList.title}}
			</view>
		</u-navbar>
		<view class="" style="height: 88rpx;">
		</view>
		<view class="xinxi" v-for="item in list" :key="item.id">
			<view class="fl_al time">
				<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/date.png" mode=""></image>
				{{i18n.initiateList.list.title5}}：{{item.subscriptionExpiryTime}}
			</view>
			<view class="fl_ju shuju">
				<view class="sjson">
					<view class="max">
						{{item.money}}
					</view>
					<view class="name">
						{{i18n.initiateList.list.title2}}
					</view>
				</view>
				<view class="sjson">
					<view class="max">
						{{item.transNum}}
					</view>
					<view class="name">
						{{i18n.initiateList.list.title3}}
					</view>
				</view>
				<view class="sjson">
					<view class="max">
						{{item.paymentCount}}
					</view>
					<view class="name">
						{{i18n.initiateList.list.title4}}
					</view>
				</view>
			</view>
			<view class="id fl_al">
				{{i18n.initiateList.list.title}}：{{item.tronTransId}}
				<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/copy.png" mode="" @click="fuzhi(item.tronTransId)"></image>
			</view>
			<view class="id fl_al" style="margin: 29rpx 14rpx 46rpx;">
				{{i18n.initiateList.list.title6}}：{{item.createTime}}
			</view>
			<view class="btns fl_end">
				<u-button type="primary" @click="fenxiang(item)" shape="circle" style="margin-right: 24rpx;"
					:customStyle="{width:'200rpx',background:'#2E6AF6',fontSize:'24rpx',border:'1px solid #2E6AF6'}"
					:text="i18n.initiateList.btn2" :disabled="item.status != 0 && item.status != 1"></u-button>
				<u-button type="primary" @click="shop(item.id)" shape="circle"
					:customStyle="{width:'200rpx',background:'red',fontSize:'24rpx',border:'1px solid red'}"
					:text="i18n.initiateList.btn" :disabled="item.status != 0 && item.status != 1"></u-button>
			</view>
		</view>
		<u-empty iconSize="200rpx" v-if="list.length == 0" mode="list" icon="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/list.png"
			:text="i18n.page.text54">
		</u-empty>
		<u-popup mode="center" round="10" :show="showMod" :overlay="true" :closeOnClickOverlay="true"
			:safeAreaInsetBottom="true" :safeAreaInsetTop="true" :closeable="true" :customStyle="{
		          width: '90%',
		          height: '384rpx',
		        }" @close="showMod = false">
			<view class="u-popup-slot">
				<view class="title">
					{{i18n.initiateList.tankuang.title}}
				</view>
				<view class="content">
					{{i18n.initiateList.tankuang.tishi}}
				</view>
				<view class="status_button">
					<view class="deposit" @click="showMod = false"> {{i18n.chargePsw.reset.btn1}}</view>
					<view class="doubling" @click="queren">{{i18n.initiateList.tankuang.btn}}</view>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		tronTransList,
		handleStopPayment
	} from '@/api/sendpacket.js'
	export default {
		data() {
			return {
				showMod: false,
				list: [],
				disabled: false,
				form: {
					"pageIndex": 1,
					"pageSize": 15,
				},
				id: ''
			};
		},
		computed: {
			i18n() {
				return this.$t('message')
			},

		},
		onLoad(options) {
			this.tronList()
			if (window.Telegram) {
				Telegram.WebApp.BackButton.show(); // 显示返回按钮
				Telegram.WebApp.BackButton.onClick(() => {
					// 处理返回逻辑
					uni.navigateTo({
						url: '/pages/index/initiate'
					})

				});
			}
		},
		onShow() {
			setTimeout(() => {
				window.Telegram.WebApp.MainButton.hide()
				this.showTelegramBackButton() // 再次尝试显示返回按钮
			}, 50)
		},
		onReachBottom() {
			// 滑动到底部时触发的逻辑  
			console.log('页面滑动到底部了');
			var sum = Math.ceil(this.totalCount / 15);
			if (sum > this.form.pageIndex) {
				console.log('有下一页')
				this.status = 'loading';
				this.form.pageIndex++
				this.tronList()
			} else {
				console.log('没有下一页')
				this.status = 'nomore'
			}
			// 例如，加载更多数据  
			// this.loadMoreData();
		},
		methods: {
			// 立即分享
			fenxiang(e) {
				// let tgWebAppStartParam = getUrlParam('redpacketId', null) //获取tgWebAppStartParam
				getOriginalData(e.link).then(res => {
					if (res.data.code === 0) {
						window.Telegram.WebApp.switchInlineQuery(res.data.data + ' ' + e.money + 'USDT', [
							"users",
							"groups"
						])
						// }
					} else {
						this.isshowPanel = false
						this.$refs.uToast.error('请在TG环境操作')
					}
				})
			},
			// tg返回按钮
			showTelegramBackButton() {
				if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.BackButton) {
					window.Telegram.WebApp.BackButton.show()
				}
			},
			// 复制收款编号
			fuzhi: function(event) {
				var that = this
				uni.setClipboardData({
					data: event,
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
			// 确认停止事件
			queren() {
				handleStopPayment(this.id).then(res => {
					if (res.data && res.data.code === 0) {
						this.showMod = false
						this.$refs.uToast.success(res.data.msg)
						this.list = []
						this.tronList()
					}
				}).catch(errors => {
					uni.hideLoading()
					// this.$refs.uToast.error(errors)
				});
			},
			// 停止收款
			shop(e) {
				console.log(e)
				this.id = e
				this.showMod = true
			},
			/**
			 * 获取用户账户交易详情
			 */
			tronList: function() {
				uni.showLoading({})
				tronTransList(this.form).then(res => {
					if (res.data && res.data.code === 0) {
						uni.hideLoading()
						this.list = [...this.list, ...res.data.list]
						this.totalCount = res.data.data.totalCount
					}
				}).catch(errors => {
					uni.hideLoading()
					// this.$refs.uToast.error(errors)
				});
			}
		},
	};
</script>
<style lang="less">
	page {
		background-color: #F6F2F3FF;
		padding: 0rpx 18rpx;
		box-sizing: border-box;
	}

	.u-button {
		height: 70rpx;
	}

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

	.xinxi {
		background-color: #fff;
		padding: 28rpx 16rpx 40rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
		margin-bottom: 20rpx;

		.id {
			font-size: 24rpx;
			color: #999999;
			margin-left: 14rpx;

			image {
				width: 28.5rpx;
				height: 28.5rpx;
				margin-left: 20rpx;
			}
		}

		.shuju {
			background-color: #F6F2F3FF;
			border-radius: 12rpx;
			padding: 25rpx 86rpx;
			box-sizing: border-box;
			margin: 30rpx 0 20rpx;

			.sjson {
				text-align: center;

				.max {
					font-weight: bold;
					font-size: 36rpx;
					color: #333333;
					margin-bottom: 7rpx;
				}

				.name {
					font-size: 24rpx;
					color: #666666;
				}
			}
		}

		.time {
			font-weight: bold;
			font-size: 28rpx;
			color: #3E69ED;
			margin-left: 14rpx;

			image {
				width: 42rpx;
				height: 42rpx;
				margin-right: 16rpx;
			}
		}

		// .usdt {
		// 	width: 100rpx;
		// 	height: 100rpx;
		// 	margin-right: 15rpx;
		// }

		// .name {
		// 	font-size: 30rpx;
		// 	font-weight: 600;

		// 	image {
		// 		width: 30rpx;
		// 		height: 30rpx;
		// 		margin-left: 10rpx;
		// 	}
		// }

		// .code {
		// 	margin: 10rpx 0;


		// }

		// .riqi,
		// .code {
		// 	font-size: 24rpx;
		// }
	}
</style>