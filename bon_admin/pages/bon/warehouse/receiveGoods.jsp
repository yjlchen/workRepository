<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="../../../commons/jsp/common2.0.jsp"></jsp:include>
<title>退货商品仓库接收</title>
<style type="text/css">
</style>
</head>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px;font-weight:bold;">退货商品待收货</span>
  	</div>
	<div class="inner-page-main ">
		<div class="inner-page-main-container">
			<div class="tool_item clearfix" style="margin-top: 30px;">
		        <table id="eaTable" class="layui-table">
		        	<colgroup>
					    <col width="15%">
					</colgroup>
		        <thead>
				  <tr>
				    <th style="text-align: center;">退货单号</th>
					<th style="text-align: center;">商品名称</th>
				    <th style="text-align: center;">退货数量</th>
					<th style="text-align: center;">退款金额</th>
					<th style="text-align: center;">退货原因</th>
					<th style="text-align: center;">退货时间</th>
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
<script type="text/javascript" src="receiveGoods.js"></script>
</html>
