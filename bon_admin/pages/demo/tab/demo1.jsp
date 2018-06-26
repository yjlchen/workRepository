<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1">
<title>商城后台</title>

<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<jsp:include page="../../../commons/jsp/com_select.jsp"></jsp:include>
</head>
<body>
	<div class="controls-select">
	    <select class="js-tag chosen-select" name="tag" title="" data-selected-id="" multiple="" data-placeholder="选择商品分组" style="display: none">
	        <option value="97303471">健必依</option>
	        <option value="97251376">赠品</option>
	        <option value="97083367">海兰姬祛疤</option>
	        <option value="97065714">悦芽</option>
	        <option value="97038564">倍轻松</option>
	        <option value="95620493">益生元</option>
	        <option value="95443878">肠胃搭销</option>
	    </select>
	    <div class="chosen-container chosen-container-multi" style="width: 200px;" title="">
	        <ul class="chosen-choices">
	
	            <li class="search-field">
	                <input type="text" title="" placeholder="选择商品分组" class="" autocomplete="off" style="width: 103px;height: 35px">
	            </li>
	        </ul>
	        <div class="chosen-drop">
	            <ul class="chosen-results">
	
	            </ul>
	        </div>
	    </div>
	   
	    <p class="help-desc js-tag-desc hide">
	        使用“列表中隐藏”分组，商品将不出现在商品列表中
	    </p>
	</div>
</body>
</html>