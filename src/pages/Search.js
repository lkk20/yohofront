import MainHeader from '../components/MainHeader'
import SearchAndCateResult from '../components/SearchAndCateResult'
import { search } from '../network/request'
import { Icon, SearchBar, Toast, WhiteSpace } from 'antd-mobile'
import { useState } from 'react'
function Search(props) {
	const [value, setValue] = useState('')
	const [productList, setProductList] = useState([])
	const [start, setStart] = useState(0)
	const goBack = () => {
		props.history.replace('/index/cate')
	}
	const onChange = value => {
		setValue(value)
	}
	const onSubmit = () => {
		getDataBySearch(10)
	}
	//获取数据
	const getDataBySearch = async (size = 10) => {
		const res = await search(value, start, size)
		if (res.code === 200) {
			setStart(start + size)
			setProductList(productList.concat(res.data))
		} else {
			Toast.info(res.message)
		}
	}

	//取消
	const onCancel = () => {
		setValue('')
	}
	return (
		<div>
			<MainHeader
				left={<Icon type="left" size="lg" color="white" onClick={goBack} />}
				middle={<h2>搜索</h2>}
			/>
			<WhiteSpace />
			<SearchBar
				placeholder="请输入需要搜索的商品"
				maxLength={16}
				value={value}
				onChange={onChange}
				onSubmit={onSubmit}
				onCancel={onCancel}
			/>
			<WhiteSpace />
			{productList.length !== 0 ? (
				<SearchAndCateResult
					productList={productList}
					history={props.history}
					getData={getDataBySearch}
				/>
			) : null}
		</div>
	)
}
export default Search
