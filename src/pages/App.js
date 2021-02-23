import Main from './Main'
import Login from './Login'
import Product from './Product'
import Search from './Search'
import Cate from './Cate'
import Pay from './Pay'
import View from './View'
import Collect from './Collect'
import Address from './Address'
import { Route } from 'react-router-dom'
function App() {
	return (
		<div>
			<Route path="/index" component={Main} />
			<Route path="/login" component={Login} exact />
			<Route path="/product/:id" component={Product} exact />
			<Route path="/cate/:key/:title?" component={Cate} exact />
			<Route path="/search" component={Search} exact />
			<Route path="/pay" component={Pay} exact />
			<Route path="/view" component={View} exact />
			<Route path="/collect" component={Collect} exact />
			<Route path="/address" component={Address} exact />
		</div>
	)
}

export default App
