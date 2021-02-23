import { Menu as Menus } from 'antd-mobile'
import React from 'react'
const data = [
	{
		value: 'shangyi',
		label: '上衣',
		children: [
			{
				label: '全部上衣',
				value: 'allshangyi'
			},
			{
				label: 'T恤',
				value: 'tixu'
			},
			{
				label: '卫衣',
				value: 'weiyi'
			},
			{
				label: '夹克',
				value: 'jiake'
			},
			{
				label: '衬衫',
				value: 'chenshan'
			},
			{
				label: '防风外套',
				value: 'fangfengwaitao'
			},
			{
				label: '风衣',
				value: 'fengyi'
			},
			{
				label: 'POLO',
				value: 'polo'
			},
			{
				label: '西装',
				value: 'xizhuang'
			},
			{
				label: '套装',
				value: 'taozhuang'
			},
			{
				label: '马甲',
				value: 'majia'
			},
			{
				label: '背心',
				value: 'beixin'
			},
			{
				label: '毛衣/针织',
				value: 'maoyi'
			},
			{
				label: '大衣',
				value: 'dayi'
			}
		]
	},
	{
		value: 'kuzhuang',
		label: '裤装',
		children: [
			{
				label: '全部裤装',
				value: 'allkuzhuang'
			},
			{
				label: '休闲裤',
				value: 'xiuxianku'
			},
			{
				label: '运动裤',
				value: 'yundongku'
			},
			{
				label: '牛仔裤',
				value: 'niuzaiku'
			},
			{
				label: '短裤',
				value: 'duanku'
			},
			{
				label: '紧身裤/打底裤',
				value: 'jinshenku'
			},
			{
				label: '西裤',
				value: 'xiku'
			},
			{
				label: '连体裤',
				value: 'xiuxianku'
			},
			{
				label: '内裤',
				value: 'neiku'
			}
		]
	},
	{
		value: 'xiexue',
		label: '鞋靴',
		children: [
			{
				label: '全部鞋靴',
				value: 'allxiexue'
			},
			{
				label: '运动鞋',
				value: 'yundongxie'
			},
			{
				label: '时装鞋',
				value: 'shizhuangxie'
			},
			{
				label: '家居鞋',
				value: 'jiajuxie'
			},
			{
				label: '拖鞋',
				value: 'tuoxie'
			},
			{
				label: '凉鞋',
				value: 'liangxie'
			},
			{
				label: '雪地靴',
				value: 'xuedixue'
			},
			{
				label: '靴子',
				value: 'xuezi'
			}
		]
	},
	{
		value: 'fupei',
		label: '服配',
		children: [
			{
				label: '全部服配',
				value: 'allfupei'
			},
			{
				label: '帽子',
				value: 'maozi'
			},
			{
				label: '棒球帽',
				value: 'bangqiumao'
			},
			{
				label: '袜子',
				value: 'wazi'
			},
			{
				label: '首饰',
				value: 'shoushi'
			},
			{
				label: '腰带',
				value: 'yaodai'
			},
			{
				label: '配饰',
				value: 'peishi'
			},
			{
				label: '手表',
				value: 'shoubiao'
			},
			{
				label: '眼镜',
				value: 'yanjing'
			}
		]
	},
	{
		value: 'baolei',
		label: '包类/装备',

		children: [
			{
				label: '全部包类/装备',
				value: 'quanbubaolei'
			},
			{
				label: '双肩包',
				value: 'shuangjianbao'
			},
			{
				label: '单肩包/手拎包',
				value: 'danjianbao'
			},
			{
				label: '腰包/胸包/臂包',
				value: 'yaobao'
			},
			{
				label: '邮差包',
				value: 'youchaibao'
			},
			{
				label: '钱包/卡包',
				value: 'qianbao'
			},
			{
				label: '旅行箱',
				value: 'lvxingbao'
			},
			{
				label: 'tote包',
				value: 'totebao'
			},
			{
				label: '储物包',
				value: 'chuwubao'
			}
		]
	},
	{
		value: 'chuangyishenghuo',
		label: '创意生活',
		children: [
			{
				label: '全部创意生活',
				value: 'allchuangyishenghuo'
			},
			{
				label: '手机壳',
				value: 'shoujike'
			},
			{
				label: '影音娱乐',
				value: 'yinyingyule'
			},
			{
				label: '音响',
				value: 'yinxiang'
			},
			{
				label: '火机烟具',
				value: 'huojiyanju'
			},
			{
				label: '移动电源',
				value: 'yidongdianyuan'
			},
			{
				label: '家用电器',
				value: 'jiayongdianqi'
			}
		]
	}
]

function CateMenu(props) {
	const onChange = value => {
		let label = ''
		data.forEach(dataItem => {
			if (dataItem.value === value[0]) {
				label = dataItem.label
				if (dataItem.children && value[1]) {
					dataItem.children.forEach(cItem => {
						if (cItem.value === value[1]) {
							label = `${cItem.label}`
						}
					})
				}
			}
		})
		props.history.push(`/cate/${label}`)
	}
	return (
		<div>
			<Menus data={data} onChange={onChange} height="100%" />
		</div>
	)
}
export default CateMenu
