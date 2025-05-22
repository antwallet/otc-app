<template>
	<view>
		<u-navbar :fixed="false" :safeAreaInsetTop="false" bgColor="#fff" style="position: relative;z-index: 999;">
			<view class="u-nav-slot fl_al" slot="left" style="color: #f0614f;font-weight: 600;" @click="goHome">
				<u-icon name="arrow-left" size="30rpx" color="#f0614f"></u-icon>{{i18n.sendpacketSend.title}}
			</view>
			<view class="u-nav-slot" style="color: #f0614f;font-size: 32rpx;font-weight: bold;" slot="center"></view>
		</u-navbar>
		<view class="haibao">
			<view class="title">
				<view class="">
					Easy & Secure
				</view>
				<view class="">
					Payment
				</view>
			</view>
			<view class="fl_ju liangbian">
				<view class="">
					Crypto Gift
				</view>
				<view class="">
					@PacketGift_Bot
				</view>
			</view>
		</view>
		<view class="btns fl_ju">
			<u-button type="primary" :plain="true" shape="circle" @click="fuzhi"
				:customStyle="{width:'150rpx',border:'1px solid #E5E5E5',padding:'40rpx 100rpx',boxSizing:'border-box',color:'#333333',fontWeight: '600'}"
				:text="i18n.sendpacketSend.btn1"></u-button>
			<u-button type="primary" @click="fenxiang" shape="circle" color="#FC575F"
				:customStyle="{width:'150rpx',border:'1px solid #E5E5E5',padding:'40rpx 100rpx',boxSizing:'border-box',color:'#fff',fontWeight: '600'}"
				:text="i18n.sendpacketSend.btn2"></u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		getUrlParam,
		antwalletbotCopy,
		antwalletbot,
		aseDecrypt
	} from "@/utils/util.js";
	import {
		setTokenLocal,
		removeTokenLocal,
		getRedpacketIdLocal,
		setRedpacketIdLocal
	} from "@/utils/localData.js";

	import {
		sendGroupRedPacket
	} from '@/api/sendpacket.js';
	import store from "@/store/index.js";
	export default {
		data() {
			return {
				link: uni.getStorageSync('link'),
				redpacket_title: '',
				redpacket_id: '',
				redpacket_status: 0,
				conditionsResultList: [],
				token: '',
				redPacketData: uni.getStorageSync('redPacketData'),
				userInfo: uni.getStorageSync('user'),
				show: false
			}
		},
		computed: {
			i18n() {
				return this.$t('message')
			},
			userTGID: {
				get() {
					return this.$store.state.user.userTGID
				},
				set(val) {
					this.$store.commit('user/updateUserTGID', val)
				}
			},
			firstName: {
				get() {
					return this.$store.state.user.firstName
				},
				set(val) {
					this.$store.commit('user/updateFirstName', val)
				}
			},
			userName: {
				get() {
					return this.$store.state.user.userName
				},
				set(val) {
					this.$store.commit('user/updateUserName', val)
				}
			},
			avatar: {
				get() {
					return this.$store.state.user.avatar
				},
				set(val) {
					this.$store.commit('user/updateAvatar', val)
				}
			}
		},
		onLoad() {
			// const eventChannel = this.getOpenerEventChannel()
			// eventChannel.on('link', (data) => {
			// 	this.link = data;
			// 	console.log(this.link)
			// })
			if (window.Telegram) {
				Telegram.WebApp.BackButton.show(); // 显示返回按钮
				Telegram.WebApp.BackButton.onClick(() => {
					// 处理返回逻辑
					uni.redirectTo({
						url: '/pages/index/index'
					})
				});
			}
		},
		methods: {
			// 复制链接
			fuzhi: function() {
				var that = this
				uni.setClipboardData({
					data: antwalletbotCopy() + '?startapp=' + this.link.link,
					success: function() {
						console.log('success');
						uni.showToast({
							title: that.i18n.page.text24,
							icon: 'none'
						});
					},
					fail: (error) => {
						console.log('失败', error);
						uni.showToast({
							title: '红包链接复制失败~',
							icon: 'none'
						});
					}
				})
			},
			/**
			 * 获取个人红包
			 */
			goHome: function() {
				uni.redirectTo({
					url: '/pages/index/index'
				})
			},
			// 立即分享
			fenxiang() {
			
			},
		}
	}
</script>

<style lang="scss" scoped>
	.haibao {
		width: 620rpx;
		height: 267rpx;
		margin: 0 auto;
		background-image: url('https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/shoukuan.png');
		background-size: cover;
		margin-top: 300rpx;
		position: relative;

		.title {
			font-weight: 800;
			font-size: 32rpx;
			color: #FFFFFF;
			position: absolute;
			top: 53rpx;
			right: 43rpx;
			text-align: center;
		}

		.liangbian {
			position: absolute;
			width: 90%;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			font-size: 24rpx;
			color: #FFFFFF;
			padding: 13rpx 20rpx 16rpx;
			box-sizing: border-box;
			border-top: 1px solid #ffffff78;
		}
	}

	.btns {
		width: 70%;
		margin: auto;
		margin-top: 100rpx;
	}
</style>