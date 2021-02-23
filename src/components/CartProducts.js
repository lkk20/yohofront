import styles from '../static/style/components/CartProduct.module.less'
import cart from '../static/images/carto.svg'
import { Button, Checkbox, Toast, WhiteSpace } from 'antd-mobile'
import CartProductCard from './CartProductCard'
import { useEffect, useState } from 'react'
import { deleteCartByCid } from '../network/request'
function CartProducts(props) {
	const [checkedArr, setCheckedArr] = useState([])
	const [allChecked, setAllChecked] = useState(false)
	const goShopping = () => {
		props.history.replace('/index/home')
	}
	//监听变化
	useEffect(() => {
		if (props.cart && checkedArr.length === props.cart.length) {
			setAllChecked(true)
		} else {
			setAllChecked(false)
		}
	}, [props.cart, checkedArr.length])
	const onChangeCheckBox = cartid => {
		//原来的加上新的合并一起
		if (checkedArr.includes(cartid)) {
			setCheckedArr(checkedArr.filter(item => item !== cartid))
		} else {
			setCheckedArr(checkedArr.concat([cartid]))
		}
	}
	const onAllChecked = () => {
		setAllChecked(!allChecked)
		if (!allChecked) {
			//全选
			setCheckedArr(props.cart.map(item => item.cartid))
		} else {
			//全不选
			setCheckedArr([])
		}
	}

	//提交订单
	const submitOrder = () => {
		props.history.push({ pathname: '/pay', cartIdList: checkedArr })
	}
	//删除
	const deleteChecked = () => {
		//修改数据库购物车数据
		props.clearCartId(checkedArr)
		checkedArr.forEach(item => {
			deleteCartByCid(item).then(res => {
				if (res.code !== 200) {
					Toast.fail(res.message)
				}
			})
		})
	}
	return (
		<div>
			{props.cart && props.cart.length !== 0 ? (
				<div>
					<WhiteSpace size="lg" />
					{props.cart.map(item => (
						<div className={styles.card} key={item.cartid}>
							<div className={styles.cardceft}>
								<Checkbox
									checked={checkedArr.includes(item.cartid)}
									onChange={onChangeCheckBox.bind(this, item.cartid)}
								></Checkbox>
							</div>
							<div className={styles.cardright}>
								<CartProductCard
									uid={item.uid}
									pid={item.pid}
									sku={item.sku}
									num={item.num}
									cartId={item.cartid}
									history={props.history}
									clearCartId={props.clearCartId}
								/>
							</div>
						</div>
					))}
					<WhiteSpace size="lg" />
					<div className={styles.delete}>
						<Checkbox checked={allChecked} onChange={onAllChecked}>
							全选
						</Checkbox>
						<Button
							type="warning"
							size="small"
							disabled={checkedArr.length === 0}
							onClick={deleteChecked}
						>
							删除
						</Button>
					</div>
					<Button
						type="primary"
						disabled={checkedArr.length === 0}
						onClick={submitOrder}
					>
						生成订单
					</Button>
				</div>
			) : (
				<div className={styles.empty}>
					<div className={styles.cart}>
						<img src={cart} alt="cart" />
					</div>
					<span>您的购物车暂无商品</span>
					<div className={styles.btn} onClick={goShopping}>
						随便逛逛
					</div>
				</div>
			)}
		</div>
	)
}
export default CartProducts
