/**
 * opt  object | string
 * to_url object | string
 * 例:
 * this.Tips('/pages/test/test'); 跳转不提示
 * this.Tips({title:'提示'},'/pages/test/test'); 提示并跳转
 * this.Tips({title:'提示'},{tab:1,url:'/pages/index/index'}); 提示并跳转值table上
 * tab=1 一定时间后跳转至 table上
 * tab=2 一定时间后跳转至非 table上
 * tab=3 一定时间后返回上页面
 * tab=4 关闭所有页面跳转至非table上
 * tab=5 关闭当前页面跳转至table上
 */
import CryptoJS from 'crypto-js'; // 导入加密库

export function tips(opt, to_url) {
	if (typeof opt == 'string') {
		to_url = opt;
		opt = {};
	}
	let title = opt.title || '',
		icon = opt.icon || 'none',
		endtime = opt.endtime || 2000,
		success = opt.success;
	if (title) uni.showToast({
		title: title,
		icon: icon,
		duration: endtime,
		success
	})
	if (to_url != undefined) {
		if (typeof to_url == 'object') {
			let tab = to_url.tab || 1,
				url = to_url.url || '';
			switch (tab) {
				case 1:
					//一定时间后跳转至 table
					setTimeout(function() {
						uni.navigateTo({
							url: url
						})
					}, endtime);
					break;
				case 2:
					//跳转至非table页面
					setTimeout(function() {
						uni.navigateTo({
							url: url,
						})
					}, endtime);
					break;
				case 3:
					//返回上页面
					setTimeout(function() {
						// #ifndef H5
						uni.navigateBack({
							delta: parseInt(url),
						})
						// #endif
						// #ifdef H5
						history.back();
						// #endif
					}, endtime);
					break;
				case 4:
					//关闭当前所有页面跳转至非table页面
					setTimeout(function() {
						uni.reLaunch({
							url: url,
						})
					}, endtime);
					break;
				case 5:
					//关闭当前页面跳转至非table页面
					setTimeout(function() {
						uni.redirectTo({
							url: url,
						})
					}, endtime);
					break;
			}

		} else if (typeof to_url == 'function') {
			setTimeout(function() {
				to_url && to_url();
			}, endtime);
		} else {
			//没有提示时跳转不延迟
			setTimeout(function() {
				uni.navigateTo({
					url: to_url,
				})
			}, title ? endtime : 0);
		}
	}
}
// 工具
// 从url中查询到指定名称的参数值
export function getUrlParam(name, defaultValue) {
	var query = window.location.search.substring(1)
	var vars = query.split('&')
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=')
		if (pair[0] === name) {
			return pair[1]
		}
	}
	return defaultValue === undefined ? null : defaultValue
}

export function aseDecrypt(content) {
	var key = CryptoJS.enc.Utf8.parse('94E113C6A858CD39');
	var encrypted = CryptoJS.enc.Hex.parse(content);
	var encryptedBase64 = CryptoJS.enc.Base64.stringify(encrypted);
	var decrypted = CryptoJS.AES.decrypt(encryptedBase64, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	var decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
	return decryptedStr
}
// 测试

export function antwalletbot() {
	return 'https://t.me/grab_redpacket_bot' //测试机器人
}
// 复制链接
export function antwalletbotCopy() {
	return 'https://t.me/grab_redpacket_bot/redpacket_manage' //测试
}
// 频道
export function antwalletgroup() {
	return 'https://t.me/aimitbotchannel' //测试
}

export function renjiCode() {
	return '0x4AAAAAAAw9isaNm2iqjMlv' //测试人机验证
}
// 商家版
export function shangjia() {
	return 'https://dev.redpacket.top/cooperationApplication/form-validation.html?token=' //测试
}

// 正式

// export function antwalletbot() {
// 	return 'https://t.me/packetgift_bot' //正式机器人
// }

// export function antwalletbotCopy() {
// 	return 'https://t.me/packetgift_bot/hongbao' //正式复制链接
// }

// export function antwalletgroup() {
// 	return 'https://t.me/packetgift_group' //正式频道
// }

// export function renjiCode() {
// 	return '0x4AAAAAAAgCBFg_H5tzq_nD' //正式人机验证
// }

// export function shangjia() {
// 	return 'https://redpacket.top/cooperationApplication/form-validation.html?token=' //正式商家版
// }



// 客服
export function packetgiftbot() {
	// return 'https://t.me/packetgiftbot' //客服
	return 'https://t.me/Yuuki_cc' //客服
}