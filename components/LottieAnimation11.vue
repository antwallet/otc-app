<template>
	<view class="">
		<view @click="renderScript.emitData" class="renderjs fl_cen" id="renderjs-view4">
		</view>
		<!-- 拼多多首页入口 -->
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
	import * as animationData from "@/static/json/lihua1.json"
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
					container: document.getElementById('renderjs-view4'),
					renderer: 'svg',
					loop: false, //是否循环播放
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
		position: absolute;
		bottom: 35%;
		z-index: 95;

		/deep/ svg {
			width: 750rpx !important;
			height: 750rpx !important;
		}
	}
</style>