## 前言
玩客云接口的破解和后端api都已经分析了，那些都是看不见的，而展现在用户面前的是前端的web或者微信的小程序。
由于一开始还不会小程序就先用react写了一个前端，写的比较乱，将就能用，也没有系统做过前端，借此机会来动手实践下。主要是不想用很重的app来实现，毕竟稍微看下，操作下就行，不需要非常好的用户体验。好了，我们还是具体看下吧。
## 框架
 - React
 
 使用的react框架，本来想用vue的，其实都差不多
 - Antd/Antd-mobile
 
 感觉蚂蚁的antd比较好看，就使用了这个框架

## 效果介绍
 - 行情
 <p align="center">
	<img src="https://img-blog.csdnimg.cn/20190420090558742.png" alt="行情"  width="300" height="460">
	<p align="center">
<!-- 		<em>行情</em> -->
	</p>

该页面主要是链克的产量和链克的一些排行榜

 - 账号
<p align="center">
	<img src="https://img-blog.csdnimg.cn/20190420090623751.png" alt="账号"  width="300" height="460">
	<p align="center">
<!-- 		<em>账号</em> -->
	</p>

展示所有添加的账号的详情，包括添加账号功能，删除账号，提取链克等功能

 - 链克
 <p align="center">
	<img src="https://img-blog.csdnimg.cn/20190420090633374.png" alt="链克"  width="300" height="460">
	<p align="center">
<!-- 		<em>链克</em> -->
	</p>

显示近期和全部链克产量，并显示近7天的趋势图

 - 我的
 <p align="center">
	<img src="https://img-blog.csdnimg.cn/20190420090652607.png" alt="我的"  width="300" height="460">
	<p align="center">
<!-- 		<em>我的</em> -->
	</p>

主要是绑定邮箱，关于我们，退出登录等功能

 - 登录注册
当然少不了登录注册的功能，这里就不贴图了

## 源码目录
源码结构比较简单，使用了react脚手架来新建的工程，然后就可以在内部添加我们需要的代码了。我们主要看下各个页面实现：
```
src
  - component 各个页面和组件
  - image     图片资源
  - router    路由规则
  - store     存储的数据
  - style     css各个样式
  - utils     工具类，包括网络请求等
```
 - 闪页，广告等 (component/SplashView.jsx)
 
 - 主页 (component/Home.jsx)
 使用了底部4个Tab的方式，类似支付宝的底部功能，点击可以进入到各个页面中。
 
 - 行情页面（component/LTKMarket.jsx）

 - 账号页面 (component/AccountInfoView.jsx)
 
 - 链克页面 (component/LTKInfo.jsx) 
 
 - 我的页面 (component/Settings.jsx)
 
 - 登录页面 (component/Login.jsx)
 
 - 注册页面 (component/Register.jsx)
 
 - 关于页面 (component/About.jsx)
 
 - 支持页面 (component/Tipping.jsx)

 - 帮助页面 (component/Help.jsx)

本以为挺少的内容，没想到写出来页面也挺多的。基本上代码都在上面了，如果要参考修改，可以查看github源码，记得给个star
