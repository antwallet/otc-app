<template>
	<view>
		<u-navbar :fixed="true" :safeAreaInsetTop="false" bgColor="#fff" style="position: relative;z-index: 999;">
			<view class="u-nav-slot fl_al" slot="left" style="color: #f0614f;font-weight: 600;" @click="goHome">
			</view>
			<view class="u-nav-slot" style="color: #333;font-size: 32rpx;font-weight: bold;" slot="center">
				{{i18n.accountTrade.title}}
			</view>
		</u-navbar>
		<view class="" style="height: 88rpx;">
		</view>
		<view class="bg">
		</view>
		<view class="box">
			<view class="kuang">
				<view class="topxx fl_ju">
					<view class="xx_left fl_al">
						<view class="title">
							{{i18n.homeAssets.title2}}
						</view>
						<view class="time">
							{{ currentTime }}
						</view>
						<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/shuaxin.png" @click="getAccountInfo()" mode=""></image>
					</view>
				</view>
				<view class="cenxx fl_al">
					<text class="dengyu">≈</text>
					<text class="shu" v-if="assets.exchangeType == 'USD'">{{total_amount || 0}}</text>
					<text class="shu" v-else>{{Number(assets.exchangeMoney || 0).toFixed(2)}}</text>
					<sub class="danwei">{{assets.exchangeType}}</sub>
					<!-- <sub class="danwei">{{ redpacketFrom.accountTypeInfo }}</sub> -->
					<!-- <image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/xiala.png" mode=""></image> -->
				</view>
				<view class="fl_ju">
					<u-button type="primary" class="btnGg"
						:customStyle="{width:'320rpx',background:'#FC575F',border:'1px solid #FC575F'}" shape="circle"
						icon="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/chongzhi.png" :text="i18n.homeAssets.btn1" @click="chongzhi"></u-button>
					<u-button type="primary" class="btnGg"
						:customStyle="{width:'320rpx',border:'1px solid #333333',color:'#000'}" plain shape="circle"
						icon="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/tixian.png" @click="tixian" :text="i18n.homeAssets.btn2"></u-button>
				</view>
			</view>
			<view class="block_18" v-if="accountList===[] || accountList.length <= 0">
				<span class="text_3">{{i18n.homeAssets.zwxx}}</span>
			</view>
			<view class="block_18 kuang">
				<view class="fl_ju son" style="cursor: pointer;" v-for="(item,index) in accountList" :key='index'
					@click="getAccountTradeDetail(item)">
					<view class="image-text_28 flex-row">
						<image class="image_3" referrerpolicy="no-referrer"
							:src="'../../static/icon/'+item.accountTypeInfo+'.png'" />
						<span class="text_6">{{item.accountTypeInfo}}</span>
					</view>
					<view class="text-group_21 flex-col">
						<span class="text_9">{{item.amount}}</span>
						<text class="text_15">≈ {{assets.exchangeType == 'PHP'?'₱':assets.exchangeType == 'INR'?'₹':'$'}} {{Number(assets.exchangeMoney || 0).toFixed(2)}}</text>
					</view>
				</view>
			</view>
			<view class="tishi">
				{{i18n.page.text46}}
			</view>
		</view>

		<u-action-sheet @close="popupClose" :round="'30rpx'" :safeAreaInsetBottom="true" :actions="popupList.list"
			@select="selectClick" :title="popupTitle" :show="popupShow"></u-action-sheet>
		<u-toast ref="uToast" />
	</view>

</template>

