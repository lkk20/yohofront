import MainHeader from '../components/MainHeader'
import SearchAndCateResult from '../components/SearchAndCateResult'
import { Icon, Toast, NoticeBar } from 'antd-mobile'
import { Component } from 'react'
import { getDataByCate } from '../network/request'
class Cate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			...this.props.match.params,
			productList: [],
			start: 0
		}
	}
	componentDidMount() {
		this.isMount = true
		this.getProductListByKey(10)
	}
	componentWillUnmount() {
		this.isMount = false
	}
	//通过key获取商品列表
	getProductListByKey = (size = 10) => {
		const { key, productList, start } = this.state
		//根据类别获得商品
		getDataByCate(key, start, size)
			.then(res => {
				if (res.code === 200) {
					//给开始位置加上尺寸
					this.isMount &&
						this.setState({
							productList: productList.concat(res.data),
							start: start + size
						})
				} else {
					Toast.info(res.message)
				}
			})
			.catch(e => {
				console.warn(e)
			})
	}
	//返回到首页
	backToHome = () => {
		this.props.history.goBack()
	}
	render() {
		const { key, title, productList } = this.state
		return (
			<div>
				<MainHeader
					left={
						<Icon
							type="left"
							color="white"
							size="lg"
							onClick={this.backToHome}
						/>
					}
					middle={<h2>{title ? title : key}</h2>}
				/>
				{productList.length === 0 ? (
					<NoticeBar mode="closable">暂无该类商品</NoticeBar>
				) : (
					<SearchAndCateResult
						productList={productList}
						history={this.props.history}
						getData={this.getProductListByKey}
					/>
				)}
			</div>
		)
	}
}
export default Cate
