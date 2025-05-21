import request from "@/utils/request.js";

/**
 * 注册
 * 
 */
export function registerUser(data) {
	return request.post('user/registerUser', JSON.stringify(data));
}

/**
 * 登录
 * 
 */
export function loginUser(data) {
	return request.post('auth/doLogin', JSON.stringify(data), {
		noAuth: true
	});
}

/**
 * 修改用户信息
 * 
 */
export function handleUpdateUserInfo(data) {
	return request.post('auth/handleUpdateUserInfo', JSON.stringify(data), {
		noAuth: true
	});
}
/**
 * 修改语言
 * 
 */
export function handleEditUserLanguage() {
	return request.post('user/handleEditUserLanguage');
}

/**
 * 获取邀请用户的信息
 */
export function getUserWithdrawalTjList() {
	return request.post('userWithdrawalTj/list');
}

/**
 * 获取账户绑定列表
 * 
 */
export function getBindOtherUserList() {
	return request.post('bindotheruser/list');
}

/**
 * 绑定备用账户
 * 
 */
export function saveBindOtherUser(data) {
	return request.post('bindotheruser/save', data);
}

/**
 * 删除备用账户
 * 
 */
export function removeBindOtherUser(data) {
	return request.post('bindotheruser/delete', data);
}

// 加密
export function encryption(data) {
	return request.post('user/resetChargePsw', data);
}

// 是否为新用户
export function isNewUser(userId) {
	return request.post(`robot/isNewUser/${userId}`);
}

//异常处理
export function insertLog(data) {
	return request.post(`errorLog/insertLog`, data);
}