import styles from '../static/style/components/HomeCate.module.less'
import ProductList from '../components/ProductList'
import { Component } from 'react'
import { Toast } from 'antd-mobile'
import { getRecommend, getTops } from '../network/request'
import HomeTop from '../components/HomeTop'
//小导航
import hots from '../static/images/hots.png'
import news from '../static/images/news.png'
import sale from '../static/images/sale.png'
import tuan from '../static/images/tuan.png'
//热门种类
import tixu from '../static/images/tixu.jpg'
import weiyi from '../static/images/weiyi.jpg'
import jiake from '../static/images/jiake.jpg'
import chenshan from '../static/images/chenshan.jpg'
import xiezi from '../static/images/xiezi.jpg'
import xiuxianku from '../static/images/xiuxianku.jpg'
import niuzaiku from '../static/images/niuzaiku.jpg'
import duanku from '../static/images/duanku.jpg'
import maozi from '../static/images/maozi.jpg'
import peishi from '../static/images/peishi.jpg'
import shuangjianbao from '../static/images/shuangjianbao.jpg'
import shoulinbao from '../static/images/shoulinbao.jpg'
//top100
import top100 from '../static/images/top100.jpg'
const toplist = [
	{ image: news, title: '新品到店', key: 'isnew' },
	{ image: hots, title: '人气搭配', key: 'ishot' },
	{ image: sale, title: '折扣专区', key: 'issale' },
	{ image: tuan, title: '有货拼团', key: 'istuan' }
]
const hotcates = [
	{ image: tixu, key: 'T恤', title: 'T恤' },
	{ image: weiyi, key: '卫衣', title: '卫衣' },
	{ image: jiake, key: '夹克', title: '夹克' },
	{ image: chenshan, key: '衬衫', title: '衬衫' },
	{ image: xiezi, key: '鞋子', title: '鞋子' },
	{ image: xiuxianku, key: '休闲裤', title: '休闲裤' },
	{ image: niuzaiku, key: '牛仔裤', title: '牛仔裤' },
	{ image: duanku, key: '短裤', title: '短裤' },
	{ image: maozi, key: '帽子', title: '帽子' },
	{ image: peishi, key: '配饰', title: '配饰' },
	{ image: shuangjianbao, key: '双肩包', title: '双肩包' },
	{ image: shoulinbao, key: '手拎包', title: '手拎包' }
]
class HomeCate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			products: [],
			top: []
		}
	}
	componentDidMount() {
		this.isMount = true
		this.getData()
	}
	getData = () => {
		getRecommend(10)
			.then(res => {
				if (res.code === 200) {
					this.isMount && this.setState({ products: res.data })
				} else {
					Toast.info(res.message)
				}
			})
			.catch(e => {
				console.warn(e)
			})
		getTops(10)
			.then(res => {
				if (res.code === 200) {
					this.isMount && this.setState({ top: res.data })
				} else {
					Toast.info(res.message)
				}
			})
			.catch(e => {
				console.warn(e)
			})
	}
	componentWillUnmount() {
		this.isMount = false
	}
	toOtherPage = (key, title) => {
		//即使是只需要一个参数也要把另一个当作空传进来，否则会被当成e
		if (title) {
			this.props.history.push(`/cate/${key}/${title}`)
		} else {
			this.props.history.push(`/cate/${key}`)
		}
	}
	render() {
		const { products, top } = this.state
		return (
			<div className={styles.container}>
				<div className={styles.toplist}>
					{toplist.map(item => (
						<div
							key={item.key}
							className={styles.toplistitem}
							onClick={this.toOtherPage.bind(this, item.key, item.title)}
						>
							<div>
								<img src={item.image} alt={item.title} />
							</div>
							<span>{item.title}</span>
						</div>
					))}
				</div>
				<p>热门品类</p>
				<ul className={styles.hotcate}>
					{hotcates.map(item => (
						<li
							key={item.key}
							onClick={this.toOtherPage.bind(this, item.key, '')}
						>
							<img src={item.image} alt={item.key} />
						</li>
					))}
				</ul>
				<p>人气推荐</p>
				<div style={{ height: '140px', width: '100%' }}>
					<img
						src={top100}
						alt="top100"
						style={{ height: '100%', width: '100%' }}
					/>
				</div>
				<HomeTop top={top} history={this.props.history} />
				<div className={styles.recommend}>
					<h2>你可能喜欢</h2>
					<ProductList products={products} history={this.props.history} />
				</div>
			</div>
		)
	}
}

export default HomeCate
