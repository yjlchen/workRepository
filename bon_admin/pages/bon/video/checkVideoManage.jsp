<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">


<jsp:include page="../../../commons/jsp/common2.0.jsp"></jsp:include>
<script type="text/javascript" src="${basePath}/pages/bon/video/checkVideoManage.js"></script>
<title>资讯管理</title>
<style type="text/css">
	.layui-form-item .layui-input-block .layui-form-select .layui-select-title input{
		margin-top:7px;
	}
</style>
</head>
<body>
	   	  <div class="layui-tab layui-tab-brief" lay-filter="commodityTab" style="margin:0;">
		  <ul class="layui-tab-title" style="border-bottom:none;margin-bottom:9px;">
		     <li class="layui-this">待审核</li>
		      <li>已发布</li>
		     <li>驳回</li>
		  </ul>
  	</div>
	<div class="inner-page-main ">
		<div class="inner-page-main-container">
				<div style="padding-top: 20px;margin-bottom: 49px">
				<form class="layui-form" action="" id="queryform">
					<div>
	                <input type="hidden" value="1" name="status" id="status" /><!-- 用于控制商品状态 -->
	                
						<div class="layui-inline" >
							<label class="layui-form-label" style="width: 100px">标题:</label>
							<div class="layui-input-block">
								<input type="text" name="title" id="title" autocomplete="off" class="layui-input" style="">
							</div>
						</div>
					
						<div class="layui-inline">
							<label class="layui-form-label" style="width: 100px;">添加时间:</label>
							<div class="layui-input-inline"  style="width: 120px">
								<input type="text" name="start_time" id="start_time"  autocomplete="off" 
										class="layui-input" style="margin-left: -10px;">
							</div>
							<div  class="layui-input-inline" style=" margin-left: 10px;margin-right: 30px;">--</div>
							<div class="layui-input-inline"  style="width: 120px">
								<input type="text" name="end_time" id="end_time"  autocomplete="off" class="layui-input"
								style="margin-left: -10px;">
							</div>
						</div> 
						
						 <div class="layui-inline">
						     <div class="layui-input-inline layui-input-btn">
						        <a id="queryRecordInfo" class="layui-btn" style="height: 38px;margin-top: -5px;">筛选</a>
						     </div>
					 	 </div>

					</div>
				</form>
			</div>
			<div class="tool_item clearfix" style="margin-top: -30px;">
   				<table id="video_list" class="layui-table layui-form" > 
					<colgroup>			  
					    <col width="20%">
						<col width="10%">
						<col width="10%">
						<col width="5%">
						<col width="5%">
						<col width="5%">
						<col width="5%">
						<col width="5%">
						<col width="5%">
						<col width="5%">
						<col width="5%">
						<col width="5%">
						<col width="10%">
					</colgroup>
					<thead id="group_header">
						<tr>
                           <th style="text-align:center;">标题</th>
                           <th style="text-align:center;">发布人</th>
							<th style="text-align:center;">添加时间</th>
							<th style="text-align:center;">是否收费</th>
							<th style="text-align:center;">真实播放量</th>
							<th style="text-align:center;">虚拟播放量</th>
							<th style="text-align:center;">真实收藏量</th>
							<th style="text-align:center;">虚拟收藏量</th>
							<th style="text-align:center;">真实点赞量</th>
							<th style="text-align:center;">虚拟点赞量</th>
							<th style="text-align:center;">真实评论量</th>
							<th style="text-align:center;">虚拟评论量</th>
							<th style="text-align:center;">操作</th>
						</tr>
					</thead>
					<tbody id="group_body">
					</tbody>
				</table>
		    </div>
		</div>	
	</div>
</body>
</html>
