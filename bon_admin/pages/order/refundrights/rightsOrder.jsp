<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">


<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript" src="${basePath}/pages/order/refundrights/rightsOrder.js"></script>
<title>退款维权</title>
</head>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px;"> 退款维权</span>
  	</div>
	<div class="inner-page-main ">
		<div class="inner-page-main-container">
			<div style="padding-top: 20px;margin-bottom: 20px">
				<form class="layui-form" action="" id="queryOrderForm">
					<div>
						<div class="layui-form-item" style="display: inline-block;">
							<label class="layui-form-label" style="width: 100px">订单编号:</label>
							<div class="layui-input-block">
								<input type="text" name="order_num" autocomplete="off" class="layui-input" style="margin-left: -20px">
							</div>
						</div>
						<div class="layui-form-item" style="display: inline-block;">
							<label class="layui-form-label" style="width: 100px">退款编号:</label>
							<div class="layui-input-block">
								<input type="text" name="id" autocomplete="off" class="layui-input" style="margin-left: -20px">
							</div>
						</div>
						<div class="layui-form-item" style="display: inline-block">
							<label class="layui-form-label" style="width: 100px">退款类型:</label>
							<div class="layui-input-block" style="width: 120px">
								<select lay-filter="test"  id="refundstype" name="refund_type">
									<option value="2">所有</option>
									<option value="0">售中退款</option>
									<option value="1">售后退款</option>
								</select>
							 </div>
						</div>
						<div class="layui-form-item" style="display: inline-block">
							<label class="layui-form-label" style="width: 100px">退款状态:</label>
							<div class="layui-input-block" style="width: 120px">
								<select lay-filter="test"  id="commodityrefunds" name="commodity_refunds">
									<option value="0">所有</option>
									<option value="1">退款处理中</option>
									<option value="2">退款申请等待卖家确认</option>
									<option value="3">退款申请达成等待买家退货</option>
									<option value="4">买家已退货等待卖家确认收货</option>
									<option value="5">卖家未收到货不同意退款申请</option>
									<option value="6">退款成功</option>
									<option value="7">退款关闭</option>
								</select>
							 </div>
						 </div>
						 
						 <div class="layui-form-item" style="width: 450px;display: inline-block;margin-bottom: -19px ">
							<label class="layui-form-label" style="width: 100px;">申请时间:</label>
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
					</div>
				</form>
			</div>
			<div class="layui-tab" lay-filter="rightstab">
			  <ul class="layui-tab-title">
			    <li class="layui-this" lay-id="0">全部</li>
			    <li lay-id="1">退款处理中</li>
			    <li lay-id="2">退款成功</li>
			    <li lay-id="3">退款关闭</li>
			  </ul>
			  <div id="rightsOrder" style="margin-top: 30px;margin-bottom: 50px"></div>
			
		</div>
	</div>	
	</div>
</body>
</html>
