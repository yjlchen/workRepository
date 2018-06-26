<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.util.Map,com.swn.common.util.PropertiesUtil"
	isErrorPage="true"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%
	response.setStatus(HttpServletResponse.SC_OK);
%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html>
<html>
<head>
<title>菜单管理</title>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<link rel="stylesheet" type="text/css" href="${basePath}/tools/ztree/css/zTreeStyle.css">
<script type="text/javascript" src="${basePath}/tools/ztree/js/jquery.ztree.core.js"></script>
<script type="text/javascript" src="${basePath}/tools/ztree/js/jquery.ztree.excheck.js"></script>
<script type="text/javascript" src="${basePath}/tools/ztree/js/jquery.ztree.exedit.js"></script>
<style>
/*按钮*/
.icon_div {
	display: inline-block;
	height: 25px;
	width: 35px;
}

.icon_div a {
	display: inline-block;
	width: 27px;
	height: 20px;
	cursor: pointer;
}

/*end--按钮*/

/*ztree表格*/
.ztree {
	padding: 0;
	border: 2px solid #CDD6D5;
}

.ztree li a {
	vertical-align: middle;
	height: 30px;
}

.ztree li>a {
	width: 100%;
}

.ztree li>a, .ztree li a.curSelectedNode {
	padding-top: 0px;
	background: none;
	height: auto;
	border: none;
	cursor: default;
	opacity: 1;
}

.ztree li ul {
	padding-left: 0px
}

.ztree div.diy span {
	line-height: 30px;
	vertical-align: middle;
}

.ztree div.diy {
	height: 100%;
	width: 18%;
	line-height: 33px;
	border-top: 1px dotted #ccc;
	border-left: 1px solid #eeeeee;
	text-align: center;
	display: inline-block;
	box-sizing: border-box;
	color: #6c6c6c;
	font-family: "SimSun";
	font-size: 16px;
	overflow: hidden;
}
.ztree div.diy2{
	width: 10%
}
.ztree div.diy:first-child {
	text-align: left;
	text-indent: 10px;
	border-left: none;
}

.ztree .head {
	background: #5787EB;
}

.ztree .head div.diy {
	border-top: none;
	border-right: 1px solid #CDD2D4;
	color: #fff;
	font-family: "Microsoft YaHei";
	font-size: 14px;
}

