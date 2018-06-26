var id=getUrlParam("id");
var flag=getUrlParam("flag");
var img_url = [];  // 首页图片列表
var labels = [];  // 标签列表
var video_url="";
var seclectCommDiv = null;
var chosenCommId = null;  // 商品id
var chosenCommPic = null;  // 商品pic

$(function(){
	initData();
	
	//点击返回
	$("#goBack").click(function(){
		window.location.href=getRootPath()+"/pages/bon/video/checkVideoManage.jsp?flag="+flag;
	})
	
})

function geneCommHtml(chosenCommId) {
	var html = "<input style='width:0px;height:0px;border:none;' value="+chosenCommId+" />";
	return html;
}

function alertErrorMsg(msg) {
	layer.msg(msg,{
		icon:2,
		time:2000
	})
}
layui.use(['form','element','layer','laydate', 'upload', 'table'], function(){
	var layer = layui.layer;
	var form=layui.form;
   
	//驳回按钮事件
	form.on('radio(reject)', function(data){
		
		if(data.value==2){//通过
			$("#refuseReason").hide();
			$('#textarea').val('');
		}else{//3驳回
			$("#refuseReason").show();
		}
		
	});

	layui.upload.render({
	    elem: '#uploadImgUrl'
	    ,url : getRootPath() + '/uploadCommon/uploadInfo.action?type=pic'
	    ,accept: 'image/*' //图片
	    ,before: function(obj){
	    	uploading();
		}
	    ,done: function(res){
			img_url.push(res);
			renderImgUrl();
	    }
	  });

	layui.upload.render({
		    elem: '#uploadAudioUrl'
		    ,url : getRootPath() + '/uploadCommon/uploadInfo.action?type=video'
		    ,accept: 'video' //视频
		    ,before: function(obj){
		    	obj.preview(function(index, file, result){
		    		
		    		var url = URL.createObjectURL(file)
		    		renderAudioUrl(url);
		    		var a=document.getElementById("video");

		    		var timesRun = 0;
		    		var timer = setInterval(function (){// 定时器获取时长，，，，定时器只一次
		    		timesRun += 1;
		    		if(timesRun === 1){
		    		clearInterval(timer);// 关闭定时器
		    		}
		    		var length=parseInt(a.duration);
		    		 checkLength(length);

		    		},1000);
	
				})
				
			},done: function(res){
				$("#video_url").val(res.filePath);
			}
		 });
	
	form.verify({  
        "video_url":function(value){
        	value=toTrim(value);
    		if(value.length==0||value==''){
				return '请上传视频';
			} 
        },
        "now_bon_point":function(value){
        	value=toTrim(value);
        },
        "original_bon_point":function(value){
        	value=toTrim(value);
        }
	});
	
	form.on('submit(formDemo)', function(data){
		
	        var radio=$(".reject:checked").val();
	        var textarea="";
	        if("2"==radio){//通过
	        	
	        }else{//
	        	 textarea=$("#textarea").val();
	        	if(textarea==null||textarea==""||textarea.length<0){
	        		parent.layer.alert("请输入驳回原因");
	        		return false;
	        	}
	        }
			disable_submit(true,'commit');
			$.ajax({
				url : getRootPath()+ '/video/checkVideo.action',
				type : 'POST',
				dataType : 'text',
				data : {
					"id":id,
					"status":radio,
					"reject_reason":textarea
				},
				success : function(result){
					if("success"==result){
						layer.msg('成功', {
							  icon: 1,
							  time: 500 //（如果不配置，默认是3秒）
							}, function(){
								window.location.href=getRootPath()+"/pages/bon/video/checkVideoManage.jsp";
							});
					}else{
						layer.msg("失败,请稍后再试",{
							icon:1,
							time:2000
						})
						disable_submit(false,'commit');
					}
				},
				error:function(){
					parent.layer.alert("失败，请重试或联系管理员");
					disable_submit(false,'commit');
				}
			});
	
		 
		
	});
});

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
	
		$.ajax({
			url:getRootPath() + '/video/queryById.action',
			type:'post',
			dataType:'json',
			async:false,
			data:{
				"id":id
			},
			success:function(result){
				
				layui.use('form',function(){
				
				var form = layui.form;
				
				if(result != null && result != "") {
					 var status=result.status;
					 var is_pay=result.is_pay;
					if(is_pay==0){//是否收费
						$("#payRadio").html("<span  style='margin-top: 8px'>免费</span>")
						$("#price").hide();
						$("#price2").hide();
					}else{
						$("#payRadio").html("<span  style='margin-top: 8px'>收费</span>")
						$("#price").show();
						$("#price2").show();
					}
					if(status==2){
						$('#showSpan').text('当前状态:');
						$("#condition").html("<span  style='margin-top: 8px'>已发布</span>");
						$('#commit').hide();
					}else if(status==3){
						$('#showSpan').text('当前状态：');
						$("#refuseReason").show(); //显示驳回原因
						$("#textarea").val(result.reject_reason); 
						$("#textarea").attr("disabled",'disabled') 
						$("#condition").html("<span  style='margin-top: 8px'>驳回</span>");
						$('#commit').hide();
					}
					$('#addOrUpdateForm').setForm(result);
					// 渲染图片
					if(result.video_img_url != null && result.video_img_url != '') {
						$.each(result.video_img_url.split("jpg,"), function(i, n) {
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
					if(result.video_url != null && result.video_url != '') {
						renderAudioUrl(result.video_url);
					}
					// 标签
					if(result.labelIds != null && result.labelIds != '') {
						renderLabel(labels, result.labelIds.split(","));
					}else {
						renderLabel(labels, null);
					}
					// 商品commList
					if(result.commList != null && result.commList != '') {
						var commList = result.commList;
						var spe = $('.comms');
						for(var i = 0; i < commList.length; i++) {
							if(commList[i] != null && commList[i] != '') {
								var html = geneCommHtml(commList[i].commodity_id);
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
							}
						}
					}else{
						$('.shopOne').hide();
						$('.shopTwo').hide();
					}
					
					if (result.commList.length == 1){
						$('.shopTwo').hide();
					}
					
					form.render();
				}
				
				
			});
				
				
				
			}
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
		url : getRootPath()+ "/commodity/queryCommodityLabelList.action",
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
		imUrlStyle += '<li style="float:left"><a class="goods-thumb" style="background-image: url(\''+img_url[i].filePath+'\');"></a></li>';
		/*imUrlStyle += '<a class="close-modal js-delete-goods small" style="cursor: pointer;" title="删除"  onclick="deleteImgUrl(\''+img_url[i].id+'\')">x</a></li>';*/
		imgUrls += img_url[i].filePath + ",";
	}
	$("#img_urls").html(imUrlStyle);
	$("#video_img_url").val(imgUrls);
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
	$("#uploadVidioUrl").hide();
	$("#videoUrl").show();
	var str = "<div style=''id='splice'>"
		+ "<div>"
		+ "<video id='video' controls='controls'style='width:200px;'><source src='"+ audioFilePath + "'></video>"
		/*+ "<a href='#' class='close-modal js-delete-goods small' style='cursor: pointer;' title='删除' onclick='deleteAudioUrl()'> 删除</a>"*/
		+ "</div>"
		+ "<div>";
	$("#videoUrl").html(str);
	
}
