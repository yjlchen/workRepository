<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<!DOCTYPE html>
<html lang="en">
<head>
	<jsp:include page="../../../commons/jsp/common2.0.jsp"></jsp:include>
    <link rel="stylesheet" href="videoPreview.css">
 	 <script src="videoPreview.js"></script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0, maximum-scale=1,user-scalable=no">
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta content="black" name="apple-mobile-web-app-status-bar-style">
    <meta content="telephone=no" name="format-detection">
    <meta content="email=no" name="format-detection">
    <title>视频详情预览页面</title>
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
    <div class="viewport">
        <!--返回按钮-->
        <div class="back">
            <img src="img/back.png" alt="">
            <span>返回</span>
        </div>
        <!--视频-->
        <div class="videoBox">
        </div>
        <!--付费提醒-->
        <div class="moneyTips">
           提示：此视频付费需<span id='paySpan' style="color:#FF5858">20棒点</span>
        </div>
        <!--视频信息-->
        <div class="videoInfo">
            <div class="videoTitle">
              <!--   <span>春节后如何控制血压水平，少了这几种元素还真不行!</span> -->
            </div>
            <div class="infoBottom clear">
                <img src="img/view.png" alt="哎呀图片不见了">
                <span class='real_play_amount'></span>
                <img src="img/time.png" alt="哎呀图片不见了">
                <span class='time_length'></span>
            </div>
        </div>
        <!--主播信息-->
        <div class="hoster_info clear" style="padding:0">
            <span>主播简介</span>
            <div class="icon_box clear">
                <div class="hoster_icon">
                    <img src="" alt="" id='head_img_url'>
                </div>
                <div class="hoster_name"> </div>
                <div class="hoster_focus">
            </div>
            </div>
        </div>
      
        <!--评论区-->
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