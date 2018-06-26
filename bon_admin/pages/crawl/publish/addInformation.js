var id=getUrlParam("id");
var img_url = [];  // 首页图片列表
var labels = [];  // 标签列表

var seclectCommDiv = null;
var chosenCommId = null;  // 商品id
var chosenCommPic = null;  // 商品pic

$(function(){
	initData();
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
// end 20180514 去掉商品规格

layui.use(['form','element','layer','laydate', 'upload', 'table'], function(){
	var layer = layui.layer;
	var form=layui.form;

	// 执行图片
	layui.upload.render({
		elem : '#uploadImgUrl',
		url : getRootPath() + '/uploadCommon/uploadInfo.action?group_ids='+""+'&type=pic',
		ext: 'jpg|png|gif',
		multiple: true,
		acceptMime: 'image/*',
		before: function() {
			uploading();
		},
		done: function(res) {
			img_url.push(res);
			renderImgUrl();
		},
		error: function() {
			console.log("error");
		}
	});
	
	// 执行音频
	layui.upload.render({
		elem: '#uploadAudioUrl',
		url: getRootPath() + '/uploadCommon/uploadInfo.action?type=voice',
		ext: 'mp3|ogg|wav',
		accept: "audio",
		before: function() {
			uploading();
		},
		done: function(res) {
			renderAudioUrl(res.filePath);
		},
		error: function() {
			console.log("error");
		}
	});
	
	form.verify({
		checkNumber: function(value){  
			value=toTrim(value);
			var p = /^([1-9]\d*|0)$/;
			if(value.length>0 && !p.test(value)){
				return '请输入正整数';
			} 
	    },
	    lengthIn100: function(value) {
	    	value=toTrim(value);
	    	if(value.length>=100) {
	    		return '字符长度不能超过100';
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
		window.location.href=getRootPath()+"/pages/bon/information/informationManageTab.jsp?status="+status;
	})
});

// 提交表单
function submit(publish) {

	clickDisable();
	var formInfo = $('#addOrUpdateForm').serializeObject();
	formInfo.content = formInfo.editorValue;
	formInfo.editorValue = "";
	// 图片检查

	if(img_url.length == 0) {
		alertErrorMsg("请上传首页图片");
		clickAble();
		return false;
	}

	if(img_url.length > 3) {
		alertErrorMsg("图片过多（不能大于3张）");
		clickAble();
		return false;
	}
	// 音频检查（音频不是必填项）
	/*if(formInfo.audio_url == null || formInfo.audio_url == '') {
		alertErrorMsg("请上传音频文件");
		return false;
	}*/
	
	// 标签检查
	if(formInfo.label_id == null || formInfo.label_id.length <= 0) {
		alertErrorMsg("请选择标签");
		clickAble();
		return false;
	}
	// 单标签处理
	if(typeof formInfo.label_id == "string") {
		formInfo.label_id = [formInfo.label_id];
	}
	

//	formInfo.commList = speList;
	var commList = [];
	var selectSpeList = $('.spe');
	for(var i = 0; i < selectSpeList.length; i++) {
		if($(selectSpeList[i]).children().length > 0){
			var commId = $(selectSpeList[i]).children('input').val();
			if(commList.indexOf(commId) >= 0) {
				alertErrorMsg("不能选择相同的商品");
				clickAble();
				return false;
			}
			commList.push(commId);
		}
	}
	formInfo.commList = commList;
// end 20180514 去掉商品规格
	
	formInfo.status = publish?1:0;
	
	var addJsonStr=JSON.stringify(formInfo);
	var url = '/information/updateById.action';
	if(id==null || ""==id) {
		url = '/information/save.action';
	}
	$.ajax({
		url : getRootPath()+ url,
		type : 'POST',
		dataType : 'TEXT',
		data : {jsonStr:addJsonStr,id:id},
		success : function(result){
			if("success"==result){
				layer.msg('提交成功', {
					  icon: 1,
					  time: 500 //（如果不配置，默认是3秒）
					}, function(){
						window.location.href=getRootPath()+"/pages/bon/information/informationManageTab.jsp?status="+status;
					});
			} else {
				alertErrorMsg("提交失败，请重试");
				clickAble();
			}
		},
		error:function(){
			parent.layer.alert("添加失败，请关闭浏览器重试或联系管理员！");
			clickAble();
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
   }, 100);
}

// 初始化数据
function initData() {
	initLabel();  // 初始化标签列表
	if(id != null && id != "") {
		initForm();   // 初始化表单数据
	} else {
		renderLabel(labels, null);
	}
}

//初始化表单数据
function initForm(){
	layui.use('form',function(){
		var form = layui.form;
		$.ajax({
			url:getRootPath() + '/information/queryById.action',
			type:'post',
			dataType:'json',
			async:false,
			data:{
				"id":id
			},
			success:function(result){
				if(result != null && result != "") {
					$('#addOrUpdateForm').setForm(result);
					// 渲染图片
					if(result.img_url != null && result.img_url != '') {
						$.each(result.img_url.split(","), function(i, n) {
							if(n != null && n != '') {
								img_url.push({
									id: n.substring(n.lastIndexOf("\/") + 1, n.length).split(".")[0],
									filePath: n
								})
							}
						})
						renderImgUrl();
					}
					// 渲染视频
					if(result.audio_url != null && result.audio_url != '') {
						renderAudioUrl(result.audio_url);
					}
					// 标签
					if(result.labelIds != null && result.labelIds != '') {
						renderLabel(labels, result.labelIds.split(","));
					} else {
						renderLabel(labels, null);
					}
					// 商品
					if(result.commList != null && result.commList != '') {
						var commList = result.commList;
						var spe = $('.comms');
						for(var i = 0; i < commList.length; i++) {
							if(commList[i] != null && commList[i] != '') {
								// 20180514 去掉商品规格
//								var html = geneCommHtml(commList[i].commodity_id, commList[i].speList, commList[i].specifications_value_id);
								var html = geneCommHtml(commList[i].commodity_id);
								// end 20180514 去掉商品规格
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
//								$(spe[i]).children("div.select").children("div.select_box").parent().siblings().css({'display':'block'})//产品规格显示
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

// 初始化下拉标签列表
function initLabel() {
	$.ajax({
		url : getRootPath()+ '/banner/queryLabels.action',
		type : 'POST',
		dataType : 'json',
		async: false,
		success: function(result){
			 if(result){
				 labels = result.data;
			 }
		}
	});
}

// 渲染标签列表
function renderLabel(labels, chosen_lebel_ids) {
	var html = "";
	if(chosen_lebel_ids != null && chosen_lebel_ids.length > 0) {
		for(var i = 0; i < labels.length; i ++) {
			if(isInList(labels[i].id, chosen_lebel_ids)) {
				html += "<option value='"+labels[i].id+"' selected='selected'>"+labels[i].name+"</option>"; 
			} else {
				html += "<option value='"+labels[i].id+"'>"+labels[i].name+"</option>"; 
        	}
		}
	} else {
		for(var i=0; i<labels.length; i++){
			html += "<option value='"+labels[i].id+"'>"+labels[i].name+"</option>"; 
		 };
	}
	$("#label_id").append(html);
	$("#label_id").chosen();
}


//渲染图片
function renderImgUrl() {
	$("#img_urls li").remove(); 
	var imUrlStyle = "";
	var imgUrls = "";
	for(var i = 0; i < img_url.length; ++i) {
		imUrlStyle += '<li style="float:left"><a class="goods-thumb" style="background-image: url(\''+img_url[i].filePath+'\');"></a>';
		imUrlStyle += '<a class="close-modal js-delete-goods small" style="cursor: pointer;" title="删除"  onclick="deleteImgUrl(\''+img_url[i].id+'\')">x</a></li>';
		if(imgUrls == null || imgUrls == '') {
			imgUrls += img_url[i].filePath;
		} else {
			imgUrls += "," + img_url[i].filePath;
		}
	}
	if(img_url.length >= 1) {
		$("#uploadImgUrl").hide();
	} else {
		$("#uploadImgUrl").show();
	}
	$("#img_urls").html(imUrlStyle);
	$("#img_url").val(imgUrls);
}

//删除图片
function deleteImgUrl(id){
	var img_url_tmp = [];
	for(var i = 0; i < img_url.length; ++i) {
		if(img_url[i].id != id) {
			img_url_tmp.push(img_url[i]);
		}
	}
	img_url = img_url_tmp;
	renderImgUrl();
}

//渲染音频
function renderAudioUrl(audioFilePath) {
	$("#uploadAudioUrl").hide();
	$("#audioUrl").show();
	var str = "<div style='height:250px;'id='splice'>"
		+ "<div>"
		+ "<audio controls='controls'><source src='"+ audioFilePath + "'></audio>"
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


function clickDisable(){
	disable_submit(true, 'submitToDraft');
	disable_submit(true, 'submitPublish');
}
function clickAble(){
	disable_submit(false, 'submitToDraft');
	disable_submit(false, 'submitPublish');
}
