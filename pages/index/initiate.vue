<template>
	<view class="">
		<u-navbar :fixed="true" :safeAreaInsetTop="false" bgColor="#fff"
			style="position: relative;z-index: 999;">
			<view class="u-nav-slot fl_al" slot="left" style="color: #f0614f;font-weight: 600;" @click="goHome">
			</view>
			<view class="u-nav-slot" style="color: #333333FF;font-size: 36rpx;font-weight: bold;" slot="center">
				{{i18n.paymentDetails.title}}
			</view>
			<view class="u-nav-slot fl_al" slot="right" @click="initList"
				style="color: #fc575f;font-weight: 600;font-size: 30rpx;">
				{{i18n.paymentDetails.title10}}
			</view>
		</u-navbar>
		<view class="send_redpacket">
			<u--form label-align="right" :model="redpacketFrom" ref="redpacketRule" :rules="singlerules">
				<view class="content initAni"
					:style="subsection == 0?'border-radius: 0 48rpx 0 0;':'border-radius: 48rpx 48rpx 0 0;'">

					<view class="redpacket_form"
						:style="subsection == 0?'border-radius: 0 48rpx 0 0;':'border-radius: 48rpx 48rpx 0 0;'">
						<!-- 模式选择 -->
						<!-- 		<view class="fl_ju" style="width: 100%;margin-left: 10rpx;">
							<view class="value fl_al" @click="typePopupShow">
								{{ redpacketType }}
								<uni-icons style="margin-left: 20rpx;" :type="!typeShow?'down':'up'" size="20"
									color="#979797"></uni-icons>
							</view>
						</view> -->
						<!-- 客服链接 -->
						<!-- prop="customerServiceLink" -->
						<u-form-item ref="item1">
							<view class="redpacket_money">
								<u--input v-model="redpacketFrom.customerServiceLink" inputAlign="right" type="text"
									style="padding: 32rpx 20rpx;border: none;"
									:placeholder="i18n.paymentDetails.puttxt3" suffixIconStyle="color: #909399">
									<u--text :text="i18n.paymentDetails.title11" size="32rpx" color="#333333"
										slot="prefix"></u--text>
								</u--input>
							</view>
						</u-form-item>
						<!-- 收款金额 -->
						<u-form-item ref="item1" prop="money">
							<view class="redpacket_money">
								<u--input v-model="redpacketFrom.money" inputAlign="right" type="digit" @input="jiaoyan"
									style="padding: 32rpx 20rpx;border: none;" placeholder="1-10000"
									suffixIconStyle="color: #909399">
									<u--text :text="i18n.paymentDetails.title2" size="32rpx" color="#333333"
										slot="prefix"></u--text>
									<view class="inputSlot" slot="suffix">
										<u--image :src="accountTypeImg" style="margin: 0 10rpx 0 20rpx;" width="40rpx"
											height="40rpx" shape="circle"></u--image>
										USDT
									</view>
								</u--input>
							</view>
						</u-form-item>
						<!-- 收款人数 -->
						<u-form-item ref="item1" prop="transNum">
							<view class="redpacket_num" style="width: 100%;margin-top: 30rpx;">
								<u--input v-model="redpacketFrom.transNum" inputAlign="right" type="digit"
									@input="jiaoyan" style="border: none;padding: 32rpx 0rpx;" placeholder="1-20000"
									suffixIconStyle="color: #909399">
									<u--text :text="i18n.paymentDetails.title3" size="32rpx" color="#333333"
										slot="prefix"></u--text>
								</u--input>
								<!-- 人数选择 -->
								<view class="xuanxiang fl_end">
									<view class="xxson" @click="renshu('1')">
										1
									</view>
									<view class="xxson" @click="renshu('100')">
										100
									</view>
									<view class="xxson" @click="renshu('10000')">
										10000
									</view>
									<view class="xxson" @click="renshu('20000')">
										20000
									</view>
								</view>
							</view>
						</u-form-item>

						<!-- 留言(选填) -->
						<u-form-item ref="item1" prop="title">
							<view class="redpacket_AD">
								<view class="title">{{i18n.paymentDetails.title4}}</view>
								<u--input :placeholder="i18n.paymentDetails.puttxt" border="none" maxlength="20" count
									v-model="redpacketFrom.comment"
									:placeholderStyle="'font-size: 32rpx; color: #c0c4cc;'"></u--input>

							</view>
						</u-form-item>
						<u-form-item ref="item1">
							<view class="redpacket_condition">
								<view class="bgjb">

								</view>
								<view class="condition_total" @click="getConditionShow">
									<view class="title">{{i18n.paymentDetails.title5}}</view>
									<uni-icons style="margin-left: 20rpx;font-weight: 500;"
										:type="!isConditionShow?'down':'up'" size="20"></uni-icons>
								</view>
								<!-- 订阅展开栏 -->
								<view class="conditionShow" v-if="isConditionShow">
									<u-divider text=""></u-divider>
									<view class="join_group fl_ju">
										<view class="label">
											{{i18n.initiateList.fxd}}
										</view>
										<u-radio-group v-model="radiovalue1" placement="row" @change="groupChange">
											<u-radio :customStyle="{marginRight: '8px'}" activeColor="#1651f1"
												:label="i18n.condition.title" :name="i18n.condition.title">
											</u-radio>
											<u-radio :customStyle="{marginRight: '8px'}" activeColor="#1651f1"
												:label="i18n.condition.title2" :name="i18n.condition.title2">
											</u-radio>
										</u-radio-group>
									</view>
									<u-divider text=""></u-divider>
									<view class="join_group" v-if="radiovalue1 == i18n.condition.title">
										<view class="label">
											{{i18n.sendpacket.tiaojian.addPd.name}}
										</view>
										<view v-if="!redpacketFrom.channelName || redpacketFrom.channelName ==''"
											class="value" @click="jionOpen(2)">
											{{ i18n.sendpacket.tiaojian.addQz.status }}
											<uni-icons color="#979797" type="right" size="20"></uni-icons>
										</view>
										<view v-if="redpacketFrom.channelName && redpacketFrom.channelName !='' "
											class="value" @click="jionOpen(2)">
											{{ redpacketFrom.channelName }}
											<uni-icons color="#979797" type="right" size="20"></uni-icons>
										</view>
									</view>
									<view class="join_group" v-else>
										<view class="label">{{i18n.sendpacket.tiaojian.addQz.name}}</view>
										<view v-if="!redpacketFrom.groupsName || redpacketFrom.groupsName ==''"
											class="value" @click="jionOpen(1)">
											{{ i18n.sendpacket.tiaojian.addQz.status }}
											<uni-icons color="#979797" type="right" size="20"></uni-icons>
										</view>
										<view v-if="redpacketFrom.groupsName && redpacketFrom.groupsName !=''"
											class="value" @click="jionOpen(1)">
											{{ redpacketFrom.groupsName }}
											<uni-icons color="#979797" type="right" size="20"></uni-icons>
										</view>
									</view>
									<u-divider text=""></u-divider>
									<!-- 订阅描述(选填) -->
									<view class="add_bot" style="margin-bottom: 36rpx;">
										<view class="condition_total">
											{{i18n.paymentDetails.title9}}
										</view>
									</view>
									<view class="beizhu">
										<u--input :placeholder="i18n.paymentDetails.puttxt2" border="none"
											maxlength="20" count v-model="redpacketFrom.subscriptionDesc"
											:placeholderStyle="'font-size: 28rpx;color: #C2C1C9;'"></u--input>

									</view>
									<u-divider text=""></u-divider>
									<view class="add_bot">
										<view class="condition_total">
											{{i18n.paymentDetails.title6}}
										</view>
										<TimeRangeSelector @change="onTimeRangeChange" />
									</view>
									<u-divider text=""></u-divider>
									<view class="choose_bot">
										<view class="condition_total">
											{{i18n.paymentDetails.title7}}
										</view>
										<TimeRangeSelector @change="paymentTimeoutChange" />
									</view>
									<u-divider text=""></u-divider>
									<view class="choose_bot">
										<view class="condition_total fl_ju">
											<view class="">
												{{i18n.paymentDetails.title12}}
											</view>
											<u-switch v-model="value" activeColor="#f56c6c"
												@change="fenchengChange"></u-switch>
										</view>
										<view class="" v-if="value == true">
											<TimeRangeSelector2 @change="baifenbiChange" />
										</view>
									</view>
									<u-divider text=""></u-divider>
									<view class="recive_rules" style="margin-top: 30rpx;">
										<view class="total fl_ju">
											<view class="condition_total">
												{{i18n.paymentDetails.title8}}
											</view>
											<view class="condition_total">
												{{transactionFee * 100}}%
											</view>
										</view>
									</view>
								</view>
							</view>

						</u-form-item>
					</view>
					<view class="form_button">
						<u-button shape="circle" @click="sendRedpacket" type="info" color="#FC575F"
							style="width: calc(100% - 40rpx);margin: 0 auto;" size="large"
							:text="i18n.paymentDetails.title"></u-button>
						<view class="tishi">
							{{i18n.paymentDetails.tishi1}}<text>{{i18n.paymentDetails.tishi2}}</text>{{i18n.paymentDetails.tishi3}}
						</view>
					</view>
				</view>

			</u--form>
			<u-action-sheet @close="popupClose" :round="'30rpx'" :safeAreaInsetBottom="true" :actions="popupList.list"
				@select="selectClick" :title="popupTitle" :show="popupShow"></u-action-sheet>
			<u-popup round="30rpx" :show="jionShow" mode="center" @close="jionClose">
				<view class="jion_popup">
					<view class="popup_total">
						{{i18n.sendpacket.tiaojian.title2}}
						<u-icon class="icon" @click="del" name="close-circle" color="#8E8E8E" size="28"></u-icon>
					</view>
					<view class="add_bot">
						<view class="total">
							<view class="left">
								<view class="icon"></view>
								<view class="text">{{i18n.sendpacket.tiaojian.title3}}</view>
							</view>
							<view class="button" @click="addBotButton">{{i18n.sendpacket.tiaojian.btn1}}</view>
						</view>
						<view class="massage">{{i18n.sendpacket.tiaojian.text1}} <text @click="copy()"
								class="copy">&nbsp;&nbsp;
								@packetgift_bot&nbsp;&nbsp;</text>
							{{i18n.sendpacket.tiaojian.text2}}
						</view>
						<view class="massage" style="font-weight: 600;color: #fc575f;">
							{{i18n.page.text55}}
						</view>
						<!-- <view class="massage" v-else>请将 @packetgift_bot 机器人添加到您指定的{{ jionTotal }}</view> -->
					</view>
					<view class="choose_bot">
						<view class="total">
							<view class="left">
								<view class="icon"></view>
								<view class="text">{{i18n.sendpacket.tiaojian.text3}}&nbsp;{{ jionTotal }}
									({{chooseGroupOrChannel?1:0}}/1)</view>
							</view>
							<view class="" v-if="rotateOnce3" @click="shuaxing2()">
								<u-icon name="reload" color="#B5B5B5"
									:class="rotateOnce?'rotate-animation reload active':'rotate-animation reload'"
									size="20"></u-icon>
								<text style="opacity: 0;"></text>
							</view>
							<view class="" v-if="!rotateOnce3" @click="shuaxing()">
								<text style="opacity: 0;"></text>
								<u-icon name="reload" color="#B5B5B5"
									:class="rotateOnce2?'rotate-animation reload active':'rotate-animation reload'"
									size="20"></u-icon>
							</view>
						</view>
						<u-radio-group placement="column" class="qunzu" size='40rpx' v-model="chooseGroupOrChannel"
							iconPlacement="right">
							<view class="radioList" v-for="(item, index) in groupList" :key="index"
								@click="groupChoose(item)">
								<view class="left" style="display: flex;justify-content: left;align-items: center; width:75%;	overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;">
									<u-avatar style="margin-right: 20rpx;" v-if="item.filePath"
										:src="item.filePath"></u-avatar>
									<view class="avatar" v-else :style="'background:'+ avatar.gradient">
										{{item.chatName[0]}}
									</view>
									<view class="name" :style="item.chatBotName  == 'null'?'color: #FC575F;':''">
										{{ item.chatBotName  == 'null'?i18n.sendpacketSend.private +' '+ jionTotal :item.chatBotName  }}
									</view>

								</view>
								<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/del.png" v-if="item.chatBotName == 'null'"
									@click="delesc(item)" mode=""></image>
								<u-radio activeColor="#FC575F" :name="item.chatBotName"
									v-if="item.chatBotName != 'null'"></u-radio>
							</view>
						</u-radio-group>
					</view>
					<button class="button_2 flex-col" @click="saveSendPacketCondition">
						<text class="text_30">{{i18n.sendpacket.tiaojian.btn2}}</text>
					</button>
				</view>
			</u-popup>
			<u-modal :show="show" :title="title" :confirmText="i18n.sendpacket.tiaojian.btn2" @confirm="confirm"
				@close="close" closeOnClickOverlay :content='content'></u-modal>
			<u-toast ref="uToast" />
		</view>
	</view>

