<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>品牌热词管理</title>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript"
	src="${basePath }/pages/marketing/keywords/keywords.js"></script>
</head>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px;">品牌热词管理</span>
  	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<div style="margin-left: -63px; margin-top: 15px;">
				<form id="keyWordForm" class="layui-form" action="">
					<div class="layui-form-item">
					 <div class="layui-inline">
							<label class="layui-form-label" style="width: 150px;">国家：</label>
							<div class="layui-input-inline">
								<select  id="country_id" name="country_id" lay-filter="encrypt">
									<option value=""></option>
								</select>
							</div>
						</div> 
						<div class="layui-inline">
							<label class="layui-form-label" style="width: 150px;">品牌：</label>
							<div class="layui-input-inline">
								<select  id="brand_id" name="brand_id">
									<option value=""></option>
								</select>
							</div>
						</div> 
						
						<div class="layui-inline">
							<label class="layui-form-label" style="width: 150px;">品牌关键词：</label>
							<div class="layui-input-inline">
								<input id="keywords" name=keywords type="text"
									placeholder="请输入关键词" lay-verify="keywords" autocomplete="off"
									class="layui-input" style="width: 200px;">
							</div>
						</div>
						<div class="layui-inline">
							<label class="layui-form-label">排序：</label>
							<div class="layui-input-inline">
								<input id="sort" name="sort" type="text" placeholder="请输入序号"
									lay-verify="sort" autocomplete="off" class="layui-input"
									style="width: 200px;">
							</div>
						</div>
						<div class="layui-inline">
							<div class="layui-input-inline layui-input-btn">
								<a id="addKeyWord" class="layui-btn layui-btn-normal"
									style="height: 38px; margin-top: -5px;" lay-submit
									lay-filter="addFilter">添加</a>
							</div>
						</div>
					</div>
				</form>
				
				
				<form id="likeForm" class="layui-form"  action="">
					<div class="layui-inline">
							<label class="layui-form-label" style="width: 150px;">国家：</label>
							<div class="layui-input-inline">
								<select  id="country_id1" name="country_id" lay-filter="encrypt">
									<option value=""></option>
								</select>
							</div>
						</div> 
						<div class="layui-inline">
							<label class="layui-form-label" style="width: 150px;">品牌：</label>
							<div class="layui-input-inline">
								<select  id="brand_id1" name="brand_id">
									<option value=""></option>
								</select>
							</div>
						</div> 
						 <div class="layui-inline">
						     <div class="layui-input-inline layui-input-btn">
						        <a id="queryBannerInfo" class="layui-btn layui-btn-normal" style="height: 38px;margin-top: -5px;">筛选</a>
						     </div>
					 	 </div>
				</form>
			</div>
			<div class="tool_item clearfix">
				<table id="keyword_list" class="layui-table">
					<colgroup>
						<col width="20%">
						<col width="20%">
						<col width="20%">
						<col width="20%">
						<col width="20%">
						<col>
					</colgroup>
					<thead id="keyword_header">
						<tr>
							<th style="text-align: center;">国家</th>
							<th style="text-align: center;">品牌</th>
							<th style="text-align: center;">品牌关键词</th>
							<th style="text-align: center;">排序</th>
							<th style="text-align: center;">操作</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<!-- 用户搜索关键词列表 -->
	<div class="inner-page-top layui-clear"
		style="padding: 14px 21px 14px;">
		<span style="font-size: 18px;">用户搜索关键词</span>
	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<div style="margin-left: -63px; margin-top: 15px;">
				<form id="userKeyWordForm" class="layui-form" action="">
					<div class="layui-form-item">
						<div class="layui-inline">
							<label class="layui-form-label" style="width: 150px;">搜索时间：</label>
							<div class="layui-input-inline">
								<input id="start_time" name="start_time" type="text"
									class="layui-input" placeholder="请输入开始时间"
									onclick="layui.laydate({elem: this, istime: true, format: 'YYYY-MM-DD'})"
									readonly="readonly" style="width: 200px;">
							</div>
							<div class="layui-input-inline"
								style="margin-right: -175px; margin-left: 10px; margin-top: 5px;">
								-</div>
							<div class="layui-input-inline">
								<input id="end_time" name="end_time" type="text"
									class="layui-input" placeholder="请输入结束时间"
									onclick="layui.laydate({elem: this, istime: true, format: 'YYYY-MM-DD'})"
									readonly="readonly" style="width: 200px;">
							</div>
						</div>
						<div class="layui-inline">
							<div class="layui-input-inline layui-input-btn">
								<a id="searchKeyWord" class="layui-btn layui-btn-normal"
									style="height: 38px; margin-top: -5px;">查询</a>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="tool_item clearfix">
				<table id="userkeyword_list" class="layui-table">
					<colgroup>
						<col width="70%">
						<col>
					</colgroup>
					<thead id="keyword_header">
						<tr>
							<th style="text-align: center;">名称</th>
							<th style="text-align: center;">搜索次数</th>
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