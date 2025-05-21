<template>
	<u-form-item prop="hexAddress" ref="item1">
		<u-input v-model="model.hexAddress" border="none" @change="validateAddress" @input="validateAddress"
			maxlength="48" :placeholder="i18n.withdrawal.input"></u-input>
	</u-form-item>
</template>

<script>
	export default {
		data() {
			return {
				model: {
					hexAddress: ''
				},
				addressType: null,
				addressTypeMessage: ''
			}
		},
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		methods: {
			validateAddress() {
				const address = this.model.hexAddress.trim()

				// TRON address validation (starts with T and is 34 characters long)
				if (/^T[A-Za-z1-9]{33}$/.test(address)) {
					this.addressType = 'TRON'
					this.$emit('address-validated', {
						type: 'TRON',
						value: this.model.hexAddress
					})
					return
				}

				// TON address validation (starts with EQ or UQ and is 48 characters long in total)
				if (/^(EQ|UQ)[A-Za-z0-9_-]{46}$/.test(address)) {
					this.addressType = 'TON'
					this.$emit('address-validated', {
						type: 'TON',
						value: this.model.hexAddress
					})
					return
				}
				this.$emit('address-validated', {
					type: '',
					value: this.model.hexAddress
				})
				// Invalid address
				// this.addressType = 'invalid'
				// this.addressTypeMessage = 'Invalid address format'
			}
		}
	}
</script>