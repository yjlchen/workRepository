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
<title>音频总集预览</title>
<jsp:include page="../../../../commons/jsp/common2.0.jsp"></jsp:include>
<script src="totalAudioPreview.js"></script>
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
<link rel="stylesheet" href="totalAudioPreview.css">
</head>
<body>
<div class="viewport">
	<!-- 返回按钮 -->
		<div class="back">
            <img src="../img/back.png" alt="">
            <span>返回</span>
        </div>
    <!--封面图-->
    <div class="top">
        <div class="poster">
            <img src="" >
        </div>
        <div class="title">
        </div>
        <div class="updateTime">
        </div>
        <div class="playNumber">
            <span style="float:left;color:#FE6307"></span> 
            <span style="float:left;margin-left:.1rem;margin-top:.07rem;color:#9D9D9F;font-size:.2rem">次播放</span>
        </div>
    </div>
	<div class="moneyTips">
		<span>	专辑价格：</span>
		<span style="color:red;float:left"></span>	
		<span style="text-decoration:line-through;color:gray;float:left;padding-left:.1rem"></span>
		<span>棒点</span>		
	</div>	
    <!--主播信息-->
    <div class="hoster_info clear">
        <span>主播简介</span>
        <div class="icon_box clear">
            <div class="hoster_icon">
                <img src="" alt="">
            </div>
            <div class="hoster_name">
            </div>
        </div>
        <p id="dietitian_introduction">
        </p>
    </div>

    <!--内容简介-->
    <div class="content_info">
        <span>内容简介</span>
        <p>
        </p>
    </div>
    <!--合辑列表-->
    <div class="jiemu">
        <span>节目列表</span>
        <ul class="jiemu_list">
        </ul>
    </div>
</div>
</body>
</html>