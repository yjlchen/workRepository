<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>评价管理 </title>		
<link rel="icon" href="">		
<link rel="stylesheet" href="${basePath}/pages/order/css/chosen.css" media="screen">
<link rel="stylesheet" href="${basePath}/pages/order/css/pc.css" media="screen">				
<style type="text/css" media="print">
.tableFloatingHeader{display:none !important;}
.tableFloatingHeaderOriginal{position:static !important;}
</style>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript" src="${basePath}/pages/order/evaluate/evaluate.js"></script>
<style>
	.reply-dialog textarea {
	    border-radius: 0;
	    width: 100%;
	    margin-bottom: 0;
	    -webkit-box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    box-sizing: border-box;
	    resize: vertical;
	}
	.reply-dialog .actions {
	    float: right;
	    margin-top: 10px;
	    text-align: right;
	}
	.reply-dialog .images {
	    margin-right: 100px;
	}
	.images {
	    margin-top: 10px;
	}
	.images .image {
	    position: relative;
	    display: inline-block;
	    margin-right: 10px;
	    cursor: pointer;
	}
	.reply-dialog .add-image {
	    display: table-cell;
	    vertical-align: middle;
	    text-align: center;
	    width: 60px;
	    height: 60px;
	    -webkit-box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    box-sizing: border-box;
	    border: 2px dashed #e5e5e5;
	    font-size: 30px;
	    color: #e5e5e5;
	}
	.review-table-list strong {
	    font-weight: bold;
	}
	.seller-comment {
	    margin-top: 25px;
	}
	/* 评价管理**/
	div#app-container {
    border: 1px solid #e5e5e5;
    background-color: #F2F2F2;
    height: auto;
    overflow: hidden;
    padding-left: 0.2%;
	}
</style>
</head>
<body>
	  <div class="layui-tab layui-tab-brief" lay-filter="evaluateTab" style="margin:0;">
		  <ul class="layui-tab-title" style="border-bottom:none;">
		    <li class="layui-this">所有评价</li>
		    <li>好评</li>
		    <li>中评</li>
		    <li>差评</li>
		  </ul>
		</div>      
	<div id="app-container" class="container" style="margin:0;">
			<div class="app-inner clearfix">
				<div class="app-init-container">
					<div class="app__content js-app-main page-trade-review">
						<div class="widget-list">
							<div class="ui-box">
								<table class="ui-table ui-table-list review-table-list" style="padding: 0px;" id="evaluateTable">
									<thead class="js-list-header-region tableFloatingHeaderOriginal" 
										style="position: static; top: 0px; margin-top: 0px; left: 225px; z-index: 1; width: 1453px;" 
										id="evaluateTableHead">
										<tr class="widget-list-header">
											<th class="cell-30" style="max-width: 436px;">商品评价</th>
											<th class="cell-15" style="min-width: 160px; max-width: 218px;">商品信息</th>
											<th class="cell-20" style="min-width: 230px; max-width: 291px;">订单号</th>
											<th class="cell-15" style="min-width: 180px; max-width: 218px;">买家</th>
											<th class="cell-10" style="min-width: 109px; max-width: 145px;">评价时间</th>
											<th class="cell-10 text-right" style="min-width: 145px; max-width: 145px;">操作</th>
										</tr>
									</thead>
									<thead class="js-list-header-region tableFloatingHeader" style="display: none;">
										<tr class="widget-list-header">
											<th class="cell-30">商品评价</th>
											<th class="cell-15">商品信息</th>
											<th class="cell-20">订单号</th>
											<th class="cell-15">买家</th>
											<th class="cell-10">评价时间</th>
											<th class="cell-10 text-right">操作</th>
										</tr>
									</thead>
								</table>
								<div class="js-list-empty-region"></div>
							</div>
							<div class="margin-bottom-10">
								<div class="text-center" id="page_index">
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="notify-bar js-notify animated hinge hide">
				</div>
			</div>
		</div>
</body>
</html>
