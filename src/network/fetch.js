const baseURL = 'http://127.0.0.1:7001/api/'
export default async (
	url = '',
	data = {},
	type = 'GET',
	isSendToken = false,
	method = 'fetch'
) => {
	type = type.toUpperCase()
	url = baseURL + url
	//如果是GET方式就拼接数据到url里
	if (type === 'GET') {
		let dataStr = ''
		Object.entries(data).forEach(dataItem => {
			dataStr += dataItem[0] + '=' + dataItem[1] + '&'
		})
		if (dataStr !== '') {
			dataStr = dataStr.slice(0, dataStr.lastIndexOf('&'))
			url += '?' + dataStr
		}
	}
	//如果支持fetch
	if (window.fetch && method === 'fetch') {
		let requestConfig = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			method: type,
			mode: 'cors',
			cache: 'force-cache',
			credentials: 'same-origin'
		}
		//是否带上token
		if (isSendToken) {
			const token = localStorage.getItem('token')
			requestConfig.headers.Authorization = token
		}
		//post发送数据
		if (type !== 'GET') {
			requestConfig.body = JSON.stringify(data)
		}
		//请求头headers
		try {
			const response = await fetch(url, requestConfig)
			const responseJson = await response.json()
			return responseJson
		} catch (error) {
			throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			//如果不支持fetch，使用XMLHttpRequest
			let xhr = new XMLHttpRequest()
			xhr.open(type, url, true)
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
			//改造发送数据
			let sendData = null
			if (type !== 'GET') {
				const token = localStorage.getItem('token')
				sendData = JSON.stringify(data)
				xhr.setRequestHeader('Authorization', token)
			}
			xhr.timeout = 3000
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						let responseData = xhr.response
						if (typeof responseData != 'object') {
							responseData = JSON.parse(responseData)
						}
						resolve(responseData)
					}
				} else {
					reject(xhr)
				}
			}
			xhr.ontimeout = function (e) {
				// XMLHttpRequest 超时。在此做某事。
				reject(e)
			}
			xhr.send(sendData)
		})
	}
}
