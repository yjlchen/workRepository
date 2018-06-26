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
<title>音频分集预览</title>
<jsp:include page="../../../../commons/jsp/common2.0.jsp"></jsp:include>
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
<script src="eachAudioPreview.js"></script>
<link rel="stylesheet" href="eachAudioPreview.css">
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
            <img src="">
        </div>
        <div class="title" id="eachTitle">
        </div>
        <div class="updateTime">
        </div>
        <div class="playNumber">
        </div>
    </div>

    <!--内容简介-->
    <div class="content_info" style="padding:0">
        <span>正文介绍</span>
        <div></div>	
        <!-- <ul>
            <li>
                1：三餐主食不要太多，最好禁掉
            </li>
            <li>
                2：尽量不吃加糖食物
            </li>
            <li>
                3：降低白米白面主食比例，粗细搭配要适当
            </li>
        </ul> -->
    </div>

    <!--主播信息-->
    <div class="hoster_info clear" style="padding:0">
        <span>主播</span>
        <div class="icon_box clear">
            <div class="hoster_icon">
                <img src="" alt="">
            </div>
            <div class="hoster_name">
            </div>
            <div class="hoster_focus">
            </div>
        </div>
    </div>

<!--  评论  -->
    <div class='commentModule'>
        <div class='title1'>评论 （<span id="evaluateCnt"></span>）</div>
        <div class='noComment clear' style="display: none">
            <img class='left' src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/consult/noComment.png'/>哭哭，还没有人给我评论...
        </div>
        <div class='commentPeople clear'>
            <input class='left' value="" maxlength="300" placeholder='谢谢你长这么好看还来给我评论!' data-content=""/>
            <span class="replyBtn left" onclick="replyBtn(this)">回复</span>
        </div>
        <div id="evaluationList">
        </div>
        <div class='more' id="more" onclick="more()">查看更多评论
         <img style="display: inline" src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/common/shopBreak.png'/>
         </div>
    </div>
</div>
</body>
</html>