import request from '@/api/service/request.js';

// 下载文件资源
export const download = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/download`,
		method: 'get',
		params: uni.$u.queryParams(data)
	})
	return result
}
