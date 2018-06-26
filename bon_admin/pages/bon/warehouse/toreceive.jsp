<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>确定收货</title>
<jsp:include page="../../../commons/jsp/common2.0.jsp"></jsp:include>
<script type="text/javascript" src="toreceive.js"></script>
<style type="text/css">
em.required {
    font-size: 16px;
    color: #f00;
    vertical-align: middle;
}
</style>
</head>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
		<span style="font-size: 18px;">确定收货</span>
	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<div style="padding-top: 20px; padding-right: 20px">
				<form id="addOrUpdateForm" class="layui-form" action="">
			    	<div>
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><em class="required">*</em>商品描述：</label>
							    <div class="layui-input-inline" > 
							      <textarea rows="5" cols="60" lay-verify="required" id="description" name="description" maxlength="250"></textarea>
							    </div>
						    </div>
						 </div>
					 	 <div class="layui-inline" style="margin-left: 50px;">
						    <div class="layui-input-inline layui-input-btn">
						    	<button class="layui-btn" lay-submit lay-filter="formDemoSend" id="commitSend">提交</button>
     						 	<a id="backPage" class="layui-btn layui-btn-primary" >取消</a>
						    </div>
					 	 </div>
					</div>
				</form>
			</div>
		</div>
	</div>
</body>
</html>