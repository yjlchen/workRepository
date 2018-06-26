<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set 
value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增临时订单</title>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<link rel="stylesheet" href="${basePath}/pages/commodity/manage/c_files/chosen.css"  media="screen">
<!-- <script type="text/javascript" src="area.js"></script> -->
<style type="text/css">
	.app-design{
		min-width: 750px;
    	width: 750px;
    	margin: 15px auto 0;
	}
	.select-goods-box{
		margin-bottom:20px;
	}
	.select-goods-box:before{
		display: table;
    	line-height: 0;
    	content: "";
	}
	label.control-label{
		float: left;
		width:120px;
		text-align: right;
    	font-size: 14px;
    	line-height: 18px;
    	font-weight: normal;
	}
	em.required{
		font-size: 16px;
    	color: #f00;
    	vertical-align: middle;
	}
	.controls{
		margin-left:130px;
	}
	select{
		width:180px;
		height:25px;
		margin-right:15px;
		border:1px solid #AAAAAA;
		border-radius:5px;
		background-image: linear-gradient(#ffffff 20%, #f6f6f6 50%, #eeeeee 52%, #f4f4f4 100%);
	}
	button.option-box{
		margin-right:15px;
		padding:3px 10px;
		border:1px solid #ddd;
		border-radius:5px;
		background:#fff;
	}
	button.option-box.active{
		background:#4BB2FF;
		color:#fff;
		border-color:transparent;
	}
	input{
    	border: 1px solid #ccc;
    	-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    	-moz-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    	box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    	-webkit-transition: border linear .2s,box-shadow linear .2s;
    	-moz-transition: border linear .2s,box-shadow linear .2s;
    	-o-transition: border linear .2s,box-shadow linear .2s;
    	transition: border linear .2s,box-shadow linear .2s;
    	display: inline-block;
    	height: 30px;
    	padding: 4px 6px;
    	margin-bottom: 10px;
    	font-size: 14px;
    	line-height: 20px;
    	color: #555;
    	vertical-align: middle;
    	-webkit-border-radius: 4px;
    	-moz-border-radius: 4px;
    	border-radius: 4px;
	}
	.btn{
		padding:5px 12px;
	}
	.clear::after{
		content: ".";
        clear: both;
        display: block;
        overflow: hidden;
        font-size: 0;
        height: 0;
	}
	.clear{
		zoom:1;
	}
</style>
</head>
<body>
<div class="app-design">
	<div class="select-goods-box clear" id="goods_select">
		<label class="control-label" style="margin-top: 5px;">
			<em class="required">*</em>
			选择商品：
		</label>
		<div class="controls">
			<select id="choose_commodity" >
	      		<option value="">直接选择或搜索选择</option>
	      	</select>
	      	<input type="hidden" id="commodity_id" value="">
	      	<!-- 选中规格的隐藏域 -->
	      	<input type="hidden" class="js-sku-value">
	      	<!-- 商品名称隐藏域 -->
	      	<input type="hidden" id="commodity_name">
	      	<!-- 商品图片url隐藏域 -->
	      	<input type="hidden" id="commodity_url">
			<!-- <select name="">
				<option value="0">1</option>
				<option value="1">1</option>
				<option value="2">1</option>
				<option value="3">1</option>
			</select> -->
			<!-- <ul>
				<li>
					<input type="text"/>
				</li>
			</ul>
			<div class="menu">
				<ul>
					<li>商品一</li>
					<li>商品二</li>
					<li>商品三</li>
					<li>商品四</li>
					<li>商品五</li>
				</ul>
			</div>	 -->
		</div>
	</div>
	<!-- 包含3个规格的div -->
	<div id="chooseSpe" style="display: none;">
		<!-- 根据所选商品加载 -->
	</div>
	<div class="select-goods-box clear">
		<label class="control-label" style="margin-top: 5px;">
			<em class="required">*</em>
			购买数量：
		</label>
		<div class="controls">
			<input id="buyNumber" type="number" value="1" min="1">
		</div>
	</div>
	<div class="select-goods-box clear">
		<label class="control-label" style="margin-top: 5px;">
			<em class="required">*</em>
			库存：
		</label>
		<div class="controls">
			<input id="stock" type="number" disabled="disabled" value="">
		</div>
	</div>
	<div class="select-goods-box clear">
		<label class="control-label" style="margin-top: 5px;">
			<em class="required">*</em>
			单价：
		</label>
		<div class="controls">
			<input id="unitprice" type="text" disabled="disabled" value="">
		</div>
	</div>
	<div class="select-goods-box clear">
		<label class="control-label" style="margin-top: 5px;">
			<em class="required">*</em>
			总价：
		</label>
		<div class="controls">
			<input id="totalprice" type="text" disabled="disabled" value="">
		</div>
	</div>
	<div class="app-actions">
         <div class="form-actions text-left" style="margin-left:130px;">
         	<input class="btn btn-primary js-btn-save" type="button" value="保存" id="save">
         	<input class="btn js-btn-quit" type="button" value="返回">
    	</div>
    </div>
	<!-- <div class="select-goods-box">
		<label class="control-label" style="margin-top: 5px;">
			<em class="required">*</em>
			姓名：
		</label>
		<div class="controls">
			<input name="buyName" type="text">
		</div>
	</div>
	<div class="select-goods-box">
		<label class="control-label" style="margin-top: 5px;">
			<em class="required">*</em>
			电话：
		</label>
		<div class="controls">
			<input name="buyPhone" type="text">
		</div>
	</div>
	<div class="select-goods-box">
		<label class="control-label" style="margin-top: 5px;">
			<em class="required">*</em>
			地址：
		</label>
		<div class="controls">
			<select id="s_province" name="receipt_province" style="width:30%;float: left;">
			<option value="省份">省份</option>
			<option value="北京市">北京市</option>
			<option value="天津市">天津市</option>
			<option value="上海市">上海市</option>
			<option value="重庆市">重庆市</option><option value="河北省">河北省</option><option value="山西省">山西省</option><option value="内蒙古">内蒙古</option>
			<option value="辽宁省">辽宁省</option><option value="吉林省">吉林省</option><option value="黑龙江省">黑龙江省</option><option value="江苏省">江苏省</option>
			<option value="浙江省">浙江省</option><option value="安徽省">安徽省</option><option value="福建省">福建省</option><option value="江西省">江西省</option>
			<option value="山东省">山东省</option><option value="河南省">河南省</option><option value="湖北省">湖北省</option><option value="湖南省">湖南省</option>
			<option value="广东省">广东省</option><option value="广西">广西</option><option value="海南省">海南省</option><option value="四川省">四川省</option>
			<option value="贵州省">贵州省</option><option value="云南省">云南省</option><option value="西藏">西藏</option><option value="陕西省">陕西省</option>
			<option value="甘肃省">甘肃省</option><option value="青海省">青海省</option><option value="宁夏">宁夏</option><option value="新疆">新疆</option>
			<option value="香港">香港</option><option value="澳门">澳门</option><option value="台湾省">台湾省</option></select>  
			<select id="s_city" name="receipt_city" style="width:30%;float: left;"><option value="地级市">地级市</option></select>  					
			<select id="s_county" name="receipt_county" style="width:30%;float: left;"><option value="市、县级市">市、县级市</option></select>
		</div>
	</div> -->
</div>
<!-- chosen插件js -->
<script type="text/javascript" src="${basePath}/pages/commodity/manage/c_files/chosen.jquery.min.js"></script>
<script type="text/javascript" src="${basePath}/pages/order/temporaryOrder/addTemporaryOrder.js"></script>
</body>
</html>