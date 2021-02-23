import styles from '../static/style/main/Login.module.less'
import LoginInput from '../components/LoginInput'
import Register from '../components/Register'
import { Icon } from 'antd-mobile'

import { useState } from 'react'
function Login(props) {
	const [loginOrRegister, setLoginOrRegister] = useState(true)
	const changeBtn = () => {
		setLoginOrRegister(!loginOrRegister)
	}
	const goBack = () => {
		props.history.goBack()
	}
	return (
		<div className={styles.wrap}>
			<div className={styles.back}>
				<div className={styles.backtop}>
					<div>
						<Icon type="left" size="lg" onClick={goBack} />
					</div>
					<div onClick={changeBtn}>{loginOrRegister ? '注册' : '登录'}</div>
				</div>
			</div>
			<div className={styles.loginOrRegister}>
				{loginOrRegister ? (
					<LoginInput history={props.history} />
				) : (
					<Register history={props.history} />
				)}
			</div>
		</div>
	)
}

export default Login
