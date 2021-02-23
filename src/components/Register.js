import { List, InputItem, Toast, Button, Modal } from 'antd-mobile'
import { register, login } from '../network/request'
import { useState } from 'react'
const alert = Modal.alert
function Register(props) {
	//用户信息是否出错
	const [phoneError, setPhoneError] = useState(false)
	const [passwordError, setPasswordError] = useState(false)
	const [usernameError, setUsernameError] = useState(false)
	//用户信息
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	const onErrorClick = () => {
		Toast.info('请输入正确格式')
	}
	//实时检查输入框
	//手机号
	const onPhoneChange = phone => {
		if (phone.replace(/\s/g, '').length < 11) {
			setPhoneError(true)
		} else {
			setPhoneError(false)
		}
		setPhone(phone)
	}
	//密码
	const onPasswordChange = password => {
		if (password.length < 6) {
			setPasswordError(true)
		} else {
			setPasswordError(false)
		}
		setPassword(password)
	}
	//用户名
	const onUsernameChange = username => {
		if (username.length >= 255 || username.length <= 0) {
			setUsernameError(true)
		} else {
			setUsernameError(false)
		}
		setUsername(username)
	}
	//提交注册
	const registerBtn = async () => {
		if (phoneError || passwordError || usernameError) {
			Toast.info('请检查输入信息')
		} else {
			const result = await register(username, password, phone)
			switch (result.code) {
				case 200:
					alert(result.message, '是否直接登录', [
						{
							text: '取消',
							onPress: () => Toast.info('取消登录'),
							style: 'default'
						},
						{
							text: '确认',
							onPress: async () => {
								const loginResult = await login(phone, password)
								switch (loginResult.code) {
									case 200:
										window.localStorage.setItem(
											'userid',
											loginResult.data[0].userid
										)
										window.localStorage.setItem('token', loginResult.token)
										Toast.info(loginResult.message)
										props.history.push('/index/mine')
										break
									default:
										Toast.info('登录时遇到了一个错误')
										break
								}
							}
						}
					])
					break
				case 400:
					Toast.info(result.message)
					break
				default:
					Toast.info('注册时遇到了一个问题')
					break
			}
		}
	}
	return (
		<div>
			<List renderHeader={() => '请填写信息'}>
				<InputItem
					type="text"
					placeholder="输入你的用户名(0-255个字符)"
					error={usernameError}
					onErrorClick={onErrorClick}
					onChange={onUsernameChange}
					value={username}
				>
					用户名
				</InputItem>
				<InputItem
					type="number"
					placeholder="输入你的手机号(11位数字)"
					error={phoneError}
					onErrorClick={onErrorClick}
					onChange={onPhoneChange}
					value={phone}
				>
					手机号
				</InputItem>
				<InputItem
					type="password"
					placeholder="输入你的密码(6-16个字符)"
					error={passwordError}
					onErrorClick={onErrorClick}
					onChange={onPasswordChange}
					value={password}
					maxLength={16}
					autoComplete="new-password"
				>
					密码
				</InputItem>
				<Button type="primary" onClick={registerBtn}>
					注册
				</Button>
			</List>
		</div>
	)
}

export default Register
