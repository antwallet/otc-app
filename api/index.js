import request from "@/utils/request.js";
/**
 * 获取用户信息
 * 
 */

export function getUserInfo(url) {
	var sign = uni.getStorageSync('sign')
	return request.get(
		`auth/getUserInfo?isGetAvatar=false&isPremium=${sign.is_premium || false}&deviceModel=${sign.deviceModel}&registrationDate=${sign.registrationDate}`
	);
}
/**
 * 获取用户信息头像
 * 
 */
export function getUserInfoAvatar(data) {
	return request.post('auth/getUserInfoAvatar', data);
}
/**
 * 判断是否满足拼多多条件
 * 
 */
export function queryPermission() {
	return request.get('pinduoduo/queryPermission');
}
/**
 * 拼多多活动详情
 * 
 */
export function queryUserInfo() {
	return request.get('pinduoduo/queryUserInfo');
}
/**
 * 记录步数
 * 
 */
export function recordTaskInfo(data) {
	return request.post('pinduoduo/recordTaskInfo', data);
}

/**
 * 拼多多资金明细
 * 
 */
export function queryAccountInfo() {
	return request.get('pinduoduo/queryAccountInfo', );
}

/**
 * 拼多多邀请好友列表
 * 
 */
export function inviteUserList() {
	return request.get('pinduoduo/inviteUserList', );
}

/**
 * 拼多多提现选择记录
 * 
 */
export function updateIsFullWithdrawal(data) {
	return request.post('pinduoduo/updateIsFullWithdrawal', data);
}


/**
 * 拼多多邀请链接
 * 
 */
export function getShareLink() {
	return request.get('pinduoduo/getShareLink', );
}
/**
 * 拼多多申请提现
 * 
 */
export function applyWithdrawal() {
	return request.get('pinduoduo/applyWithdrawal', );
}


/**
 * 不再弹出
 */
export function setPop(data) {
	return request.post('user/updateShowPanel', data);
}

/*
 * 发送红包时获取用户信息
 */
export function invitedUser(url) {
	return request.get(url);
}


/**
 * 获取用户账户信息和总金额
 * 
 */

export function getAccountInfo(type) {
	return request.post(`taccount/list?exchangeRateType=${type}`);
}

/**
 * 获取用户账户交易信息
 * 
 */
export function getAccountTradeInfo(data) {
	return request.post('taccounttrade/list', data);
}
/**
 * 获取用户能量交易记录列表
 * 
 */
export function energyList(url) {
	return request.get(url);
}
/**
 * 获取用户会员交易记录列表
 * 
 */
export function premiumList(url) {
	return request.get(url);
}
/**
 * 流水分类列表
 * 
 */
export function displayTransactionTypes(url) {
	return request.post('taccounttrade/displayTransactionTypes');
}
/**
 * 删除群组频道
 * 
 */
export function removeTGroupsChannelName(chatId, status) {
	return request.post(`tgroups_channel_name/removeTGroupsChannelName?chatId=${chatId}&status=${status}`);
}
/**
 * 商家申请
 * 
 */
export function cooperationApplication(data) {
	return request.post(`redpacket_manage/cooperationApplication`, data);
}
/**
 * 付款分享
 * 
 */
export function handleUserShareRecord(data) {
	return request.post(`tronTrans/handleUserShareRecord`, data);
}
/**
 * 卢比，比索手续费
 * 
 */
export function queryExchangeInfo(type) {
	return request.post(`thirdPayment/queryExchangeInfo?exchangeType=${type}`);
}