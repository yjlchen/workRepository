<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" import="java.util.Map,com.swn.common.constants.ICommonConstants" isErrorPage="true"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%response.setStatus(HttpServletResponse.SC_OK);%>
<c:set 
value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
var="basePath" />
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <title>商城后台主页</title>
    <%-- <jsp:include page="commons/jsp/common.jsp"></jsp:include> --%>
    <script type="text/javascript" src="${basePath}/commons/bootstrap/js/jquery.js"></script>
    <script type="text/javascript" src="${basePath}/tools/layui1.0.9/layui.js"></script>
    <script type="text/javascript" src="${basePath}/commons/js/commons.js"></script>
    <link rel="stylesheet" href="${basePath}/tools/layui1.0.9/css/layui.css" media="all">
    <link type="text/css" rel="stylesheet" href="${basePath}/commons/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="${basePath}/commons/css/site.css" id="siteStyle" />
    <link rel="stylesheet" href="${basePath}/commons/font-awesome/font-awesome.css">
    <link rel="stylesheet" href="${basePath}/commons/font-awesome/web-icons.css">
<script type="text/javascript">
//注意：导航 依赖 element 模块，否则无法进行功能性操作
	layui.use(['element', "layer" ] ,function(){
	var element = layui.element();
	layer = layui.layer;
	});
	</script>
	<% 
	    String role_tag = ((Map<String, Object>) session.getAttribute(ICommonConstants.LOGIN_USER)).get("role_tag").toString();  //获取用户的角色标识
    %>
</head>
<body>
<nav class="site-navbar navbar navbar-default navbar-fixed-top navbar-inverse " role="navigation">
	<div id="upload_mask" style="position:fixed;top:0;left:0;right:0;height:100%;width:100%;display:none">
		<div id='upload_speed' style="position:absolute;left:calc(50% - 100px);top:200px;background:#ddd;color:#f00;padding:5px 15px;border-radius:30px;" ></div>
	</div>
    <div class="navbar-header" id="navbar-header">
        <button type="button" class="navbar-toggle hamburger hamburger-close navbar-toggle-left hided" data-toggle="menubar"> <span class="sr-only">切换菜单</span> <span class="hamburger-bar"></span> </button>
        <button type="button" class="navbar-toggle collapsed" data-target="#admui-navbarCollapse" data-toggle="collapse"> <i class="icon wb-more-horizontal" aria-hidden="true"></i> </button>
        <div class="navbar-brand navbar-brand-center site-gridmenu-toggle" data-toggle="gridmenu">
            <!--<img class="navbar-brand-logo visible-lg visible-xs navbar-logo" src="./images/logo-white.svg" title="Admui" />-->
			<span class="navbar-brand-logo visible-lg visible-xs navbar-logo" style="font-size:24px">棒健康</span>
            <img class="navbar-brand-logo hidden-xs hidden-lg navbar-logo-mini" src="http://sys-resource.oss-cn-beijing.aliyuncs.com/shopAdmin/myFiles/img/1712230950046170000008.png" title="Admui" />
        </div>
    </div>
    <div class="navbar-container container-fluid">
        <div class="collapse navbar-collapse navbar-collapse-toolbar" id="admui-navbarCollapse">
            <ul class="nav navbar-toolbar navbar-left">
                <li class="hidden-float"> <a data-toggle="menubar" class="hidden-float hided unfolded" href="javascript:;" role="button" id="admui-toggleMenubar"> <i class="icon hamburger hamburger-arrow-left"> <span class="sr-only">切换目录</span> <span class="hamburger-bar"></span> </i> </a> </li>
                <li class="navbar-menu nav-tabs-horizontal nav-tabs-animate" id="admui-navMenu">
                    <ul class="nav navbar-toolbar nav-tabs" role="tablist">
                        <!-- 顶部菜单 -->
                    </ul>
                </li>
            </ul>
            <ul class="nav navbar-toolbar navbar-right navbar-toolbar-right" style="padding-right: 15px">
                <%
	                if(role_tag.contains(",0,")){
                %>
                <li class="hidden-xs" id="admui-navbarMessage" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="待退款提醒"> 
                	<a data-toggle="dropdown" href="javascript:;" class="msg-btn" aria-expanded="true" data-animation="scale-up" role="button">
                        <i class="icon wb-bell" aria-hidden="true"></i>
                        <span class="badge badge-danger up msg-num" id="refundreminderno">0</span>
                    </a> 
                </li>
                <li class="hidden-xs" id="admui-navbarMessage" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="待发货提醒"> 
                	<a data-toggle="dropdown" href="javascript:;" class="msg-btn1" aria-expanded="true" data-animation="scale-up" role="button">
                        <i class="icon wb-bell" aria-hidden="true"></i>
                        <span class="badge badge-danger up msg-num" id="refundreminder">0</span>
                    </a> 
                </li>
                <%  } %>
                <li class="hidden-xs" id="admui-navbarSize" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="自定义标题宽度"> <a class="icon fa fa-arrows-h" href="#" data-pjax=""> <span class="sr-only">标题宽度</span> </a> </li>
                <li class="hidden-xs" id="admui-navbarDisplay" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="设置主题与布局等"> <a class="icon wb-layout" href="#" data-pjax=""> <span class="sr-only">主题与布局</span> </a> </li>
                <li class="hidden-xs" id="admui-navbarFullscreen" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="全屏" onclick="requestFullScreen()"> <a class="icon icon-fullscreen" data-toggle="fullscreen" href="#" role="button"> <span class="sr-only">全屏</span> </a> </li>
                <li class="hidden-xs" id="admui-navbarRetreat" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="退出"> <a class="site-menu-icon fa-sign-out" style="padding-right: 24px;margin-right: 0;" data-toggle="fullscreen" href="#" role="button"> <span class="sr-only">退出</span> </a> </li>
            </ul>
        </div>
    </div>
