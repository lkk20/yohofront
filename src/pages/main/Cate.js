import { Icon } from 'antd-mobile'
import { Link } from 'react-router-dom'
import MainHeader from '../../components/MainHeader'
import CateMenu from '../../components/CateMenu'

function Cate(props) {
	const search = () => {
		props.history.push('/search')
	}
	//切换页面后
	window.document.documentElement.scrollTop = 0
	return (
		<div className="Cate">
			<MainHeader
				middle={<h2>分类</h2>}
				right={
					<Link to="/search">
						<Icon type="search" color="#fff" size="lg" onClick={search} />
					</Link>
				}
			/>
			<CateMenu history={props.history} />
		</div>
	)
}

export default Cate
