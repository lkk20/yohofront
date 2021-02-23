import MainHeader from '../../components/MainHeader'
import MineLogin from '../../components/MineLogin'
import MineOrder from '../../components/MineOrder'
function Mine(props) {
	const userid = window.localStorage.getItem('userid')
	return (
		<div className="Mine">
			<MainHeader middle={<h2>个人中心</h2>} />
			<MineLogin userid={userid} history={props.history} />
			<MineOrder history={props.history} />
		</div>
	)
}

export default Mine
