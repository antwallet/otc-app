<!-- 
 
 usage:
 
 num:显示的数字
 color：字体颜色
 width：每个数字的宽度
 height:字体高度
 fontSize：字体大小
 
 <countup :num="123.453" color="#ff9e50" width='13' height='23' fontSize='23'></countup> 
 -->
<template>
	<view class="number-box">
		<block v-for="(myIndex, index) in indexArr" :key="index">
			<swiper class="swiper" vertical="true" :current="myIndex" circular="true"
				v-bind:style="{color:color,width:myIndex == 10 ? '10px' : width+'px',height:height+'px',fontSize:fontSize+'px'}">
				<swiper-item>
					<view :class="color?'swiper-item':'swiper-item2'">0</view>
				</swiper-item>
				<swiper-item>
					<view :class="color?'swiper-item':'swiper-item2'">1</view>
				</swiper-item>
				<swiper-item>
					<view :class="color?'swiper-item':'swiper-item2'">2</view>
				</swiper-item>
				<swiper-item>
					<view :class="color?'swiper-item':'swiper-item2'">3</view>
				</swiper-item>
				<swiper-item>
					<view :class="color?'swiper-item':'swiper-item2'">4</view>
				</swiper-item>
				<swiper-item>
					<view :class="color?'swiper-item':'swiper-item2'">5</view>
				</swiper-item>
				<swiper-item>
					<view :class="color?'swiper-item':'swiper-item2'">6</view>
				</swiper-item>
				<swiper-item>
					<view :class="color?'swiper-item':'swiper-item2'">7</view>
				</swiper-item>
				<swiper-item>
					<view :class="color?'swiper-item':'swiper-item2'">8</view>
				</swiper-item>
				<swiper-item>
					<view :class="color?'swiper-item':'swiper-item2'">9</view>
				</swiper-item>
				<swiper-item>
					<view :class="color?'swiper-item':'swiper-item2'">.</view>
				</swiper-item>
			</swiper>
		</block>
	</view>
</template>

<script>
	export default {
		props: {
			num: [String, Number],
			color: {
				type: String,
				default: '#000000'
			},
			width: {
				type: String,
				default: '15'
			},
			height: {
				type: String,
				default: '15'
			},
			fontSize: {
				type: String,
				default: '15'
			}
		},
		data() {
			return {
				indexArr: []
			};
		},
		created() {
			let {
				num
			} = this;
			let arr = new Array(num.toString().length);
			arr.fill(0);
			this.indexArr = arr;
		},
		watch: {
			num: function(val, oldVal) {
				// 处理新老数据长度不一样的情况
				let arr = Array.prototype.slice.apply(this.indexArr);
				let newLen = val.toString().length;
				let oldLen = oldVal.toString().length;
				if (newLen > oldLen) {
					for (let i = 0; i < newLen - oldLen; i++) {
						arr.push(0);
					}
					this.indexArr = arr;
				}
				if (newLen < oldLen) {
					for (let i = 0; i < oldLen - newLen; i++) {
						arr.pop();
					}
					this.indexArr = arr;
				}
				this.numChange(val);
			}
		},
		mounted() {
			//定时器作用：app显示数字滚动
			this._time = setTimeout(() => {
				this.numChange(this.num);
				clearTimeout(this._time);
			}, 50);
		},
		methods: {
			/**
			 * 数字改变
			 * @value 数字
			 */
			numChange(num) {
				let {
					indexArr
				} = this;
				let copyIndexArr = Array.prototype.slice.apply(indexArr);
				let _num = num.toString();
				for (let i = 0; i < _num.length; i++) {
					if (_num[i] === '.') {
						copyIndexArr[i] = 10;
					} else {
						copyIndexArr[i] = Number(_num[i]);
					}
				}
				this.indexArr = copyIndexArr;
				// this.log(this.indexArr);
			}
		}
	};
</script>

<style lang="scss">
	.number-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.swiper {
		position: relative;
		// 	line-height: 30upx;
		// 	height: 30upx;
		// 	font-size: 30upx;
		// 	background: red;
	}

	.swiper:after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.swiper-item {
		font-weight: bold;
	}

	.swiper-item2 {
		font-size: 110rpx;
		font-weight: bold;
		/* 设置背景为线性渐变 */
		background: linear-gradient(180deg, #FFF2CA 0%, #FFAB00 100%);
		/* 使用 -webkit-background-clip: text 来裁剪背景 */
		-webkit-background-clip: text;
		color: transparent;
	}
</style>