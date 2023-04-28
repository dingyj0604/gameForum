import request from '@/api/service/request.js';
import dateFormat from '@/untils/dateFormat.js';

// 通过模糊查询获取话题列表
export const searchTopicList = async (data = {}) => {
	const result = await request({
		data: {},
		url: '/subject/list-keyword',
		method: 'get',
		params: uni.$u.queryParams(data)
	})
	return result
}

// 新建话题
export const addTopic = async (data = {}) => {
	const result = await request({
		data,
		url: '/subject',
		method: 'post',
		params: ""
	})
	return result
}

// 更新话题信息
export const updateTopic = async (id, data = {}) => {
	const result = await request({
		data,
		url: `/subject/${id}`,
		method: 'put',
		params: ""
	})
	return result
}

// 获取所有话题
export const getAllTopics = async (data = {}) => {
	const result = await request({
		data,
		url: `/subject/list`,
		method: 'get',
		params: ""
	})
	return result
}

// 通过id查询话题
export const getTopicDetail = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/subject/${data.id}`,
		method: 'get',
		params: ""
	})
	return result
}

// 获取热门话题
export const hotTopicList = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/subject/hots`,
		method: 'get',
		params: ""
	})
	return result
}
