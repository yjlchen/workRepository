var commodity_name;
var commodity_id;
$(function(){
	initData();
	initEvent();
	layui.use(['form', 'layedit', 'laydate'], function(){
		layer = layui.layer
		,layedit = layui.layedit
		,laydate = layui.laydate
		,form = layui.form();
		
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
			//商品图片url
			var imgurl=$("#commodity").attr("src");
			if(imgurl.indexOf("/commons/images/addpicture.jpg") >= 0){
				parent.layer.msg('请选择商品', {icon:2,time: 2000});
				disable_submit(false,'commit');
				return false;
			}
			if(!isNotEmpty(jsonInfo.evaluate_time)){
				parent.layer.msg('请选择评论的时间', {icon:2,time: 2000});
				disable_submit(false,'commit');
				return false;
			}
			var timesfm=jsonInfo.timesfm;
			if(!isNotEmpty(timesfm)){
				parent.layer.msg('请输入时分秒', {icon:2,time: 2000});
				disable_submit(false,'commit');
				return false;
			}else{
				var reg = new RegExp("：",'g');//g,表示全部替换。
				timesfm=timesfm.replace(reg,":");
				timesfm=$.trim(timesfm);
				jsonInfo.timesfm=timesfm;
				if(!isTime(timesfm)){
					parent.layer.msg('请输入正确时分秒格式', {icon:2,time: 2000});
					disable_submit(false,'commit');
					return false;
				}
			}
			jsonInfo["img_path_str"]=imgurl;
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
			}else{
				if(!isNotEmpty(jsonInfo.user_id)){
					parent.layer.msg('请选择虚拟用户', {icon:2,time: 2000});
					disable_submit(false,'commit');
					return false;
				}
			}
			jsonInfo["commodity_id"]=commodity_id;
			jsonInfo["commodity_name"]=commodity_name;
			$.ajax({
				url : getRootPath()+ '/virtualEvaluate/insert.action',
				type : 'POST',
				dataType : 'TEXT',
				data : {jsonInfo:JSON.stringify(jsonInfo)},
				success : function(result){
					if("success"==result){
						layer.msg('添加成功', {
							icon: 1,
							time: 2000 //（如果不配置，默认是3秒）
						}, function(){
							//只刷新第一个tab页下的列表
							var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
							parent.document.getElementById(data_pjax).contentWindow.lodingtable();
							parent.layer.closeAll();
						});
						disable_submit(false,'commit');
						initData();
						$("#reset").click();
					}else if("both"==result){
						layer.msg("用户名和电话号码重复，请重新填写",{
							icon:1,
							time:2000
						})
						disable_submit(false,'commit');
					}else if("login_user_repeat"==result){
						layer.msg("用户名重复，请重新填写",{
							icon:1,
							time:2000
						})
					}else if("tel_repeat"==result){
						layer.msg("电话号码重复，请重新填写",{
							icon:1,
							time:2000
						})
						disable_submit(false,'commit');
					}
					else{
						layer.msg("添加失败，请重试",{
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
		})
	})
});
var layer;
var form;

function initData(){
	$.ajax({
	    url : getRootPath()+"/virtualEvaluate/queryvE.action",
	    type : "post",
	    async: false,//同步
	    "dataType":"json",
	    success : function (gdata) {
	    	if(gdata!=null){
	    		$("#user_id").empty().append('<option value="">--请选择--</option>')
	            for(var i=0;i<gdata.length;i++){
	            	var gindex=gdata[i];
	            	var vEid=gindex.id;
	            	var wx_name=gindex.wx_name;
	            	$("#user_id").append("<option value='"+vEid+"'>"+wx_name+"</option>"); 
	            }
	    	}
	    }
	});
}

function initEvent(){
	$("#pic").click(function(){
		$("#commodity").attr("src",getRootPath()+"/commons/images/addpicture.jpg");
		$("#pic").hide();
	})
	$("#pic2").click(function(){
		$("#head-img").attr("src",getRootPath()+"/commons/images/addpicture.jpg");
		$("#pic2").hide();
	})
	$("#head-img").click(function(){
		addpho("setHeadImg",1);
	})
	$("#commodity").on("click",function(){
		parent.layer.open({
			title: ''
			,type:2
			,closeBtn: 1
			,area:["700px","530px"]
			,content:getRootPath()+'/commons/jsp/com_goods.jsp?mutl_type=1&marketing=virtualEvaluate'
		});
	});
	$("#reset").click(function(){
		$("#ydiv").show();
		$("#ndiv").hide();
		$("#head-img").attr("src",getRootPath()+"/commons/images/addpicture.jpg");
		$("#pic2").hide();
	})
	$("#addEmp").click(function(){
		parent.layer.open({
			title:"添加员工",
			type: 2,
			id:100,
			area: ['400px', '530px'],
			content: getRootPath()+'/pages/cm/empmanage/addEmp.jsp' //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
		});
	});
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

function setImg(idArr,phoArr,nameArr){
	commodity_id=idArr[0];
	$("#commodity").attr("src",phoArr[0]);
	$("#pic").show();
	commodity_name=nameArr[0];
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