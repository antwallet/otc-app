<template>
	<view class="">
		<view v-if="lottieshow" @click="renderScript.emitData" class="renderjs fl_cen" id="renderjs-view3">
		</view>
		<!-- 礼花 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lottieshow: true // 默认显示
			}
		},
		methods: {
			Indexemit() {
				this.lottieshow = false // 动画完成后隐藏
			}
		}
	}
</script>

<script module="renderScript" lang="renderjs">
	import * as animationData from "@/static/json/diaoluo2.json"
	import lottie from '@/libs/lottie-light.min.js'

	export default {
		data() {
			return {
				name: 'render-vm',
			}
		},
		mounted() {
			const script = document.createElement('script')
			script.src = lottie
			document.head.appendChild(script)
			script.onload = this.ready()
		},
		methods: {
			ready() {
				var params = {
					container: document.getElementById('renderjs-view3'),
					renderer: 'svg',
					loop: false, // 设置为 false，只播放一次
					autoplay: true,
					animationData: animationData,
				}

				var anim = lottie.loadAnimation(params);
				// 设置速度
				anim.setSpeed(2); // 设置为3倍速度

				// 开始播放动画
				anim.play();
				// 监听动画完成事件
				anim.addEventListener('complete', () => {
					// 通知父组件隐藏动画
					this.$ownerInstance.callMethod('Indexemit')
					// 销毁动画实例
					anim.destroy();
				});
			},
			receiveMsg(newValue, oldValue, ownerVm, vm) {
				console.log('newValue', newValue)
				console.log('oldValue', oldValue)
				console.log('ownerVm', ownerVm)
				console.log('vm', vm)
			},
			emitData(e, ownerVm) {
				ownerVm.callMethod('receiveRenderData', this.name)
			}
		}
	};
</script>

<style lang="less">
	.renderjs {
		position: fixed;
		bottom: 100rpx;
		right: 0rpx;
		left: 0;
		z-index: 100;

		/deep/ svg {
			width: 700rpx !important;
			height: 700rpx !important;
		}
	}
</style>