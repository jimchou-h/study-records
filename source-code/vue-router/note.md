# 1.history模式和hash模式的区别

	原理：
		hash原理：hash通过监听浏览器的 onhashchange() 事件变化，查找对应的路由规则
		history原理： 利用 H5 的 history 中新增的两个API pushState() 和 replaceState() 和一个事件 onpopstate 监听URL变化

	1.hash模式在url上会多一个#号，会丑点
	
	2.hash值不会导致浏览器向服务器发起请求，#后面的字段不会出现在HTTP请求中，对后端没有影响，history需要后端配置无论访问啥，都返回当前的html界面
	
	3.history模式是H5新特性，兼容会差点
	
	4.pushState设置的新URL可以是与当前URL同源的任意URL；而hash只可修改#后面的部分，故只可设置与当前同文档的URL
	
	5.pushState() 设置的新 URL 可以与当前 URL 一模一样，这样也会把记录添加到栈中；而 hash 设置的新值必须与原来不一样才会触发动作将记录添加到栈中；