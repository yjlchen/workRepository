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
%>

<title>音频分集审核</title>
<script type="text/javascript">
	var status = '<%=status %>';
</script>
</head>
<body>
	<div class="inner-page-main ">
		<div class="inner-page-main-container">
			<div style="padding-top: 20px;margin-bottom: 20px">
				<form class="layui-form" action="" id="queryform">
					<div>
						<div class="layui-form-item" style="display: inline-block;">
							<label class="layui-form-label" style="width: 100px">标题:</label>
							<div class="layui-input-block">
								<input type="text" name="title" id="title" autocomplete="off" class="layui-input" >
							</div>
						</div>
						<div class="layui-form-item" style="display: inline-block;">
							<label class="layui-form-label" style="width: 100px">所属合辑:</label>
							<div class="layui-input-block">
								<input type="text" name="main_title" id="main_title" autocomplete="off" class="layui-input" >
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
			<div class="tool_item clearfix" style="">
		        <table id="eaTable" class="layui-table">
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
				    <th style="text-align: center;width: 76px;">操作</th>
				  </tr> 
				</thead>
				<tbody>
				</tbody>
				</table>
		    </div>
		</div>	
	</div>
</body>
<script type="text/javascript" src="${basePath}/pages/bon/audio/eachAudio/eachAudioExamine.js"></script>
</html>