<script>
	import {
		getUserInfo,
		getAccountInfo
	} from '@/api/index.js';
	import {
		antwalletbot,
		antwalletgroup
	} from "@/utils/util.js";
	import {
		addBot,
		getGroupsChannelName
	} from '@/api/sendpacket.js'

	export default {
		data() {
			return {
				// 提交数据
				redpacketFrom: {
					accountType: 'USDT',
					exchangeMoney: ''
				},
				// 初始化当前时间  
				currentTime: '',
				timer: '', //当前时间
				bzType: uni.getStorageSync('bzType'), //选择币种
				total_amount: '', //总余额
				assets: {}, //余额
				popupShow: false,
				accountList: [],
				popupList: {
					label: 0,
					list: [{
							name: '普通红包'
						},
						{
							name: '拼手气红包(金额随机)'
						},
					]
				},
				popupTitle: ''
			};
		},
		onLoad() {
			// 页面加载时设置初始时间，并启动定时器  
			this.updateTime();
			this.timer = setInterval(this.updateTime, 1000); // 每秒更新时间  
			this.getAccountInfo(this.bzType);
			if (window.Telegram) {
				Telegram.WebApp.BackButton.show(); // 显示返回按钮
				Telegram.WebApp.BackButton.onClick(() => {
					// 处理返回逻辑
					uni.navigateTo({
						url: '/pages/index/index?loading=no'
					})

				});
			}
		},
		onUnload() {
			// 页面卸载时清除定时器  
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.accountTrade.title
			});
			setTimeout(() => {
				window.Telegram.WebApp.MainButton.hide()
				this.showTelegramBackButton() // 再次尝试显示返回按钮
			}, 50)
		},
		mounted() {

		},

		methods: {
			showTelegramBackButton() {
				if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.BackButton) {
					window.Telegram.WebApp.BackButton.show()
				}
			},
			/**
			 * 获取用户账户详情
			 */
			getAccountInfo(e) {
				this.$nextTick(() => {
					getAccountInfo(e).then(res => {
						if (res.data && res.data.code === 0) {
							this.accountList = res.data.list || []
							this.assets = res.data
							if (this.accountList.length > 0) {
								this.huobiList = this.accountList.map(account => ({
									accountTypeInfo: account.accountTypeInfo,
									exchangeMoney: account.exchangeMoney
								}));
								console.log(this.huobiList)
								this.redpacketFrom = this.accountList[0]
								this.redpacketFrom.exchangeMoney = Number(this.redpacketFrom
									.exchangeMoney).toFixed(2)
								for (let i = 0; i < this.accountList.length; i++) {
									this.accountList[i].amount = Number(this.accountList[i].amount)
										.toFixed(2)
								}
							}
							this.total_amount = Number(res.data.total_amount).toFixed(2)
						}
					}).catch(errors => {
						this.$refs.uToast.error('获取用户账户信息失败,请联系管理员!')
					});
				})
			},
			// 年月日
			updateTime() {
				// 获取当前时间，并格式化为年月日时分秒的字符串  
				const now = new Date();
				const year = now.getFullYear();
				const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的  
				const day = String(now.getDate()).padStart(2, '0');
				const hours = String(now.getHours()).padStart(2, '0');
				const minutes = String(now.getMinutes()).padStart(2, '0');
				const seconds = String(now.getSeconds()).padStart(2, '0');

				// 拼接时间字符串  
				this.currentTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
			},
			// 关闭弹框
			popupClose() {
				this.popupShow = false
			},
			// 充值
			chongzhi() {
				uni.navigateTo({
					url: '/pages/charge/index'
				})
			},
			// 提现
			tixian() {
				uni.navigateTo({
					url: '/pages/withdrawal/index'
				})
			},
			// 单个资产明细
			getAccountTradeDetail(item) {
				console.log(JSON.stringify(item))
				uni.navigateTo({
					url: '/pages/index/account_trade_detail?accountId=' + item.accountId + '&accountType=' + item
						.accountType
				})
			},
			popupClose() {
				this.popupShow = false
				this.typeShow = false
				this.currencyShow = false
			},
			getGroupsChannelName() {
				setTimeout(() => {
					getGroupsChannelName(`tgroups_channel_name/list/${this.jsonType}`).then(res => {
						if (res.data && res.data.code === 0) {
							this.groupList = res.data.list
							// this.groupList = []
						}
					}).catch(errors => {
						this.$refs.uToast.error(errors.msg)
					});
				}, 1000); // 1秒的禁用时间
			},
			saveSendPacketCondition() {
				if (this.jsonType == 2) {
					this.redpacketFrom.channelName = this.chooseGroupOrChannel.split('#')[0]
					this.redpacketFrom.channelBotName = this.chooseGroupOrChannel.split('#')[1]
					this.redpacketFrom.isChannelNewMember = this.isReviceChoose
				} else if (this.jsonType == 1) {
					this.redpacketFrom.groupName = this.chooseGroupOrChannel.split('#')[0]
					this.redpacketFrom.groupBotName = this.chooseGroupOrChannel.split('#')[1]
					this.redpacketFrom.isGroupNewMember = this.isReviceChoose
				}
				this.jionClose()
			},
			getConditionShow() {

				this.isConditionShow = !this.isConditionShow
				if (!this.isConditionShow) {
					console.log('收起')
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300,
					})
					this.height = '--height:100%;--imageHeight:330px'
				} else {
					this.height = '--height:calc(100% + 156rpx);--imageHeight:398px'
					uni.pageScrollTo({
						scrollTop: 1000,
						duration: 300,
					})
					console.log('展开')
				}
			},
			// 智能防刷滑动按钮
			switchChange(e) {
				console.log('e', e);
			},
			// 顶部导航栏
			subsectionSelect(index) {
				console.log(this.redpacketFrom.redpacketType, 'this.redpacketFrom.redpacketType')
				this.subsection = index
				this.moneyText = index == 0 ? '金额' : this.redpacketFrom.redpacketType == '普通红包' ? '(普)单个金额' : '(拼)总金额'
				this.redpacketFrom.money = ''
				this.accountTypeImg = '../../static/icon/USDT.png'
				this.redpacketFrom.accountType = 'USDT'
				this.$refs.redpacketRule.clearValidate()
			},
			// 红包类型弹出框
			typePopupShow() {
				this.popupTitle = '红包类型'
				this.popupList.list = [{
						id: 0,
						name: '普通红包'
					},
					{
						id: 1,
						name: '拼手气红包(金额随机)'
					},
				]
				this.typeShow = true
				this.popupShow = true
				this.popupList.label = 0
			},
			// 弹出选择框
			selectClick(item) {
				console.log(item.name, 'item')
				this.redpacketFrom.accountTypeInfo = item.name
				this.redpacketFrom.exchangeMoney = this.huobiList.find(account => account.accountTypeInfo === item.name)
					?.exchangeMoney;
				this.redpacketFrom.exchangeMoney = Number(this.redpacketFrom.exchangeMoney).toFixed(2)
				console.log(this.huobiList)
				this.popupShow = false
			},
			currencyPopupShow(index) {
				this.popupTitle = '选择币种'
				// var arr=Object.values(this.dictionary).reverse()
				Object.values(this.dictionary).forEach((item, index) => {
					this.popupList.list[index].name = item
					if (item == 'TRX') {
						this.popupList.list[index].icon = '../../static/icon/TRX.png'
					} else {
						this.popupList.list[index].icon = '../../static/icon/USDT.png'
					}
				})
				console.log(this.popupList.list, '123')
				this.popupList.label = 1
				this.currencyShow = true
				this.popupShow = true
			}
		}
	}
