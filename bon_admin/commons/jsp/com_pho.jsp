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
	<title>选择我的图片的弹窗</title>
    <jsp:include page="common.jsp"></jsp:include>
    <script type="text/javascript" src="${basePath}/commons/bootstrap/js/jquery-1.8.3.min.js"></script>
   	<script type="text/javascript" src="com_pho.js"></script>
   	<script type="text/javascript" src="${basePath }/commons/js/uploadPreview.js"></script>
	<style>
		.pagination>li>a{
			padding: 6px 9px;
		}
		.quanju{
			width: 100%;
			height: 520px;
			border: 0px solid #ccc;
		}
		.top{
			width: 100%;
			height: 40px;
			margin: 0 auto;
			line-height: 40px;
			border-bottom: 1px solid #E5E5E5;
		}
		.top span{
			float: right;
			font-size: 50px;
			margin: -40px 7px;
			color: #ccc;
		}
		.top input{
			height: 30px;
			float: right;
			padding: 5px;
			margin: -42px 53px 0 0;
		}
		.body{
			padding-right: 10px;
			height: 426px;
			border-bottom: 1px solid #E5E5E5;
		}
		.left{
			float: left;
			padding-top: 10px;
			width: 160px;
			height: 426px;
			background: #F2F2F2;
		}
		.left li{
			height: 40px;
			line-height: 40px;
			padding-left: 20px;
			font-size: 14px;
			color: #929292;
		}
		.left li:hover{
			background: #FAFAFA;
		}
		.left li>span{
			float: right;
			margin-right: 10px;
		}
		.left li.start{
			background: #fff;
		}
		.right{
			float: right;
			width: 680px;
			height: 426px;
			padding: 30px 0 10px 0;
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
		}
		.right>div>div>div.start{
			display:block !important;
		}
		.right>div>div.identical>div{
			width: 116px;
			height: 120px;
			position:relative;
			background-size: 120px 180px;
		}
		.right>div>div.identical>div>img{
			width:116px;
			height:120px;
		}
		.right>div>div>div span{
			position:absolute;
			top:95px;
			left:0;
			display: inline-block;
			width: 115px;
			height: 25px;
			background: rgba(0,0,0,0.1);
			/*margin-top: 95px;*/
			text-align: center;
			line-height: 25px;
			font-size: 12px;
			color: #fff;
		}
		.right>div>div>span{
			font-size: 14px;
		}
		.ui-btn {
		    display: inline-block;
		    border-radius: 2px;
		    height: 26px;
		    line-height: 26px;
		    padding: 0 12px;
		    cursor: pointer;
		    color: #333;
		    background: #f8f8f8;
		    border: 1px solid #ddd;
		    text-align: center;
		    font-size: 12px;
		    -webkit-box-sizing: content-box;
		    -moz-box-sizing: content-box;
		    box-sizing: content-box;
		}
		.ui-btn-success {
		    color: #fff;
		    background: #4b0;
		    border-color: #3da900;
		}
		.widget-attachment .modal-header .close {
		    font-size: 32px;
		}
		.widget-attachment .modal-header .title {
		    font-size: 14px;
		    line-height: 28px;
		    margin-right: 20px;
		}
		.modal-header .title, .modal-header h4 {
		    margin: 0;
		    font-size: 16px;
		    line-height: 20px;
		    font-weight: bold;
		}
		
		a {
		    color: #38f;
		    text-decoration: none !important;
		}
		.title{
			border:none;
		}
		.widget-attachment .modal-body .network-image-region .title, .widget-attachment .modal-body .local-image-region .title {
		    font-size: 14px;
		    font-weight: bold;
		    width: 150px;
		    text-align: right;
		    margin-top: 23px;
		    float:left;
		}
		.widget-attachment .modal-body .network-image-region .content, .widget-attachment .modal-body .local-image-region .content {
		    float: left;
		    width: 600px;
		    margin-top:-20px;
		}
		.widget-attachment .modal-body .network-image-region input[type="text"] {
		    height: 20px;
		    line-height: 20px;
		    -webkit-box-sizing: content-box;
		    -moz-box-sizing: content-box;
		    box-sizing: content-box;
		}
		.input-append input{
		    -webkit-border-radius: 4px 0 0 4px;
		    -moz-border-radius: 4px 0 0 4px;
		    border-radius: 4px 0 0 4px;
		}
		input.span4, textarea.span4 {
		    width: 286px;
		    float: none;
		   	margin-left: 0;
		   	background-color: #fff;
		    border: 1px solid #ccc;
		    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
		    -moz-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
		    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
		    -webkit-transition: border linear .2s,box-shadow linear .2s;
		    -moz-transition: border linear .2s,box-shadow linear .2s;
		    -o-transition: border linear .2s,box-shadow linear .2s;
		    transition: border linear .2s,box-shadow linear .2s;
		    display: inline-block;
		    height: 20px;
		    padding: 4px 6px;
		    margin-bottom: 10px;
		    font-size: 14px;
		    line-height: 20px;
		    color: #555;
		    vertical-align: middle;
		    -webkit-border-radius: 4px;
		    -moz-border-radius: 4px;
		    border-radius: 4px
		}
		.btn {
		    padding: 4px 12px;
		    margin-bottom: 0;
		    font-size: 14px;
		    color: #333;
		    vertical-align: middle;
		    cursor: pointer;
		    background-color: #f8f8f8;
		    border: 1px solid #ddd;
		    -webkit-border-radius: 2px;
		    -moz-border-radius: 2px;
		    border-radius: 2px;
		    margin-left: -15px;
		       margin-top: -10px;
		}
		.widget-attachment .modal-header {
		    padding: 6px 0 6px 15px;
		    margin-right: 20px;
		    border-bottom: 1px solid #e5e5e5;
		}
		.widget-attachment .modal-body .add-local-image-button {
		    position: relative;
		    display: inline-block;
		    width: 80px;
		    height: 80px;
		    margin-bottom: 20px;
		    border: 2px dashed #ddd;
		    line-height: 71px;
		    -webkit-box-sizing: border-box;
		    -moz-box-sizing: border-box;
		    box-sizing: border-box;
		    text-align: center;
		    font-size: 36px;
		    color: #ddd;
		    cursor: pointer;
		    overflow: hidden;
		}
		.pull-left {
		    float: left;
		}
		.c-gray {
		    color: #999 !important;
		}
		.widget-attachment .modal-footer {
		    position: relative;
		    background: #fff;
		    text-align: center;
		}
		.modal-footer {
		    padding: 14px 15px 15px;
		    background-color: #f5f5f5;
		    border-top: 1px solid #ddd;
		    -webkit-border-radius: 0 0 6px 6px;
		    -moz-border-radius: 0 0 6px 6px;
		    border-radius: 0 0 6px 6px;
		    -webkit-box-shadow: inset 0 1px 0 #fff;
		    -moz-box-shadow: inset 0 1px 0 #fff;
		    box-shadow: inset 0 1px 0 #fff;
		}
		.widget-attachment .modal-footer .ui-btn {
		    font-size: 14px;
		    height: 30px;
		    line-height: 30px;
		    min-width: 84px;
		}
		.ui-btn-disabled, .ui-btn-disabled:hover, .ui-btn-disabled:focus, .ui-btn-disabled:active {
		    color: #999;
		    background: #f0f0f0;
		    border-color: #ddd;
		}
		.widget-attachment .modal-body .local-image-region {
		    margin: 0 20px;
		    padding: 40px 10px 0;
		}
		.widget-attachment .modal-body .network-image-region {
		    border-bottom: 1px solid #e5e5e5;
		    margin: 0 20px;
	    	padding: 40px 10px 0;
		}
		.content{
			padding-bottom:15px;
		}
		.upload_img{
			float: left;
	    	margin-top: 3px;
	    	padding: 2px 10px;
	    	color: #fff;
	    	background: #4b0;
	    	border: 1px solid #3da900;
	    	cursor: pointer;
		}
		.upload_img:hover{
			background:#49c800;
			border-color:#399f00;
		}
		.delete-picture {
		    position: absolute;
		    top: -2px;
		    right: -2px;
		    z-index: 1;
		    width: 22px;
		    height: 22px;
		    background: url(../bootstrap/images/delete@2x.png) center no-repeat;
		    background-size: 18px 18px;
		}
		#p_div .identical .attachment-selected {
	    	position: absolute;
	    	top: 0;
	    	left: 0;
	    	width: 100%;
	    	height: 83%;
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
	    	top:76%;
	    	left:75%;
	    	background:transparent;
	    	border: 14px solid #07d;
	    	border-left-color: transparent;
	    	border-top-color: transparent;
	    	z-index: 1;
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
		#sp_url{
			position:absolute;
			right:53px;
			top:5px;
			border-radius:0;
		}
	</style>
