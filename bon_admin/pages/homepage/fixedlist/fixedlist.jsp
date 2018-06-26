<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>固定商品模块</title>		
<link rel="icon" href="">		
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript" src="${basePath}/pages/homepage/fixedlist/fixedlist.js"></script>
<style>
td{
	text-align: center;
}
</style>
</head>
<body>    
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px;">固定商品模块</span>
  	</div>
	<div class="inner-page-main ">
		<div class="inner-page-main-container">
			<div class="tool_item clearfix">
				<button class="layui-btn layui-btn-normal" id="add">添加模块</button>
				<button class="layui-btn layui-btn-normal" onclick="confirm()">确定显示顺序</button>
				<table id="fixedlist" class="layui-table" style="margin-top: 50px">
					<colgroup>
					   <col width="25%">
						<col width="25%">
						<col width="25%">
						<col width="25%">
					</colgroup>
					<thead>
						<tr>
							<th style="text-align: center;">模块名字</th>
							<th style="text-align: center;">模块显示图片</th>
							<th style="text-align: center;">显示顺序</th>
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
