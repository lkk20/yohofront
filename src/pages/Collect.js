import MainHeader from '../components/MainHeader'
import { Icon, Toast, NoticeBar, WhiteSpace } from 'antd-mobile'
import { Component } from 'react'
import { getCollectData } from '../network/request'
import CollectCard from '../components/CollectCard'
class Collect extends Component {
	constructor(props) {
		super(props)
		this.state = {
			collectList: null
		}
	}
	componentDidMount() {
		this.isMount = true
		const uid = window.localStorage.getItem('userid')
		const token = window.localStorage.getItem('token')
		if (uid && token) {
			this.getCollectData(uid)
		} else {
			Toast.fail('请先登录')
			this.props.history.replace('/login')
		}
	}
	componentWillUnmount() {
		this.isMount = false
	}
	getCollectData = uid => {
		getCollectData(uid).then(res => {
			if (res.code === 200) {
				console.log(res.data)
				this.isMount && this.setState({ collectList: res.data })
			}
		})
	}
	goBack = () => {
		this.props.history.goBack()
	}
	//删除
	deleteCollectCard = cid => {
		this.setState({
			collectList: this.state.collectList.filter(item => item.collectid !== cid)
		})
	}
	render() {
		const { collectList } = this.state
		console.log(collectList)
		return (
			<div>
				<MainHeader
					left={
						<Icon type="left" size="lg" color="white" onClick={this.goBack} />
					}
					middle={<h2>收藏</h2>}
				/>
				<WhiteSpace size="lg" />
				{collectList ? (
					collectList.map(item => (
						<CollectCard
							key={item.collectid}
							pid={item.pid}
							uid={item.uid}
							cid={item.collectid}
							cate={item.cate}
							image={item.image}
							price={item.price}
							title={item.price}
							history={this.props.history}
							deleteCollectCard={this.deleteCollectCard}
						/>
					))
				) : (
					<NoticeBar mode="closable">您没有收藏的商品</NoticeBar>
				)}
				<WhiteSpace size="lg" />
			</div>
		)
	}
}
export default Collect
