/**
 * 微页面草稿，表单提交，初始化js
 */
//定义一个数组，存储leftText_后面的数字
//var numArr = [];

$(function(){
	initdata();
})


layui.use(['form','layer'], function(){
		var form = layui.form();
		var id = getUrlParam("id");
		var formalUrl,draftUrl;
		if(id!=null){
			formalUrl = getRootPath()+ '/webstore/pageinfo/draftPageinfoLaunch.action';
			draftUrl = getRootPath()+ '/webstore/pageinfo/updatePageinfo.action'; 
		}else{
			formalUrl = getRootPath()+ '/webstore/pageinfo/addPageinfoFormal.action';  
			draftUrl = getRootPath()+ '/webstore/pageinfo/addPageinfoDraft.action'; 
			}
		
		//修改时加载数据
		if(id!=null){
			$.ajax({
			    url : getRootPath()+"/webstore/pageinfo/queryPageinfoById.action",
			    type : "post",
			    data:{"id":id},
			    async: false,//同步
			    dataType:"json",
			    success : function (gdata) {
			    	$("#total").html(gdata.edit_content);
			    	//定义<div id="total">对象
			    	var total = $(gdata.edit_content);
			    	//存在富文本时，才进行回显
			    	var rich_text=$("div[name='rich_text']");
			    	if(rich_text.length!=0){
				    	/*//删除ueditor编辑器的div下的多余的一个子div
				    	$("#editorwym").children().remove();
				    	//给ueditor编辑器进行初始化赋值
				    	var richTextContent = $("#leftRichtext").html();
				    	//初始化编辑器内容
			            ue.addListener("ready", function ()  {  
			            	ue.setContent(richTextContent, false);  
			            });*/
			    		//对获取到的富文本进行回显
			    		for(var i=0;i<rich_text.length;i++){
			    			//获取当前循环富文本的ueid
			    			var ueid=$(rich_text[i]).attr("ueid");
			    			//将右边的id为ueid的元素下的第一个孩子元素删除
			    			$("#"+ueid+"").children().eq(0).remove();
			    			//截取获取到的ueid的后面数字部分
			    			var num=ueid.substring(6);
			    			//封装ue对象
			    			var ue=UE.getEditor(""+ueid+"");
			    			//获取左边富文本中的内容
			    			var richTextContent = $("#leftText_"+num).html();
			    			//当右边的编辑器准备完成后，将获取到的内容赋值给编辑器
			    			ue.addListener("ready", function ()  {  
				            	ue.setContent(richTextContent, false);  
				            });
			    		}
			    	}
			    	//遍历id以li_开头的li，目的是找到商品，给商品的价格等信息赋值，以便商品信息更新时，微页面随之变化
			    	total.find("li[id*='li_']").each(function (j,n) {  
			    		//获得隐藏域中的商品id
			    		var goodId = $(n).children().eq(0).val();
			    		//获得这个li的id
			    		var id = $(n).attr("id");
			    		//获得id的_后面的数字
			    		var num  = id.substr(id.lastIndexOf('_')+1);
			    		//根据id,ajax查询其他商品信息，并赋值
			    		$.ajax({
		    	        	"type":"post",
		    	            "url": getRootPath()+"/commodity/queryCommodityInfo.action",
		    	            async: false,//同步
		    	            'data' : {id:goodId},
		    	            "dataType":"json",
		    	            'success' : function (data) {
		    	            	 var url;
		    	            	 if(data.data.img_path_str.indexOf(",")<0){
		    	        			 url = data.data.img_path_str;
		    	        		 }else{
		    	        			//图片url,取第一个，之前的值
		    	        			 url = data.data.img_path_str.substr(0,data.data.img_path_str.indexOf(","));
		    	        		 }
		    	    			var price = data.data.price;
		    	    			var goodName = data.data.commodity_name;
		    	    			$("#"+id).find("div.photo-block img").attr("src",url);
		    	    			$("#"+id).find("div.info .goods-title").html(goodName);
		    	    			$("#"+id).find("div.info .goods-price em").html("￥"+price);
		    	    			$("#good_"+num).find("img").attr("src",url);
		    	            },
		    	            'error':function(){
		    	            	
		    	            }
		    		    });
			    	});
			    	
			    	//给微页面表中存储的字段赋值
			    	$("input[name='id']").val(id);
			    	$("input[name='micro_main']").val(gdata.micro_main);
					$("input[name='micro_des']").val(gdata.micro_des);
					$("select[name='micro_group_id']").val(gdata.micro_group_id);
					
					//加载各个模块的js
			    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/total.js");
			    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/goods.js");
			    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/title.js");
			    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/richtext.js");
			    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/text_nav.js");
			    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/nav.js");
			    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/store.js");
			    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/goods_list.js");
			    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/notice.js");
			    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/showcase.js");
			    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/image_ad.js");
			    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/cube2.js");
			    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/search.js");
			    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/line.js");
			    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/white.js");
			    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/link.js");
			    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/coupon.js");
			    }
			});
			
		}
		
		
		//预览
		$("#yulan").click(function(){
			//再获得微页面的id
			var pageId = getUrlParam("id");
			//id不为空，直接跳到预览页面
			if(pageId!="" && pageId!="null" && pageId!=null){
				//获得要提交的字段的值
				var id = $("input[name='id']").val();
				var micro_name = $("input[name='micro_name']").val();
				var micro_des = $("input[name='micro_des']").val();
				var micro_group_id = $("select[name='micro_group_id']").val();
				var back_color = $("input[name='back_color']").val();
				
				var micro_main = $("input[name='micro_main']").val();
				var edit_content = $("#total").html();
				var preview_content = $(".app-preview").html();

				var addJsonStr = {
						"id":id,
						"micro_name":micro_name,
						"micro_des":micro_des,
						"micro_group_id":micro_group_id,
						"back_color":back_color,
						"micro_main":micro_main,
						"edit_content":edit_content,
						"preview_content":preview_content};
				
				var jsonStr = JSON.stringify(addJsonStr);
				
				//获得公告的内容（如果有的话）
				var noticeArray = $("input[name='content']");
				for(var i=0;i<noticeArray.length;i++){
					var value = $(noticeArray[i]).val();
						//判断公告内容不能为空
						if(value == ""){
							var index = $(noticeArray[i]).parents("div.app-sidebar").index();
							var top = $(noticeArray[i]).position().top;
					        $(modality.children()[index]).css("display","block");
					        $(modality.children()[index]).siblings().css("display","none");
							//显示错误提示信息
					        $(modality.children()[index]).find(".notice-error-message").css("display","block");
							return false;
							break;
						}
					}
				
				if(micro_name==""){
					$(".help-block").css("display","block");
					return false;
				}else{
					$.ajax({
						url : getRootPath()+ '/webstore/pageinfo/previewPageinfoUpdate.action',
						type : 'POST',
						data : {signupForm:jsonStr},
						dataType : 'TEXT',
						success : function(result){
							if("success"==result.substr(0,result.indexOf(","))){
								layer.msg("保存成功，正在重定向到预览页面", {
									  icon: 1,
									  time: 500 //（如果不配置，默认是3秒）
									}, function(){
										location.href = 
											getRootPath()+ '/webstore/pageinfo/toPreview.action?id='+result.substr(result.indexOf(",")+1); 
									});
							}
							else{
								disable_submit(true,'launch');
								disable_submit(true,'savedraft');
								disable_submit(true,'yulan');
								parent.layer.alert("保存失败");
							}
						},
						error:function(){
							disable_submit(true,'launch');
							disable_submit(true,'savedraft');
							disable_submit(true,'yulan');
							parent.layer.alert("保存失败");
						}
					});
				}
			}
			//id为空，先保存成草稿，再跳到预览页面，此时是新增操作
			else{
				//获得要提交的字段的值
				var micro_name = $("input[name='micro_name']").val();
				var micro_des = $("input[name='micro_des']").val();
				var micro_group_id = $("select[name='micro_group_id']").val();
				var back_color = $("input[name='back_color']").val();
				//定义该微页面的跳转链接,需在后台拼上id
				var micro_url = weiPagePath;
				var edit_content = $("#total").html();
				var preview_content = $(".app-preview").html();

				var addJsonStr = {
						"micro_name":micro_name,
						"micro_des":micro_des,
						"micro_group_id":micro_group_id,
						"back_color":back_color,
						"micro_url":micro_url,
						"edit_content":edit_content,
						"preview_content":preview_content};
				
				var jsonStr = JSON.stringify(addJsonStr);
				
				//获得公告的内容（如果有的话）
				var noticeArray = $("input[name='content']");
				for(var i=0;i<noticeArray.length;i++){
					var value = $(noticeArray[i]).val();
						//判断公告内容不能为空
						if(value == ""){
							var index = $(noticeArray[i]).parents("div.app-sidebar").index();
							var top = $(noticeArray[i]).position().top;
					        $(modality.children()[index]).css("display","block");
					        $(modality.children()[index]).siblings().css("display","none");
							//显示错误提示信息
					        $(modality.children()[index]).find(".notice-error-message").css("display","block");
							return false;
							break;
						}
					}
				
				if(micro_name==""){
					$(".help-block").css("display","block");
					return false;
				}else{
					$.ajax({
						url : getRootPath()+ '/webstore/pageinfo/previewPageinfo.action',
						type : 'POST',
						data : {signupForm:jsonStr},
						dataType : 'TEXT',
						success : function(result){
							if("success"==result.substr(0,result.indexOf(","))){
								layer.msg("保存成功，正在重定向到预览页面", {
									  icon: 1,
									  time: 500 //（如果不配置，默认是3秒）
									}, function(){
										location.href = 
											getRootPath()+ '/webstore/pageinfo/toPreview.action?id='+result.substr(result.indexOf(",")+1); 
									});
							}
							else{
								disable_submit(true,'launch');
								disable_submit(true,'savedraft');
								disable_submit(true,'yulan');
								parent.layer.alert("保存失败");
							}
						},
						error:function(){
							disable_submit(true,'launch');
							disable_submit(true,'savedraft');
							disable_submit(true,'yulan');
							parent.layer.alert("保存失败");
						}
					});
				}
			}
		});
		
		
		//上架
		$("#launch").click(function(){
			//获得要提交的字段的值
			var id = $("input[name='id']").val();
			var micro_name = $("input[name='micro_name']").val();
			var micro_des = $("input[name='micro_des']").val();
			var micro_group_id = $("select[name='micro_group_id']").val();
			var back_color = $("input[name='back_color']").val();
			var micro_main = $("input[name='micro_main']").val();
			//定义该微页面的跳转链接，新增时需在后台拼上id，修改直接在此加上id
			var micro_url = weiPagePath+id;
			var edit_content = $("#total").html();
			var preview_content = $(".app-preview").html();
			
			var addJsonStr = {
					"id":id,
					"micro_name":micro_name,
					"micro_des":micro_des,
					"micro_group_id":micro_group_id,
					"back_color":back_color,
					"micro_main":micro_main,
					"micro_url":micro_url,
					"edit_content":edit_content,
					"preview_content":preview_content};
			
			var jsonStr = JSON.stringify(addJsonStr);
			
			//获得公告的内容（如果有的话）
			var noticeArray = $("input[name='content']");
			for(var i=0;i<noticeArray.length;i++){
				var value = $(noticeArray[i]).val();
					//判断公告内容不能为空
					if(value == ""){
						var index = $(noticeArray[i]).parents("div.app-sidebar").index();
						var top = $(noticeArray[i]).position().top;
				        $(modality.children()[index]).css("display","block");
				        $(modality.children()[index]).siblings().css("display","none");
						//显示错误提示信息
				        $(modality.children()[index]).find(".notice-error-message").css("display","block");
						return false;
						break;
					}
				}
			
			if(micro_name==""){
				$(".help-block").css("display","block");
				return false;
			}else{
				$.ajax({
					url : formalUrl,
					type : 'POST',
					data : {signupForm:jsonStr},
					dataType : 'TEXT',
					success : function(result){
						if("success"==result){
							layer.msg("操作成功", {
								  icon: 1,
								  time: 500 //（如果不配置，默认是3秒）
								}, function(){
									location.href = getRootPath()+ '/pages/webstore/webpage/pageinfoTab.jsp?checkTab=formal';
									
								});
						}
						else{
							disable_submit(true,'launch');
							disable_submit(true,'savedraft');
							disable_submit(true,'yulan');
							parent.layer.alert("操作失败");
						}
					},
					error:function(){
						disable_submit(true,'launch');
						disable_submit(true,'savedraft');
						disable_submit(true,'yulan');
						parent.layer.alert("操作失败");
					}
				});
			  }
			
			});
		
		
		//保存成草稿，此时可能有新增、修改2种操作
		$("#savedraft").click(function(){
			//获得要提交的字段的值
			var id = $("input[name='id']").val();
			var micro_name = $("input[name='micro_name']").val();
			var micro_des = $("input[name='micro_des']").val();
			var micro_group_id = $("select[name='micro_group_id']").val();
			var back_color = $("input[name='back_color']").val();
			var micro_main = $("input[name='micro_main']").val();
			//定义该微页面的跳转链接，新增时需在后台拼上id，修改直接在此加上id
			var micro_url = weiPagePath+id;
			var edit_content = $("#total").html();
			var preview_content = $(".app-preview").html();

			var addJsonStr = {
					"id":id,
					"micro_name":micro_name,
					"micro_des":micro_des,
					"micro_group_id":micro_group_id,
					"back_color":back_color,
					"micro_main":micro_main,
					"micro_url":micro_url,
					"edit_content":edit_content,
					"preview_content":preview_content};
			
			var jsonStr = JSON.stringify(addJsonStr);
			
			//获得公告的内容（如果有的话）
			var noticeArray = $("input[name='content']");
			for(var i=0;i<noticeArray.length;i++){
				var value = $(noticeArray[i]).val();
					//判断公告内容不能为空
					if(value == ""){
						var index = $(noticeArray[i]).parents("div.app-sidebar").index();
						var top = $(noticeArray[i]).position().top;
				        $(modality.children()[index]).css("display","block");
				        $(modality.children()[index]).siblings().css("display","none");
						//显示错误提示信息
				        $(modality.children()[index]).find(".notice-error-message").css("display","block");
						return false;
						break;
					}
				}
			
			if(micro_name==""){
				$(".help-block").css("display","block");
				return false;
			}else{
				$.ajax({
					url : draftUrl,
					type : 'POST',
					data : {signupForm:jsonStr},
					dataType : 'TEXT',
					success : function(result){
						if("success"==result){
							layer.msg("操作成功", {
								  icon: 1,
								  time: 500 //（如果不配置，默认是3秒）
								}, function(){
										location.href = getRootPath()+ '/pages/webstore/webpage/pageinfoTab.jsp?checkTab=draft';
								});
						}
						else{
							disable_submit(true,'launch');
							disable_submit(true,'savedraft');
							disable_submit(true,'yulan');
							parent.layer.alert("操作失败");
						}
					},
					error:function(){
						disable_submit(true,'launch');
						disable_submit(true,'savedraft');
						disable_submit(true,'yulan');
						parent.layer.alert("操作失败");
					}
				});
			}
		});
		
		
		//微页面标题失去焦点事件
		$("input[name='micro_name']").blur(function(){
			var micro_name = $(this).val();
			if(micro_name == ""){
				$(".help-block").css("display","block");
			}else{
				$(".help-block").css("display","none");
			}
		})
	})
	
	
	
//初始化下拉列表
function initdata(){
	$.ajax({
        url : getRootPath()+"/webstore/pageinfo/queryPageGroupList.action",
        type : "post",
        async: false,
        "dataType":"json",
        success : function (gdata) {
        	if(gdata!=null){
        		 var glist=gdata.data;
  	             for(var i=0;i<glist.length;i++){
  	            	 var gindex=glist[i];
  	            	 var id=gindex.id;
  	            	 var group_name=gindex.group_name;
  	            	 $("#micro_group_id").append("<option value='"+id+"'>"+group_name+"</option>"); 
  	             }
        	}
        }
    })
    
}

