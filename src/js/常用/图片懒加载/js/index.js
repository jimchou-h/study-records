(function () {
	// 2.位置计算 + 滚动事件 (Scroll) + DataSet API
	// 使用的时候注意给滚动函数加防抖！
	window.addEventListener('scroll', function (e) {
		console.log(document.documentElement.scrollTop)
			const imgs = document.getElementsByTagName('img')
			const clientHeight = document.documentElement.clientHeight
			const scrollTop = document.documentElement.scrollTop
		  for (let i = 0, len = imgs.length; i < len; i++) {
				const img = imgs[i]
				if (img.offsetTop - clientHeight - scrollTop < 50) {
					img.src = img.dataset.src
				}
			}
	})
	
	// 2.getBoundingClientRect API + Scroll with Throttle + DataSet API
	// 使用的时候注意给滚动函数加防抖！
	// getBoundingClientRect()用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。
	// window.addEventListener('scroll', function (e) {
	// 	const documentClientHeight = document.documentElement.clientHeight
	// 	const imgs = document.getElementsByTagName('img')
	//   for (let i = 0, len = imgs.length; i < len; i++) {
	// 		const img = imgs[i]
	// 		if (img.getBoundingClientRect().top < documentClientHeight) {
	// 			img.src = img.dataset.src
	// 		}
	// 	}
	// })
	
	// 3.IntersectionObserver API + DataSet API
	// const observer = new IntersectionObserver(changes => {
	// 	for (let i = 0, len = changes.length; i < len; i++) {
	// 		const item = changes[i]
	// 		if (item.isIntersecting) {
	// 			const img = item.target
	// 			img.src = img.dataset.src
	// 			observer.unobserve(img)
	// 		}
	// 	}
	// })
	// const imgs = document.getElementsByTagName('img')
	// for (let i = 0, len = imgs.length; i < len; i++) {
	// 	observer.observe(imgs[i])
	// }
})()