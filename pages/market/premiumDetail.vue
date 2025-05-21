<template>
	<view class="page flex-col">
		<block v-if="!loading">
			<u-navbar :fixed="true" :safeAreaInsetTop="false" bgColor="#fff" style="position: relative;z-index: 999;">
				<view class="u-nav-slot fl_al" slot="left" style="color: #f0614f;font-weight: 600;" @click="goHome">
				</view>
				<view class="u-nav-slot" style="color: #333;font-size: 32rpx;font-weight: bold;" slot="center">
					{{i18n.marketList.title}}
				</view>
			</u-navbar>
			<view class="" style="height: 88rpx;">
			</view>
			<view class="block_1 flex-col">
				<view class="kuang " v-for="(item, index) in accountTradeList" :key="index">
					<view class="fl_ju">
						<view class="danhao fl_al">
							{{item.premiumBuyId}}
							<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/copy.png" @click="fuzhi(item.premiumBuyId)" mode=""></image>
						</view>
						<view
							:class="item.status == 0?'status progress':item.status == 1?'status success':'status error'">
							{{item.status == 0?i18n.marketList.status0:item.status == 1?i18n.marketList.status1:i18n.marketList.status2}}
						</view>
					</view>
					<view class="address fl_ju">
						<view class="">
							{{i18n.marketList.title2}}：{{item.premiumType == 0?3+i18n.market.premium.yue:item.premiumType == 1?6+i18n.market.premium.yue:1+i18n.market.premium.nian}}
						</view>
						<view class="date">
							{{formattedDateTime(item.createTime)}}
						</view>
					</view>
					<view class="address fl_ju">
						<view class="">
							{{i18n.marketList.title3}}：{{item.buyUserName}}
						</view>
					</view>
					<view class="jiage">
						<text class="name">{{i18n.marketList.price}}：</text>
						<text style="color: #EB4B46;font-size: 24rpx;">$</text>
						<text class="qian">{{item.money}}</text>
						<text style="color: #EB4B46;font-size: 24rpx;">{{item.accountType == 0?'TRX':'USDT'}}</text>
					</view>
				</view>
			</view>
			<block v-if="accountTradeList.length == 0">
				<u-empty mode="history" :text="i18n.page.text39" icon="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/zwxx.png">
				</u-empty>
			</block>
		</block>

		<!-- 		<u-loading-page :loading="loading" icon-size="160" loading-text=""
			image="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/loading.gif"></u-loading-page> -->
		<view class="overlay" v-show="loading">
			<LottieAnimation />
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		energyList,
		premiumList
	} from '@/api/index.js';
	import LottieAnimation from '@/components/LottieAnimation.vue'
	export default {
		components: {
			LottieAnimation
		},
		data() {
			return {
				loading: true,
				account_id: '',
				account_type: 0,
				accountTypeIcon: '',
				accountTradeList: [],
				type: ''
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
			this.premiumList()
			if (window.Telegram) {
				Telegram.WebApp.BackButton.show(); // 显示返回按钮
				Telegram.WebApp.BackButton.onClick(() => {
					// 处理返回逻辑
					uni.redirectTo({
						url: '/pages/market/index'
					})
				});
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.accountTrade.title
			});
		},
		methods: {
			// 转化时间
			formattedDateTime(event) {
				const date = new Date(event);
				const year = date.getFullYear();
				const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份是从0开始的
				const day = date.getDate().toString().padStart(2, '0');
				const hours = date.getHours().toString().padStart(2, '0');
				const minutes = date.getMinutes().toString().padStart(2, '0');
				const seconds = date.getSeconds().toString().padStart(2, '0');
				return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
			},
			// 复制订单号
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
							title: '复制失败~',
							icon: 'none'
						});
					}
				})
			},
			/**
			 * 获取用户账户能量交易详情
			 */
			getAccountTradeInfo: function() {
				energyList(`energy/list`).then(res => {
					if (res.data && res.data.code === 0) {
						this.loading = false
						this.accountTradeList = res.data.list
					}
				}).catch(errors => {
					this.loading = false
					this.$refs.uToast.error(errors.msg)
				});
			},
			/**
			 * 获取用户账户会员交易详情
			 */
			premiumList: function() {
				premiumList(`premium/list`).then(res => {
					if (res.data && res.data.code === 0) {
						this.loading = false
						this.accountTradeList = res.data.list
					}
				}).catch(errors => {
					this.loading = false
					this.$refs.uToast.error(errors.msg)
				});
			},
		},
	};
</script>
<style>
	@import '../../static/css/index/index.css';
	@import '../../static/css/common.css';
</style>
<style lang="scss">
	page {
		background-color: #F3F7FA;
		height: 100vh;
	}

	.kuang {
		border-radius: 16rpx;
		padding: 20rpx;
		box-sizing: border-box;
		background-color: #fff;
		margin-bottom: 10rpx;

		.danhao {
			color: #333333;
			font-size: 28rpx;
			font-weight: 600;

			image {
				width: 30rpx;
				height: 30rpx;
				margin-left: 10rpx;
			}
		}

		.status {
			font-size: 24rpx;

		}

		.progress {
			color: #ff8f05;
		}

		.success {
			color: #77B982;
		}

		.error {
			color: #EB4B46;
		}

		.address {
			color: #999999;
			font-size: 24rpx;
			margin: 10rpx 0;
		}

		.jiage {
			.name {
				color: #333333;
				font-size: 24rpx;
			}

			.qian {
				color: #EB4B46;
				font-size: 36rpx;
				font-weight: 600;
				margin: 0 10rpx;
			}
		}
	}
</style>