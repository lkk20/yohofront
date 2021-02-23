import MainHeader from '../components/MainHeader'
import { Icon, Toast, Grid, NoticeBar, Button, Modal } from 'antd-mobile'
import { Component } from 'react'
import { getViewData, deleteViews } from '../network/request'
const alert = Modal.alert
class View extends Component {
	constructor(props) {
		super(props)
		this.state = {
			viewList: null,
			uid: null
		}
	}
	componentDidMount() {
		this.isMount = true
		const uid = window.localStorage.getItem('userid')
		const token = window.localStorage.getItem('token')
		if (uid && token) {
			this.setState({ uid: uid })
			this.getViewData(uid)
		} else {
			Toast.fail('请先登录')
			this.props.history.replace('/login')
		}
	}
	componentWillUnmount() {
		this.isMount = false
	}
	getViewData = uid => {
		getViewData(uid).then(res => {
			if (res.code === 200) {
				this.isMount && this.setState({ viewList: res.data })
			}
		})
	}
	goBack = () => {
		this.props.history.goBack()
	}
	goDetail = pid => {
		this.props.history.push(`/product/${pid}`)
	}
	deleteAll = () => {
		alert('清空', '你确定吗？', [
			{
				text: '取消',
				style: 'default'
			},
			{
				text: '确定',
				onPress: () => {
					this.setState({ viewList: null })
					this.state.uid &&
						deleteViews(this.state.uid).then(res => {
							if (res.code !== 200) {
								Toast.fail(res.message)
							}
						})
				}
			}
		])
	}
	render() {
		const { viewList } = this.state
		return (
			<div>
				<MainHeader
					left={
						<Icon type="left" size="lg" color="white" onClick={this.goBack} />
					}
					middle={<h2>浏览</h2>}
				/>
				{viewList ? (
					<div>
						<Grid
							data={viewList}
							columnNum={3}
							hasLine={false}
							renderItem={dataItem => (
								<div>
									<img
										onClick={this.goDetail.bind(this, dataItem.pid)}
										src={dataItem.image}
										style={{ width: '80px', height: '80px' }}
										alt="浏览记录"
									/>
								</div>
							)}
						/>
						<Button type="warning" onClick={this.deleteAll}>
							清空
						</Button>
					</div>
				) : (
					<NoticeBar mode="closable">您没有浏览数据</NoticeBar>
				)}
			</div>
		)
	}
}
export default View
