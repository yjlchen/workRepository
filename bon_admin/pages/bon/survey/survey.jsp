<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>概况</title>
<link rel="stylesheet" href="${basePath}/pages/bon/survey/survey.css"  media="screen">
<jsp:include page="../../../commons/jsp/common2.0.jsp"></jsp:include>
<script type="text/javascript" src="${basePath}/pages/bon/survey/survey.js"></script> 

<head>
    <meta charset="UTF-8">
    <meta id="viewport" name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1,user-scalable=no">
    <title>概况</title>
    <link rel="stylesheet" href="survey.css">
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
<form action=""  class="layui-form" id="surveyForm">
    <ul class="out_box">
        <li>
            <h5><a id="fans" href=""></a></h5>
            <h6>粉丝数</h6>
        </li>
        <li>
            <h5><a id="attention" href=""></a></h5>
            <h6>关注数</h6>
        </li>
        <li>
            <h5><a id="video" href=""></a></h5>
            <h6>视频数量</h6>
        </li>
        <li>
            <h5><a id="audio" href=""></a></h5>
            <h6>音频数量</h6>
        </li>
        <li>
            <h5><a id="infomation" href=""></a></h5>
            <h6>资讯数量</h6>
        </li>
        <li>
            <h5><a id="summarize" href=""></a></h5>
            <h6>心得数量</h6>
        </li>
        <li>
            <h5><a id="dietition" href=""></a></h5>
            <h6>说说数量</h6>
        </li>
    </ul>
   </form>
</body>
</html>