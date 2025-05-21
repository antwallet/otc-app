<template>
	<view class="page flex-col">
		<view class="section_1 fl_ju">
			<view class="xinxi flex-row fl_al">
				<u-avatar :src="avatar.avatar" shape="square" v-if="avatar.avatar" size="50"></u-avatar>
				<view class="avatar" style="font-size: 40rpx;" :style="'background:'+ avatar.gradient" v-else>
					{{avatar.firstName[0]}}
				</view>
				<view class="text-group_user flex-col">
					<view class="text_2">{{avatar.firstName}}</view>
					<view class="flex-row fuzhi">
						<span class="text_3 cu" style="margin: 0 10rpx 0 0;" @click="onClipboard">ID：{{avatar.userTGID}}
						</span>
						<image
							src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/copy.png"
							@click="onClipboard" mode=""></image>
					</view>
				</view>
			</view>
			<view class="qiehuan">
				<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/yuyanzh.png"
					@click="showYy = true" mode=""></image>
			</view>
		</view>
		<!-- 	<view class="flex-col">
			<view class="group_2 flex-col">
				<u-collapse :border="false">
					<u-collapse-item name="share" class="text-group_5">
						<text slot="title" class="userTitle">{{ i18n.my.tabs.title1.title}}</text>
						<u-icon name="https://antwallet.org/antwalletbot_client/static/images/user/share.png"
							size="36rpx" style="margin-right: 20rpx;cursor: pointer;" slot="icon"></u-icon>
						<view class="group_3 flex-col"></view>
						<view class="list_1 flex-row">
							<view class="text-group_3 flex-col" v-for="(item, index) in loopData0" :key="index">
								<span class="text_4_1" v-if="item.lanhutext1==='总计手续费' || item.lanhutext1==='获得奖励' "
									v-html="item.lanhutext0"></span>
								<span class="text_4_1" v-if="item.lanhutext1==='手续费比例' || item.lanhutext1==='邀请人数' "
									v-html="item.lanhutext0"></span>
								<span class="text_5"
									v-if="item.lanhutext1==='手续费比例'">{{ i18n.my.tabs.title1.text1}}</span>
								<span class="text_5"
									v-if="item.lanhutext1==='邀请人数'">{{ i18n.my.tabs.title1.text2}}</span>
								<span class="text_5"
									v-if="item.lanhutext1==='总计手续费'">{{ i18n.my.tabs.title1.text3}}</span>
								<span class="text_5"
									v-if="item.lanhutext1==='获得奖励'">{{ i18n.my.tabs.title1.text4}}</span>
							</view>
						</view>
						<view class="group_4 flex-col" style="margin-top: 28rpx;"></view>
						<view class="image-text_2 flex-row justify-between">
							<span
								class="text-group_4">{{ i18n.my.tabs.title1.text5}}<br />{{ i18n.my.tabs.title1.text6}}</span>
						</view>
					</u-collapse-item>
				</u-collapse>
			</view>
		</view> -->
		<view class="flex-col" style="padding: 0;">
			<view class="box_5 flex-col">
				<!-- 修改密码入口 -->
				<!-- 			<view class="block_1 flex-row justify-between">
					<u-cell-group>
						<u-cell class="text-group_5" :isLink="true" arrow-direction="left" @click='setChargePsw()'
							style="cursor: pointer;">
							<text slot="title" class="userTitle">{{ i18n.my.tabs.title2}}</text>
							<u-icon name="https://antwallet.org/antwalletbot_client/static/icon/lock.png" size="36rpx"
								style="margin-right: 20rpx;" slot="icon"></u-icon>
						</u-cell>
					</u-cell-group>
				</view> -->
				<view class="block_3 flex-row" style="justify-content: space-between;">
					<view class="image-text_7 flex-row">
						<u-icon
							name="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/bangding.png"
							size="36rpx" style="margin-right: 20rpx;"></u-icon>
						<span class="text-group_9 userTitle">{{ i18n.my.tabs.title3.title}}</span>
					</view>
					<view style="display: flex;align-items: center;justify-content: right;">
						<view class="text-wrapper_1 flex-col">
							<span class="text_6" @click="showAccountList"
								style="cursor: pointer;">{{ i18n.my.tabs.title3.btn1}}</span>
							<u-popup mode="center" round="10" :show="accountListShow" :overlay="true"
								:closeOnClickOverlay="true" :safeAreaInsetBottom="true" :safeAreaInsetTop="true"
								:closeable="true" :customStyle="{
						              width: '90%',
						              height: '500px',
						            }" @close="accountList_close" @open="accountList_open">
								<view class="u-popup-slot">
									<view class="accountlist_group_2 flex-col">
										<span class="accountlist_text">{{ i18n.my.tabs.title3.btn1}}</span>
									</view>
									<u-empty iconSize="200rpx"
										v-if="bindOtherUserList === null || bindOtherUserList.length === 0" mode="list"
										icon="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/zwxx.png" :text="i18n.my.tabs.title3.text1">
									</u-empty>
									<u-list v-if="bindOtherUserList != null || bindOtherUserList.length > 0">
										<u-list-item v-for="(item, index) in bindOtherUserList" :key="index">
											<u-cell :title="item.bindUserInfo" :label="item.bindNick"
												icon="account-fill" center>
												<u-button slot="right-icon" type="primary" style="height: 50rpx;"
													:text="i18n.my.tabs.title3.btn2" size="large"
													@click="removeBindOtherUser(item.id)">
												</u-button>
											</u-cell>
										</u-list-item>
									</u-list>
								</view>
							</u-popup>
						</view>
						<view class="text-wrapper_2 flex-col">
							<span class="text_6" @click="openBinduser" style="cursor: pointer;">
								{{ i18n.my.tabs.title3.btn4}}</span>
							<u-popup mode="center" round="10" :show="binduserShow" :overlay="true"
								:closeOnClickOverlay="true" :safeAreaInsetBottom="true" :safeAreaInsetTop="true"
								:closeable="true" :customStyle="{
						              width: '90%',
						              height: '880rpx',
						            }" @close="binduser_close" @open="binduser_open">
								<view class="u-popup-slot">
									<view class="accountlist_group_2 flex-col">
										<span class="accountlist_text">{{ i18n.my.tabs.title3.title}}</span>
									</view>
									<u-form ref="binduser_uForm" labelPosition="left" :rules="rules"
										:model="binduser_model">
										<view>
											<span>{{ i18n.my.tabs.title3.text2}}</span>
										</view>
										<view class="input-wrapper_1 flex-col">
											<u-form-item prop="bindTgid" ref="item1">
												<u-input v-model="binduser_model.bindTgid" border="none"
													:placeholder="i18n.my.tabs.title3.text2"
													color="rgba(181, 181, 181, 1)"></u-input>
											</u-form-item>
										</view>
									</u-form>
									<view class="btn-binduser-wrapper flex-col" @click='bindOtherUser()'>
										<text class="btn-binduser-wrapper_text">{{ i18n.my.tabs.title3.btn3}}</text>
									</view>
									<br /><br />
									<view>{{ i18n.my.tabs.title3.text3}}</view>
									<br />
									<view>{{ i18n.my.tabs.title3.text4}} @packetgift_bot ，{{ i18n.my.tabs.title3.text5}}
									</view>
									<br />
									<view class="text-group_1">*{{ i18n.my.tabs.title3.text6}}</view>
								</view>
							</u-popup>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="flex-col" style="padding: 0;">
			<view class="box_5 flex-col">
				<view class="padd fl_ju">
					<view class="image-text_7 flex-row">
						<u-icon
							name="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/volume.png"
							size="36rpx" style="margin-right: 20rpx;"></u-icon>
						<span class="text-group_9 userTitle">{{ i18n.my.tabs.title4.title}}</span>
					</view>
					<view style="display: flex;align-items: center;justify-content: right;">
						<view class="text-wrapper_1 fl_al">
							<image
								src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/laba2.png"
								mode=""></image>
							<span class="text_6" @click="Touch"
								style="cursor: pointer;">{{ i18n.my.tabs.title4.btn}}</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 	<view class="flex-col" style="padding: 0;">
			<view class="block_1 flex-row justify-between">
				<u-cell-group>
					<u-cell class="text-group_5" :isLink="true" arrow-direction="left" @click='kefu()'
						style="cursor: pointer;">
						<text slot="title" class="userTitle">{{ i18n.my.tabs.title5}}</text>
						<u-icon name="https://antwallet.org/antwalletbot_client/static/images/user/customer-service.png" size="36rpx"
							style="margin-right: 20rpx;" slot="icon"></u-icon>
					</u-cell>
				</u-cell-group>
			</view>
		</view> -->

		<!-- 	<view class="section_3 flex-col" style="border-top: 1px solid rgb(235, 235, 236);">
			<view class="box_3 flex-row" style="justify-content: space-between;">
				<view class="section_4 flex-row justify-between">
					<u-icon name="/static/icon/volume.png" size="36rpx" style="margin-right: 20rpx;"></u-icon>
					<view class="image-text_7 flex-row">
						<span style="font-weight: 600;font-size: 32rpx;color: #333333;line-height: 44rpx;"
							class="text-group_9">社区</span>
					</view>
				</view>
			</view>
			<view class="flex-row" style="justify-content: space-around;">
					<view class="section_7 flex-row" style="cursor: pointer;">
					<view class="image-text_5 flex-row " @click="Touch">
						<u-icon name="/static/icon/group.png" size="36rpx" style="margin-right: 20rpx;"></u-icon>
						<span style="font-weight: 600;font-size: 32rpx;color: #333333;line-height: 44rpx;"
							class="text-group_7">群组</span>
					</view>
				</view>
				<view class="section_7 flex-row kuan" style="cursor: pointer;">
					<view class="image-text_5 flex-row " @click="Touch">
						<u-icon name="/static/icon/volume-fill.png" size="36rpx" style="margin-right: 20rpx;"></u-icon>
						<span style="font-weight: 600;font-size: 32rpx;color: #333333;line-height: 44rpx;"
							class="text-group_7">频道</span>
					</view>
				</view>
			</view>
		</view> -->
		<!-- 语言切换弹框 -->
		<u-action-sheet :actions="list" :round="'30rpx'" @select="selectClickYy" @close="popupClose" :title="title"
			:safeAreaInsetBottom="true" :show="showYy"></u-action-sheet>
		<u-toast ref="uToast" />
		<u-tabbar :value="2" :fixed="true" :placeholder="true" activeColor="#FC575F" :safeAreaInsetBottom="true"
			:border="false">
			<u-tabbar-item :text="i18n.home.title" @click="goHome">
				<image class="u-page__item__slot-icon" slot="active-icon" style="width: 48rpx;height: 48rpx;"
					src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/home2.png">
				</image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" style="width: 48rpx;height: 48rpx;"
					src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/home.png">
				</image>
			</u-tabbar-item>
			<u-tabbar-item :text="i18n.market.title" @click="gomarket">
				<image class="u-page__item__slot-icon" slot="active-icon" style="width: 48rpx;height: 48rpx;"
					src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/market2.png">
				</image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" style="width: 48rpx;height: 48rpx;"
					src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/market.png">
				</image>
			</u-tabbar-item>
			<u-tabbar-item :text="i18n.my.title">
				<image class="u-page__item__slot-icon" slot="active-icon" style="width: 48rpx;height: 48rpx;"
					src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/my2.png">
				</image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" style="width: 48rpx;height: 48rpx;"
					src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/my.png">
				</image>
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>
<script>
	import {
		getUserInfo,
	} from '@/api/index.js';
	import {
		getUserWithdrawalTjList,
		getBindOtherUserList,
		saveBindOtherUser,
		removeBindOtherUser,
		handleEditUserLanguage
	} from '@/api/user.js';
	import {
		antwalletgroup,
		packetgiftbot
	} from "@/utils/util.js";
	import gaMixin from '@/components/ga.js'; // 引入公共脚本
	export default {
		mixins: [gaMixin],
		data() {
			return {
				avatar: uni.getStorageSync('user'), //个人信息
				showYy: false, //语言切换
				loopData0: [], //手续费明细
				list: [{
						name: '中文简体',
						color: '#303133',
						fontSize: '16'
					},
					{
						name: 'English',
						color: '#303133',
						fontSize: '16'
					},
					{
						name: 'Tagalog',
						color: '#303133',
						fontSize: '16'
					},
					{
						name: 'Русский',
						color: '#303133',
						fontSize: '16'
					},
				], //语言列表
				rules: {
					bindTgid: [{
						type: 'string',
						required: true,
						message: '',
						trigger: ['blur', 'change']
					}, ],
				}, //账号绑定
				title: '', //语言标题
				accountListShow: false,
				binduserShow: false,
				binduser_model: {
					bindTgid: '',
				},
				isSetChargePsw: false,
				bindOtherUserList: [],
			};
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
		},

		onShow() {
			if (window.Telegram) {
				Telegram.WebApp.BackButton.hide(); // 显示返回按钮
			}
			this.rules.bindTgid[0].message = this.i18n.page.text26
			this.getUserInfo()
		},
		methods: {
			// 语言弹框关闭
			popupClose() {
				this.popupShow = false
				this.showYy = false
			},
			// 语言切换弹框
			selectClickYy(index) {
				switch (index.name) {
					case '中文简体':
						uni.setStorageSync('i18n', 'zh-CN')
						this._i18n.locale = 'zh-CN'
						this.type = "zh-CN"
						this.$store.dispatch('accRechargeAmount', 'zh-CN');
						break;
					case 'English':
						this._i18n.locale = 'en-US'
						this.type = "en-US"
						uni.setStorageSync('i18n', 'en-US')
						this.$store.dispatch('accRechargeAmount', 'en-US');
						break;
					case 'Русский':
						this._i18n.locale = 'ru-RU'
						this.type = "ru-RU"
						uni.setStorageSync('i18n', 'ru-RU')
						this.$store.dispatch('accRechargeAmount', 'ru-RU');
						break;
					case 'Tagalog':
						this._i18n.locale = 'tl-Ta'
						this.type = "tl-Ta"
						uni.setStorageSync('i18n', 'tl-Ta')
						this.$store.dispatch('accRechargeAmount', 'tl-Ta');
						break;
				}
				// 更改语言
				handleEditUserLanguage().then(res => {}).catch(errors => {});

			},
			// 切换商户开关
			change(e) {
				console.log('change', e);
			},
			// 首页
			goHome() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			},
			// 竞猜
			goguessing() {
				uni.navigateTo({
					url: '/pages/guessing/index'
				})
			},
			// 能量
			gomarket() {
				uni.navigateTo({
					url: '/pages/market/index'
				})
			},
			// 频道
			Touch() {
				location.href = antwalletgroup()
			},

			// 支付密码
			setChargePsw: function() {
				if (this.isSetChargePsw) {
					// 验证密码
					uni.navigateTo({
						url: '/pages/charge_psw/check_index?type=my'
					})
				} else {
					// 设置新密码
					uni.navigateTo({
						url: '/pages/charge_psw/set_index?type=my'
					})
				}
			},
			// 弹框
			showAccountList: function() {
				this.accountListShow = true
				this.getBindOtherUserList()
			},
			kefu() {
				location.href = packetgiftbot()
			},
			openBinduser: function() {
				this.binduserShow = true
			},
			accountList_open() {
				this.accountListShow = true
			},
			// 关闭账户列表弹框
			accountList_close() {
				this.accountListShow = false
			},
			binduser_open() {
				this.$refs.binduser_uForm.resetFields
				this.binduserShow = true
			},
			binduser_close() {
				this.binduserShow = false
			},
			/**
			 * 获取用户详情
			 */
			getUserInfo: function() {
				getUserInfo().then(res => {
					this.isSetChargePsw = res.data.userInfo.setChargePsw
					this.getUserWithdrawalTjList()
				}).catch(errors => {
					console.log(errors, 'errors')
					this.$refs.uToast.error(errors.msg)
				});
			},
			getUserWithdrawalTjList() {
				getUserWithdrawalTjList().then(result => {
					if (result.data && result.data.code === 0) {
						this.loopData0 = result.data.list
					}
				}).catch(errors => {
					this.$refs.uToast.error(errors.msg)
				})
			},
			/**
			 * 获取账户绑定列表
			 * 
			 */
			getBindOtherUserList() {
				getBindOtherUserList().then(result => {
					if (result.data && result.data.code === 0) {
						this.bindOtherUserList = result.data.list
					}
				}).catch(errors => {
					this.$refs.uToast.error(errors.msg)
				})
			},
			bindOtherUser() {
				this.saveBindOtherUser(this.binduser_model.bindTgid);
			},
			/**
			 * 绑定备用账户
			 * 
			 */
			saveBindOtherUser(bindTgid) {
				this.$refs.binduser_uForm.validate().then(res => {
					if (res) {
						this.binduserShow = false
						saveBindOtherUser(bindTgid).then(result => {
							if (result.data && result.data.code === 0) {
								this.$refs.uToast.success(this.i18n.page.text44)
							} else {
								this.$refs.uToast.error(result.data.msg)
							}
						}).catch(errors => {
							this.$refs.uToast.error(errors.msg)
						})
					}
				}).catch(errors => {
					// this.$refs.uToast.error(errors.msg)
				})
			},
			/**
			 * 解除备用账户
			 * 
			 */
			removeBindOtherUser(id) {
				removeBindOtherUser(id + '').then(result => {
					if (result.data && result.data.code === 0) {
						this.accountListShow = false
						this.$refs.uToast.success(this.i18n.page.text43)
					} else {
						this.$refs.uToast.error(result.data.msg)
					}
				}).catch(errors => {
					this.$refs.uToast.error(errors.msg)
				})
			},
			// 复制id
			onClipboard: function() {
				var that = this
				uni.setClipboardData({
					data: that.avatar.userTGID,
					success: function() {
						uni.showToast({
							title: that.i18n.page.text25,
							icon: 'none',
							duration: 2000
						});
					},
					fail: (error) => {
						uni.showToast({
							title: that.i18n.page.text42,
							icon: 'none'
						});
					}
				})
			},
		},
		watch: {
			binduserShow: {
				handler(value) {
					this.$nextTick(() => { //在弹窗加载出来只有 show 才会变成 true
						if (value == true) { //判断 弹窗 v-model 变成 true 的时候去加载规则。 原理：在弹窗渲染完成之后表单渲染完成之前去加载规则就不会报错了
							this.$refs.binduser_uForm.setRules(this.rules);
						}
					})
				},
			},
			// immediate: true, // 重点
			// deep: true, // 重点
		},
	};
