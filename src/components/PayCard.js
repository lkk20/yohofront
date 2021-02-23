import { Component } from 'react'
import { getProductById } from '../network/request'
import styles from '../static/style/components/PayCard.module.less'
class PayCard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			orderInfo: {}
		}
	}
	componentDidMount() {
		this.isMount = true
		this.getData(this.props.pid)
	}

	getData = pid => {
		getProductById(pid).then(res => {
			if (res.code === 200) {
				this.isMount && this.setState({ orderInfo: res.data })
				this.props.getTotalPrice(res.data.price * this.props.num)
			}
		})
	}
	componentWillUnmount() {
		this.isMount = false
	}

	render() {
		const { orderInfo } = this.state
		const { num, sku } = this.props
		return (
			<div className={styles.card}>
				<div className={styles.left}>
					<img src={orderInfo.image} alt={orderInfo.title} />
				</div>
				<div className={styles.middle}>
					<div className={styles.ptitle}>{orderInfo.title}</div>
					<div className={styles.sku}>
						<span>{sku}</span>
						<span>X{num}</span>
					</div>
				</div>
				<div className={styles.right}>
					<span>单价:{orderInfo.price}</span>
					<span>总价:{orderInfo.price * num}</span>
				</div>
			</div>
		)
	}
}
export default PayCard
