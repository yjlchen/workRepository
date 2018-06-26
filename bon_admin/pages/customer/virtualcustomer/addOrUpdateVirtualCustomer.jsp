<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
    <script type="text/javascript" src="addOrUpdateVirtualCustomer.js"></script>
</head>
	<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px;">虚拟用户编辑</span>
  	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container" style="height:700px">
			<div style="padding-top: 20px; padding-right: 30px">
				<form class="layui-form" method="post" id="addOrUpdateForm">
					<div class="layui-inline">
				    	<label class="layui-form-label" style="width: 100px">昵称：</label>
				    	<div class="layui-input-inline">
				    		<input type="text" name="wx_name" id="wx_name" autocomplete="off"
				    		 class="layui-input" style="margin-left: 10px;" maxlength="16">
				    	</div>
				    </div>
					<div id="ydiv">
						<div class="layui-form-item">
							<label class="layui-form-label" style="width: 100px">选择头像：</label>
							<div class="layui-input-block" style="position: relative;">
								<div>
									<img id="head-img" style="width: 80px"
										src="${basePath}/commons/images/addpicture.jpg">
								</div>
							</div>
						</div>
					</div>
					<div>
						<div class="layui-form-item">
							<label class="layui-form-label" style="width: 100px">用户类型:</label>
							<div class="layui-input-block" style="width: 120px">
								<select lay-filter="test"  id="status" name="status">
									<option selected="selected" value="3">后台人员</option>
									<option value="4">商城粉丝</option>
								</select>
							 </div>
						</div>
					</div>
					<div >
						<div class="layui-form-item">
							<label class="layui-form-label" style="width: 100px">后台账号：</label>
							<div class="layui-input-block" style="position: relative;">
								<div>
									<select name="emp_name" id="emp_name" ></select>
								</div>
							</div>
						</div>
					</div>
					<div class="layui-form-item">
						<div class="layui-input-block">
							<!-- <a class="layui-btn" id="commit">立即提交</a>
							<a id="back" class="layui-btn layui-btn-primary">返回</a> -->
							 <input type="button" class="layui-btn" lay-submit lay-filter="formdm" id="commit" value="提交"/>
						 	<a class="layui-btn" id="back">返回</a>
						</div>
					</div>
				</form>
            </div>
        </div>
    </div>
</body>

</html>