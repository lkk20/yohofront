import styles from '../static/style/components/MainHeader.module.less'
function MainHeader(props) {
	return (
		<div className={styles.mainheader}>
			<div className={styles.left}>{props.left}</div>
			<div className={styles.middle}>{props.middle}</div>
			<div className={styles.right}>{props.right}</div>
		</div>
	)
}

export default MainHeader
