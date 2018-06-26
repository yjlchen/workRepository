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
<title>标签关系</title>
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
	width: 33.33333333333333333333333333333333333333333333333333%;
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
	   <span style="font-size: 18px;">标签关系</span>
  	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<div class="layer" >
				<div id="tableMain" style=" margin-left: 150px; margin-right: 150px">
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
			editStr += '<div class="diy">' + (treeNode.label_relation_name == null ? '&nbsp;' : treeNode.label_relation_name ) + '</div>';
			editStr += '<div class="diy">' + formatHandle(treeNode) + '</div>';
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
				url:getRootPath()+"/functionLabel/labelAndRelation.action",
				dataType:"json",
				type:"post",
				async:false,
				success:function(data){
					datas=data;
				}
			})
			//初始化列表
			zTreeNodes = datas;
			//初始化树
			$.fn.zTree.init($("#dataTree"), setting, zTreeNodes);
			//添加表头
			var li_head = ' <li class="head"><a><div class="diy">名称</div><div class="diy">关联标签</div><div class="diy">操作</div></a></li>';
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
				+ treeNode.id +'>修改</a></div>';
			return htmlStr;
		}
		 layui.use(['form','element','layer'], function(){
			  var layer = layui.layer;
			$(".ztree").on("click",".update",function(){
				var id=$(this).attr("data-id");
				var name=$(this).parent().parent().parent().children().eq(0).children().eq(2).text();
				name=unicode(name);
				layer.open({
					  title:"修改",
					  type: 2,
					  id:100,
					  area: ['700px', '500px'],
					  content: getRootPath()+'/pages/customer/functionlabel/updateLabelRelation.jsp?id='+id+'&name='+name
				  });
			})	 
		 })
		 
		$(function() {
			//初始化数据
			query();
		})
		function addSector(id, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("dataTree");
			//将新节点添加到数据库中  
			var name = 'NewNode';
			/* $.post('./index.php?r=data/addtree&pid='+treeNode.id+'&name='+name,function (data) {  
			    var newID = data; //获取新添加的节点Id   */
			zTree.addNodes(treeNode, {
				id : 1212,
				pId : id,
				name : name
			}); //页面上添加节点  
			/* var node = zTree.getNodeByParam("id", newID, null); //根据新的id找到新添加的节点  
			zTree.selectNode(node); //让新添加的节点处于选中状态  
			});   
			});*/
		}
			
			function addHoverDom(treeId, treeNode) {
	            var sObj = $("#" + treeNode.tId + "_span");
	            if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
	            var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
	                + "' title='add node' onfocus='this.blur();'></span>";
	            sObj.after(addStr);
	            var btn = $("#addBtn_"+treeNode.tId);
				var btn1 = $("#"+treeNode.tId+"_edit");
	            if (btn) btn.bind("click", function(){
	                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
					zTree.addNodes(treeNode, {id:1212, pId:treeNode.id, name:"aa"}); //页面上添加节点  
					 var node = zTree.getNodeByParam("id", 1212, null); //根据新的id找到新添加的节点  
					zTree.selectNode(node);
					//})
						return false;
	            });
				if (btn1) btn1.bind("click", function(){
	                return false;
	            });
	        };
	        function removeHoverDom(treeId, treeNode) {
	            $("#addBtn_"+treeNode.tId).unbind().remove();
	        };
			function remove2HoverDom(treeId, treeNode) {
	            $("#reBtn_"+treeNode.tId).unbind().remove();
	        };
			
			function onClick(e,treeId, treeNode) {
				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
				zTree.expandNode(treeNode, null, null, null, true);
			}
			function beforeRename(treeId, treeNode, newName, isCancel) {
				if (newName.length == 0) {
					var zTree = $.fn.zTree.getZTreeObj("treeDemo");
					alert("节点名称不能为空.");
					return false;
				}
				
				//if(n==1){
				//n++;
				//alert("修改失败，请刷新页面")
					//return false;
				//}
				return true;
			}
			function onRename(e, treeId, treeNode, isCancel) {
				alert("xiugai wei "+treeNode.name)
				return false;
			}
			function beforeRemove(treeId, treeNode) {
				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
				zTree.selectNode(treeNode);
				return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
			}
			function onRemove(e, treeId, treeNode) {
				console.log("移除")
			}
	</script>
</body>
</html>