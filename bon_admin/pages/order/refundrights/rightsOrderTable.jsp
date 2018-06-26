<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />	
<script type="text/javascript" src="${basePath}/pages/order/refundrights/rightsOrderTable.js"></script>
<body>
	<div>
		<table class="layui-table" id="atable">
			<colgroup>
				<col width="15%">
				<col width="10%">
				<col width="15%">
				<col width="10%">
				<col width="10%">
				<col width="15%">
				<col width="10%">
				<col width="15%">
			</colgroup>
			<thead id="header">
			  <tr>
			    <th style="text-align: center;">退款编号</th>
			    <th style="text-align: center;">退款方式</th>
			    <th style="text-align: center;">订单编号/商品</th>
			    <th style="text-align: center;">订单金额</th>
			    <th style="text-align: center;">退款金额</th>
			    <th style="text-align: center;">申请时间</th>
			    <th style="text-align: center;">退款状态</th>
			    <th style="text-align: center;">操作</th>
			  </tr> 
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
</body>
