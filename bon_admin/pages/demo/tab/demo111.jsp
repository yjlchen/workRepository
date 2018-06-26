<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<head>
<title>无标题文档</title>
<script type="text/javascript" src="${basePath}/aaa/queryJs.action"></script>

</head>

<body>
<label>
<input type="button" name="Submit" value="按钮"  onclick="aa()"/>
</label>
</body>
</html>
