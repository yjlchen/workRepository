<%@page import="com.itextpdf.text.log.SysoLogger"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1">
<title>商城后台</title>
<script type="text/javascript" src="${basePath}/pages/webstore/mydoc/video.js"></script>
<script type="text/javascript">
</script>
	<link type="text/css" rel="stylesheet" href="${basePath}/commons/plugin/paging/4a86166a.vendor.css">
  	<link type="text/css" rel="stylesheet" href="${basePath}/commons/plugin/paging/9e24f281.app.css">
  	<link type="text/css" rel="stylesheet" href="${basePath}/commons/plugin/paging/font-awesome.min.css">
  <style type="text/css">
      #inner-page-main{
            position: absolute;
            left: 1400px;
            top: 50px;
        }
        #span{
        	display: inline-block;
        	width: 80%;
        	overflow: hidden;
        	text-overflow:ellipsis;
        	white-space: nowrap;
        }
        #quanxuan{
        	margin-top:20px;
        }
        #images>div{
            display: inline-block;
            width: 200px;
            height: 209px;
            margin: 0 0 20px 20px;
        }
        #images img{
            width: 160px;
            height: 160px;
            margin-bottom: 10px;
        }
        #images a{
            color: #38f;
        }
        #popup{
            display: none;
            position: absolute;
            z-index: 10000;
            right: 0;
            top: 120px;
            width: 220px;
            height: 118px;
            box-shadow: 0 1px 6px rgba(0,0,0,0.2);
        }
         .layui-layer1{
       	    z-index: 19891015;
		    width: 270;
		    height: 300;
		    top: 289.5px;
		    left: 283px;
         }
        #popup>button{
            margin: 10px 0 0 30px;
            height: 30px;
            line-height: 30px;
        }
         form input{
            display: none;
        }
        form input{
            display: none;
        }
        .borColor{
            border: 1px solid #5FB878;
        }
        .wzColor{
            color: #5FB878!important;
        }
        body{
         text-align:center
         } 
		#demo1{
			 margin:0 auto; width:400px; height:100px;
		}
		 span:focus { outline: none; }
		 .hidefocus { 
		        hide-focus: expression(this.hidefocus=true);  /* for ie 5+ */ 
		        outline: none;  /* for firefox 1.5 + */ 
		}
		.layui-form-select dl {
			  max-height:150px;
			}
		#group_id1 .layui-form-select dl{
			  max-height:150px;
		}
		.docname span{
			background-color:#F8F8FF;
		}
		.docname span:HOVER{
			background-color:#F8F8FF;
		}
		.inner-page-main-container{
			height: 100%;
		}
		.layui-form-checked span{
			background: none;
		}
		.layui-form-checked:hover span{
			background: none;
		}
		#form1 div.layui-form-checked span{
			background-color: #5FB878;
		}
		#form2 div.layui-form-checked span{
			background-color: #5FB878;
		}
    </style>
    <script type="text/javascript"> 
	 <% 
	   String path = request.getContextPath(); 
	   String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/"; 
	  %>
	  $('#group_test').click(function(){
			$('#popup').hide();
		});
</script>
</head>
<body>
<div class="inner-page-main layui-clear">
    <div class="inner-page-main-container">
        <div>
            <div style="display: inline-block;width: 80%">
            	<div class="layui-box layui-upload-button" >
            		<form target="layui-upload-iframe" method="post" key="set-mine" enctype="multipart/form-data" action="">
		            	<input id="uploadFile" type="file" name="file" lay-type="video" class="layui-upload-file" /><br>
		                <!-- <span class="layui-upload-icon">
		                	<h1>000</h1>
		                </span> -->
		                <span  style="display: inline-block;width:90%;text-align: center">
		                    <div id="file_group_name">
		                    	<font size = "2">未分组</font>
		                    </div>
		                </span>
            		</form>
                </div>
                 <form id="form1" class="layui-form quanxuan" style="margin-top:25px">
     				<input id="da" type="checkbox"  name="quanxuan" title="全选" lay-filter="allChoose">
                    <a href="#" onclick="updateAllDoc()" class="layui-btn layui-btn-primary updgroup">修改分组</a>
                    <a href="#" onclick="deleteAllDoc()" class="layui-btn layui-btn-primary delgroup">批量删除</a>
                </form>
                <br>
 <!--  视频显示的div -->
                <div id="images" style="outline:none;">
                </div>
               <form id="form2" class="layui-form quanxuan">
					<input id="d1" type="checkbox" name="quanxuan" title="全选" lay-filter="allChoose1" >
                    <a href="#" onclick="updateAllDoc1()" class="layui-btn layui-btn-primary updgroup">修改分组</a>
                    <a href="#" onclick="deleteAllDoc1()" class="layui-btn layui-btn-primary delgroup">批量删除</a>
<!-- 分页信息 -->
                <div id="picture_pageid" class="margin-bottom-10" style="margin: -42px 0 0 540px;" >
					<div class="text-center" id="picture_page_index">
				    </div>
				</div>
                </form>
                <div id="empty" style="width: 33%;padding-left: 10px;margin-top: 10px;">
                	<font size="2">暂无数据，可点击左上角“上传视频”按钮添加</font>
                </div>
                 	
            </div>
            <div style="display: inline-block;float: right;width: 19%">
                <form id="queryform" method="post" class="layui-form" action="">
                    <div class="layui-form-item  layui-clear" style="float:left;">
                        <div class="layui-inline">
                            <div class="layui-input-inline">
                            	<div id="group_test">
                                <select name="group_id" id="group_id"  lay-filter="group" >
                                    <option value="">未分组</option>
                                </select>
                                </div>
                                <br/>
                                <button class="layui-btn layui-btn-primary tianjia" style="width: 100%">
                                    <i class="layui-icon">&#xe608;</i> 添加分组
                                </button>
                                <div id="popup" class="layui-form">
                                    <span style="margin: 5px 0 5px 20px;display: inline-block">添加分组</span>
                                    	<input type="hidden" value="3" name="group_type" id="group_type" />
                                   		<input type="text" placeholder="不超过六个字" lay-verify="groupname" class="layui-input" 
                                   			id="file_group_name" name="file_group_name" style="margin-left: 20px;width: 80%">
	                                    <button class="layui-btn layui-btn-normal"  lay-submit lay-filter="formDoc">确定</button>
	                                    <button type="reset" class="layui-btn layui-btn-primary quxiao">取消</button>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
 <div id="renamepic" class="layui-form" style="display: none;">
 	<input id ="id" type="hidden" value="" class="layui-input"  style="margin-left: 20px;width: 80%">
 	<input id ="file_name" type="text" value="" class="layui-input"  style="margin-left: 20px;width: 80%">
</div>
 <div id="editgroup" class="layui-form" style="display: none;" >
 	<select name="group_id1" id="group_id1"  lay-filter="group1" >
        <option value="">所有分组</option>
    </select>
</div>
 <div id="renamegroup" class="layui-form" style="display: none;">
 	<input id ="groupid" type="hidden" value=""  class="layui-input"  style="margin-left: 20px;width: 80%">
 	<input id ="groupname" type="text" value="" class="layui-input"  style="margin-left: 20px;width: 80%">
</div>
</body>
</html>