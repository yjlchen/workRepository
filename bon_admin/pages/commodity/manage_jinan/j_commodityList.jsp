<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>商品列表页面</title>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript" src="${basePath}/pages/commodity/manage_jinan/j_commodityList.js"></script>
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
            /**overflow:hidden;**/
        }
        @media screen and (max-width:768px){
        	.shanpin div{
            width: 66%;
            height: 100px;
            margin-left:2%;
            display: inline-block;
            overflow:hidden;
        }
        }
        .shanpin div a{
        	color:blue;
        }
        .shanpin div.shanpinimg{
        	float:left;
        	width:30%;
        	overflow:hidden;
        }
        /* 消除选中行数的显示 */
/* 		div.dataTables_wrapper span.select-info, div.dataTables_wrapper span.select-item { */
/* 		    margin-left: 0.5em; */
/* 		    display: none; */
/* 		} */
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
    /*顶层按钮颜色*/
    button#to_create {
    background-color: #009688;
	}
	.inner-page-top.layui-clear {
    margin-top: 3.5px;
	}
	/**全选框大小 **/
	.quanxuan i {
    margin-top: -5px;
    font-size: 15px;
    padding-left: 10.5px;
	}
	.layui-unselect.layui-form-checkbox {
    padding-right: 16px;
    height: 18px;
	}
