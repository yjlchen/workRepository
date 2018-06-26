<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="${basePath}/tools/layui1.0.9/css/layui.css" media="all">
    <link rel="stylesheet" href="${basePath}/tools/static/css/cover.css">
    <link type="text/css" rel="stylesheet" href="${basePath}/commons/css/tools_common.css">
	<link type="text/css" rel="stylesheet" href="${basePath}/commons/css/list.css">
	<link type="text/css" rel="stylesheet" href="${basePath}/commons/font-awesome/font-awesome.min.css">
	<link type="text/css" rel="stylesheet" href="${basePath}/commons/bootstrap/css/bootstrap.min.css">
	<link type="text/css" rel="stylesheet" href="${basePath}/commons/bootstrap/css/DT_bootstrap.css">
	<link type="text/css" rel="stylesheet" href="${basePath}/commons/bootstrap/css/bootstrap-datetimepicker.css">
    <link type="text/css" rel="stylesheet" href="${basePath}/commons/bootstrap/css/jquery.dataTables.min.css">
    <link type="text/css" rel="stylesheet" href="${basePath}/commons/bootstrap/css/select.dataTables.min.css">
    
   
	<script type="text/javascript" src="${basePath}/commons/bootstrap/js/jquery.js"></script>
	<script type="text/javascript" src="${basePath}/commons/js/jquery.dataTables.js"></script>
	<script type="text/javascript" src="${basePath}/commons/js/commons.js"></script>
	<script type="text/javascript" src="${basePath}/commons/bootstrap/js/bootstrap.js"></script>
	<script type="text/javascript" src="${basePath}/commons/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="${basePath}/commons/bootstrap/js/DT_bootstrap.js"></script>
	<script type="text/javascript" src="${basePath}/commons/bootstrap/js/dataTables.select.min.js"></script>
	<script type="text/javascript" src="${basePath}/commons/js/dataTable_extend.js"></script>
	<script type="text/javascript" src="${basePath}/tools/layui1.0.9/layui.js"></script>
	<script type="text/javascript" src="${basePath}/commons/js/jquery.formHelp.js"></script>
		
	