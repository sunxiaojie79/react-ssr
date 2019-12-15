# 中后台

本项目采用react + express 进行的react同构项目，实现react服务端渲染。

## 一、运行项目

+ 安装依赖

> install

+ 启动本地开发

> npm start


思考题1:
原本用promise.all()来获取数据，但是一旦有某个接口出错，promise.all()便会报错，则其他接口也不会返回数据。
解决思路,
把所有的请求用promise封装一次，无论接口是否出错，都用resolve接住，于是promise.all便不会报错。