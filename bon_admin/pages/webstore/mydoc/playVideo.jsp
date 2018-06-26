<%@page import="com.itextpdf.text.log.SysoLogger"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script type="text/javascript" src="${basePath}/commons/bootstrap/js/jquery.js"></script>
<script type="text/javascript" src="${basePath}/commons/js/commons.js"></script>
<script type="text/javascript" src="${basePath}/pages/webstore/mydoc/video/js/video.min.js"></script>
<script type="text/javascript" src="${basePath}/pages/webstore/mydoc/video/js/videojs-ie8.min.js"></script>
<link type="text/css" rel="stylesheet" href="${basePath}/pages/webstore/mydoc/video/css/video-js.css">
<style type="text/css">
	body{
			background-color: #191919
		}
		.m{ 
			width: 740px; 
			height: 400px; 
			margin-left: auto; 
			margin-right: auto; 
			margin-top: 100px; 
		}
</style>
</head>
<body>
	<div class="m">
		<video id="my-video" class="video-js" controls preload="auto" width="740" height="400"
		  poster="MY_VIDEO_POSTER.jpg" data-setup="{}">
			<source id="mp4" src="" type="video/mp4">
			<source id="webm" src="" type="video/webm">
			<source id="ogg" src="" type="video/ogg">
			<p class="vjs-no-js">
			  To view this video please enable JavaScript, and consider upgrading to a web browser that
			  <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
			</p>
		  </video>
	</div>
	<script type="text/javascript">
		<%
			//获取父页面传过来的参数，file_url
			String file_url = (String)request.getParameter("dataname"); 
		%>
		var file_url = "<%=file_url%>";
		$('#mp4').attr("src",file_url);
		$('#webm').attr("src",file_url);
		$('#ogg').attr("src",file_url);
		var myPlayer = videojs('my-video');
		videojs("my-video").ready(function(){
			var myPlayer = this;
			myPlayer.play();
		});
	</script>
</body>
</html>