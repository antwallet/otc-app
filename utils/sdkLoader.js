let sdkLoadPromise = null

// SDK加载函数
export function loadOpenAdSDK() {
	if (sdkLoadPromise) {
		return sdkLoadPromise
	}

	sdkLoadPromise = new Promise((resolve) => {
		if (window.openADJsSDK) {
			console.log('SDK已加载')
			resolve(true)
			return
		}

		const script = document.createElement('script')
		script.name = 'openADJsSDK'
		script.type = 'text/javascript'
		script.src = 'https://protocol.openad.network/sdkloader.js'
		script.setAttribute('version', '3.0')

		script.onload = () => {
			console.log('OpenAD SDK加载成功')
			const checkSDK = () => {
				if (window.openADJsSDK) {
					console.log('OpenAD SDK初始化完成')
					resolve(true)
				} else {
					setTimeout(checkSDK, 100)
				}
			}
			checkSDK()
		}

		script.onerror = () => {
			console.error('OpenAD SDK加载失败')
			sdkLoadPromise = null
			resolve(false)
		}

		document.head.appendChild(script)
	})

	return sdkLoadPromise
}