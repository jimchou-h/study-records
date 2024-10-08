# http版本升级优化内容

**http1.0 -> http1.1**
1. 默认长链接 keep-alive，多个请求服用同一个 tcp 链接（但是会导致队头阻塞问题）
2. 新增请求方法，PUT、HEAD、OPTIONS等
3. 支持ETag请求头（协商缓存，根据文件内容判断）
4. 支持Range请求头断点续传（从服务器下载）
5. 支持host请求头来指定服务器的域名

**http1.1 -> http2.0**
1. 二进制协议，通过帧传输
2. 多路复用（基于二进制协议实现）：允许在同一个tcp链接上同时发送多个流，服务器也能并行响应（解决队头阻塞问题）
3. 数据流：http2.0的数据包是不按顺序发送的，每个请求和回应的所有数据包，称为一个数据流，有唯一的编号用来标识
4. 头部压缩：使用HPACK算法（即在后端维护一个字典，不变的话前端传对应的编号即可），然后使用 gzip 或 compress 压缩后再发送
5. 允许服务器主动推送资源

> 流：HTTP/2.0中用于标识和管理双向通信的逻辑通道。每个流都有自己的标识符，用于在连接上唯一标识该流。流是HTTP/2.0中数据传输和处理的基本单位之一
帧：是HTTP/2.0中实际传输数据的最小单位。每个帧包含有关帧类型、数据长度、流标识符等信息。不同类型的帧用于传输不同的数据，例如HEADERS帧用于传输头部信息，DATA帧用于传输实际的数据片段
**一个流可以存放多个帧**

**http2.0 -> http3.0**
1. 基于 QUIC 协议
2. 多路复用，每个 QUIC 链接同样可以承载多个数据流，性能更佳
3. 头部压缩，使用性能更高的 QPACK 算法
4. 0-RTT 连接复用：在重新连接到同一服务器时，使用之前的密钥和状态信息进行快速重连，减少了握手时间
5. 抗丢包和拥塞控制：内建了拥塞控制和重传机制，能够更好地适应现代网络环境中的丢包和拥塞情况，提高了网络性能