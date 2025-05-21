<template>
	<view class="container">
		<view class="music-control" @click="togglePlay" v-if="isPlaying">
			<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/laba.png" mode="aspectFit"
				class="music-icon" />
		</view>
		<view class="music-control" @click="togglePlay" v-else>
			<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/laba.png" mode="aspectFit"
				class="music-icon2" />
		</view>
		<view class="" v-if="!loading">
			<view class="guanka" v-if="type == 2">
				<view class="ka2 animate__animated animate__zoomIn">
				</view>
				<view class="title2">
					{{i18n.quaneti.title}}
				</view>
				<view class="tishi">
					{{i18n.quaneti.name}}{{sumData.freeWithdrawalCount}}
					{{i18n.quaneti.name2}}
					<view class="" style="font-size: 28rpx;color: #FFE082;margin: 10rpx 0;">
						{{i18n.quaneti.neirong}}
					</view>
				</view>
				<view class="listtitle fl_ju">
					<text> {{i18n.quaneti.tishi}}</text>
					<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/shuaxin.png"
						@click="yaoqingsum" mode=""></image>
				</view>
				<view class="yqtitle">
					<view class="avatar fl_al" v-for="(item,index) in sumData.list">
						<view class="tx">
							{{item.name[0]}}
						</view>
						{{item.name}}
					</view>
				</view>
				<LottieAnimation2 animationId="animation2" v-if="sumData.freeWithdrawalCount == 0"></LottieAnimation2>
				<view class="fl_ju fenxiang animate__animated animate__pulse animate__infinite"
					v-if="sumData.freeWithdrawalCount == 0">
					<view @click="handleVisibilityChange" class="go2 fl_cen">
						{{i18n.quaneti.btn2}}
					</view>
				</view>
				<view class="fl_ju fenxiang" v-else>
					<view @click="Touch2" class="go fl_cen">
						{{i18n.quaneti.btn}}
						<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/yaoqing.png" mode="">
						</image>
					</view>
					<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/fuzhi.png" class="fuzhi"
						@click="copyTextH5(code)" mode="">
					</image>
				</view>
			</view>
			<!-- 			<view class="guanka" v-if="type == 3">
				<view class="box1">
					<view class="animate__animated  animate__backInDown renwu2">
						<view class="title">恭喜你完成 <text class="gl">任务</text></view>
						<view class="kuangnei">
							<view class="maxtitle">
								太棒了,可以全额提现!
							</view>
							快去全额提现吧
						</view>
					</view>
				</view>
			</view> -->
		</view>

		<u-loading-page :loading="loading" loading-text=""></u-loading-page>
	</view>
</template>

