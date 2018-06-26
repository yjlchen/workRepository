<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>商品品牌管理</title>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript" src="${basePath }/pages/marketing/goodsbrand/goodsbrandList.js"></script>
<style type="text/css">
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
	#addBrandContent .layui-form-item .module-goods-list .goods-thumb{
		width: 50px;
    	height: 50px;
    	display: inline-block;
    	background-size: 100% 100%;
	}
	#addBrandContent .layui-form-item .module-goods-list li{
		position:relative;
	}
	#addBrandContent .layui-form-item .module-goods-list .close-modal{
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
</style>
</head>
<body>
  	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px;">商品品牌管理</span>
  	</div>
  	<div class="inner-page-main layui-clear">
	    <div class="inner-page-main-container">
		    <div >
		   		<a id="addBrand" class="layui-btn layui-btn-normal">添加品牌</a>
			</div>
			<div style="margin-left: -63px;margin-top: 15px;">
				<form id="brandForm" class="layui-form" action="">
			    	<div class="layui-form-item">
			    		<div class="layui-inline">
						    <label class="layui-form-label" style="width: 150px;">品牌名称：</label>
						    <div class="layui-input-inline">
						       <input id="brand_name_sel" name="brand_name" type="text"  placeholder="请输入品牌名称" autocomplete="off" class="layui-input" style="width: 200px;">
						    </div>
					    </div>
					    
					     <div class="layui-inline">
						     <div class="layui-input-inline layui-input-btn">
						        <a id="queryBrandInfo" class="layui-btn layui-btn-normal" style="height: 38px;margin-top: -5px;">筛选</a>
						     </div>
					 	 </div>
					 </div>
				</form>
			</div>
			<div class="tool_item clearfix">
		        <table id="brand_list" class="layui-table">
		        	<colgroup>
		        		<col width="14%">
		        		<col width="14%">
		        		<col width="14%">
		        		<col width="14%">
		        		<col width="14%">
		        		<col width="14%">
		        		<col width="16%">
		        	</colgroup>
					<thead id="cust_header">
					     <tr>
					     	 <th style="text-align: center;">所属国家</th>
							 <th style="text-align: center;">品牌名称</th>
							 <th style="text-align: center;">品牌图标</th>
							 <th style="text-align: center;">背景图片</th>
							 <th style="text-align: center;">添加时间</th>
							 <th style="text-align: center;">品牌介绍</th>
							 <th style="text-align: center;">操作</th>
						</tr>
					</thead>
				    <tbody>
					</tbody>
				</table>
		    </div>
		 </div>
	</div>
</body>
</html>