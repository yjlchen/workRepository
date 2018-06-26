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
    <title>功能标签编辑</title>
    <jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
    <script type="text/javascript" src="addOrUpdateFunctionLabel.js?11"></script>

    
</head>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px;">功能标签编辑</span>
  	</div>
  	<div class="inner-page-main layui-clear">
	    <div class="inner-page-main-container">
			<div style="padding-top: 20px;padding-right: 20px">
				<form id="label_form" method="post">
				  <div class="layui-form-item">
				    <label class="layui-form-label"  required  style="width: 100px">标签名称：</label>
				    <div class="layui-input-block">
				      <input type="text" id="name" name="name" required maxlength="20" placeholder="请输入名字" autocomplete="off" class="layui-input">
				    </div>
				  </div>
<!-- 				  <div class="layui-form-item"> -->
<!-- 				    <label class="layui-form-label" style="width: 100px">标题：</label> -->
<!-- 				    <div class="layui-input-block"> -->
<!-- 				      <input type="text" id="title" name="title" required  maxlength="100" placeholder="请输入标题" autocomplete="off" class="layui-input"> -->
<!-- 				    </div> -->
<!-- 				  </div> -->
<!-- 				  <div class="layui-form-item"> -->
<!-- 				    <label class="layui-form-label" style="width: 100px">关键词：</label> -->
<!-- 				    <div class="layui-input-block"> -->
<!-- 				      <input type="text" id="keywords" name="keywords" required   maxlength="250" placeholder="请输入关键词" autocomplete="off" class="layui-input"> -->
<!-- 				    </div> -->
<!-- 				  </div> -->
<!-- 				  <div class="layui-form-item"> -->
<!-- 				    <label class="layui-form-label" style="width: 100px">描述：</label> -->
<!-- 				    <div class="layui-input-block"> -->
<!-- 				      <input type="text" id="description" name="description" required  maxlength="250" placeholder="请输入描述" autocomplete="off" class="layui-input"> -->
<!-- 				    </div> -->
<!-- 				  </div> -->
				  <div class="layui-form-item">
				    <label class="layui-form-label" style="width: 100px">排序：</label>
				    <div class="layui-input-block">
				      <input type="text" id="sort" name="sort" required maxlength="5" placeholder="请输入排序，值越小越靠前" autocomplete="off" class="layui-input">
				    </div>
				  </div>
				  <div class="layui-form-item">
				    <label class="layui-form-label" style="width: 100px">标签图片：</label>
				    <div class="layui-input-block" style="position: relative;">
				      	<div ><img id="imgc" style="width:200px" src="${basePath}/commons/images/addpicture.jpg"></div>
				      	<a href="javascipt:;" style="display: none" id="pic">
				      		<span style="position: absolute; border: 1px solid #ddd;left: 185px;top: -9px;
   							 border-radius: 50%;padding: 2px 7px;background: #aaa;color: #fff;">X</span>
   						</a>
				    </div>
				  </div>
				 
				  <div class="layui-form-item">
				    <div class="layui-input-block" >
<!-- 				      <input type="button" class="layui-btn" lay-submit lay-filter="formdm" id="commit" value="确定">
				      <button id="reset" type="back" class="layui-btn layui-btn-primary">返回</button> -->
					    <button class="layui-btn" lay-submit lay-filter="formdm" id="commit">提交</button>
						 <a class="layui-btn" id="back">返回</a>
				    </div>
				  </div>
				  
				</form>
				</div>
		 </div>
	</div>
</body>
</html>