</template>

<script>
	import {
		removeTGroupsChannelName
	} from '@/api/index.js';
	import {
		antwalletbot
	} from "@/utils/util.js";
	import {
		getTAntwalletConfig
	} from '@/api/common.js';
	import {
		getGroupsChannelName,
		createOTronTrans
	} from '@/api/sendpacket.js'

	import TimeRangeSelector from '@/components/TimeRangeSelector.vue'
	import TimeRangeSelector2 from '@/components/TimeRangeSelector2.vue'
	import {
		beforeDestroy
	} from '../../uview-ui/libs/mixin/mixin';
	export default {
		components: {
			TimeRangeSelector,
			TimeRangeSelector2
		},
		data() {
			return {
				// 基本案列数据
				radiolist1: [{
						name: '频道配置',
						disabled: false
					},
					{
						name: '群组配置',
						disabled: false
					},
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				radiovalue1: '', //频道群组默认值
				type: '',
				value: false, //分成开关
				rotateOnce: false,
				rotateOnce2: false,
				rotateOnce3: true,
				show: false,
				title: '',
				content: '',
				num: 0,
				timer: null,
				isChoose: 1,
				chooseGroupOrChannel: '',
				isReviceChoose: 1,
				accountTypeImg: '../../static/icon/USDT.png',
				moneyText: '',
				height: '--height:100%;--imageHeight:330px',
				isSwitch: false,
				isSetChargePsw: false,
				isConditionShow: false,
				conditionShow: false,
				popupShow: false,
				typeShow: false,
				currencyShow: false,
				color: '',
				redpacketType: '',
				popupTitle: '',
				popupList: {
					label: 0,
					list: [{
							name: '普通红包'
						},
						{
							name: '拼手气红包(金额随机)'
						},
					]
				},
				avatar: uni.getStorageSync('user'),
				jionShow: false,
				jionTotal: '',
				transactionFee: '',
				jsonType: 0,
				groupList: [],
				reviceRule: [],
				subsection: 1,
				// geiInfo获取数据
				canuseMoney: {
					'TRX': 0.00,
					'USDT': 0.00
				},
				// 提交数据
				redpacketFrom: {
					subscriptionTimeout: 720, //订阅有效期
					paymentTimeout: 720, //收款有效期
					transType: 0, //人均模式
					money: '', //金额
					accountType: '1', //单位
					transNum: '', //收款人数
					subscriptionDesc: '', //订阅备注
					comment: '', //留言
					customerServiceLink: '', //客服链接
					sharingRatio: '' //分成
				},
				singlerules: {
					transNum: [{
							type: 'number',
							min: 1,
							max: 20000,
							required: true,
							message: '收款人数不能为空',
							trigger: ['blur', 'change']
						},
						{
							// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return value >= 1 && value <= 20000;
							},
							message: "收款人数应在1~20000之间",
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ["change", "blur"],
						},
						{
							// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return value == value.replace(/[^0-9]/g, '');
							},
							message: "不能有小数",
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ["change", "blur"],
						}
					],
					customerServiceLink: [{
						type: 'string',
						required: true,
						message: '客服链接不能为空',
						trigger: ['blur', 'change']
					}],
					money: [{
							type: 'string',
							min: 1,
							max: 10000,
							required: true,
							message: '收款金额不能为空',
							trigger: ['blur', 'change']
						},
						{
							// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return value >= 1 && value <= 10000;
							},
							message: "单笔收款金额应为1~10000之间",
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ["change", "blur"],
						},
						{
							// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return Number(value).toFixed(2) == Number(value)
							},
							message: "最多到小数点后两位",
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ["change", "blur"],
						}
					]
				},
			};
		},
		beforeDestroy() {
			//离开页面是销毁
			clearInterval(this.timer);
			this.timer = null;
		},
		onHide() {
			//离开页面是销毁
			clearInterval(this.timer);
			this.timer = null;
		},
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		created() {

		},
		onLoad() {
			// 手续费
			getTAntwalletConfig(`config/getTAntwalletConfig/RECEIVING_FEE`).then(res => {
				if (res.data && res.data.code === 0) {
					this.transactionFee = res.data.antwalletconfig.pvalue
				}
			}).catch(errors => {
				this.$refs.uToast.error(errors.msg)
			});

			const pages = getCurrentPages()
			const currentPage = pages[pages.length - 1]
			const previousPage = pages[pages.length - 2]
			console.log(previousPage, 'previousPage')
			if (previousPage) {
				var obj = {
					previousPage: previousPage.route
				}
				uni.setStorageSync('obj', obj)
			}
			if (window.Telegram) {
				Telegram.WebApp.BackButton.show(); // 显示返回按钮
				Telegram.WebApp.BackButton.onClick(() => {
					// 处理返回逻辑

					if (uni.getStorageSync('obj').previousPage == 'pages/index/subscribeTo') {
						uni.redirectTo({
							url: '/pages/index/subscribeTo'
						})
					} else if (uni.getStorageSync('initiateUrl') == 'subscribeTo') {
						uni.redirectTo({
							url: '/pages/index/subscribeTo'
						})
					} else {
						uni.redirectTo({
							url: '/pages/index/index'
						})
					}
				});
			}
		},
		onShow() {
			this.type = uni.getStorageSync('i18n')
			uni.setNavigationBarTitle({
				title: this.i18n.paymentDetails.title
			});
			// (拼)总金额
			this.radiovalue1 = this.i18n.condition.title
			this.moneyText = '人均收款金额'
			this.redpacketType = this.i18n.paymentDetails.type.text1
			this.singlerules.transNum[0].message = this.i18n.page.text47
			this.singlerules.transNum[1].message = this.i18n.page.text48
			this.singlerules.transNum[2].message = this.i18n.page.text49
			this.singlerules.customerServiceLink[0].message = this.i18n.page.text57
			this.singlerules.money[0].message = this.i18n.page.text50
			this.singlerules.money[1].message = this.i18n.page.text51
			this.singlerules.money[2].message = this.i18n.page.text52
			this.content = this.i18n.sendpacket.tiaojian.tankuang
			this.reviceRule = [{
				value: 1,
				label: this.i18n.sendpacket.tiaojian.btn3
			}, {
				value: 2,
				label: this.i18n.sendpacket.tiaojian.btn4
			}]
			console.log(this.avatar.userName, 'this.avatar')
			this.redpacketFrom.customerServiceLink = this.avatar.userName
		},
		mounted() {
			window.addEventListener('resize', this.handleResize);
			this.$nextTick(() => {
				this.$refs.redpacketRule.setRules(this.singlerules);
			})
		},
		destroyed() {
			window.removeEventListener('resize', this.handleResize);
		},
		methods: {
			// 收款列表
			initList() {
				uni.navigateTo({
					url: '/pages/index/initiateList'
				})
			},
			// 添加事件
			addBotButton() {
				if (window.Telegram) {
					// 频道
					if (this.jsonType == 2) {
						Telegram.WebApp.openTelegramLink(
							antwalletbot() +
							`?startchannel&&admin=manage_chat+change_info+post_messages+edit_messages+delete_messages+invite_users+restrict_members+pin_messages+promote_members+manage_video_chats=false+anonymous=false` //正式
						);
					} else if (this.jsonType == 1) {
						Telegram.WebApp.openTelegramLink(
							antwalletbot() +
							`?startgroup=true&admin=manage_chat+change_info+post_messages+edit_messages+delete_messages+invite_users+restrict_members+pin_messages+promote_members+manage_video_chats=false+anonymous=false` //正式
						);
					} else {
						this.$refs.uToast.error('请选择频道或者群组')
					}

				} else {
					this.$refs.uToast.error('请在TG环境操作')
				}
			},
			// 复制名字
			copy() {
				var that = this
				uni.setClipboardData({
					data: '@packetgift_bot',
					success: function() {
						uni.showToast({
							title: that.i18n.page.text33,
							icon: 'none'
						});
					},
					fail: (error) => {
						uni.showToast({
							title: '~',
							icon: 'none'
						});
					}
				})
			},
			// 关闭弹框
			del() {
				this.jionShow = false
				this.stop()
				document.body.style.overflow = 'auto';
			},
			// 监听红包个数变化
			jiaoyan() {
				if (this.redpacketFrom.money && this.redpacketFrom.transNum) {
					this.$refs.redpacketRule.setRules(this.grouprules);
					this.$refs.redpacketRule.validate().then(res => {})
				}
				if (this.redpacketType == this.i18n.paymentDetails.type.text1) {
					if (this.redpacketFrom.money >= 1 && this.redpacketFrom.transNum >= 1) {
						this.color = 'linear-gradient(to top, #feb54c, #fed486)'
					} else {
						this.color = ''
					}
				} else {
					if (this.redpacketFrom.money >= 0.01 && this.redpacketFrom.transNum >= 1) {
						if (this.redpacketFrom.money * this.redpacketFrom.transNum >= 1) {
							this.color = 'linear-gradient(to top, #feb54c, #fed486)'
						} else {
							this.color = ''
						}
					} else {
						this.color = ''
					}
				}

			},
			// 群组频道选择事件
			groupChoose(item) {
				this.chooseGroupOrChannel = item.chatBotName
			},
			// 关闭弹框
			jionClose() {
				this.stop()
				this.jionShow = false
				document.body.style.overflow = 'auto';
			},
			// 清除定时器
			stop() {
				clearInterval(this.timer);
				this.timer = null;
			},
			// 刷新
			shuaxing() {
				this.rotateOnce = true;
				this.rotateOnce3 = false
				setTimeout(() => {
					this.rotateOnce = false;
				}, 1000); // 动画完成后重置布尔值，假设动画持续时间为2000毫秒
				this.getGroupsChannelName()
			},
			// 刷新2
			shuaxing2() {
				this.rotateOnce2 = true;
				this.rotateOnce3 = true
				setTimeout(() => {
					this.rotateOnce2 = false;
				}, 1000); // 动画完成后重置布尔值，假设动画持续时间为2000毫秒
				this.getGroupsChannelName()
			},
			// 删除群组频道
			delesc(e) {
				console.log(e)
				var that = this
				removeTGroupsChannelName(e.chatId, e.status).then(res => {
					if (res.data && res.data.code === 0) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
						that.chooseGroupOrChannel = ''
					}
				}).catch(errors => {
					// this.$refs.uToast.error('我是发红包')
				});
			},
			// 订阅弹框
			jionOpen(index) {
				this.jionShow = true
				document.body.style.overflow = 'hidden';
				if (index == 2) {
					this.jionTotal = this.i18n.sendpacket.tiaojian.addPd.title
					// 实现轮询
					this.timer = window.setInterval(() => {
						if (this.rotateOnce3) {
							this.shuaxing()
						} else {
							this.shuaxing2()
						}
					}, 3000);
				} else {
					this.jionTotal = this.i18n.sendpacket.tiaojian.addQz.title
					this.timer = window.setInterval(() => {
						if (this.rotateOnce3) {
							this.shuaxing()
						} else {
							this.shuaxing2()
						}
					}, 3000);
				}
				this.jsonType = index
				this.getGroupsChannelName()
			},
			// 关闭模式
			popupClose() {
				this.popupShow = false
				this.typeShow = false
				this.currencyShow = false
			},
			// 订阅配置选项重置
			groupChange(n) {
				this.redpacketFrom.channelName = ''
				this.redpacketFrom.groupsName = ''
			},
			// 群组和频道列表接口
			getGroupsChannelName() {
				// uni.showLoading();
				setTimeout(() => {
					// uni.hideLoading();
					getGroupsChannelName(`tgroups_channel_name/list/${this.jsonType}`).then(res => {
						if (res.data && res.data.code === 0) {
							this.groupList = res.data.list
							// this.groupList = []
						}
					}).catch(errors => {
						this.$refs.uToast.error(errors.msg)
					});
				}, 1000); // 1秒的禁用时间
			},
			// 人数选择
			renshu(e) {
				this.redpacketFrom.transNum = e
			},
			// 订阅确认按钮
			saveSendPacketCondition() {
				document.body.style.overflow = 'auto';
				if (this.jsonType == 2) {
					this.redpacketFrom.channelName = this.chooseGroupOrChannel
					this.redpacketFrom.isChannelNewMember = this.isReviceChoose
				} else if (this.jsonType == 1) {
					this.redpacketFrom.groupsName = this.chooseGroupOrChannel
					this.redpacketFrom.isGroupNewMember = this.isReviceChoose
				}

				this.jionClose()
				this.groupList = []
			},
			// 确认收款
			sendRedpacket() {
				this.$refs.redpacketRule.setRules(this.singlerules);
				this.$refs.redpacketRule.validate().then(res => {
					this.redpacketFrom.customerServiceLink = this.redpacketFrom.customerServiceLink ? '@' + this
						.redpacketFrom.customerServiceLink : ''
					createOTronTrans(this.redpacketFrom).then(res => {
						if (res.data && res.data.code === 0) {
							console.log(res.data)
							this.$refs.uToast.success(this.i18n.page.text11)
							let link = {
								link: res.data.link,
								money: this.redpacketFrom.money
							}
							uni.setStorageSync('link', link)
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/index/paymentDetails',
									success: function(res) {
										const eventChannel = res.eventChannel;
										eventChannel.emit('link',
											link);
									}
								})
							}, 2000); // 2000 毫秒，即 2 秒后执行操作
						}
					}).catch(errors => {
						this.$refs.uToast.error(errors.msg)
					});
				}).catch(errors => {
					uni.$u.toast(errors[0].message)
				})
			},
			// 回首页
			goHome() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			},
			// 订阅有效期
			onTimeRangeChange(e) {
				console.log(e)
				switch (e) {
					case '1小时':
						this.redpacketFrom.subscriptionTimeout = 1
						break;
					case '1天':
						this.redpacketFrom.subscriptionTimeout = 24
						break;
					case '1周':
						this.redpacketFrom.subscriptionTimeout = 168
						break;
					case '1个月':
						this.redpacketFrom.subscriptionTimeout = 720
						break;
					case '无限制':
						this.redpacketFrom.subscriptionTimeout = 0
						break;
				}
			},
			// 收款有效期
			paymentTimeoutChange(e) {
				console.log(e)
				switch (e) {
					case '1小时':
						this.redpacketFrom.paymentTimeout = 1
						break;
					case '1天':
						this.redpacketFrom.paymentTimeout = 24
						break;
					case '1周':
						this.redpacketFrom.paymentTimeout = 168
						break;
					case '无限制':
						this.redpacketFrom.paymentTimeout = 0
						break;
				}
			},
			// 推荐分成回调
			fenchengChange(e) {
				console.log(e)
				this.redpacketFrom.sharingRatio = e ? 0.15 : ''
			},
			//分成数
			baifenbiChange(e) {
				console.log(e)
				this.redpacketFrom.sharingRatio = e / 100
			},
			// 订阅展开
			getConditionShow() {
				this.isConditionShow = !this.isConditionShow
			},
			// 智能防刷滑动按钮
			switchChange(e) {
				console.log('e', e);
			},
			// 红包类型弹出框
			typePopupShow() {
				this.popupTitle = '收款模式'
				this.popupList.list = [{
						id: 0,
						name: this.i18n.paymentDetails.type.text1
					},
					{
						id: 1,
						name: this.i18n.paymentDetails.type.text2
					},
				]
				this.typeShow = true
				this.popupShow = true
				this.popupList.label = 0
			},
			// 取消提示框
			confirm() {
				this.show = false
				this.jionShow = true
			},
			// 弹出选择框
			selectClick(item) {
				console.log(item, 'item')
				this.redpacketFrom.transType = item.id
				if (this.popupList.label == 0) {
					this.redpacketType = item.name
					if (item.id) {
						this.moneyText = this.i18n.sendpacket.tabs.name1
					} else {
						this.moneyText = this.i18n.sendpacket.tabs.name2
					}
					this.typeShow = false
				} else if (this.popupList.label == 1) {
					this.redpacketFrom.accountType = item.name
					if (item.name == 'TRX') {
						this.accountTypeImg = '../../static/icon/TRX.png'
					} else {
						this.accountTypeImg = '../../static/icon/USDT.png'
					}
					this.currencyShow = false
				}
				this.popupShow = false
				this.redpacketFrom.money = ''
				this.redpacketFrom.transNum = ''

			},
			// 关闭弹框
			close() {
				this.show = false
				this.jionShow = true
			},
		}
	}
