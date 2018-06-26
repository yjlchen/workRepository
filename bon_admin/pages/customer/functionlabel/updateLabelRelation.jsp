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
    <script type="text/javascript" src="updateLabelRelation.js"></script>

    <link rel="stylesheet" href="../../commodity/manage/c_files/chosen.css"  media="screen">
	<!-- chosen插件js -->
    <script type="text/javascript" src="${basePath}/pages/commodity/manage/c_files/chosen.jquery.min.js"></script>
    
    <style type="text/css">
    	.chzn-container-multi .chzn-choices .search-field input{
    		height:auto !important;
    	}
    </style>
</head>
<body>
	
  	<div class="inner-page-main layui-clear">
	    <div class="inner-page-main-container" style="height:382px">
			<div style="padding-top: 20px;padding-right: 20px">
				<form  method="post">
				  <div class="layui-form-item">
				    <label class="layui-form-label"  required  style="width: 100px">标签名称</label>
				    <div class="layui-input-block" style="width: 500px">
				      <!-- <input type="text" id="name" name="name" maxlength="15"  lay-verify="name" placeholder="请输入标题" autocomplete="off" class="layui-input"> -->
				      <div style="padding-top: 9px;" id="lable-name"></div>
				      
				    </div>
				  </div>
				 <div class="layui-form-item" >
					<label class="layui-form-label" style="width: 100px;">关联标签</label>
					<div class="layui-input-block"  >
						<select name="label_id" id="label_id"  multiple="" style="width:500px"></select>
					</div>
				</div>
				  <div class="layui-form-item">
				    <div class="layui-input-block" >
				      <input type="button" class="layui-btn" lay-submit lay-filter="formdm" id="commit" value="确定">
				      <!-- <button type="reset" class="layui-btn layui-btn-primary">重置</button> -->
				    </div>
				  </div>
				  
				</form>
				</div>
		 </div>
	</div>
</body>
</html>