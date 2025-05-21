import request from "@/utils/request.js";


/**
 * 申请提现
 */
export function applyTronWithdrawMoney(data) {
	return request.post('order/applyTronWithdrawMoney', JSON.stringify(data));
}
/**
 * 拼多多提现
 */
export function applyWithdrawal(data) {
	return request.post('pinduoduo/applyWithdrawal', JSON.stringify(data));
}
/**
 * 计算能量价格
 */
export function handlePurchasingPrice(energyType, rentTime) {
	return request.post(`energy_recharge/handlePurchasingPrice/${energyType}/${rentTime}`);
}
/**
 * 会员菜单
 */
export function handlePremiumType(type) {
	return request.post(`premium/handlePremiumType?exchangeRateType=${type}`);
}
/**
 * 查询用户
 */
export function premiumGetChat(userName) {
	return request.post(`premium/getChat/${userName}`);
}
/**
 * 能量下单
 */
export function handleUserBuyEnergy(data) {
	return request.post('energy_recharge/handleUserBuyEnergy', JSON.stringify(data));
}
/**
 * 会员下单
 */
export function handleUserBuyPremium(data) {
	// const customHeaders = {
	// 	chargepsw: chargePassword
	// };
	return request.post('order/handleUserBuyPremium', JSON.stringify(data));
}