var config = {
  port: 8081, //服务在本地运行的端口，如果不准备分配域名，请使用80（需要高级权限）
  timeout: 2000, //设置适当的超时时间，以免出错
  ua:
    "Mozilla/5.0 (Linux; Android 9; Pixel 2 XL Build/PPP3.180510.008; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/67.0.3396.87 Mobile Safari/537.36" //设置User-Agent，比较玄学，没必要改
};
module.exports = config;
