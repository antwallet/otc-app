<template>
	<view :style="{ backgroundColor: bgColor }">
		<u-loading-page :loading="true" :bg-color="bgColor" loading-text=""></u-loading-page>
	</view>
</template>

<script>
	import store from "@/store/index.js";
	import gaMixin from '@/components/ga.js'; // 引入公共脚本
	import HorizontalScroll from '@/components/HorizontalScroll.vue'
	import LottieAnimation from '@/components/LottieAnimation.vue'
	export default {
		mixins: [gaMixin], // 使用mixins将公共方法混入到当前组件
		components: {
			HorizontalScroll,
			LottieAnimation
		},
		data() {
			return {
				bgColor: '#ffffff', // 默认背景色
				list: [{
						name: '中文简体',
						color: '#303133',
						fontSize: '16'
					},
					{
						name: 'English',
						color: '#303133',
						fontSize: '16'
					}
				],
				// 提交数据
				redpacketFrom: {
					accountType: 'USD',
					exchangeMoney: ''
				},
				popupShow: false,
				title: '',
				visibleWidth: '',
				totalWidth: '',
				scrollLeft: '',
				showYy: false,
				popupTitle: '红包类型',
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
				name1: {
					accountTypeInfo: 'USD',
					exchangeMoney: ''
				},
				userInfo: uni.getStorageSync('user'),
				tguser: uni.getStorageSync('Tguser'),
				text1: '恭喜XX用户竞猜获得 XXX USDT！',
				dataSource: [{
						label: '充值', // 文本
						icon: 'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/chongzhi.png', // 图标 ，默认image标签，使用slot可自定义
					},
					{
						label: '提现',
						icon: 'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/tixian.png', // 图标 ，默认image标签，使用slot可自定义
					},
					{
						label: 'TORN能量',
						icon: 'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/nengliang.png', // 图标 ，默认image标签，使用slot可自定义
					},
					{
						label: '飞机会员',
						icon: 'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/feiji.png', // 图标 ，默认image标签，使用slot可自定义
					}
				],
				total_amount: 0,
				accountList: [],
				isSetChargePsw: false,
				show: false,
				show2: false,
				showlo: true,
				show3: false,
				checkboxShow: ['true'],
				isopen: false,
				isopen1: '',
				isopen2: '',
				isTabBarVisible: false, // 默认tabbar是可见的
				images: ['https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/loding.png',
					'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/loding.png',
					'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/loding.png',
					'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/loding.png',
					'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/loding.png',
					'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/loding.png'
				],
				huobiList: [],
				donglist: [],
				showTs: false,
				showHua: false,
				huaIndex: 0,
				type: '',
				hash: '',
				showStop: false,
				deviceType: '',
				gradient: '',
				zuoyouBox: false, //最左侧和最右侧true则可以点击触发
				jishu: 0, //第一次不算
				scrollTop: 0,
				timeDiff: {
					hours: '0',
					hours2: '0',
					minutes: '0',
					minutes2: '0',
					seconds: '0',
					seconds2: '0',
				},
			};
		},
		computed: {
		},
		onLoad(options) {
			if (window.Telegram && window.Telegram.WebApp) {
				const webApp = window.Telegram.WebApp;
				if (webApp.colorScheme === 'dark') {
					this.bgColor = '#17212b'
					uni.setStorageSync('colorScheme', '黑夜模式')
				} else if (webApp.colorScheme === 'light') {
					this.bgColor = '#fff'
					uni.setStorageSync('colorScheme', '白天模式')
				} else {
					uni.setStorageSync('colorScheme', '未知')
				}
			}
			this.runSomeCode()
		},
		onShow() {
			if (window.Telegram) {
				Telegram.WebApp.BackButton.hide(); // 显示返回按钮
			}
		},
		mounted() {},
		methods: {
			// 获取用户信息
			runSomeCode() { //这个要走在share那个前面
				uni.$emit('callAppMethod')
			},
		}
	};
