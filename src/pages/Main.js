import styles from '../static/style/main/Main.module.less'
import MainNavBar from '../components/MainNavBar'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './main/Home'
import Cart from './main/Cart'
import Cate from './main/Cate'
import Mine from './main/Mine'
import Stroll from './main/Stroll'
import { Icon } from 'antd-mobile'
import { useState } from 'react'
function Main(props) {
	const goTop = () => {
		//返回顶部
		document.body.scrollTop = 0
		document.documentElement.scrollTop = 0
	}

	const [show, setShow] = useState('none')
	//监听scrollTop
	window.addEventListener('scroll', () => {
		let scrollTop = document.documentElement.scrollTop
		if (scrollTop > 1000) {
			setShow('block')
		} else {
			setShow('none')
		}
	})

	return (
		<div className={styles.main}>
			<Switch>
				<Route path="/index/home" component={Home} exact />
				<Route path="/index/cart" component={Cart} exact />
				<Route path="/index/cate" component={Cate} exact />
				<Route path="/index/mine" component={Mine} exact />
				<Route path="/index/stroll" component={Stroll} exact />
				<Redirect from="/index" to="/index/home" />
			</Switch>
			<div className={styles.gotop} style={{ display: show }}>
				<Icon type="up" size="lg" color="white" onClick={goTop} />
			</div>
			<div style={{ height: '60px' }}></div>
			<MainNavBar location={props.location} history={props.history} />
		</div>
	)
}
export default Main
