import { getUserInfo } from '../network/request'
import styles from '../static/style/components/ReceivingAddress.module.less'
import { Component } from 'react'
import { Icon } from 'antd-mobile'
class ReceivingAddress extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: null,
			address: null,
			phone: null
		}
	}
	componentDidMount() {
		this.isMount = true
		const token = window.localStorage.getItem('token')
		const userid = window.localStorage.getItem('userid')
		if (token && userid) {
			getUserInfo(userid).then(res => {
				if (res.code === 200) {
					this.isMount &&
						this.setState({
							name: res.data.username,
							address: res.data.address,
							phone: res.data.phone
						})
					res.data.address && this.props.inspectAddress()
				}
			})
		} else {
			this.props.history.replace('/login')
		}
	}
	updateAddress = () => {
		this.props.history.replace('/address')
	}
	render() {
		const { name, address, phone } = this.state
		return (
			<div className={styles.card}>
				<address className={styles.receaddress}>
					<div>
						{name}
						{phone}
					</div>
					<div>{address ? address : '请填写收货地址'}</div>
				</address>
				<div>
					<Icon type="right" size="lg" onClick={this.updateAddress} />
				</div>
			</div>
		)
	}
}
export default ReceivingAddress
