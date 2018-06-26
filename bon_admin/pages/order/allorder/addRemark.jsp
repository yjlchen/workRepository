<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript" src="${basePath}/pages/order/allorder/addRemark.js"></script>
<div style="padding-top: 10px;padding-right: 20px">
<form class="layui-form" method="post" id="addRemarkForm">
  <div class="layui-form-item" style="margin: 25px">
    <textarea name="remark" maxlength="1000" required lay-verify="remark" placeholder="请输入" class="layui-textarea" id="textarea1"></textarea>
  </div>
  <div class="layui-input-block" style="margin-left: 400px">
      <button class="layui-btn" lay-submit lay-filter="submitform" id="commit">确定</button>
  </div>
  
</form>
</div>




