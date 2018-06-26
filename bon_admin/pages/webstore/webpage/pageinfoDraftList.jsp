<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>  
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/pageinfoDraftList.js"></script>
<style>
.tool_search_div {
	float: right;
	display: inline-block;
	width: 200px;
	height: 37px;
	border: 1px solid #ccc;
	border-radius: 2px;
}
.tool_search_div input {
	border: none;
	width: 150px;
	height: 35px;
	display: inline-block;
	vertical-align: middle;
	font-size: 13px;
	padding-left: 20px;
}

</style>
	<title>微页面草稿列表</title>
</head>
<body>
	
<div class="inner-page-main layui-clear">
    <div class="inner-page-main-container">
    	<div>
    	<div style="float:left;">
    		<button class="layui-btn layui-btn-normal" id="addWebpage">新建微页面</button>
		</div>
		<div style="float:right;">
			<form id="queryform" method="post" class="layui-form" action="">
				<div class="layui-form-item  layui-clear" style="float:left;">
					 <div class="layui-inline">
				      <div class="layui-input-inline">
				        <select name="group_id" id="group_id" >
				           <option value="">全部分类</option>
				        </select>
				      </div>
				    </div>
				</div> 
				<div class="tool_search_div" >
					<input id="micro_name" name="micro_name" type="text"
						placeholder="搜索" /> <a href="javascript:;" onclick="searchPage()"
						class="tool_search_btn" style="margin-left: 0px;"> <i
						class="fa fa-search" aria-hidden="true"></i>
					</a>
				</div>
  			 </form>
   		</div>
   		<div style="clear: both;"></div>
   </div>
   
    <div class="tool_item clearfix" style="margin-top:15px;">
        <table id="pageinfo_list" class="layui-table">
        	<colgroup>
		      <col width="300">
		      <col width="180">
		      <col width="150">
		      <col width="150">
		      <col width="200">
  		    </colgroup>
			 <thead>
		     <tr>
		     	 <th style="text-align: center;">标题</th>
				 <th style="text-align: center;">创建时间</th>
				 <th style="text-align: center;">所属分类</th>
				 <th style="text-align: center;">访客数/浏览量</th>
				 <!-- <th style="text-align: center;">商品访客数/商品浏览量</th> -->
				 <th style="text-align: center;">操作</th>
			</tr>
			</thead>
		    <tbody>
			</tbody>
	   </table>
    </div>
   </div>
</div>
</body>
</html>