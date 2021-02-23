import styles from '../static/style/components/MineLogin.module.less'
import { Link } from 'react-router-dom'
import { getUserInfo } from '../network/request'
import { Component } from 'react'
import { Toast, Button } from 'antd-mobile'
function MineLogin(props) {
	return (
		<div className={styles.login}>
			{props.userid ? (
				<UserInfo userid={props.userid} history={props.history} />
			) : (
				<Link to="/login">
					<div className={styles.loginbtn}>登录/注册</div>
				</Link>
			)}
		</div>
	)
}
class UserInfo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: 'YoHo用户'
		}
	}
	componentDidMount() {
		this.getData()
	}
	getData = async () => {
		const userinfo = await getUserInfo(this.props.userid)
		if (userinfo.code === 200) {
			this.setState({ username: userinfo.data.username })
		} else {
			Toast.fail(userinfo.message ? userinfo.message : '遇到了一点问题')
			window.localStorage.removeItem('token')
			window.localStorage.removeItem('userid')
		}
	}
	outLogin = () => {
		window.localStorage.removeItem('token')
		window.localStorage.removeItem('userid')
		Toast.success('退出成功')
		this.props.history.push('/login')
	}
	render() {
		return (
			<div className={styles.userinfo}>
				<div>用户名:{this.state.username}</div>
				<div>
					<Button type="warning" inline size="small" onClick={this.outLogin}>
						退出登录
					</Button>
				</div>
			</div>
		)
	}
}

export default MineLogin
