<template>
	<view class="tron-address-input">
		<input type="text" :value="value" @input="onInput" placeholder="请输入Tron地址"
			:class="{ 'invalid': !isValid && value.length > 0 }" />
		<text v-if="!isValid && value.length > 0" class="error-message">
			请输入有效的Tron地址 (以T开头，34个字符)
		</text>
	</view>
</template>

<script>
	export default {
		name: 'TronAddressInput',
		props: {
			value: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				isValid: true
			}
		},
		methods: {
			onInput(event) {
				const inputValue = event.target.value;
				// 只允许输入字母和数字
				const filteredValue = inputValue.replace(/[^a-zA-Z0-9]/g, '');

				// 确保地址以 'T' 开头
				const formattedValue = filteredValue.startsWith('T') ?
					filteredValue :
					'T' + filteredValue.slice(1);

				// 限制长度为 34 个字符
				const truncatedValue = formattedValue.slice(0, 34);

				// 验证完整的地址格式
				this.isValid = this.validateTronAddress(truncatedValue);

				// 发出更新后的值
				this.$emit('input', truncatedValue);
			},
			validateTronAddress(address) {
				const tronAddressRegex = /^T[A-Za-z0-9]{33}$/;
				return tronAddressRegex.test(address);
			}
		}
	}
</script>

<style scoped>
	.tron-address-input {
		margin-bottom: 10px;
	}

	input {
		width: 100%;
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 4px;
		color: rgb(48, 49, 51);
		font-size: 15px;
		text-align: left;
	}

	input.invalid {
		border-color: #ff4d4f;
	}

	.error-message {
		color: #ff4d4f;
		font-size: 12px;
		margin-top: 5px;
	}
</style>