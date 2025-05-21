<template>
	<view class="page flex-col">
		<u-navbar :fixed="true" :safeAreaInsetTop="false" bgColor="#fff" style="position: relative;z-index: 999;">
			<view class="u-nav-slot fl_al" slot="left" style="font-weight: 600;">
				{{i18n.accountTrade.title}}
			</view>
			<view class="u-nav-slot" style="color: #333;font-size: 32rpx;font-weight: bold;" slot="center">

			</view>
	<!-- 		<view class="u-nav-slot fl_al shaixuan" slot="right" @click="show = true">
				<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/shaixuan.png" mode=""></image> {{value}}
			</view> -->
		</u-navbar>
		<view class="" style="height: 88rpx;">
		</view>
		<view class="block_1 flex-col">
			<u-list>
				<u-list-item v-for="(item, index) in accountTradeList" :key="index">
					<u-cell :title="item.tradeTypeInfo" :label="item.createTime" center>
						<u-avatar slot="icon" shape="square" size="40" :src="accountTypeIcon"
							customStyle="margin: -3px 5px -3px 0"></u-avatar>
						<view class="" slot="value">
							<view class="value">
								{{item.money}}
							</view>
							<!-- 		<view class="status" v-if="item.state == 0 || item.state == 4">
								<u-button type="primary" @click="shenshu(item)"
									:customStyle="{width:'120rpx',background:'#FC575F',fontSize:'24rpx',border:'1px solid #FC575F',padding:'5rpx'}"
									text="订单申述"></u-button>
							</view> -->
							<!-- 		<view class="statustxt" v-if="index == 1">
								已全部退款
							</view>
							<view class="statustxt" v-if="index == 2">
								申诉失败
							</view>
							<view class="status fl_al" v-if="index == 3">
								<u-button type="primary" @click="shoukuan"
									:customStyle="{width:'120rpx',background:'#f59a23',fontSize:'24rpx',border:'1px solid #f59a23',padding:'5rpx',marginRight:'10rpx'}"
									text="复制链接"></u-button>
								<u-button type="primary" @click="shoukuan"
									:customStyle="{width:'120rpx',background:'#70b603',fontSize:'24rpx',border:'1px solid #70b603',padding:'5rpx'}"
									text="继续转发"></u-button>
							</view> -->
						</view>
					</u-cell>
				</u-list-item>
			</u-list>
		</view>
		<u-loadmore :status="status" v-if="totalCount>15" />
		<u-picker :show="show" closeOnClickOverlay @close="close" @cancel="close" @confirm="confirm" :columns="columns"
			:keyName="dictLabel"></u-picker>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		getAccountTradeInfo,
		displayTransactionTypes
	} from '@/api/index.js';
	export default {
		data() {
			return {
				yuyan: '',
				status: 'loadmore',
				account_id: '',
				totalCount: 0,
				accountTypeIcon: '',
				accountTradeList: [],
				form: {
					"pageIndex": 1,
					"pageSize": 15,
					"accountId": '',
					"accountType": '',
					dictValue: ''
				},
				show: false,
				value: '全部',
				dictLabel: '',
				columns: [
					[
						'全部',
						'充值',
						'提现',
						'收款',
						'发红包',
						'收红包',
						'退红包',
						'系统赠送',
						'系统扣除',
						'提现失败退回',
						'邀请返现',
						'日榜收益',
						'总榜收益 ',
					]
				],
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
			this.value = this.i18n.withdrawal.btn2
			this.form.accountId = options.accountId
			this.form.accountType = options.accountType
			if (this.form.accountType === '0') {
				this.accountTypeIcon = 'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/11/28/de561cd1-0540-4e71-9e6f-ded7e5152ecf.png'
			} else {
				this.accountTypeIcon = 'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/11/28/3097ffcc-0628-4cc2-a57d-9c6e4858edbe.png'
			}
			displayTransactionTypes().then(res => {
				if (res.data && res.data.code === 0) {
					this.columns = [res.data.list]
				}
			}).catch(errors => {
				// this.$refs.uToast.error(errors)
			});
			if (window.Telegram) {
				Telegram.WebApp.BackButton.show(); // 显示返回按钮
				Telegram.WebApp.BackButton.onClick(() => {
					// 处理返回逻辑
					uni.navigateTo({
						url: '/pages/index/assets'
					})
				});
			}
		},
		onShow() {
			this.yuyan = uni.getStorageSync('i18n')
			if (this.yuyan == 'en-US') {
				this.dictLabel = 'dictLabelEn'
			} else {
				this.dictLabel = 'dictLabel'
			}
			uni.setNavigationBarTitle({
				title: this.i18n.accountTrade.title
			});
			this.accountTradeList = []
			this.getAccountTradeInfo()
			console.log(this.rechargeAmount, '状态')
		},
		onReachBottom() {
			// 滑动到底部时触发的逻辑  
			console.log('页面滑动到底部了');
			var sum = Math.ceil(this.totalCount / 15);
			if (sum > this.form.pageIndex) {
				console.log('有下一页')
				this.status = 'loading';
				this.form.pageIndex++
				this.getAccountTradeInfo()
			} else {
				console.log('没有下一页')
				this.status = 'nomore'
			}
			// 例如，加载更多数据  
			// this.loadMoreData();
		},
		methods: {
			// 申诉
			shenshu(e) {
				console.log(e)
				uni.navigateTo({
					url: '/pages/index/appeal?tradeNo=' + e.tradeNo + '&createTime=' + e.createTime +
						'&tradeTypeInfo=' + e.tradeTypeInfo
				})
			},
			// 选择值回调
			confirm(e) {
				console.log(e.value[0])
				if (this.yuyan == 'en-US') {
					this.value = e.value[0].dictLabelEn
					this.form.dictValue = e.value[0].dictLabelEn
				} else {
					this.value = e.value[0].dictLabel
					this.form.dictValue = e.value[0].dictLabel
				}
				this.accountTradeList = []
				this.getAccountTradeInfo()
				this.show = false
			},
			// 关闭选择器
			close() {
				this.show = false
			},
			/**
			 * 获取用户账户交易详情
			 */
			getAccountTradeInfo: function() {
				if (!this.form.accountId || !this.form.accountType) {
					this.$refs.uToast.error('获取资产交易失败')
				} else {
					uni.showLoading({

					})
					getAccountTradeInfo(this.form).then(res => {
						if (res.data && res.data.code === 0) {
							uni.hideLoading()
							this.accountTradeList = [...this.accountTradeList, ...res.data.data.list]
							this.totalCount = res.data.data.totalCount
						}
					}).catch(errors => {
						uni.hideLoading()
						// this.$refs.uToast.error(errors)
					});
				}
			},
		},
	};
</script>
<style>
	@import '../../static/css/index/index.css';
	@import '../../static/css/common.css';
</style>
<style lang="less">
	page {
		background-color: #fff;
	}

	/deep/.u-button {
		height: auto;
		margin-top: 10rpx;
	}

	.value {
		text-align: right;
		font-weight: 600;
	}

	.statustxt {
		color: #fc575f;
		font-size: 24rpx;
		margin-top: 10rpx;
	}

	/deep/.u-cell__title {
		width: 320rpx;

		text {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}

	.shaixuan {
		font-size: 30rpx;
		font-weight: 600;
		color: #707070;

		image {
			width: 30rpx;
			height: 30rpx;
			margin-right: 10rpx;
		}
	}
</style>