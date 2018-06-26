<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>资讯预览</title>
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
<jsp:include page="../../../commons/jsp/common2.0.jsp"></jsp:include>
<script src="previewInformation.js"></script>
<link rel="stylesheet" href="previewInformation.css"/>
<body>
<div class="viewport">
	<!-- 返回按钮 -->
	<div class="back">
          <img src="back.png" alt="">
          <span>返回</span>
    </div>
    <!--  标题  -->
    <div class='title' id="title">
    </div>
    <!--  作者信息  -->
    <div class='writer clear'>
        <div class='img left'><img class="head_img_url" src=''/></div>
        <div class='content left'>
            <div class="author"></div>
            <div style='font-size:.22rem;color:#999;' class="add_time"></div>
        </div>
    </div>
    <!--  图文详情  -->
    <div class='textContent' id="textContent"></div>
    <!--  产品推荐  -->
<!--     <div class='recommend'>
        <div class='moduleName clear'>
            <div class='title left'>产品推荐</div>
            <div class='more right'>更多<img class="right" src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/common/shopBreak.png'/></div>
        </div>
        <div class='shop clear'>
            <div class='img left'><img src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/shop1.png'/></div>
            <div class='data left'>
                <div class='name'>Doctor's Best, 番茄红素Ly c-O-Mato, 10毫克，120粒</div>
                <div class='price'>参考价: ¥189</div>
            </div>
            <div class='shopping left' onclick="addShopping()">
                <img src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/consult/shopping.png'/>
                <span>加购</span>
            </div>
        </div>
    </div> -->
    <!--  音频  -->
    <div id="audioDiv">
    	
    </div>
    <!--  评论  -->
    <div class='commentModule'>
        <div class='title'>评论 （<span id="evaluateCnt">10</span>）</div>
        <div class='noComment clear' style="display: none">
            <img class='left' src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/consult/noComment.png'/>哭哭，还没有人给我评论...
        </div>
        <div class='commentPeople clear'>
            <input class='left' value="" maxlength="300" placeholder='谢谢你长这么好看还来给我评论!' data-content=""/>
            <span class="replyBtn left" onclick="replyBtn(this)">回复</span>
        </div>
        <div id="evaluationList">
        </div>
        <div class='more' id="more" onclick="more()">查看更多评论 <img style="display: inline" src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/common/shopBreak.png'/></div>
    </div>
</div>
</body>
</html>