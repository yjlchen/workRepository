var id=getUrlParam("id");//心得表的主键
var backFlag=getUrlParam("backFlag");//获取是从哪个tab传递过来的,最好返回的时候，将他再传递回去
var img_url = [];  // 首页图片列表
var labels = [];  // 标签列表d
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
		//清空选中商品的ID
		chosenCommId = null;
	})
})

//界面显示初始化
function initShow(status){
	if(status != 0){
		$("#commit").hide();
	}
}

function renderCommSpe(idArr,phoArr) {
	chosenCommId = idArr[0];
	seclectCommDiv.children("div.select").children("div.select_box").hide();
	seclectCommDiv.children("div.select").children("div.p_img").children("img.commPic").attr('src', phoArr[0]); // 背景图
	seclectCommDiv.children("div.select").children("div.select_box").siblings().css({'display':'block'});//图片显示
}

function geneCommHtml(chosenCommId) {
	var html = "<input style='width:0px;height:0px;border:none;' value="+chosenCommId+" />";
	return html;
}

layui.use(['form','element','layer','laydate', 'upload'], function(){
	var layer = layui.layer,form=layui.form;
	// 执行图片
	layui.upload.render({
		elem : '#uploadImgUrl',
		url : getRootPath() + '/experience/uploadImage.action?group_ids='+""+'&type=pic',
		ext: 'jpg|png|gif',
		multiple: true,
		acceptMime: 'image/*',
		before: function() {
			clickDisable();
			$("#loading").show();
		},
		done: function(res) {
			img_url.push(res);
			renderImgUrl();
			$("#loading").hide();
			clickAble();
			//判断图片的数量
			if ($('#img_url').val().split(",").length > 8){
				$('#uploadImgUrl').hide();
			}
		},
		error: function() {
			$("#loading").hide();
			clickAble();
		}
	});
	
	//心得的表单验证
	layui.form.verify({  
		experience_content: function(value){  
			value=toTrim(value);
			if(value.length==0){
				return '不能为空';
			}
		},score_star: function(value){
			value=toTrim(value);
			var p = /^([1-9]\d*|0)$/;
			if (value.length == 0){
				return '请给心得选择星级评分';
			}if(value.length>0 && !p.test(value)){
				return '请输入正整数';
			} else if (parseInt(value) <0 || parseInt(value) > 5){
				return '星级评分必须为1~5的正整数';
			}
		},unreal_collect_amount: function(value){
			value=toTrim(value);
			var p = /^([1-9]\d*|0)$/;
			if (value.length == 0){
				return '请输入正整数';
			}else if(value.length>0 && !p.test(value)){
				return '请输入正整数';
			}
		},unreal_praise_amount: function(value){
			value=toTrim(value);
			var p = /^([1-9]\d*|0)$/;
			if (value.length == 0){
				return '请输入正整数';
			}else if(value.length>0 && !p.test(value)){
				return '请输入正整数';
			}
		},img_url :function(value){
			value=toTrim(value);
			if (value.length == 0){
				return '请选择首页图片';
			}else{
				var valArr = value.split(",");
				if (valArr.length > 9){//传过来的值最后有个引号
					return '当前张数'+(valArr.length-1)+',首页图片最多8张';
				}
			}
		}
	});
	
	 // 返回上一层
	$('#backPage').click(function(){
		backPage();
	})
	
	// 保存
	form.on('submit(formDemo)', function(data){
		if(chosenCommId == null){
			clickAble();
			alertErrorMsg("请选择商品");
			return false;
		}
		saveOrUpExperience(0);
	})
	
	// 发布
	form.on('submit(formDemoSend)', function(data){
		if(chosenCommId == null){
			clickAble();
			alertErrorMsg("请选择商品");
			return false;
		}
		saveOrUpExperience(1);
	})
});

