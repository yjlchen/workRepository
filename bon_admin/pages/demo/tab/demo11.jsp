<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>


	
<%
String content = (String)session.getAttribute("id1");
if(content==null){
	content = com.swn.common.util.TestUtil.getHtmlContent(1);
	session.setAttribute("id1", content);
}
	
out.print(content);
%>
