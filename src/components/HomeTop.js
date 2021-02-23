//推荐商品

import styles from '../static/style/components/HomeTop.module.less'
function HomeTop(props) {
	const defaultPrice = 999
	const toProductDetail = productid => {
		props.history.push(`/product/${productid}`)
	}
	return (
		<div className={styles.tops}>
			<ul>
				{props.top.map(item => (
					<li
						key={item.productid}
						onClick={toProductDetail.bind(this, item.productid)}
					>
						<img src={item.image} alt={item.productid} />
						<span>￥{item.price ? item.price : defaultPrice}</span>
					</li>
				))}
			</ul>
		</div>
	)
}
export default HomeTop
