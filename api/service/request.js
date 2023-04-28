import {
	baseUrl
} from '../config.js'
import reponseAlert from '@/untils/reponseAlert.js';

/**
 * @param {string} method @description 请求类型POST、GET...
 * @param {string} url @description 请求url
 * @param {string} params @description url查询参数
 * @param {object} data @description data参数
 * @param {Boolean} mock @description 是否使用mock地址 @default false 
 * @return {*} * @description 返回内容
 */
const request = async ({
	method = 'POST',
	url = '',
	params = '',
	data = {},
	mock = false,
	contentType = "application/json"
}) => {
	const result = await new Promise((res, rej) => {
		uni.request({
			url: `${mock ? mockUrl : baseUrl}${url}${params}`,
			data,
			method,
			sslVerify: false,
			header: {
				token: uni.getStorageSync("token") || "",
				"Access-Control-Allow-Origin": '*',
				"Content-Type": contentType,
			},
			success: (result) => {
				res(result.data)
			},
			fail: (err) => {
				console.log(err)
				rej(err)
			}
		})
	})
	console.log("request result", result);
	if (result.code !== 200) {
		reponseAlert(result?.msg || '未知错误！')
		return
	}
	return result?.data;
}

export default request;
