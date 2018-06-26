<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript" src="${basePath}/pages/order/temporaryOrder/allOrder.js"></script>
<title>临时订单列表</title>
</head>
<body>
	<div class="inner-page-top" style="padding:18px 21px 17px;">所有订单</div>
	<div class="inner-page-main ">
		<div class="inner-page-main-container">
			<div style="padding-top: 20px;margin-bottom: 20px">
				<form class="layui-form" action="" id="queryOrderForm">
					<div>
						<div class="layui-form-item" style="display: inline-block;">
							<label class="layui-form-label" style="width: 100px;">订单号:</label>
							<div class="layui-input-block">
								<input type="text" name="order_num" autocomplete="off" class="layui-input" style="margin-left: -20px">
							</div>
						</div>
						<div class="layui-form-item" style="display: inline-block;">
							<label class="layui-form-label" style="width: 100px;">收货人:</label>
							<div class="layui-input-block">
								<input type="text" name="delivery_person_name" autocomplete="off" class="layui-input" style="margin-left: -20px">
							</div>
						</div>
						<div class="layui-form-item" style="display: inline-block;">
							<label class="layui-form-label" style="width: 100px;">收货电话:</label>
							<div class="layui-input-block">
								<input type="text" name="delivery_phone" autocomplete="off" class="layui-input" style="margin-left: -20px">
							</div>
						</div>
						<div class="layui-form-item" style="display: inline-block">
							<label class="layui-form-label" style="width: 100px;">订单状态:</label>
							<div class="layui-input-block" style="width: 120px">
								<select lay-filter="test"  id="orderstate" name="order_state">
									<option selected="selected" value="0">所有</option>
									<option value="1">待付款</option>
									<option value="2">待发货</option>
									<option value="3">已发货</option>
									<option value="4">已完成</option>
									<option value="5">已关闭</option>
									<option value="6">退款中</option>
								</select>
							 </div>
						</div>
						
					</div>
					
						
						
					<div class="layui-form-item" style="width: 600px; display: inline-block">
						<label class="layui-form-label" style="width: 100px;margin-left: 12px;">下单时间:</label>
						<div class="layui-input-inline"  style="width: 120px">
							<input type="text" name="start_time" id="date"  autocomplete="off" 
									class="layui-input" style="margin-left: -10px" onclick="layui.laydate({elem: this})">
						</div>
						<div class="layui-form-mid" style="margin-left: -18px">-</div>
						<div class="layui-input-inline"  style="width: 120px">
							<input type="text" name="end_time" id="date"  autocomplete="off" class="layui-input" onclick="layui.laydate({elem: this})"
							style="margin-left: -10px">
						</div>
						<button class="layui-btn layui-btn-normal" lay-submit lay-filter="formdm" id="commit">筛选</button>
					</div>
				</form>
				<button class="layui-btn layui-btn-normal"  id="addTemporaryOrder">新建</button>
			</div>
			<div class="layui-tab" lay-filter="ordertab">
			  <ul class="layui-tab-title">
			    <li class="layui-this">全部</li>
			    <li lay-id="1">待付款</li>
			    <li lay-id="2">待发货</li>
			    <li lay-id="3">已发货</li>
			    <li lay-id="4">已完成</li>
			    <li lay-id="5">已关闭</li>
			    <li lay-id="6">退款中</li>
			  </ul>
			  <div id="allOrder"></div>
			
		</div>
	</div>	
	</div>
</body>
</html>