function saveOrUpExperience(status){
	clickDisable();
	var empInfo = $('#addOrUpdateForm').serializeObject();
	empInfo.status = status;
	empInfo.publish_time_flag = status;
	empInfo.commodity_id =chosenCommId;

	// 商品
	var selectSpeList = $('.spe');
	//获取商品信息
	empInfo.img_url = empInfo.img_url.substring(0,empInfo.img_url.length-1);
	
	//心得产品表数据，测试
	var addJsonStr=JSON.stringify(empInfo);//将表单中的数据转成json
	if(id==null || ""==id){  //添加、
		$.ajax({
			url : getRootPath()+ '/experience/saveExperience.action',
			type : 'POST',
			dataType : 'TEXT',
			data : {addJsonStr:addJsonStr},
			success : function(result){
				if("success"==result){
					layer.msg('添加成功', {
						  icon: 1,
						  time: 500 //（如果不配置，默认是3秒）
						}, function(){
							backPage();
						});
				}else if ("3" == result){
					layer.msg('添加失败,已经发过该商品的心得了', {
						  icon: 2,
						  time: 2000 //（如果不配置，默认是3秒）
						});
					clickAble();
				}else{
					layer.msg("添加失败，请重试或联系管理员",{
						icon:2,
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
	}else{  //更新
		$.ajax({
			url : getRootPath()+ '/experience/updateExperience.action',
			type : 'POST',
			dataType : 'TEXT',
			data : {updateJsonStr:addJsonStr,id:id},
			success : function(result){
				if("success"==result){
					layer.msg('修改成功', {
						  icon: 1,
						  time: 500 //（如果不配置，默认是3秒）
						}, function(){
							location.href = getRootPath()+"/pages/bon/experience/experienceManage.jsp";
						});
				}else{
					layer.msg("修改失败，请重试",{
						icon:1,
						time:2000
					})
					clickAble();
				}
			},
			error:function(){
				parent.layer.alert("添加失败，请关闭浏览器重试或联系管理员！");
				clickAble();
			}
		});
	}
	return false; 
}

function isInList(d, list) {
	for(var i = 0; i < list.length; i++) {
		if(list[i] == d) {
			return true;
		}
	}
	return false;
}

// 初始化数据
function initData() {
	//填充表格
	if(id != null && id != "") {
		$.ajax({
			url:getRootPath() + '/experience/selectExperienceById.action',
			type:'post',
			dataType:'json',
			async:false,
			data:{
				"id":id
			},
			success:function(result){
				//填充表单
				$('#addOrUpdateForm').setForm(result);
				//填充星级评分
				starChangeClazz(result.score_star);
				//如果状态是驳回状态，显示驳回的内容
				if (result.status == 3){
					$('#reject_reson_div').show();
				}
				
				initShow(result.status);
				//填充图片
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
				//填充商品
				chosenCommId = result.commList[0].commodity_id;
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
			}
		});
	}
}


//渲染图片
function renderImgUrl() {
	$("#img_urls li").remove(); 
	var imUrlStyle = "";
	var imgUrls = "";
	for(var i = 0; i < img_url.length; ++i) {
		imUrlStyle += '<li style="float:left"><a class="goods-thumb" style="background-image: url(\''+img_url[i].filePath+'\');"></a>';
		imUrlStyle += '<a class="close-modal js-delete-goods small" style="cursor: pointer;" title="删除"  onclick="deleteImgUrl(\''+img_url[i].id+'\')">x</a></li>';
		imgUrls += img_url[i].filePath + ",";
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
	//判断图片的数量
	if ($('#img_url').val().split(",").length < 9){
		$('#uploadImgUrl').show();
	}
}



function alertErrorMsg(msg) {
	layer.msg(msg,{
		icon:2,
		time:2000
	})
}

function clickDisable(){
	disable_submit(true,'commit');
	disable_submit(true,'commitSend');
	disable_submit(true,'backPage');
}
function clickAble(){
	disable_submit(false,'commit');
	disable_submit(false,'commitSend');
	disable_submit(false,'backPage');
}

//返回
function backPage(){
	location.href = getRootPath()+"/pages/bon/experience/experienceManage.jsp?backFlag="+backFlag;
}
function selectStar(index){
	starChangeClazz(index);
	//给隐藏的score_star复制
	$("#score_star").val(index);
}
function starChangeClazz(index){
	for (var i=1;i<6;i++){
		document.getElementById('star'+i).style.background='rgba(0, 0, 0, 0) url('+'./star_unsele.png'+') repeat scroll 0% 0% / 16px 16px'
	}
	//先清空
	for (var i=1;i<6;i++){
		if (i > index){
			break;
		}else{
			document.getElementById('star'+i).style.background='rgba(0, 0, 0, 0) url('+'./star_sele.png'+') repeat scroll 0% 0% / 16px 16px'
		}
	}
}