<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>banner管理</title>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript" src="${basePath }/pages/homepage/banner/banner.js"></script>
</head>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px;">banner管理</span>
  	</div>
  	<div class="inner-page-main layui-clear">
	    <div class="inner-page-main-container">
		    <div >
		   		<a id="addBanner" class="layui-btn layui-btn-normal">添加banner</a>
			</div>
			<div style="margin-left: -63px;margin-top: 15px;">
				<form id="bannerForm" class="layui-form" action="">
			    	<div class="layui-form-item">
			    		<div class="layui-inline">
						    <label class="layui-form-label" style="width: 150px;margin-left: 10px;">banner标题：</label>
						    <div class="layui-input-inline">
						       <input id="title" name="title" type="text"  placeholder="请输入banner标题" autocomplete="off" class="layui-input" style="width: 200px;">
						    </div>
					    </div>
					    
					     <div class="layui-inline">
						     <div class="layui-input-inline layui-input-btn">
						        <a id="queryBannerInfo" class="layui-btn layui-btn-normal" style="height: 38px;margin-top: -5px;">筛选</a>
						     </div>
					 	 </div>
					 </div>
				</form>
			</div>
			<div class="tool_item clearfix">
		        <table id="banner_list" class="layui-table">
		        	<colgroup>
		        		<col width="13%">
		        		<col width="10%">
		        		<col width="12%">
		        		<col width="13%">
		        		<col width="12%">
		        		<col width="12%">
		        		<col width="12%">
		        		<col width="10%">
		        	</colgroup>
					<thead id="cust_header">
					     <tr>
					     	 <th style="text-align: center;">banner标题</th>
							 <th style="text-align: center;">banner图片</th>
							 <th style="text-align: center;">链接类型</th>
							 <th style="text-align: center;">是否是主推banner</th>
							 <th style="text-align: center;">banner开始时间</th>
							 <th style="text-align: center;">banner结束时间</th>
							 <th style="text-align: center;">创建时间</th>
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