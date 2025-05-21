<template>
	<view class="page flex-col">
		<u-navbar :fixed="false" :safeAreaInsetTop="false" bgColor="#fff" style="position: relative;z-index: 999;">
			<view class="u-nav-slot fl_al" slot="left" style="color: #f0614f;font-weight: 600;" @click="goHome">
			</view>
			<view class="u-nav-slot" style="color: #333;font-size: 32rpx;font-weight: bold;" slot="center">
				{{i18n.withdrawal.title}}
			</view>
		</u-navbar>
		<u-form labelPosition="left" :model="model" ref="uForm" style="padding: 0 20rpx;">
			<view class="xuanxiang">
				<u-form-item>
					<u-radio-group v-model="radiovalue1" placement="row" @change="groupChange">
						<u-radio :customStyle="{marginRight: '8px'}" activeColor="#1651f1"
							v-for="(item, index) in radiolist1" :key="index" :label="item.name" :name="item.name">
						</u-radio>
					</u-radio-group>
				</u-form-item>
			</view>
			<block v-if="radiovalue1 =='TRON' || radiovalue1 == 'TON'">
				<view class="group_3 flex-col" style="margin-top: 0;">
					<view class="group_6 flex-row">
						<view class="fl_ju" style="width: 100%;">
							<span class="text_3" v-if="radiovalue1 == 'TRON'">{{i18n.withdrawal.title2}}</span>
							<span class="text_3" v-if="radiovalue1 == 'TON'">{{i18n.withdrawal.title21}}</span>
						</view>
					</view>
					<view class="text-wrapper_7 flex-col">
						<u-form-item prop="hexAddress" ref="item1">
							<u-input v-model="model.hexAddress" @input="sxfAddress" border="none" maxlength="48"
								:placeholder="i18n.withdrawal.input"></u-input>
						</u-form-item>
					</view>
				</view>

				<view class="group_4 flex-col">
					<view class="section_2 flex-col">
						<u-form-item prop="accountType" ref="item1" type="number" :label="i18n.withdrawal.title3"
							borderBottom>
							<u-input v-model="model.accountType" inputAlign="right" disabledColor="#fff" disabled
								border="none">
							</u-input>
						</u-form-item>
					</view>
					<view class="text-wrapper_8 flex-col">
						<u-form-item prop="money" ref="item1">
							<u-input v-model="model.money" border="none" :placeholder="i18n.withdrawal.input2"
								type="number" @input="getwithdrawalMoney">
								<u--text color="#0350FF" :text="i18n.withdrawal.btn2" slot="suffix"
									@click="getTotalMoney"></u--text>
							</u-input>
						</u-form-item>
					</view>
					<view>
						<text class="text_15">{{i18n.withdrawal.text}}</text><text class="text_10"
							style="margin-left: 10rpx;">{{model.totalMoney}}</text>
					</view>
				</view>
				<view class="group_5 flex-col">
					<view class="text-wrapper_9 flex-row justify-between">
						<span class="text_12">{{i18n.withdrawal.title4}}</span>
						<span class="text_11">{{model.withdrawalMoney}}&nbsp;{{model.accountType}}</span>
					</view>
					<view class="text-wrapper_10 flex-row justify-between">
						<span class="text_12">{{i18n.withdrawal.title5}}</span>
						<span class="text_13">{{model.transactionFee}}&nbsp;{{model.accountType}}</span>
					</view>
				</view>
				<!-- 确认按钮 -->
				<view class="text-wrapper_6 flex-col button" @click="applyTronWithdrawMoney">
					<span class="text_14">{{i18n.withdrawal.btn}}</span>
				</view>
			</block>
			<block v-else>
				<view class="group_3 flex-col" style="margin-top: 0;">
					<view class="group_6 flex-col">
						<u-form-item prop="accountType" ref="item1" type="number" :label="i18n.withdrawal.title3"
							borderBottom>
							<u-input v-model="model.accountType" inputAlign="right" disabledColor="#fff" disabled
								border="none">
							</u-input>
						</u-form-item>
					</view>
					<view class="text-wrapper_7 flex-col">
						<u-form-item prop="money2" ref="item1">
							<!-- @input="getwithdrawalMoney2" -->
							<u-input v-model="model.money2" border="none" :placeholder="i18n.withdrawal.input2"
								type="number" @input="changem2">
								<u--text color="#0350FF" :text="i18n.withdrawal.btn2" slot="suffix"
									@click="getTotalMoney2"></u--text>
							</u-input>
						</u-form-item>
					</view>
					<view>
						<text class="text_15">{{i18n.withdrawal.text}}</text><text class="text_10"
							style="margin-left: 10rpx;">{{totalMoney2}}{{exchangeType}}</text>
					</view>
				</view>
				<block v-if="radiovalue1 == 'INR'">
					<!-- 银行账号 -->
					<u-form-item prop="bankCardAccount" ref="item1">
						<view class="redpacket_money">
							<u-input v-model="model.bankCardAccount" border="none" maxlength="48" inputAlign="right"
								type="text" style="padding: 32rpx 20rpx;border: none;" suffixIconStyle="color: #909399"
								:placeholder="i18n.withdrawal.tixian.title2">
								<u--text :text="i18n.withdrawal.tixian.title2" size="32rpx" color="#333333"
									slot="prefix"></u--text>
							</u-input>
						</view>
					</u-form-item>
					<!-- ifsc -->
					<u-form-item prop="ifsc">
						<view class="redpacket_money">
							<u-input v-model="model.ifsc" border="none" maxlength="48" inputAlign="right" type="text"
								style="padding: 32rpx 20rpx;border: none;" suffixIconStyle="color: #909399"
								placeholder="IFSC">
								<u--text text="IFSC" size="32rpx" color="#333333" slot="prefix"></u--text>
							</u-input>
						</view>
					</u-form-item>
					<!-- 收款姓名 -->
					<u-form-item prop="bankCardName">
						<view class="redpacket_money">
							<u-input v-model="model.bankCardName" border="none" maxlength="48" inputAlign="right"
								type="text" style="padding: 32rpx 20rpx;border: none;" suffixIconStyle="color: #909399"
								:placeholder="i18n.withdrawal.tixian.title3">
								<u--text :text="i18n.withdrawal.tixian.title3" size="32rpx" color="#333333"
									slot="prefix"></u--text>
							</u-input>
						</view>
					</u-form-item>
				</block>
				<block v-if="radiovalue1 == 'PHP'">
					<u-form-item prop="philippinesWithdrawalType">
						<view class="duoxuan">
							<u-radio-group v-model="model.philippinesWithdrawalType" class="fl_wl">
								<view class="fl_ju son" v-for='item in radiolist2'>
									<view class="fl_al">
										<u-radio activeColor="red" shape="circle" :name="item.name"
											:label="item.name"></u-radio>
									</view>
									<view class="feiyong">
										<view class="huilv" v-if="item.name == 'gcash'" @click="phili('gcash')">
											<image
												src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/pdd/Gcash.png"
												mode=""></image>
										</view>
										<view class="huilv" v-if="item.name == 'maya'" @click="phili('maya')">
											<image
												src="https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/antwalletbotApp/pdd/maya.png"
												mode=""></image>
										</view>
									</view>
								</view>
							</u-radio-group>
						</view>
					</u-form-item>

					<u-form-item prop="phone">
						<view class="redpacket_money">
							<u-input v-model="model.phone" border="none" maxlength="11" inputAlign="right" type="text"
								style="padding: 32rpx 20rpx;border: none;" suffixIconStyle="color: #909399"
								:placeholder="i18n.withdrawal.rules.text17">
								<u--text :text="i18n.withdrawal.tixian.title5" size="32rpx" color="#333333"
									slot="prefix"></u--text>
							</u-input>
						</view>
					</u-form-item>
				</block>
				<view class="group_5 flex-col" style="margin-top: 10rpx;">
					<view class="text-wrapper_9 flex-row justify-between">
						<span class="text_12">{{i18n.withdrawal.title4}}</span>
						<span class="text_11">{{daoshou}}&nbsp;{{exchangeType}}</span>
					</view>
					<view class="text-wrapper_9 flex-row justify-between" style="margin-top: 10rpx;">
						<span class="text_12">{{i18n.withdrawal.title5}}</span>
						<span class="text_13">{{exData.transactionFee * 100}}&nbsp;%</span>
					</view>
				</view>
				<view class="tishi">
					{{i18n.withdrawal.tishi1}} 85INR {{i18n.withdrawal.tishi2}} 85INR {{i18n.withdrawal.tishi3}}
				</view>
				<!-- 确认按钮 -->
				<view class="text-wrapper_6 flex-col button" @click="applyTronWithdrawMoney2">
					<span class="text_14">{{i18n.withdrawal.btn}}</span>
				</view>
				<view class="" style="height: 50rpx;">
				</view>
			</block>
		</u-form>
		</u-action-sheet>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import {
		getAccountInfo,
		getUserInfo,
		queryExchangeInfo
	} from '@/api/index.js';
	import {
		getTAntwalletConfig
	} from '@/api/common.js';
	import {
		applyTronWithdrawMoney
	} from '@/api/withdrawal.js';
	import TronTonAddressInput from '@/components/TronTonAddressInput.vue'
	import gaMixin from '@/components/ga.js'; // 引入公共脚本
	export default {
		mixins: [gaMixin],
		components: {
			TronTonAddressInput
		},
		data() {
			return {
				// 基本案列数据
				radiolist1: [{
						name: 'TRON',
						disabled: false
					},
					{
						name: 'TON',
						disabled: false
					},
				],
				radiolist2: [{
						name: 'gcash',
					},
					{
						name: 'maya',
					},
				],
				radiovalue1: 'TRON', //当前提现方式
				totalMoney2: '', //印度或者菲律宾转换
				isSetChargePsw: false, //是否设置密码
				exchangeType: '', //当前货币单位
				exData: {}, //汇率
				exchangeMoney: '', //当前换算后余额
				allMoney: '', //全部余额
				daoshou: '', //到手
				usdttotalamount: '',
				tronMoney: 0, //当前余额
				model: {
					hexAddress: '',
					accountTypeIcon: 'https://packet-gift.oss-ap-southeast-1.aliyuncs.com/2024/11/28/3097ffcc-0628-4cc2-a57d-9c6e4858edbe.png',
					accountType: 'USDT',
					totalMoney: '',
					money: '',
					transactionFee: 0,
					withdrawalMoney: 0,
				},
				showAccountType: false,
				rules: {
					accountType: [{
						type: 'string',
						required: true,
						message: '',
						trigger: ['blur', 'change']
					}, ],
					bankName: [{
						type: 'string',
						required: true,
						message: '',
						trigger: ['blur', 'change']
					}, ],
					bankCardName: {
						type: 'string',
						required: true,
						message: '',
						trigger: ['blur', 'change']
					},
					ifsc: [{
						type: 'string',
						required: true,
						message: '',
						trigger: ['blur', 'change']
					}, {
						validator: (rule, value, callback) => {
							const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
							return ifscRegex.test(value);
						},
						message: "",
						trigger: ["change", "blur"],
					}, ],

					bankCardAccount: {
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
						validator: (rule, value, callback) => {
							this.radiovalue1
							if (!this.radiovalue1) {
								return false
							}
						},
						message: "",
						trigger: ["change", "blur"],
					}, {
						validator: (rule, value, callback) => {
							return this.validateAddress()
						},
						message: "",
						trigger: ["change", "blur"],
					}, ],
					money: [{
							type: 'number',
							required: true,
							message: '',
							trigger: ['blur', 'change']
						},
						{
							validator: (rule, value, callback) => {
								return Number(this.model.money) >= Number(this.model.transactionFee);
							},
							message: '',
							trigger: ["change", "blur"],
						},
						{
							validator: (rule, value, callback) => {
								return Number(value).toFixed(2) == Number(value)
							},
							message: "",
							trigger: ["change", "blur"],
						}, {
							validator: (rule, value, callback) => {
								return Number(value).toFixed(2) <= Number(this.tronMoney)
							},
							message: "",
							trigger: ["change", "blur"],
						},
					],
					money2: [{
							type: 'number',
							required: true,
							message: '',
							trigger: ['blur', 'change']
						},
						{
							// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
							validator: (rule, value, callback) => {
								return Number(this.model.money2) - (Number(this.model.money2) * Number(this.exData
									.transactionFee)) > Number(this.exData.minimumAmount);
							},
							message: '',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ["change", "blur"],
						},
						{
							// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
							validator: (rule, value, callback) => {
								return Number(this.model.money2) <= Number(this.exchangeMoney).toFixed(2);
							},
							message: '',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ["change", "blur"],
						},
						{
							// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return Number(value).toFixed(2) == Number(value)
							},
							message: "",
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ["change", "blur"],
						}
					],
					phone: [{
						type: 'string',
						required: true,
						message: '',
						trigger: ['blur', 'change']
					}, {
						// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
						validator: (rule, value, callback) => {
							value = value.replace(/\s/g, '')
							const pattern1 = /^09\d{9}$/ // 09开头格式
							return pattern1.test(value)
						},
						message: '',
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ["change", "blur"],
					}, ],
					philippinesWithdrawalType: {
						type: 'string',
						required: true,
						message: '',
						trigger: ['blur', 'change']
					},
				},
				accountTypeActions: [
					// {
					// 	id: 0,
					// 	name: 'TRX'
					// },
					{
						id: 0,
						name: 'USDT'
					}
				],
				type: '', //语言类型
				addressType: 'TRON', //地址类别

			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		onLoad() {
			const pages = getCurrentPages()
			const currentPage = pages[pages.length - 1]
			const previousPage = pages[pages.length - 2]
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
					if (uni.getStorageSync('obj').previousPage == 'pages/index/assets') {
						uni.redirectTo({
							url: '/pages/index/assets'
						})
					} else if (uni.getStorageSync('obj').previousPage == 'pages/charge_psw/set_index') {
						uni.redirectTo({
							url: '/pages/index/index'
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
				title: this.i18n.withdrawal.title
			});
			this.getUserInfo()
			setTimeout(() => {
				window.Telegram.WebApp.MainButton.hide()
				this.showTelegramBackButton() // 再次尝试显示返回按钮
			}, 50)
			this.rules.accountType.message = this.i18n.withdrawal.rules.text1
			this.rules.bankName.message = this.i18n.withdrawal.rules.text2
			this.rules.bankCardName.message = this.i18n.withdrawal.rules.text3
			this.rules.ifsc[0].message = this.i18n.withdrawal.rules.text4
			this.rules.ifsc[1].message = this.i18n.withdrawal.rules.text5
			this.rules.bankCardAccount.message = this.i18n.withdrawal.rules.text6
			this.rules.hexAddress[0].message = this.i18n.withdrawal.rules.text7
			this.rules.hexAddress[1].message = this.i18n.withdrawal.rules.text8
			this.rules.hexAddress[2].message = this.i18n.withdrawal.title8
			this.rules.money[0].message = this.i18n.withdrawal.rules.text9
			this.rules.money[1].message = this.i18n.withdrawal.rules.text10 + this.model.transactionFee + this.model
				.accountType
			this.rules.money[2].message = this.i18n.withdrawal.rules.text11
			this.rules.money[3].message = this.i18n.withdrawal.rules.text14
			this.rules.money2[0].message = this.i18n.withdrawal.rules.text12

			this.rules.money2[2].message = this.i18n.withdrawal.rules.text14
			this.rules.money2[3].message = this.i18n.withdrawal.rules.text15
			this.rules.philippinesWithdrawalType.message = this.i18n.withdrawal.rules.text16
			this.rules.phone[0].message = this.i18n.withdrawal.rules.text17
			this.rules.phone[1].message = this.i18n.withdrawal.rules.text18
		},
		created() {
			this.getTAntwalletConfig('WITHDRAWAL_' + this.model.accountType + '_RATE')
		},
		// SBIN0123456
		methods: {
			// 验证提现地址
			validateAddress() {
				const address = this.model.hexAddress.trim()
				if (/^T[A-Za-z1-9]{33}$/.test(address)) {
					this.radiovalue1 = 'TRON'
					return
				}
				if (/^(EQ|UQ)[A-Za-z0-9_-]{46}$/.test(address)) {
					this.radiovalue1 = 'TON'
					return
				}
				return false
			},
			// 切换提现手续费
			sxfAddress() {
				const address = this.model.hexAddress.trim()
				// TRON address validation (starts with T and is 34 characters long)
				if (/^T[A-Za-z1-9]{33}$/.test(address)) {
					this.radiovalue1 = 'TRON'
					this.getTAntwalletConfig('WITHDRAWAL_' + this.model.accountType + '_RATE')
					return
				}
				// TON address validation (starts with EQ or UQ and is 48 characters long in total)
				if (/^(EQ|UQ)[A-Za-z0-9_-]{46}$/.test(address)) {
					this.radiovalue1 = 'TON'
					this.getTAntwalletConfig('WITHDRAWAL_USDT_TON_RATE')
					return
				}
				return false
			},
			// 提现方式切换回调
			groupChange(n) {
				this.addressType = n
				this.model.hexAddress = ''
				if (n == 'TON') {
					this.getTAntwalletConfig('WITHDRAWAL_USDT_TON_RATE')
				} else if (n == 'PHP') {
					this.model.philippinesWithdrawalType = 'gcash'
				} else {
					this.getTAntwalletConfig('WITHDRAWAL_' + this.model.accountType + '_RATE')
				}
			},
			// 卢比比索汇率
			exchangeInfo(e) {
				queryExchangeInfo(e).then(res => {
					if (res.data && res.data.code === 0) {
						this.exData = res.data.data
						this.rules.money2[1].message = this.i18n.withdrawal.rules.text13 + this.exData
							.minimumAmount + this
							.exchangeType
					}
				}).catch(errors => {
					this.$refs.uToast.error(errors.data.msg)
				});
			},
			// 返回按钮
			showTelegramBackButton() {
				if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.BackButton) {
					window.Telegram.WebApp.BackButton.show()
				}
			},
			// 个人用户信息
			getUserInfo() {
				getUserInfo().then(res => {
					this.isSetChargePsw = res.data.userInfo.setChargePsw
					this.getAccountInfo()
				}).catch(errors => {});
			},
			/**
			 * 获取用户账户详情
			 */
			getAccountInfo() {
				this.$nextTick(() => {
					getAccountInfo('').then(res => {
						if (res.data && res.data.code === 0) {
							const accountList = res.data.list

							this.exchangeType = res.data.exchangeType
							if (this.exchangeType == 'PHP') {
								this.radiolist1[2] = {
									name: 'PHP',
									disabled: false
								}
								this.exchangeInfo(2)
							} else
							if (this.exchangeType == 'INR') {
								this.radiolist1[2] = {
									name: 'INR',
									disabled: false
								}
								this.exchangeInfo(1)
							}
							// 假设有一个数字变量 num
							let num = res.data.exchangeMoney;
							// 向下取整并保留两位小数
							let result = Math.floor(num * 100) / 100;
							this.exchangeMoney = result
							this.totalMoney2 = (Math.floor(res.data.total_amount * 100) / 100).toFixed(2) +
								"  " + 'USDT' +
								"  ≈" + (this.exchangeType == 'PHP' ? '₱' : this.exchangeType ==
									'INR' ?
									'₹' : '$') + (Math.floor(res.data.exchangeMoney * 100) / 100).toFixed(
									2)
							accountList.forEach(item => {
								if (item.accountTypeInfo === 'USDT') {
									this.model.totalMoney = item.amount + "  " + item
										.accountTypeInfo + "  ≈$" + (Math.floor(item
											.exchangeMoney * 100) / 100).toFixed(2)

									this.usdttotalamount = item.amount
									this.tronMoney = Number(item.exchangeMoney).toFixed(2)
								}
								// 隐藏TRX
								// else {
								// 	this.trxMoney = item.amount + "  " + item.accountTypeInfo +
								// 		"   ≈¥" + Number(item.exchangeMoney).toFixed(2)
								// 	this.model.totalMoney = item.amount + "  " + item
								// 		.accountTypeInfo + "  ≈$" + Number(item
								// 			.exchangeMoney).toFixed(2)
								// 	this.trxtotalamount = item.amount
								// }
							})
						}
					}).catch(errors => {
						// this.$refs.uToast.error('我是提现')
					});
				})
			},
			// 印度到手
			changem2() {
				let num1 = Number(this.model.money2) * Number(this.exData
					.transactionFee) //手续费
				let num2 = Number(this.model.money2) - num1 //到手
				this.daoshou = num2.toFixed(2) || 0
			},
			// 手续费回调
			getTAntwalletConfig(pKey) {
				getTAntwalletConfig(`config/getTAntwalletConfig/${pKey}`).then(res => {
					if (res.data && res.data.code === 0) {
						let antwalletconfig = res.data.antwalletconfig
						this.model.transactionFee = antwalletconfig.pvalue
					}
				}).catch(errors => {
					this.$refs.uToast.error(errors.msg)
				});
			},
			phili(e) {
				console.log(e)
				this.model.philippinesWithdrawalType = e
				this.$forceUpdate();
			},
			// 全部按钮回调
			getwithdrawalMoney() {
				if (Number(this.model.money) > Number(this.model.transactionFee) && this.model.accountType ==
					'TRX') {
					this.model.withdrawalMoney = Number(this.model.money) - Number(this.model.transactionFee)
					this.model.withdrawalMoney = this.model.withdrawalMoney.toFixed(2)
				} else if (Number(this.model.money) > Number(this.model.transactionFee) && this.model
					.accountType ==
					'USDT') {
					this.model.withdrawalMoney = Number(this.model.money) - Number(this.model.transactionFee)
					this.model.withdrawalMoney = this.model.withdrawalMoney.toFixed(2)
				} else {
					this.model.withdrawalMoney = 0
				}
			},
			// 确认提现回调
			applyTronWithdrawMoney() {
				if (!this.radiovalue1) {
					this.$refs.uToast.error(this.i18n.withdrawal.title8)
					return
				}
				this.$refs.uForm.validate().then(res => {
					let tronWithdrawMoneyData = {
						hexAddress: this.model.hexAddress,
						accountType: this.model.accountType,
						money: this.model.money,
						blockchainType: this.radiovalue1 == 'TRON' ? 0 : 1
					}
					uni.showLoading({})
					applyTronWithdrawMoney(tronWithdrawMoneyData).then(res => {
						this.$refs.uToast.success(this.i18n.page.text10)
					}).catch(errors => {
						this.$refs.uToast.error(errors.data.message)
					}).finally(() => {
						uni.hideLoading()
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/index/index'
							});
						}, 2000); // 2000 毫秒，即 2 秒后执行操作
					})
				}).catch(errors => {
					// uni.$u.toast('校验失败')
				})
			},
			// 印度菲律宾提现接口
			ydflbTx(e) {
				uni.showLoading({})
				applyTronWithdrawMoney(e).then(res => {
					this.$refs.uToast.success(this.i18n.page.text10)
				}).catch(errors => {
					this.$refs.uToast.error(errors.data.message)
				}).finally(() => {
					uni.hideLoading()
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/index/index'
						});
					}, 2000); // 2000 毫秒，即 2 秒后执行操作
				})
			},
			// 印度或者菲律宾
			applyTronWithdrawMoney2() {
				var that = this
				if (!this.radiovalue1) {
					this.$refs.uToast.error(this.i18n.withdrawal.title8)
					return
				}
				// SBIN0123456
				this.$refs.uForm.validate().then(res => {
					if (this.radiovalue1 == 'INR') {
						var componentMoney = Number(this.model.money2) / Number(this.exData.exchangeRate)
						var tronWithdrawMoneyData = {
							bankName: this.model.bankName,
							bankCardName: this.model.bankCardName,
							bankCardAccount: this.model.bankCardAccount,
							blockchainType: 2,
							ifsc: this.model.ifsc,
							exchangeMoney: Number(this.model.money2),
							money: (Math.floor(componentMoney * 100) / 100).toFixed(2)
						}
						that.ydflbTx(tronWithdrawMoneyData)
					}
					if (this.radiovalue1 == 'PHP') {
						var componentMoney = Number(this.model.money2) / Number(this.exData.exchangeRate)
						var tronWithdrawMoneyData = {
							philippinesWithdrawalType: this.model.philippinesWithdrawalType == 'gcash' ? 1 :
							2, //快捷方式
							bankCardAccount: this.model.phone, //手机号
							blockchainType: 3, //提现方式
							money: (Math.floor(componentMoney * 100) / 100).toFixed(2)
						}
						that.ydflbTx(tronWithdrawMoneyData)
					}
				}).catch(errors => {})
			},
			// 提现金额回调
			getTotalMoney() {
				if (!this.allMoney) {
					this.allMoney = this.usdttotalamount
				}
				this.model.money = Number(this.allMoney).toFixed(2)
				this.$refs.uForm.validateField('money')
			},
			// 提现金额回调
			getTotalMoney2() {
				this.model.money2 = Number(this.exchangeMoney).toFixed(2)
				this.$forceUpdate();
			}
		},
	};
