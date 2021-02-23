import MainHeader from '../../components/MainHeader'
import HomeSwiper from '../../components/HomeSwiper'
import HomeCate from '../../components/HomeCate'
import logo from '../../static/images/yohologoE.png'
function Home(props) {
	return (
		<div className="Home">
			<MainHeader middle={<img src={logo} alt="logo" />} />
			<HomeSwiper history={props.history} />
			<HomeCate history={props.history} />
		</div>
	)
}

export default Home
