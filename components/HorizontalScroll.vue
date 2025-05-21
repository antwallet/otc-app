<template>
	<view class="horizontal-scroll" :class="customClass" @touchstart="onTouchStart" @touchmove="onTouchMove"
		@touchend="onTouchEnd" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp"
		@mouseleave="onMouseUp" @scroll.passive="onScroll" @click="handleClick">
		<slot></slot>
	</view>
</template>
<script>
	export default {
		name: 'HorizontalScroll',
		props: {
			customClass: {
				type: String,
				default: ''
			},
			edgeThrottleInterval: {
				type: Number,
				default: 200 // 默认 200 毫秒
			},
			clickPreventionTime: {
				type: Number,
				default: 300 // 滑动结束后阻止点击的时间（毫秒）
			}
		},
		data() {
			return {
				startX: 0,
				scrollLeft: 0,
				isMouseDown: false,
				moveDistance: 0,
				lastX: 0,
				isDragging: false,
				isAtLeftEdge: false,
				isAtRightEdge: false,
				lastLeftEmit: 0,
				lastRightEmit: 0,
				rightEdgeHoldTimer: null,
				rightEdgeHoldStart: null,
				rafId: null,
				lastScrollLeft: 0,
				maxScrollLeft: 0,
				isIOS: false,
				preventClick: false,
				clickPreventionTimer: null
			};
		},
		mounted() {
			this.$nextTick(() => {
				this.onScroll(); // 初始检查
				this.calculateMaxScroll();
				this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
			});
		},
		beforeDestroy() {
			this.cancelAnimationFrame();
		},
		computed: {
			scrollableWidth() {
				return Math.max(0, this.totalWidth - this.visibleWidth);
			}
		},
		methods: {
			onScroll() {
				if (this.rafId) {
					return;
				}
				this.rafId = requestAnimationFrame(() => {
					const {
						scrollLeft,
						scrollWidth,
						clientWidth
					} = this.$el;
					const now = Date.now();
					this.totalWidth = scrollWidth;
					this.visibleWidth = clientWidth;
					this.scrollLeft = scrollLeft;
					const isAtLeftEdge = scrollLeft <= 0;
					const isAtRightEdge = scrollLeft + clientWidth >= scrollWidth - 1;
					if (isAtLeftEdge && now - this.lastLeftEmit > this.edgeThrottleInterval) {
						this.$emit('reach-left');
						this.lastLeftEmit = now;
					}
					if (isAtRightEdge && now - this.lastRightEmit > this.edgeThrottleInterval) {
						this.$emit('reach-right');
						this.lastRightEmit = now;
						if (!this.rightEdgeHoldStart) {
							this.rightEdgeHoldStart = now;
						}
					} else {
						this.rightEdgeHoldStart = null;
					}
					this.isAtLeftEdge = isAtLeftEdge;
					this.isAtRightEdge = isAtRightEdge;
					// 只在滚动位置发生实际变化时才发出事件
					if (this.scrollLeft !== this.lastScrollLeft) {
						this.$emit('scroll-update', {
							scrollLeft: this.scrollLeft,
							totalWidth: this.totalWidth,
							visibleWidth: this.visibleWidth,
							scrollableWidth: this.scrollableWidth
						});
						this.lastScrollLeft = this.scrollLeft;
					}
					this.rafId = null;
				});
			},
			cancelAnimationFrame() {
				if (this.rafId) {
					cancelAnimationFrame(this.rafId);
					this.rafId = null;
				}
			},
			checkEdges() {
				this.onScroll();
			},
			calculateMaxScroll() {
				const {
					scrollWidth,
					clientWidth
				} = this.$el;
				this.maxScrollLeft = Math.max(0, scrollWidth - clientWidth);
			},
			onTouchStart(e) {
				this.startX = e.touches[0].pageX;
				this.lastX = this.startX;
				this.scrollLeft = this.$el.scrollLeft;
				this.moveDistance = 0;
				this.isDragging = false;
				this.clearRightEdgeHoldTimer();
			},
			onTouchMove(e) {
				const currentX = e.touches[0].pageX;
				const dx = this.lastX - currentX;
				this.lastX = currentX;

				// if (Math.abs(dx) > 0) {
				// 	this.isDragging = true;
				// 	let newScrollLeft = this.scrollLeft + dx;

				// 	if (this.isIOS) {
				// 		// 限制 iOS 设备的滚动范围
				// 		newScrollLeft = Math.max(0, Math.min(newScrollLeft, this.maxScrollLeft));
				// 	}

				// 	this.$el.scrollLeft = newScrollLeft;
				// 	this.moveDistance += Math.abs(dx);

				// 	if (this.isAtRightEdge && dx > 0) {
				// 		this.checkRightEdgeHold();
				// 	} else {
				// 		this.clearRightEdgeHoldTimer();
				// 	}
				// }

				// // 防止触发浏览器的默认行为（如页面滚动）
				// if (this.isIOS) {
				// 	e.preventDefault();
				// }
			},
			onTouchEnd() {
				this.emitSlideEvent();
				this.isDragging = false;
				this.clearRightEdgeHoldTimer();
				this.rightEdgeHoldStart = null;
				this.setClickPrevention();
			},
			onMouseDown(e) {
				e.preventDefault(); // 防止选中文本
				this.isMouseDown = true;
				this.startX = e.pageX;
				this.lastX = this.startX;
				this.scrollLeft = this.$el.scrollLeft;
				this.moveDistance = 0;
				this.isDragging = false;
				this.$el.classList.add('grabbing');
				this.clearRightEdgeHoldTimer();
			},
			onMouseMove(e) {
				if (!this.isMouseDown) return;
				e.preventDefault();
				const currentX = e.pageX;
				const dx = this.lastX - currentX;
				this.lastX = currentX;
				if (Math.abs(dx) > 0) {
					this.isDragging = true;
					this.$el.scrollLeft += dx;
					this.moveDistance += Math.abs(dx);
					if (this.isAtRightEdge && dx > 0) {
						this.checkRightEdgeHold();
					} else {
						this.clearRightEdgeHoldTimer();
					}
				}
			},
			onMouseUp(e) {
				if (this.isMouseDown) {
					this.emitSlideEvent();
					e.preventDefault();
				}
				this.isMouseDown = false;
				this.isDragging = false;
				this.$el.classList.remove('grabbing');
				this.clearRightEdgeHoldTimer();
				this.rightEdgeHoldStart = null;
				this.setClickPrevention();
			},
			setClickPrevention() {
				if (this.moveDistance > 5) { // 只有在移动距离大于阈值时才阻止点击
					this.preventClick = true;
					clearTimeout(this.clickPreventionTimer);
					this.clickPreventionTimer = setTimeout(() => {
						this.preventClick = false;
					}, this.clickPreventionTime);
				}
			},
			handleClick(e) {
				if (this.preventClick) {
					e.preventDefault();
					e.stopPropagation();
				}
			},
			emitSlideEvent() {
				if (this.moveDistance > 0) {
					this.$emit('slide-end', {
						distance: this.moveDistance,
						direction: this.lastX < this.startX ? 'left' : 'right'
					});
				}
			},
			checkRightEdgeHold() {
				if (this.rightEdgeHoldStart && Date.now() - this.rightEdgeHoldStart >= 1000) {
					this.$emit('right-edge-hold');
					this.rightEdgeHoldStart = null;
				} else if (!this.rightEdgeHoldTimer) {
					this.rightEdgeHoldTimer = setTimeout(() => {
						if (this.isAtRightEdge && this.isDragging) {
							this.$emit('right-edge-hold');
						}
						this.rightEdgeHoldTimer = null;
					}, 1000);
				}
			},
			clearRightEdgeHoldTimer() {
				if (this.rightEdgeHoldTimer) {
					clearTimeout(this.rightEdgeHoldTimer);
					this.rightEdgeHoldTimer = null;
				}
			}
		}
	};
</script>
<style scoped>
	.horizontal-scroll {
		overflow-x: auto;
		white-space: nowrap;
		-webkit-overflow-scrolling: touch;
		cursor: ew-resize;
		user-select: none;
		/* 添加以下属性以提高滚动性能 */
		-webkit-backface-visibility: hidden;
		-webkit-perspective: 1000;
		backface-visibility: hidden;
		perspective: 1000;
		will-change: transform;
		/* 禁用 iOS 的弹性滚动 */
		overscroll-behavior-x: none;
	}

	.horizontal-scroll.grabbing {
		cursor: grabbing;
	}

	.horizontal-scroll.no-click {
		pointer-events: none;
	}

	.horizontal-scroll::-webkit-scrollbar {
		display: none;
	}
</style>