import Vue from "vue";
import Vuex from "vuex";
import user from './modules/user'
import getters from "./getters";

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
	state: {
		isAppReady: false, // 用来表示app.vue中的异步操作是否完成  
		someFlag: false,
		rechargeAmount: 'en-US', //控制气泡菜单显隐
		password: false //第一次输入密码
	},
	modules: {
		user
	},
	mutations: {
		setAppReady(state, aa) {
			console.log(state, aa, 'state')
			if (aa == false) {
				state.isAppReady = false;
			} else {
				state.isAppReady = true;
			}
			console.log(state.isAppReady)
		},
		setFlag(state, value) {
			state.someFlag = value;
		},
		// 全局接口语言标识
		setRechargeAmount(state, amount) {
			state.rechargeAmount = amount;
		},
		// 监控第一次设置密码
		setPassword(state, amount) {
			state.password = amount;
		},
	},
	actions: {
		// 可以定义异步操作来改变全局变量
		changeRechargeAmount({
			commit
		}, amount) {
			commit('setPassword', amount);
		},
		accRechargeAmount({
			commit
		}, amount) {
			commit('setRechargeAmount', amount);
		},
	},
	getters,
	strict: debug
});