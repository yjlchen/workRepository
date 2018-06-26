var id=getUrlParam("id");

$(function(){
	initData();
})

layui.use(['form','element','layer','laydate', 'upload'], function(){
	var layer = layui.layer;
	var form=layui.form;
	var upload = layui.upload;
	var element = layui.element;
	$("#putWord").click(function(){
		$("#status").val("1");//提交按钮
		$("#commit").click();
	});
	
	 upload.render({
		    elem: '#uploadAudioUrl'
		    ,url : getRootPath() + '/uploadCommon/uploadInfo.action?type=voice'
	    	,ext: 'mp3|ogg|wav'
	    	,accept: 'audio' //音频
		    ,before: function(obj){
		    	obj.preview(function(index, file, result){					
		    		var url = URL.createObjectURL(file)
		    		renderAudioUrl(url);
		    		var a=document.getElementById("dietition");
		    		var timesRun = 0;
		    		var timer = setInterval(function (){// 定时器获取时长，，，，定时器只一次
			    		timesRun += 1;
			    		if(timesRun === 1){
			    		clearInterval(timer);// 关闭定时器
			    		}
			    		var audiolength=parseInt(a.duration);
			    		$("#time_length").val(audiolength);
			    		console.log("length"+audiolength);
		    		},1000);

				})
				uploading();
			}
		    ,done: function(res){
		    	$("#audio_url").val(res.filePath);
				console.log("file2"+res.filePath);
		    }
		  });
	form.verify({  
		name: function(value){  
			value=toTrim(value);
			if(value.length==0){
				return '不能为空';
			} 
        }
	});
	
	form.on('submit(formDemo)', function(data){
		var audio = $("#audio_url").val();
		if(audio.length==0){
			parent.layer.alert("请上传音频");
			return false ;
		} 
		disable_submit(true,'commit');
		var formInfo = $('#updateForm').serializeObject();
		//formInfo.content = formInfo.editorValue;
		//formInfo.editorValue = "";
		var addJsonStr=JSON.stringify(formInfo);
		layer.load(1, {shade: [0.3, '#393D49'], time: 3000});
		  //修改信息
			$.ajax({
				url : getRootPath()+ '/dietitian/updateWord.action',
				type : 'POST',
				dataType : 'TEXT',
				data : {jsonStr:addJsonStr,id:id},
				success : function(result){
					
					if("success"==result){
						layer.msg('修改成功', {
							  icon: 1,
							  time: 500 //（如果不配置，默认是3秒）
							}, function(){
								window.location.href=getRootPath()+"/pages/bon/dietitionWord/dietitionWordList.jsp";
							});
					} else {
						layer.msg("修改失败，请重试",{
							icon:1,
							time:2000
						})
						disable_submit(false,'commit');
					}
				},
				error:function(){
					parent.layer.alert("添加失败，请关闭浏览器重试或联系管理员！");
					disable_submit(false,'commit');
				}
			});
		return false; 
		
		
	});
});

// 初始化数据
function initData() {
	if(id != null && id != "") {
		initForm();   // 初始化表单数据
	}
	
}
//初始化表单数据
function initForm(){
	layui.use('form',function(){
		var form = layui.form;
		$.ajax({
			url:getRootPath() + '/dietitian/queryWordById.action',
			type:'post',
			dataType:'json',
			async:false,
			data:{
				"id":id
			},
			success:function(result){
				if(result != null && result != "") {
					if(result.status==0){//是草稿的再次编辑，那么显示保存按钮
						$("#commit").attr("class","layui-btn");
					}
					$('#updateForm').setForm(result);
					
					// 渲染视频
					if(result.audio_url != null && result.audio_url != '') {
						renderAudioUrl(result.audio_url);
					}
					form.render();
				}
				
			}
		});
	});
}



//渲染音频
function renderAudioUrl(audioFilePath) {
	$("#uploadAudioUrl").hide();
	$("#audioUrl").show();
	var str = "<div style='height:250px;'id='splice'>"
		+ "<div>"
		+ "<audio id='dietition' controls='controls'><source src='"+ audioFilePath + "'></audio>"
		+ "<a href='#' onclick='deleteAudioUrl()'> 删除</a>"
		+ "</div>"
		+ "<div>";
	$("#audioUrl").html(str);
	$("#audio_url").val(audioFilePath);
}

//删除音频
function deleteAudioUrl() {
	$("#audioUrl div").remove(); 
	$("#audioUrl").hide();
	$("#uploadAudioUrl").show();
	$("#audio_url").val("");
}

//上传进度显示	
function uploading(){
	parent.document.getElementById("upload_speed").innerHTML='上传准备中...';
	parent.document.getElementById("upload_mask").style.display="block";
   var timer = setInterval(function(){
	      $.ajax({
	  		url : getRootPath()+ '/uploadCommon/queryUploadInfo.action',
	  		type : 'POST',
	  		dataType : 'json',
	  		success : function(result){
	  			 if(result){
	  				  var speed=result.speed;               //本次获得的上传进度
	  				  var filePath=result.filePath;         //上传的文件路径
	  				  if(speed=="100" || speed=="-1"){      //100：上传完毕100%;-1://上传失败,需要重新上传    这里自己进行处理 获取文件路径
	  					 clearInterval(timer);
	  				    // console.info(filePath);
	  				    /* $("#audio_url").val(filePath);*/
	  				     renderAudioUrl(filePath);
	  					 parent.document.getElementById("upload_speed").innerHTML=(speed=="-1")?'上传失败！请重新上传':'已上传'+parseInt(speed)+'%';
	  					 setTimeout('parent.document.getElementById("upload_mask").style.display="none"',500);
	  				  }else if(speed!="0"){
		  				 parent.document.getElementById("upload_speed").innerHTML='已上传'+parseInt(speed)+'%';
		  			 }
	  			 }
	  		}
	  	});
   }, 10);
}
