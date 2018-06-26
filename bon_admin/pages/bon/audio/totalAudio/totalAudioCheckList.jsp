<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>音频总集审核列表页</title>
<jsp:include page="../../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript" src="${basePath}/pages/bon/audio/totalAudio/totalAudioCheckList.js"></script>
<style>
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
	.layui-form-select dl{
	  	max-height:150px;
	}
	table.dataTable tbody td {
	    padding: 0px 5px;
	    border:1px solid #e2e2e2 
    }
    table.dataTable thead th {
		border:1px solid #e2e2e2
    }
  	table{
   		 border-collapse:collapse;
	}
    #group_list tbody tr{
    	height:80px;
    }
    #group_list tbody tr td:last-child a{
    	color:#38f;
    }
</style>
</head>
<body>
	<div class="inner-page-top layui-clear" style="padding:0;">
	  <div class="layui-tab layui-tab-brief" lay-filter="totalAudioTab" style="margin:0;">
		  <ul class="layui-tab-title" style="border-bottom:0;margin-bottom:9px;">
		    <li class="layui-this">待审核</li>
		    <li>已通过</li>
		    <li>已驳回</li>
		  </ul>
		</div>      
	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<div>
				<div style="float:left;">
					<form id="queryform" method="post" class="layui-form" action="">
					<input type="hidden" value="0" name="flag" id="flag" />
					<div class="layui-form-item" style="width: 320px; display: inline-block">
						<label class="layui-form-label" style="width: 100px;">标题:</label>
						<div class="layui-input-inline"  style="width: 120px">
							<input type="text" name="title"  class="layui-input" 
							style="margin-left: -10px;">
						</div>
						<button class="layui-btn layui-btn-normal" onclick="searchPage()" type="button" id="seach">筛选</button>
					</div>
					</form>
				</div>
			</div>
			<p style="clear: both;"></p>
			<div class="tool_item clearfix" style="margin-top:10px;">
				<table id="group_list" class="layui-table" > 
					<colgroup>
					    <col width="15%">
						<col width="10%">
						<col width="5%">
						<col width="7%">
						<%-- <col width="5%"> --%>
						<col width="7%">
						<col width="7%">
						<col width="7%">
						<col width="7%">
						<col width="15%">
					</colgroup>
					<thead id="group_header">
						<tr>
                            <th style="text-align:center;">标题</th>
							<th style="text-align:center;">创建时间</th>
							<th style="text-align:center;">封面图</th>
							<th style="text-align:center;">所需棒点</th>
							<!-- <th style="text-align:center;">是否完结</th> -->
							<th style="text-align:center;">真实播放量</th>
							<th style="text-align:center;">虚拟播放量</th>
							<th style="text-align:center;">真实收藏量</th>
							<th style="text-align:center;">虚拟收藏量</th>
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