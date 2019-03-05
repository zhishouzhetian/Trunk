// 日期格式化
export function dateFormat (date, fmt) {
	 if (!(date instanceof Date)) {
		return '';
	}
	fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
	var o = {
		// 月份
		"M+": date.getMonth() + 1,
		// 日
		"d+": date.getDate(),
		// 小时
		"H+": date.getHours(),
		// 分
		"m+": date.getMinutes(),
		// 秒
		"s+": date.getSeconds(),
		// 季度
		"q+": Math.floor((date.getMonth() + 3) / 3),
		// 毫秒
		"S": date.getMilliseconds()
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}