</script>

<style lang="scss">
	.section_1 {
		background-color: rgba(255, 255, 255, 1);
		/* height: 100px; */
	}


	.text-group_1 {
		margin: 2px 0 3px 0;
	}

	.text_2 {
		overflow-wrap: break-word;
		color: #333333;
		font-size: 40rpx;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		text-align: left;
		white-space: nowrap;
		line-height: 25px;
		margin-left: 10px;
		user-select: text;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 90%;
	}

	.text_3 {
		overflow-wrap: break-word;
		color: rgba(142, 142, 142, 1);
		font-size: 14px;
		font-family: PingFangSC-Medium;
		/* font-weight: 500; */
		text-align: left;
		white-space: nowrap;
		line-height: 20px;
		margin-top: 5px;
		margin-left: 10px;
		user-select: text;
	}

	.group_2 {
		width: 100%;
		margin-right: 15px;
	}


	.group_3 {
		background-color: rgba(229, 229, 229, 1);
		width: 100%;
		height: 1px;
		margin-top: 15px;
	}

	.list_1 {
		width: 100%;
		height: 53px;
		justify-content: space-between;
		margin: 14px 20px 0 4px;
	}

	.text_4 {
		width: 100%;
		overflow-wrap: break-word;
		color: rgba(51, 51, 51, 1);
		font-size: 20px;
		font-family: PingFangSC-Semibold;
		font-weight: 700;
		text-align: center;
		white-space: nowrap;
		line-height: 60px;
	}

	.text_4_1 {
		width: 100%;
		overflow-wrap: break-word;
		color: rgba(51, 51, 51, 1);
		font-size: 15px;
		font-family: PingFangSC-Semibold;
		font-weight: 700;
		text-align: center;
		white-space: nowrap;
		line-height: 30px;
	}

	.text_5 {
		width: 100%;
		overflow-wrap: break-word;
		text-align: center;
		white-space: nowrap;
		line-height: 20px;
		margin-top: 5px;
		font-weight: 400;
		font-size: 24rpx;
		color: #8E8E8E;
	}

	.group_4 {
		background-color: rgba(229, 229, 229, 1);
		width: 100%;
		height: 1px;
		margin-top: 50px;
	}

	.image-text_2 {
		width: 100%;
		margin: 9px 22px 0 0;
	}


	.text-group_4 {
		width: 100%;
		height: 40px;
		overflow-wrap: break-word;
		font-weight: 400;
		font-size: 24rpx;
		color: #333333;
		line-height: 40rpx;
		text-align: left;
	}

	.section_3 {
		padding: 0 0 30rpx 0;
		background-color: rgba(255, 255, 255, 1);
	}

	.box_3 {
		background-color: rgba(255, 255, 255, 1);
		padding: 15px;
	}

	.section_4 {
		width: 86px;
	}


	.text-group_5 {
		overflow-wrap: break-word;
		color: rgba(51, 51, 51, 1);
		font-size: 16px;
		font-family: PingFangSC-Medium;
		font-weight: 700;
		text-align: left;
		white-space: nowrap;
		line-height: 22px;
		margin-top: 5px;
	}

	.userTitle {
		font-weight: 600;
		font-size: 32rpx;
		color: #333333;
		line-height: 44rpx;
	}

	.userTitle:hover {
		color: rgb(252, 87, 95);
	}


	.section_7 {
		background-color: rgba(246, 248, 255, 1);
		border-radius: 10rpx;
		padding: 8rpx 25rpx 8rpx 25rpx;

	}

	.image-text_5 {
		padding: 20rpx 60rpx;
		background: #F6F8FF;
		border-radius: 20rpx;
	}

	.text-group_7 {
		overflow-wrap: break-word;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		font-size: 32rpx;
		color: #333333;
		text-align: left;
		white-space: nowrap;
		line-height: 44rpx;
	}

	.box_5 {
		background-color: rgba(255, 255, 255, 1);
	}

	.block_1 {
		width: 100%;
		height: 50px;
	}

	.block_3 {
		/* padding: 35px 30rpx 15px; */
		padding: 30rpx;
		box-sizing: border-box;
		/* border-top: 1px solid #d6d7d9; */
	}


	.image-text_7 {
		width: 58px;
	}

	.text-group_9 {
		display: flex;
		align-items: center;
		overflow-wrap: break-word;
		color: rgba(51, 51, 51, 1);
		font-size: 32rpx;
		font-family: PingFangSC-Medium;
		font-weight: 700;
		text-align: left;
		white-space: nowrap;
		line-height: 22px;
	}

	.text-wrapper_1 {
		background-color: rgba(245, 245, 245, 1);
		color: #333333;
		font-weight: 500;
		font-size: 28rpx;
		border-radius: 999px;
		padding: 16rpx 20rpx;

		image {
			margin-right: 12rpx;
			width: 36rpx;
			height: 36rpx;
		}
	}

	.text_6 {
		overflow-wrap: break-word;
		color: rgba(51, 51, 51, 1);
		font-size: 26rpx;
		font-family: PingFangSC-Medium;
		font-weight: 700;
		text-align: left;
		white-space: nowrap;
		line-height: 40rpx;
	}

	.text-wrapper_2 {
		background-color: rgba(245, 245, 245, 1);
		border-radius: 999px;
		color: #333333;
		font-weight: 500;
		font-size: 28rpx;
		margin-left: 10rpx;
		padding: 16rpx 40rpx;
	}

	.page {
		background-color: #fff;
		height: 100vh;
	}


	.kuan {
		width: 90%;
		margin: 0 auto;
		display: flex;
		justify-content: center;
	}

	.accountlist_group_2 {
		background-color: rgba(255, 255, 255, 1);
		border-radius: 15px;
		padding: 15px 15px 30px 15px;
	}

	.accountlist_text {
		overflow-wrap: break-word;
		color: rgba(51, 51, 51, 1);
		font-size: 18px;
		font-family: PingFangSC-Medium;
		font-weight: 700;
		text-align: center;
		white-space: nowrap;
		line-height: 25px;
		margin-top: 9px;
	}

	.input-wrapper_1 {
		background-color: rgba(245, 245, 245, 1);
		border-radius: 22px;
		margin-top: 24px;
		padding: 12px;
		box-sizing: border-box;
	}

	.u-popup-slot {
		width: 90%;
		height: 100%;
		align-self: center;
		font-size: 24rpx;
	}

	.btn-binduser-wrapper {
		background-color: rgba(22, 81, 241, 1);
		border-radius: 22px;
		margin-top: 24px;
		padding: 20rpx 200rpx;
		box-sizing: border-box;
		text-align: center;
	}

	.btn-binduser-wrapper_text {
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1);
		font-size: 18px;
		font-weight: normal;
		text-align: center;
		white-space: nowrap;
		line-height: 25px;
	}

	.qiehuan {
		image {
			width: 60rpx;
			height: 60rpx;
			cursor: pointer;
		}
	}

	.text-group_user {
		overflow-wrap: break-word;
		font-family: PingFangSC-Medium;
		font-weight: 600;
		line-height: 50px;
		// width: 65%;

		.fuzhi {
			align-items: center;
			margin: 10rpx 10px 0;

			image {
				width: 30rpx;
				height: 30rpx;
			}
		}
	}

	.text-group_1 {
		overflow-wrap: break-word;
		color: rgba(255, 97, 70, 1);
		font-family: PingFangSC-Medium;
		font-weight: 600;
		line-height: 20px;
	}

	.section_1 {
		border-bottom: 20rpx solid #F5F1F3;
		padding: 40rpx 20rpx;
		box-sizing: border-box;
	}

	.xinxi {
		.avatar {
			display: inline-flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			font-weight: 700;
			width: 100rpx;
			height: 100rpx;
			border-radius: 10rpx;
		}
	}

	.padd {
		padding: 30rpx;
		box-sizing: border-box;
		border-top: 1px solid rgb(214, 215, 217);
		// border-bottom: 1px solid #d6d7d9;
	}
</style>