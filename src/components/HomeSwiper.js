import styles from '../static/style/components/HomeSwiper.module.less'
import { Carousel } from 'antd-mobile'
import swiper1 from '../static/images/swiper1.jpg'
import swiper2 from '../static/images/swiper2.jpg'
import swiper3 from '../static/images/swiper3.jpg'

function HomeSwiper(props) {
	const imgData = [swiper1, swiper2, swiper3]
	return (
		<div className={styles.mainheader}>
			<Carousel autoplay={true} infinite={true} autoplayInterval={3000}>
				{imgData.map(val => (
					<a key={val} href="#">
						<img src={val} alt="swiper" />
					</a>
				))}
			</Carousel>
		</div>
	)
}

export default HomeSwiper
