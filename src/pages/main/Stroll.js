import MainHeader from '../../components/MainHeader'

function Stroll(props) {
	//切换页面后
	window.document.documentElement.scrollTop = 0
	return (
		<div className="stroll">
			<MainHeader middle={<h2>逛一逛</h2>} />
			<div>预留功能模块,markdowm文章推荐</div>
		</div>
	)
}

export default Stroll
