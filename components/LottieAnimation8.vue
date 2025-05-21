<template>
	<view class="">
		<view @click="renderScript.emitData" class="renderjs fl_cen" id="renderjs-view5">
		</view>
		<!-- 任务小手 -->
	</view>
</template>
<script>
	export default {
		data() {
			return {
				lottieshow: false
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
	import * as animationData from "@/static/json/jinbidl.json"
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
					container: document.getElementById('renderjs-view5'),
					renderer: 'svg',
					loop: true, //是否循环播放
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
				// 添加每轮动画完成的回调
				anim.addEventListener('loopComplete', () => {
					this.$ownerInstance.callMethod('onLoopComplete')
				})
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

		/deep/ svg {
			width: 300rpx !important;
			height: 300rpx !important;
		}
	}
</style>