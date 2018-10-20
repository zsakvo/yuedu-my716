var config = {
  port: 8081, //服务在本地运行的端口，如果不准备分配域名，请使用80（需要高级权限）
  timeout: 2000, //设置适当的超时时间，以免出错
  ua:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36" //设置User-Agent，比较玄学，没必要改
};
module.exports = config;
