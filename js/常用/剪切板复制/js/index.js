function handleClick() {
	// 1.navigator.clipboard.writeText
	// navigator.clipboard.writeText(document.getElementById('content').innerText);
	
	// 2.document.execCommand(老式浏览器兼容)
	const selection = window.getSelection()
	const range = document.createRange()
	range.selectNodeContents(document.getElementById('content')) // RangeAPI: 制造区域
	selection.addRange(range) // Selection: 选中区域
	selectedText = selection.toString()
	document.execCommand("copy")
	
	// 第三方库
	// clipboard-copy
}

function handleGetClipBoardContent() {
	navigator.permissions.query({ name:'clipboard-read' }).then(async function (result) {
	  if (result.state === 'granted') {
	    console.log(result)
			const text = await navigator.clipboard.readText();
			console.log(text)
	  } else if (result.state === 'prompt') {
	    console.log(result)
			const text = await navigator.clipboard.readText();
			console.log(text)
	  }
	  // 如果没有此权限则不什么也做
	});
}