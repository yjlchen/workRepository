var id=getUrlParam("id");
var audio_id=getUrlParam("audio_id");
var ispay=getUrlParam("ispay");
var labels = [];  // 标签列表
var seclectCommDiv = null;
var chosenCommId = null;  // 商品id
var chosenCommPic = null;  // 商品pic
var audiolength;
$(function(){
	initData();
	if(ispay==0){
		$("#ispay").hide();
	}
	//选择商品
	$('div.select>div.select_box').click(function(){
		seclectCommDiv = $(this).parent().parent();
		  //弹出商品选择框
		  parent.layer.open({
    		  title: ''
    		  ,type:2
    		  ,closeBtn: 1
    		  ,area:["700px","490px"]
    		  ,content:getRootPath()+'/commons/jsp/com_goods.jsp?mutl_type=1&marketing=informationFlow'//图片单选，参数设置为信息流
    		});
	})

	$('div.spe').on('click','div.standard>ul>li',function(){
		$(this).addClass('selected')
		$(this).siblings().removeClass("selected")//处理规格选择只能一个
	})
	//删除商品
	$('div.select>div.p_img>img.delete').click(function(){
		$(this).parent().hide();//本身圖片隱藏
		$(this).parent().siblings().css({'display':'block'});//上傳圖片顯示
		$(this).parent().parent().parent().children("div.spe").empty();
		$(this).parent().parent().parent().children("div.spe").removeData("comm_id");
		var newstandardList=$(this).parent().parent().children("div.spe").siblings('div.standard').children('ul').children('li');
		for(var i=0;i<newstandardList.length;i++){	
			if($(newstandardList[i]).hasClass('selected')==true){
				$(newstandardList[i]).removeClass("selected");
			}
		}
	})
	
})


// 20180519 去掉商品规格
//function renderCommSpe() {
//	layer.closeAll();
//	// 获取商品规格
//	$.ajax({
//		url: getRootPath()+ '/commodity/queryCommoditySpeAndValList.action',
//		type: 'POST',
//		dataType: 'json',
//		async: false,
//		data: {
//			id: chosenCommId
//		},
//		success : function(result){
//			var html = geneCommHtml(chosenCommId, result.speList, null);
//			seclectCommDiv.children("div.spe").html(html);
//		},
//		error:function(){
//			parent.layer.alert("获取商品规格失败");
//			disable_submit(false,'commit');
//		}
//	});
//	seclectCommDiv.children("div.select").children("div.select_box").hide();
//	seclectCommDiv.children("div.select").children("div.p_img").children("img.commPic").attr('src', chosenCommPic); // 背景图
//	seclectCommDiv.children("div.select").children("div.select_box").siblings().css({'display':'block'});//图片显示
//	seclectCommDiv.children("div.select").children("div.select_box").parent().siblings().css({'display':'block'})//产品规格显示
//}
//
//
//function geneCommHtml(chosenCommId, speList, chosenSpes) {
//	var html = "<input style='width:0px;height:0px;border:none;' value="+chosenCommId+" />";
//	var chosenSpeList = [];
//	if(chosenSpes != null && chosenSpes != '') {
//		chosenSpeList = chosenSpes.split(",");
//	}
//	if(speList != null && speList != '') {
//		// 规格1
//		if(speList.specifications_id1 != null && speList.specifications_id1 != '') {
//			html += '<div class="standard">'
//				+ '<text  style="color:#DD4B3F">*</text><span>'+speList.name1+'：</span>'
//				+ '<ul>';
//			for(var i = 0; i < speList.specifications_val1.length; i++) {
//				html += '<li data-id='+speList.specifications_val1[i].id
//						+ ' data-commid='+chosenCommId 
//						+ (isInList(speList.specifications_val1[i].id, chosenSpeList)?' class="selected"':" ") +'>'
//						+speList.specifications_val1[i].name+'</li>';
//			}
//			html += '</ul></div>';
//		}
//		// 规格2
//		if(speList.specifications_id2 != null && speList.specifications_id2 != '') {
//			html += '<div class="standard">'
//				+ '<text  style="color:#DD4B3F">*</text><span>'+speList.name2+'：</span>'
//				+ '<ul>';
//			for(var i = 0; i < speList.specifications_val2.length; i++) {
//				html += '<li data-id='+speList.specifications_val2[i].id
//						+ ' data-commid='+chosenCommId 
//						+ (isInList(speList.specifications_val2[i].id, chosenSpeList)?' class="selected"':" ") +'>'
//						+speList.specifications_val2[i].name+'</li>';
//			}
//			html += '</ul></div>';
//		}
//		// 规格3
//		if(speList.specifications_id3 != null && speList.specifications_id3 != '') {
//			html += '<div class="standard">'
//				+ '<text  style="color:#DD4B3F">*</text><span>'+speList.name3+'：</span>'
//				+ '<ul>';
//			for(var i = 0; i < speList.specifications_val3.length; i++) {
//				html += '<li data-id='+speList.specifications_val3[i].id
//						+ ' data-commid='+chosenCommId 
//						+ (isInList(speList.specifications_val3[i].id, chosenSpeList)?' class="selected"':" ") +'>'
//						+speList.specifications_val3[i].name+'</li>';
//			}
//			html += '</ul></div>';
//		}
//	}
//	return html;
//}
//选择商品点击确定
function renderCommSpe(idArr,phoArr) {
	var html = geneCommHtml(idArr[0]);
	seclectCommDiv.children("div.spe").html(html);
	seclectCommDiv.children("div.select").children("div.select_box").hide();
	seclectCommDiv.children("div.select").children("div.p_img").children("img.commPic").attr('src', phoArr[0]); // 背景图
	seclectCommDiv.children("div.select").children("div.select_box").siblings().css({'display':'block'});//图片显示
}

