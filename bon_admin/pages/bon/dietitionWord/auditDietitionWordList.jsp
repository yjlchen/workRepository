<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>营养师说说审核</title>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript" src="${basePath}/pages/bon/dietitionWord/auditDietitionWordList.js"></script>

</head>
<body>
	<div class="inner-page-top layui-clear" style="padding:0;">
	  <div class="layui-tab layui-tab-brief" lay-filter="couponTab" style="margin:0;">
		  <ul class="layui-tab-title" style="border-bottom:0;margin-bottom:9px;">
		    <li class="layui-this">待审核</li>
		    <li>审核通过</li>
		    <li>已驳回</li>
		  </ul>
		</div>      
	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<div style="padding-top: 20px;margin-bottom: 20px">
				<form class="layui-form" action="" id="queryform">
				<input type="hidden" value="1" name="status_flag" id="status_flag" />
					<div>
					<!-- 	<div class="layui-form-item" style="display: inline-block;">
							<label class="layui-form-label" style="width: 100px">说说内容:</label>
							<div class="layui-input-block">
								<input type="text" id="query_content" name="query_content" maxlength="50"  style="margin-left: -20px;">
							</div>
						</div> -->
						
						<div class="layui-form-item" style="width: 450px; display: inline-block">
						<label class="layui-form-label" style="width: 100px;margin-left: 12px">添加时间:</label>
						<div class="layui-input-inline"  style="width: 120px">
							<input type="text" name="start_time" id="date"  autocomplete="off" 
									class="layui-input" style="margin-left: -10px;" onclick="layui.laydate({elem: this})">
						</div>
						<div class="layui-form-mid" style="margin-left: -18px">-</div>
						<div class="layui-input-inline"  style="width: 120px">
							<input type="text" name="end_time" id="date"  autocomplete="off" class="layui-input" onclick="layui.laydate({elem: this})"
							style="margin-left: -10px;">
						</div>
						<button class="layui-btn layui-btn-normal" onclick="searchPage()" type="button" id="seach">筛选</button>
						</div>
						
					</div>
				</form>
			</div>
			<p style="clear: both;"></p>
			<div class="tool_item clearfix" style="margin-top:10px;">
				<table id="word_list" class="layui-table" > 
					<colgroup>
					   <col width="30%">
						<col width="15%">
						<col width="15%">
						<col width="15%">
						<col width="10%">
						<col width="15%">
					</colgroup>
					<thead id="word_header">
						<tr>
                            <th>说说内容</th>
							<th style="text-align:center;">添加时间</th>
							<th style="text-align:center;">提交人</th>
							<th style="text-align:center;">发布时间</th>
							<th style="text-align:center;">说说状态</th>
							<th style="text-align:center;">操作</th>
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