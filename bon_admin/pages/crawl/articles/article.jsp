<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>软文详情</title>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
</head>
<body id="content">
	
<script type="text/javascript">
	$(function(){
	 	var url = location.search; //获取url中"?"符后的字串  
	   	var theRequest = new Object();  
	  	if (url.indexOf("?") != -1) {  
	      var str = url.substr(1);  
	      strs = str.split("&");  
	      for(var i = 0; i < strs.length; i ++) {  
	         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
	      }  
	   	}  
	  	queryArticle(theRequest.id);
	});
	
	function queryArticle(id) {
		$.ajax({
			url: getRootPath()+"/crawl/queryArticleById.action",
			type: 'post',
			dataType: 'json',
			data: {
				id: id
			}, success: function (d) {
				$("#content").append(d.article_content);
			}
		});
	}
</script>
</body>
</html>