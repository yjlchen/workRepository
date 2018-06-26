<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>虚拟用户</title>
	<style type="text/css">
	</style>
	<jsp:include page="../../../commons/jsp/common2.0.jsp"></jsp:include>
	<script type="text/javascript" src="virtualCustomer.js"></script>
</head>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px">虚拟用户</span>
  	</div>
	<div class="inner-page-main ">
		<div class="inner-page-main-container">
			<div style="padding-top: 20px;margin-bottom: 20px">
				<form class="layui-form" action="" id="queryform">
					<div>
						<div class="layui-form-item" style="display: inline-block;">
							<label class="layui-form-label" style="width: 104px">虚拟用户名:</label>
							<div class="layui-input-block">
								<input type="text" name="wx_name" autocomplete="off" class="layui-input"">
							</div>
						</div>
						<div class="layui-form-item" style="display: inline-block">
							<label class="layui-form-label" style="width: 100px">人员类型:</label>
							<div class="layui-input-block" style="width: 120px">
								<select  id="status" name="status">
									<option value="">全部</option>
									<option value="3">后台人员</option>
									<option value="4">商城粉丝</option>
								</select>
							 </div>
						</div>
						<div class="layui-form-item" style="display: inline-block">
		    				<div class="layui-inline">
			    		  		<label class="layui-form-label" style="width: 150px;">所属人员：</label>
							    <div class="layui-input-inline" style="width: 200px;">
								    <select id="emp_id"  name="emp_id" lay-search="">
								    	<option value="">所有人员</option>
									</select> 
								 </div>
							 </div> 
							<a id="commit" class="layui-btn" style="margin-top: -10px;">搜索</a>
							<a id="save" class="layui-btn" style="margin-top: -10px;">添加</a>
						</div>
					</div>
				</form>
			</div>
			<div class="tool_item clearfix">
		        <table id="vTable" class="layui-table">
		        <thead>
				  <tr>
				    <th style="text-align: center;">头像</th>
				    <th style="text-align: center;">用户名称</th>
				    <th style="text-align: center;">所属类型</th>
				    <th style="text-align: center;">已绑定账号</th>
					<th style="text-align: center;">添加时间</th>
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
</html>
