<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>商品列表页面</title>
<jsp:include page="../../../commons/jsp/common2.0.jsp"></jsp:include>
<link rel="stylesheet" href="${basePath}/pages/bon/mynews/mynewsTb.css"  media="screen">
<script type="text/javascript" src="${basePath}/pages/bon/mynews/mynewsManage.js"></script>
<script type="text/javascript">
    (function (doc, win) {
        var docEl = doc.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function () {
                    var clientWidth = docEl.clientWidth;
                    if(clientWidth>750) clientWidth=750;
                    if (!clientWidth) return;
                    docEl.style.fontSize = Math.floor(100 * (clientWidth / 750)) + 'px';
                };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
</script>
</head>
<body>
	<div class='shade' style="display: none"></div>
<div class='reply' style="display: none">
    <input value="{{inputValue}}" placeholder='@{{inputPlaceholder}}'/>
</div>
<div class="viewport">
    <!--  teb导航  -->
    <div class='menu clear' id="menu">
        <div class='active left' data-id="system">
            <span>系统消息</span><span id="system_count"></span>
            <img src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/menuActive.png'/>
        </div>
        <div class='left' data-id="comment">
            <span>我的评论</span>
            <img src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/menuActive.png'/>
        </div>
        <div class='left' data-id="commentMy" style="width:30%;">
            <span>评论与@我</span><span id="commentMy_count"></span>
            <img src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/menuActive.png'/>
        </div>
        <div class='left' data-id="inform" style="width:20%;">
            <span>通知</span><span id="inform_count"></span>
            <img src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/menuActive.png'/>
        </div>
    </div>
    <div class="moduleList">
        <!--  系统通知  -->
        <div class='system module'>
        	<div id="sysMsg" class="systemList">
            </div>
            <div class='moreMess' style="text-align: center;font-size: 0.26rem;">查看更多数据</div>
        </div>
        <!--  我的评论  -->
        <div style="display: none" class='comment module'>
            <div id="comment" class='inform-list clear'>
            </div>
            <div class='moreComment' style="text-align: center;font-size: 0.26rem;">查看更多数据</div>
        </div>
        <!--  评论与@我  -->
        <div style="display: none" class='commentMy module'>
            <div id="commentMy" class='inform-list clear'>
            </div>
            <div class='morecommentMy' style="text-align: center;font-size: 0.26rem;">查看更多数据</div>
        </div>
        <!--  通知  -->
        <div style="display: none" class='inform module'>
        	<div class='inform-list clear'>
        		<div id="inform" class="inform-list clear">
        		</div>
        		<div class='more' style="text-align: center;font-size: 0.26rem;">查看更多数据</div>
        	</div>
        </div>
    </div>
   </div>
   <div style="position:fixed;bottom:.6rem;right:.9rem;width:.7rem">
   	<a href="#" style="color:#404040;font-size:.26rem">返回顶部</a>
   </div>	
</body>
</html>