# http方法

1. GET
2. POST：跟PUT相比主要强调创建
3. OPTIONS：询问⽀持的请求⽅法，⽤来跨域请求
4. PUT：强调更新
5. DELETE


> 扩展：GET 和 POST 区别？
参数传递位置不同
参数长度限制（实际是浏览器对url长度的限制）
安全性 POST 更高
GET 只能进行 url 编码，POST 支持多种编码方法
GET 请求浏览器会主动cache
GET请求参数会保存在浏览历史里，POST不会
两者本质都是 **TCP 链接**，并无差别，由于浏览器和HTTP规定才会产生差别，GET产生一个TCP数据包，POST产生两个，GET 只发送包含请求行和请求头的数据包，POST还会额外发送一个包含请求体（即提交的数据）的数据包

> 扩展：简单请求和复杂请求（cors）
复杂请求会预先发送 options 请求，服务器验证 options 完成后才会允许发送实际的 http 请求（http 预检）
变成复杂请求的条件：使用GET、POST、HEAD以外的方法；设置Accept、Accept-Language、Content-Language、Content-Type之外的其他首部字段；Content-Type设置了text/plain、multipart/form-data、application/x-www-form-urlencoded之外的值

