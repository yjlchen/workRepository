
layui.use(['form','layer','upload'], function(){
		var form = layui.form();
		var upload = layui.upload;
		var storeInfoJson;
		//查询出店铺基本信息map
		$.ajax({
			"type":"post",
		    "url": getRootPath()+"/webstore/storeInfo/queryStoreInfoMap.action",
		    async: false,//同步
		    "dataType":"json",
		    'success' : function (data) {
		    	storeInfoJson = data;
		    	//console.log(storeInfoJson);
		    	if(storeInfoJson.shop_logo_url != "" && storeInfoJson.shop_logo_url != undefined){
		    		//alert("已上传logo");
		    		//隐藏上传图片按钮
		    		$("#logo").css("display","none");
					//显示图片
					$("#logoimg").show();
					//给图片设置地址
					$("#logoimg").find("img").attr("src",storeInfoJson.shop_logo_url);
		    	}else{
		    		//alert("没上传logo");
		    		//显示上传图片按钮
		    		$("#logo").css("display","inline-block");
		    		//隐藏图片
		    		$("#logoimg").hide();
		    	}
		    	if(storeInfoJson.shop_code_url != "" && storeInfoJson.shop_code_url != undefined){
		    		//alert("已上传logo");
		    		//隐藏上传图片按钮
		    		$("#codeImg").css("display","none");
					//显示图片
					$("#cancelCodeImg").show();
					//给图片设置地址
					$("#cancelCodeImg").find("img").attr("src",storeInfoJson.shop_code_url);
		    	}else{
		    		//alert("没上传logo");
		    		//显示上传图片按钮
		    		$("#codeImg").css("display","inline-block");
		    		//隐藏图片
		    		$("#cancelCodeImg").hide();
		    	}
		    	
		    },
		    'error':function(){
		    }
		});
		
		//判断是走新增，还是修改
		if(storeInfoJson.id != "" && storeInfoJson.id != undefined){
			url = getRootPath()+ '/webstore/storeInfo/updateStoreInfo.action'; 
		}else{
			url = getRootPath()+ '/webstore/storeInfo/addStoreInfo.action'; 
		}
		
		//加载页面时读取数据
		if(storeInfoJson!=null){
	   		 //form表单自动绑定js
	   		 $("#storeInfo").setForm(storeInfoJson);
	   		 //渲染
	   		 form.render();
		}
		
		
		//保存
		form.on('submit(save)', function(data){
			var addJsonStr = JSON.stringify(data.field);
			if($("#shop_logo_url").val()==""){
				parent.layer.alert("请上传店铺logo");
			}
			if($("#shop_code_url").val()==""){
				parent.layer.alert("请上传店铺二维码");
			}
			else{
				$.ajax({
					url : url,
					type : 'POST',
					data : {signupForm:addJsonStr},
					dataType : 'TEXT',
					success : function(result){
						if("success"==result){
							parent.layer.alert("保存成功");
							$(".headImg",parent.document).prop("src",$("#shop_logo_url").val());
						}
						else{
							parent.layer.alert("操作失败");
						}
					},
					error:function(){
						parent.layer.alert("操作失败");
					}
				});
			}
			return false; 
		});
		
		var item = this.item;
		
		//上传图片
		layui.upload({
			elem:'#logoDemo'
			,url : getRootPath() + '/webstore/storeInfo/uploadShopLogo.action'
			,ext: 'jpg|png|gif'
			,before : function(input) {
				//返回的参数item，即为当前的input DOM对象
				console.log('文件上传中');
			},
			success : function(res) {
				parent.layer.alert("上传完毕");
				//隐藏上传图片按钮
				$("#logo").css("display","none");
				//显示图片
				$("#logoimg").show();
				//给图片设置地址
				$("#logoimg").find("img").attr("src",res.result);
				//给隐藏域赋值
				$("#shop_logo_url").val(res.result);
			}
		});
		layui.upload({
			elem:'#codeDemo'
			,url : getRootPath() + '/webstore/storeInfo/uploadShopCode.action'
			,ext: 'jpg|png|gif'
			,before : function(input) {
				//返回的参数item，即为当前的input DOM对象
				console.log('文件上传中');
			},
			success : function(res) {
				parent.layer.alert("上传完毕");
				//隐藏上传图片按钮
				$("#codeImg").css("display","none");
				//显示图片
				$("#cancelCodeImg").show();
				//给图片设置地址
				$("#cancelCodeImg").find("img").attr("src",res.result);
				//给隐藏域赋值
				$("#shop_code_url").val(res.result);
			}
		});
		
		
		
		
		
	})
	
	//删除图片事件
	function deleteImag(data){
		if(data == "logo"){
			//显示上传图片按钮
			$("#logo").css("display","inline-block");
			//隐藏图片
			$("#logoimg").hide();
			//清空隐藏域的值
			$("#shop_logo_url").val("");
		}else{
			//显示上传图片按钮
			$("#codeImg").css("display","inline-block");
			//隐藏图片
			$("#cancelCodeImg").hide();
			//清空隐藏域的值
			$("#shop_code_url").val("");
		}
		
}
	