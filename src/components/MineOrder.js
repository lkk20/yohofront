import styles from '../static/style/components/MineOrder.module.less'
import { Icon, Toast } from 'antd-mobile'
import daifahuo from '../static/images/daifahuo.svg'
import daifukuan from '../static/images/daifukuan.svg'
import daishouhuo from '../static/images/daishouhuo.svg'
import { Component } from 'react'
import { getCartData, getCollectData, getViewData } from '../network/request'
class MineOrder extends Component {
	constructor(props) {
		super(props)
		this.state = {
			collectNum: 0,
			viewNum: 0,
			cartNum: 0,
			uid: null
		}
	}
	componentDidMount() {
		this.isMount = true
		const uid = window.localStorage.getItem('userid')
		const token = window.localStorage.getItem('token')
		if (uid && token) {
			this.isMount && this.setState({ uid: uid })
			this.getCartNum(uid)
			this.getViewNum(uid)
			this.getCollectNum(uid)
		}
	}
	componentWillUnmount() {
		this.isMount = false
	}
	//商品收藏
	getCollectNum = uid => {
		getCollectData(uid)
			.then(res => {
				if (res.code === 200) {
					this.isMount &&
						this.setState({
							collectNum: res.data.length
						})
				}
			})
			.catch(e => {
				console.warn(e)
			})
	}
	//购物车
	getCartNum = uid => {
		getCartData(uid)
			.then(res => {
				if (res.code === 200) {
					this.isMount &&
						this.setState({
							cartNum: res.data.length
						})
				}
			})
			.catch(e => {
				console.warn(e)
			})
	}
	//浏览记录
	getViewNum = uid => {
		getViewData(uid)
			.then(res => {
				if (res.code === 200) {
					this.isMount &&
						this.setState({
							viewNum: res.data.length
						})
				}
			})
			.catch(e => {
				console.warn(e)
			})
	}
	//页面跳转
	goOtherPage = name => {
		if (this.state.uid) {
			this.props.history.push(name)
		} else {
			Toast.success('请登录')
			this.props.history.push('/login')
		}
	}
	render() {
		const { viewNum, collectNum, cartNum } = this.state
		return (
			<div className={styles.order}>
				<div className={styles.top}>
					<div>我的订单</div>
					<div className={styles.allorder}>
						<div>全部订单</div>
						<div>
							<Icon type="right" size="lg" />
						</div>
					</div>
				</div>
				<div className={styles.top}>
					<div>地址及信息</div>
					<div
						className={styles.allorder}
						onClick={this.goOtherPage.bind(this, '/address')}
					>
						<div>修改信息</div>
						<div>
							<Icon type="right" size="lg" />
						</div>
					</div>
				</div>
				<div className={styles.ordercate}>
					<div className={styles.cateitem}>
						<span>
							<img src={daifukuan} alt="待付款" />
						</span>
						<span>待付款</span>
					</div>
					<div className={styles.cateitem}>
						<span>
							<img src={daifahuo} alt="待发货" />
						</span>
						<span>待发货</span>
					</div>
					<div className={styles.cateitem}>
						<span>
							<img src={daishouhuo} alt="待收货" />
						</span>
						<span>待收货</span>
					</div>
					<div
						className={styles.cateitem}
						onClick={this.goOtherPage.bind(this, '/collect')}
					>
						<span>{collectNum}</span>
						<span>商品收藏</span>
					</div>
					<div
						className={styles.cateitem}
						onClick={this.goOtherPage.bind(this, '/index/cart')}
					>
						<span>{cartNum}</span>
						<span>购物车</span>
					</div>
					<div
						className={styles.cateitem}
						onClick={this.goOtherPage.bind(this, '/view')}
					>
						<span>{viewNum}</span>
						<span>游览记录</span>
					</div>
				</div>
			</div>
		)
	}
}

export default MineOrder
