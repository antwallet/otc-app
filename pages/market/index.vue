<template>
	<view class="">
		<view class="send_redpacket">
			<view class="top_subsection">
				<view :class="subsection == 0?'single subsection single_active fl_cen':'single subsection fl_cen'"
					@click="subsectionSelect(0)">
					<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/torn.png"
						mode=""></image> {{i18n.home.tabs.tab3}}
				</view>
				<view :class="subsection == 1?'group subsection group_active fl_cen':'group subsection fl_cen'"
					@click="subsectionSelect(1)">
					<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/tgVip.png"
						mode=""></image>{{i18n.home.tabs.tab4}}
				</view>
			</view>
			<view class="content">
				<view class="redpacket_form">
					<u--form label-align="right" :model="model" ref="uForm">
						<!-- v-if="!subsection == 0" -->
						<view v-show="subsection == 0">
							<view class="recive_rules2">
								<view class="title fl_cen">
									{{i18n.market.tron.title}}
									<image src="../../static/icon/TRX.png" mode="">
									</image>
								</view>
								<view class="tgtishi">
									{{i18n.market.tron.tishi}}
								</view>

							</view>
							<view class="recive_rules">
								<view class="total">
									<view class="left">
										<view class="icon"></view>
										<view class="text">{{i18n.market.power.title1}}</view>
									</view>
									<view class="jinbu">
										<u-number-box v-model="energyType" @change="changeType">
											<view slot="minus" class="minus">
												<image
													src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/jian.png"
													mode=""></image>
											</view>
											<text slot="input" style="text-align: center;"
												class="input">{{energyType}}</text>
											<view slot="plus" class="plus">
												<image
													src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/jia.png"
													mode=""></image>
											</view>
										</u-number-box>
									</view>
								</view>
								<view class="timelist fl_ju">
									<view :class="energyType == 2?'timeson se':'timeson'" @click="energyType = 2">
										2
									</view>
									<view :class="energyType == 5?'timeson se':'timeson'" @click="energyType = 5">
										5
									</view>
									<view :class="energyType == 10?'timeson se':'timeson'" @click="energyType = 10">
										10
									</view>
									<view :class="energyType == 20?'timeson se':'timeson'" @click="energyType = 20">
										20
									</view>
								</view>
							</view>
							<!-- <view class="recive_rules" style="margin-top: 40rpx;"> -->
							<!-- 	<view class="total">
									<view class="left">
										<view class="icon"></view>
										<view class="text">{{i18n.market.premium.title2}}</view>
									</view>
								</view> -->
							<view class="recive_rules" style="margin-top: 40rpx;">
								<view class="total">
									<view class="left">
										<view class="icon"></view>
										<view class="text">{{i18n.market.premium.title2}}</view>
									</view>
								</view>
								<view class="duoxuan">
									<u-radio-group v-model="duration" class="fl_wl">
										<view class="fl_ju son" style="border: 1px solid #FC575F;">
											<view class="fl_al">
												<u-radio activeColor="red" inactiveColor="red" shape="circle"
													name="duration" :label="'1 '+i18n.market.hr"></u-radio>
											</view>
											<view class="feiyong">
												<view class="">
													{{price2}} USDT / {{i18n.market.Count}}⚡️
												</view>
											</view>
										</view>
									</u-radio-group>
								</view>
							</view>
							<!-- </view> -->
							<!-- 		<view class="recive_rules" style="margin-top: 28rpx;padding-top: 10rpx;">
								<view class="total">
									<view class="left" style="margin-top: 10rpx;">
										<view class="icon"></view>
										<view class="text">{{i18n.market.power.title2}}</view>
									</view>
										<view class="jinbu">
										<u-number-box v-model="rentTime" min="0">
											<view slot="minus" class="minus">
												<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/jian.png" mode=""></image>
											</view>
											<text slot="input" style="text-align: center;"
												class="input">{{rentTime == 0?'1':rentTime}}{{rentTime == 0?i18n.market.hr:i18n.market.day}}</text>
											<view slot="plus" class="plus">
												<image src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/jia.png" mode=""></image>
											</view>
										</u-number-box>
									</view>
								</view>
							</view> -->
							<!-- 		<view class="recive_rules" style="margin-top: 40rpx;">
								<view class="total">
									<view class="left">
										<view class="icon"></view>
										<view class="text">{{i18n.market.premium.title2}}</view>
									</view>
								</view>
								<view class="timelist fl_ju">
									<view :class="rentTime == 0?'timeson se':'timeson'" @click="rentTime = 0">
										1{{i18n.market.hr}}
									</view>
									<view :class="rentTime == 1?'timeson se':'timeson'" @click="rentTime = 1">
										1{{i18n.market.day}}
									</view>
									<view :class="rentTime == 3?'timeson se':'timeson'" @click="rentTime = 3">
										3{{i18n.market.day}}
									</view>
									<view :class="rentTime == 30?'timeson se':'timeson'" @click="rentTime = 30">
										30{{i18n.market.day}}
									</view>
								</view>
							</view> -->
							<view class="recive_rules" style="margin-top: 28rpx;">
								<view class="total">
									<view class="left">
										<view class="icon"></view>
										<view class="text">{{i18n.market.power.title3}}</view>
									</view>
								</view>
								<view class="jieshou">
									<u-form-item prop="hexAddress" ref="item1">
										<u--input :placeholder="i18n.market.power.put" border="none"
											v-model="model.hexAddress" :maxlength="34"></u--input>
									</u-form-item>

								</view>
							</view>
							<view class="recive_rules" style="margin-top: 28rpx;">
								<view class="total">
									<view class="left">
										<view class="icon"></view>
										<view class="text">{{i18n.market.power.title4}}</view>
									</view>
									<view class="qian">
										{{price}} USDT⚡️
									</view>
								</view>
								<view class="tishi">
									{{i18n.market.nengliang.tishi}} {{demoDurnTrx * energyType}} TRX
								</view>
							</view>
							<view class="form_button">
								<u-button shape="circle" @click="sendRedpacket" type="info" size="large"
									:text="i18n.market.btn"
									:customStyle="{background:'#FC575F',border:'1px solid #FC575F',fontWeight:'600',color:'#fff'}"></u-button>
							</view>
							<view class="chakan" @click="listDetail(0)">
								<text class="chajl"> {{i18n.market.tishi}} ></text>
							</view>
						</view>
						<view v-if="subsection == 1">
							<view class="recive_rules2">
								<view class="title fl_cen">
									{{i18n.market.vip.title}}
									<image
										src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/tg.png"
										@click="tgvip" mode="">
									</image>
								</view>
								<view class="tgtishi">
									{{i18n.market.vip.tishi}}
								</view>
								<view class="total">
									<view class="left">
										<view class="icon"></view>
										<view class="text">{{i18n.market.premium.title1}}</view>
									</view>
									<text class="buy" @click="buyFor">{{i18n.market.premium.buy}}</text>
								</view>
								<view class="jieshou">
									<u-form-item prop="firstName" ref="item2">
										<u--input :placeholder="i18n.market.premium.put" disabledColor="#F5F1F3"
											:disabled="showSs" :customStyle="{border:'none'}" border="surround"
											v-model="model.firstName" @blur="confirm">
											<!-- @confirm="confirm" -->
											<!-- @input="confirma"	@confirm="confirm" -->
											<template slot="suffix" v-if="model.firstName">
												<u-icon name="close" @click="close"></u-icon>
												<!-- 		<u-button @tap="confirm" text="搜索" type="success"
													:customStyle="{background:'#FC575F',border:'1px solid #FC575F',fontWeight:'600',color:'#fff'}"
													size="mini"></u-button> -->
											</template>
										</u--input>
									</u-form-item>
								</view>
								<view class="fl_ju zhu" v-for="(item,index) in vipAll">
									<view class="jieshou2">
										<u-form-item prop="firstName" ref="item2">
											<u--input :placeholder="i18n.market.premium.put" disabledColor="#F5F1F3"
												:disabled="item.showSs" :customStyle="{border:'none'}" border="surround"
												v-model="item.firstName" @blur="allConfirm(item.firstName,index)">
												<!-- @confirm="allConfirm(item.firstName,index)" -->
												<template slot="suffix" v-if="item.firstName">
													<u-icon name="close" @click="closeVip(index)"></u-icon>
												</template>
											</u--input>
										</u-form-item>
									</view>
									<image
										src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/ashbin.png"
										@click="removeTwitterCondition(index)" class="ashbin" mode=""></image>
								</view>

								<view class="add" @click="add" v-if="addshow">
									{{i18n.market.add}}
								</view>
							</view>
							<view class="recive_rules2" style="margin-top: 40rpx;">
								<view class="total">
									<view class="left">
										<view class="icon"></view>
										<view class="text">{{i18n.market.premium.title2}}</view>
									</view>
								</view>
								<view class="duoxuan">
									<u-radio-group v-model="model.premiumType" class="fl_wl">
										<view class="fl_ju son"
											:style="model.premiumType == item.duration?'border: 1px solid #FC575F;':'border: 1px solid #E5E5E5;'"
											v-for='item in typesList' @click="model.premiumType = item.duration ">
											<view class="fl_al" v-if="item.duration == 2">
												<u-radio activeColor="red" shape="circle" :name="item.duration"
													:label="'1 '+i18n.market.premium.nian"></u-radio>
											</view>
											<view class="fl_al" v-if="item.duration == 1">
												<u-radio activeColor="red" shape="circle" :name="item.duration"
													:label="'6 '+i18n.market.premium.yue"></u-radio>
											</view>
											<view class="fl_al" v-if="item.duration == 0">
												<u-radio activeColor="red" shape="circle" :name="item.duration"
													:label="'3 '+i18n.market.premium.yue"></u-radio>
											</view>
											<view class="feiyong">
												<view class="">
													<!-- {{i18n.market.premium.dayue}} -->
													{{item.price}}
													{{i18n.market.premium.danwei}}
												</view>
												<view class="huilv" v-if="bzType != 'USD'">
													≈{{bzType == 'PHP'?'₱':bzType == 'INR'?'₹':'$'}}{{Number(item.exchangePrice).toFixed(2)}}
													{{bzType}}
												</view>
											</view>
										</view>
									</u-radio-group>
								</view>
							</view>
							<view class="form_button" v-if="showSs || ssAll">
								<u-button shape="circle" @click="sendRedpacketVip" type="info" size="large"
									:text="i18n.market.btn2"
									:customStyle="{background:'#FC575F',border:'1px solid #FC575F',fontWeight:'600',color:'#fff'}"></u-button>
							</view>
							<view class="form_button" v-else>
								<u-button shape="circle" type="info" size="large" disabled :text="i18n.market.btn2"
									:customStyle="{background:'#f3777d',border:'1px solid #f3777d',fontWeight:'600',color:'#fff'}"></u-button>
							</view>
							<view class="chakan" @click="listDetail(1)">
								<text class="chajl"> {{i18n.market.tishi}} ></text>
							</view>
						</view>
					</u--form>
					<!-- 		<view class="" style="height: 50rpx;">
					</view> -->
				</view>
			</view>
			<u-tabbar :value="1" :fixed="true" :placeholder="true" activeColor="#FC575F" :safeAreaInsetBottom="true"
				:border="false">
				<u-tabbar-item :text="i18n.home.title" @click="goHome">
					<image class="u-page__item__slot-icon" slot="active-icon" style="width: 48rpx;height: 48rpx;"
						src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/home2.png">
					</image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" style="width: 48rpx;height: 48rpx;"
						src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/home.png">
					</image>
				</u-tabbar-item>
				<!-- 		<u-tabbar-item text="" @click="sendpacket" style="margin-bottom: 80rpx;">
				<image class="u-page__item__slot-icon" slot="inactive-icon" style="width: 132rpx;height: 132rpx;"
					src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/send.png"></image>
			</u-tabbar-item> -->
				<!-- 		<u-tabbar-item :text="i18n.guessing.title" @click="goguessing">
					<image class="u-page__item__slot-icon" slot="active-icon" style="width: 48rpx;height: 48rpx;"
						src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/guessing2.png"></image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" style="width: 48rpx;height: 48rpx;"
						src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/guessing.png"></image>
				</u-tabbar-item> -->
				<u-tabbar-item :text="i18n.market.title">
					<image class="u-page__item__slot-icon" slot="active-icon" style="width: 48rpx;height: 48rpx;"
						src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/market2.png">
					</image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" style="width: 48rpx;height: 48rpx;"
						src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/market.png">
					</image>
				</u-tabbar-item>
				<u-tabbar-item :text="i18n.my.title" @click="gomy">
					<image class="u-page__item__slot-icon" slot="active-icon" style="width: 48rpx;height: 48rpx;"
						src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/my2.png">
					</image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" style="width: 48rpx;height: 48rpx;"
						src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/images/my.png">
					</image>
				</u-tabbar-item>
			</u-tabbar>
			<clarity-tracker :enabled="true" clarity-id="n11jsnn4nv" />
			<u-toast ref="uToast" />
		</view>
	</view>

