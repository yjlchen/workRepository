<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<title>店铺信息页面</title>
</head>
<style>
.layui-input, .layui-textarea{
	width:300px;
}

.layui-form-label {
	width:120px;
}
</style>
<script type="text/javascript" src="${basePath}/pages/webstore/storemanage/storeInfo.js"></script>
<body>
<div class="inner-page-top layui-clear">
    店铺信息
</div>
<div class="inner-page-main layui-clear">
    <div class="inner-page-main-container">

        <form class="layui-form" method="post" id="storeInfo" enctype="multipart/form-data">
        	<input type="hidden" name="id" />
            <input type="hidden" name="shop_logo_url" id="shop_logo_url" >
            <input type="hidden" name="shop_code_url" id="shop_code_url" >
            <div class="layui-form-item">
                <label class="layui-form-label">店铺名称</label>
                <div class="layui-input-block">
                    <input type="text" name="shop_name" lay-verify="required" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">店铺logo</label>
                <div class="layui-box layui-upload-button test1" id="logo" style="border: none;float:left;">
                	<input id="logoDemo" type="file" name="file" class="layui-upload-file" />
	                <span class="layui-upload-icon"></span>
                </div> 
                <div style="float:left;" id="logoimg">
               		 <img src="" style='height:50px;width:50px;'/><a style="cursor: pointer;margin-left: 15px;" onclick="deleteImag('logo')">删除</a>
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">商城二维码</label>
                <div class="layui-box layui-upload-button" id="codeImg" style="border: none;float:left;">
                	<input id="codeDemo" type="file" name="file" class="layui-upload-file" />
	                <span class="layui-upload-icon"></span>
                </div>
                <div style="float:left;" id="cancelCodeImg">
               		 <img src="" style='height:50px;width:50px;'/><a style="cursor: pointer;margin-left: 15px;" onclick="deleteImag('code')">删除</a>
                </div>
            </div>
            
            <div class="layui-form-item layui-form-text">
                <label class="layui-form-label">店铺简介</label>
                <div class="layui-input-block">
                    <textarea  class="layui-textarea" name="shop_introduction"></textarea>
                </div>
            </div>
			
			<div class="layui-form-item">
                <label class="layui-form-label">联系人姓名</label>
                <div class="layui-input-block">
                    <input type="text" name="shop_contact_name"  class="layui-input">
                </div>
            </div>
            	
            <div class="layui-form-item">
                <label class="layui-form-label">联系人qq</label>
                <div class="layui-input-block">
                    <input type="text" name="shop_contact_qq"  class="layui-input">
                </div>
            </div>
            
            <div class="layui-form-item">
                <label class="layui-form-label">联系人手机号</label>
                <div class="layui-input-block">
                    <input type="text" name="shop_contact_phone"  class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <div class="layui-input-block">
                    <button class="layui-btn" lay-submit="" lay-filter="save" id="save">保存</button>
                </div>
            </div>
        </form>
    </div>
</div>
</body>
</html>