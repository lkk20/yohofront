import styles from '../static/style/components/ProductList.module.less'
import { Icon } from 'antd-mobile'

function ProductList(props) {
	const defaultTitle = '该商品数据缺失',
		defaultPrice = 9999
	const toProductDetail = productid => {
		props.history.push(`/product/${productid}`)
	}
	const ellipsisClick = (cate, e) => {
		e.stopPropagation()
		props.history.push(`/cate/${cate}`)
	}
	return (
		<div className={styles.products}>
			{props.products.map(item => (
				<div
					key={item.productid}
					className={styles.product}
					onClick={toProductDetail.bind(this, item.productid)}
				>
					<div>
						<img src={item.image} alt={item.title} />
					</div>
					<span className={styles.productTitle}>
						{item.title ? item.title : defaultTitle}
					</span>
					<div className={styles.price}>
						<div>
							{item.issale ? (
								<div>
									<span style={{ color: 'red' }}>{'￥' + item.price}</span>
									<span
										style={{
											color: 'gray',
											textDecoration: 'line-through'
										}}
									>
										￥{item.oldprice}
									</span>
								</div>
							) : (
								<span>￥ {item.price ? item.price : defaultPrice}</span>
							)}
						</div>
						<div>
							<span>
								<Icon
									type="ellipsis"
									size="md"
									onClick={ellipsisClick.bind(this, item.cate)}
								/>
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
export default ProductList