</nav>
<nav class="site-menubar site-menubar-dark">
    <div class="site-menubar-body" id="site-menubar-body">
        <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 100%;">
            <div class="tab-content height-full" id="admui-navTabs" style="overflow: hidden; width: auto; height: 100%;">
                <!-- 一级菜单 -->
            </div>
            <div class="slimScrollBar" style="background: rgb(118, 131, 143); width: 4px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 4px; z-index: 99; right: 1px; height: 364.892px;"></div>
            <div class="slimScrollRail" style="width: 4px; height: 100%; position: absolute; top: 0px; border-radius: 4px; background: rgb(204, 213, 219); opacity: 0.1; z-index: 90; right: 1px; display: none;"></div>
        </div>
    </div>
</nav>
<nav class="site-contabs" id="admui-siteConTabs">
	<span id="ban" class="fa fa-ban" style="display:none;font-size:20px"></span>
    <button type="button" class="btn btn-icon btn-default pull-left hide"> <i class="icon fa-angle-double-left"></i> </button>
    <div class="contabs-scroll pull-left">
        <ul class="nav con-tabs" style="width: 105px;"></ul>
    </div>
    <div class="btn-group pull-right">
        <button type="button" class="btn btn-icon btn-default hide"> <i class="icon fa-angle-double-right"></i> </button>
        <button type="button" class="btn btn-default dropdown-toggle btn-outline" data-toggle="dropdown" aria-expanded="false"> <span class="caret"></span> <span class="sr-only">切换菜单</span> </button>
        <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="conTabsDropdown" role="menu">
            <li class="reload-page" role="presentation"> <a href="javascript:;" role="menuitem"><i class="icon fa-refresh"></i> 刷新当前</a> </li>
            <li class="close-other" role="presentation"> <a href="javascript:;" role="menuitem"><i class="icon wb-close"></i> 关闭其他</a> </li>
            <li class="close-left" role="presentation"> <a href="javascript:;" role="menuitem"><i class="icon fa fa-arrow-left"></i> 关闭左侧</a> </li>
            <li class="close-right" role="presentation"> <a href="javascript:;" role="menuitem"><i class="icon fa fa-arrow-right"></i> 关闭右侧</a> </li>
            <li class="close-all" role="presentation"> <a href="javascript:;" role="menuitem"><i class="icon wb-power"></i> 关闭所有</a> </li>
        </ul>
    </div>
</nav>
<main class="site-page">
    <div class="page-container" id="admui-pageContent"></div>
    <div class="page-loading vertical-align text-center">
        <div class="page-loader loader-default loader vertical-align-middle" data-type="default"></div>
    </div>
</main>
<footer class="site-footer">
    <div class="site-footer-legal">香港棒健康集团有限公司</div>
    <div class="site-footer-right">
    	当前版本：v1.2.0
        <a class="margin-left-5" data-toggle="tooltip" title="" href="http://www.admui.com/buy" target="_blank" data-original-title="升级">
            <i class="icon fa-cloud-upload"></i>
        </a>
    </div>
</footer>
<script type="text/javascript" src="${basePath}/commons/js/index.js"></script>
<script type="text/javascript" src="${basePath}/commons/js/show_set.js"></script>
</body>
</html>