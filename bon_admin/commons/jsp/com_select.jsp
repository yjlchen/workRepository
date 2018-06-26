<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
	<link href="${basePath}/commons/plugin/com_select/style.css" rel="stylesheet">
	<link href="${basePath}/commons/plugin/com_select/chosen.jquery.css" rel="stylesheet">
<%-- 	 <script type="text/javascript" src="${basePath}/commons/plugin/com_select/jquery-1.11.3.js"></script> --%>
    <script type="text/javascript" src="${basePath}/commons/plugin/com_select/uielements.js"></script>
		
	