var resource_id=getUrlParam("resource_id");//被评论的资源id
var belong_id=getUrlParam("belong_id");//资源所属人id
var type=getUrlParam("type");
var page=getUrlParam("page");
$(function(){
	var todayDate = queyNowTimeByServer().substring(0, 10);
	initData();
	initEvent();
	layui.use(['form', 'layedit', 'laydate'], function(){
		layer = layui.layer
		,layedit = layui.layedit
		,laydate = layui.laydate
		,form = layui.form;
		laydate.render({
		    elem: '#evaluate_time'
		    ,type: 'date'
		    ,min: todayDate
		});
		laydate.render({
		    elem: '#timesfm'
		    ,type: 'time'
		});
		form.on('radio(is_read)', function(data){
			if(data.value=="0"){
				$("#time").hide();
			}else{
				$("#time").show();
			}
		});
		form.on('radio(addOrNot)', function(data){
			if(data.value=="n"){
				$("#ndiv").show();
				$("#ydiv").hide();
			}else{
				$("#ydiv").show();
				$("#ndiv").hide();
			}
		});
		form.on('submit(fsbm)', function(data){
			disable_submit(true,'commit');
			var jsonInfo=data.field;
			if(!isNotEmpty(jsonInfo.evaluate_content)){
				parent.layer.msg('请输入评论内容', {icon:2,time: 2000});
				disable_submit(false,'commit');
				return false;
			}
			if(jsonInfo.is_read=="1"){
				if(!isNotEmpty(jsonInfo.evaluate_time)){
					parent.layer.msg('请选择评论的日期', {icon:2,time: 2000});
					disable_submit(false,'commit');
					return false;
				}
				if(!isNotEmpty(jsonInfo.timesfm)){
					parent.layer.msg('请选择时间', {icon:2,time: 2000});
					disable_submit(false,'commit');
					return false;
				}
			}
			var point_count=Number(jsonInfo.point_count);
			var reg = /^\d+(?=\.{0,1}\d+$|$)/
			if(!isNotEmpty(jsonInfo.point_count)){
				parent.layer.msg('请输入点赞数', {icon:2,time: 2000});
				disable_submit(false,'commit');
				return false;
			}else if(!reg.test(jsonInfo.point_count)){
				parent.layer.msg('点赞数必须是正整数', {icon:2,time: 2000});
				disable_submit(false,'commit');
				return false ;
			}
			jsonInfo.point_count=point_count;
			if(jsonInfo.addOrNot=="y"){
				//头像图片url
				var headimg=$("#head-img").attr("src");
				if(headimg.indexOf("/commons/images/addpicture.jpg") >= 0){
					parent.layer.msg('请添加虚拟用户头像', {icon:2,time: 2000});
					disable_submit(false,'commit');
					return false;
				}
				if(!isNotEmpty(jsonInfo.wx_name)){
					parent.layer.msg('请输入虚拟用户名', {icon:2,time: 2000});
					disable_submit(false,'commit');
					return false;
				}
				jsonInfo["head_img_url"]=headimg;
				jsonInfo["evaluate_member_name"]=$("#wx_name").val();
			}else{
				if(!isNotEmpty(jsonInfo.evaluate_member_id)){
					parent.layer.msg('请选择虚拟用户', {icon:2,time: 2000});
					disable_submit(false,'commit');
					return false;
				}
				jsonInfo["evaluate_member_name"]=$("#evaluate_member_id").siblings(".layui-form-select").find(".layui-this").text()
			}
			
			jsonInfo["resource_id"]=resource_id;
			jsonInfo["belong_id"]=belong_id;
			$.ajax({
				url : getRootPath()+ '/virtualEvaluate/insertEvaluate.action',
				type : 'POST',
				dataType : 'TEXT',
				data : {jsonInfo:JSON.stringify(jsonInfo),type:type},
				success : function(result){
					if("success"==result){
						layer.msg('添加成功', {
							icon: 1,
							time: 2000 //（如果不配置，默认是3秒）
						}, function(){
							//只刷新第一个tab页下的列表
							/*var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
							parent.document.getElementById(data_pjax).contentWindow.lodingtable();
							parent.layer.closeAll();*/
						});
						disable_submit(false,'commit');
						initData();
						$("#reset").click();
					}else if("repeat"==result){
						layer.msg("虚拟用户名不能重复",{
							icon:2,
							time:2000
						})
						disable_submit(false,'commit');
					}else{
						layer.msg("添加失败，请重试",{
							icon:2,
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
		})
	})
});
var layer;
var form;

function initData(){
	$("#title").text(title);
	$.ajax({
	    url : getRootPath()+"/virtualEvaluate/queryvE.action",
	    type : "post",
	    async: false,//同步
	    "dataType":"json",
	    success : function (gdata) {
	    	if(gdata!=null){
	    		$("#evaluate_member_id").empty().append('<option value="">--请选择--</option>')
	            for(var i=0;i<gdata.length;i++){
	            	var gindex=gdata[i];
	            	var vEid=gindex.id;
	            	var wx_name=gindex.wx_name;
	            	$("#evaluate_member_id").append("<option value='"+vEid+"'>"+wx_name+"</option>"); 
	            }
	    	}
	    }
	});
}

function initEvent(){
	$("#returnTo").click(function(){
		if(type==3){
			var status=getUrlParam("status")
			var audio_id=getUrlParam("audio_id");
			var ispay=getUrlParam("ispay");
			window.location.href=getRootPath()+page+"?status="+status+"&audio_id="+audio_id+"&ispay="+ispay;
		}else{
			window.location.href=getRootPath()+page;
		}
	})
	
	$("#pic").click(function(){
		$("#head-img").attr("src",getRootPath()+"/commons/images/addpicture.jpg");
		$("#pic").hide();
	})
	$("#head-img").click(function(){
		addpho("setHeadImg",1);
	})
	$("#reset").click(function(){
		$("#time").show();
		$("#ydiv").show();
		$("#ndiv").hide();
		$("#head-img").attr("src",getRootPath()+"/commons/images/addpicture.jpg");
		$("#pic").hide();
	})
}

function addpho(b_fun,mutl_type){
	parent.layer.open({
		  title: ''
		  ,type:2
		  ,closeBtn: 1
		  ,resize:false
		  ,area:["860px","530px"]
		  ,content:getRootPath()+'/commons/jsp/com_pho.jsp?b_fun='+b_fun+'&mutl_type='+mutl_type   //type=1 单选; 2多选
		});
}

function setHeadImg(imgUrl){
	if( imgUrl.length>0){
		var url=imgUrl[0];
		$("#head-img").attr("src",url);
		$("#pic2").show();
	}
}

function isTime(str)
{
var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
if (a == null) {return false;}
if (a[1]>23 || a[3]>59 || a[4]>59)
{
return false
}
return true;
}