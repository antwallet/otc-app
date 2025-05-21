<template>
	<view class="page flex-col">
		<u-navbar :fixed="true" :safeAreaInsetTop="false" bgColor="#fff" style="position: relative;z-index: 999;">
			<view class="u-nav-slot fl_al" slot="left" style="color: #f0614f;font-weight: 600;" @click="goHome">
			</view>
			<view class="u-nav-slot" style="color: #333;font-size: 32rpx;font-weight: bold;" slot="center">
				申诉
			</view>
		</u-navbar>
		<view class="" style="height: 88rpx;">
		</view>
		<view class="xinxi fl_al">
			<image src="../../static/icon/USDT.png" class="usdt" mode=""></image>
			<view class="shuju">
				<view class="name">
					{{xinxi.tradeTypeInfo}}
				</view>
				<view class="code fl_al">
					订单编号：{{xinxi.tradeNo}}
					<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/copy.png" mode="" @click="fuzhi(xinxi.tradeNo)"></image>
				</view>
				<view class="riqi">
					{{xinxi.createTime}}
				</view>
			</view>
		</view>
		<view class="kuang">
			<view class="box">
				<u--form label-align="right" :model="from" ref="rule" :rules="rule">
					<view class="title">
						问题描述 <text>（描述所遇问题及需求）</text>
					</view>
					<view class="miaoshu">
						<u-form-item ref="item1" prop="content">
							<u--textarea v-model="from.content" border="none" placeholder="请输入内容"></u--textarea>
						</u-form-item>
					</view>
					<view class="title">
						上传凭证 <text>（提供支付截图帮助更快解决）</text>
					</view>
					<view style="margin-top: 40rpx;">
						<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
							:maxCount="1"></u-upload>
					</view>
				</u--form>
			</view>
			<view class="btn">
				<u-button type="primary" @click="shoukuan" shape="circle"
					:customStyle="{width:'100%',background:'#2E6AF6',fontSize:'24rpx',border:'1px solid #2E6AF6',padding:'5rpx'}"
					text="确认"></u-button>
			</view>
		</view>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		createComplaintRecord
	} from '@/api/sendpacket.js'
	import {
		HTTP_REQUEST_URL,
	} from '@/config/app';
	export default {
		data() {
			return {
				xinxi: {},
				fileList1: [],
				from: {
					content: '',
					paymentId: ''
				},
				rule: {
					content: [{
						required: true,
						message: '问题描述不能为空',
						trigger: ['blur', 'change']
					}],
				},
			};
		},
		computed: {
			i18n() {
				return this.$t('message')
			},
			rechargeAmount() {
				return this.$store.state.rechargeAmount;
			},
		},
		onLoad(options) {
			console.log(options)
			this.from.paymentId = options.tradeNo
			this.xinxi = options
			if (window.Telegram) {
				Telegram.WebApp.BackButton.show(); // 显示返回按钮
				Telegram.WebApp.BackButton.onClick(() => {
					// 处理返回逻辑
					uni.navigateTo({
						url: '/pages/index/assets'
					})
				});
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.i18n.accountTrade.title
			});
		},

		methods: {
			// 复制收款编号
			fuzhi: function(event) {
				var that = this
				uni.setClipboardData({
					data: event,
					success: function() {
						uni.showToast({
							title: that.i18n.page.text33,
							icon: 'none'
						});
					},
					fail: (error) => {
						uni.showToast({
							title: '',
							icon: 'none'
						});
					}
				})
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			// 上传图片
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: HTTP_REQUEST_URL + '/api/front/complaint/uploadFile', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						header: {
							'token': uni.getStorageSync('token')
						},
						formData: {
							user: 'test'
						},
						success: (res) => {
							res.data = JSON.parse(res.data).data
							console.log(res.data)
							setTimeout(() => {
								resolve(res.data)
							}, 1000)
						}
					});
				})
			},
			// 确认
			shoukuan() {
				this.$refs.rule.validate().then(res => {
					if (this.fileList1[0]) {
						this.from.imageUrl = this.fileList1[0].url
					}
					console.log(this.from)
					uni.showLoading({})
					createComplaintRecord(this.from).then(res => {
						if (res.data && res.data.code === 0) {
							uni.hideLoading()
							this.$refs.uToast.success('申述已提交~')
							setTimeout(() => {
								uni.navigateBack()
							}, 2000); // 2000 毫秒，即 2 秒后执行操作
						}
					}).catch(errors => {
						uni.hideLoading()
						// this.$refs.uToast.error(errors)
					});
				});
			},
		},
	};
</script>
<style lang="less">
	page {
		background-color: #F3F3F3;
	}

	.xinxi {
		background-color: #fff;
		padding: 15rpx;
		box-sizing: border-box;

		.usdt {
			width: 100rpx;
			height: 100rpx;
			margin-right: 15rpx;
		}

		.name {
			font-size: 30rpx;
			font-weight: 600;
		}

		.code {
			margin: 10rpx 0;

			image {
				width: 30rpx;
				height: 30rpx;
				margin-left: 10rpx;
			}
		}

		.riqi,
		.code {
			font-size: 24rpx;
		}
	}

	.kuang {
		background-color: #F3F3F3;
		padding: 32rpx;
		box-sizing: border-box;

	}

	.box {
		background-color: #fff;
		padding: 32rpx;
		box-sizing: border-box;
		border-radius: 5rpx;

		.title {
			font-family: HarmonyOS Sans SC, HarmonyOS Sans SC;
			font-weight: 600;
			font-size: 32rpx;
			color: #333333;

			text {
				font-size: 24rpx;
				color: rgba(0, 0, 0, 0.45);
			}
		}

		.miaoshu {
			margin: 40rpx 0;
		}
	}

	.btn {
		width: 100%;
		background-color: #F3F3F3;
		margin-top: 64rpx;
	}
</style>