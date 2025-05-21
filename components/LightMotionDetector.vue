<template>
	<view class="shake-container">
		<!-- iOS 权限请求按钮 -->
		<view v-if="isIOS && !permissionGranted" class="auth-section">
			<button @click="requestPermission" class="auth-btn">开启摇一摇权限</button>
		</view>

		<!-- 摇一摇内容区域 -->
		<view v-else class="content">
			<text>摇一摇次数：{{ shakeCount }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isIOS: false,
				permissionGranted: false,
				shakeCount: 0,

				// 摇一摇检测相关参数
				lastTime: 0,
				lastX: 0,
				lastY: 0,
				lastZ: 0,
				shakeThreshold: 150, // 摇动阈值
				shakeDelay: 1000, // 防抖延迟
				canShake: true // 是否可以触发摇动
			}
		},

		// 页面加载时初始化
		onLoad() {
			// 检测是否为 iOS 设备
			this.isIOS = uni.getSystemInfoSync().platform === 'ios';

			// if (!this.isIOS) {
			// 非 iOS 设备直接初始化
			this.initShakeDetection();
			// }
		},

		// 页面卸载时清理
		onUnload() {
			this.removeShakeDetection();
		},

		methods: {
			// iOS 权限请求
			async requestPermission() {
				if (typeof DeviceMotionEvent?.requestPermission === 'function') {
					try {
						const response = await DeviceMotionEvent.requestPermission();
						if (response === 'granted') {
							this.permissionGranted = true;
							this.initShakeDetection();
							uni.showToast({
								title: '摇一摇已开启',
								icon: 'success'
							});
						} else {
							uni.showModal({
								title: '提示',
								content: '需要动作权限才能使用摇一摇功能',
								showCancel: false
							});
						}
					} catch (error) {
						console.error('权限请求失败:', error);
						uni.showToast({
							title: '权限获取失败',
							icon: 'none'
						});
					}
				}
			},

			// 初始化摇一摇检测
			initShakeDetection() {
				try {
					window.addEventListener('devicemotion', this.handleDeviceMotion, true);
				} catch (error) {
					console.error('添加设备运动监听失败:', error);
				}
			},

			// 移除摇一摇检测
			removeShakeDetection() {
				try {
					window.removeEventListener('devicemotion', this.handleDeviceMotion, true);
				} catch (error) {
					console.error('移除设备运动监听失败:', error);
				}
			},

			// 处理设备运动数据
			handleDeviceMotion(event) {
				if (!this.canShake) return;

				const acceleration = event.accelerationIncludingGravity;
				if (!acceleration) return;

				const currentTime = new Date().getTime();
				const diffTime = currentTime - this.lastTime;

				if (diffTime > 100) { // 控制检测频率
					const x = acceleration.x;
					const y = acceleration.y;
					const z = acceleration.z;

					const speed = Math.abs(
						x + y + z - this.lastX - this.lastY - this.lastZ
					) / diffTime * 10000;

					if (speed > this.shakeThreshold) {
						this.onShake();
					}

					this.lastTime = currentTime;
					this.lastX = x;
					this.lastY = y;
					this.lastZ = z;
				}
			},

			// 摇动触发事件
			onShake() {
				// if (!this.canShake) return;

				// this.canShake = false;
				this.shakeCount++;
				window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
				// 触发振动反馈
				// uni.vibrateShort({
				// 	success: () => {
				// 		console.log('振动成功');
				// 	}
				// });

				// 防抖：延迟后才能再次触发
				// setTimeout(() => {
				// 	this.canShake = true;
				// }, this.shakeDelay);
			}
		}
	}
</script>

<style scoped>
	.shake-container {
		padding: 30rpx;
	}

	.auth-section {
		display: flex;
		justify-content: center;
		padding: 40rpx 0;
	}

	.auth-btn {
		background-color: #007aff;
		color: #ffffff;
		padding: 20rpx 40rpx;
		border-radius: 10rpx;
		border: none;
	}

	.content {
		text-align: center;
		padding: 40rpx 0;
	}
</style>