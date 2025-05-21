// tracker.js
class PageTracker {
 constructor() {
   this.pageRecords = []
   this.currentPage = null
   this.startTime = Date.now()
 }

 // 记录页面访问
 // trackPageView(pageData) {
 //   const timestamp = Date.now()
   
 //   // 如果有上一页面,计算停留时间
 //   if(this.currentPage) {
 //     const duration = timestamp - this.currentPage.enterTime
 //     this.currentPage.duration = duration
 //     this.pageRecords.push(this.currentPage)
 //   }
   
 //   // 记录当前页面
 //   this.currentPage = {
 //     current: pageData.current,
 //     prev: pageData.prev,
 //     enterTime: timestamp,
 //     params: pageData.params,
 //     duration: 0
 //   }
 // }

 // 获取页面访问记录
 getPageRecords() {
   const records = [...this.pageRecords]
   
   // 添加最后一个页面的记录
   if(this.currentPage) {
     const duration = Date.now() - this.currentPage.enterTime
     this.currentPage.duration = duration
     records.push(this.currentPage)
   }
   
   return {
     userId: uni.getStorageSync('userId') || '',
     startTime: this.startTime,
     endTime: Date.now(),
     totalDuration: Date.now() - this.startTime,
     pageRecords: records.map(record => ({
       page: record.current,
       prevPage: record.prev,
       duration: record.duration,
       params: record.params,
       enterTime: record.enterTime
     }))
   }
 }
}

// 创建单例
const pageTracker = new PageTracker()
export default pageTracker