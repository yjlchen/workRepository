<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript" src="${basePath}/pages/bon/experience/rejectExperience.js"></script>
<div style="padding-top: 20px;padding-right: 30px">
<form class="layui-form" method="post" id="addOrUpdateForm">
  <div class="layui-form-item" style="margin: 25px">
    <textarea name="reject_reason"  lay-verify="reject_reason" readonly="readonly" class="layui-textarea" id="reject_reason"></textarea>
  </div>
  <div class="layui-input-block" style="margin-left: 300px">
      <button type="button" class="layui-btn"  id="backPage">确定</button>
  </div>
</form>
</div>
