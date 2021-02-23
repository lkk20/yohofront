import { Component } from 'react'
import { Toast, Icon, Carousel, WingBlank } from 'antd-mobile'
import collecto from '../static/images/collecto.svg'
import collect from '../static/images/collect.svg'
import MainHeader from '../components/MainHeader'
import {
	getProductById,
	addCart,
	isCollect,
	addCollect,
	addView
} from '../network/request'
import styles from '../static/style/main/Product.module.less'
class Product extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cate: '',
			detailmap: [],
			image: '',
			issale: 0,
			oldprice: 0,
			price: 0,
			productinfo: '',
			swiperimage: [],
			title: '',
			iscollect: false,
			uid: null,
			pid: null
		}
	}
	componentDidMount() {
		window.document.documentElement.scrollTop = 0
		this.isMount = true
		this.getData()
		const uid = window.localStorage.getItem('userid')
		const token = window.localStorage.getItem('token')
		const pid = this.props.match.params.id
		//登陆了在发送请求
		if (uid && token) {
			this.setState({ uid: uid, pid: pid })
			this.getIsCollect(pid, uid)
		}
	}
	//是否收藏
	getIsCollect = (pid, uid) => {
		isCollect(pid, uid)
			.then(res => {
				if (res.code === 200) {
					this.isMount && this.setState({ iscollect: true })
				}
			})
			.catch(e => {
				console.warn(e)
			})
		this.setState({ uid: uid })
	}
	//添加浏览
	addView = (uid, pid, image) => {
		addView(uid, pid, image)
			.then(res => {
				if (res.code !== 200) {
					Toast.fail(res.message)
				}
			})
			.catch(e => {
				console.warn(e)
			})
	}
	componentWillUnmount() {
		const { uid, pid, image } = this.state
		if (uid && pid) {
			this.addView(uid, pid, image)
		}
		this.isMount = false
	}
	getData = () => {
		getProductById(this.props.match.params.id)
			.then(res => {
				if (res.code === 200) {
					this.isMount &&
						this.setState({
							cate: res.data.cate,
							detailmap: res.data.detailmap && res.data.detailmap.split(','),
							image: res.data.image,
							issale: res.data.issale,
							oldprice: res.data.oldprice,
							price: res.data.price,
							productinfo: res.data.productinfo,
							swiperimage:
								res.data.swiperimage && res.data.swiperimage.split(','),
							title: res.data.title
						})
				} else {
					Toast.info(res.message)
				}
			})
			.catch(e => {
				console.warn(e)
			})
	}

	goBack = () => {
		this.props.history.goBack()
	}
	addCart = () => {
		const { uid, pid } = this.state
		if (uid) {
			addCart(pid, uid, 1)
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
		} else {
			Toast.fail('请先去登录')

			this.props.history.push('/login')
		}
	}
	buy = () => {
		const { uid } = this.state
		if (uid) {
			this.props.history.push('/pay')
		} else {
			Toast.fail('请先去登录')
			this.props.history.push('/login')
		}
	}
	collect = () => {
		const { pid, uid, image, title, price, cate, iscollect } = this.state
		if (uid) {
			addCollect(pid, uid, image, title, price, cate, iscollect).then(res => {
				if (res.code === 200) {
					this.setState({ iscollect: !iscollect })
					Toast.success(res.message)
				} else {
					Toast.fail(res.message)
				}
			})
		} else {
			Toast.fail('请先去登录')
			this.props.history.push('/login')
		}
	}
	render() {
		const {
			cate,
			detailmap,
			image,
			issale,
			oldprice,
			price,
			productinfo,
			swiperimage,
			title,
			iscollect
		} = this.state

		return (
			<div>
				<MainHeader
					left={
						<Icon type="left" size="lg" color="white" onClick={this.goBack} />
					}
					middle={<h2>商品详情</h2>}
				/>
				<div className={styles.swiperimage}>
					{swiperimage ? (
						<WingBlank>
							<Carousel autoplay={true} infinite={true}>
								{swiperimage.map((item, index) => (
									<a key={index} href="#">
										<img src={item} alt={title} />
									</a>
								))}
							</Carousel>
						</WingBlank>
					) : (
						<img src={image} alt={title} />
					)}
				</div>
				<div className={styles.producttitle}>{title}</div>
				<div className={styles.price}>
					{issale ? (
						<div>
							<span style={{ color: 'red', fontSize: '20px' }}>
								{'￥' + price}
							</span>
							<span
								style={{
									color: 'gray',
									textDecoration: 'line-through'
								}}
							>
								￥{oldprice}
							</span>
						</div>
					) : (
						<span style={{ fontSize: '20px' }}>￥{price}</span>
					)}
				</div>
				<div className={styles.productinfo}>
					<span>种类:{cate}</span>
					<span>{productinfo}</span>
				</div>
				<div className={styles.detailmap}>
					<h3>产品详情图</h3>
					{detailmap.map((item, index) => (
						<div key={index}>
							<img alt={title} src={item} />
						</div>
					))}
				</div>
				<div className={styles.buy}>
					<div className={styles.left}>
						<span onClick={this.collect}>
							<img src={iscollect ? collecto : collect} alt="collect" />
						</span>
					</div>
					<div className={styles.right}>
						<div onClick={this.addCart} style={{ backgroundColor: 'orange' }}>
							加入购物车
						</div>
						<div onClick={this.buy} style={{ backgroundColor: 'red' }}>
							立即购买
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Product
