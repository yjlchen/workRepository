<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript" src="${basePath}/pages/cm/empmanage/addEmp.js"></script>
<div style="padding-top: 20px;padding-right: 30px">
<form class="layui-form" method="post" id="addOrUpdateForm">
  <div class="layui-form-item">
    <label class="layui-form-label"  required  style="width: 100px">姓名</label>
    <div class="layui-input-block">
      <input type="text" id="emp_name" name="emp_name" required  lay-verify="emp_name" placeholder="请输入名字" autocomplete="off" class="layui-input">
    </div>
  </div>
  <div class="layui-form-item">
    <label class="layui-form-label" style="width: 100px">联系方式</label>
    <div class="layui-input-block">
      <input type="text" id="emp_tel" name="emp_tel" required  lay-verify="phone" placeholder="请输入电话号码" autocomplete="off" class="layui-input">
    </div>
  </div>
<!--   <div class="layui-form-item"> -->
<!--     <label class="layui-form-label" style="width: 100px">权限</label> -->
<!--     <div class="layui-input-block"> -->
<!--     	<select name="emp_ability" id="emp_ability" multiple="" > -->
<!-- 			<option value="">--请选择--</option> -->
<!-- 			<option value="2">普通管理员</option> -->
<!-- 			<option value="3">客服</option> -->
<!-- 		</select> -->
<!--     </div> -->
<!--   </div> -->
  <div class="layui-form-item">
    <label class="layui-form-label"  style="width: 100px">登陆账户</label>
    <div class="layui-input-block">
      <input type="text" id="login_user" name="login_user" required  lay-verify="login_user" 
      		placeholder="请输入登陆账户" autocomplete="off" class="layui-input">
    </div>
  </div>
  <div class="layui-form-item">
    <label class="layui-form-label" style="width: 100px">登陆密码</label>
    <div class="layui-input-block">
      <input type="text" id="login_pwd" name="login_pwd" required  lay-verify="login_pwd" placeholder="请输入密码" autocomplete="off" class="layui-input">
    </div>
  </div>
  
  <div class="layui-form-item">
    <label class="layui-form-label" style="width: 100px">所属团队</label>
    <div class="layui-input-block">
    	<select name="team_id" id="team_id"  required lay-search lay-verify="required">
			<option value="">--请选择--</option>
		</select>
    </div>
  </div>
  <div class="layui-form-item">
    <div class="layui-input-block" >
      <button class="layui-btn" lay-submit lay-filter="formDemo" id="commit">立即提交</button>
      
      <button type="reset" class="layui-btn layui-btn-primary">重置</button>
    </div>
  </div>
</form>
</div>




