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

<title>资讯管理</title>
<style type="text/css">
	.layui-form-item .layui-input-block .layui-form-select .layui-select-title input{
		margin-top:7px;
	}
</style>
<script type="text/javascript">
	var status = '<%=status %>';
</script>
</head>
<body>
	<div class="inner-page-main ">
		<div class="inner-page-main-container">
			<div style="padding-top: 20px;margin-bottom: 20px">
				<form class="layui-form" action="" id="recordForm">
					<div>
						<div class="layui-form-item" style="display: inline-block;">
							<label class="layui-form-label" style="width: 100px">标题:</label>
							<div class="layui-input-block">
								<input type="text" name="title" id="title" autocomplete="off" class="layui-input" style="margin-left: -15px;">
							</div>
						</div>
					
<!-- 						<div class="layui-form-item" style="width: 450px; display: inline-block">
							<label class="layui-form-label" style="width: 100px;margin-left: 12px">创建时间:</label>
							<div class="layui-input-inline"  style="width: 120px">
								<input type="text" name="start_time" id="start_time"  autocomplete="off" 
										class="layui-input" style="margin-left: -10px;">
							</div>
							<div class="layui-form-mid" style="margin-left: -18px">-</div>
							<div class="layui-input-inline"  style="width: 120px">
								<input type="text" name="end_time" id="end_time"  autocomplete="off" class="layui-input"
								style="margin-left: -10px;">
							</div>
						</div> -->
						
						  <div class="layui-inline">
      						<label class="layui-form-label" style="width: 100px">新增开始</label>
						     <div class="layui-input-inline">
						      <input type="text" name="start_time" id="start_time" lay-verify="date" placeholder="yyyy-MM-dd" autocomplete="off" class="layui-input">
						     </div>
						   </div>
						   <div class="layui-inline">
						     <label class="layui-form-label" style="width: 100px">新增结束</label>
						     <div class="layui-input-inline">
								<input type="text" name="end_time" id="end_time" lay-verify="date" placeholder="yyyy-MM-dd" autocomplete="off" class="layui-input">						     </div>
						   </div>
						
						 <div class="layui-inline">
						     <div class="layui-input-inline layui-input-btn">
						        <a id="queryRecordInfo" class="layui-btn" style="height: 38px;margin-top: -5px;">筛选</a>
						     </div>
					 	 </div>
					 	 <% if(status.equals("0")) {%>
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
		        <table id="record_table" lay-filter="listFilter">
				</table>
				<script type="text/html" id="browerBar">
					{{d.real_browse_amount}} / {{d.unreal_browse_amount}}
				</script>
				<script type="text/html" id="collectBar">
					{{d.real_collect_amount}} / {{d.unreal_collect_amount}}
				</script>
				<script type="text/html" id="praiseBar">
					{{d.real_praise_amount}} / {{d.unreal_praise_amount}}
				</script>
				<script type="text/html" id="evaluateBar">
					<%if(!status.equals("3")) {%>
						<a onclick="evaluateClick('{{d.id}}', '{{d.status}}')" > {{d.real_evaluate_amount}} / {{d.unreal_evaluate_amount}} </a>
					<%} else { %>
						{{d.real_evaluate_amount}} / {{d.unreal_evaluate_amount}}
					<%} %>
				</script>
				<script type="text/html" id="statusBar">
						{{# if(d.status == 0) { }} 
							<a class="layui-btn 'layui-btn-success' layui-btn-mini" > 保存 </a>
						{{# } else if(d.status == 1) { }} 
							<a class="layui-btn 'layui-btn-success' layui-btn-mini" > 审核中 </a>
						{{# } else if(d.status == 2) { }} 
							<a class="layui-btn 'layui-btn-success' layui-btn-mini" > 发布</a>
						{{# } else if(d.status == 3) { }} 
							<a class="layui-btn'layui-btn-warm' layui-btn-mini" > 驳回 </a>
						{{# } }}
					 
				</script>
				<script type="text/html" id="barDemo">
					<% if(status.equals("0")) {%>  
						<!-- 保存 -->
						<a class="layui-btn layui-btn-danger layui-btn-mini" lay-event="update">编辑</a>
  						<a class="layui-btn layui-btn-danger layui-btn-mini" lay-event="examine">提交</a>
						<a class="layui-btn layui-btn-danger layui-btn-mini" lay-event="preview">预览</a>
						<a class="layui-btn layui-btn-danger layui-btn-mini" lay-event="unrealEvaluate">虚拟评论</a>
  						<a class="layui-btn layui-btn-danger layui-btn-mini" lay-event="del">删除</a>
 					<%} else if(status.equals("1")) {%>
						<!-- 审核中 -->
						<a class="layui-btn layui-btn-danger layui-btn-mini" lay-event="checkInfo">查看</a>
						<a class="layui-btn layui-btn-danger layui-btn-mini" lay-event="preview">预览</a>
						<a class="layui-btn layui-btn-danger layui-btn-mini" lay-event="unrealEvaluate">虚拟评论</a>
 					<%} else if(status.equals("2")) {%>
						<!-- 已发布 -->
						<a class="layui-btn layui-btn-danger layui-btn-mini" lay-event="update">编辑</a>
						<a class="layui-btn layui-btn-danger layui-btn-mini" lay-event="preview">预览</a>
						<a class="layui-btn layui-btn-danger layui-btn-mini" lay-event="unrealEvaluate">虚拟评论</a>
						<a class="layui-btn layui-btn-danger layui-btn-mini" lay-event="del">删除</a>
 					<%} else if(status.equals("3")) {%>
						<!-- 驳回 -->
						<a class="layui-btn layui-btn-danger layui-btn-mini" lay-event="rejectInfo">查看驳回原因</a>
						<a class="layui-btn layui-btn-danger layui-btn-mini" lay-event="update">编辑</a>
						<a class="layui-btn layui-btn-danger layui-btn-mini" lay-event="del">删除</a>
					<%} %>
				</script>
		    </div>
		</div>	
	</div>
</body>
<script type="text/javascript" src="${basePath}/pages/bon/information/informationManage.js"></script>
</html>
