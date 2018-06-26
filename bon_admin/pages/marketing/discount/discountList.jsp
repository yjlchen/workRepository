<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>限时折扣列表页</title>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript" src="${basePath}/pages/marketing/discount/discountList.js"></script>
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
   body,div,p,span,h1,h2,h3,h4,h5,h6,img{
            margin: 0;
            padding: 0;
        }
	.layui-form-select dl{
	  max-height:150px;
	}
	.popover-header{
		height: 40px;
    	line-height: 40px;
    	background: #f8f8f8;
    	padding: 0 10px;
    	border-bottom: 1px solid #e5e5e5;
	}	
	.popover-header a{
		color:#38f;
	}
	.popover-footer{
		height: 57px;
    	line-height: 57px;
    	border-top: 1px solid #e5e5e5;
    	border-radius: 0 0 5px 5px;
    	background: #f8f8f8;
    	padding:0 10px;
	}
	.popover-footer .js-btn-confirm{
		padding: 5px;
    	background: #38f;
    	color: #fff;
    	border-radius: 3px;
	}
	.popover-footer .js-btn-confirm:hover{
		background: #59f;
	}
	.popover-footer .js-btn-cancel{
		margin-left:15px;
		padding:5px;
		background:#fff;
		color:#333;
		border:1px solid #bbb;
		border-radius: 3px;
	}
	.popover-footer .js-btn-cancel:hover{
		color:#59f;
		border-color:#59f;
	}
	.popover.top .arrow {
    	bottom: -5px;
    	left: 40px;
    	margin-left: -5px;
    	border-left: 5px solid transparent;
    	border-right: 5px solid transparent;
    	border-top: 5px solid #B6B6B6;
	}
	.popover.top .arrow:after {
    	bottom: 1px;
    	margin-left: -10px;
    	border-top-color: #f8f8f8;
    	border-bottom-width: 0;
	}
	.popover .arrow:after {
    	border-width: 10px;
    	content: "";
	}
	.popover .arrow, .popover .arrow:after {
    	position: absolute;
    	display: block;
    	width: 0;
    	height: 0;
    	border-color: transparent;
    	border-style: solid;
	}
	table.dataTable tbody td {
    padding: 0px 5px;
	BORDER-RIGHT: #000000 0px solid; /* 显示右边框为1px，如果不想显示就为0px */   
 	BORDER-LEFT: #000000 0px solid;/* 显示左边框为1px，如果不想显示就为0px */    
    }
    table.dataTable thead th {
	BORDER-RIGHT: #000000 0px solid; /* 显示右边框为1px，如果不想显示就为0px */   
 	BORDER-LEFT: #000000 0px solid;/* 显示左边框为1px，如果不想显示就为0px */    
    }
    #group_list tbody tr{
    	height:80px;
    }
    #group_list tbody tr td:last-child a{
    	color:#38f;
    }
</style>
</head>
<body>
	<div class="inner-page-top layui-clear" style="padding:0;">
	  <div class="layui-tab layui-tab-brief" lay-filter="couponTab" style="margin:0;">
		  <ul class="layui-tab-title" style="border-bottom:0;margin-bottom:9px;">
		    <li class="layui-this">所有促销</li>
		    <li>未开始</li>
		    <li>进行中</li>
		    <li>已结束</li>
		  </ul>
		</div>      
	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<div>
				<div style="float:left;"><button class="layui-btn layui-btn-normal" id="to_create_groupon">新建限时折扣</button></div>
				<div style="float:right;">
					<form id="queryform" method="post" class="layui-form" action="">
					<input type="hidden" value="0" name="discount_flag" id="discount_flag" />
					<div class="tool_search_div" >
						<input id="discount_name" name="discount_name" type="text"
							placeholder="搜索" /> <a href="javascript:;" onclick="searchPage()"
							class="tool_search_btn" style="margin-left: 0px;"> <i
							class="fa fa-search" aria-hidden="true"></i>
						</a>
					</div>
				</form>
				</div>
			</div>
			<p style="clear: both;"></p>
			<div class="tool_item clearfix" style="margin-top:10px;">
				<table id="group_list" class="layui-table" > 
					<colgroup>
					   <col width="20%">
						<col width="25%">
						<col width="15%">
						<col width="10%">
						<col width="15%">
					</colgroup>
					<thead id="group_header">
						<tr>
                            <th>活动名称</th>
							<th>有效时间</th>
							<th style="text-align:center;">活动标签</th>
							<th style="text-align:center;">活动状态</th>
							<th style="text-align:center;">操作</th>
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