</script>

<style lang="less">
	@import '../../static/css/withdrawal/index.css';

	.page {
		/* height: calc(100vh); */
		background-color: #F5F5F5;
	}

	.tishi {
		font-size: 26rpx;
		color: #333333;
		margin-top: 10rpx;
	}

	.redpacket_money {
		width: 100%;
		border-radius: 20rpx;
		/* margin-top: 30rpx; */
		background-color: #fff;

		.inputSlot {
			display: flex;
			align-items: center;
		}
	}

	.lfbfs {
		width: 100%;
		background-color: #fff;
		padding: 32rpx 20rpx;
		box-sizing: border-box;
		border-radius: 20rpx;

		/deep/ .u-radio-group {
			display: flex;
			justify-content: flex-end;
		}
	}

	.xuanxiang {
		margin: 20rpx 0;
	}

	.duoxuan {
		width: 100%;


		.son {
			width: 100%;
			padding: 0rpx 30rpx;
			box-sizing: border-box;
			border: 1px solid #E5E5E5;
			border-radius: 30rpx;
			margin-top: 20rpx;
			background-color: #fff;

			.nian {
				margin-left: 30rpx;
				font-weight: 600;
				font-size: 32rpx;
				color: #333333;
			}



			.feiyong {
				width: 500rpx;
				height: ;
				font-weight: 600;
				font-size: 32rpx;
				color: #8E8E8E;
				text-align: right;


				.huilv {
					padding: 36rpx 0;

					image {
						width: 100rpx;
						height: 61rpx;
					}
				}
			}
		}
	}
</style>