<script>
	import 'animate.css';
	import {
		queryUserInfo,
		recordTaskInfo,
		queryAccountInfo,
		inviteUserList,
		getShareLink
	} from '@/api/index.js';
	import {
		antwalletbotCopy,
	} from "@/utils/util.js";
	import LottieAnimation2 from '@/components/LottieAnimation2.vue'
	export default {
		components: {
			LottieAnimation2,
		},
		data() {
			return {
				sumData: {}, //人数信息
				list: [],
				type: 2,
				timer: null,
				loading: true, //等待状态
				value: 30, //进度条数据
				pddInfo: {}, //拼多多信息
				audioContext: null,
				isPlaying: false,
				musicUrl: 'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/bgyy.mp3', // 替换为你的音乐文件地址
				code: '',
				status: '',
			}
		},
		computed: {
			i18n() {
				return this.$t('message')
			},

		},
		onShow() {
			this.yaoqingsum()
			this.initAudio()
			document.body.style.overflow = 'hidden';
		},
		onLoad() {

			if (window.Telegram) {
				Telegram.WebApp.BackButton.show(); // 显示返回按钮
				Telegram.WebApp.BackButton.onClick(() => {
					// 处理返回逻辑
					uni.redirectTo({
						url: '/pages/group_receive_redpacket/redpacket_operate'
					})
				});
			}
		},
		onUnload() {
			// 页面卸载时释放音频资源
			if (this.audioContext) {
				this.audioContext.destroy()
			}
			document.body.style.overflow = 'auto';
		},
		onHide() {
			// 页面卸载时释放音频资源
			if (this.audioContext) {
				this.audioContext.destroy()
			}
			document.body.style.overflow = 'auto';
		},
		methods: {
			// 音乐
			initAudio() {
				// 读取用户的播放偏好
				const shouldPlay = uni.getStorageSync('musicAutoPlay') !== 'false';

				this.audioContext = uni.createInnerAudioContext()
				this.audioContext.src = this.musicUrl
				this.audioContext.loop = true

				this.audioContext.onPlay(() => {
					this.isPlaying = true
				})
				this.audioContext.onPause(() => {
					this.isPlaying = false
				})
				this.audioContext.onError((res) => {
					console.error('音频播放错误：', res.errMsg)
					uni.showToast({
						title: '音频加载失败',
						icon: 'none'
					})
				})

				// 根据用户偏好决定是否自动播放
				if (shouldPlay) {
					this.audioContext.play()
				}
			},

			// 切换播放状态
			togglePlay() {
				if (this.isPlaying) {
					this.audioContext.pause()
				} else {
					this.audioContext.play()
				}
				// 保存用户的播放偏好
				uni.setStorageSync('musicAutoPlay', (!this.isPlaying).toString())
			},
			// 复制
			copyTextH5(text) {
				const textarea = document.createElement('textarea');
				textarea.value = text;
				textarea.readOnly = 'readOnly';
				document.body.appendChild(textarea);
				textarea.select();
				textarea.setSelectionRange(0, text.length);
				const result = document.execCommand('copy');
				textarea.remove();
				if (result) {
					uni.showToast({
						title: this.i18n.page.text33,
						icon: 'none'
					});
				} else {
					uni.showToast({
						title: this.i18n.page.text40,
						icon: 'none'
					});
				}
			},
			// 头像
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
			// 邀请人数信息
			yaoqingsum() {
				uni.showLoading({})
				inviteUserList().then(res => {
					if (res.data && res.data.code === 0) {
						console.log(res.data.data)
						uni.hideLoading()
						this.sumData = res.data.data
						this.sumData.list = this.sumData.list ? this.sumData.list : []

						this.jindu()
					}
				}).catch(errors => {
					this.loading = true
					this.$refs.uToast.error(errors.message)
				});

			},
			// 进度信息
			jindu() {
				queryUserInfo().then(res => {
					if (res.data && res.data.code === 0) {
						console.log(res.data.data)
						this.pddInfo = res.data.data
						this.loading = false
						console.log(this.type)
					}
				}).catch(errors => {
					this.$refs.uToast.error(errors.msg)
				});
				getShareLink().then(res => {
					if (res.data && res.data.code === 0) {
						this.code = antwalletbotCopy() + `?startapp=${res.data.data.shortLink}`

					}
				}).catch(errors => {
					this.$refs.uToast.error(errors.data.msg)
				});
			},
			// 分享按钮
			Touch2() {
				const message = '🎁Limited Time Offer! Click to Win $1.99~ $99.99 Cash Instantly';
				const shareText = encodeURIComponent(this.code + '\n\n' + message);
				// 或者这样写
				Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=&text=${shareText}`);
			},
			// 跳转提现
			handleVisibilityChange() {
				uni.navigateTo({
					url: '/pages/group_receive_redpacket/redpacket_operate'
				})
			},
		},
	}
</script>

<style lang="less">
	page {
		background-color: #19133B !important;
		position: relative;
		height: 100vh;
		padding-top: 110rpx;
	}

	.guanka {
		text-align: center;
		padding: 0 30rpx;
		box-sizing: border-box;

		.ka {
			width: 678rpx;
			height: 446rpx;
			background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/ka.png');
			background-size: cover;
			font-family: HarmonyOS Sans SC, HarmonyOS Sans SC;
			font-weight: 700;
			font-size: 62rpx;
			color: #FFA510;
			line-height: 446rpx;
			margin: 0 auto;
		}

		.ka2 {
			width: 686rpx;
			height: 338rpx;
			background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/yqbg.png');
			background-size: cover;
			font-family: HarmonyOS Sans SC, HarmonyOS Sans SC;
			margin: 0 auto;
		}

		font-family: HarmonyOS Sans SC,
		HarmonyOS Sans SC;
		font-weight: 700;
		color: #FFFFFF;

		.title {
			font-size: 64rpx;
			margin-top: 58rpx;
		}

		.title2 {
			font-size: 40rpx;
		}

		.tishi {
			font-size: 28rpx;
			margin: 20rpx 0 20rpx;
			text-align: left;
		}

		.fenxiang {
			margin-top: 20rpx;

			.go,
			.go2 {
				width: 550rpx;
				font-size: 36rpx;
				color: #FFFFFF;
				background: -webkit-linear-gradient(left, #6839A5, #F37394);
				padding: 36rpx 0;
				border-radius: 32rpx;
				cursor: pointer;

				image {
					width: 32rpx;
					height: 32rpx;
					margin-left: 16rpx;
				}
			}

			.go2 {
				width: 100%;
				position: relative;
				z-index: 99;
			}

			.fuzhi {
				width: 120rpx;
				height: 120rpx;
				cursor: pointer;
			}
		}

		.renwu {
			background-color: #fff;
			border-radius: 40rpx;
			padding: 26rpx 24rpx;
			box-sizing: border-box;
			margin-top: 16rpx;
			position: relative;

			.renwutxt {
				width: 80%;

				image {
					width: 64rpx;
					height: 64rpx;
					margin-right: 16rpx;
				}

				.neirong {
					width: 80%;

					.name {
						font-size: 26rpx;
						color: #333333;
					}

					.tishi2 {
						font-size: 28rpx;
						color: #908D8E;
						margin-top: 18rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}

		}

		.box1 {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			z-index: 99999;
			text-align: center;
			height: 800rpx;

			image {
				width: 700rpx;
				height: 570rpx;
			}

			.renwu2 {
				background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/renwu.png');
				background-size: cover;
				width: 100%;
				height: 556rpx;
				padding-top: 96rpx;
				position: relative;

				.title {
					font-weight: 700;
					font-size: 48rpx;
					color: #FFF4CC;

					.gl {
						background: -webkit-linear-gradient(top, #EAE04E, #F9C93F);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
					}
				}

				.kuangnei {
					position: absolute;
					bottom: 80rpx;
					left: 0;
					right: 0;
					font-weight: 700;
					font-size: 44rpx;
					color: #DD3B26;

					.maxtitle {
						font-size: 48rpx;
						color: #412416;
						margin-bottom: 14rpx;
					}
				}
			}

			.jiangli {
				width: 100%;
				text-align: center;

				image {
					width: 529rpx;
					height: 450rpx;
				}

				.tishi3 {
					width: 706rpx;
					margin: 0 auto;
					font-weight: 700;
					font-size: 48rpx;
					color: #FFF4CC;
					text-align: center;
					padding-bottom: 100rpx;
					position: relative;

					image {
						width: 100%;
						height: 100%;
						position: absolute;
						top: 0;
						left: 0;
					}

					.jlQian {
						font-size: 88rpx;
						color: #ffe96f;
						margin: 0 10rpx;
					}

					.jlDw {
						color: #ffe96f;
					}
				}
			}
		}
	}

	.listtitle {
		image {
			width: 45.4rpx;
			height: 40rpx;
			cursor: pointer;
		}
	}

	.yqtitle {
		height: 300rpx;
		overflow-y: auto;
		position: relative;
		z-index: 99;

		.avatar {
			color: #fff;
			font-weight: 700;
			margin: 20rpx 0rpx 0;
			font-size: 30rpx;
			text-align: left;
			width: 100%;
			background-color: #282b30;
			padding: 20rpx;
			box-sizing: border-box;
			border-radius: 40rpx;

			.tx {
				width: 70rpx;
				height: 70rpx;
				border-radius: 40rpx;
				border: 1px solid #fff;
				box-sizing: border-box;
				text-align: center;
				line-height: 60rpx;
				margin-right: 30rpx;
				// background-color: #1c1f24;
			}
		}

	}


	.music-control {
		position: fixed;
		top: 20rpx;
		right: 40rpx;
		z-index: 999999;
	}

	.music-icon {
		width: 80rpx;
		height: 80rpx;
		animation: rotate 3s linear infinite;
	}

	.music-icon2 {
		width: 80rpx;
		height: 80rpx;
	}

	/* 音乐播放时的旋转动画 */
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	/* 暂停时停止动画 */
	.music-control .music-icon {
		animation-play-state: var(--play-state, running);
	}

	.music-control[data-playing="false"] .music-icon {
		--play-state: paused;
	}
</style>