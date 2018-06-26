<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" import="java.util.Map,com.swn.common.util.PropertiesUtil" isErrorPage="true"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%response.setStatus(HttpServletResponse.SC_OK);%>
<c:set 
value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
var="basePath" />
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <title>商城后台主页</title>
    <jsp:include page="commons/jsp/common.jsp"></jsp:include>
    <style>
    	#first-side-menu > li:nth-child(1) > div > a{
    		padding:0;
    		width:100%;
    		height:100%;
    		border-radius:50%
    	}
    	
    	body{
    		font-family:"微软雅黑";
    	}
    	a {
		    color: #CACACA;
		    display: block;
		    padding-left: 18px;
		}
		a:hover, a:focus {
		    color: #07d;
		    text-decoration: none;
		}
		.second_menuItem{
		    color: #666;
		    display: block;
		    padding: 0 10px;
		}
		.pc-second-sidebar .layui-nav .layui-nav-item.active{
			background:#DCDCDC;
		}
		.pc-second-sidebar .layui-nav .layui-nav-item.active a {
			color: #009688;
		}
		.notice-nav {
		    position: fixed;
		    bottom: 0;
		    right: 0;
		    -webkit-box-shadow: 0 0 2px 0 rgba(0,0,0,0.2);
		    box-shadow: 0 0 2px 0 rgba(0,0,0,0.2);
		    z-index: 1010;
		}
		.notice-nav a {
		    display: inline-block;
		    width: 125px;
		    height: 40px;
		    line-height: 40px;
		    text-align: center;
		    font-size: 12px;
		    text-decoration: none;
		    border-left: 1px solid rgba(0,0,0,0.08);
		    color: #666;
		    background: #fff;
		}
		.notice-nav a {
		    cursor: pointer;
		}
		.notice-nav a .icon {
		    vertical-align: middle;
		    width: 18px;
		    height: 18px;
		    background-position: center;
		    background-size: cover;
		}
		.notice-nav a .icon-message {
		    background-image: url(${basePath}/tools/static/images/2.png);
		}
		.notice-nav a .icon-notice {
		    background-image: url(${basePath}/tools/static/images/1.png);
		}
		.noticePanel {
		    position: fixed;
		    right: 0;
		    top: 0;
		    width: 450px;
		    height: 100%;
		    z-index: 1050;
		    background: #fff;
		    overflow-y: auto;
		    -webkit-box-shadow: -2px 0 4px rgba(0,0,0,0.1);
		    box-shadow: -2px 0 4px rgba(0,0,0,0.1);
		}
		.noticePanel__title {
		    position: fixed;
		    top: 0;
		    right: 0;
		    width: 450px;
		    padding: 15.5px 10px;
		    border-bottom: 1px solid #E5e5e5;
		    background: #fff;
		}
		.emptyPanel, .closedPanel {
		    text-align: center;
		    padding-top: 100px;
		    color: #999;
		}
		.noticePanel__footer {
		    position: fixed;
		    bottom: 0;
		    right: 0;
		    width: 450px;
		    padding: 15px 0;
		    background: #f8f8f8;
		    border-top: 1px solid #E5e5e5;
		    border-left: 1px solid #E5e5e5;
		}
		.zent-switch {
			position: relative;
			display: inline-block;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			width: 70px;
			height: 40px;
			line-height: 20px;
			vertical-align: middle;
			border-radius: 20px;
			border: 1px solid #999;
			background-color: #999;
			cursor: pointer;
			-webkit-transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
			-moz-transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
			transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86)
		}
		
		.zent-switch .zent-switch-inner {
			color: #fff;
			font-size: 12px;
			position: absolute;
			left: 39px;
			top: 9px;
			-webkit-transition: left 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
			-moz-transition: left 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
			transition: left 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none
		}
		
		.zent-switch:after {
			position: absolute;
			width: 34px;
			height: 34px;
			left: 2px;
			top: 2px;
			border-radius: 100%;
			background-color: #fff;
			content: " ";
			cursor: pointer;
			-webkit-transition: left 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
			-moz-transition: left 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
			transition: left 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86)
		}
		
		.zent-switch:focus {
			outline: 0
		}
		
		.zent-switch:focus:hover {
			-webkit-box-shadow: none;
			box-shadow: none
		}
		.zent-switch-small .zent-switch-inner {
			display: none
		}
		
		.zent-switch-small:after {
			width: 16px;
			height: 16px;
			top: 1px;
			left: 1px
		}
		
		.zent-switch-small.zent-switch-checked:after {
			left: 16px
		}
		
		.zent-switch-checked {
			border-color: #4b0;
			background-color: #4b0
		}
		
		.zent-switch-checked .zent-switch-inner {
			left: 6px;
			top: 9px
		}
		
		.zent-switch-checked:after {
			left: 32px
		}
		
		.zent-switch-disabled {
			cursor: not-allowed;
			background: #f2f2f2;
			border-color: #f2f2f2
		}
		
		.zent-switch-disabled.zent-switch-checked {
			background: #83e5a7;
			border-color: #83e5a7
		}
		
		.zent-switch-disabled:after {
			background: #fff;
			cursor: not-allowed
		}

		.icon--setting {
		    width: 16px;
		    height: 16px;
		    background-image: url(${basePath}/tools/static/images/4.png);
		}
		.icon {
		    display: inline-block;
		    vertical-align: middle;
		    margin-right: 5px;
		    background-position: center;
		    background-size: contain;
		}
		.emptyPanel .icon--empty, .notice-center .closedPanel .icon--empty {
		    width: 90px;
		    height: 90px;
		    background-image: url(${basePath}/tools/static/images/3.png);
		    background-size: contain;
		    background-position: center;
		}
		.settingPanel {
		    position: fixed;
		    top: 0;
		    right: 0;
		    width: 450px;
		    height: 100%;
		    background: #fff;
		    border-left: 1px solid #E5e5e5;
		    z-index: 1060;
		}
		.settingPanel__title {
		    padding: 15px 20px;
		    border-bottom: 1px solid #E5e5e5;
		}
		.settingPanel .settingItem {
		    margin: 0 20px;
		    padding: 34px 0;
		    border-bottom: 1px solid #E5e5e5;
		}
		.zent-switch-checked {
		    border-color: #4b0;
		    background-color: #4b0;
		}
		.zent-switch-small {
		    width: 35px;
		    height: 20px;
		    line-height: 10px;
		}
		.zent-switch .zent-switch-inner {
		    color: #fff;
		    font-size: 12px;
		    position: absolute;
		    left: 39px;
		    top: 9px;
		    -webkit-transition: left 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
		    -moz-transition: left 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
		    transition: left 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
		    -webkit-user-select: none;
		    -moz-user-select: none;
		    -ms-user-select: none;
		    user-select: none;
		}
		.notice-nav a.active {
		    background: #f60;
		    color: #fff;
		}
		.notice-nav a.active  .icon-notice{
			background-image: url(${basePath}/tools/static/images/5.png);
		}
		.notice-nav a.active .unread-badge {
		    display: inline-block;
		    vertical-align: middle;
		    padding: 4px 8px;
		    line-height: 12px;
		    border-radius: 10px;
		    background: #fff;
		    color: #f60;
		    margin-left: 4px;
		}
		
		
		.noticePanel .noticeList {
			padding-top: 50px;
			padding-bottom: 70px;
			height: 100%;
			overflow-y: auto;
		}
		.noticePanel .noticeItem {
			margin: 20px 20px 0 20px;
			border: 1px solid #E5e5e5;
			border-radius: 2px;
		}
		.noticePanel .noticeItem__title {
			margin: 0;
			font-weight: normal;
			padding: 12px 10px;
			background: #f8f8f8;
			border-bottom: 1px solid #E5e5e5;
		}
		.noticePanel .noticeItem__more{
			font-size: 12px;
		}
		.noticeItem__title a{
			color:#3388FF;
		}
		.noticePanel .noticeItem__container {
			height: 102px;
			padding: 15px 10px 15px 5px;
		}
		.noticePanel .noticeItem ul {
			padding-left: 10px;
			margin: 0;
			list-style: none;
		}
		.noticePanel .noticeItem__content {
			font-size: 12px;
			line-height: 2;
			width: 100%;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
		.noticePanel .noticeItem__content:before {
			content: '';
			display: inline-block;
			margin-right: 5px;
			width: 10px;
			height: 10px;
			background: url(${basePath}/tools/static/images/6.png) no-repeat center center;
			background-size: 10px;
			float:left;
			margin-top:7px;
		}
		.noticePanel .noticeItem__content a {
			color: #666;
			text-decoration: none;
		}
		.noticeItem__title .noticeItem__badge{
		    display: inline-block;
		    vertical-align: middle;
		    padding: 4px 6px;
		    line-height: 12px;
		    border-radius: 10px;
		    background: #f60;
		    color: #fff;
		    margin-left: 4px;
		}
    </style>
</head>
<body>
    <!--左侧导航开始-->
    <nav class="sidebar-container" >
    <% 
	    String user = (String) session.getAttribute("login_user");
	    
	    if("swnShopAdmin".equals(user)){
    %>
    
    <div id="pc-first-sidebar" class="layui-inline">
            <ul class="layui-nav layui-inline layui-nav-tree" id="first-side-menu">
                <li class="layui-nav-item no-secondMenu" style="background-color:#333333!important">
               		<a class="round-head" href="${basePath}/pages/webstore/storemanage/storeInfo.jsp">
                   		<img class="headImg" src="" alt="" style="border-radius:50%">
                   	</a>
                </li>
                <li class="layui-nav-item no-secondMenu layui-this">
                    <span class="sidebar-icon sidebar-icon-dashboard"></span>
                    <a href="${basePath}/pages/webstore/storemanage/storeInfo.jsp" >概况</a>
                </li>
                <li class="layui-nav-item">
                    <span class="sidebar-icon sidebar-icon-shop"></span><a href="javascript:">店铺</a>
                </li>
                <li class="layui-nav-item">
                    <span class="sidebar-icon sidebar-icon-goods"></span><a href="javascript:">商品</a>
                </li>
                <li class="layui-nav-item">
                    <span class="sidebar-icon sidebar-icon-order"></span><a href="javascript:">订单</a>
                </li>
                <li class="layui-nav-item">
                    <span class="sidebar-icon sidebar-icon-fans"></span><a href="javascript:">客户</a>
                </li>
                <!-- <li class="layui-nav-item">
                    <span class="sidebar-icon sidebar-icon-data"></span><a href="javascript:">数据</a>
                </li>
                <li class="layui-nav-item">
                    <span class="sidebar-icon sidebar-icon-asset"></span><a href="javascript:">资产</a>
                </li> -->
                <li class="layui-nav-item">
                    <span class="sidebar-icon sidebar-icon-app"></span><a href="javascript:">营销</a>
                </li> 
                <li class="layui-nav-item">
                    <span class="sidebar-icon sidebar-icon-setting"></span><a href="javascript:">设置</a>
                </li>
                <li class="layui-nav-item  no-secondMenuOut sidebar-icon-exit" >
                     <span class="sidebar-icon sidebar-icon-exit"></span>
                     <a name="logout">退出</a> 
                </li>
                
            </ul>
        </div>
        <div class="pc-second-sidebar layui-inline">
			<!-- 对应头像 -->
            <ul class="layui-nav layui-inline layui-nav-tree layui-hide" style="display:none!important;">
            	<!-- 没有二级菜单时，给占位的ul添加display:none!important，强制其不显示 -->
            </ul>
           	<!-- 对应概况 -->
            <ul class="layui-nav layui-inline layui-nav-tree layui-hide" style="display:none!important;">
            	<!-- 没有二级菜单时，给占位的ul添加display:none!important，强制其不显示 -->
            </ul>
            	
           
            <ul class="layui-nav layui-inline layui-nav-tree layui-hide">
                <li>
                    <span>店铺管理</span>
                </li>
                <!-- <li class="layui-nav-item">
                    <a class="second_menuItem" href="form1.html">店铺概况</a>
                </li> -->
                <li class="layui-nav-item">
                    <a class="second_menuItem" href="${basePath}/pages/webstore/webpage/pageinfoTab.jsp">微页面</a>
                </li>
               <%--  <li class="layui-nav-item">
                    <a class="second_menuItem" href="${basePath}/webstore/memberIndex/toMemberIndex.action">会员主页</a>
                </li> --%>
               <%-- 
               <li class="layui-nav-item">
                    <a class="second_menuItem" href="${basePath}/pages/demo/tab/tabDemo.jsp">demo</a>
                </li> --%>
                <li class="layui-nav-item">
                    <a class="second_menuItem" href="${basePath}/pages/webstore/storenavi/storeNaviIndex.jsp">店铺导航</a>
                </li>
               <%--  <li class="layui-nav-item">
                    <a class="second_menuItem" href="index_v5.html">全店风格</a>
                </li>
                <li class="layui-nav-item">
                    <a class="second_menuItem" href="${basePath}/pages/demo/tab/demo1.jsp">公共广告</a>
                </li>
                <li class="layui-nav-item">
                    <a class="second_menuItem" href="index_v5.html">自定义模块</a>
                </li>  --%>
                <li class="layui-nav-item">
                    <a class="second_menuItem" href="${basePath}/pages/webstore/mydoc/myDocument.jsp">我的文件</a>
                </li>
            </ul>
            <ul class="layui-nav layui-inline layui-nav-tree layui-hide">
                <li>
                    <span>商品管理</span>
                </li>
                <li class="layui-nav-item">
                    <a class="second_menuItem" href="${basePath}/pages/commodity/manage/commodityList.jsp">商品管理</a>
                </li>
                <li class="layui-nav-item">
                    <a class="second_menuItem" href="${basePath}/pages/commodity/group/commodityGroupList.jsp">商品分组</a>
                </li>
               <!--  <li class="layui-nav-item">
                    <a class="second_menuItem" href="graph_morris.html">商品页模板</a>
                </li>
                <li class="layui-nav-item">
                    <a class="second_menuItem" href="graph_rickshaw.html">商品导入</a>
                </li>
                <li class="layui-nav-item">
                    <a class="second_menuItem" href="graph_peity.html">分销商品</a>
                </li> -->
            </ul>
            <ul class="layui-nav layui-inline layui-nav-tree layui-hide">
                <li>
                    <span>订单管理</span>
                </li>
                <!-- <li class="layui-nav-item"><a class="second_menuItem" href="mailbox.html">订单概况</a>
                </li> -->
                <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/order/allorder/allOrder.jsp">所有订单</a>
                </li>
                <!-- <li class="layui-nav-item"><a class="second_menuItem" href="mail_compose.html">加星订单</a>
                </li> -->
                <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/order/temporaryOrder/allOrder.jsp">临时订单</a>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/order/shareorder/shareOrder.jsp">分享订单</a>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/order/refundrights/rightsOrder.jsp">退款维权</a>
                </li>
              	<li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/order/evaluate/evaluate.jsp">评价管理</a>
                </li>
                <!--   
                <li class="layui-nav-item"><a class="second_menuItem" href="mail_compose.html">分销采购单</a>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="mail_compose.html">批量发货</a>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="mail_compose.html">订单设置</a>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="mail_compose.html">快速打单</a>
                </li> -->
            </ul>
            <ul class="layui-nav layui-inline layui-nav-tree layui-hide">
                <li>
                    <span>客户经营</span>
                </li>
                <!-- <li class="layui-nav-item"><a class="second_menuItem" href="contacts.html">客户概况</a>
                </li> -->
                <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/customer/customerinfo/customerList.jsp">客户管理</a>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/customer/member/memberList.jsp">会员管理</a>
                </li>
                <!-- <li class="layui-nav-item"><a class="second_menuItem" href="teams_board.html">会员卡</a>
                </li> -->
                <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/customer/label/labelList.jsp">标签管理</a>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/customer/integral/integralList.jsp">积分管理</a>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/customer/fans/fansList.jsp">粉丝管理</a>
                </li>
            </ul>
            <!-- <ul class="layui-nav layui-inline layui-nav-tree layui-hide">
                <li>
                    <span>数据中心</span>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="contacts.html">数据概况</a>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="profile.html">粉丝分析</a>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="#">页面流量</a>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="teams_board.html">来源监控</a>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="social_feed.html">商品分析</a>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="clients.html">交易分析</a>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="file_manager.html">扫码统计</a>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="calendar.html">卡券统计</a>
                </li>
            </ul>
            <ul class="layui-nav layui-inline layui-nav-tree layui-hide">
                <li>
                    <span>资产中心</span>
                </li>
                <li class="layui-nav-item">
                    <a class="second_menuItem" href="typography.html">我的收入</a>
                </li>
                <li class="layui-nav-item">
                    <a class="second_menuItem" href="1.html">储值资金</a>
                </li>
                <li class="layui-nav-item">
                    <a class="second_menuItem" href="#">交易记录</a>
                </li>
                <li class="layui-nav-item">
                    <a class="second_menuItem" href="buttons.html">对账单</a>
                </li>
                <li class="layui-nav-item">
                    <a class="second_menuItem" href="tabs_panels.html">提现记录</a>
                </li>
                <li class="layui-nav-item">
                    <a class="second_menuItem" href="notifications.html">保证金记录</a>
                </li>
                <li class="layui-nav-item">
                    <a class="second_menuItem" href="badges_labels.html">不可用余额</a>
                </li>
                <li class="layui-nav-item">
                    <a class="second_menuItem" href="grid_options.html">服务市场</a>
                </li>
                <li class="layui-nav-item">
                    <a class="second_menuItem" href="plyr.html">订购关系</a>
                </li>
                <li class="layui-nav-item">
                    <a class="second_menuItem" href="#">发票管理</a>
                </li>
            </ul> -->
            <ul class="layui-nav layui-inline layui-nav-tree layui-hide">
                <li>
                    <span>应用和营销</span>
                </li>
                <!-- 
                <li class="layui-nav-item"><a class="second_menuItem" href="table_basic.html">营销中心</a>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="table_data_tables.html">我要推广</a>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="table_jqgrid.html">模版市场</a>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="table_foo_table.html">开放平台</a>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="table_bootstrap.html">APP开店</a> 
                </li>
                -->
                <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/marketing/coupon/couponList.jsp">优惠券</a>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/marketing/groupon/grouponList.jsp">多人拼团</a>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/marketing/discount/discountList.jsp">限时折扣</a>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/marketing/param/paramSet.jsp">参数设置</a>
                </li>
            </ul>
            <ul class="layui-nav layui-inline layui-nav-tree layui-hide">
                <li>
                    <span>设置</span>
                </li>
<!--            <li class="layui-nav-item"><a class="second_menuItem" href="basic_gallery.html">店铺信息</a>
                </li>
                <li class="layui-nav-item"><a class="second_menuItem" href="carousel.html">服务协议</a>
                </li> -->
                <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/cm/empmanage/empmanage.jsp">员工管理</a>
                </li>
<!--             <li class="layui-nav-item"><a class="second_menuItem" href="blueimp.html">支付/交易</a>
                 </li>
                 <li class="layui-nav-item"><a class="second_menuItem" href="blueimp.html">消费保障</a>
                 </li>  -->
                <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/cm/orderset/orderset.jsp">订单设置</a>
                </li>
                <!--   
              	<li class="layui-nav-item"><a class="second_menuItem" href="blueimp.html">通用设置</a>
                </li> -->
            </ul>
            <!-- 对应退出 -->
            <ul class="layui-nav layui-inline layui-nav-tree layui-hide" style="display:none!important;">
            	<!-- 没有二级菜单时，给占位的ul添加display:none!important，强制其不显示 -->
            </ul>
        </div>
    
    <%} 
	    else {
    %>
        <div id="pc-first-sidebar" class="layui-inline">
                <ul class="layui-nav layui-inline layui-nav-tree" id="first-side-menu">
                    <li class="layui-nav-item no-secondMenu" style="background-color:#333333!important">
                   		<a class="round-head" href="${basePath}/pages/webstore/storemanage/storeInfo.jsp">
                       		<img class="headImg" src="" alt="" style="border-radius:50%">
                       	</a>
                    </li>
                    <li class="layui-nav-item no-secondMenu layui-this">
                        <span class="sidebar-icon sidebar-icon-dashboard"></span>
                        <a href="${basePath}/pages/webstore/storemanage/storeInfo.jsp" >概况</a>
                    </li>
                    <!-- <li class="layui-nav-item">
                        <span class="sidebar-icon sidebar-icon-shop"></span><a href="javascript:">店铺</a>
                    </li> -->
                    <li class="layui-nav-item">
                        <span class="sidebar-icon sidebar-icon-goods"></span><a href="javascript:">商品</a>
                    </li>
                    <li class="layui-nav-item">
                        <span class="sidebar-icon sidebar-icon-order"></span><a href="javascript:">订单</a>
                    </li>
                    <li class="layui-nav-item">
                        <span class="sidebar-icon sidebar-icon-fans"></span><a href="javascript:">客户</a>
                    </li>
                    <!-- <li class="layui-nav-item">
                        <span class="sidebar-icon sidebar-icon-data"></span><a href="javascript:">数据</a>
                    </li>
                    <li class="layui-nav-item">
                        <span class="sidebar-icon sidebar-icon-asset"></span><a href="javascript:">资产</a>
                    </li> -->
                    <!-- <li class="layui-nav-item">
                        <span class="sidebar-icon sidebar-icon-app"></span><a href="javascript:">营销</a>
                    </li> --> 
                   <!--  <li class="layui-nav-item">
                        <span class="sidebar-icon sidebar-icon-setting"></span><a href="javascript:">设置</a>
                    </li> -->
                    <li>
                     <a></a>
                    </li>
                    <li>
                     <a></a>
                    </li>
                    <li>
                     <a></a>
                    </li>
                    <li class="layui-nav-item  no-secondMenuOut sidebar-icon-exit" >
                        <span class="sidebar-icon sidebar-icon-exit"></span>
                        <a name="logout">退出</a> 
                    </li>
                    
                </ul>
            </div>
            <div class="pc-second-sidebar layui-inline">
    			<!-- 对应头像 -->
                <ul class="layui-nav layui-inline layui-nav-tree layui-hide" style="display:none!important;">
                	<!-- 没有二级菜单时，给占位的ul添加display:none!important，强制其不显示 -->
                </ul>
               	<!-- 对应概况 -->
                <ul class="layui-nav layui-inline layui-nav-tree layui-hide" style="display:none!important;">
                	<!-- 没有二级菜单时，给占位的ul添加display:none!important，强制其不显示 -->
                </ul>
                	
                <ul class="layui-nav layui-inline layui-nav-tree layui-hide">
                    <li>
                        <span>商品管理</span>
                    </li>
                    <li class="layui-nav-item">
                        <a class="second_menuItem" href="${basePath}/pages/commodity/manage/commodityList.jsp">商品管理</a>
                    </li>
                    <li class="layui-nav-item">
                        <a class="second_menuItem" href="${basePath}/pages/commodity/group/commodityGroupList.jsp">商品分组</a>
                    </li>
                   <!--  <li class="layui-nav-item">
                        <a class="second_menuItem" href="graph_morris.html">商品页模板</a>
                    </li>
                    <li class="layui-nav-item">
                        <a class="second_menuItem" href="graph_rickshaw.html">商品导入</a>
                    </li>
                    <li class="layui-nav-item">
                        <a class="second_menuItem" href="graph_peity.html">分销商品</a>
                    </li> -->
                </ul>
                <ul class="layui-nav layui-inline layui-nav-tree layui-hide">
                    <li>
                        <span>订单管理</span>
                    </li>
                    <!-- <li class="layui-nav-item"><a class="second_menuItem" href="mailbox.html">订单概况</a>
                    </li> -->
                    <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/order/allorder/allOrder.jsp">所有订单</a>
                    </li>
                    <!-- <li class="layui-nav-item"><a class="second_menuItem" href="mail_compose.html">加星订单</a>
                    </li> -->
                    <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/order/temporaryOrder/allOrder.jsp">临时订单</a>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/order/shareorder/shareOrder.jsp">分享订单</a>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/order/refundrights/rightsOrder.jsp">退款维权</a>
                    </li>
                  	<li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/order/evaluate/evaluate.jsp">评价管理</a>
                    </li>
                    <!--   
                    <li class="layui-nav-item"><a class="second_menuItem" href="mail_compose.html">分销采购单</a>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="mail_compose.html">批量发货</a>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="mail_compose.html">订单设置</a>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="mail_compose.html">快速打单</a>
                    </li> -->
                </ul>
                <ul class="layui-nav layui-inline layui-nav-tree layui-hide">
                    <li>
                        <span>客户经营</span>
                    </li>
                    <!-- <li class="layui-nav-item"><a class="second_menuItem" href="contacts.html">客户概况</a>
                    </li> -->
                    <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/customer/customerinfo/customerList.jsp">客户管理</a>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/customer/member/memberList.jsp">会员管理</a>
                    </li>
                    <!-- <li class="layui-nav-item"><a class="second_menuItem" href="teams_board.html">会员卡</a>
                    </li> -->
                    <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/customer/label/labelList.jsp">标签管理</a>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/customer/integral/integralList.jsp">积分管理</a>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/customer/fans/fansList.jsp">粉丝管理</a>
                    </li>
                </ul>
                <!-- 
                <ul class="layui-nav layui-inline layui-nav-tree layui-hide">
                    <li>
                        <span>数据中心</span>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="contacts.html">数据概况</a>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="profile.html">粉丝分析</a>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="#">页面流量</a>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="teams_board.html">来源监控</a>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="social_feed.html">商品分析</a>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="clients.html">交易分析</a>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="file_manager.html">扫码统计</a>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="calendar.html">卡券统计</a>
                    </li>
                </ul>
                <ul class="layui-nav layui-inline layui-nav-tree layui-hide">
                    <li>
                        <span>资产中心</span>
                    </li>
                    <li class="layui-nav-item">
                        <a class="second_menuItem" href="typography.html">我的收入</a>
                    </li>
                    <li class="layui-nav-item">
                        <a class="second_menuItem" href="1.html">储值资金</a>
                    </li>
                    <li class="layui-nav-item">
                        <a class="second_menuItem" href="#">交易记录</a>
                    </li>
                    <li class="layui-nav-item">
                        <a class="second_menuItem" href="buttons.html">对账单</a>
                    </li>
                    <li class="layui-nav-item">
                        <a class="second_menuItem" href="tabs_panels.html">提现记录</a>
                    </li>
                    <li class="layui-nav-item">
                        <a class="second_menuItem" href="notifications.html">保证金记录</a>
                    </li>
                    <li class="layui-nav-item">
                        <a class="second_menuItem" href="badges_labels.html">不可用余额</a>
                    </li>
                    <li class="layui-nav-item">
                        <a class="second_menuItem" href="grid_options.html">服务市场</a>
                    </li>
                    <li class="layui-nav-item">
                        <a class="second_menuItem" href="plyr.html">订购关系</a>
                    </li>
                    <li class="layui-nav-item">
                        <a class="second_menuItem" href="#">发票管理</a>
                    </li>
                </ul> -->
                <%-- 
                <ul class="layui-nav layui-inline layui-nav-tree layui-hide">
                    <li>
                        <span>应用和营销</span>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="table_basic.html">营销中心</a>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="table_data_tables.html">我要推广</a>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="table_jqgrid.html">模版市场</a>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="table_foo_table.html">开放平台</a>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="table_bootstrap.html">APP开店</a> 
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/marketing/coupon/couponList.jsp">优惠券</a>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/marketing/groupon/grouponList.jsp">多人拼团</a>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/marketing/discount/discountList.jsp">限时折扣</a>
              		</li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/marketing/param/paramSet.jsp">参数设置</a>
                    </li>
                </ul> --%>
                <%-- 
                <ul class="layui-nav layui-inline layui-nav-tree layui-hide">
                    <li>
                        <span>设置</span>
                    </li>
    	            <li class="layui-nav-item"><a class="second_menuItem" href="basic_gallery.html">店铺信息</a>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="carousel.html">服务协议</a>
                    </li> -->
                    <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/cm/empmanage/empmanage.jsp">员工管理</a>
                    </li>
               		<li class="layui-nav-item"><a class="second_menuItem" href="blueimp.html">支付/交易</a>
                    </li>
                    <li class="layui-nav-item"><a class="second_menuItem" href="blueimp.html">消费保障</a>
                    </li>  -->
                    <li class="layui-nav-item"><a class="second_menuItem" href="${basePath}/pages/cm/orderset/orderset.jsp">订单设置</a>
                    </li>
                    <!--   
                  	<li class="layui-nav-item"><a class="second_menuItem" href="blueimp.html">通用设置</a>
                    </li>
                </ul> --%>
                <!-- 对应退出 -->
                <ul class="layui-nav layui-inline layui-nav-tree layui-hide" style="display:none!important;">
					<!-- 没有二级菜单时，给占位的ul添加display:none!important，强制其不显示 -->
                </ul> 
            </div>
        
        <%} %>
        
    </nav>
    <!--左侧导航结束-->
    <div class="iframe-container">
        <iframe src="${basePath}/pages/webstore/storemanage/storeInfo.jsp" name="centerPage" id="centerPage" class="index_iframe" 
        	frameborder="0" width="100%" height="1000" ></iframe>
    </div>

    <div id="zhezhao" style="display: none"></div>

	<div id="tongzhi" style="display: none;">
		<div class="noticeItem" style="height: 400px;">
			<h4 class="noticeItem__title">
				发货单提醒
				<span class="noticeItem__badge" id="fahuoCount"></span>
				<!-- <a target="_blank" rel="noopener noreferrer" href="//www.youzan.com/v2/notice/dashboard#4" class="pull-right noticeItem__more">
					更多</a> -->
			</h4>
			<div class="noticeItem__container">
				<ul id="fahuoList">
					
				</ul>
			</div>
		</div>
	</div>

    <script>
	    $.ajax({
			"type":"post",
		    "url": getRootPath()+"/stuInfo/queryHeadUrl.action",
		    "dataType":"text",
		    'success' : function (data) {
		    	$(".headImg").prop("src",data);
		    },
		    'error':function(){
		    }
		});
    
      //注意：导航 依赖 element 模块，否则无法进行功能性操作
      layui.use(['element', "layer" ] ,function(){
        var element = layui.element();
        layer = layui.layer;
        reloadOrder();
      });
      
      var zhezhao = document.getElementById("zhezhao");
      /* index.html内iframe标签内容切换 */
      $(".second_menuItem").click(function () {
	      $(".index_iframe").attr("src",$(this).attr("href"));
	      return false;
      });

      
      $(function () {
    	  /*iframe高度自动调整*/
        function iframeHightChange() {
          $(".index_iframe").attr("height",Number($("#first-side-menu").css("height").replace("px",""))-5);
        }
        iframeHightChange();
        window.onresize = iframeHightChange;
        
        function rightAreaSwitch() {
          var navWidth = $('.sidebar-container').css('width');
          var marginLeftVal =Number(navWidth.replace("px",""));
          marginLeftVal = marginLeftVal + "px";
          $('.iframe-container').css('margin-left',marginLeftVal);
        }
        
        rightAreaSwitch();
        
        var secondMenu = $('.pc-second-sidebar ul');
        
         $('.no-secondMenu').click(function () {
             secondMenu.addClass('layui-hide');
             rightAreaSwitch();
             return false;
           });
         $('.no-secondMenuOut').click(function () {
             secondMenu.addClass('layui-hide');
             rightAreaSwitch();
             return false;
           });
		/*为一级菜单按钮关联二级菜单*/
        $('#first-side-menu>li a').each(function (index) {
        	if (this.className !== 'no-auth'){
	          this.onclick = function () {
	            secondMenu.addClass('layui-hide');
	            $(secondMenu[index]).removeClass('layui-hide');
	            rightAreaSwitch();
	            //选中第一个二级菜单
	            $(secondMenu[index]).children("li").removeClass('active');
	            $(secondMenu[index]).children("li").eq(1).addClass('active');
	            //调用一级菜单第一次点击事件
	            toFirst(index);
	          }
        	}
        })
        /*二级菜单点击后显示背景样式*/
        $('.pc-second-sidebar>ul>li>a').click(function(){
			$(this).parent().addClass("active").siblings().removeClass("active");
		})
        /*用户无权点击的按钮*/
		$(".no-auth").click(function(){
			layer.msg("该帐号没有操作权限。如有问题，请联系店铺管理员。",{
				icon:1,
				time:2000,
				area: '430px',
				skin:'layui-layer-lan'
			})
		})
		$('body').append('<div class="notice-nav"><a class="" target="_blank" rel="noopener noreferrer" href=""><span class="icon icon-message"></span>客户消息</a><a id="notice" class="notice"><span class="icon icon-notice"></span>通知<span class="unread-badge"></span></a></div>');
		$html=$('<div class="noticePanel"><div class="noticePanel__title">通知中心<span class="pull-right icon--close" style="float:right;cursor: pointer;">×</span></div><div class="emptyPanel"><div class="icon icon--empty"></div><p class="panel__tips">暂时没有新通知哦~</p><a href="" class="zent-btn zent-btn-primary-outline">查看历史消息</a></div><div class="noticePanel__footer"><a class="pull-left link--disabled">全部标为已读</a><a class="pull-right setting" style="float:right; color: #3388FF;"><span class="icon icon--setting"></span>通知设置</a></div></div>');
		$set=$('<div class="settingPanel"><div class="settingPanel__title">通知设置<span class="zent-switch-small zent-switch-checked zent-switch"><span class="zent-switch-inner">开启</span></span><span class="pull-right icon--close">×</span></div><div class="settingPanel_list"><div class="settingItem"><span class="settingItem__title">风控消息</span><span class="pull-right"><span class="zent-switch-small zent-switch-checked zent-switch"><span class="zent-switch-inner">开启</span></span></span></div><div class="settingItem"><span class="settingItem__title">订单维权消息</span><span class="pull-right"><span class="zent-switch-small zent-switch-checked zent-switch"><span class="zent-switch-inner">开启</span></span></span></div><div class="settingItem"><span class="settingItem__title">商品评价消息</span><span class="pull-right"><span class="zent-switch-small zent-switch-checked zent-switch"><span class="zent-switch-inner">开启</span></span></span></div><div class="settingItem"><span class="settingItem__title">提现消息</span><span class="pull-right"><span class="zent-switch-small zent-switch-checked zent-switch"><span class="zent-switch-inner">开启</span></span></span></div><div class="settingItem"><span class="settingItem__title">发货单提醒</span><span class="pull-right"><span class="zent-switch-small zent-switch-checked zent-switch"><span class="zent-switch-inner">开启</span></span></span></div></div></div>');
		$('.notice').click(function(){
			$('body').append($html);
			$('.setting').click(function(){
				$('body').append($set);
				$('.settingPanel__title span.zent-switch').click(function(){
					if($(this).hasClass('zent-switch-checked')){ 
				        $(this).removeClass('zent-switch-checked');
				        $('.settingPanel_list span.zent-switch').removeClass('zent-switch-checked');
				    }else{ 
				        $(this).addClass('zent-switch-checked');
				        $('.settingPanel_list span.zent-switch').addClass('zent-switch-checked');
				    }
				})
				$('.settingItem span.zent-switch').click(function(){
					if($(this).hasClass('zent-switch-checked')){ 
				        $(this).removeClass('zent-switch-checked');
				    }else{ 
				        $(this).addClass('zent-switch-checked');				       
				    }
				})
				$('.icon--close').click(function(){
					$set.remove();
				})
			});
			
			//当有消息时弹出此页面
			var map = reloadOrder();
			if(map.count > 0){
	        	var list = map.list;
	        	var fahuoHtml = "";
	        	$.each(list,function(index,item){
	        		fahuoHtml += '<li class="noticeItem__content"><a href="${basePath}/pages/order/allorder/allOrder.jsp?orderStatus=2"><b>发货单提醒</b>请给买家发货，订单编号'+item.order_num+',请您在7天内处理，逾期自动处理。'+'</li>';
	        	});
	        	$('#fahuoList').html(fahuoHtml);
	        	var html = $('#tongzhi').html();
	        	$('.emptyPanel').html(html).css("padding-top","50px").css("padding-bottom","100px");
			}
			
			$('.icon--close').click(function(){
				$html.remove();
			});
		});
		
		
      });
       $("a[name='logout']").click(function(){
    		parent.layer.confirm('确定登出？', {
    			  btn: ['是', '否'] //可以无限个按钮
    			}, function(index, layero){
    				window.location.href="${basePath}/login.jsp"; 
    			}, function(index){
    			  //按钮【按钮二】的回调
    				layer.closeAll('dialog');
    			});
		});
      //每3秒钟查询一次订单信息，查询未支付订单的数量
      window.setInterval(reloadOrder, 3000); 
      var dataMap;
	  function reloadOrder(){
			$.ajax({
				url:getRootPath()+'/order/getWeiPayOrderCount.action',
				type:'post',
				dataType:'json',
				success:function(data){
					dataMap = data;
					var count = data.count;
					if(count > 0){//说明有待发货的订单
						$('#notice').removeClass("notice").addClass("active");
						$('.unread-badge').text(count);
						$('#fahuoCount').text(count);
					}
				}
			});  
			return dataMap;
	  } 
	  
	  //一级菜单点击iframe，默认显示第一个二级菜单页面
      function toFirst(index){
    	  var tohref = "";
    	  if(index==0 || index==1){
              tohref="${basePath}/pages/webstore/storemanage/storeInfo.jsp";
    	  }else if(index==2){
    		  tohref="${basePath}/pages/webstore/webpage/pageinfoTab.jsp";
    	  }else if(index==3){
    		  tohref="${basePath}/pages/commodity/manage/commodityList.jsp";
    	  }else if(index==4){
    		  tohref="${basePath}/pages/order/allorder/allOrder.jsp";
    	  }else if(index==5){
    		  tohref="${basePath}/pages/customer/customerinfo/customerList.jsp";
    	  }else if(index==6){
    		  tohref="${basePath}/pages/marketing/coupon/couponList.jsp";
    	  }else if(index==7){
    		  tohref="${basePath}/pages/cm/empmanage/empmanage.jsp";
    	  }
    	  
    	  $(".index_iframe").attr("src",tohref);
      }

</script>
</body>
</html>