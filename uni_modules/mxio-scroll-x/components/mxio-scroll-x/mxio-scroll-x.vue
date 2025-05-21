<template>
	<view class="mxio-scrollx-warpper">
		<scroll-view class="mxio-scrollx-box" scroll-x="true" @scroll="scroll" scroll-left="0">
			<view class="mxio-scrollx-box-grid" :style="{
				gridTemplateColumns:`repeat(4,162.5rpx)`}">
				<template>
					<!-- v-for="(item, index) in dataSource" :key="index" -->
			<!-- 		<view class="mxio-scrollx-box-grid_item" @click.stop="scrollItemClick('充值')">
						<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/index_icon4.png" :mode="imgMode"
							class="mxio-scrollx-box-grid_img">
						</image>
						<view class="mxio-scrollx-box-grid_txt">
							{{ i18n.home.tabs.tab1}}
							<br />
							{{ i18n.home.tabs.tab11}}
						</view>
					</view>
					<view class="mxio-scrollx-box-grid_item" @click.stop="scrollItemClick('提现')">
						<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/index_icon1.png" :mode="imgMode"
							class="mxio-scrollx-box-grid_img">
						</image>
						<view class="mxio-scrollx-box-grid_txt">
							{{ i18n.home.tabs.tab2}}
							<br />
							{{ i18n.home.tabs.tab21}}
						</view>
					</view> -->
					<view class="mxio-scrollx-box-grid_item" @click.stop="scrollItemClick('飞机会员')">
						<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/feiji.png" :mode="imgMode"
							class="mxio-scrollx-box-grid_img">
						</image>
						<view class="mxio-scrollx-box-grid_txt">
							{{ i18n.home.tabs.tab4}}
							<br />
							{{ i18n.home.tabs.tab41}}
						</view>
					</view>
					<view class="mxio-scrollx-box-grid_item" @click.stop="scrollItemClick('TORN能量')">
						<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/nengliang.png" :mode="imgMode"
							class="mxio-scrollx-box-grid_img">
						</image>
						<view class="mxio-scrollx-box-grid_txt">
							{{ i18n.home.tabs.tab3}}
							<br />
							{{ i18n.home.tabs.tab31}}
						</view>

					</view>

				</template>
				<!-- 	<template v-else>
					<slot></slot>
				</template> -->
			</view>
		</scroll-view>
		<!-- 	<view class="mxio-scrollx-bar-box" v-if="barShow" :style="{
			width:`${barWidthRpx}`,
			background:`${barBackground}`
		}">
			<view class="mxio-scrollx-bar-item" :style="{
				transform: `translateX(${scrollViewLeft}px)`
			}">
				<view class="mxio-scrollx-bar-item_H" :style="{
					width:`${barWidthHalfRpx}`,
					background:`${barColor}`
				}"></view>
			</view>
		</view> -->
	</view>
</template>
<script>
	export default {
		name: 'mxio-scroll-x',
		props: {
			barWidth: {
				type: Number,
				default: 80,
			},
			barColor: {
				type: String,
				default: '#FC575F',
			},
			barBackground: {
				type: String,
				default: '#ccc',
			},
			barShow: {
				type: String,
				default: '',
			},
			dataSource: {
				type: Array,
				default: () => []
			},
			column: {
				type: Number,
				default: 5
			},
			colList: {
				type: Number,
				default: 5
			},
			imgMode: {
				type: String,
				default: 'scaleToFill'
			}
		},
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		data() {
			return {
				scrollViewLeft: 0,
				scrollInnerWidth: 0,
				propscolList: 0,
				barWidthHalfCopy: 0,
				barWidthPx: 0,
				barWidthRpx: '0px',
				barWidthHalfRpx: '0px',
				scrollColumnWidth: '0px',
				propscolumn: 0,
				scroll_view_H: null,
				propsbarColor: '',
				propsbarBackground: ''
			}
		},
		mounted() {
			// bar宽度 2022-08-17 16:26:57
			this.barWidthPx = uni.upx2px(this.barWidth);
			this.barWidthHalfCopy = this.barWidthPx / 2;
			this.barWidthRpx = this.barWidthPx + 'px';
			this.barWidthHalfRpx = this.barWidthHalfCopy + 'px';

			// 列个数
			let dataSourceLen = this.dataSource.length;
			this.propscolList = 0;
			if (!dataSourceLen) {
				this.propscolList = this.colList
			} else {
				this.propscolList = this.colList > dataSourceLen ? dataSourceLen : this.colList
			}
			this.scrollViewDOMCal();
		},
		methods: {
			scroll(e) {
				let scrollLeft = e.detail.scrollLeft;
				let scrollWidth = e.detail.scrollWidth;
				let scrollItem = scrollWidth - this.scrollInnerWidth;
				let scrollItemCal = scrollLeft / scrollItem;
				let maxLeft = scrollItem;
				let nowLeft = scrollItemCal * this.barWidthHalfCopy;
				if (scrollLeft <= 0) nowLeft = 0;
				this.scrollViewLeft = nowLeft;
			},
			scrollViewDOM() {
				return new Promise((resolve) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.mxio-scrollx-box-grid').boundingClientRect(data => {
						resolve(data);
					}).exec();
				})
			},
			async scrollViewDOMCal() {
				let p = await this.scrollViewDOM();
				this.scrollInnerWidth = p.width;
				this.propscolumn = this.column <= 0 ? 5 : this.column;
				// console.log(this.propscolumn,'this.propscolumn')
				this.scrollColumnWidth = this.scrollInnerWidth / 4 + 'px';
				console.log(this.scrollColumnWidth, 'this.scrollColumnWidth')
			},
			scrollItemClick(item) {
				console.log(item)
				this.$emit('scrollItemEmitsClick', item)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.mxio-scrollx-warpper {
		.mxio-scrollx-box {
			white-space: nowrap;
			height: 130rpx;

			::v-deep.uni-scroll-view {
				&::-webkit-scrollBar {
					display: none;
				}
			}

			.mxio-scrollx-box-grid {
				display: grid;

				.mxio-scrollx-box-grid_item {
					display: flex;
					align-items: center;
					flex-direction: column;
					// padding: 24rpx 0;
					font-size: 24rpx;
					// overflow: hidden;
					// height: 104rpx;
				}

				.mxio-scrollx-box-grid_txt {
					color: #7d7d7d;
					font-size: 24rpx;
					// font-weight: 600;
					text-align: center;
				}

				.mxio-scrollx-box-grid_img {
					display: block;
					width: 60rpx;
					height: 60rpx;
					margin-bottom: 6rpx;
				}
			}
		}

		.mxio-scrollx-bar-box {
			height: 6rpx;
			margin: 10rpx auto;
			border-radius: 6rpx;

			.mxio-scrollx-bar-item {
				transition-property: transform;
				transition-delay: 0;
				transition-duration: 0.05s;
				transition-timing-function: linear;
				transform: translateX(0px);

				.mxio-scrollx-bar-item_H {
					height: 6rpx;
					border-radius: 6rpx;
				}
			}
		}
	}
</style>