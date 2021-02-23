import fetch from './fetch'
//首页推荐获取
export const getRecommend = num => fetch('getRecommend', { num: num }, 'POST')
//登录
export const login = (phone, password) =>
	fetch('login', { phone: phone, password: password }, 'POST')
//注册
export const register = (username, password, phone) =>
	fetch(
		'register',
		{ username: username, password: password, phone: phone },
		'POST'
	)
//获取用户信息
export const getUserInfo = userid =>
	fetch('getUserInfo', { userid: userid }, 'POST', true) //true为发送token
//获取top数据
export const getTops = num => fetch('getTops', { num: num }, 'POST')
//按类获取
export const getDataByCate = (cate, start, size) => {
	//判断字符是否是is开头,即特别的四类
	if (cate.indexOf('is') === 0) {
		return fetch(
			'getFourCateData',
			{ cate: cate, start: start, size: size },
			'POST'
		)
	} else {
		return fetch(
			'getDataByCate',
			{ cate: cate, start: start, size: size },
			'POST'
		)
	}
}
//搜索
export const search = (key, start, size) =>
	fetch('searchByKey', { key: key, start: start, size: size }, 'POST')
//通过id获取产品信息
export const getProductById = pid =>
	fetch('getProductById', { pid: pid }, 'POST')
//添加购物车
export const addCart = (pid, uid, num) =>
	fetch('addCart', { pid: pid, uid: uid, num: num }, 'POST', true)
//收藏
export const addCollect = (pid, uid, image, title, price, cate, isCollect) =>
	fetch(
		'addCollect',
		{
			pid: pid,
			uid: uid,
			image: image,
			title: title,
			price: price,
			cate: cate,
			isCollect: isCollect
		},
		'POST',
		true
	)
//用户是否收藏
export const isCollect = (pid, uid) =>
	fetch('isCollect', { pid: pid, uid: uid }, 'POST', true)
//获取购物车数据
export const getCartData = uid =>
	fetch('getCartData', { uid: uid }, 'POST', true)
//获取收藏数据
export const getCollectData = uid =>
	fetch('getCollectData', { uid: uid }, 'POST', true)
//获取浏览数据
export const getViewData = uid =>
	fetch('getViewData', { uid: uid }, 'POST', true)
//添加浏览数据
export const addView = (uid, pid, image) =>
	fetch('addView', { uid: uid, pid: pid, image: image }, 'POST', true)
//清空游览数据
export const deleteViews = uid =>
	fetch('deleteViews', { uid: uid }, 'POST', true)
//删除购物车的数据，通过cid
export const deleteCartByCid = cid =>
	fetch('deleteCartByCid', { cid: cid }, 'POST', true)
//通过id获取购物车数据
export const getCartByCid = cid =>
	fetch('getCartByCid', { cid: cid }, 'POST', true)
//修改用户数据
export const changeUserInfo = (uid, name, address) =>
	fetch(
		'changeUserInfo',
		{ uid: uid, name: name, address: address },
		'POST',
		true
	)