</template>

<script>
	import {
		handlePurchasingPrice,
		handlePremiumType,
		premiumGetChat,
		handleUserBuyPremium,
		handleUserBuyEnergy
	} from '@/api/withdrawal.js';
	import {
		getUserInfo,
	} from '@/api/index.js';
	import ClarityTracker from '@/components/ClarityTracker.vue'
	import {
		Debounce
	} from '@/utils/debounce.js';
	export default {
		components: {
			ClarityTracker
		},
		data() {
			return {
				duration: 'duration',
				vipAll: [], //为多人购买
				typesList: [], //会员列表
				addshow: true, //新增
				model: {
					hexAddress: '', //接收地址
					premiumType: '0', //选择时长
					firstName: '', //收件人
					userId: '' //收件人tgid
				},
				energyType: 1, //笔数
				price: 0, //支付金额
				price2: 0, //支付金额
				rentTime: 0, //租用时间
				bzType: uni.getStorageSync('bzType'), //当前币种
				rules: {
					firstName: {
						type: 'string',
						required: true,
						message: '',
						trigger: ['blur', 'change']
					},
					hexAddress: [{
						type: 'string',
						required: true,
						message: '',
						trigger: ['blur', 'change']
					}, {
						// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return value.startsWith('T')
						},
						message: "",
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ["change", "blur"],
					}, {
						// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return value.length == 34
						},
						message: " ",
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ["change", "blur"],
					}],
				},
				premiumData: {
					buyType: ''
				},
				isReviceChoose: 1,
				accountTypeImg: '../../static/icon/USDT.png',
				moneyText: '(拼)总金额',
				height: '--height:100%;--imageHeight:330px',
				isSetChargePsw: false,
				isConditionShow: false,
				conditionShow: false,
				popupShow: false,
				typeShow: false,
				ssAll: false, //判断数组里是否有值
				currencyShow: false,
				color: '',
				popupTitle: '红包类型',
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
				user: {},
				jsonType: 0,
				groupList: [],
				subsection: 0, //tab值
				// geiInfo获取数据
				canuseMoney: {
					'TRX': 0.00,
					'USDT': 0.00
				},
				debounce: new Debounce(), //状态锁
				showSs: false, //会员按钮状态
				demoDurnTrx: 0 //手续费
			};
		},
		watch: {
			energyType(newValue, oldValue) {
				this.handlePur()
			},
			rentTime(newValue, oldValue) {
				this.handlePur()
			}
		},
		computed: {
			i18n() {
				return this.$t('message')
			},
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(option) {
			this.subsection = option.type || 0
		},
		onShow() {
			if (window.Telegram) {
				Telegram.WebApp.BackButton.hide(); // 显示返回按钮
			}
			this.rules.firstName.message = this.i18n.market.rules.firstName
			this.rules.hexAddress[0].message = this.i18n.market.rules.hexAddress.tishi1
			this.rules.hexAddress[1].message = this.i18n.market.rules.hexAddress.tishi2
			this.rules.hexAddress[2].message = this.i18n.market.rules.hexAddress.tishi3
			this.handlePur()
			this.user = uni.getStorageSync('user')
			handlePremiumType(this.bzType).then(res => {
				if (res.data && res.data.code === 0) {
					console.log(res.data.tPremiumTypes)
					this.typesList = res.data.tPremiumTypes
					this.bzType = res.data.exchangeType
				}
			})
			getUserInfo().then(res => {
				if (res.data && res.data.code === 0) {
					console.log(res)
					this.isSetChargePsw = res.data.userInfo.setChargePsw
					console.log(this.isSetChargePsw, 'this.isSetChargePsw')
					// this.$store.dispatch('changeRechargeAmount', this.isSetChargePsw);
					// uni.setStorageSync('user', res.data.userInfo)
					uni.setStorageSync('isSetChargePsw', res.data.userInfo.setChargePsw)
				}
			}).catch(errors => {
				console.log(errors)
			});
			// 调能量外部别人接口
			uni.request({
				url: 'https://itrx.io/api/v1/frontend/index-data',
				success: (res) => this.demoDurnTrx = res.data.demo_burn_trx
			})
			handlePurchasingPrice(this.energyType, this.rentTime + 1).then(res => {
				if (res.data && res.data.code === 0) {
					console.log(res.data.price)
					this.price2 = res.data.price
				}
			}).catch(errors => {
				this.$refs.uToast.error(errors.message)
			});
		},
		methods: {
			// 删除购买用户
			removeTwitterCondition(index) {
				this.vipAll.splice(index, 1);
				this.addshow = true
			},
			// 新增购买用户
			add() {

				this.vipAll.push({
					firstName: '',
					userName: '',
					showSs: false
				});
				if (this.vipAll.length == 9) {
					this.addshow = false
					return
				}
			},
			// 清除
			close() {
				this.model.firstName = ''
				this.showSs = false
			},
			// 删除指定人员
			closeVip(e) {
				this.vipAll[e].firstName = ''
				this.vipAll[e].showSs = false
				this.ssAll = this.vipAll.some(item => item.showSs === true)
			},
			// 去首页
			goHome() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			},
			// 去竞猜
			goguessing() {
				uni.navigateTo({
					url: '/pages/guessing/index'
				})
			},
			// 去我的
			gomy() {
				uni.navigateTo({
					url: '/pages/user/index'
				})
			},
			//笔数监听
			changeType(e) {
				console.log(e)
			},
			//计算支付金额
			handlePur() {
				handlePurchasingPrice(this.energyType, this.rentTime + 1).then(res => {
					if (res.data && res.data.code === 0) {
						console.log(res.data.price)
						this.price = res.data.price
					}
				}).catch(errors => {
					this.$refs.uToast.error(errors.message)
				});

			},
			// 下单
			sendRedpacket() {
				this.$refs.uForm.validate().then(res => {
					var powerData = {
						energyType: this.energyType,
						rentTime: this.rentTime + 1,
						money: this.price,
						hexAddress: this.model.hexAddress,
					}
					uni.showLoading({})
					handleUserBuyEnergy(powerData).then(res => {
						this.$refs.uToast.success(res.data.data)
						uni.hideLoading()
					}).catch(errors => {
						this.$refs.uToast.error(errors.data.message)
						uni.hideLoading()
						if (errors.data.code == 10003) {
							// 余额不足
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/charge/index'
								});
							}, 2000); // 2000 毫秒，即 2 秒后执行操作
						} else {
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/index/index'
								});
							}, 2000); // 2000 毫秒，即 2 秒后执行操作
						}
					}).finally(() => {

					})
					// uni.setStorageSync('powerData', powerData)
					// if (!this.isSetChargePsw) {
					// 	uni.navigateTo({
					// 		url: '/pages/charge_psw/set_index?type=market'
					// 	})
					// } else {
					// 	uni.navigateTo({
					// 		url: '/pages/charge_psw/get_index?type=market',
					// 		success: function(res) {
					// 			const eventChannel = res.eventChannel;
					// 			eventChannel.emit('powerData', powerData);
					// 		}
					// 	})
					// }

				})
			},
			// 会员购买
			sendRedpacketVip() {
				var that = this
				that.premiumData.buyType = 1
				that.premiumData.userId = that.model.userId
				let userNames = [];
				if (that.model.userName) {
					userNames.push(that.model.userName);
				}
				that.vipAll.forEach(item => {
					if (item.userName) {
						userNames.push(item.userName);
					}
				});
				const result = userNames.join(',');
				that.premiumData.userName = result
				that.premiumData.premiumType = that.model.premiumType
				console.log(that.premiumData)
				uni.setStorageSync('premiumData', that.premiumData)
				// if (!that.isSetChargePsw) {
				// 	uni.navigateTo({
				// 		url: '/pages/charge_psw/set_index?type=market'
				// 	})
				// } else {
				// 	uni.navigateTo({
				// 		url: '/pages/charge_psw/get_index?type=market',
				// 		success: function(res) {
				// 			const eventChannel = res.eventChannel;
				// 			eventChannel.emit('premiumData', that.premiumData);
				// 		}
				// 	})
				// }
				uni.showLoading({})
				handleUserBuyPremium(this.premiumData).then(res => {
					this.$refs.uToast.success(res.data.data)
					uni.hideLoading()
				}).catch(errors => {
					this.$refs.uToast.error(errors.data.message)
					uni.hideLoading()
					if (errors.data.code == 10003) {
						// 余额不足
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/charge/index'
							});
						}, 2000); // 2000 毫秒，即 2 秒后执行操作
					} else {
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/index/index'
							});
						}, 2000); // 2000 毫秒，即 2 秒后执行操作
					}
				}).finally(() => {

				})
			},
			// 为自己购买
			buyFor() {
				this.debounce.use(() => {
					this.model.firstName = this.user.userName
					this.model.userId = this.user.userTGID
					if (this.model.firstName == '未设置') {
						this.$refs.uToast.error(this.i18n.market.premium.text1)
					} else {
						this.confirm()
					}
				}, 500);
			},
			// tg会员
			tgvip() {
				const url = 'https://telegram.org/blog/700-million-and-premium'
				// 最推荐的方法
				Telegram.WebApp.openLink(url, {
					try_instant_view: false // 禁用即时视图，强制在外部浏览器打开
				});
			},
			// 查询用户名
			confirm() {
				if (this.model.firstName == '未设置') {
					this.$refs.uToast.error(this.i18n.market.premium.text1)
					this.model.firstName = ''
					this.model.userName = ''
					return
				}
				if (this.model.firstName == '') {
					this.model.firstName = ''
					this.model.userName = ''
					return
				}
				var that = this
				premiumGetChat(that.model.firstName).then(res => {
					if (res.data && res.data.code === 0) {
						that.model.userName = that.model.firstName
						that.model.firstName = res.data.data
						console.log(that.model.userName, that.model.firstName)
						that.showSs = true
					}
				}).catch(errors => {
					that.$refs.uToast.error(errors.message)
					this.model.firstName = ''
					this.model.userName = ''
				});
			},
			allConfirm(e, index) {
				if (e == '') return
				var that = this
				premiumGetChat(e).then(res => {
					if (res.data && res.data.code === 0) {
						console.log(res.data)
						that.vipAll[index].userName = e
						that.vipAll[index].firstName = res.data.name
						that.vipAll[index].showSs = true
						that.ssAll = that.vipAll.some(item => item.showSs === true)
					}
				}).catch(errors => {
					that.$refs.uToast.error(errors.message)
					that.vipAll[index].userName = ''
					that.vipAll[index].firstName = ''
				});
			},
			// 不符合会员提示
			sendRedpacketVipError: function() {
				this.$refs.uToast.error(this.i18n.page.text38)
			},
			cancelBnt() {
				this.showSs = false
			},
			// 能量交易记录
			listDetail(e) {
				if (e == 0) {
					uni.navigateTo({
						url: '/pages/market/listDetail'
					})
				} else {
					uni.navigateTo({
						url: '/pages/market/premiumDetail'
					})
				}

			},
			// 能量会员切换
			subsectionSelect(index) {
				this.subsection = index
				this.$refs.uForm.setRules(this.rules);
				this.duration = 'duration'
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #F5F1F3;
		position: relative;
		padding-top: 30rpx;
		height: 100vh;
	}

	.qunzu {
		background-color: #FFFAFA;
		border-radius: 30rpx;
		height: 140px;
		overflow-y: auto;
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

	.chakan {
		width: 100%;
		font-family: PingFangSC, PingFang SC;
		font-weight: 600;
		font-size: 24rpx;
		color: #8E8E8E;
		text-align: center;
		margin: 40rpx 0;
	}

	.chajl {
		cursor: pointer;
	}

	.chajl:hover {
		color: #FC575F;
	}

	.chajl:not(:hover) {
		color: #8E8E8E;
	}

	.send_redpacket {
		padding: 0 20rpx;
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

				image {
					width: 48rpx;
					height: 48rpx;
					margin-right: 10rpx;
				}
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
				color: #FC575F;

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
				color: #FC575F;

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

		.content {
			// background-color: #FAF7F8;
			height: calc(100% - 150rpx);

			.redpacket_form {
				padding: 20rpx 20rpx;
				background-color: #FFFFFF;
				height: 100%;

				.title {
					font-weight: 800;
					font-size: 40rpx;
					color: #000000;
					text-align: center;
					margin-top: 12rpx;

					image {
						width: 53rpx;
						height: 51rpx;
						margin-left: 8rpx;
						cursor: pointer;
					}
				}

				.tgtishi {
					font-size: 28rpx;
					color: #666666;
					margin: 24rpx auto;
					text-align: center;
					margin-bottom: 48rpx;
				}

				.recive_rules2 {
					padding: 0rpx 20rpx;
					box-sizing: border-box;

					.zhu {
						.ashbin {
							width: 38rpx;
							height: 38rpx;
						}
					}

					.add {
						font-size: 28rpx;
						color: #FC575F;
						text-align: center;
						margin-top: 32rpx;
						cursor: pointer;
					}




					.duoxuan {
						width: 100%;

						.son {
							width: 100%;
							padding: 36rpx 30rpx;
							box-sizing: border-box;
							border: 1px solid #E5E5E5;
							border-radius: 30rpx;
							margin-bottom: 20rpx;

							.nian {
								margin-left: 30rpx;
								font-weight: 600;
								font-size: 32rpx;
								color: #333333;
							}

							.feiyong {
								font-weight: 600;
								font-size: 32rpx;
								color: #8E8E8E;
								text-align: right;

								.huilv {
									overflow-wrap: break-word;
									color: rgba(142, 142, 142, 1);
									font-size: 12px;
									font-family: PingFangSC-Medium;
									font-weight: 500;
									text-align: center;
									white-space: nowrap;
									line-height: 20px;
									margin: 6px 0 0 0px;
								}
							}
						}
					}

					.jieshou {
						width: 100%;
						background-color: #F5F1F3;
						border-radius: 30rpx;
						padding: 20rpx 10rpx;
						box-sizing: border-box;
						font-weight: 600;
						font-size: 32rpx;
						color: #333333;
					}

					.jieshou2 {
						width: 90%;
						background-color: #F5F1F3;
						border-radius: 30rpx;
						padding: 20rpx 10rpx;
						box-sizing: border-box;
						font-weight: 600;
						font-size: 32rpx;
						color: #333333;
						margin-top: 8rpx;
					}

					.total {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 30rpx;
						font-weight: 600;

						.buy {
							font-size: 24rpx;
							margin-right: 10rpx;
							cursor: pointer;
						}

						.buy:hover {
							color: #FC575F;
						}

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
						}

						.qian {
							font-size: 32rpx;
							color: #333333;
						}

					}
				}

				.duoxuan {
					width: 100%;

					.son {
						width: 100%;
						padding: 36rpx 20rpx;
						box-sizing: border-box;
						border: 1px solid #E5E5E5;
						border-radius: 30rpx;

						.nian {
							margin-left: 30rpx;
							font-weight: 600;
							font-size: 32rpx;
							color: #333333;
						}

						.feiyong {
							font-weight: 600;
							font-size: 32rpx;
							color: #8E8E8E;
							text-align: right;

							.huilv {
								overflow-wrap: break-word;
								color: rgba(142, 142, 142, 1);
								font-size: 12px;
								font-family: PingFangSC-Medium;
								font-weight: 500;
								text-align: center;
								white-space: nowrap;
								line-height: 20px;
								margin: 6px 0 0 0px;
							}
						}
					}
				}

				.recive_rules {
					border: 1px solid #E5E5E5;
					border-radius: 30rpx;
					padding: 42rpx 20rpx;
					box-sizing: border-box;



					.jieshou {
						width: 100%;
						background-color: #F5F1F3;
						border-radius: 30rpx;
						padding: 32rpx 22rpx;
						box-sizing: border-box;
						font-weight: 600;
						font-size: 32rpx;
						color: #333333;
					}




					.tishi {
						width: 100%;
						background-color: #FAF8F9;
						border-radius: 30rpx;
						padding: 12rpx 22rpx;
						box-sizing: border-box;
						// font-weight: 600;
						font-size: 24rpx;
						color: #FC575F;
						text-align: center;
					}

					.timelist {
						.timeson {
							background-color: #FAF8F9;
							border-radius: 30rpx;
							width: 140rpx;
							text-align: center;
							padding: 12rpx 0;
							box-sizing: border-box;
							font-family: PingFangSC, PingFang SC;
							font-weight: 600;
							font-size: 24rpx;
							color: #666666;
						}

						.se {
							color: #FC575F;
						}
					}

					.total {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 30rpx;
						font-weight: 600;

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
						}

						.qian {
							font-size: 32rpx;
							color: #333333;
						}

					}
				}

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
						font-size: 32rpx;
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

				.redpacket_money {
					width: 100%;
					margin-top: 30rpx;

					.inputSlot {
						display: flex;
						align-items: center;
					}
				}

				.canuseMoney {
					width: 100%;
					font-size: 24rpx;
					font-weight: 500;
					margin: 16rpx 0 0;
					display: flex;
					justify-content: right;
					align-items: center;

					.text {
						color: #8E8E8E;
					}

					.value {
						color: #333333;
					}
				}

				.form_button {
					margin-top: 40rpx;
					width: 100%;
					cursor: pointer;

				}

				/deep/.u-button {
					border: none;
					cursor: pointer;
					outline: none;
					transition: transform 0.3s ease, box-shadow 0.3s ease !important;
					/* transition: background-color 0.3s; */
				}

				.u-button:active {
					transform: scale(0.95);
					/* 点击时缩小 */
					box-shadow: 0 4px 8px rgba(252, 87, 95, 0.2);
					/* 添加阴影 */
				}
			}
		}
	}

	.jinbu {
		background-color: #F5F1F3;
		padding: 26rpx 30rpx;
		box-sizing: border-box;
		border-radius: 54rpx;

		.input {
			width: 150rpx;
		}

		.minus {
			width: 22px;
			height: 22px;
			border-width: 1px;
			border-color: #F5F1F3;
			border-style: solid;

			image {
				width: 40rpx;
				height: 40rpx;
			}
		}

		.input {
			padding: 0 10px;
		}

		.plus {
			width: 22px;
			height: 22px;

			image {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
</style>