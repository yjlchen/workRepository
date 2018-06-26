<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<!-- chosen插件js -->
<link rel="stylesheet" href="../../commodity/manage/c_files/chosen.css"  media="screen">
<script type="text/javascript" src="${basePath}/pages/commodity/manage/c_files/chosen.jquery.min.js"></script>
<script type="text/javascript" src="${basePath}/pages/cm/empmanage/empmanage.js"></script>
<title>员工管理列表</title>
</head>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px;">员工管理</span>
  	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<button class="layui-btn layui-btn-normal" id="addEmp">添加员工</button>
<!-- 			<button class="layui-btn layui-btn-normal" id="addDept">添加团队</button> -->
			<table class="layui-table" lay-even lay-skin="line" id="emptable" style="margin-top:15px;">
			 	<colgroup>
				 	<col>
				 	<col>
				 	<col>
				 	<col>
				 	<col>
				 	<col>
				    <col width="150">
			    <col>
			  	</colgroup>
				<thead>
				  <tr>
				    <th style="text-align: center;">登陆账户</th>
				    <th style="text-align: center;">员工姓名</th>
				    <th style="text-align: center;">所属团队</th>
				    <th style="text-align: center;">联系方式</th>
				    <th style="text-align: center;">赋予角色</th>
				    <th style="text-align: center;">添加时间</th>
				    <th style="text-align: center;">操作</th>
				  </tr> 
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
	</div>
    <div id="addLabelContent" style="display: none;margin-top: 10px;">
		<div class="layui-form-item"  >
			<label class="layui-form-label" style="width: 100px;">角色选择</label>
			<div class="layui-input-block"  >
				<select name="role_id" id="role_id"  multiple="" style="width:230px;height:30px">
				</select>
			</div>
		</div>
		 <div class="layui-input-inline layui-input-btn" style="margin-left: 122px;">
	        <button id="submitBtn" onclick="tusub()" class="layui-btn layui-btn-normal">确定</button>
	        <button id="closeBtn" onclick="tuclose()" class="layui-btn layui-btn-primary">取消</button>
	     </div>
	</div>
</body>
</html>