</script>

<style lang="scss">
	@import '../../static/css/index/index.css';

	page {
		height: 100%;
		background: #F5F1F3;
		position: relative;
	}

	.tishi {
		color: #8E8E8E;
		font-size: 30rpx;
		position: fixed;
		bottom: 50rpx;
		left: 0;
		right: 0;
		margin: auto;
		text-align: center;
	}

	.bg {
		width: 100%;
		height: 268rpx;
		background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/top_zican.png');
		background-size: cover;
	}

	.box {
		position: absolute;
		top: 100rpx;
		left: 20rpx;
		right: 20rpx;

		.kuang {
			background-color: #fff;
			border-radius: 30rpx;
			padding: 30rpx;
			box-sizing: border-box;

			.son {
				border-bottom: 1px solid #E5E5E5;
				padding: 40rpx 0;
			}

			.son:nth-child(1) {
				padding-top: 0;
			}

			.son:last-child {
				border: none;
				padding-bottom: 0;
			}

			.xx_left {
				.title {
					font-size: 32rpx;
					color: #333333;
					font-weight: 600;
				}

				.time {
					font-size: 24rpx;
					color: #8E8E8E;
					margin: 0 10rpx 0 20rpx;
				}

				image {
					width: 20rpx;
					height: 20rpx;
				}
			}

			.xx_right {
				font-size: 24rpx;
				color: #8E8E8E;
				font-weight: 600;

				image {
					width: 12rpx;
					height: 20rpx;
					margin-left: 8rpx;
				}
			}

			.cenxx {
				margin: 40rpx 0;

				.dengyu {
					font-family: PingFangSC, PingFang SC;
					font-weight: 600;
					font-size: 48rpx;
					color: #333333;
				}

				.shu {
					font-family: PingFangSC, PingFang SC;
					font-weight: 600;
					font-size: 60rpx;
					color: #333333;
					margin-left: 10rpx;
				}

				.danwei {
					font-family: PingFangSC, PingFang SC;
					font-weight: 600;
					font-size: 32rpx;
					color: #333333;
					margin: 20rpx 10rpx 0 20rpx;
				}

				image {
					width: 28rpx;
					height: 16rpx;
				}
			}
		}
	}
</style>