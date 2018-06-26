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

	//删除商品
	$('div.select>div.p_img>img.delete').click(function(){
		$(this).parent().hide();//本身圖片隱藏
		$(this).parent().siblings().css({'display':'block'});//上傳圖片顯示
		$(this).parent().parent().parent().children("div.spe").empty();
		var newstandardList=$(this).parent().parent().children("div.spe").siblings('div.standard').children('ul').children('li');
		for(var i=0;i<newstandardList.length;i++){	
			if($(newstandardList[i]).hasClass('selected')==true){
				$(newstandardList[i]).removeClass("selected");
			}
		}
	})
	//点击返回
	$("#goBack").click(function(){
		backManager();
	})
	
})

function backManager(){
	window.location.href=getRootPath()+"/pages/bon/video/videoManage.jsp?flag="+flag;
}

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
 var time_length='';
 var paramLength=''
 function checkLength(length){
	 videoLength=length;
     $.ajax({
	  		url : getRootPath()+ '/param/queryParam.action',
	  		type : 'POST',
	  		dataType : 'json',
	  		data:{
	  			"key":'video_length_limit'
	  		},
	  		success : function(result){
	  			paramLength=result.val1;
	  			 if(length>result.val1){
	  				parent.layer.alert("视频太长 请重新上传");
	  				 return false;
	  				 
	  			 }else{
	  				uploading();
	  				time_length= length;
	  				$("#time_length").val(time_length);
	  			 }
	  		}
	  	});
 };
 //用于转换分钟,废弃
 function formatSeconds(length){
     var secondTime = parseInt(length);// 秒
     var minuteTime = 0;// 分
     var hourTime = 0;// 小时
     if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
         //获取分钟，除以60取整数，得到整数分钟
         minuteTime = parseInt(secondTime / 60);
         //获取秒数，秒数取佘，得到整数秒数
         secondTime = parseInt(secondTime % 60);
         //如果分钟大于60，将分钟转换成小时
         if(minuteTime > 60) {
             //获取小时，获取分钟除以60，得到整数小时
             hourTime = parseInt(minuteTime / 60);
             //获取小时后取佘的分，获取分钟除以60取佘的分
             minuteTime = parseInt(minuteTime % 60);
         }
     }
     var result = "" + parseInt(secondTime) ;

     if(minuteTime > 0) {
         result = "" + parseInt(minuteTime) + ":" + result;
     }
     if(hourTime > 0) {
         result = "" + parseInt(hourTime) + ":" + result;
     }
     return result;
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
	
	//收费按钮事件
	form.on('radio(is_pay)', function(data){
		if(data.value==0){
			$("#price").hide();
			$("#price2").hide();
			$('#now_bon_point').val(0);
			$('#original_bon_point').val(0);
		}else{
			$("#price").show();
			$("#price2").show();
		}
	});
	
	form.render();
	
	//上传图片
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
			//隐藏图片上传的按钮
			isShowUpImgBtn(1);
	    }
	});

	layui.upload.render({
		    elem: '#uploadAudioUrl'
		    ,url : getRootPath() + '/uploadCommon/uploadInfo.action?type=video'
		    ,accept: 'video' //视频
		    ,before: function(obj){
		    	obj.preview(function(index, file, result){
		    		//隐藏掉上传视频的按钮
					isShowUpVideoBtn(1);
					//处理上传
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
			},error: function(){
				alertErrorMsg("视频上传失败");
				isShowUpVideoBtn(0);
		    }
	});
	
	form.verify({
		//标题
		"video_title":function(value){
			value=toTrim(value);
			if (value.length==0){
				return '请填写视频标题';
			}else if (value.length>64){
				return '标题不能超过64个字'
			}
		},
		//简介
		"brief_introduce":function(value){
			value=toTrim(value);
			if (value.length==0){
				return '请填写视频简介';
			}else if (value.length>250){
				return '简介不能超过250个字'
			}
		},'unreal_play_amount': function(value){
			value=toTrim(value);
			var p = /^([1-9]\d*|0)$/;
			if (value.length == 0){
				return '请输入正整数';
			}else if(value.length>0 && !p.test(value)){
				return '请输入正整数';
			}
		},'unreal_collect_amount': function(value){
			value=toTrim(value);
			var p = /^([1-9]\d*|0)$/;
			if (value.length == 0){
				return '请输入正整数';
			}else if(value.length>0 && !p.test(value)){
				return '请输入正整数';
			}
		},'unreal_praise_amount': function(value){
			value=toTrim(value);
			var p = /^([1-9]\d*|0)$/;
			if (value.length == 0){
				return '请输入正整数';
			}else if(value.length>0 && !p.test(value)){
				return '请输入正整数';
			}
		},
		"video_img_url": function(value){  
			value=toTrim(value);
			if(value.length==0||value==''){
				return '请上传图片';
			} 
        }, 
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
	     //点击按钮验证
		 var text=$(data.elem).text();
		 if("保存"==text){
			 $("#status").val(0);
		 }else{
			 $("#status").val(1);
		 }
		disable_submit(true,'commit');
		var formInfo = $('#addOrUpdateForm').serializeObject();
		//以下为验证信息/////////////////////////////////////////
		//棒点验证
		var p = /^([1-9]\d*|0)$/;
	    var radio=$("input:radio:checked").val();
	    if("1"==radio){
		   var now_bon_point=$("#now_bon_point").val();
	       var original_bon_point=$("#original_bon_point").val();
	       if(now_bon_point==null||now_bon_point==""||now_bon_point<=0||!p.test(now_bon_point)){
	           alertErrorMsg("请设置正确棒点数");
	           return  false;
	       }
	       
	       original_bon_point=toTrim(original_bon_point);
	       if(original_bon_point.length>0 && !p.test(original_bon_point)){
	           alertErrorMsg("请设置正确的原始棒点数,棒点数必须为正整数");
	           return  false;
	       }else if (original_bon_point.length == 0){
	    	   formInfo.original_bon_point = 0;
	       }
	       
	       if (original_bon_point == now_bon_point){
	    	   alertErrorMsg("请设置正确的原始棒点数,现在棒点数与原始棒点数不能相同");
	           return  false;
	       }
	     }
		// 标签检查
		if(formInfo.label_id == null || formInfo.label_id.length <= 0) {
			alertErrorMsg("请选择标签");
			return false;
		}

		// 商品
		var speList = {};
		var selectSpeList = $('.spe');
		var comTem = null;  // 用来检验两个商品是否一样
		for(var i = 0; i < selectSpeList.length; i++) {
			if($(selectSpeList[i]).children().length > 0){
				var commId = $(selectSpeList[i]).children('input').val();
				if(comTem != null && commId == comTem) {
					alertErrorMsg("不能选择相同的商品");
					return false;
				}
			}
			if(comTem == null) comTem = commId;
		}
		
		//以上为验证///////////////////////////////////
		// 单标签处理
		if(typeof formInfo.label_id == "string") {
			formInfo.label_id = [formInfo.label_id];
		}
		// 商品
		var speList = {};
		var selectSpeList = $('.spe');
		for(var i = 0; i < selectSpeList.length; i++) {
			if($(selectSpeList[i]).children().length > 0){
				var commId = $(selectSpeList[i]).children('input').val();
				speList[commId] = [];
			}
		}
		formInfo.speList = speList;
	
		var addJsonStr=JSON.stringify(formInfo);
		clickDisable();
		if(id==null || ""==id){  //添加
			$.ajax({
				url : getRootPath()+ '/video/saveVideo.action',
				type : 'POST',
				dataType : 'TEXT',
				data : {jsonStr:addJsonStr},
				success : function(result){
					if("success"==result){
						layer.msg('添加成功', {
							  icon: 1,
							  time: 500 //（如果不配置，默认是3秒）
							}, function(){
								backManager();
							});
					}else{
						layer.msg("添加失败，请重试或联系管理员",{
							icon:1,
							time:2000
						})
						clickAble();
					}
				},
				error:function(){
					parent.layer.alert("添加失败");
					clickAble();
				}
			});
		}else{ 
			//修改信息
			$.ajax({
				url : getRootPath()+ '/video/updateVideoInfo.action',
				type : 'POST',
				dataType : 'TEXT',
				data : {jsonStr:addJsonStr,id:id},
				success : function(result){
					
					if("success"==result){
						layer.msg('修改成功', {
							  icon: 1,
							  time: 500 //（如果不配置，默认是3秒）
							}, function(){
								backManager();
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
		}
		return false; 
		
	});
});

// 初始化数据
function initData() {
	initLabel();  // 初始化标签列表
	if(id != null && id != "") {
		initForm();   // 初始化表单数据
	} else {
		renderLabel(labels, null);
		//添加的时候，给虚拟操作增加上默认值为0
		$('#unreal_play_amount').val(0)
		$('#unreal_collect_amount').val(0)
		$('#unreal_praise_amount').val(0)
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
					 if(status!=0){//草稿之外的提交按钮
						 $("#commit1").hide();
					 }
					if(is_pay==0){//是否收费
						$("#price").hide();
						$("#price2").hide();
					}else{
						$("#price").show();
						$("#price2").show();
					}
					$('#addOrUpdateForm').setForm(result);
					// 渲染图片
					if(result.video_img_url != null && result.video_img_url != '') {
						$.each(result.video_img_url.split(","), function(i, n) {
							if(n != null && n != '') {
								img_url.push({
									id: n.substring(n.lastIndexOf("\/") + 1, n.length).split(".")[0],
									filePath: n
								})
							}
						})
						renderImgUrl();
						//隐藏掉上传图片的按钮
						isShowUpImgBtn(1);
					}
					// 渲染视频
					if(result.video_url != null && result.video_url != '') {
						renderAudioUrl(result.video_url);
						//隐藏掉上传视频的按钮
						isShowUpVideoBtn(1);
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
		//url : getRootPath()+ '/customerlabel/queryLabels.action',
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
		imUrlStyle += '<li style="float:left"><a class="goods-thumb" style="background-image: url(\''+img_url[i].filePath+'\');"></a>';
		imUrlStyle += '<a class="close-modal js-delete-goods small" style="cursor: pointer;" title="删除"  onclick="deleteImgUrl(\''+img_url[i].id+'\')">x</a></li>';
		imgUrls += img_url[i].filePath;
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
	//删除图片之后，显示上传按钮
	isShowUpImgBtn(0);
}

//渲染视频
function renderAudioUrl(audioFilePath) {
	$("#uploadVidioUrl").hide();
	$("#videoUrl").show();
	var str = "<div style=''id='splice'>"
		+ "<div>"
		+ "<video id='video' controls='controls'style='width:200px;'><source src='"+ audioFilePath + "'></video>"
		+ "<a href='#' class='close-modal js-delete-goods small' style='cursor: pointer;' title='删除' onclick='deleteAudioUrl()'> 删除</a>"
		+ "</div>"
		+ "<div>";
	$("#videoUrl").html(str);
	
}

//删除音频
function deleteAudioUrl() {
	$("#videoUrl div").remove(); 
	$("#videoUrl").hide();
	$("#uploadAudioUrl").show();
	$("#video_url").val("");
}


//关于上传图片按钮的处理，视频初始图片只有1张，如果有数据就隐藏，没有数据就显示
//0显示其他不显示 默认为显示
function isShowUpImgBtn(index){
	if (index == 0){
		$('#uploadImgUrl').show()
	}else{
		$('#uploadImgUrl').hide()
	}
}
//关于上传图片按钮的处理，视频初始图片只有1张，如果有数据就隐藏，没有数据就显示
//0显示其他不显示 默认为显示
function isShowUpVideoBtn(index){
	if (index == 0){
		$('#uploadAudioUrl').show()
	}else{
		$('#uploadAudioUrl').hide()
	}
}

function clickDisable(){
	disable_submit(true,'commit1');
	disable_submit(true,'commit2');
	disable_submit(true,'goBack');
}
function clickAble(){
	disable_submit(false,'commit1');
	disable_submit(false,'commit2');
	disable_submit(false,'goBack');
}
