import { useState, useEffect } from 'react'
import { TabBar } from 'antd-mobile'
import styles from '../static/style/components/MainNavBar.module.less'
import cart from '../static/images/cart.svg'
import carto from '../static/images/carto.svg'
import cate from '../static/images/cate.svg'
import cateo from '../static/images/cateo.svg'
import home from '../static/images/home.svg'
import homeo from '../static/images/homeo.svg'
import stroll from '../static/images/stroll.svg'
import strollo from '../static/images/strollo.svg'
import mine from '../static/images/mine.svg'
import mineo from '../static/images/mineo.svg'
const data = [
	{ title: '首页', key: 'home', unselect: home, selected: homeo },
	{ title: '分类', key: 'cate', unselect: cate, selected: cateo },
	{ title: '逛', key: 'stroll', unselect: stroll, selected: strollo },
	{ title: '购物车', key: 'cart', unselect: cart, selected: carto },
	{ title: '我的', key: 'mine', unselect: mine, selected: mineo }
]

function MainNavBar(props) {
	const [selectedTab, setSelectedTab] = useState('home')
	const selectName = props.location.pathname.substring(
		props.location.pathname.lastIndexOf('/') + 1
	)
	//保证底部是跟随路由的
	useEffect(() => {
		if (selectName !== selectedTab) {
			setSelectedTab(selectName)
		}
	}, [selectName, selectedTab])
	//用replace防止返回混乱
	const changPage = key => {
		props.history.replace(`/index/${key}`)
		setSelectedTab(key)
	}
	const navBarItems = data.map(item => (
		<TabBar.Item
			title={item.title}
			key={item.key}
			icon={
				<div
					style={{
						width: '22px',
						height: '22px',
						background: `url(${item.unselect}) center center /  21px 21px no-repeat`
					}}
				/>
			}
			selectedIcon={
				<div
					style={{
						width: '22px',
						height: '22px',
						background: `url(${item.selected}) center center /  21px 21px no-repeat`
					}}
				/>
			}
			selected={selectedTab === item.key}
			onPress={changPage.bind(this, item.key)}
		></TabBar.Item>
	))
	return (
		<div className={styles.navbar}>
			<TabBar
				unselectedTintColor="#b0b0b0"
				tintColor="#414141"
				barTintColor="white"
			>
				{navBarItems}
			</TabBar>
		</div>
	)
}
export default MainNavBar