function geneCommHtml(chosenCommId) {
	var html = "<input style='width:0px;height:0px;border:none;' value="+chosenCommId+" />";
	return html;
}
//end 20180519 去掉商品规格

layui.use(['form','element','layer','laydate', 'upload', 'table'], function(){
	var layer = layui.layer;
	var form=layui.form;
	// 执行音频
	layui.upload.render({
		elem: '#uploadAudioUrl',
		url: getRootPath() + '/uploadCommon/uploadInfo.action?type=voice',
		ext: 'mp3|ogg|wav',
		accept: "audio",
		before: function(obj) {
			obj.preview(function(index, file, result){					
	    		var url = URL.createObjectURL(file)
	    		renderAudioUrl(url);
	    		var a=document.getElementById("audio");
	    		var timesRun = 0;
	    		var timer = setInterval(function (){// 定时器获取时长，，，，定时器只一次
		    		timesRun += 1;
		    		if(timesRun === 1){
		    		clearInterval(timer);// 关闭定时器
		    		}
		    		audiolength=parseInt(a.duration);
		    		console.log("length"+audiolength);
	    		},1000);

			})
			uploading();
			disable_submit(true,'commit');
		},
		done: function(res) {
			$("#audio_url").val(res.filePath);
			console.log(res.filePath)
			disable_submit(false,'commit');
		},
		error: function() {
			console.log("error");
			disable_submit(false,'commit');
		}
	});
	
	form.verify({
		checkNumber: function(value){  
			value=toTrim(value);
			var p = /^([1-9]\d*|0)$/;
			if(value.length>0 && !p.test(value)){
				return '请输入正整数';
			} 
	    }
	})

	form.on('submit(submitToDraft)', function(data){
		submit(false);
		return false;
	});
	form.on('submit(submitPublish)', function(data){
		submit(true);
		return false;
	});
	$("#returnToList").click(function() {
		window.location.href=getRootPath()+"/pages/bon/audio/eachAudio/eachAudioManageTab.jsp?status="+status+"&audio_id="+audio_id+"&ispay="+ispay;
	})
});