</style>
</head>
<body>
	<div class="inner-page-top layui-clear" style="margin:0;padding:0;">
	  <div class="layui-tab layui-tab-brief" lay-filter="commodityTab" style="margin:0;">
		  <ul class="layui-tab-title" style="border-bottom:none;margin-bottom:9px;">
		    <li class="layui-this">出售中</li>
		    <li>已售罄</li>
		    <li>仓库中</li>
		  </ul>
		</div>      
	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			
			<div>
				<!-- <div style="float:left;"><button class="layui-btn layui-btn-normal" style="margin-bottom:15px;" id="to_create">发布商品</button></div> -->
				<div style="float:right;">
					<form id="queryform" method="post" class="layui-form" action="">
					   <input type="hidden" value="0" name="commodity_status" id="commodity_status" />
				       <div class="layui-form-item  layui-clear" style="float:left;">
						    <div class="layui-inline">
						      <div class="layui-input-inline">
						        <select name="group_id" id="group_id_select"  lay-filter="group"  >
						          <option value="">商品分组</option>
						        </select>
						      </div>
						    </div>
	                    </div>  
					<div class="tool_search_div" >
						<input id="commodity_name" name="commodity_name" type="text"
							placeholder="搜索" /> <a href="javascript:;" onclick="searchPage()"
							class="tool_search_btn" style="margin-left: 0px;"> <i
							class="fa fa-search" aria-hidden="true"></i>
						</a>
					</div>
				</form>
				</div>
					
			</div>
			<div class="tool_item clearfix">
				<table id="group_list" class="layui-table layui-form" > 
					<colgroup>
					   <col width="2%">
						<col width="25%">
						<%-- <col width="10%"> --%>
						<col width="8%">
						<col width="8%">
						<col width="8%">
						<col width="8%">
						<col width="15%">
						<%-- <col width="8%"> --%>
						<col width="12%">
					</colgroup>
					<thead id="group_header">
						<tr>
						    <th> 
						        <div align="center" class="quanxuan">
						         	<input type="checkbox" name="chk_all" id="chk_all" onchange="to_check(this)" /> 
						        </div>
		                    </th>
                            <th style="text-align:center;">商品</th>
							<!-- <th style="text-align:center;">访客数/浏览量</th> -->
							<th style="text-align:center;">库存</th>
							<th style="text-align:center;">真实销量</th>
							<th style="text-align:center;">虚拟销量</th>
							<th style="text-align:center;">创建时间</th>
							<th style="text-align:center;">商品标签</th>
							<!-- <th style="text-align:center;">序号</th> -->
							<th style="text-align:center;">操作</th>
						</tr>
					</thead>
					<tbody id="group_body">
					</tbody>
				</table>
				<div>
			   <!--<a id="upgroup" style="cursor: pointer;width: 80px;padding:5px 18px;display: inline;"
			   		 class="layui-btn layui-btn-primary" onclick="to_upgroup(this)">改分组</a> -->
				   <a id="upoff" style="cursor: pointer;width: 70px;padding:5px 18px;display: inline;" 
				   		class="layui-btn layui-btn-primary" onclick="to_upoff()">下架</a>
				   <a id="updel" style="cursor: pointer;width: 70px;padding:5px 18px;display: inline;" 
				   		class="layui-btn layui-btn-primary" onclick="to_updel()">删除</a>
				</div>
				<div id="popover" class="popover top" style="display: none; min-width: 200px; height: 400px; top: 300px; left: 229px;">
					<div class="arrow"></div>
		            <div class="popover-inner popover-category2">
		                <div class="popover-header clearfix"> 修改分组
		        			<a href="#" target="_blank" class="pull-right">管理</a>
		                </div>
		                <div class="popover-content" style="height:300px;width:100%;overflow:auto;">
		                    <ul class="popover-content-categories js-popover-content-categories">
		                        <li data-id="97977760" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">胶原蛋白</span>
		                        </li>
		        
		                        <li data-id="97942754" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">焕益</span>
		                        </li>
		        
		                        <li data-id="97867628" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">Xlear+乐亦康</span>
		                        </li>
		        
		                        <li data-id="97303471" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">健必依</span>
		                        </li>
		        
		                        <li data-id="97251376" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">赠品</span>
		                        </li>
		        
		                        <li data-id="97083367" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">海兰姬祛疤</span>
		                        </li>
		        
		                        <li data-id="97065714" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">悦芽</span>
		                        </li>
		        
		                        <li data-id="95620493" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">益生元</span>
		                        </li>
		        
		                        <li data-id="95012470" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">欣宜安</span>
		                        </li>
		        
		                        <li data-id="95011531" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">倍儿show</span>
		                        </li>
		        
		                        <li data-id="95011164" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">益生MT</span>
		                        </li>
		        
		                        <li data-id="94563820" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">Fibrovera</span>
		                        </li>
		        
		                        <li data-id="92645989" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">益生妈咪</span>
		                        </li>
		        
		                        <li data-id="91947229" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">葡乐安</span>
		                        </li>
		        
		                        <li data-id="91562191" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">汝新</span>
		                        </li>
		        
		                        <li data-id="89817563" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">立纾酸</span>
		                        </li>
		        
		                        <li data-id="89811625" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">酸立通</span>
		                        </li>
		        
		                        <li data-id="89684239" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">玛咖</span>
		                        </li>
		        
		                        <li data-id="89669463" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">螺旋藻</span>
		                        </li>
		        
		                        <li data-id="84017151" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">xlear</span>
		                        </li>
		        
		                        <li data-id="83621701" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">乐亦康</span>
		                        </li>
		        
		                        <li data-id="83620290" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">辅敏康</span>
		                        </li>
		        
		                        <li data-id="83620277" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">常益生</span>
		                        </li>
		        
		                        <li data-id="83620240" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">自然醒</span>
		                        </li>
		        
		                        <li data-id="83620204" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">卫保宁</span>
		                        </li>
		        
		                        <li data-id="83620161" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">菌能</span>
		                        </li>
		        
		                        <li data-id="83620127" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">舒卫能</span>
		                        </li>
		        
		                        <li data-id="83564423" class="clearfix">
		                            <input type="checkbox">
		                            <span class="category-title">列表中隐藏</span>
		                        </li>
		        
		                    </ul>
		                </div>
		                <div class="popover-footer">
		                    <a href="javascript:;" class="js-btn-confirm" onclick="preserve()">保存</a>
		                    <a href="javascript:;" class="js-btn-cancel" onclick="cancel()">取消</a>
		                </div>
		            </div>
		        </div>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		$("#group_header .quanxuan").on("click",function(){
			var checked=$(this).children("input").prop("checked");
			var ch=$("input[name='ck_com']");
			if(checked){
				for(var i=0;i<ch.length;i++){
					$(ch[i]).attr("checked",true);
					$(ch[i]).next().addClass("layui-form-checked");
				}
			}else{
				for(var i=0;i<ch.length;i++){
					$(ch[i]).attr("checked",false);
					$(ch[i]).next().removeClass("layui-form-checked");
				}
			}
		});
	
		$("#group_body").on("click","div[lay-skin='primary']",function(){
			var check=$(this).prev().attr("checked");
			var ch=$("input[name='ck_com']");
			var state=false;
			if(check){
				$(this).removeClass("layui-form-checked");
				$(this).prev().attr("checked",false);
			}else{
				$(this).addClass("layui-form-checked");
				$(this).prev().attr("checked",true);
			}
			for(var i=0;i<ch.length;i++){
				if(!($(ch[i]).attr('checked'))){
					state=true;
					break;
				};
			}
			if(state){
				$("#group_header .quanxuan div").removeClass("layui-form-checked");
				$("#group_header .quanxuan input").attr("checked",false);
			}else{
				$("#group_header .quanxuan div").addClass("layui-form-checked");
				$("#group_header .quanxuan input").attr("checked",true);
			}
		});
	</script>
</body>
</html>