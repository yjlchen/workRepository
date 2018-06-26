<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>banner加标签</title>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<link rel="stylesheet" href="../../commodity/manage/c_files/chosen.css"  media="screen">
<!-- chosen插件js -->
<script type="text/javascript" src="${basePath}/pages/commodity/manage/c_files/chosen.jquery.min.js"></script>
<script type="text/javascript" src="${basePath }/pages/homepage/banner/addLabel.js"></script>
</head>
<body>
	<div id="addLabelContent" style="margin-top: 10px;">
		<div class="layui-form-item" >
			<label class="layui-form-label" style="width: 100px;">标签</label>
			<div class="layui-input-block"  >
				<select name="label_id" id="label_id"  multiple="" style="width:230px">
				</select>
			</div>
		</div>
		
		 <div class="layui-input-inline layui-input-btn" style="margin-left: 122px;">
	        <button id="submitBtn" class="layui-btn layui-btn-normal">确定</button>
	        <button id="closeBtn" class="layui-btn layui-btn-primary">取消</button>
	     </div>
	</div>
</body>
</html>