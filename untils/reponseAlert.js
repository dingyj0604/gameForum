const notLogin = (title)=>{
	uni.showModal({
		title: '提示',
		content: title,
		showCancel: false,
		success: res => {
				res.confirm && uni.redirectTo({
					url:'pages/index/index'
				})
			}
	})
}

const shotToast = (title, duration = 2000)=>{
	uni.showToast({
	  duration,
	  title,
	  icon: 'none',
	});
}

export default function reponseAlert(title = '') {
	if (typeof title === 'string') {
		title.indexOf('未登录')!==-1 ? notLogin(title) : shotToast(title)
	}
}
