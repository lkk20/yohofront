import { SwipeAction, Toast } from 'antd-mobile'

import { addCollect } from '../network/request'
import styles from '../static/style/components/CollectCard.module.less'
function CollectCard(props) {
	//结构传来的值
	const { cid, uid, pid, title, image, cate, price } = props
	//找相似
	const findSame = () => {
		props.history.push(`/cate/${cate}`)
	}
	//删除记录
	const deleteCollect = () => {
		//数据库中删除
		addCollect(pid, uid, image, title, price, cate, true)
			.then(res => {
				if (res.code !== 200) {
					Toast.fail(res.message)
				}
			})
			.catch(e => {
				console.warn(e)
			})
		props.deleteCollectCard(cid)
	}
	const intoDetail = () => {
		props.history.push(`/product/${pid}`)
	}

	return (
		<div>
			<SwipeAction
				autoClose
				right={[
					{
						text: '找相似',
						onPress: findSame,
						style: { backgroundColor: '#272525', color: 'white' }
					},
					{
						text: '删除',
						onPress: deleteCollect,
						style: { backgroundColor: '#F4333C', color: 'white' }
					}
				]}
			>
				<div className={styles.card} onClick={intoDetail}>
					<div className={styles.image}>
						<img src={image} alt={title} />
					</div>
					<div className={styles.titleinfo}>{title}</div>
					<div className={styles.cateprice}>
						<span>{cate}</span>
						<span>￥{price}</span>
					</div>
				</div>
			</SwipeAction>
		</div>
	)
}
export default CollectCard