</head>
<body>
<div class="quanju" style="display:block">
	<div class="top">
		<h5 style="padding: 6px 5px">我的图片</h5>
		<input id="file_name" name="file_name" type="text" 
							placeholder="图片名称" /> 
		<button class="layui-btn layui-btn-normal layui-btn-small" onclick="search()" id="sp_url">搜索</button>
	</div>
	<div class="body">
		<div class="left" style="overflow:auto;">
			<ul id="left_group">
			</ul>
		</div>
		<div class="right">
			<div class="start" id="p_div">
			</div>
			<!-- 分页div -->
			<div class="margin-bottom-10" style="margin-top:335px" >
				<div class="text-center" id="page_index"></div>
			</div>
		</div>
	</div>
	<div class="foot" style="position:relative;text-align:center;">
	     <label id="p_num" style="float:left;position: absolute;left: 2%;top: 46%;"></label>
        <button id="to_sure" style="width:130px;margin-top: 10px;color:#fff;" class="layui-btn layui-btn-normal" onclick="to_return()">确定</button>
    	<button class="upload_img" style="position: absolute;right: 25px;top: 12px;">上传图片</button>
    </div>
</div>
<div class="widget-attachment modal hide in" aria-hidden="false" style="display: none; top: 0px;">
	<div class="js-main-region">
		<div>
			<div class="modal-header">		
				<a href="javascript:;" class="title js-show-image-view" style="margin-right: 4px;">&lt; 选择图片</a>
				<span style="font-size: 14px;"> | </span>

				<span class="title">上传图片</span>
			</div>
			<div class="modal-body" style="min-height: 350px; height: auto;">

				<div class="network-image-region">
					<!-- 
					<div class="title">网络图片：</div>
					<div class="content">
						<div class="input-append">
							<input type="text" placeholder="请添加网络图片地址" class="js-network-image-url span4">
							<button class="btn js-network-image-confirm" type="button" data-loading-text="提取中...">提取</button>
						</div>
						<div class="image-preview">
							<img src="" class="js-network-image-preview" style="display: none;">
						</div>
					</div>
					<div style="clear: both;"></div> 
					-->
				</div>

				<div class="local-image-region">
					<div class="title">本地图片：</div>
					<div class="content" style="">
						<div class="js-image-preview-region">
							<ul class="upload-local-image-list image-list ui-sortable"></ul>
						</div>
						<div class="js-add-local-attachment add-local-image-button pull-left" id="inputDiv">
							<input type="file" id="picture" value="添加 +" class="js-local-file"  accept="image/gif, image/jpeg, image/png" style="width: 80px;height: 80px;opacity: 0;">
							<span style="float: left;margin-top: -77px;margin-left: 25px;">+</span>
						</div>
						<div id="logoPicDiv" class="js-add-local-attachment add-local-image-button pull-left" style="width: 80px;height: 80px;">
							<img id="logoPic" name="logoPic" src="" width="80" height="80">
						</div>
						<div class="c-gray" style="clear: both; padding-top: 20px;">
							仅支持jpg、gif、png三种格式, 大小不超过3 MB
						</div>
						
					</div>
					<div style="clear: both;"></div>
				</div>
			</div>
			<div class="modal-footer clearfix">
				<div class="text-center">
					<button class="ui-btn ui-btn-disabled js-confirm" id="confirmButton">确定</button>
				</div>
			</div>
		</div>
	</div>
</div>
<script>
//点击上传图片按钮显示选择上传图片的对话框
$(".upload_img").on("click",function(){
	$(this).parents(".quanju").hide();
	$(this).parents(".quanju").next().show();
	//console.log($(this).parents("iframe").height());
});
$(".modal-header>a").on("click",function(){
	console.log("bb");
	$(this).parents(".widget-attachment").hide();
	$(".quanju").show();
});
</script>
</body>
</html>