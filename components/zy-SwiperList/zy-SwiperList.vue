<template>
	<view class="swiper" @touchstart="swiperItemTouchStart" @touchend="swiperItemTouchEnd" :style="{
		height:height + 'rpx',
	}" v-if="show">
	    <view class="translate" v-if="mode == 'translate'" :style="{
			flexShrink: 0,
			width: (page * 100)  + '%',
			transform: 'translateX(-' +  (index * 100 / page) + '%)'
		}">
		<slot :swiper="swiper" :styleBox="{showStyle, hideStyle}" :translateDistance="translateDistance" :swiperIndex="index"></slot>
		</view>	
		<template v-else>
			<slot :swiper="swiper" :styleBox="{showStyle, hideStyle}" :translateDistance="translateDistance" :swiperIndex="index"></slot>
		</template>
		<view class="pointer" v-if="showPoiner">
			<view v-for="(v,i) in page" :style="{backgroundColor: index == i ? slectedColor : noselectColor}">
			</view>
		</view> 
	</view>
</template>

<script>
	export default {
		name:"SwiperList",
		data() {
			return {
				swiper:[],
				startPageX:0,
				endPageX:0,
				translateDistance:0,
				index:0,
				width:'100%',
				page:0,
				show:false
			};
		},
		props:{
			value:{
				type: Array,
				required: true
			},
			number:{
				type: Number,
				default: 1
			},
			mode:{
				type: String,
				default: 'translate'
			},
			distance:{
				type: Number,
				default: 100
			},
			height:{
				type: Number,
				required: true
			},
			slectedColor:{
				type: String,
				default: '#333'
			},
			noselectColor:{
				type: String,
				default: '#ccc'
			},
			showPoiner:{
				type: Boolean,
				default: true
			}
		},	
		methods:{
			initSwiperArray(){
				let swiper = []
				this.swiper.length = this.value.length % this.number == 0 ? (this.value.length / this.number) : (Math.floor(this.value.length / this.number) + 1)
				for(let i = 0; i < this.swiper.length; i++){
					var arr = [];
					for(let j = i * this.number; j < this.number * (i + 1); j++){
						if(!this.value[j]){
							break;
						}
						arr.push(this.value[j])
						arr = arr.filter(item => (item))
					}
					swiper.push(arr)
				}
				this.swiper = swiper
			},
			swiperItemTouchStart(e){
				this.startPageX = e.changedTouches[0].pageX
			},
			swiperItemTouchEnd(e){
				this.endPageX = e.changedTouches[0].pageX
				if(Math.abs(this.startPageX - this.endPageX) > this.distance){
					if(this.startPageX < this.endPageX){
						if(this.index == 0){
							return
						}
						this.index--
					}else{
						if(this.index == this.swiper.length - 1){
							return
						}
						this.index++
					}
				}
			}
		},
		watch:{
			swiper:{
				handler(newVal,oldVal){
					this.page = newVal.length
					this.width = 100 / newVal.length + '%'
					this.show = true
				},
				deep:true
			},
			value:{
				handler(newVal){
					console.log(123)
					this.initSwiperArray()
				},
				deep:true,
				immediate:true
			}
		},
		computed:{
			showStyle(){
				if(this.mode == 'opacity'){
					return 'opacity:1;transition: all 0.5s ease;position:absolute;top:0;left:0'
				}
				return 'width:' + this.width
			},
			hideStyle(){
				if(this.mode == 'opacity'){
					return 'opacity:0;transition: all 0.5s ease;position:absolute;top:0;left:0'
				}
				return 'width:' + this.width
			}
		}
	}
</script>

<style scoped lang="less">
    .swiper{
		width: 100%;
		height: 100%;
		display: flex;
		overflow: hidden;
		position: relative;
		transition: all 0.5s ease;
		.translate{
			transition: all 0.5s ease;
			display: flex;
		}
		.pointer{
			position: absolute;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			bottom: 0rpx;
			view{
				width: 18rpx;
				height: 18rpx;
				border-radius: 50%;
				margin: 0 4rpx;
				// background: blue;
				&.on{
					// background: pink;
				}
			}
		}
	}
	/deep/ .scoped-ref{
		width: 100%;
		display: flex;
	}
</style>