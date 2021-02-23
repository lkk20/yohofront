import { List, InputItem, Toast, Button } from 'antd-mobile'
import { login } from '../network/request'
import { useState } from 'react'
function LoginInput(props) {
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')

	const onPhoneChange = phone => {
		setPhone(phone)
	}
	const onPasswordChange = password => {
		setPassword(password)
	}
	const loginBtn = async () => {
		if (phone.replace(/\s/g, '').length < 11 || password.length < 6) {
			Toast.info('请输入正确格式的手机号或密码')
		} else {
			const result = await login(phone, password)
			switch (result.code) {
				case 200:
					window.localStorage.setItem('userid', result.data[0].userid)
					window.localStorage.setItem('token', result.token)
					Toast.info(result.message)
					props.history.push('/index/mine')
					break
				case 400:
					Toast.info('密码或账号错误')
					break
				default:
					Toast.info('登录时遇到了一个错误')
					break
			}
		}
	}
	return (
		<div>
			<List renderHeader={() => '请输入账号密码'}>
				<InputItem
					type="number"
					placeholder="输入你的手机号"
					onChange={onPhoneChange}
					value={phone}
				>
					账号
				</InputItem>
				<InputItem
					type="password"
					placeholder="输入你的密码"
					onChange={onPasswordChange}
					maxLength={16}
					autoComplete="new-password"
					value={password}
				>
					密码
				</InputItem>
				<Button type="primary" onClick={loginBtn}>
					登录
				</Button>
			</List>
		</div>
	)
}

export default LoginInput
