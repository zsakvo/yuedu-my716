# yuedu-my716

## 描述

中转追书神器内部源（book.my716.com），为「阅读」提供数据。

## 准备

首先你的系统需要安装有 Node.js 以及 Git。

可以从官网获取相关安装包，亦可以通过仓库或者类似于[nvm](https://github.com/creationix/nvm "nvm")等脚本进行安装。

## 安装 / 更新 / 卸载

启动终端（Windows 为命令提示符或者 Powershell），执行命令

```
git clone https://github.com/zsakvo/yuedu-my716.git
cd yuedu-my716/
# 亦可以直接下载源码包而后解压之
npm i
```

至此，必要的模块安装成功。

## 配置

找到`config.js`，仅有的几个配置项均由此文件控制，按照内部注释自行修改相关值即可（改完别忘记保存）

## 使用

直接执行命令

```
node app.js
```

按照提示访问网址生成书源即可

值得注意的是，如果你要把这个程序运行在 80 端口，可能会需要以 root 权限执行。

## ToDo

- [ ] 有空再说
