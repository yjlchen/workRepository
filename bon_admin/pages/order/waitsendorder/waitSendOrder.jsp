<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />

<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<link type="text/css" rel="stylesheet" href="${basePath}/commons/plugin/paging/4a86166a.vendor.css">
<link type="text/css" rel="stylesheet" href="${basePath}/commons/plugin/paging/9e24f281.app.css">
<link type="text/css" rel="stylesheet" href="${basePath}/commons/plugin/paging/font-awesome.min.css">
<link type="text/css" rel="stylesheet" href="${basePath}/pages/order/allorder/pc.css">
<link type="text/css" rel="stylesheet" href="${basePath}/pages/order/allorder/orderDetails.css">
<script type="text/javascript" src="waitSendOrder.js"></script>
<style>
.layui-table tr:hover, .layui-table[lay-even] tr:nth-child(even) {
    background-color: #ffffff;
}
.layui-table thead tr:hover{
    background-color: #f2f2f2;
}
.layui-table tr{
	border-left:1px
}
.botton-orange>a{
    padding: 3px 8px;
    margin-top: 5px;
    color: #f90;
    display: inline-block;
    border: 1px solid #f90;
    border-radius: 5px
}
.button-click{
	display: inline-block;
    padding: 3px;
    margin-top: 5px;
    background: #f8f8f8;
    color: #333;
    border: 1px solid #ddd
}
.tb-name{
    "width": "140px"
}
.tb-price{
    "width": "70px"
}
.tb-num {
    "width": "40px"
}
.tb-total {
    "width": "70px"
}
.tb-coupon {
    "width": "100px"
}
.tb-discount {
    "width": "40px"
}
.tb-postage {
    "width": "76px"
}
</style>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px;">待发货订单</span>
  	</div>
  	
	<div class="inner-page-main ">
		<div class="inner-page-main-container">
			<div id="atable">
				<table class='layui-table' id='orderTable' style='border-collapse:collapse'>
					<thead id='bar_head'>
						<tr>
							<th colspan=2  style='text-align: center;width:47%'>商品</th>
							<th style='text-align: center;width:6%'>单价/数量</th>
							<th style='text-align: center;width:8%'>售后</th>
							<th style='text-align: center;width:10%'>买家</th>
							<th style='text-align: center;width:7%'>下单时间</th>
							<th style='text-align: center;width:7%'>订单状态</th>
							<th style='text-align: center;width:15%'>实付金额</th>
						</tr> 
					</thead>
					<tbody id="tbody">
					
					</tbody>
				</table>
			</div>
			<div class="margin-bottom-10">
				<div class="text-center" id="page_index">
				</div>
			</div>
			<div class="zent-dialog-backdrop" style="display:none"></div>
			<!-- 以下为发货 -->
			<div class="zent-dialog widget-order-express" style="position:fixed;top: 30%;left:50%;width:742px;display:none">
				<div class="zent-dialog-header ">
					<h3 class="zent-dialog-title"> 商品发货</h3>
					<a href="javascript:;" class="zent-dialog-close">×</a>
				</div>
				<div class="zent-dialog-body">
					<div class="js-total-express total-express"></div>
					<div class="add-express-table-control">
						<div class="js-modal-table">
							<table class="ui-table">
								<thead>
									<tr>
									<!-- 
										<th class="text-right cell-5">
											<input type="checkbox" class="js-check-all">
										</th> -->
										<th class="cell-35">商品</th>
										<th class="cell-15">数量</th>
										
										<th class="cell-30">物流 | 单号</th>
										<th class="cell-20">状态</th>
									</tr>
								</thead>
								<tbody id="logistics-table"></tbody>
							</table>
						</div>
						<p class="js-goods-tips hide error-goods-tips">请选择发货商品</p>
					</div>
					<form onsubmit="return false;" class="form-horizontal" id="subfm">
						<input type="hidden" name="isAll" class="goods">
						<div class="control-group" style="margin-top: 20px">
							<label class="control-label" style="width:85px">收货地址：</label>
							<div class="controls" style="margin-left: 100px;">
								<div class="control-action">
								</div>
							</div>
						</div>
						<div class="clearfix control-2-col js-express-info control-group">
							<div class="layui-inline" style="display: inline-block;">
								<div class="layui-inline">
									<label class="layui-form-label" style="width: 100px;margin-top: -4px">物流公司：</label>
									<div class="layui-input-block"   >
										<select name="logistics_name" id="logistics_name" lay-search=""  style="width: 120px; margin-top: 1px;height: 26px">
				                        </select>
									</div>
								</div>
								 
								<div class="layui-inline express" style="margin-left: 50px">
									<label class="layui-form-label" style="width: 100px;margin-top: -6px">快递单号：</label>
									<div class="layui-input-block"  >
										<input style="height:30px" type="text" name="courier_number" id="courier_number" autocomplete="off" class="layui-input" maxlength="16">
									</div>
									
								</div>
								<div>
									<p class="help-block error-message hide" style="margin-left: 396px;color: red">请填写快递单号</p>
								</div>
							</div>
							<div style="clear: both;opacity: 0.6; line-height: 14px;font-size: 12px; margin-top: 6px;margin-bottom: 0;margin-left: 11px;">
								*请仔细填写物流公司及快递单号，填写后无法修改
							</div> 
						</div>
						
					</form>
				</div>
				<div class="zent-dialog-footer">
					<a class="zent-btn zent-btn-primary js-save send-delivery" onclick="check()">保存</a>
				</div>
			</div>
			
			
			
			<!-- 以下为修改物流 -->
			<!-- <div class="zent-dialog widget-express-update-dialog" style="position:fixed;top: 30%;left:50%;width:645px;display: none;" >
				<div class="zent-dialog-header ">
					<div class="zent-dialog-title">修改物流</div>
					<a href="javascript:;" class="zent-dialog-close">×</a>
				</div>
			
				<div class="zent-dialog-body" style="padding-bottom: 0;">
					<p class="update-express-tips">
						请仔细填写快递单号
					</p>
					<form onsubmit="return false;" class="js-express-form form-horizontal" style="margin-bottom: 0;" id="updateForm">
						<div id="package-div">
							
			
						</div>
					</form>
				</div>
			
				<div class="zent-dialog-footer" style="clear: both;">
					<button class="js-save zent-btn zent-btn-primary change-logistics">保存</button>
					<button class="js-close zent-btn zent-btn-primary-outline">取消</button>
				</div>
			
			</div>
			<div class="zent-dialog express-confirm-dialog" style="position:fixed;top: 35%;left:50%; width:550px;display: none;">
				<div class="zent-dialog-header">
					<div class="zent-dialog-title">确认修改信息</div>
					<a href="javascript:;" class="zent-dialog-close">×</a>
				</div>
			
				<div class="zent-dialog-body">
					<div style="color: #666">
						<table class="ui-table">
							<thead>
								<tr>
									<th>包裹</th>
									<th>商品数量</th>
									<th>发货方式</th>
									<th>物流公司</th>
									<th>快递单号</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
				</div>
			
				<div class="zent-dialog-footer">
					<button class="zent-btn zent-btn-primary-outline js-cancel">返回修改</button>
					<button class="zent-btn zent-btn-primary js-confirm">确认修改</button>
				</div>
			</div> -->
		</div>
	</div>
</body>
