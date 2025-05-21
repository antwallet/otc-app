<template>
	<view class="page flex-col">
		<view class="block_1 flex-col">
			<u-form labelPosition="left" :model="model" ref="uForm">
				<view class="group_1 flex-col">
					<view class="box_3 flex-col">
						<view class="box_4 flex-row">
							<view class="image-text_1">
								<u-form-item prop="accountType" @click="showAccountType = true; hideKeyboard();"
									ref="item1" label="选择收款币种" borderBottom>
									<u-input v-model="model.accountType" disabled disabledColor="#ffffff"
										inputAlign="right" border="none"></u-input>
									<u-icon slot="right" name="arrow-down"></u-icon>
								</u-form-item>
							</view>
						</view>
						<view class="text-wrapper_1">
							<u-form-item prop="money" ref="item1">
								<u-input v-model="model.money" type="number" border="none" placeholder="输入收款金额"
									inputAlign="left"></u-input>
							</u-form-item>
						</view>
					</view>
					<view class="text_13">{{model.money}}&nbsp;{{model.accountType}}</view>
					<view class="text-wrapper_2 flex-col" @click='createOTronTrans()'>
						<text class="text_5">发送收款</text>
					</view>
					<text class="text_6">
						收款请求不会自动取消，如有变动，请即时与对方沟通
					</text>
				</view>
			</u-form>
			<u-action-sheet :show="showAccountType" :actions="accountTypeActions" title="选择收款币种"
				@close="showAccountType = false" @select="accountTypeSelect">
			</u-action-sheet>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import {
		createOTronTrans
	} from '@/api/collection.js';
	export default {
		data() {
			return {
				model: {
					accountType: 'TRX',
					money: '',
				},
				showAccountType: false,
				rules: {
					accountType: [{
						type: 'string',
						required: true,
						message: '选择收款币种',
						trigger: ['blur', 'change']
					}, ],
					money: {
						type: 'string',
						required: true,
						message: '请输入收款金额',
						trigger: ['blur', 'change']
					},
				},
				accountTypeActions: [{
						id: 0,
						name: 'TRX'
					},
					{
						id: 1,
						name: 'USDT'
					}
				],
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad() {
			// 页面加载时设置初始时间，并启动定时器  
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
		created() {},
		methods: {
			// 点击actions回调
			accountTypeSelect(e) {
				this.model.accountType = e.name
				this.$refs.uForm.validateField('accountType')
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			/**
			 * 创建收款
			 */
			createOTronTrans: function() {
				this.$refs.uForm.validate().then(res => {
					if (res) {
						let accountType = this.model.accountType
						let money = this.model.money
						createOTronTrans({
							accountType: accountType,
							money: money,
						}).then(result => {
							uni.$u.toast('创建收款成功')
						}).catch(errors => {
							this.$refs.uToast.error(errors.msg)
						})
					} else {
						uni.$u.toast('校验失败')
					}
				}).catch(errors => {})
			},
		},
	};
</script>

<style>
	@import '../../static/css/collection/index.css';
	@import '../../static/css/common.css';

	.block_1 {
		height: 100vh;
	}
</style>