# tq-encrypt
### 开发文档
[UTS 语法](https://uniapp.dcloud.net.cn/tutorial/syntax-uts.html)
[UTS API插件](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html)
[UTS 组件插件](https://uniapp.dcloud.net.cn/plugin/uts-component.html)
[Hello UTS](https://gitcode.net/dcloud/hello-uts)

> **注意：**
> 
> 如果需要支持web，本插件依赖第三方插件miniprogram-sm-crypto和crypto-js，你需要安装它。可以到插件的目录下安装`npm install`，也可以全局目录下安装`npm install miniprogram-sm-crypto crypto-js --save`，只支持Android、iOS不需要安装

### 使用说明

|名称|描述|参数|说明|支持平台|
|:--|:--|:--|:--|:--|
|md5Sync|md5加密|str:string|返回值：string  加密出来的字母是大写|Android、Web、iOS|
|base64EncodeSync|base64加密|str:string|返回值：string|Android、Web、iOS|
|base64DecodeSync|base64解密|str:string|返回值：string|Android、Web、iOS|
|sm4ECBEncryptSync|sm4 ECB加密|参数一：str:string 参数二：key:string|返回值：string js中sm4加密ECB一般为默认|Android、Web、iOS|
|sm4ECBDecryptSync|sm4 ECB解密|参数一：str:string 参数二：key:string|返回值：string|Android、Web、iOS|
|sm4CBCEncryptSync|sm4 CBC加密|参数一：str:string 参数二：key:string 参数三：iv:string|返回值：string|Android、Web、iOS|
|sm4CBCDecryptSync|sm4 CBC解密|参数一：str:string 参数二：key:string 参数三：iv:string|返回值：string|Android、Web、iOS|
|sm3EncryptSync|sm3加密|str:string|返回值：string|Android、Web、iOS|
|sm2EncryptSync|国产SM2非对称公钥加密|参数一：dataString : string 参数二：publicKey : string|返回值：string|Android、Web、iOS|
|sm2DecryptSync|国产SM2非对称私钥解密|参数一：dataString : string 参数二：privateKey : string|返回值：string|Android、Web、iOS|
|sm2PubSignSync|sm2私钥签名|参数一：dataString : string 参数二：privateKey : string|返回值：string|Android、Web、iOS|
|sm2PubSignValSync|sm2验签|参数一：dataString : string 参数二：publicKey : string 参数三：sign : string|返回值：boolean|Android、Web、iOS|
|aesEncryptSync|AES ECB对称加密|参数一：str:string 参数二：key:string [参数三：isHex: boolean（默认值为false，值为true是旧版返回HEX值）目前只有Android支持]|返回值：string `AES加密方式为ECB模式，返回的是base64加密数据`|Android、iOS、Web|
|aesDecryptSync|AES ECB对称解密|参数一：str:string 参数二：key:string [参数三：isHex: boolean（默认值为false，值为true是旧版返回HEX值）目前只有Android支持]|返回值：string `AES解密密方式为ECB模式`|Android、iOS、Web|
|sha1Sync|SHA1加密|str:string|返回值：string|Android、iOS、Web|
|sha256Sync|SHA256加密|str:string|返回值：string|Android、iOS、Web|
|rsaEncryptSync|RSA非对称加密|参数一：dataString : string  参数二：keyPair : KeyPair  参数三：type : KeyType|返回值：string|Android|
|rsaDecryptSync|RSA非对称解密|参数一：dataString : string  参数二：keyPair : KeyPair  参数三：type : KeyType|返回值：string|Android|
|rsaSHA256PrivateSync|RSA SHA256签名|参数一：dataString : string  参数二：keyPair : KeyPair|返回值：string|Android|
|rsaMD5PrivateSync|RSA MD5签名|参数一：dataString : string  参数二：keyPair : KeyPair|返回值：string|Android|
|rsaSHA256PubValSync|RSA SHA256签名验签|参数一：dataString : string  参数二：result: string  参数三：keyPair : KeyPair|返回值：boolean|Android|
|rsaMD5PubValSync|RSA MD5签名验签|参数一：dataString : string  参数二：result: string  参数三：keyPair : KeyPair|返回值：boolean|Android|
|hmacSHA1Sync|hmacSHA1加密|参数一：plaintext : string 参数二：key : string|返回值：string|Android、iOS、Web|
|aesCBCEncryptSync|aes CBC加密|参数一：str:string 参数二：key:string 参数三：iv:string|返回值：string|Android、iOS、Web|
|aesCBCDecryptSync|aes CBC解密|参数一：str:string 参数二：key:string 参数三：iv:string|返回值：string|Android、iOS、Web|

### 使用示例

``` html
<template>
	<view>
		<button @tap="testMD5">测试md5</button>
		<button @tap="testbase64encode">测试base64encode</button>
		<button @tap="testSM4">测试国产SM加密</button>
		<button @tap="testaes">测试aes</button>
		<button @tap="testSHA">测试sha</button>
		<button @tap="testRSA">测试RSA</button>
	</view>
</template>

<script lang="uts">
	import { md5Sync, base64EncodeSync, rsaEncryptSync, getKeyPair, KeyType, rsaDecryptSync, rsaSHA256PrivateSync, rsaMD5PrivateSync, rsaSHA256PubValSync, rsaMD5PubValSync, base64DecodeSync, sm4ECBEncryptSync, sm4ECBDecryptSync, sm4CBCEncryptSync, sm4CBCDecryptSync, aesEncryptSync, aesDecryptSync, sha1Sync, sha256Sync, sm3EncryptSync,sm2KeyPair,sm2EncryptSync,sm2DecryptSync,sm2PubSignSync,sm2PubSignValSync,aesCBCEncryptSync,aesCBCDecryptSync } from "@/uni_modules/tq-encrypt"
	export default {
		data() {
			return {
				str: "123456"
			}
		},
		methods: {
			testMD5() {
				const md5 = md5Sync(this.str)
				console.log(md5);
			},
			testbase64encode() {
				const str = base64EncodeSync("212321")
				console.log(str);

				const rom = base64DecodeSync(str)
				console.log(rom);
			},
			testSM4() {
				const key = 'D607A82C09F938809778B25A2F98DFA1';
				let data = {
					"ac": md5Sync("123456").toLowerCase(),
					"grant_type": "onlyPassword",
					"name": "arguments"
				}
				console.log(JSON.stringify(data));
				// js的sm4解密一般ECB为默认
				const sm4 = sm4ECBEncryptSync(JSON.stringify(data), key)
				console.log(sm4);
				const sm3 = sm3EncryptSync(JSON.stringify(data))
				console.log(sm3);
				const origin = sm4ECBDecryptSync(sm4, key)
				console.log(origin);
				const iv = 'fedcba98765432100123456789abcdef';
				const cbcsm4 = sm4CBCEncryptSync("123456",key,iv)
				console.log(cbcsm4);
				const origincbcsm4 = sm4CBCDecryptSync(cbcsm4,key,iv)
				console.log(origincbcsm4);
				
				const arr = sm2KeyPair()// 返回密钥 0 公钥 1 私钥
				console.log(arr);
				const sm2 = sm2EncryptSync("123456",arr[0])// 公钥加密
				console.log(sm2);
				const sm2origin = sm2DecryptSync(sm2,arr[1])// 私钥解密
				console.log(sm2origin);

				const sign = sm2PubSignSync(sm2,arr[1])// 私钥签名
				console.log(sign);
				const bool = sm2PubSignValSync(sm2,arr[0],sign) // 公钥验签
				console.log(bool);
			},
			testaes() {
				const res = aesEncryptSync("123456", "94E114C6A898CD39B602C8269AD33780")
				console.log(res);
				const dom = aesDecryptSync("3AA827B7EB35B4F522360B486EDB918C", "94E114C6A898CD39B602C8269AD33780")
				console.log(dom);
				// #ifdef APP-ANDROID
				const key = "457E900861A541B7BA69455073A3A56A"
				const iv = "457E900861A541B7"
				const aes = aesCBCEncryptSync("123456", key, iv)
				console.log(aes);
				const origin = aesCBCDecryptSync(aes,key,iv)
				console.log(origin);
				// #endif
			},
			testSHA() {
				const res1 = sha1Sync("123456")
				const res2 = sha256Sync("123456")
				console.log(res1, res2);
			},
			testRSA() {
				const key = getKeyPair()
				const res = rsaEncryptSync("123456", key, KeyType.PUB)//公钥加密
				console.log(res);
				const origin = rsaDecryptSync(res, key, KeyType.PRI)//私钥解密
				console.log(origin);

				const res1 = rsaEncryptSync("123456", key, KeyType.PRI)//私钥加密
				console.log(res1);
				const origin1 = rsaDecryptSync(res1, key, KeyType.PUB)//公钥解密
				console.log(origin1);

				const res2 = rsaSHA256PrivateSync("123456", key)//私钥对明文数据SHA256签名
				console.log(res2);
				const res3 = rsaMD5PrivateSync("123456", key)//私钥对明文数据MD5签名
				console.log(res3);
				const res4 = rsaSHA256PubValSync("123456", res2, key) // 公钥对SHA256签名验签
				console.log(res4);
				const res5 = rsaMD5PubValSync("123456", res3, key) // 公钥对MD5签名验签
				console.log(res5);
			}
		}
	}
</script>
```


### 注意

1、本插件包含原生第三方库需要配置gradle库和sdk库

[Android UTS扩展开发](https://uniapp.dcloud.net.cn/tutorial/run/uts-development-android.html)

![](https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/%E9%85%8D%E7%BD%AE.png)

![](https://cdn.jsdelivr.net/gh/qitiandear/qtpic/img/20240328113941.png)

HBuilder X新版本更新后需要升级gradle库，本人使用的版本是gradle8.2.1配置jdk路径为jdk17，其他版本可使用官方推荐版本

> ps: 如果有问题可以咨询作者，本人QQ：1307905648，也可以在评论区留言截图配置环境和错误信息