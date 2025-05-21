class UserAgentService {
	constructor() {
		this.systemInfo = null
		this.telegramInfo = null
		this.userAgent = null

		this.init()
	}

	init() {
		// 获取系统信息
		this.systemInfo = this.getSystemInfo()
		// 获取 Telegram 信息
		this.telegramInfo = this.getTelegramInfo()
		// 构建 UserAgent
		this.buildUserAgent()
	}

	getSystemInfo() {
		try {
			return uni.getSystemInfoSync()
		} catch (error) {
			console.error('获取系统信息失败：', error)
			return null
		}
	}

	getTelegramInfo() {
		// @ts-ignore
		if (window.Telegram && window.Telegram.WebApp) {
			// @ts-ignore
			const webApp = window.Telegram.WebApp
			return {
				version: webApp.version,
				platform: webApp.platform,
				user: webApp.initDataUnsafe.user
			}
		}
		return null
	}

	buildUserAgent() {
		this.userAgent = {
			// 基本设备信息
			device: {
				platform: this.systemInfo?.platform,
				brand: this.systemInfo?.brand,
				model: this.systemInfo?.model,
				system: this.systemInfo?.system,
				language: this.systemInfo?.language
			},

			// 屏幕信息
			screen: {
				width: this.systemInfo?.screenWidth,
				height: this.systemInfo?.screenHeight,
				pixelRatio: this.systemInfo?.pixelRatio
			},

			// Telegram 信息
			telegram: this.telegramInfo,

			// 时间戳
			timestamp: Date.now()
		}
	}

	getUserAgent() {
		return this.userAgent
	}

	// 获取格式化的 UserAgent 字符串
	getUserAgentString() {
		const ua = this.userAgent
		if (!ua) return ''

		return `TGMiniApp/${ua.telegram?.version || 'unknown'} ` +
			`(${ua.device?.platform || 'unknown'}; ` +
			`${ua.device?.brand || ''} ${ua.device?.model || ''}; ` +
			`${ua.device?.system || ''})`
	}
}

export default new UserAgentService()