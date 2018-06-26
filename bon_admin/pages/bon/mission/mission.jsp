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
<script type="text/javascript" src="${basePath }/pages/bon/mission/mission.js"></script>
</head>
<style type="text/css">	
</style>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px;">每日任务</span>
  	</div>
  	<div class="inner-page-main layui-clear">
	    <div class="inner-page-main-container">
		    <div >
		   		<a id="addMission" class="layui-btn layui-btn-normal">添加</a>
			</div>
			<div style="margin-left: -63px;margin-top: 15px;">
		<!-- 		<form id="missionForm" class="layui-form" action="">
			    	<div class="layui-form-item">
			    		<div class="layui-inline">
						    <label class="layui-form-label" style="width: 150px;margin-left: 10px;">任务类型：</label>
						    <div class="layui-input-inline">
						       <input id="type" name="type"  placeholder="请输入任务类型" autocomplete="off" class="layui-input" style="width: 200px;">
						    </div>
					    </div>
					    
					     <div class="layui-inline">
						     <div class="layui-input-inline layui-input-btn">
						        <a id="queryMissionInfo" class="layui-btn layui-btn-normal" style="height: 38px;margin-top: -5px;">筛选</a>
						     </div>
					 	 </div>
					 </div>
				</form> -->
			</div>
			<div class="tool_item clearfix">
		        <table id="mission_list" class="layui-table">
		        	<colgroup>
		        		<col width="20%">
		        	    <col width="20%">
		        		<col width="20%">
		        		<col width="20%">
		        		<col width="20%">
		        	</colgroup>
					<thead id="cust_header">
					     <tr>
						     <th style="text-align: center;">序号</th> 
					     	 <th style="text-align: center;">任务类型名称</th>
							 <th style="text-align: center;">分值设置</th>
							 <th style="text-align: center;">每日有效次数</th>
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