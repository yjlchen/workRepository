<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<jsp:include page="../../../../commons/jsp/common2.0.jsp"></jsp:include>
<script type="text/javascript" src="${basePath}/pages/bon/audio/totalAudio/showReason.js"></script>
<div style="padding-top: 10px;">
<form class="layui-form" method="post" id="showReasonForm">
  <div class="layui-form-item" style="margin: 25px">
    <textarea name="reject_reason" readonly="readonly" class="layui-textarea" id="reject_reason"></textarea>
  </div>
  <div class="layui-input-block" style="margin-left: 220px">
      <button type="button" class="layui-btn"  id="toBack">确定</button>
  </div>
</form>
</div>




