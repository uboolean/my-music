# my-music

## 说明
本人从事安全,非前端,只是假期了解了Vue之后感兴趣写了这个播放器,播放器使用Vue2+axios以及vuetify编写,后端api来源与GitHub作者Binaryify(网易云api)和jsososo(咪咕api)
播放器支持在线播放以及无损音质下载.由于是边写边设计所以整体架构非常烂,以后有时间才会再更新这个项目

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

## 使用说明

### 咪咕音乐api如果跨域使用需要在app.ts文件中添加如下内容
```
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    // 为了安全，可指定域名白名单，此处为所有域名都可访问，配置多个域名白名单不可直接写数组，要判断条件后赋值单个域名
    // res.header("Access-Control-Allow-Origin", "http://localhost:8080",'http://www.baidu.com'); 
    // 也可以这样写上多个白名单的地址
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});
```

### 界面展示

#### 搜索界面

![](README/IMG/Snipaste_2022-07-25_16-30-08.png)

![](README/IMG/miguplay.png)



#### 下载界面

![](README/IMG/migudo.play.png)

![](README/IMG/Snipaste_2022-07-25_16-30-44.png)



See [Configuration Reference](https://cli.vuejs.org/config/).
