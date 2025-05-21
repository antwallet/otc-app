import Vue from 'vue'
import App from './App'
import store from './store'
import Cache from './utils/cache'
import util from 'utils/util'
import configs from './config/app.js'
import AES from '@/js_sdk/ar-aes/ar-aes.js'
import lineProgress from './uview-ui/libs/config/props/lineProgress'
import VueI18n from 'vue-i18n'
import LangEn from './static/lang/en'
import LangChs from './static/lang/zhCHS'
import LangRu from './static/lang/ru'
import LangTl from './static/lang/tl'
import 'animate.css';
import trackingMixin from 'utils/trackingMixin'
import countUp from '@/components/countUp.vue'

// SDK加载函数
// function loadOpenAdSDK() {
// 	return new Promise((resolve) => {
// 		// 检查SDK是否已完全初始化
// 		const checkSDKReady = () => {
// 			if (window.openADJsSDK && window.openADJsSDK.interactive) {
// 				console.log('SDK完全初始化成功')
// 				resolve(true)
// 				return
// 			}
// 			setTimeout(checkSDKReady, 100) // 每100ms检查一次
// 		}

// 		// 如果SDK已存在，检查是否完全初始化
// 		if (window.openADJsSDK) {
// 			checkSDKReady()
// 			return
// 		}

// 		const script = document.createElement('script')
// 		script.name = 'openADJsSDK'
// 		script.type = 'text/javascript'
// 		script.src = 'https://protocol.openad.network/sdkloader.js'
// 		script.setAttribute('version', '3.0')

// 		script.onload = () => {
// 			console.log('SDK脚本加载成功，等待初始化...')
// 			checkSDKReady()
// 		}

// 		script.onerror = () => {
// 			console.error('SDK脚本加载失败')
// 			resolve(false)
// 		}

// 		document.head.appendChild(script)
// 	})
// }
function loadOpenAdSDK() {
	return new Promise((resolve) => {
		// 检查SDK是否已完全初始化
		const checkSDKReady = () => {
			if (window.openADJsSDK && window.openADJsSDK.interactive) {
				console.log('SDK完全初始化成功')
				resolve(true)
				return
			}
			setTimeout(checkSDKReady, 100) // 每100ms检查一次
		}

		// 如果SDK已存在，检查是否完全初始化
		if (window.openADJsSDK) {
			checkSDKReady()
			return
		}

		const script = document.createElement('script')
		script.name = 'openADJsSDK'
		script.type = 'text/javascript'
		script.src = 'https://protocol.openad.network/sdkloader.js'
		script.setAttribute('version', '3.0')

		script.onload = () => {
			console.log('SDK脚本加载成功，等待初始化...')
			checkSDKReady()
		}

		script.onerror = () => {
			console.error('SDK脚本加载失败')
			resolve(false)
		}

		document.head.appendChild(script)
	})
}

// 将SDK加载方法挂载到Vue原型上
Vue.prototype.$loadOpenAdSDK = loadOpenAdSDK

Vue.component('countup', countUp)
Vue.mixin(trackingMixin)

Vue.prototype.$isLaunched = false
Vue.use(VueI18n)
const i18n = new VueI18n({
	locale: 'en-US',
	messages: {
		'en-US': LangEn,
		'zh-CN': LangChs,
		'ru-RU': LangRu,
		'tl-Ta': LangTl,
	}
})



import {
	searchDictionary,
	dictionary
} from "@/utils/currency"


Vue.prototype.AES = AES.AES
Vue.prototype.$util = util;
Vue.prototype.$config = configs;
Vue.prototype.$Cache = Cache;
Vue.prototype.$eventHub = new Vue();
Vue.config.productionTip = false
Vue.prototype.searchDictionary = searchDictionary
Vue.prototype.dictionary = dictionary
Vue.prototype._i18n = i18n
// #ifdef H5
import {
	parseQuery
} from "./utils";
import {
	SPREAD
} from './config/cache';
let cookieName = "VCONSOLE",
	query = parseQuery(),
	urlSpread = query["spread"],
	vconsole = query[cookieName.toLowerCase()],
	md5Crmeb = "b14d1e9baeced9bb7525ab19ee35f2d2", //CRMEB MD5 加密开启vconsole模式
	md5UnCrmeb = "3dca2162c4e101b7656793a1af20295c"; //UN_CREMB MD5 加密关闭vconsole模式

if (urlSpread !== undefined) {
	var spread = Cache.get(SPREAD);
	urlSpread = parseInt(urlSpread);
	if (!Number.isNaN(urlSpread) && spread !== urlSpread) {
		Cache.set("spread", urlSpread || 0);
	} else if (spread === 0 || typeof spread !== "number") {
		Cache.set("spread", urlSpread || 0);
	}
}

if (vconsole !== undefined) {
	if (vconsole === md5UnCrmeb && Cache.has(cookieName))
		Cache.clear(cookieName);
} else vconsole = Cache.get(cookieName);

import VConsole from './components/vconsole.min.js'

if (vconsole !== undefined && vconsole === md5Crmeb) {
	Cache.set(cookieName, md5Crmeb, 3600);
	let vConsole = new VConsole();
}

import uView from 'uview-ui';
Vue.use(uView);

import 'animate.css'

// #endif


App.mpType = 'app'


// const app = new Vue({
// 	...App,
// 	i18n,
// 	store,
// 	Cache
// })
// app.$mount();
const app = new Vue({
	...App,
	i18n,
	store,
	Cache
})

loadOpenAdSDK().then(sdkLoaded => {
	console.log('SDK加载状态:', sdkLoaded)
	uni.setStorageSync('sdkLoaded', 'SDK成功')
}).catch(error => {
	console.error('SDK加载出错:', error)
	uni.setStorageSync('sdkLoaded', 'SDK失败')
})

app.$mount()