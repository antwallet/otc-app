<template>
	<view class="">
		<view @click="renderScript.emitData" class="renderjs fl_cen" :id="containerId">
		</view>
		<!-- 礼花 -->
	</view>
</template>
<script>
	export default {
		props: {
			// 添加 animationId 属性用于区分不同动画
			animationId: {
				type: [String, Number],
				default: () => Math.random().toString(36).substr(2, 9)
			}
		},
		data() {
			return {
				lottieshow: false,
				containerId: `renderjs-view-${this.animationId}`
			}
		},
		onShow() {},
		methods: {
			Indexemit() {
				this.lottieshow = true
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
				console.log(this.containerId,'this.containerId')
				var params = {
					container: document.getElementById(this.containerId),
					renderer: 'svg',
					loop: this.animationId == 'animation3' ? false : true, //是否循环播放
					autoplay: true, //是否自动播放
					animationData: animationData // 加载json的文件名
				}
				var anim
				anim = lottie.loadAnimation(params); // 加载
				anim.addEventListener('complete', () => {
					this.$ownerInstance.callMethod('Indexemit', {
						destroy: true
					}) //传递响应事件，这里是播放完成自动销毁，我这里是开屏动画，用完直接销毁
					anim.destroy();
				});

			},
			// 接收逻辑层发送的数据
			receiveMsg(newValue, oldValue, ownerVm, vm) {
				console.log('newValue', newValue)
				console.log('oldValue', oldValue)
				console.log('ownerVm', ownerVm)
				console.log('vm', vm)
			},
			// 发送数据到逻辑层
			emitData(e, ownerVm) {
				ownerVm.callMethod('receiveRenderData', this.name)
			}
		}
	};
</script>
<style lang="less">
	.renderjs {
		height: 100vh;
		position: fixed;
		top: -180rpx;
		left: 0;
		right: 0;

		/deep/ svg {
			width: 100vw !important;
			height: 100vh !important;
		}
	}
</style>