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
<link rel="stylesheet" href="${basePath}/tools/ztree/css/demo.css" type="text/css">
<link rel="stylesheet" href="${basePath}/tools/ztree/css/zTreeStyle/zTreeStyle.css" type="text/css">
<script type="text/javascript" src="${basePath}/tools/ztree/js/jquery.ztree.core.js"></script>
<script type="text/javascript" src="${basePath}/tools/ztree/js/jquery.ztree.excheck.js"></script>
<script type="text/javascript" src="roleManage.js"></script>

<title>角色管理</title>
</head>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px;font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif">角色管理</span>
  	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
<!-- 			<button class="layui-btn layui-btn-normal add" id="addRole">添加角色</button> -->
			<table class="layui-table" lay-even  id="roletable" style="margin-top:15px;">
			 	<colgroup>
				 	<col width="100">
				 	<col width="150">
				 	<col>
				 	<col>
				 	<col width="180">
				    <col width="150">
			    <col>
			  	</colgroup>
				<thead>
				  <tr>
				    <th style="text-align: center;">角色名称</th>
				    <th style="text-align: center;">角色说明</th>
				    <th style="text-align: center;">分配菜单</th>
				    <th style="text-align: center;">创建时间</th>
				    <th style="text-align: center;">操作</th>
				  </tr> 
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
	</div>
    <div id="authorized" style="display: none;margin-top: 10px;">
		<div class="layui-form-item" >
			<label class="layui-form-label" style="width: 100px;">菜单功能</label>
			<div class="layui-input-block"  >
				 <ul id="dataTree" class="ztree"></ul>
			</div>
		</div>
		
		 <div class="layui-input-inline layui-input-btn" style="margin-left: 122px;">
	        <button id="submitBtn" onclick="updateAuthor()" class="layui-btn layui-btn-normal">确定</button>
	        <button id="closeBtn" onclick="cancelAuthor()" class="layui-btn layui-btn-primary">取消</button>
	     </div>
	</div>
</body>
</html>