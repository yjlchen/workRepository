<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>商城后台</title>
    <jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
    <script type="text/javascript" src="companyLabel.js"></script>
	<link rel="stylesheet" href="${basePath}/tools/ztree/css/demo.css" type="text/css">
	<link rel="stylesheet" href="${basePath}/tools/ztree/css/zTreeStyle/zTreeStyle.css" type="text/css">
	<script type="text/javascript" src="${basePath}/tools/ztree/js/jquery.ztree.core.js"></script>
	<script type="text/javascript" src="${basePath}/tools/ztree/js/jquery.ztree.excheck.js"></script>
    <style type="text/css">
    	.chzn-container-multi .chzn-choices .search-field input{
    		height:auto !important;
    	}
    </style>
</head>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px;font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif">公司标签</span>
  	</div>
  	<div class="inner-page-main layui-clear">
	    <div class="inner-page-main-container" style="height:550px">
			<div style="padding-top: 30px;padding-right: 20px">
				<form  method="post">
				 <div class="layui-form-item" >
					<label class="layui-form-label" style="width: 100px;"><em style="color:red">*</em>标签设置</label>
					<div class="layui-input-block"  >
						<ul id="dataTree" class="ztree"></ul>
					</div>
				</div>
				  <div class="layui-form-item">
				    <div class="layui-input-block" >
				      <input type="button" class="layui-btn" lay-submit lay-filter="formdm" id="commit" value="确定">
				    </div>
				  </div>
				</form>
				</div>
		 </div>
	</div>
</body>
</html>