/**
 * 电脑端预览js
 */

$(function(){
		var id = getUrlParam("id");
			$.ajax({
			    url : getRootPath()+"/webstore/pageinfo/queryPageinfoById.action",
			    type : "post",
			    data:{"id":id},
			    async: false,//同步
			    dataType:"json",
			    success : function (gdata) {
			    	//定义<div id="module">对象
			    	var total = $(gdata.preview_content);
			    	$("#yulanMain").html(gdata.preview_content);
			    	//删除id=module的第一个子div
			    	$("#yulanMain").find("#module").children().eq(0).remove();
			    	//删除带有20个按钮的div
			    	$("#yulanMain").find(".js-add-region").remove();
			    	//删除每一个div的编辑、加内容、删除
			    	$("#yulanMain").find("#module .actions").remove();
			    	//去掉超链接的下划线
			    	$("a").css("text-decoration","none");
			    	//去掉商品搜索文本框的disabled
			    	$("#yulanMain").find("#module .custom-search-input").removeAttr("disabled"); 
			    	
			    	//给商品搜索按钮绑定事件
			    	$("#yulanMain").find("#module .custom-search-button").click(function(){
			    		var goodName = $(this).prev().val();
			    		var bgcolor = $(this).parent().parent().css("background-color");
		    			var url = ''+getRootPath()+'/pages/webstore/webpage/goodsSearch_pc.jsp?bgcolor='+bgcolor+'&goodName='+goodName+'';
		    			location.href = url;
			    	})
			    	
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
		    	    			$("#"+id).find("div.info .goods-price").html(price);
		    	    			var href = getRootPath()+"/pages/webstore/webpage/preview/goodDetail_pc.jsp?goodId="+goodId;
		    	    			//商品详情超链接改为跳到pc端
		    	    			$("#"+id).find("a").attr("href",href);
		    	            },
		    	            'error':function(){
		    	            	
		    	            }
		    		    });
			    	});
			    	
			    }
			});
			
			//PC端
			if(IsPC()){
				$(".headerbar-wrap").css("display","block");
			}else{
				$(".headerbar-wrap").css("display","none");
			}
		
	})
	
	//判断客户端是手机还是PC
	function IsPC() {
	    var userAgentInfo = navigator.userAgent;
	    var Agents = ["Android", "iPhone",
	                "SymbianOS", "Windows Phone",
	                "iPad", "iPod"];
	    var flag = true;
	    for (var v = 0; v < Agents.length; v++) {
	        if (userAgentInfo.indexOf(Agents[v]) > 0) {
	            flag = false;
	            break;
	        }
	    }
	    return flag;
	}

	

