<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<link type="text/css" rel="stylesheet" href="${basePath}/commons/plugin/paging/4a86166a.vendor.css">
<link type="text/css" rel="stylesheet" href="${basePath}/commons/plugin/paging/9e24f281.app.css">
<link type="text/css" rel="stylesheet" href="${basePath}/commons/plugin/paging/font-awesome.min.css">
<title>我的文件选项卡页面</title>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<style>
	.tool_search_div {
		float: right;
		display: inline-block;
		width: 200px;
		height: 37px;
		border: 1px solid #ccc;
		border-radius: 2px;
		margin-right: 10px;
	}
	.tool_search_div input {
		border: none;
		width: 150px;
		height: 35px;
		display: inline-block;
		vertical-align: middle;
		font-size: 13px;
		padding-left: 20px;
	}
	.tool_search_btn {
		display: inline-block;
		vertical-align: middle;
		margin-left: 22px;
		color: green;
		font-size: 24px;
	}
	
        #inner-page-main{
            position: absolute;
            left: 1400px;
            top: 50px;
        }
        #span{
        	display: inline-block;
        	width: 80%;
        	overflow: hidden;
        	text-overflow:ellipsis;
        	white-space: nowrap;
        }
        #quanxuan{
        	margin-top:20px;
        }
        #images>div{
            display: inline-block;
            width: 200px;
            height: 209px;
            margin: 0 0 20px 20px;
        }
        #images img{
            width: 160px;
            height: 160px;
            margin-bottom: 10px;
        }
        #images a{
            color: #38f;
        }
        #popup{
            display: none;
            position: absolute;
            z-index: 10000;
            right: 0;
            top: 120px;
            width: 220px;
            height: 118px;
            box-shadow: 0 1px 6px rgba(0,0,0,0.2);
        }
        #popup>button{
            margin: 10px 0 0 20px;
            height: 30px;
            line-height: 30px;
        }
         form input{
            display: none;
        }
        .xiaoanniu{
             height: 20px;
             line-height: 20px;
         }
        .xiaoanniu input{
        	display:none;
        }
        .xiaoanniu .tubiao{
            color: #FFF;
            display: inline-block;
            width: 12px;
            height: 12px;
            line-height: 12px;
            border: 1px solid #D2D2D2;
            margin: 8px 0 0 5px;
        }
        .daanniu{
            margin-right: 15px;
            float:left;
            border: 1px solid #d2d2d2;
            display: inline-block;
            border-radius: 5px;
        }
        .borColor{
            border: 1px solid #5FB878;
        }
        .wzColor{
            color: #5FB878!important;
        }
        .daanniu span{
            display: inline-block;
            font-size: 16px;
            padding: 5px;
            color: #fff;
            font-weight: bold;
            background: #d2d2d2;
        }
        .daanniu .tubiao{
            width: 20px;
            height: 20px;
            background: #fff;
            border-radius: 5px;
        }
        .start {
            background: #5FB878!important;
        }
        #picture_pageid{
        	margin:20px 0 0 0 !important;
        }
</style>
</head>
<body>
	<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin-top:0;">
		<ul class="layui-tab-title" style="border-bottom:none;margin-bottom: 9px;">
			<li class="layui-this">图片</li>
			<li>音频</li>
			<li>视频</li>
			<div class="tool_search_div" >
				<form id="queryform" method="post">
					<input id="commodity_name" name="commodity_name" type="text" placeholder="搜索" style="margin-top: -4px;"/> <a href="javascript:;" onclick="searchPicPage()"
					class="tool_search_btn" style="margin-left: 0px;"> <i
					class="fa fa-search" aria-hidden="true"></i>
				</a><br>
				</form>
			</div>
		</ul>
		<div class="" id="iframepage">
		</div>
	</div>
</body>

<script>
//界面初始化第一個tab 
//如果需要传值  可以这么写,{'operFlag':'add'}
var type = getUrlParam('type');
if(type=='1'){
	$("#iframepage").load("voice.jsp");
	$('ul li').removeClass('layui-this');
	$('ul li').eq(1).addClass('layui-this');
}else if (type=='2') {
	$("#iframepage").load("video.jsp");
	$('ul li').removeClass('layui-this');
	$('ul li').eq(2).addClass('layui-this');
}else{
	$("#iframepage").load("picture.jsp");
	$('ul li').removeClass('layui-this');
	$('ul li').eq(0).addClass('layui-this');
}
//注意：选项卡 依赖 element 模块，否则无法进行功能性操作
layui.use(['element','form'], function(){
  var element = layui.element(),
  form = layui.form();
  element.on('tab(docDemoTabBrief)', function(data){
	  var index = data.index ;
	  if(index==0){
		  $("#iframepage").load("picture.jsp"); 
		  form.render();
	  }
	  if(index==1){
		  $("#iframepage").load("voice.jsp"); 
		  form.render();
	  }
	  if(index==2){
		  $("#iframepage").load("video.jsp"); 
		  form.render();
	  } 
	});
}); 

</script>
</html>