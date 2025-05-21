// 创建trackInfo对象
const createTrackInfo = () => ({
	// 基础信息
	timestamp: Date.now(),
	sessionId: '',
	userAgent: '',
	screenResolution: '',

	// 用户行为
	pageStayTime: 0,
})


// 获取网络速度
const getNetworkSpeed = () => {
	const startTime = Date.now()
	// 使用小文件测速(建议使用自己的文件地址)
	const testUrl = 'http://www.w3.org/TR/html4/loose.dtd'

	const result = uni.downloadFile({
		url: testUrl,
	})
	const endTime = Date.now()
	const duration = endTime - startTime // 耗时(ms)
	// 获取下载文件大小(字节)
	const bytes = 45434

	// 计算速度(kb/s)
	const speed = (bytes / 1024 / 1024) / (duration / 1000)
	var sudu = {
		speed: speed.toFixed(2),
		unit: 'mb/s',
		timestamp: endTime
	}
	return speed.toFixed(2) + 'mb/s'
}

// 安全跟踪器类
class SecurityTracker {
	constructor() {
		this.trackInfo = createTrackInfo()
		this.isInitialized = false
		// 在构造函数中绑定方法
	}

	// 初始化跟踪信息
	initTrackInfo() {
		if (this.isInitialized) return
		getNetworkSpeed()
		uni.getNetworkType({
			success: (res) => {
				this.trackInfo.networkType = res.networkType // wifi/2g/3g/4g/5g/unknown/none
			},
			fail: () => {
				resolve({
					type: 'unknown',
					timestamp: Date.now()
				})
			}
		})
		this.trackInfo = {
			...this.trackInfo,
			timestamp: Date.now(),
			userAgent: navigator.userAgent,
			screenResolution: `${window.screen.width}x${window.screen.height}`, //获取用户的设备分辨率
			speed: getNetworkSpeed(),
			// TG信息
			tg_user_id: window.Telegram?.WebApp?.initDataUnsafe?.user?.id || '',
			tg_auth_date: window.Telegram?.WebApp?.initDataUnsafe?.auth_date || '',
			tg_hash: window.Telegram?.WebApp?.initDataUnsafe?.hash || ''
		}
		console.log(this.trackInfo)
		this.isInitialized = true
		return this.trackInfo
	}
	// 上报跟踪数据
	reportTrackInfo() {
		if (!this.trackInfo) return

		// 计算页面停留时间
		this.trackInfo.pageStayTime = Date.now() - this.trackInfo.timestamp

		// 上报数据
		// uni.request({
		// 	url: 'your-tracking-api',
		// 	method: 'POST',
		// 	data: this.trackInfo,
		// 	success: (res) => {
		// 		console.log('Track info reported successfully')
		// 	},
		// 	fail: (err) => {
		// 		console.error('Failed to report track info:', err)
		// 	}
		// })
	}
}

// 创建单例实例
const securityTracker = new SecurityTracker()

export default securityTracker