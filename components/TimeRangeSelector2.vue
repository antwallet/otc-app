<template>
	<view class="time-range-selector">
<!-- 		<view class="labels">
			<text>0</text>
			<text>10%</text>
			<text>20%</text>
			<text>30%</text>
			<text>40%</text>
			<text>50%</text>
			<text>60%</text>
			<text>70%</text>
			<text>80%</text>
			<text>90%</text>
			<text>100%</text>
		</view> -->
		<slider :min="0" :max="20" :step="1" :value="sliderValue" @change="onSliderChange" activeColor="#ff6b6b"
			backgroundColor="#e0e0e0" />
		<view class="selected-text fl_ju">
			<text>{{i18n.paymentDetails.fctitle}}：{{sliderValue * 5}} %</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'TimeRangeSelector',
		data() {
			return {
				sliderValue: 3,
				options: ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45','50','55','60','65','70','75','80','85','90','95','100']
			}
		},
		computed: {
			i18n() {
				return this.$t('message')
			},
		},
		methods: {
			onSliderChange(e) {
				console.log(e)
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
		width: 38rpx !important;
		height: 38rpx !important;
		margin-top: -20rpx !important;
	}

	/deep/ .uni-slider-thumb {
		width: 38rpx !important;
		height: 38rpx !important;
		margin-top: -20rpx !important;
	}

	/deep/ uni-slider {
		margin: 20rpx !important;
	}

	/deep/.uni-slider-handle-wrapper {
		height: 12rpx;
	}

	.time-range-selector {
		padding: 20rpx 0 !important;
	}

	.uni-slider-tap-area {
		padding: 16rpx 20rpx;
		box-sizing: border-box;
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