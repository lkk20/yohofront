import MainHeader from '../../components/MainHeader'
import CartProducts from '../../components/CartProducts'
import { NoticeBar, Toast } from 'antd-mobile'

import { Component } from 'react'
import { getCartData } from '../../network/request'

class Cart extends Component {
	constructor(props) {
		super(props)
		this.state = {
			uid: null,
			cart: null
		}
	}
	componentDidMount() {
		window.document.documentElement.scrollTop = 0
		this.isMount = true
		this.isMount &&
			this.setState({ uid: window.localStorage.getItem('userid') })
		this.getCartData()
	}
	getCartData = () => {
		getCartData(window.localStorage.getItem('userid'))
			.then(res => {
				if (res.code === 200) {
					this.isMount && this.setState({ cart: res.data })
				} else {
					Toast.fail(res.message)
				}
			})
			.catch(e => {
				console.warn(e)
			})
	}
	goLogin = () => {
		this.props.history.push('/login')
	}
	componentWillUnmount() {
		this.isMount = false
	}
	//清除购物车中的某个商品
	clearCartId = cartidArr => {
		//接受下一级的事件
		this.setState({
			cart: this.state.cart.filter(item => !cartidArr.includes(item.cartid))
		})
	}
	render() {
		const { uid, cart } = this.state
		return (
			<div className="Cart">
				<MainHeader middle={<h2>购物车</h2>} />
				{uid ? null : <NoticeBar onClick={this.goLogin}>请您先登录</NoticeBar>}
				<CartProducts
					cart={cart}
					clearCartId={this.clearCartId}
					history={this.props.history}
				/>
			</div>
		)
	}
}

export default Cart
