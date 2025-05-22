import request from "@/utils/request.js";

export function addBot() {
	return request.post('conditions/addBot');
}
/**
 * 群组或频道列表
 * 
 */
export function getGroupsChannelName(url) {
	return request.post(url);
}
/**
 * 发起收款
 * 
 */
export function createOTronTrans(data) {
	return request.post('order/createOTronTrans', data);
}
/**
 * 获取收款信息
 * 
 */
export function getTronTransAccount(code) {
	return request.post(`order/getTronTransAccount?tronTransId=${code}`);
}
/**
 * 付款列表
 * 
 */
export function tPaymentRecords(data) {
	return request.post(`tPaymentRecords/list`, data);
}
/**
 * 收款历史列表
 * 
 */
export function tronTransList() {
	return request.post(`tronTrans/list`);
}
/**
 * 停止收款
 * 
 */
export function handleStopPayment(id) {
	return request.post(`tronTrans/handleStopPayment?id=${id}`);
}
/**
 * 收款申诉
 * 
 */
export function createComplaintRecord(data) {
	return request.post(`complaint/createComplaintRecord`, data);
}

/**
 * 收款付款
 * 
 */
export function handleUserPayment(code, userId, chargePassword) {
	const customHeaders = {
		chargepsw: chargePassword
	};
	return request.post(`order/handleUserPayment?tronTransId=${code}&shareUserId=${userId}`, {}, {
		customHeaders
	});
}