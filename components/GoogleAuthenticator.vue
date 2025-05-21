<template>
  <view class="google-authenticator">
    <view class="input-container">
      <input 
        v-for="(digit, index) in digits" 
        :key="index"
        v-model="digits[index]"
        type="tel"
        maxlength="1"
        @input="onInput(index)"
        @keydown.delete="onDelete(index)"
        :ref="`digit${index}`"
      />
    </view>
    <button class="verify-button" @click="verifyCode" :disabled="!isComplete">验证</button>
    <view class="message" :class="{ 'success': isSuccess, 'error': isError }">
      {{ message }}
    </view>
  </view>
</template>

<script>
export default {
  name: 'GoogleAuthenticator',
  data() {
    return {
      digits: ['', '', '', '', '', ''],
      message: '',
      isSuccess: false,
      isError: false
    }
  },
  computed: {
    isComplete() {
      return this.digits.every(digit => digit !== '')
    },
    code() {
      return this.digits.join('')
    }
  },
  methods: {
    onInput(index) {
      if (this.digits[index].length === 1 && index < 5) {
        this.$nextTick(() => {
          this.$refs[`digit${index + 1}`][0].focus()
        })
      }
    },
    onDelete(index) {
      if (this.digits[index] === '' && index > 0) {
        this.$nextTick(() => {
          this.$refs[`digit${index - 1}`][0].focus()
        })
      }
    },
    verifyCode() {
      // 这里应该调用后端API进行实际验证
      // 为了演示，我们使用一个模拟的验证过程
      this.message = ''
      this.isSuccess = false
      this.isError = false

      // 模拟API调用
      setTimeout(() => {
        if (this.code === '123456') { // 假设正确的代码是123456
          this.message = '验证成功'
          this.isSuccess = true
          this.$emit('verified', true)
        } else {
          this.message = '验证失败，请重试'
          this.isError = true
          this.$emit('verified', false)
        }
      }, 1000)
    },
    resetCode() {
      this.digits = ['', '', '', '', '', '']
      this.message = ''
      this.isSuccess = false
      this.isError = false
    }
  }
}
</script>

<style scoped>
.google-authenticator {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  text-align: center;
}
.input-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
input {
  width: 40px;
  height: 40px;
  font-size: 24px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.verify-button {
  width: 100%;
  height: 40px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
}
.verify-button:disabled {
  background-color: #ccc;
}
.message {
  margin-top: 10px;
  font-size: 14px;
}
.success {
  color: #52c41a;
}
.error {
  color: #f5222d;
}
</style>