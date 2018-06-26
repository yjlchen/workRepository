<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set 
value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
var="basePath" />
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>

<div style="padding-top: 50px;padding-right: 30px">
<form class="layui-form" method="post" id="editForm">
  <input type="hidden" name="id" />
  <div class="layui-form-item">
    <label class="layui-form-label" style="width: 100px"><font color="red">*&nbsp;</font>分类名</label>
    <div class="layui-input-block">
      <input type="text" id="group_name" name="group_name"  lay-verify="group_name" placeholder="请输入" autocomplete="off" class="layui-input">
    </div>
  </div>
  
  <div class="layui-form-item">
    <div class="layui-input-block" >
      <button class="layui-btn layui-btn-normal" lay-submit lay-filter="save" id="save">保存</button>
      <button type="reset" class="layui-btn layui-btn-primary">重置</button>
    </div>
  </div>
  
</form>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/addOrUpdatePageinfoType.js"></script>
</div>




