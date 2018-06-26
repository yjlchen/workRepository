<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fns"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html>
<html lang="en">
<head>
<title>只选择商品的弹窗</title>
<jsp:include page="common.jsp"></jsp:include>
<link rel="stylesheet" href="${basePath}/pages/commodity/manage/c_files/chosen.css"  media="screen">
<!-- chosen插件js -->
<script type="text/javascript" src="${basePath}/pages/commodity/manage/c_files/chosen.jquery.min.js"></script>
<script type="text/javascript" src="com_goods.js"></script>
<style>
		.quanju{
			width: 100%;
			height: 480px;
			border: 0px solid #ccc;
		}
		.top{
			width: 100%;
			height: 40px;
			margin: 0 auto;
			line-height: 40px;
			border-bottom: 1px solid #E5E5E5;
		}
		.top input{
			height: 30px;
			float: right;
			padding: 5px;
			margin: -42px 85px 0 0;
		}
		.body{
			padding-right: 10px;
			height: 380px;
			border-bottom: 1px solid #E5E5E5;
		}
		.right{
			float: right;
			width: 680px;
			height: 330px;
			padding: 20px 0 10px 0;
		}
		.right>div.start{
			display: block;
		}
		.right>div>div.identical{
			float: left;
			display: inline-block;
			width: 118px;
			height: 148px;
			margin-left: 15px;
			border:1px solid transparent;
			transition: all 0.1s;
			position: relative;
		}
		 .right>div>div>div.start{
			display:block !important;
		}
		.right>div>div.identical>div{
			width: 116px;
			height: 120px;
			background-size: 120px 180px;
			overflow: hidden;
		}
		.right>div>div>div span{
			display: inline-block;
			position:absolute;
			width: 115px;
			height: 25px;
			background: rgba(0,0,0,0.5);
			text-align: center;
			line-height: 25px;
			font-size: 12px;
			color: #fff;
			bottom:30px;
			overflow:hidden;
			white-space:nowrap;
		}
		.right>div>div>span{
			display: inline-block;
			width: 118px;
			height: 25px;
			font-size: 14px;
			overflow:hidden;
			white-space:nowrap;
			text-overflow:ellipsis;
		}
		#p_div .identical .attachment-selected {
    		position: absolute;
    		top: 0;
    		left: 0;
    		width: 100%;
    		height: 81%;
    		border: 2px solid #07d;
    		-webkit-box-sizing: border-box;
    		-moz-box-sizing: border-box;
    		box-sizing: border-box;
		}
		#p_div .identical .attachment-selected i{
			position: absolute;
    		right: 1px;
    		bottom: 1px;
    		z-index: 2;
		}
		#p_div .identical .attachment-selected span.border{
			width:0;
			height:0;
			position: absolute;
    		display: block;
    		content: ' ';
    		right: 0;
    		bottom: 0;
    		border: 14px solid #07d;
    		border-left-color: transparent;
    		border-top-color: transparent;
    		z-index: 1;
    		background:transparent;
		}
		[class*=" icon-"], [class^=icon-] {
    		display: inline-block;
    		width: 14px;
    		height: 14px;
    		margin-top: 1px;
    		line-height: 14px;
    		vertical-align: text-top;
    		background-image: url(../image/glyphicons-halflings.png);
    		background-position: 14px 14px;
    		background-repeat: no-repeat;
		}
		.icon-ok {
    		background-position: -288px 0;
		}
		.icon-white{
			background-image: url(../../pages/webstore/webpage/image/glyphicons-halflings-white.png);
		}
		/* 分页条样式 */
		.pagination>li>a{
			padding: 6px 11px;
		}
	</style>
</head>
<body>
<div class="quanju"> 
	<div class="top">
		<h5 style="padding: 6px 5px">已上架商品</h5>
		<input id="file_name" name="file_name" type="text" placeholder="商品名称" /> 
		<button class="layui-btn layui-btn-small " onclick="search('search')"  style="position:absolute;right:30px;top:5px">搜索</button>
		<div style="float:right;margin:-42px 280px 0 0" >
			<select name="label_id" id="label_id" ></select>
		</div>
	</div>
	<div class="body">
		<div class="right">
			<div class="start clear" id="p_div">
			</div>
			<!-- 分页div -->
			<div class="margin-bottom-10" style="margin-top:315px" >
				<div class="text-center" id="page_index">
				 </div>
			</div>
		</div>
	</div>
	<div class="foot" style="position:relative;text-align:center;">
	    <label id="p_num" style="float:left;position: absolute;left: 2%;top: 46%;"></label>
        <button id="to_sure" style="width:130px;margin-top: 15px;" class="layui-btn layui-btn-primary" onclick="to_return(this)">确定</button>
    </div>
</div>
</body>
</html>