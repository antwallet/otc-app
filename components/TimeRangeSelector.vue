<template>
	<view class="time-range-selector">
		<view class="labels">
			<text>{{i18n.paymentDetails.dingyue.dw1}}</text>
			<text>{{i18n.paymentDetails.dingyue.dw2}}</text>
			<text>{{i18n.paymentDetails.dingyue.dw3}}</text>
			<text>{{i18n.paymentDetails.dingyue.dw5}}</text>
			<text>{{i18n.paymentDetails.dingyue.dw4}}</text>
		</view>
		<slider :min="0" :max="4" :step="1" :value="sliderValue" @change="onSliderChange" activeColor="#ff6b6b"
			backgroundColor="#e0e0e0" />
		<view class="selected-text fl_ju">
			<text>{{i18n.paymentDetails.dingyue.tou}}</text>
			<text>{{i18n.paymentDetails.dingyue.wei}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'TimeRangeSelector',
		data() {
			return {
				sliderValue: 3,
				options: ['1小时', '1天', '1周', '1个月', '无限制']
			}
		},
		computed: {
			i18n() {
				return this.$t('message')
			},
			selectedText() {
				if (this.sliderValue === 3) {
					return '永不过期'
				} else {
					return `过期时间: ${this.options[this.sliderValue]}`
				}
			}
		},
		methods: {
			onSliderChange(e) {
				this.sliderValue = e.detail.value
				this.$emit('change', this.options[this.sliderValue])
			}
		}
	}
</script>

<style scoped>
	/deep/.uni-slider-handle {
		background-color: #FC575F;
		border: 8rpx solid #FFFFFF;
	}

	/deep/.uni-slider-handle-wrapper {
		height: 12rpx;
	}

	.time-range-selector {
		padding: 20rpx 0 !important;
	}

	.uni-slider-tap-area {
		/* padding: ; */
	}

	.time-range-selector {
		padding: 20rpx;
	}

	.labels {
		display: flex;
		justify-content: space-between;
		margin-top: 10rpx;
	}

	.labels text {
		font-size: 24rpx;
		color: #8E8E8E;
	}

	.selected-text {
		margin-top: 20rpx;
		font-size: 24rpx;
		color: #333333;
	}
</style>