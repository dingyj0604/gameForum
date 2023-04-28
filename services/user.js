import request from '@/api/service/request.js';
import dateFormat from '@/untils/dateFormat.js';

// 用户登录
export const login = async (data = {}) => {
	const result = await request({
		data: {},
		url: '/user/login',
		method: 'post',
		params: uni.$u.queryParams(data)
	})
	return result
}

// 用户注册
export const register = async (data = {}) => {
	const result = await request({
		data: {},
		url: '/user',
		method: 'post',
		params: uni.$u.queryParams(data)
	})
	return result
}

// 通过id获取用户信息
export const getUserInfoById = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/user/${data.id}`,
		method: 'get',
		params: ""
	})
	return result
}

// 通过token获取用户信息
export const getUserInfoByToken = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/user`,
		method: 'get',
		params: ""
	})
	return result
}

// 用户信息更新
export const updateUser = async (data = {}) => {
	const result = await request({
		data,
		url: '/user',
		method: 'put',
		params: ""
	})
	return result
}

// 注销用户
export const cancellate = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/user/${data.id}/${data.token}`,
		method: 'delete',
		params: ""
	})
	return result
}

// 退出登录
export const logout = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/user/${data.token}`,
		method: 'delete',
		params: ""
	})
	return result
}

// 关注用户
export const followUser = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/user/follow`,
		method: 'put',
		params: uni.$u.queryParams(data)
	})
	return result
}

// 取消关注用户
export const unfollowUser = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/user/un-follow`,
		method: 'put',
		params: uni.$u.queryParams(data)
	})
	return result
}

// 获取关注的用户
export const getFollowUsers = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/user/follows`,
		method: 'get',
		params: ""
	})
	return result
}

// 关注话题
export const concernTopic = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/user/concern`,
		method: 'put',
		params: uni.$u.queryParams(data)
	})
	return result
}

// 上传头像
export const uploadAvatar = async (data = {}) => {
	const result = await request({
		data,
		url: `/user/upload-portrait`,
		method: 'post',
		params: "",
		contentType: "multipart/form-data"
	})
	return result
}

// 获取用户创建的话题
export const getUserTopic = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/user/subjects`,
		method: 'get',
		params: ""
	})
	return result
}

// 获取用户关注的话题
export const getUserConcernTopic = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/user/concerns`,
		method: 'get',
		params: ""
	})
	return result
}

// 获取用户收藏的文章
export const getUserStarArticle = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/user/collections`,
		method: 'get',
		params: ""
	})
	return result
}

// 获取用户创建的文章
export const getUserPublishArticle = async (data = {}) => {
	const result = await request({
		data: {},
		url: `/user/works`,
		method: 'get',
		params: ""
	})
	return result
}
