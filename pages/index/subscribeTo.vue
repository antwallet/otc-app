<template>
	<view>

		<view class="fl_ju header">
			<!-- <image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/avatar1.png" mode=""></image> -->
			<view class="fl_al">
				<view class="avatar fl_cen" :style="{ background: setRandomGradient() }">
					<text>{{result.sendUserName[1]}}</text>
				</view>
				<view class="xinxi">
					<view class="name">
						{{result.sendUserName}}
					</view>
					<view class="liuyan">
						{{i18n.subscribeTo.liuyan}}：{{result.comment || '无'}}
					</view>
				</view>
			</view>
			<u-button type="primary" @click="kefu" v-if="result.customerServiceLink"
				:customStyle="{width:'200rpx',background:'#169bd5',border:'1px solid #169bd5'}" shape="circle"
				:text="i18n.subscribeTo.btn5"></u-button>
		</view>
		<view class="fl_ju liangbain">
			<view class="leixing fl_al">
				<block v-if="result.channelConditions || result.groupsConditions">
					<image src="../../static/images/redpacket_cover/xing.png" mode=""></image>
					{{i18n.subscribeTo.type.text2}}
				</block>
				<block v-else>{{i18n.subscribeTo.type.text1}}</block>
			</view>
			<view class="rukou" @click="shoukuan">
				{{i18n.subscribeTo.go}}
			</view>
		</view>
		<view class="title" v-if="result.status ==2 || result.status ==3 || result.status ==4 || result.status ==5">
			{{i18n.subscribeTo.status.text4}}
		</view>
		<view class="title" v-else-if="result.status ==1 && status ==5">
			{{i18n.subscribeTo.status.text5}}
		</view>
		<view class="title" v-else>
			{{status == 6?i18n.subscribeTo.status.text1:
			status == 1?i18n.subscribeTo.status.text2:
		status == 4?i18n.subscribeTo.status.text2:
			status == 0?i18n.subscribeTo.status.text2:
			subscribeTo.status.text2}}
		</view>
		<view class="shuju fl_cen">
			<image src="../../static/icon/USDT.png" mode=""></image>
			<view class="fl_cen">
				<view class="">
					<text style="font-size: 64rpx;">{{result.money}}</text>
					<text style="font-size: 40rpx;">USDT</text>
				</view>
				<view class="" v-if="result.channelConditions || result.groupsConditions" style="font-size: 40rpx;">
					<text>/</text>
					<text v-if="result.subscriptionHours == 0">{{i18n.subscribeTo.text1.text6}}</text>
					<text v-if="result.subscriptionHours == 1">{{i18n.subscribeTo.text1.text3}}</text>
					<text v-if="result.subscriptionHours == 24">{{i18n.subscribeTo.text1.text4}}</text>
					<text v-if="result.subscriptionHours == 168">{{i18n.subscribeTo.text1.text5}}</text>
					<text v-if="result.subscriptionHours == 720">{{i18n.subscribeTo.text1.text8}}</text>

				</view>
			</view>
		</view>
		<block v-if="result.channelConditions || result.groupsConditions">
			<view class="fl_cen" style="font-size: 24rpx;" v-if="result.subscriptionHours !=0 && status != 6">
				{{i18n.subscribeTo.daoqi}}：<text>{{userList.subscriptionExpiryTime}}</text>
			</view>
		</block>

		<!-- 当channelConditions或者groupsConditions有值说明是订阅收款 -->
		<block v-if="result.channelConditions || result.groupsConditions">
			<view class="" v-if="result.status != 4 && result.status != 5">
				<view class="zhifu" @click="fukuan" style="background-color: #E6CC9B;color: #946409;">

					<text v-if="status != 6">
						{{i18n.subscribeTo.btn4}}
					</text>
					<text v-else>{{i18n.subscribeTo.btn2}}</text>
				</view>
			</view>
		</block>
		<!-- 否则是普通收款 -->
		<block v-else>
			<!-- 当收款状态为0或者1表示收款进行中 -->
			<!-- 当个人状态为6，未付款 -->
			<view class="" v-if="result.status == 0 || result.status == 1">
				<view class="zhifu" @click="fukuan" style="background-color: #46BA5B;color: #fff;" v-if="status == 6">
					{{i18n.subscribeTo.btn1}}
				</view>
			</view>
		</block>

		<view class="yue">
			{{i18n.subscribeTo.title}}：{{total_amount}} <text @click="chongzhi"> {{i18n.subscribeTo.btn3}}</text>
		</view>
		<view class="box" v-if="result.channelConditions || result.groupsConditions">
			<u-loadmore :status="status2" line :nomoreText="i18n.subscribeTo.title2" />
			<view class="tiaojian">
				<image src="../../static/images/redpacket_cover/pingdao.png" mode=""></image>
				{{i18n.subscribeTo.text1.text2}}[{{result.channelConditions}}{{result.groupsConditions}}]<text
					v-if="result.groupsConditions">{{i18n.subscribeTo.text1.type2}}</text><text
					v-if="result.channelConditions">{{i18n.subscribeTo.text1.type1}}</text>,
				{{i18n.subscribeTo.text1.text2}}
				<text v-if="result.subscriptionHours == 0">{{i18n.subscribeTo.text1.text6}}</text>
				<text v-if="result.subscriptionHours == 1">1{{i18n.subscribeTo.text1.text3}}</text>
				<text v-if="result.subscriptionHours == 24">1{{i18n.subscribeTo.text1.text4}}</text>
				<text v-if="result.subscriptionHours == 168">1{{i18n.subscribeTo.text1.text5}}</text>
				<text v-if="result.subscriptionHours == 720">1{{i18n.subscribeTo.text1.text8}}</text>
				<text style="color: blue;cursor: pointer;" v-if="status != '6'"
					@click="jiaru">(&nbsp;&nbsp;{{i18n.subscribeTo.text1.text2}}&nbsp;&nbsp;)</text>
			</view>
			<view class="tiaojian">
				<image src="../../static/images/redpacket_cover/pingdao.png" mode=""></image>
				{{result.subscriptionDesc}}
			</view>
			<view class="tiaojian">
				<image src="../../static/images/redpacket_cover/pingdao.png" mode=""></image>
				{{i18n.subscribeTo.text2}}
			</view>
			<view class="tiaojian">
				<image src="../../static/images/redpacket_cover/pingdao.png" mode=""></image>
				{{i18n.subscribeTo.text3}}
			</view>

		</view>
		<u-divider text=""></u-divider>
		<view class="jilu">
			{{i18n.subscribeTo.title3}} ({{result.paymentCount}}/{{result.tronTransNum}})
		</view>
		<view class="list fl_ju" v-for="(item,index) in list" :key="item.id">
			<!-- <image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/avatar1.png" mode=""></image> -->
			<view class="avatar fl_cen" :style="{ background: setRandomGradient() }">
				<text>{{item.paymentUserName[0]}}</text>
			</view>
			<view class="list_shuju fl_ju">
				<text>{{item.paymentUserName}}</text>
				<text>{{i18n.subscribeTo.status.text3}} {{item.paymentMoney}} U</text>
			</view>
		</view>
		<u-loadmore :status="status2" v-if="count>15" />
		<u-empty iconSize="200rpx" v-if="list.length == 0" mode="list" icon="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/list.png"
			:text="i18n.page.text53">
		</u-empty>
		<view class="" style="height: 140rpx;">

		</view>
		<view class="fenxiang">
			<u-button type="primary" @click="fenxiang" v-if="result.sharingRatio"
				:customStyle="{background:'#FF505D',border:'1px solid #FF505D'}" shape="circle"
				:text="i18n.subscribeTo.fx1+(result.sharingRatio * 100).toFixed()+i18n.subscribeTo.fx2"></u-button>
		</view>
		<view class="overlay" v-show="loading">
			<LottieAnimation />
		</view>
		<u-toast ref="uToast" />
		<u-popup mode="center" round="10" :show="false" :overlay="true" :closeOnClickOverlay="true"
			:safeAreaInsetBottom="true" :safeAreaInsetTop="true" :closeable="true" :customStyle="{
		          width: '90%',
		          height: '384rpx',
		        }" @close="showMod = false">
			<view class="u-popup-slot">
				<view class="title">
					{{i18n.subscribeTo.huanying}}
				</view>
				<view class="content" v-if="result.channelConditions">
					{{result.channelConditions}}{{i18n.subscribeTo.text1.type1}}
				</view>
				<view class="content" v-if="result.groupsConditions">
					{{result.groupsConditions}} {{i18n.subscribeTo.text1.type2}}
				</view>
				<view class="status_button">
					<view class="doubling2" @click="jiaru">{{i18n.subscribeTo.text1.text2}}</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getUrlParam
	} from "@/utils/util.js";
	import {
		getGroupTronTransIdLocal,
		setGroupTronTransIdLocal,
		setShareUserIdLocal,
		removeShareUserIdLocal,
		getShareUserIdLocal
	} from "@/utils/localData.js";
	import {
		getTronTransAccount,
		tPaymentRecords
	} from '@/api/sendpacket.js'
	import {
		getAccountInfo,
		handleUserShareRecord
	} from '@/api/index.js'
	import {
		getOriginalData,
	} from '@/api/group_receive_redpacket.js';
	import LottieAnimation from '@/components/LottieAnimation.vue'
	export default {
		components: {
			LottieAnimation
		},

		data() {
			return {
				userList: {}, //到期时间
				link: '', //分享链接
				loading: true, //loading
				result: {}, //收款详情
				shareUserId: '', //分享人id
				total_amount: 0,
				list: [],
				isSetChargePsw: uni.getStorageSync('isSetChargePsw'),
				user: uni.getStorageSync('user'),
				status: '6',
				status2: '',
				form: {
					pageIndex: 1,
					pageSize: 10,
					tronTransId: '',
					tgId: ''
				},
				count: 0,
				showMod: false,
				tan: uni.getStorageSync('tank')
			};
		},
		computed: {
			i18n() {
				return this.$t('message')
			},
		},
		onLoad(options) {
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
			this.list = []
			setTimeout(() => {
				window.Telegram.WebApp.MainButton.hide()
				this.showTelegramBackButton() // 再次尝试显示返回按钮
			}, 50)

		},
		mounted() {
			this.init()
			getAccountInfo().then(res => {
				if (res.data && res.data.code === 0) {
					this.total_amount = Number(res.data.list[0].exchangeMoney).toFixed(2)
				}
			}).catch(errors => {});
		},
		onReachBottom() {
			// 滑动到底部时触发的逻辑  
			console.log('页面滑动到底部了');
			var sum = Math.ceil(this.count / 15);
			if (sum > this.form.pageIndex) {
				console.log('有下一页')
				this.status2 = 'loading';
				this.form.pageIndex++
				this.fukuanList()
			} else {
				console.log('没有下一页')
				this.status2 = 'nomore'
			}
		},
		methods: {
			// tg返回按钮
			showTelegramBackButton() {
				if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.BackButton) {
					window.Telegram.WebApp.BackButton.show()
				}
			},
			// 订阅
			dingyue() {
				Telegram.WebApp.openTelegramLink('https://t.me/' + e.botName); //跳转频道或者群租或者bot或者miniapp
			},
			// 头像随机
			// 随机头像背景
			setRandomGradient() {
				const randomColor = () => {
					const r = Math.floor(Math.random() * 256);
					const g = Math.floor(Math.random() * 256);
					const b = Math.floor(Math.random() * 256);
					return `rgba(${r}, ${g}, ${b}, 1)`;
				};
				const color1 = randomColor();
				const color2 = randomColor();
				const color3 = randomColor();
				const color4 = randomColor();

				const gradient = `linear-gradient(45deg, ${color1} 0%, ${color2} 33%, ${color3} 66%, ${color4} 100%)`;
				return gradient;
			},
			// 付款
			fukuan() {
				if (Number(this.total_amount) < Number(this.result.money)) {
					this.$refs.uToast.error(this.i18n.subscribeTo.tishi)
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/charge/index'
						});
					}, 1000)
					return
				} else {
					if (this.isSetChargePsw) {
						let subscribeToData = {
							tronTransId: this.tron_trans,
							shareUserId: this.shareUserId
						}
						uni.navigateTo({
							url: '/pages/charge_psw/get_index?type=subscribeTo',
							success: function(res) {
								const eventChannel = res.eventChannel;
								eventChannel.emit('subscribeToData',
									subscribeToData);
							}
						})
					} else {
						let subscribeToData = {
							tronTransId: this.tron_trans,
						}
						uni.navigateTo({
							url: '/pages/charge_psw/set_index?type=subscribeTo',
							success: function(res) {
								const eventChannel = res.eventChannel;
								eventChannel.emit('subscribeToData',
									subscribeToData);
							}
						})
					}
				}
			},
			// 客服
			kefu() {
				let str = this.result.customerServiceLink
				// 如果首字符有@,处理去掉
				str = str[0] === '@' ? str.slice(1) : str
				window.location = 'https://t.me/' + str
			},
			// 去收款
			shoukuan() {
				uni.setStorageSync('initiateUrl', 'subscribeTo')
				uni.navigateTo({
					url: '/pages/index/initiate?type=subscribeTo'
				})
			},
			// 充值
			chongzhi() {
				uni.navigateTo({
					url: '/pages/charge/index'
				})
			},
			// 分享
			fenxiang() {
				var that = this
				getOriginalData(that.link).then(res => {
					if (res.data.code === 0) {
						window.Telegram.WebApp.switchInlineQuery(res.data.data + ' ' + that.link.money + 'USDT', [
							"users",
							"groups"
						])
						// }
					} else {
						this.$refs.uToast.error('请在TG环境操作')
					}
				})
			},
			// 收款人信息
			init: function() {
				var tronTransId = getUrlParam('tronTransId', null) //获取tronTransId
				var shareUserId = getUrlParam('shareUserId', null) //获取tronTransId
				if (tronTransId) {
					setGroupTronTransIdLocal(tronTransId || '') //放在本地缓存
				}
				if (shareUserId) {
					removeShareUserIdLocal()
					setShareUserIdLocal(shareUserId || '') //放在本地缓存
				}
				this.shareUserId = getShareUserIdLocal()
				this.tron_trans = getGroupTronTransIdLocal()
				this.form.tronTransId = getGroupTronTransIdLocal()
				// this.tron_trans = 'tron_trans_1849027732294737920'

				getTronTransAccount(this.tron_trans).then(res => {
					if (res.data && res.data.code === 0) {
						console.log(res.data.result)
						this.result = res.data.result
						// 付款人列表
						this.fukuanList()
						// 分享
						this.record()
					}
				}).catch(errors => {
					console.log(errors)
					this.$refs.uToast.error(errors.msg)
				});
			},
			record() {
				// 分享接口
				var that = this
				handleUserShareRecord({
					tronTransId: that.tron_trans,
				}).then(res => {
					if (res.data && res.data.code === 0) {
						console.log(res.data.result)
						this.link = res.data.result.link
					}
				}).catch(errors => {
					console.log(errors)
					this.$refs.uToast.error(errors.msg)
				});
			},
			// 加入
			jiaru() {
				if (this.result.channelConditions) {
					window.location = 'https://t.me/' + this.result.channelConditions
				}
				if (this.result.groupsConditions) {
					window.location = 'https://t.me/' + this.result.groupsConditions
				}
			},
			// 付款list表
			fukuanList() {
				var that = this
				// 查全部付款人列表信息
				if (!that.loading) {
					uni.showLoading({})
				}
				tPaymentRecords(this.form).then(res => {
					if (res.data && res.data.code === 0) {
						console.log(res.data.list)
						uni.hideLoading()
						this.list = [...this.list, ...res.data.list.list]
						that.loading = false
						that.count = res.data.list.count
					}
				}).catch(errors => {
					uni.hideLoading()
					this.$refs.uToast.error(errors.msg)
				});
				// 查个人付款状态
				tPaymentRecords({
					pageIndex: 1,
					pageSize: 10,
					tronTransId: that.tron_trans,
					tgId: that.user.userTGID
				}).then(res => {
					if (res.data && res.data.code === 0) {
						console.log(res.data.list)
						if (res.data.list.list.length == 0) {
							that.status = '6' //用户没有付款
						} else {
							that.status = res.data.list.list[0].status
							that.userList = res.data.list.list[0]
						}
						if (that.result.channelConditions || that.result.groupsConditions) {
							if (res.data.list.list.length == 1 && that.tan == 'yes') {
								that.showMod = true
								uni.removeStorageSync('tank')
							}
						}

					}
				}).catch(errors => {
					this.$refs.uToast.error(errors.msg)
				});

			}
		}
	};
