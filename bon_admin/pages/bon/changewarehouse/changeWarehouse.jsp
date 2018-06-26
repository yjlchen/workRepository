<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<jsp:include page="../../../commons/jsp/common2.0.jsp"></jsp:include>
<style>
	ul.layui-tab-title {
    margin-bottom: 0;
}
</style>	
<script type="text/javascript" src="${basePath}/pages/bon/changewarehouse/changeWarehouse.js"></script>
<title>切换发货仓库</title>
</head>
<body>
<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px;font-weight:bold;">切换发货仓库</span>
  	</div>
	<div class="inner-page-main ">
		<div class="inner-page-main-container">
			<div>
				<form class="layui-form" action="" id="queryform">
					<div class="layui-form-item" style="display: inline-block;">
						<label class="layui-form-label" style="width: 240px"><h4>请输入需要修改的订单号:</h4></label>
						<div class="layui-input-block">
							<input type="text" name="order_num" id="order_num" autocomplete="off" class="layui-input" style="margin-left: -100px;width:220px">
						</div>
					</div>
					<div class="layui-inline">
					     <div class="layui-input-inline layui-input-btn">
					        <a id="query" class="layui-btn" style="height: 38px;margin-top: -5px;">查询</a>
					        <a id="change" class="layui-btn" style="height: 38px;margin-top: -5px;display: none;">更换发货仓</a>
					     </div>
				 	 </div>
				</form>
			</div>
			<div class="tool_item clearfix" style="display: none;" id="tableD">
		        <table id="eaTable" class="layui-table">
		        <colgroup>
					    <col width="5%">
						<col width="25%">
						<col width="20%">
						<col width="15%">
						<col width="12%">
						<col width="12%">
						<col width="11%">
					</colgroup>
		        <thead>
				  <tr>
					<th style="text-align: center;" colspan="2">商品</th>
				    <th style="text-align: center;">订单号</th>
				    <th style="text-align: center;">单价</th>
					<th style="text-align: center;">数量</th>
					<th style="text-align: center;">规格</th>
					<th style="text-align: center;">当前发货仓库</th>
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