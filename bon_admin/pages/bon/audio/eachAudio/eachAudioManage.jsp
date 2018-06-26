<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	String status = request.getParameter("status");
	String audio_id = request.getParameter("audio_id");
	String ispay = request.getParameter("ispay");
%>

<title>音频分集管理</title>
<style type="text/css">
</style>
<script type="text/javascript">
	var status = '<%=status %>';
	var audio_id = '<%=audio_id %>';
	var ispay = '<%=ispay %>';
</script>
</head>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px;font-weight:bold;">音频分集管理</span>
  	</div>
	<div class="inner-page-main ">
		<div class="inner-page-main-container">
			<div style="padding-top: 20px;margin-bottom: 20px">
				<form class="layui-form" action="" id="queryform">
					<div>
						<div class="layui-inline">
						     <div class="layui-input-inline layui-input-btn">
						        <a id="goback" class="layui-btn" style="height: 38px;margin-top: -5px;">返回</a>
						     </div>
					 	 </div>
						<div class="layui-form-item" style="display: inline-block;">
							<label class="layui-form-label" style="width: 100px">标题:</label>
							<div class="layui-input-block">
								<input type="text" name="title" id="title" autocomplete="off" class="layui-input" >
							</div>
						</div>
					
						<div class="layui-form-item" style="display: inline-block">
							<label class="layui-form-label" style="width: 100px;margin-left: 12px">创建时间:</label>
							<div class="layui-input-block">
								<div class="layui-input-inline"  style="width: 120px">
									<input type="text" name="start_time" id="start_time"  autocomplete="off" 
											class="layui-input" style="margin-left: -10px;">
								</div>
								<div class="" style="margin-left: -18px;display: inline-block;" >-</div>
								<div class=""  style="width: 120px;display: inline-block;">
									<input type="text" name="end_time" id="end_time"  autocomplete="off" class="layui-input"
									style="">
								</div>
							</div>
						</div>
						
						 <div class="layui-inline">
						     <div class="layui-input-inline layui-input-btn">
						        <a id="queryRecordInfo" class="layui-btn" style="height: 38px;margin-top: -5px;">筛选</a>
						     </div>
					 	 </div>
					 	 <%if(status.equals("0")) {%>
							 <div class="layui-inline">
							     <div class="layui-input-inline layui-input-btn">
							        <a id="save" class="layui-btn" style="height: 38px;margin-top: -5px;">添加</a>
							     </div>
						 	 </div>
						 <%} %>
					</div>
				</form>
			</div>
			<div class="tool_item clearfix" style="margin-top: -30px;">
		        <table id="eaTable" class="layui-table">
		        <colgroup>
					    <col width="15%">
						<col width="10%">
						<col width="10%">
						<col width="6%">
						<col width="6%">
						<col width="6%">
						<col width="6%">
						<col width="6%">
						<col width="5%">
						<col width="15%">
					</colgroup>
		        <thead>
				  <tr>
				    <th style="text-align: center;">标题</th>
					<th style="text-align: center;">所属合辑</th>
				    <th style="text-align: center;">添加时间</th>
					<th style="text-align: center;">真实播放量</th>
					<th style="text-align: center;">虚拟播放量</th>
					<th style="text-align: center;">真实评论数</th>
					<th style="text-align: center;">虚拟评论数</th>
					<th style="text-align: center;">音频时长(秒)</th>
					<th style="text-align: center;">第几集</th>
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
<script type="text/javascript" src="${basePath}/pages/bon/audio/eachAudio/eachAudioManage.js"></script>
</html>
