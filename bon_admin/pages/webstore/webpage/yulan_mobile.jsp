<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>  
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>微页面手机端预览</title>
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/wbt1.css"  media="screen">
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/wbt2.css"  media="screen">
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/wbt3.css">

<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/chosen.jquery.20150826.min.css">
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/dashboard_v4_7f51edc001.css">
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/feature_a2159d53c2.css">
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/jquery-ui.min.css">
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/pc_7364614c8d.css">
   
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/yz.css" >
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/bootstrap_140705.min.css">


<!-- 所需基础js -->
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/jquery-1.11.3.js" ></script>
<script type="text/javascript" src="${basePath}/commons/js/commons.js"></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/yulan_mobile.js"></script>


</head>
<%
	String pageId = request.getParameter("id");
%>
<body class="feature-content body-fixed-bottom" style="">
<div class="container " style="min-height: 700px;">
    <div class="header">
        <div class="headerbar">
            <div class="headerbar-wrap clearfix">
                <div class="headerbar-preview">
                    <span>预览：</span>
                    <ul>
                        <li>
                            <a href="javascript:void(0);" class="js-no-follow active" data-size="default" onclick="toPreview(0)">手机版</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" class="js-no-follow" data-size="800" onclick="toPreview(1)">PC版</a>
                        </li>
                    </ul>
                </div>
                <div class="headerbar-reedit">
                    <a href="javascript:void(0);" class="js-no-follow" onclick="reEditWebpage()">重新编辑</a>
                </div>
            </div>
        </div>
    </div>
    <div class="content ">
        <div class="content-body js-page-content" id="yulanMain" style="width: 400px;margin-left: 250px;">
           		<!-- 动态加载 -->
        </div>
        <div id="shop-nav" style="display: block;">
            <div class="js-navmenu js-footer-auto-ele shop-nav nav-menu nav-menu-1 has-menu-3">
                <div class="nav-special-item">
                    <a href="javascript:void(0);" class="home" >主页</a>
                </div>
                <div class="nav-items-wrap">
                    <div class="nav-item">
                        <a class="mainmenu js-mainmenu" href="#">
                            <span class="mainmenu-txt">商城主页</span>
                        </a>
                    </div>
                    <div class="nav-item">
                        <a class="mainmenu js-mainmenu" href="javascript:void(0);">
                                <span class="mainmenu-txt">
                                    <i class="arrow-weixin"></i>会员中心
                                </span>
                        </a>
                        <div class="submenu js-submenu">
                            <span class="arrow before-arrow"></span>
                            <span class="arrow after-arrow"></span>
                            <ul>
                                <li>
                                    <a href="#">我的订单</a>
                                </li>
                                <li class="line-divide"></li>
                                <li>
                                    <a href="#">购物车</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="nav-item">
                        <a class="mainmenu js-mainmenu" href="#">
                            <span class="mainmenu-txt">在线咨询</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="js-footer" style="min-height: 1px;">
    <div>
        <div class="footer" style="width:320px;bottom:0px;margin: 0 auto;">
            <div class="copyright">
                <div class="ft-links">
                    <a href="#" >店铺主页</a>
                    <a href="#" >会员中心</a>
                    <a href="javascript:;" class="js-open-follow">关注我们</a>
                    <a href="#" >店铺信息</a>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="search-bar" style="display:none;">
    <form class="search-form" action="https://h5.youzan.com/v2/search" method="GET">
        <input type="search" class="search-input" placeholder="搜索商品" name="q" value="">
        <input type="hidden" name="kdt_id" value="15635310">
        <a class="js-search-cancel search-cancel" href="javascript:;">取消</a>
        <span class="search-icon"></span>
        <span class="close-icon hide"></span>
    </form>
    <div class="history-wrap center">
        <ul class="history-list search-recom-list js-history-list clearfix"></ul>
        <a class="tag tag-clear js-tag-clear c-gray-darker hide" href="javascript:;">清除历史搜索</a>
    </div>
</div>
<script type="text/javascript">
	var pageId = '<%=pageId%>';
	//跳转到预览页面的方法
	function toPreview(flag){
		location.href = getRootPath()+ '/webstore/pageinfo/toPreview.action?id='+pageId+'&flag='+flag; 
	}
	
	//跳转到重新编辑微页面
	function reEditWebpage(){
		location.href = getRootPath()+ '/pages/webstore/webpage/editPageinfoDraft.jsp?id='+pageId
	}
	
	//对应shopPhone中的方法
	function isWeiXinOut(url){
		window.location.href=url;
	}
</script>
</body>
</html>