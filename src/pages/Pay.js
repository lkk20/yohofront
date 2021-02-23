import { Component } from 'react'
import MainHeader from '../components/MainHeader'
import { Button, Icon } from 'antd-mobile'
import { getCartByCid } from '../network/request'
import PayCard from '../components/PayCard'
import ReceivingAddress from '../components/ReceivingAddress'
class Pay extends Component {
	constructor(props) {
		super(props)
		this.state = {
			payList: [],
			totalPrice: 0,
			payDisable: true
		}
	}
	componentDidMount() {
		this.isMount = true
		const cartIdList = this.props.location.cartIdList

		cartIdList.forEach(item => {
			this.getData(item)
		})
	}
	getData = cid => {
		getCartByCid(cid).then(res => {
			if (res.code === 200) {
				this.isMount &&
					this.setState({ payList: this.state.payList.concat(res.data) })
			}
		})
	}
	componentWillUnmount() {
		this.isMount = false
	}
	goBack = () => {
		this.props.history.goBack()
	}
	pay = () => {
		console.log()
	}
	getTotalPrice = tp => {
		this.setState({ totalPrice: this.state.totalPrice + tp })
	}
	inspectAddress = () => {
		this.setState({ payDisable: false })
	}
	render() {
		const { payList, totalPrice, payDisable } = this.state

		return (
			<div>
				<MainHeader
					left={
						<Icon type="left" size="lg" color="white" onClick={this.goBack} />
					}
					middle={<h2>支付</h2>}
				/>
				<ReceivingAddress
					history={this.props.history}
					inspectAddress={this.inspectAddress}
				/>
				{payList.map(item => (
					<PayCard
						getTotalPrice={this.getTotalPrice}
						key={item.cartid}
						num={item.num}
						sku={item.sku}
						pid={item.pid}
						uid={item.uid}
					/>
				))}
				<Button type="primary" disabled={payDisable} onClick={this.pay}>
					支付{totalPrice}
				</Button>
			</div>
		)
	}
}
export default Pay
