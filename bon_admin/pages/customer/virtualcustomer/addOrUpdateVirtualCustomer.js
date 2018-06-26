var id=getUrlParam("id");
$(function(){
	initEmp();
	if(isNotEmpty(id)){
		initData();
	}
	initEvent();
	layui.use(['form', 'layedit', 'laydate'], function(){
		layer = layui.layer
		,layedit = layui.layedit
		,form = layui.form;
		$("#commit").click(function(){
			var wx_name = $("#wx_name").val();
			if(!isNotEmpty(wx_name)){
				parent.layer.msg('请输入昵称', {icon:2,time: 2000});
				disable_submit(false,'commit');
				return false;
			}
			//头像图片url
			var head_img_url=$("#head-img").attr("src");
			if(head_img_url.indexOf("/commons/images/addpicture.jpg") >= 0){
				parent.layer.msg('请添加虚拟用户头像', {icon:2,time: 2000});
				disable_submit(false,'commit');
				return false;
			}
			var empid=$("#emp_name").val();
			$.ajax({
				url : getRootPath()+ '/virtualCustomer/saveOrUpdate.action',
				type : 'POST',
				dataType : 'JSON',
				data : {head_img_url:head_img_url,wx_name:wx_name,id:id,emp_id:empid,status:$("#status").val()},
				success : function(res){
					var result=res.rstr;
					if("success"==result){
						layer.msg('操作成功', {
							icon: 1,
							time: 1500 //（如果不配置，默认是3秒）
						}, function(){
							window.location.href="virtualCustomer.jsp";
						});
						disable_submit(false,'commit');
					} else if("dupWxName" == result){
						layer.msg("微信名重复",{
							icon:5,
							time:1500
						})
						disable_submit(false,'commit');
					}else{
						layer.msg("操作失败，请重试",{
							icon:5,
							time:1500
						})
						disable_submit(false,'commit');
					}
				},
				error:function(e){
					console.info(JSON.stringify(e));
					parent.layer.alert("操作失败，请关闭浏览器重试或联系管理员！");
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
	    url : getRootPath()+"/virtualCustomer/queryById.action",
	    type : "post",
	    async: false,//同步
	    "dataType":"json",
	    "data":{id:id},
	    success : function (gdata) {
	    	if(gdata!=null){
	    		$("#head-img").attr("src",gdata.head_img_url);
	    		$("#wx_name").val(gdata.wx_name);
	    		var e_id=gdata.emp_id;
	    		$("#emp_name").val(e_id);
	    	}
	    }
	});
}

function initEvent(){
	
	$("#head-img").click(function(){
		addpho("setHeadImg",1);
	})
//	$("#reset").click(function(){
//		$("#head-img").attr("src",getRootPath()+"/commons/images/addpicture.jpg");
//		$("#wx_name").val("");
//	})
	$("#back").click(function(){
		window.location.href="virtualCustomer.jsp";
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

function setHeadImg(imgUrl){
	if( imgUrl.length>0){
		var url=imgUrl[0];
		$("#head-img").attr("src",url);
	}
}
/**
 * 后台账号
 */
function initEmp(){
	$.ajax({
	    url : getRootPath()+"/empmanage/queryEmpZb.action",
	    type : "post",
	    "dataType":"json",
	    async: false,//同步
	    success : function (gdata) {
	    	if (gdata.data != null && gdata.data != undefined) {
				var clist = gdata.data; // 员工数据主播角色
				$("#emp_name").append("<option value=''>请选择</option>");
				for (var i = 0; i < clist.length; i++) {
					var gindex = clist[i];
					var id = gindex.id;
					var name = gindex.emp_name;
					$("#emp_name").append("<option value='" + id + "'>" + name+ "</option>");
				}
			}
	    }
	});
}