// mixins/trackerMixin.js
import pageTracker from '@/utils/tracker.js'

export default {
	onShow() {
		// 获取当前页面路径
		const pages = getCurrentPages()
		const currentPage = pages[pages.length - 1]
		const prevPage = pages[pages.length - 2]

		// 记录页面访问
		// pageTracker.trackPageView({
		// 	current: currentPage.route,
		// 	prev: prevPage ? prevPage.route : '',
		// 	params: currentPage.options
		// })
	},

	onHide() {
		// 页面隐藏时也记录duration
		const records = pageTracker.getPageRecords()
		console.log('页面访问记录：', records)
		// if (this.isAppExit()) {
		// 	// this.uploadPageRecords()
		// 	const records = pageTracker.getPageRecords()
		// 	console.log('页面访问记录：', records)
		// }
	},

	methods: {
		// 判断是否退出应用
		isAppExit() {
			const pages = getCurrentPages()
			// 当只剩一个页面且要隐藏时,可能是退出应用
			return pages.length === 1
		},

		// 上传页面记录
		// async uploadPageRecords() {
		//   try {
		//     const records = pageTracker.getPageRecords()
		//     console.log('页面访问记录：', records)

		//     // 上传到服务器
		//     const res = await uni.request({
		//       url: 'your-api/page-tracking',
		//       method: 'POST',
		//       data: records
		//     })

		//     console.log('上传成功', res)

		//   } catch(error) {
		//     console.error('上传页面记录失败:', error)
		//     // 可以存储到本地,下次重试
		//     uni.setStorageSync('pendingPageRecords', records)
		//   }
		// }
	}
}