</script>

<style lang="scss">
	page {
		// height: 100%;
		background: #F6F2F3FF;
		position: relative;
		// overflow:auto; /* 禁止溢出滚动 */
	}

	.redpacket_AD {
		border-radius: 30rpx;
		padding: 47rpx 32rpx;
		width: 100%;
		margin-top: 30rpx;
		background-color: #fff;

		.title {
			margin-bottom: 32rpx;
			font-size: 16px;
			color: #000;
			font-weight: 600;
		}
	}


	.xuanxiang {
		margin-top: 8rpx;

		.xxson {
			width: 126rpx;
			text-align: center;
			border: 1px solid #E6E6E6FF;
			border-radius: 12rpx;
			padding: 10rpx 0rpx;
			box-sizing: border-box;
			color: #333333;
			font-size: 24rpx;
			margin-left: 20rpx;
		}
	}

	/deep/.u-button {
		border: none;
		cursor: pointer;
		outline: none;
		transition: transform 0.3s ease, box-shadow 0.3s ease !important;
		/* transition: background-color 0.3s; */
	}

	/deep/.u-button:active {
		transform: scale(0.9);
		/* 点击时缩小 */
	}

	.reload {
		width: 40rpx;
		height: 40rpx;
		animation: spin 1s linear 0s 1;
		transition: transform 1s;
		/* 平滑过渡变换效果 */
	}

	.rotate {
		transform: rotate(360deg);
		/* 旋转360度 */
	}

	/* 定义旋转动画 */
	.rotate-animation {
		transition: transform 2.5s;
		/* 持续时间为1秒 */
		transform-origin: center center;
		/* 旋转中心点 */
	}

	/* 添加旋转的关键帧 */
	.rotate-animation.active {
		transition: transform 1s;
		transform: rotate(360deg);
		/* 旋转360度 */
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
			/* 开始状态 */
		}

		to {
			transform: rotate(360deg);
			/* 结束状态，完成一整圈的旋转 */
		}
	}

	.radioList {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
		padding: 30rpx 30rpx 0 30rpx;

		image {
			width: 50rpx;
			height: 50rpx;
		}
	}

	.qunzu {
		background-color: #FFFAFA;
		border-radius: 30rpx;
		height: 140px;
		overflow-y: auto;
	}

	/deep/.u-popup__content {
		// top: 40rpx;
		// height: 85vh;
		// overflow-y: auto;
		background-color: #F5F1F3;
	}

	.bg {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 660rpx;
		background-image: url(https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/after_redpacket.png);
		// background-position: bottom;
		// background-repeat: no-repeat;
		background-size: 100% 100%;
		// border-top-left-radius: 200rpx;
		// border-top-right-radius: 200rpx;
		z-index: 1;
	}

	.avatar {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-weight: 700;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		font-size: 40rpx;
		margin-right: 20rpx;
	}

	::v-deep .u-form-item__body {
		padding: 0;
	}

	::v-deep .u-form-item__body__right__message {
		margin-top: 20rpx;
		text-align: right;
	}

	::v-deep .u-textarea__field {
		font-size: 32rpx;
	}

	.copy {
		color: #0088cc;
		font-weight: 600;
		margin: 0 10rpx;
	}

	.jion_popup {
		width: calc(100vw - 60rpx);
		padding: 40rpx 30rpx 30rpx 30rpx;
		background: #F5F1F3;
		border-radius: 30rpx;

		.popup_total {
			text-align: center;
			margin-bottom: 44rpx;
			font-weight: 500;
			font-size: 36rpx;
			color: #333333;

			.icon {
				position: absolute;
				top: 30rpx;
				right: 30rpx;
			}
		}



		.add_bot {
			margin-bottom: 10rpx;

			.total {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					display: flex;
					align-items: center;
					justify-content: left;



					.icon {
						width: 8rpx;
						height: 28rpx;
						background: #FC575F;
						border-radius: 4rpx;
						margin-right: 10rpx;
					}
				}

				.button {
					padding: 16rpx 30rpx;
					background-color: #FC575F;
					font-weight: 500;
					font-size: 28rpx;
					border-radius: 34rpx;
					cursor: pointer;
					color: #FFFFFF;
				}
			}

			.massage {
				font-weight: 500;
				font-size: 24rpx;
				color: #8E8E8E;
				margin-top: 14rpx;
			}
		}

		.choose_bot,
		.recive_rules {

			.total {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 30rpx;

				.left {
					display: flex;
					justify-content: left;
					align-items: center;

					.icon {
						width: 8rpx;
						height: 28rpx;
						background: #FC575F;
						border-radius: 4rpx;
						margin-right: 10rpx;
					}

					image {
						width: 40rpx;
						height: 40rpx;
						margin-left: 10rpx;
					}
				}


			}
		}

		.button_2 {
			background-color: rgba(252, 87, 95, 1);
			border-radius: 22px;
			margin: 20px 10px 0 5px;
			padding: 13px 0;
			border: none;
			cursor: pointer;
			outline: none;
			transition: transform 0.3s ease, box-shadow 0.3s ease;
		}

		.button_2:active {
			transform: scale(0.9);
			/* 点击时缩小 */
			box-shadow: 0 4px 8px rgba(252, 87, 95, 0.2);
			/* 添加阴影 */
		}

		.text_30 {
			overflow-wrap: break-word;
			color: rgba(255, 255, 255, 1);
			font-size: 18px;
			font-family: PingFangSC-Medium;
			font-weight: 500;
			text-align: center;
			white-space: nowrap;
			line-height: 20px;
		}


	}



	.send_redpacket {
		padding: 80rpx 20rpx 0rpx;
		box-sizing: border-box;
		width: 100%;
		position: relative;
		z-index: 2;

		.top_subsection {
			display: flex;
			width: 100%;
			justify-content: space-between;
			align-items: flex-end;

			.subsection {
				padding: 30rpx 0rpx;
				width: 50%;
				text-align: center;
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				font-size: 32rpx;
				color: #8E8E8E;
				background-color: #FAF7F8;
				cursor: pointer;
			}

			.single {
				border-radius: 48rpx 0 0 0;
			}

			.group {
				border-radius: 0 48rpx 0 0;
			}

			.group_active {
				border-radius: 48rpx 48rpx 0 0;
				padding: 44rpx 0 30rpx 0;
				background-color: #FFFFFF;
				position: relative;
				color: #333333;

				&::before {
					content: '';
					position: absolute;
					width: 60rpx;
					height: 100%;
					top: 0rpx;
					left: -60rpx;
					background: radial-gradient(ellipse at -122rpx -130rpx, transparent 220rpx, #FFFFFF 0rpx);
				}
			}


			.single_active {
				border-radius: 30rpx 30rpx 0 0;
				padding: 44rpx 0 30rpx 0;
				background-color: #FFFFFF;
				position: relative;
				color: #333333;

				&::before {
					content: '';
					position: absolute;
					width: 60rpx;
					height: 100%;
					top: 0rpx;
					right: -60rpx;
					background: radial-gradient(ellipse at 71px -35px, transparent 80px, #FFFFFF 0rpx);
				}
			}
		}

		/deep/.u-text__value {
			font-weight: 600 !important;
		}

		.initAni {
			animation: aniSlideUpIn-3b9bbaf6 .5s
		}

		@keyframes aniSlideUpIn-3b9bbaf6 {
			0% {
				transform: translateY(120%)
			}

			to {
				transform: translateY(0)
			}
		}

		@keyframes aniSlideUpOut-3b9bbaf6 {
			0% {
				transform: translateY(0)
			}

			to {
				transform: translateY(120%)
			}
		}

		.content {
			.redpacket_form {
				height: 100%;

				.redpacket_type {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-radius: 30rpx;
					border: 2rpx solid #E5E5E5;
					padding: 32rpx 20rpx;

					.label {
						font-family: PingFangSC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #333333;
						line-height: 44rpx;
					}

					.value {
						font-family: PingFangSC, PingFang SC;
						font-weight: 600;
						font-size: 32rpx;
						color: #333333;
						line-height: 44rpx;
						display: flex;
						align-items: center;
						cursor: pointer;
					}
				}

				.redpacket_num {
					background-color: #fff;
					border-radius: 20rpx;
					padding: 16rpx 32rpx;
					box-sizing: border-box;
				}

				.redpacket_money {
					width: 100%;
					border-radius: 20rpx;
					margin-top: 30rpx;
					background-color: #fff;

					.inputSlot {
						display: flex;
						align-items: center;
					}
				}

				.canuseMoney {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					margin-top: 15rpx;
					padding-right: 10rpx;

					.text {
						font-size: 24rpx;
						color: #8E8E8E;
					}

					.text2 {
						font-size: 24rpx;
						color: #8E8E8E;
					}

					.value {
						font-size: 30rpx;
						margin: 0 10rpx;
						color: #333333;
					}
				}

				.redpacket_condition {
					width: 100%;
					border-radius: 30rpx;
					border: 2rpx solid #FAF7F8;
					background-color: #FFFFFFFF;
					padding: 32rpx 20rpx;
					margin-top: 30rpx;
					position: relative;

					.bgjb {
						width: 100%;
						height: 120rpx;
						position: absolute;
						// border-top-right-radius: 30rpx;
						// border-top-left-radius: 30rpx;
						border-radius: 30rpx;
						top: 0;
						left: 0;
						right: 0;
						z-index: 1;
						background: linear-gradient(180deg, #E1EAFFFF 0%, #FFFFFFFF 100%);
					}

					.condition_total {
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 28rpx;
						color: #333333;
						position: relative;
						z-index: 2;

						.title {
							font-size: 16px;
							color: #000;
							font-weight: 600;
						}
					}

					.conditionShow {
						margin-top: 30rpx;

						.condition_message {
							padding: 16rpx 0;
							background: #FAF7F8;
							border-radius: 10rpx;
							font-weight: 500;
							font-size: 28rpx;
							color: #FF5E90;
							line-height: 32rpx;
							text-align: center;
						}



						.join_channel,
						.join_group {
							display: flex;
							align-items: center;
							justify-content: space-between;

							.label {
								font-weight: 400;
								font-size: 28rpx;
								color: #333333;
							}

							.value {
								display: flex;
								align-items: center;
								justify-content: flex-end;
								color: #2878ff;
								width: 400rpx;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}

						}

						.join_channel {
							border-bottom: 2rpx solid #E5E5E5;
							padding-bottom: 30rpx;
						}

						.u-radio-group {
							flex: inherit !important;
						}
					}


				}

				.value {
					font-size: 28rpx;
					color: #333;
				}


			}

		}

		.form_button {
			text-align: center;
			width: 100%;
			padding-top: 220rpx;

			.tishi {
				margin: 40rpx 0;
				font-size: 24rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				color: #8E8E8E;

				text {
					color: #FC575F;
				}
			}
		}
	}
</style>