import {
	HTTP_REQUEST_URL,
	HEADER,
	TOKENNAME,
	HEADERPARAMS
} from '@/config/app';

import {
	getTokenLocal,
	setTokenLocal
} from "@/utils/localData.js";
import {
	insertLog
} from '@/api/user.js';
import {
	tips
} from "@/utils/util.js";
import store from "../store";
// 取Cookie
function getCookie(name) {
	const nameEQ = name + "=";
	const ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}
/**
 * 发送请求
 */
function baseRequest(url, method, data, {
	noAuth = false,
	customHeaders = {} // 添加 customHeaders 参数
}, params) {
	let Url = HTTP_REQUEST_URL,
		header = HEADER
	if (params != undefined) {
		header = HEADERPARAMS;
	}
	const token = getTokenLocal();

	// data.data = getCookie('_ga')
	const rechargeAmount = store.state.rechargeAmount;
	// const token = uni.getStorageSync(TOKENNAME);
	// console.log(token,'token')
	if (!noAuth) {
		//登录过期自动登录
		if (!token) {
			return new Promise((reslove, reject) => {
				reject("未登录,请重新从TG进入~~")
				tips("未登录,请重新从TG进入~~");
			});
		}
	}

	if (token) header['token'] = token;
	header['lang'] = uni.getStorageSync('i18n') || 'en-US';
	header = {
		...header,
		...customHeaders
	};
	return new Promise((reslove, reject) => {
		uni.request({
			url: Url + '/api/front/' + url,
			method: method || 'GET',
			header: header,
			data: data || {},
			success: (res) => {
				if (res.data.code == 0) {
					reslove(res);
				} else if (res.data.code == 401 || res.data.code == 4002) {
					reject(res.data || "当前登录信息已失效，请重新从TG登录或者从我的登录进行登录");
					tips(res.data || "当前登录信息已失效，请重新从TG登录或者从我的登录进行登录");

				} else if (res.data.code == 429) {
					reject(res.data);
				} else if (res.data.code == 502) {
					reject(res.data || '系统正在重启');
				} else if (res.data.code == 706) {
					reslove(res);
				} else
					reject(res || '系统错误');
				tips(res || '系统错误');
				// insertLog({
				// 	interfaceUrl: Url + '/api/front/' + url,
				// 	parms: data,
				// 	exceptionMsg: res.data.msg,
				// 	createTime: new Date()
				// }).then(res => {

				// })
			},
			fail: (msg) => {
				return new Promise((reslove, reject) => {
					reject(msg)
					tips(msg);
				});
			}
		})
	});
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data, opt = {}, params) => baseRequest(api, method, data, opt, params);
});

export default request;