<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>商品品牌</title>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<link rel="stylesheet" href="../../commodity/manage/c_files/chosen.css"  media="screen">
<!-- chosen插件js -->
<script type="text/javascript" src="${basePath}/pages/commodity/manage/c_files/chosen.jquery.min.js"></script>
<script type="text/javascript" src="${basePath }/pages/marketing/fullReduce/addLabel.js"></script>
</head>
<style type="text/css">
	.chzn-container-multi .chzn-choices .search-field input{
    	height:auto !important;
    }
	.icon-add {
		display: inline-block;
		width: 14px;
		height: 14px;
		background-image: url("${basePath}/pages/order/allorder/icon-add.png");
		background-repeat: no-repeat;
		background-position: 0
	}
	
	.module-goods-list li .add-goods,
	.module-goods-list li .add,
	.app-image-list li .add-goods,
	.app-image-list li .add {
		display: inline-block;
		width: 100%;
		height: 100%;
		line-height: 50px;
		text-align: center;
		cursor: pointer
	}
	#addBannerContent .layui-form-item .module-goods-list .goods-thumb{
		width: 50px;
    	height: 50px;
    	display: inline-block;
    	background-size: 100% 100%;
	}
	#addBannerContent .layui-form-item .module-goods-list li{
		position:relative;
	}
	#addBannerContent .layui-form-item .module-goods-list .close-modal{
		position: absolute;
    	top: -8px;
    	right: -8px;
    	width: 18px;
    	height: 18px;
    	font-size: 14px;
    	line-height: 16px;
    	border-radius: 9px;
    	background: rgba(153, 153, 153, 0.6);
    	text-align: center;
    	color:#fff;
	}
	.layui-anim-upbit{
		width: 300px;
	}
</style>
<body>
	<div id="addLabelContent" style="margin-top: 10px;">
		<div class="layui-form-item" >
			<label class="layui-form-label" style="width: 100px;">活动标签</label>
			<div class="layui-input-block"  >
				<select name="label_id" id="label_id"  multiple="multiple" style="width:230px">
				</select>
			</div>
		</div>
		
		 <div class="layui-input-inline layui-input-btn" style="margin-left: 122px;">
	        <button id="submitBtn" class="layui-btn layui-btn-normal">确定</button>
	        <button id="closeBtn" class="layui-btn layui-btn-primary">取消</button>
	     </div>
	</div>
</body>
</html>