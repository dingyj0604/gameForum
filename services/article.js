import request from '@/api/service/request.js';
import dateFormat from '@/untils/dateFormat.js';

// 通过指定类型查询文章 文章类型(TIP/TREND)
export const articleList = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/article/list/${data.type}`,
		method: 'get',
		params: ""
	})
	return result
}

// 添加攻略
export const addArticle = async (data = {}) => {
	const result = await request({
		data,
		url: '/article/tip',
		method: 'post',
		params: ""
	})
	return result
}

// 添加动态
export const addDynamic = async (data = {}) => {
	console.log(data);
	const result = await request({
		data,
		url: '/article/trend',
		method: 'post',
		params: ""
	})
	return result
}

// 更新文章
export const updateArticle = async (id, data = {}) => {
	const result = await request({
		data,
		url: `/${id}`,
		method: 'put',
		params: ""
	})
	return result
}

// 删除文章
export const deleteArticle = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/article/${data.id}`,
		method: 'delete',
		params: ""
	})
	return result
}

// 通过id获取文章详情
export const articleDetail = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/article/${data.id}`,
		method: 'get',
		params: ""
	})
	return result
}

// 文章发布
export const postArticle = async (data = {}) => {
	const result = await request({
		data,
		url: `/article/${data.id}/release`,
		method: 'put',
		params: ""
	})
	return result
}

// 获取需要审核的文章（管理员使用)
export const examineArticleList = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/article/examine-list`,
		method: 'get',
		params: ""
	})
	return result
}

// 审核文章 
// 审核状态(通过Published、未通过Failed)
export const examineArticle = async (id, data = {}) => {
	const result = await request({
		data: {},
		url: `/article/${id}/examine`,
		method: 'put',
		params: uni.$u.queryParams(data)
	})
	return result
}

// 对文章进行评论
export const comment = async (id, context) => {
	const result = await request({
		data: context,
		url: `/article/${id}/comment`,
		method: 'put',
		params: ""
	})
	return result
}

// 对文章进行点赞
export const supportArticle = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/article/${data.id}/support`,
		method: 'put',
		params: ""
	})
	return result
}

// 对文章取消点赞
export const unsupportArticle = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/article/${data.id}/un-support`,
		method: 'put',
		params: ""
	})
	return result
}

// 收藏文章
export const starArticle = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/article/${data.id}/collection`,
		method: 'post',
		params: ""
	})
	return result
}

// 取消收藏文章
export const unstarArticle = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/article/${data.id}/un-collection`,
		method: 'post',
		params: ""
	})
	return result
}

// 将文章置顶
export const topArticle = async (id, data = {}) => {
	const result = await request({
		data: {},
		url: `/article/${id}/top`,
		method: 'put',
		params: ""
	})
	return result
}

// 通过话题获取文章
export const articleListByTopic = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/article/list/subject`,
		method: 'get',
		params: uni.$u.queryParams(data)
	})
	return result
}