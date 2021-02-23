import { Component } from 'react'
import { Card, Stepper, Toast, Modal } from 'antd-mobile'
import { getProductById, addCart } from '../network/request'
const alert = Modal.alert
class CardProductCard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: null,
			image: null,
			cate: null,
			price: null,
			num: 1,
			sku: null,
			isShow: true,
			cartId: null
		}
	}
	onNumChange = value => {
		//如果等于0就从购物车中清除掉
		if (value === 0) {
			alert('删除', '你确定吗？', [
				{
					text: '取消',
					onPress: () => this.setState({ num: 1 })
				},
				{
					text: '确定',
					onPress: () => this.props.clearCartId([this.state.cartId])
				}
			])
		} else {
			this.setState({ num: value })
		}
	}
	componentDidMount() {
		this.isMount = true
		this.getProductInfo()
		this.setState({
			num: this.props.num,
			sku: this.props.sku,
			cartId: this.props.cartId
		})
	}
	componentWillUnmount() {
		//提交购物车的修改
		this.changeCart()
		this.isMount = false
	}
	//获取产品信息
	getProductInfo() {
		getProductById(this.props.pid).then(res => {
			if (res.code === 200) {
				this.isMount &&
					this.setState({
						title: res.data.title,
						image: res.data.image,
						cate: res.data.cate,
						price: res.data.price
					})
			} else {
				Toast.fail(res.message)
			}
		})
	}
	//提交购物车的修改
	changeCart = () => {
		const { pid, uid, num } = this.props
		if (num !== this.state.num) {
			addCart(pid, uid, this.state.num - num)
				.then(res => {
					if (res.code !== 200) {
						Toast.fail(res.message)
					}
				})
				.catch(e => {
					console.warn(e)
				})
		}
	}
	//去详情页
	goToDetail = () => {
		const { pid } = this.props
		this.props.history.push(`/product/${pid}`)
	}
	render() {
		const { title, image, cate, price, sku, num, isShow } = this.state
		return isShow ? (
			<Card>
				<Card.Header
					title={title}
					thumb={image}
					thumbStyle={{ width: '60px' }}
					extra={<span>{cate}</span>}
					onClick={this.goToDetail}
				/>
				<Card.Body>
					<div>{sku}</div>
				</Card.Body>
				<Card.Footer
					content={'单价' + price + '总价' + price * num}
					extra={
						<Stepper
							showNumber
							max={10}
							min={0}
							value={num}
							onChange={this.onNumChange}
						/>
					}
				/>
			</Card>
		) : (
			''
		)
	}
}
export default CardProductCard
