<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	String status = request.getParameter("status");
%>
<title>推广比例设置</title>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<link rel="stylesheet" href="../../commodity/manage/c_files/chosen.css"  media="screen">
<!-- chosen插件js -->
<script type="text/javascript" src="${basePath}/pages/commodity/manage/c_files/chosen.jquery.min.js"></script>
</head>
<style type="text/css">	
</style>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <div class="layui-tab layui-tab-brief" lay-filter="Tab" style="margin:0;">
	   <ul class="layui-tab-title" style="border-bottom:none;margin-bottom:9px;">
	     <li id="tab1" class="layui-this">商品比例</li>
	     <li id="tab2">音频比例</li>
	     <li id="tab3" >视频比例</li>
	   </ul>
	   <!-- <span style="font-size: 18px;font-weight:bold;">推广比例设置</span> -->
	   </div>
  	</div>
  	<div class="inner-page-main layui-clear">
	    <div class="inner-page-main-container">
		    <div style="margin-bottom:20px">
		       <form class="layui-form" id="queryform">
		        <!-- 判断选项卡 -->
		        <input type="hidden" value="1" name="type" id="type"/>
		   		<a id="addSetting" class="layui-btn layui-btn-normal">添加</a>
		   	   </form>
			</div>
			<div class="tool_item clearfix">
		        <table id="spread_list" class="layui-table">
		        	<colgroup>
		        		<col width="25%">
		        	    <col width="25%">
		        		<col width="25%">
		        		<col width="25%">
		        	</colgroup>
					<thead id="cust_header">
					     <tr>
						     <th style="text-align: center;">开始金额</th> 
					     	 <th style="text-align: center;">结束金额</th>
							 <th style="text-align: center;">奖金比例</th>
							 <th style="text-align: center;">操作</th>
						</tr>
					</thead>
				</table>
		    </div>
		 </div>
	</div>	
</body>
<script type="text/javascript" src="${basePath }/pages/bon/spreadRatio/spreadRatio.js"></script>
</html>