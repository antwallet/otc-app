<template>
	<view class="">
		<view class="title">
			{{i18n.pddlc.yi.title}}
			<br />
			<text class="jin">{{i18n.pddlc.yi.title2}}</text>
			<text style="color: #f9d703;">{{i18n.pddlc.yi.title3}}</text>

		</view>
		<view @click="renderScript.playAnimation" class="renderjs fl_cen" id="renderjs-view2">
		</view>
		<view class="btn animate__animated animate__pulse animate__infinite shine-wrapper" v-if="show">
			<u-button type="primary" :text="i18n.pddlc.btn3" @click="renderScript.playAnimation"
				:customStyle="{width:'500rpx',height:'112rpx',color:'#fff',margin:'auto',
		fontSize: '48rpx',background: 'linear-gradient( 242deg, #F9B330 0%, #E5574F 91%)',border:'none',borderRadius:'350rpx'}"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lottieshow: false,
				show: true
			}
		},
		computed: {
			i18n() {
				return this.$t('message')
			},
		},
		methods: {
			// 播放完成的回调方法
			onAnimationComplete() {
				console.log('动画播放完成')
				// 在这里添加你想要的回调逻辑
				this.lottieshow = true
			}
		}
	}
</script>

<script module="renderScript" lang="renderjs">
	import * as animationData from "@/static/json/laohuji.json"
	import lottie from '@/libs/lottie-light.min.js'

	export default {
		data() {
			return {
				name: 'render-vm',
				animation: null
			}
		},
		mounted() {
			const script = document.createElement('script')
			script.src = lottie
			document.head.appendChild(script)
			script.onload = this.initAnimation()
		},
		methods: {
			initAnimation() {
				const params = {
					container: document.getElementById('renderjs-view2'),
					renderer: 'svg',
					loop: true,
					autoplay: true,
					animationData: animationData
				}

				this.animation = lottie.loadAnimation(params)
				// 添加完成事件监听
				this.animation.addEventListener('complete', () => {
					// 通知逻辑层动画播放完成
					this.$ownerInstance.callMethod('onAnimationComplete')
				})
			},

			playAnimation() {
				if (this.lottieshow) return
				this.lottieshow = true
				this.show = false
				this.timer = setTimeout(() => {
					this.$emit('jieshu', '动画结束了')
					clearTimeout(this.timer);
				}, 5000);
				if (this.animation && !this.animation.isPlaying) {
					this.animation.goToAndPlay(0, true)
				}
			},

			destroy() {
				if (this.animation) {
					this.animation.destroy()
					this.animation = null
				}
			}
		},
		beforeDestroy() {
			this.destroy()
		}
	}
</script>
<style lang="less">
	.title {
		font-family: HarmonyOS Sans SC, HarmonyOS Sans SC;
		font-weight: 700;
		font-size: 54rpx;
		color: #FFFFFF;
		line-height: 96rpx;
		text-align: center;
		font-style: normal;
		text-transform: none;
		position: absolute;
		left: 0;
		right: 0;
		top: 200rpx;

		.jin {
			margin-right: 10rpx;
			font-size: 80rpx;
			color: #f9d703;
		}
	}

	.btn {
		width: 500rpx;
		position: absolute;
		z-index: 100;
		left: 0;
		right: 0;
		top: 800rpx;
		margin: auto;
	}

	.renderjs {
		position: absolute;
		left: 0;
		right: 0;
		top: 200rpx;
		margin: auto;
		z-index: 90;

		/deep/ svg {
			width: 800rpx !important;
			height: 800rpx !important;
		}
	}

	.shine-wrapper {
		position: relative;
		overflow: hidden;
		border-radius: 50rpx;
		/* 确保光效不会溢出容器 */
	}

	.shine-wrapper::before {
		content: '';
		position: absolute;
		top: 0;
		left: -75%;
		width: 50%;
		height: 100%;
		background: linear-gradient(to right,
				rgba(255, 255, 255, 0) 0%,
				rgba(255, 255, 255, 0.7) 50%,
				rgba(255, 255, 255, 0) 100%);
		transform: skewX(-25deg);
		animation: shine 3s infinite;
		z-index: 10;
		/* 3秒循环一次 */
	}

	@keyframes shine {
		0% {
			left: -75%;
		}

		100% {
			left: 125%;
		}
	}
</style>