</script>
<style lang="scss" scoped>
	page {
		padding: 30rpx 20rpx;
		box-sizing: border-box;
	}

	.fenxiang {
		width: 100%;
		position: fixed;
		bottom: 0rpx;
		left: 0;
		right: 0;
		margin: auto;
		padding: 30rpx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.header {
		padding-bottom: 32rpx;
		border-bottom: 1px solid #E5E5E5;

		.avatar {
			width: 100rpx;
			height: 100rpx;
			margin-right: 16rpx;
			border-radius: 50%;
			color: #fff;
			font-size: 40rpx;
			font-weight: 600;
		}

		image {
			width: 100rpx;
			height: 100rpx;
			margin-right: 16rpx;
		}

		.name {
			font-family: PingFangSC, PingFang SC;
			font-size: 32rpx;
			color: #333333;
			margin-bottom: 12rpx;
		}

		.liuyan {
			font-family: PingFangSC, PingFang SC;
			font-size: 24rpx;
			color: #8E8E8E;
		}
	}

	.liangbain {
		padding-top: 30rpx;

		.leixing {
			font-family: PingFangSC, PingFang SC;
			font-size: 28rpx;
			color: #E89E42;

			image {
				width: 28rpx;
				height: 28rpx;
				margin-right: 10rpx;
			}
		}

		.rukou {
			font-family: PingFangSC, PingFang SC;
			font-weight: 500;
			font-size: 28rpx;
			color: #666666;
			border-bottom: 1px solid #B5B5B5;
		}
	}

	.title {
		width: 100%;
		text-align: center;
		margin: 30rpx auto 34rpx;
		font-family: PingFangSC, PingFang SC;
		font-weight: 500;
		font-size: 28rpx;
		color: #8E8E8E;
	}

	.shuju {
		image {
			width: 56rpx;
			height: 56rpx;
			margin-right: 10rpx;
		}

		font-family: PingFangSC;
		font-weight: 600;
		font-size: 36rpx;
		color: #333333;
		line-height: 64rpx;
		text-align: left;
		font-style: normal;
		margin-bottom: 20rpx;
	}

	.zhifu {
		background-color: #E6CC9B;
		font-family: PingFangSC, PingFang SC;
		font-weight: 500;
		font-size: 36rpx;
		color: #946409;
		padding: 28rpx 0;
		border-radius: 100rpx;
		text-align: center;
		width: 320rpx;
		box-sizing: border-box;
		margin: 20rpx auto;
	}

	.yue {
		font-family: PingFangSC, PingFang SC;
		font-weight: 500;
		font-size: 24rpx;
		color: #8E8E8E;
		text-align: center;

		text {
			font-family: PingFangSC, PingFang SC;
			font-weight: 500;
			font-size: 24rpx;
			color: #FC575F;
			text-decoration-line: underline;
			margin-left: 30rpx;
		}
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
			margin-top: 50rpx;
			justify-content: space-around;
			align-items: center;

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

		}
	}

	.box {
		background-color: #FAF7F8;
		border-radius: 10rpx;
		padding: 20rpx 18rpx;
		box-sizing: border-box;
		margin: 20rpx 0 32rpx;

		.tiaojian {
			display: flex;
			align-items: center;

			image {
				width: 28rpx;
				height: 28rpx;
				margin-right: 8rpx;
				margin-top: 10rpx;
			}

			font-family: PingFangSC,
			PingFang SC;
			font-weight: 400;
			font-size: 24rpx;
			color: #333333;
			margin-top: 16rpx;
			line-height: 40rpx;
		}
	}

	.jilu {
		font-family: PingFangSC, PingFang SC;
		font-weight: 500;
		font-size: 28rpx;
		color: #8E8E8E;
	}

	.list {
		.avatar {
			width: 68rpx;
			height: 68rpx;
			margin-top: 40rpx;
			border-radius: 50%;
			color: #fff;
			font-size: 30rpx;
			font-weight: 600;
		}

		image {
			width: 68rpx;
			height: 68rpx;
			margin-top: 40rpx;
		}

		.list_shuju {
			width: 600rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 500;
			font-size: 28rpx;
			color: #333333;
			padding: 44rpx 0;
			border-bottom: 1px solid #E5E5E5;
		}

	}
</style>