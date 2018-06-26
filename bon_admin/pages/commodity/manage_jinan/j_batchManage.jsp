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
<jsp:include page="../../../../commons/jsp/common2.0.jsp"></jsp:include>
<%-- <link rel="stylesheet" href="${basePath}/pages/bon/experience/experienceTb.css"  media="screen"> --%>
<script type="text/javascript" src="${basePath}/pages/commodity/manage/j_commodity/j_batchManage.js"></script>
<style type="text/css">

.tool_search_div {
	float: right;
	display: inline-block;
	width: 200px;
	height: 37px;
	border: 1px solid #ccc;
	border-radius: 2px;
}
.tool_search_div input {
	border: none;
	width: 150px;
	height: 35px;
	display: inline-block;
	vertical-align: middle;
	font-size: 13px;
	padding-left: 20px;
}
</style>
</head>
<body>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<div  >
				<div style="float:right;">
					<form id="queryform" method="post" class="layui-form" action="">
					<!-- 	<input type="hidden" value="0" name="status" id="status" />
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
						   	 <a class="layui-btn layui-btn-normal" style="margin-bottom:15px;margin-right: 30px" id="to_search">搜索</a>
						  </div> -->
						    <div class="tool_search_div" >
								<input id="query_batch_num" name="query_batch_num" type="text"
									placeholder="搜索批次号" /> <a href="javascript:;" onclick="searchPage()"
									class="tool_search_btn" style="margin-left: 0px;"> <i
									class="fa fa-search" aria-hidden="true"></i>
								</a>
							</div>
					</form>
				</div> 
				<div class="layui-inline">
					 <div class="layui-input-inline layui-input-btn">
				        <a id="to_return" class="layui-btn layui-btn-normal" style="height: 38px;margin-top: -5px;">返回</a>
				     </div>
			 	 </div>
					 	
				 <!-- <div class="layui-inline">
				     <div class="layui-input-inline layui-input-btn">
				        <a id="to_create" class="layui-btn layui-btn-normal" style="height: 38px;margin-top: -5px;">添加</a>
				     </div>
			 	 </div> -->
			</div>
			<div class="tool_item clearfix" style="padding:9px;">
				<table id="batch_list" class="layui-table layui-form" > 
					<thead id="batch_header">
						<tr>
                            <th style="text-align:center">批次号</th>
                            <th style="text-align:center">入库日期</th>
                            <th style="text-align:center">生产日期</th>
							<th style="text-align:center">过期日期</th>
							<th style="text-align:center">数量</th>
						</tr>
					</thead>
					<tbody id="batch_body">
					</tbody>
				</table>
				<div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>