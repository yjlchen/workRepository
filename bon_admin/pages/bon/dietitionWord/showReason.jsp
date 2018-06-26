<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript" src="${basePath}/pages/bon/dietitionWord/showReason.js"></script>
<div style="padding-top: 10px;padding-right: 20px" style="width:100%">
<form class="layui-form" method="post" id="showReasonForm" style="width:100%">
  <div class="layui-form-item" style="margin: 25px">
    <textarea name="reject_reason" maxlength="1000" readonly="readonly" required lay-verify="reject_reason" placeholder="请输入" class="layui-textarea" id="reject_reason"></textarea>
  </div>
  <div  style="width:100%;text-align:center" >
      <button type="button" class="layui-btn"  style="margin:0 auto" id="toBack">确定</button>
  </div>
  
</form>
</div>