// 提交表单
function submit(publish) {
	var formInfo = $('#addOrUpdateForm').serializeObject();
	// 音频检查
	if(formInfo.audio_url == null || formInfo.audio_url == '') {
		alertErrorMsg("请上传音频文件");
		return false;
	}
	console.log(audio_id)
	formInfo.audio_id=audio_id
	formInfo.time_length=audiolength
	
//	20180519 去掉商品规格
//	// 商品 规格检查
//	var standardList=$('div.standard>ul');
//	for(var i=0;i<standardList.length;i++){
//		if($(standardList[i]).children('li.selected').length==0){
//			alertErrorMsg("商品规格有没有选择的");
//			return false;
//		}
//	}
//	// 商品
//	var speList = {};
//	var selectSpeList = $('.spe');
//	var comTem = null;  // 用来检验两个商品是否一样
//	for(var i = 0; i < selectSpeList.length; i++) {
//		if($(selectSpeList[i]).children().length > 0){
//			var commId = $(selectSpeList[i]).children('input').val();
//			if(comTem != null && commId == comTem) {
//				alertErrorMsg("不能选择相同的商品");
//				return false;
//			}
//			if(comTem == null) comTem = commId;
//			speList[commId] = [];
//			var standardList = $(selectSpeList[i]).children('div.standard').children('ul').children('li');
//			for(var s= 0; s < standardList.length; s++) {
//				if($(standardList[s]).hasClass('selected')==true) {
//					speList[$(standardList[s]).data("commid")].push($(standardList[s]).data("id"));
//				}
//			}
//		}
//	}
//	formInfo.commList = speList;
	var commList = [];
	var selectSpeList = $('.spe');
	for(var i = 0; i < selectSpeList.length; i++) {
		if($(selectSpeList[i]).children().length > 0){
			var commId = $(selectSpeList[i]).children('input').val();
			if(commList.indexOf(commId) >= 0) {
				alertErrorMsg("不能选择相同的商品");
				return false;
			}
			commList.push(commId);
		}
	}
	formInfo.commList = commList;
// end 20180519 去掉商品规格
	
	if(publish) {
		// 发布
		formInfo.status = 1;
	} else {
		formInfo.status = 0;
	}
	
	var url = '/eachAudio/updateById.action';
	if(id==null || ""==id) {
		url = '/eachAudio/save.action';
	}else{
		formInfo.id=id;
	}
	var addJsonStr=JSON.stringify(formInfo);
	$.ajax({
		url : getRootPath()+ url,
		type : 'POST',
		dataType : 'TEXT',
		data : {jsonStr:addJsonStr},
		success : function(result){
			if("success"==result){
				layer.msg('提交成功', {
					  icon: 1,
					  time: 500 //（如果不配置，默认是3秒）
					}, function(){
						window.location.href=getRootPath()+"/pages/bon/audio/eachAudio/eachAudioManageTab.jsp?status="+status+"&audio_id="+audio_id+"&ispay="+ispay;
					});
			} else if ("exist"==result){
				alertErrorMsg("该音乐分集的集数已经存在，请重新选择！");
			}else {
				alertErrorMsg("提交失败，请重试");
				disable_submit(false,'commit');
			}
		},
		error:function(){
			parent.layer.alert("添加失败，请关闭浏览器重试或联系管理员！");
			disable_submit(false,'commit');
		}
	});
	return false; 
}

function alertErrorMsg(msg) {
	layer.msg(msg,{
		icon:2,
		time:2000
	})
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
//	  				     console.info(filePath)
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
			url:getRootPath() + '/eachAudio/queryById.action',
			type:'post',
			dataType:'json',
			async:false,
			data:{
				"id":id
			},
			success:function(result){
				if(result != null && result != "") {
					$('#addOrUpdateForm').setForm(result);
					// 渲染视频
					if(result.audio_url != null && result.audio_url != '') {
						renderAudioUrl(result.audio_url);
					}
					// 商品
					if(result.commList != null && result.commList != '') {
						var commList = result.commList;
						var spe = $('.comms');
						for(var i = 0; i < commList.length; i++) {
							if(commList[i] != null && commList[i] != '') {
								// 20180519 去掉商品规格
								//var html = geneCommHtml(commList[i].commodity_id, commList[i].speList, commList[i].specifications_value_id);
								var html = geneCommHtml(commList[i].commodity_id);
								// end 20180519 去掉商品规格
								$(spe[i]).children("div.spe").html(html);
								var url = "";
								if(commList[i].img_path_str.indexOf(",")<0){
									 url = commList[i].img_path_str;
								 }else{
									//图片url,取第一个，之前的值
									 url = commList[i].img_path_str.substr(0,commList[i].img_path_str.indexOf(","));
								 }
								$(spe[i]).children("div.select").children("div.select_box").hide();
								$(spe[i]).children("div.select").children("div.p_img").children("img.commPic").attr('src', url); // 背景图
								$(spe[i]).children("div.select").children("div.select_box").siblings().css({'display':'block'});//图片显示
								//$(spe[i]).children("div.select").children("div.select_box").parent().siblings().css({'display':'block'})//产品规格显示
							}
						}
						
					}
					// 填充内容
					if(result.content != null && result.content != '') {
						ue.ready(function() {//编辑器初始化完成再赋值
							ue.setContent(result.content);  //赋值给UEditor
						});
					}
					form.render();
				}
			}
		});
	});
}

function isInList(d, list) {
	for(var i = 0; i < list.length; i++) {
		if(list[i] == d) {
			return true;
		}
	}
	return false;
}


//渲染音频
function renderAudioUrl(audioFilePath) {
	$("#uploadAudioUrl").hide();
	$("#audioUrl").show();
	var str = "<div style='height:250px;'id='splice'>"
		+ "<div>"
		+ "<audio id='audio' controls='controls'><source src='"+ audioFilePath + "'></audio>"
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



