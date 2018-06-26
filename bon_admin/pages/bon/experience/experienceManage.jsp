<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>商品列表页面</title>
<jsp:include page="../../../commons/jsp/common2.0.jsp"></jsp:include>
<link rel="stylesheet" href="${basePath}/pages/bon/experience/experienceTb.css"  media="screen">
<script type="text/javascript" src="${basePath}/pages/bon/experience/experienceManage.js"></script>
</head>
<body>
	<div class="inner-page-top layui-clear" style="margin:0;padding:0;">
	  <div class="layui-tab layui-tab-brief" lay-filter="commodityTab" style="margin:0;">
		  <ul class="layui-tab-title" style="border-bottom:none;margin-bottom:9px;">
		    <li id="tab0" class="layui-this">已保存</li>
		    <li id="tab1">待审核</li>
		    <li id="tab2">已发布</li>
		    <li id="tab3">驳回</li>
		  </ul>
		</div>      
	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<div  class="layui-row">
				<div class="layui-col-xs11">
					<form id="queryform" method="post" class="layui-form" action="">
						<input type="hidden" value="0" name="status" id="status" />
						 <div class="layui-form-item">
    					<div class="layui-inline">
      						<label class="layui-form-label" style="width: 100px">新增开始</label>
						     <div class="layui-input-inline">
						      <input type="text" name="start_add_time" id="date" lay-verify="date" placeholder="yyyy-MM-dd" autocomplete="off" class="layui-input">
						     </div>
						   </div>
						   <div class="layui-inline">
						     <label class="layui-form-label" style="width: 100px">新增结束</label>
						     <div class="layui-input-inline">
								<input type="text" name="stop_add_time" id="date1" lay-verify="date" placeholder="yyyy-MM-dd" autocomplete="off" class="layui-input">						     </div>
						   </div>
						   <div class="layui-inline">
						     <label class="layui-form-label">商品名</label>
						     <div class="layui-input-inline">
						       <input type="text" name="commodity_name" lay-verify="" autocomplete="off" class="layui-input">
						     </div>
						   </div>
						   	 <a class="layui-btn" style="margin-bottom:15px;" id="to_search">筛选</a>
						   	 <a class="layui-btn" style="margin-bottom:15px;" id="to_create">添加</a>
						  </div>
					</form>
				</div>
			</div>
			<div class="tool_item clearfix">
				<table id="experience_list" class="layui-table layui-form" > 
					<colgroup>
						<col width="8%">
						<col width="20%">
						<col width="5%">
						<col width="20%">
						<col width="5%">
						<col width="5%">
						<col width="5%">
						<col width="5%">
						<col width="5%">
						<col width="5%">
						<col width="5%">
						<col width="10%">
						<col width="10%">
					</colgroup>
					<thead id="experience_header">
						<tr>
                            <th style="text-align:center">商品图片</th>
                            <th style="text-align:center">商品信息</th>
                            <th style="text-align:center">发布人</th>
                            <th style="text-align:center">心得内容</th>
							<th style="text-align:center">星级评分</th>
							<th style="text-align:center">真实收藏量</th>
							<th style="text-align:center">虚拟收藏量</th>
							<th style="text-align:center">真实点赞</th>
							<th style="text-align:center">虚拟点赞</th>
							<th style="text-align:center">真实评论</th>
							<th style="text-align:center">虚拟评论</th>
							<th style="text-align:center">添加时间</th>
							<th style="text-align:center">操作</th>
						</tr>
					</thead>
					<tbody id="experience_body">
					</tbody>
				</table>
				<div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>