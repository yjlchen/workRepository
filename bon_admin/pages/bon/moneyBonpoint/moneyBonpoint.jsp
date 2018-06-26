<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title></title>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<link rel="stylesheet" href="../../commodity/manage/c_files/chosen.css"  media="screen">
<!-- chosen插件js -->
<script type="text/javascript" src="${basePath}/pages/commodity/manage/c_files/chosen.jquery.min.js"></script>
<script type="text/javascript" src="${basePath }/pages/bon/moneyBonpoint/moneyBonpoint.js"></script>
</head>
<style type="text/css">	
</style>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px;">金额棒点设置</span>
  	</div>
  	<div class="inner-page-main layui-clear">
	    <div class="inner-page-main-container">
		    <div >
		   		<a id="addBon" class="layui-btn layui-btn-normal">添加</a>
			</div>
			<div style="margin-left: -63px;margin-top: 15px;">

			</div>
			<div class="tool_item clearfix">
		        <table id="Bon_list" class="layui-table">
		        	<colgroup>
		        		<col width="30%">
		        	    <col width="30%">
		        		<col width="40%">
		        	</colgroup>
					<thead id="cust_header">
					     <tr>
						     <th style="text-align: center;">金额数</th> 
					     	 <th style="text-align: center;">棒点数</th>
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