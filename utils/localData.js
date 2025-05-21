import {
	TOKENNAME
} from '@/config/app';
import {
	USER_INFO
} from '@/config/cache';
import store from "../store";
// 这里是取缓存
export function getTokenLocal() {
	// var token =
	// 	'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJ5YW95YW8iLCJ1c2VyVEdJRCI6IjczODI4MDU0MTEiLCJpcCI6IjE3Mi4xOC4xOTAuMTk4IiwidXNlck5hbWUiOiJnZXRfb2ZmX3dvcmsiLCJleHAiOjE3MjI5Mjk5MjJ9.twWg-DecORYqbnevm7J-z1bdVp-YNNVq_3aW7pC9cTc'
	// window.localStorage.setItem(TOKENNAME, token)
	// store.commit('user/tokenFun', token)
	// var token = store.state.user.token
	// console.log(token, 'token')
	// return store.state.user.token || ''
	// return uni.getStorageSync(TOKENNAME) || ''
	return window.localStorage.getItem(TOKENNAME) || ''
}

export function setTokenLocal(token) {
	if (token) {
		store.commit('user/tokenFun', token)
		window.localStorage.setItem(TOKENNAME, token)
	}
}

export function removeTokenLocal() {
	window.localStorage.removeItem(TOKENNAME)
}

export function getUserInfoLocal() {
	return JSON.parse(window.localStorage.getItem(USER_INFO)) || undefined
}


export function setUserInfoLocal(userInfo) {
	if (userInfo) {
		window.localStorage.setItem(USER_INFO, JSON.stringify(userInfo))
	}
}

export function removeUserInfoLocal() {
	window.localStorage.removeItem('USER_INFO')
}

export function getRedpacketIdLocal() {
	return window.localStorage.getItem('redpacketId') || ''
}


export function setRedpacketIdLocal(redpacketId) {
	if (redpacketId) {
		window.localStorage.setItem('redpacketId', redpacketId)
	}
}

export function removeRedpacketIdLocal() {
	window.localStorage.removeItem('redpacketId')
}


export function getGroupRedpacketIdLocal() {
	return window.localStorage.getItem('groupRedpacketId') || ''
}


export function setGroupRedpacketIdLocal(redpacketId) {
	if (redpacketId) {
		window.localStorage.setItem('groupRedpacketId', redpacketId)
	}
}
// 存收款id
export function setGroupTronTransIdLocal(tronTransId) {
	if (tronTransId) {
		window.localStorage.setItem('tronTransId', tronTransId)
	}
}
// 取收款id
export function getGroupTronTransIdLocal() {
	return window.localStorage.getItem('tronTransId') || ''
}
export function removeGroupRedpacketIdLocal() {
	window.localStorage.removeItem('groupRedpacketId')
}

export function getShareActivityIdLocal() {
	return window.localStorage.getItem('shareActivityId') || ''
}


export function setShareActivityIdLocal(shareActivityId) {
	if (shareActivityId) {
		window.localStorage.setItem('shareActivityId', shareActivityId)
	}
}

export function removeShareActivityIdLocal() {
	window.localStorage.removeItem('shareActivityId')
}

export function getShareUserIdLocal() {
	return window.localStorage.getItem('shareUserId') || ''
}


export function setShareUserIdLocal(shareUserId) {
	if (shareUserId) {
		window.localStorage.setItem('shareUserId', shareUserId)
	}
}

export function removeShareUserIdLocal() {
	window.localStorage.removeItem('shareUserId')
}