/*end--ztree表格*/
</style>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px">菜单管理</span>
  	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<div class="layer" >
				<div id="tableMain" style=" margin-left: 20px; margin-right: 20px">
				    <button class="" id="addFirstMenu">添加一级菜单</button></br>
					<ul id="dataTree" class="ztree">
					</ul>
				</div>
			</div>
		</div>
	</div>
	<script>
		/**
		 * 自定义DOM节点
		 */
		function addDiyDom(treeId, treeNode) {
			var spaceWidth = 15;
			var liObj = $("#" + treeNode.tId);
			var aObj = $("#" + treeNode.tId + "_a");
			var switchObj = $("#" + treeNode.tId + "_switch");
			var icoObj = $("#" + treeNode.tId + "_ico");
			var spanObj = $("#" + treeNode.tId + "_span");
			aObj.attr('title', '');
			aObj.append('<div class="diy swich"></div>');
			var div = $(liObj).find('div').eq(0);
			switchObj.remove();
			spanObj.remove();
			icoObj.remove();
			div.append(switchObj);
			div.append(spanObj);
			var spaceStr = "<span style='height:1px;display: inline-block;width:"
					+ (spaceWidth * treeNode.level) + "px'></span>";
			switchObj.before(spaceStr);
			var editStr = '';
			editStr += '<div class="diy">' + (treeNode.menu_url == null ? '&nbsp;' : showColumnValue(treeNode.menu_url,30) ) + '</div>';
			editStr += '<div class="diy">' + (treeNode.serial_num == null ? '&nbsp;' : treeNode.serial_num ) + '</div>';
			editStr += '<div class="diy">' + (treeNode.menu_warrant_name == null ? '&nbsp;' : showColumnValue(treeNode.menu_warrant_name,40) ) + '</div>';
			editStr += '<div class="diy diy2">' + (treeNode.img_url == null ? '&nbsp;' : '<img style="height: 30px;" src="'+treeNode.img_url+'">' ) + '</div>';
			editStr += '<div class="diy ">' + formatHandle(treeNode) + '</div>';
			aObj.append(editStr);
		}
		/**
		 * 查询数据
		 */
		function query() {
			var zTreeNodes;
			var setting = {
				view : {
					showLine : true,
					showIcon : false,
					addDiyDom : addDiyDom,
				},
				data : {
					simpleData : {
						enable : true
					}
				}
			};
			var datas;
			$.ajax({
				url:getRootPath()+"/menu/queryMenuList.action",
				dataType:"json",
				type:"post",
				async:false,
				success:function(data){
					datas=data;
					datas[0].open=true;
				}
			})
			//初始化列表
			zTreeNodes = datas;
			//初始化树
			$.fn.zTree.init($("#dataTree"), setting, zTreeNodes);
			//添加表头
			var li_head = ' <li class="head"><a><div class="diy">名称</div>'
											  +'<div class="diy">链接</div>'
											  +'<div class="diy">排序</div>'
											  +'<div class="diy">具体功能</div>'
											  +'<div class="diy diy2">菜单图片</div>'
											  +'<div class="diy">操作</div></a></li>';
			var rows = $("#dataTree").find('li');
			if (rows.length > 0) {
				rows.eq(0).before(li_head)
			} else {
				$("#dataTree").append(li_head);
				$("#dataTree")
						.append(
								'<li ><div style="text-align: center;line-height: 30px;" >无符合条件数据</div></li>')
			}
		}
		/**
		 * 根据权限展示功能按钮
		 * @param treeNode
		 * @returns {string}
		 */

		function formatHandle(treeNode) {
			var htmlStr = '';
			/* htmlStr += '<div class="icon_div"><a class="icon_edit" title="修改" href="javascript:edit(\''
					+ treeNode.id + '\',' + treeNode + ')">修改</a></div>'; */
			htmlStr += '<div class="icon_div"><a href="javascript:" class="update" data-id='
				+ treeNode.id +' data-pId='+(treeNode.pId==null?0:treeNode.pId)+' data-final="'+treeNode.final_node+'" data-has='+treeNode.haschild+'>修改</a></div>';
			htmlStr += '<div class="icon_div"><a href="javascript:" class="delete" data-id='
				+ treeNode.id +' data-pId='+(treeNode.pId==null?0:treeNode.pId)+'>删除</a></div>';
			htmlStr += '<div class="icon_div"><a href="javascript:" class="add" data-id="'
				+ treeNode.id +'" data-pId='+(treeNode.pId==null?0:treeNode.pId)+' data-final="'+treeNode.final_node+'">添加</a></div>';
			return htmlStr;
		}
		 layui.use(['form','element','layer'], function(){
			  var layer = layui.layer;
			 $("#addFirstMenu").click(function(){
				 window.location.href=getRootPath()+'/pages/cm/permissions/editMenu.jsp?id=0&type=first&parentID=100000&final_node=0';
			});
			$(".ztree").on("click",".update",function(){
				var id=$(this).attr("data-id");
				var parentID=$(this).attr("data-pId");
				var final_node=$(this).attr("data-final")=="null"?"0":$(this).attr("data-final");
				var haschild=$(this).attr("data-has");
				window.location.href=getRootPath()+'/pages/cm/permissions/editMenu.jsp?id='+id+'&type=update&parentID='+parentID+'&final_node='+final_node+'&haschild='+haschild;
			})
			$(".ztree").on("click",".add",function(){
				var id=$(this).attr("data-id");
				var final_node=$(this).attr("data-final")=="null"?"0":$(this).attr("data-final");
				var parentID=$(this).attr("data-pId");
				if(final_node==0){  //非最终子节点
					window.location.href=getRootPath()+'/pages/cm/permissions/editMenu.jsp?final_node=0&id='+id+'&type=add&parentID='+parentID;
				}else{
					parent.layer.msg("最终节点不能添加子菜单", {icon: 2,time: 2000});
				}
				
			})
			
			$(".ztree").on("click",".delete",function(){
				var id=$(this).attr("data-id");
				parent.layer.confirm('确定要删除这条信息吗？', {
					  btn: ['是', '否'] //可以无限个按钮
					}, function(index, layero){
					  //按钮【按钮一】的回调
						$.ajax({
					        url : getRootPath()+"/menu/deleteMenu.action",
					        type : "post",
					        data : { id : id },
					        datatype : "text",
					        success : function (data) {
					        	if(data=="success"){
						        	parent.layer.msg('删除成功', {
										  icon: 1,
										  time: 500 //（如果不配置，默认是3秒）
										}, function(){
											window.location.href=getRootPath()+"/pages/cm/permissions/menuManage.jsp";
											parent.layer.closeAll();
										});
					        	}else if(data=="hasSub"){
					        		parent.layer.msg("请先删除子菜单！", {icon: 2,time: 2000});
					        		return false;
					        	}else if(data=="hasRole"){
					        		parent.layer.msg("菜单已被角色绑定，请先解除绑定！", {icon: 2,time: 2000});
					        		return false;
					        	}else{
					        		parent.layer.msg("删除失败", {icon: 2,time: 2000});
					        		return false;
					        	}
					        }
					    })
					}, function(index){
					  //按钮【按钮二】的回调
						layer.closeAll('dialog');
					});
				
			})
		 })
		 
		$(function() {
			//初始化数据
			query();
		})
	</script>
</body>
</html>