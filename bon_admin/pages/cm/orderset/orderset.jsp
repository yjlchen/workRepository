<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">


<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript" src="${basePath}/pages/cm/orderset/orderset.js"></script>
<title>Insert title here</title>
</head>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px">订单设置</span>
  	</div>
	<div class="inner-page-main ">
		<div class="inner-page-main-container">
			<form class="layui-form" action="" id="orderSetForm">
				<div>
					<div class="layui-form-item"><b>待付款订单取消时间设置</b></div>
					<div>
						拍下未付款订单
						<input type="text" name="auto_cancel_min" id="auto_cancel_min" lay-verify="auto_cancel_min" autocomplete="off" style="width:50px">
						分钟内未付款，自动取消订单
					</div>
				</div>
				<div style="margin-top: 30px">
					<div class="layui-form-item"><b>发货后自动确认收货时间设置</b></div>
					<div>
						发货后
						<input type="text" name="auto_sure_day" id="auto_sure_day" lay-verify="auto_sure_day" autocomplete="off" style="width:50px">
						天，自动确认收货
					</div>
				</div>
				<div style="margin-top: 30px" >
					<div class="layui-form-item"><b>未付款提醒设置</b></div>
					<div>
						拍下未付款订单距离订单过期
						<input type="text" name="auto_unpaid_remain" id="auto_unpaid_remain" lay-verify="auto_remind_pay" autocomplete="off" style="width:50px">
						分钟，发送未付款提醒
					</div>
				</div>
				<div style="margin: 30px 1px" >
					<div class="layui-form-item"><b>退货地址设置</b></div>
					<div>
						请输入退货地址
						<input type="text" name="refund_address" id="refund_address" lay-verify="auto_sure_adress" autocomplete="off" style="width:250px">
						
					</div>
				</div>				
								
				<button class="layui-btn  layui-btn-small layui-btn-normal" lay-submit 
						lay-filter="formdm" id="commit">保存</button>
			</form>
		</div>
	</div>	
</body>
</html>
