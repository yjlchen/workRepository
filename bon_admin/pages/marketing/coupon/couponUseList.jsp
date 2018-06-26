<%@page import="java.net.URLDecoder"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>优惠券已使用列表</title>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript" src="${basePath}/pages/marketing/coupon/couponUseList.js"></script>
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
        .shanpin{
            width:100%;
            /*height: 50px;*/
            padding: 10px 10px 10px 10px;
        }
        .shanpin input{
            display: inline-block;
        }
        
        .shanpin img{
            margin-top: 9px;
            width: 50px;
            height: 34px;
        }
        .shanpin div{
            width: 66%;
            height: 50px;
            margin-left:2%;
            display: inline-block;
            overflow:hidden;
        }
        .shanpin div a{
        	color:blue;
        }
        .shanpin div.shanpinimg{
        	float:left;
        	width:30%;
        	overflow:hidden;
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
<%
	String couponName = URLDecoder.decode(request.getParameter("couponName"),"UTF-8");
%>
<script type="text/javascript">
	var id = getUrlParam("id");
	var couponName = '<%=couponName %>';
	$(function(){
		$("#yhjbhqqq").val(id);
		$("#orangeCouponname").text(couponName);
		
		$(".layui-tab-title li").click(function(){
			var index = $(".layui-tab-title li").index(this);
			location.href = "couponList.jsp?coupon_flag="+index;
		});
	})
	
</script>
	<div class="inner-page-top layui-clear">
	  <div class="layui-tab layui-tab-brief" lay-filter="couponTab">
		  <ul class="layui-tab-title">
		    <li class="layui-this">所有优惠券</li>
		    <li>未开始</li>
		    <li>进行中</li>
		    <li>已结束</li>
		  </ul>
		</div>      
	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<div>
				<div style="float:left;">
					已使用列表|
					<span style="color: #f60;" id="orangeCouponname"></span>
				</div>
				<div style="float:right;">
					<form id="queryform" method="post" class="layui-form" action="">
					<input type="hidden" value="" name="id"  id="yhjbhqqq"/> 
					<div class="tool_search_div" >
						<input id="wx_name" name="wx_name" type="text"
							placeholder="搜索" /> 
							<a href="javascript:;" onclick="searchPage()"
							class="tool_search_btn" style="margin-left: 0px;"> <i
							class="fa fa-search" aria-hidden="true"></i>
						</a>
					</div>
				</form>
				</div>
			</div>
			<div class="tool_item clearfix">
				<table id="group_list" class="layui-table" > 
					<colgroup>
					   <col width="20%">
						<col width="10%">
						<col width="10%">
						<col width="15%">
						<col width="10%">
						<col width="15%">
						<col width="10%">
						<col width="10%">
					</colgroup>
					<thead id="group_header">
						<tr>
                            <th style="text-align:center;">客户</th>
							<th style="text-align:center;">性别</th>
							<th style="text-align:center;">城市</th>
							<th style="text-align:center;">领取时间</th>
							<th style="text-align:center;">价值</th>
							<th style="text-align:center;">使用时间</th>
							<th style="text-align:center;">订单详情</th>
							<th style="text-align:center;">状态</th>
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