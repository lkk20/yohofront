import ProductList from './ProductList'
import { PullToRefresh } from 'antd-mobile'
import { useState } from 'react'
function SearchAndCateResult(props) {
	const [refreshing, setRefreshing] = useState(true)
	const height = document.documentElement.clientHeight - 60
	const getNewData = () => {
		setRefreshing(false)
		props.getData(10)
	}
	return (
		<div>
			<div>
				<PullToRefresh
					damping={60}
					style={{
						height: height,
						overflow: 'auto'
					}}
					direction="up"
					refreshing={refreshing}
					onRefresh={getNewData}
				>
					<ProductList products={props.productList} history={props.history} />
				</PullToRefresh>
			</div>
		</div>
	)
}
export default SearchAndCateResult