</script>
<style lang="scss" scoped>
	@import '../../static/css/index/index.css';
	@import '../../static/css/index/donghua.css';
	// @import '../../static/css/common.css';

	.page {
		display: flex;
		flex-direction: column;
		height: 100vh;
		// overflow: hidden;
		background-color: #f5f1f3 !important;
		position: relative;
	}


	.lottery {
		width: 100%;
		height: 200rpx;
		background-repeat: no-repeat;
		background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/images/lottery.png');
		background-size: 100% 100%;
		padding: 0 30rpx;
		box-sizing: border-box;

		.lottery_left {
			text-align: center;
			padding-top: 30rpx;
			padding-left: 30rpx;
			box-sizing: border-box;

			.jiangchi {
				.containerRight {
					margin-left: 20rpx;

					.add {
						image {
							width: 14rpx;
							height: 20rpx;
							margin-right: 12rpx;
						}

						font-family: PingFang SC,
						PingFang SC;
						font-weight: 800;
						font-size: 22rpx;
						color: #FFFFFF;
					}

					.jcdw {
						font-family: PingFang SC, PingFang SC;
						font-weight: 800;
						font-size: 22rpx;
						color: #FFFFFF;
					}
				}

				.number-3d {
					font-size: 72rpx;
					font-weight: bold;
					/* 设置背景为线性渐变 */
					background: linear-gradient(180deg, #FFF2CA 0%, #FFAB00 100%);
					/* 使用 -webkit-background-clip: text 来裁剪背景 */
					-webkit-background-clip: text;
					color: transparent;
					// text-shadow: 0 0px 0 #9424b6, 0 5px 0 #888, 0 5px 0 #777, 0 5px 0 #EB5865, 0 5px 0 #555, 0 5px 0 #444, 0 5px 0 #333, 0 5px 3px #bd289c;
					font-style: normal;
					font-family: AlibabaPuHuiTi_3_115_Black;
				}
			}
		}


		.djs {
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 28rpx;
			color: #FFFFFF;

			text {
				margin: 0 10rpx;
			}

			.djsson {
				background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/choujiang/cjdjs.png');
				background-repeat: no-repeat;
				background-size: cover;
				width: 40rpx;
				height: 43rpx;
				margin-right: 6rpx;
			}

			.djsson:last-child {
				margin-right: 0rpx;
			}
		}

		.btn {
			font-family: PingFang SC, PingFang SC;
			font-weight: 800;
			font-size: 32rpx;
			color: #533701;
			line-height: 38rpx;
			letter-spacing: 3px;
		}
	}

	.content-scroll {
		flex: 1;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		/* 为 iOS 设备提供平滑滚动 */
	}

	/* 针对 iPhone X 及以上机型的底部安全区适配 */
	@supports (padding-bottom: constant(safe-area-inset-bottom)) or (padding-bottom: env(safe-area-inset-bottom)) {
		.tabbar {
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
		}
	}

	// ----------------------------------
	.red-packet-list {
		/* 自定义样式 */
	}

	.red-packet-item {
		display: inline-block;
		margin-right: 10px;
		/* 其他样式 */
	}

	// ----------------------------------
	.hide-tabbar {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 200rpx;
		/* 根据你的Tabbar高度调整 */
		background-color: #fff;
		/* 覆盖层的颜色，可以是透明或其他颜色 */
		z-index: 999;
		/* 确保覆盖层在其他内容之上 */
	}

	.scroll-view {
		white-space: nowrap;
		overflow: hidden;
		width: 100%;
	}

	.scroll-item {
		display: inline-block;
	}

	button {
		margin-top: 20rpx;
	}

	.hezi {
		position: relative;
		width: 100%;

		.leftjt {
			width: 80rpx;
			height: 80rpx;
			top: 140rpx;
			left: 0;
			margin: auto;
			z-index: 999;
			position: absolute;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.rightjt {
			width: 80rpx;
			height: 80rpx;
			top: 140rpx;
			right: 0;
			margin: auto;
			z-index: 999;
			position: absolute;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.zwhd {
		text-align: center;

		image {
			width: 200rpx;
			height: 200rpx;
		}

		color: #8E8E8E;
	}

	.title2 {
		font-weight: 600;
		font-size: 32rpx;
		color: #333333;
		margin-bottom: 20rpx;
		height: 44rpx;

		.gengduo {
			font-size: 24rpx;
			color: #8E8E8E;
		}

		.bian {
			width: 8rpx;
			height: 28rpx;
			background-color: #FC575F;
			border-radius: 4rpx;
			margin-right: 10rpx;
		}
	}



	.gonggao {
		margin: 30rpx 0;
	}

	/deep/.u-notice-bar {
		width: 100%;
		background: linear-gradient(90deg, rgba(252, 87, 95, 0) 0%, #fc575f2e, rgba(252, 87, 95, 0) 100%);

		.u-notice__content__text {
			font-weight: 600 !important;
		}
	}

	.loading {
		text-align: center;
		padding: 15px;
	}

	.no-more {
		text-align: center;
		color: #888;
		padding: 15px;
	}

	.box {
		// position: absolute;
		padding: 20rpx;
		box-sizing: border-box;
		overflow-y: auto;
		background-color: #f5f1f3;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			width: 100%;
			height: 348rpx;
			background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/homebg.png');
			background-size: 100% 100%;
			z-index: 10;
		}

		.header {
			margin-bottom: 20rpx;
			position: relative;
			z-index: 100;

			.head_left {
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				font-size: 36rpx;
				color: #FFFFFF;

				.avatar {
					display: inline-flex;
					justify-content: center;
					align-items: center;
					color: #fff;
					font-weight: 700;
					background-color: #fff;
					width: 64rpx;
					height: 64rpx;
					margin-right: 20rpx;
					border-radius: 50%;
				}

				image {
					width: 64rpx;
					height: 64rpx;
					margin-right: 20rpx;
					border-radius: 50%;
				}
			}

			.yuyan {
				width: 52rpx;
				height: 52rpx;
			}
		}

		.kuang {
			background-color: #fff;
			border-radius: 30rpx;
			padding: 30rpx;
			box-sizing: border-box;
			position: relative;
			z-index: 100;

			.btns {
				.btn_right {
					.liwu {
						background-color: #FAF7F8;
						border-radius: 20rpx;
						font-family: PingFangSC, PingFang SC;
						font-weight: 600;
						font-size: 20rpx;
						color: #FC575F;
						padding: 2rpx 10rpx 2rpx 0;
						box-sizing: border-box;

						image {
							width: 32rpx;
							height: 32rpx;
							margin-right: 10rpx;
						}
					}

					.pl {
						font-family: PingFangSC, PingFang SC;
						font-weight: 600;
						font-size: 24rpx;
						color: #8E8E8E;
						margin: 0 18rpx 0 30rpx;

						image {
							width: 32rpx;
							height: 32rpx;
							margin-right: 10rpx;
						}
					}

					.shoucang {
						width: 36rpx;
						height: 36rpx;
					}
				}

				.btn_left {
					font-family: PingFangSC, PingFang SC;
					font-weight: 600;
					font-size: 24rpx;
					color: #8E8E8E;

					image {
						width: 32rpx;
						height: 32rpx;
						margin-right: 8rpx;
					}
				}
			}

			.gailv {
				.bfb {
					font-weight: 600;
					font-size: 24rpx;
					color: #4A85FF;
					margin-bottom: 10rpx;
				}

				text-align: center;
				font-weight: 600;
				font-size: 24rpx;
				color: #8E8E8E;
				margin-top: -80rpx;
			}

			.wenti {
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				font-size: 32rpx;
				color: #333333;

				image {
					width: 64rpx;
					height: 64rpx;
					margin-right: 20rpx;
					border-radius: 50%;
				}
			}

			.topxx {
				height: 40rpx;
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
				margin: 40rpx 0 0;

				/deep/.u-icon__img {
					width: 22rpx !important;
					height: 28rpx !important;
					margin-right: 10rpx !important;
				}

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
					margin: 0 10rpx 0 20rpx;
				}

				image {
					width: 28rpx;
					height: 16rpx;
				}
			}
		}
	}

	.logo-container {
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		left: 0;
		display: flex;
		justify-content: center;
		height: 100vh;
		background-color: #fff;
		z-index: 999;
		/* 使用视口高度单位 */
	}

	.logo {
		margin-top: 200rpx;
		width: 248rpx;
		height: 320rpx;
		// animation: fadeInScaleOut 1s ease-in-out forwards;
		animation: fadeInScaleIn 1s ease-in-out forwards;
	}

	@keyframes fadeInScaleIn {
		0% {
			opacity: 0;
			transform: scale(0.5);
		}

		50% {
			opacity: 1;
			transform: scale(1);
		}

		100% {
			opacity: 0;
			transform: scale(1);
		}
	}

	.popupShow {
		text-align: center;
		width: 700rpx;
		min-height: 900rpx;
		padding: 60rpx 20rpx 20rpx;
	}

	.text-wrapper_3 {
		margin-top: 70px;
	}

	.box_1 {
		border: 1px solid #0350FF;
	}

	.box_1 {
		background-color: #0350FF;

		span {
			color: #fff;
		}
	}

	.box_2 {
		border-radius: 23px;
		border: 1px solid rgba(51, 51, 51, 1);
		padding: 15rpx 80rpx;
		margin-left: 15px;
		color: rgba(51, 51, 51, 1);

		::v-deep .uicon-arrow-downward {
			color: rgba(51, 51, 51, 1) !important;
		}
	}

	.box_2:hover {
		background-color: rgba(3, 80, 255, 1);
		border-radius: 23px;
		color: rgba(255, 255, 255, 1);
		border: 1px solid rgba(51, 51, 51, 1);
		padding: 15rpx 80rpx;
		margin-left: 15px;

		::v-deep .uicon-arrow-downward {
			color: rgba(255, 255, 255, 1) !important;
		}
	}
</style>