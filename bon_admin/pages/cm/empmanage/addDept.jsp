<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript" src="${basePath}/pages/cm/empmanage/addDept.js"></script>
<div style="padding-top: 30px;padding-right: 20px">
<form class="layui-form" method="post" id="addDeptForm">
  <div class="layui-form-item">
    <label class="layui-form-label"  required  style="width: 100px">团队名称</label>
    <div class="layui-input-block">
      <input type="text" id="team_name" name="team_name" required  lay-verify="team_name" placeholder="请输入标题" autocomplete="off" class="layui-input">
    </div>
  </div>
  
  <div class="layui-form-item">
    <div class="layui-input-block" >
      <button class="layui-btn" lay-submit lay-filter="formdm" id="commit">确定</button>
      <button type="reset" class="layui-btn layui-btn-primary">重置</button>
    </div>
  </div>
  
</form>
</div>




