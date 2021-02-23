import { Icon, List, TextareaItem, Modal, Button, Toast } from 'antd-mobile'
import { Component } from 'react'
import { getUserInfo, changeUserInfo } from '../network/request'
import MainHeader from '../components/MainHeader'
const alert = Modal.alert
class Address extends Component {
	constructor(props) {
		super(props)
		this.state = {
			uid: null,
			address: null,
			name: null
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
							uid: userid,
							name: res.data.username,
							address: res.data.address
						})
					this.defaultName = res.data.username
					this.address = res.data.address
				}
			})
		} else {
			this.props.history.replace('/login')
		}
	}
	componentWillUnmount() {
		this.isMount = false
		this.defaultName = null
		this.address = null
	}
	goBack = () => {
		this.props.history.goBack()
	}
	updated = () => {
		const { uid, name, address } = this.state
		alert('修改', <div>确认更改？</div>, [
			{
				text: '取消',
				style: 'default'
			},
			{
				text: '确认',
				onPress: () => {
					if (this.defaultName !== name || this.address !== address) {
						changeUserInfo(uid, name, address)
							.then(res => {
								if (res.code === 200) {
									Toast.success(res.message)
								} else {
									Toast.fail(res.message)
								}
							})
							.catch(e => {
								console.warn(e)
							})
					}
				}
			}
		])
	}
	changeName = value => {
		this.setState({ name: value })
	}
	changeAddress = value => {
		this.setState({ address: value })
	}
	render() {
		const { name, address } = this.state
		return (
			<div>
				<MainHeader
					middle={<h2>收货地址</h2>}
					left={
						<Icon type="left" size="lg" color="white" onClick={this.goBack} />
					}
				/>
				<List renderHeader={'修改过后请点击确定'}>
					<TextareaItem
						value={name}
						onChange={this.changeName}
						title="姓名"
						autoHeight
						clear
					/>
					<TextareaItem
						value={address}
						onChange={this.changeAddress}
						title="收货地址"
						autoHeight
						clear
					/>
					<List.Item>
						<Button
							type="ghost"
							disabled={!name || !address}
							onClick={this.updated}
						>
							确定
						</Button>
					</List.Item>
				</List>
			</div>
		)
	}
}
export default Address
