var id=getUrlParam("id");
var backFlag=getUrlParam("backFlag");
var layer;
var form;	
$(function(){//初始时加载
	
	initData();
	
	$("#return").click(function(){
		window.location.href=getRootPath()+"/pages/bon/spreadRatio/spreadRatio.jsp?backFlag="+backFlag;
	})
	
	$("#select_featured").click(function(){		
	    var start_money_sort=$("#start_money_sort").val();
		var end_money_sort=$("#end_money_sort").val();		
    });
})
layui.use(['form','element','layer','laydate'], function(){
	layer = layui.layer;
	form=layui.form();
	//提交
	$("#confirmBtn").click(function(){
		disable_submit(true,'confirmBtn');

		var start_money=$("#start_money_sort").val();
		if(start_money=="" || start_money==null){
			disable_submit(false,'confirmBtn');
			parent.layer.msg("请填写开始金额");
			return false;
		}
		
		var end_money=$("#end_money_sort").val();
		if(end_money=="" || end_money==null){
			disable_submit(false,'confirmBtn');
			parent.layer.msg("请填写结束金额");
			return false;
		}else if(parseInt(end_money)<=parseInt(start_money)){
			disable_submit(false,'confirmBtn');
			parent.layer.msg("结束金额应大于开始金额");
			return false;
		}
		  var p = /^[1-9]+\d*$/;
		if(start_money.length>0&&!p.test(start_money)){
			disable_submit(false,'confirmBtn');
			parent.layer.msg("金额请输入正整数");
			return false;
		}else if(end_money.length>0&&!p.test(end_money)){
			disable_submit(false,'confirmBtn');
			parent.layer.msg("金额请输入正整数");
			return false;
		}
		
	
		//定义两个变量，max和min，但是是想用里面声明的值，没有用到max和min，这么定义只是想使定义时简单些
/*		var start_money_start;
		var end_money_start;
		var start_money_end;
		var end_money_end;
		//判断添加和修改时开始金额和结束金额的区间是否重叠
		if(start_money.start<end_money.start&&start_money.end<end_money.end||
		   start_money.start>end_money.start&&start_money.end>end_money.end){
			disable_submit(false,'confirmBtn');
		}else{
			disable_submit(false,'confirmBtn');
			parent.layer.msg("区间存在交叉!");
			return false;
		}*/
	
		
		var rate=$("#rate").val();
		if(rate=="" || rate==null){
			disable_submit(false,'confirmBtn');
			parent.layer.msg("请填写推广比例");
			return false;
		}else if(rate<0.01||rate>0.99){
			disable_submit(false,'confirmBtn');
			parent.layer.msg("推广比例范围必须在0.01-0.99之间");
			return false;
		}else if(isNaN(rate)){
			disable_submit(false,'confirmBtn');
			parent.layer.msg("推广比例范围必须在0.01-0.99之间");
			return false;
		}
		//var queryJsonStr = '{"start_money":"'+start_money+'","end_money":"'+end_money+'","rate":"'+rate+'"}';	
		var empInfo = $('#settingForm').serializeObject();
		empInfo.start_money = empInfo.start_money_sort;
		empInfo.end_money = empInfo.end_money_sort;
		empInfo.type = backFlag;
		var queryJsonStr=JSON.stringify(empInfo);//将表单中的数据转成json
		
		if(id != null && id != ""){
			$.ajax({
				url:getRootPath() + '/spreadRatio/updateSetting.action',
				type:'post',
				dataType:'text',
				data:{
					"queryJsonStr":queryJsonStr,
					"id":id
				},
				success:function(data){
					if(data=="success"){
						window.location.href=getRootPath()+"/pages/bon/spreadRatio/spreadRatio.jsp?backFlag="+backFlag;
					}else if(data=="moneyExists"){
						disable_submit(false,'confirmBtn');
						parent.layer.alert("区间存在重叠!");
					}
				}
			});
		}else{
			$.ajax({
				url:getRootPath() + '/spreadRatio/addSetting.action',
				type:'post',
				dataType:'text',
				data:{
					"queryJsonStr":queryJsonStr
				},
				success:function(data){
					if(data=="success"){
						window.location.href=getRootPath()+"/pages/bon/spreadRatio/spreadRatio.jsp?backFlag="+backFlag;
					}else if(data=="moneyExists"){
						disable_submit(false,'confirmBtn');
						parent.layer.alert("区间存在重叠!");
					}
				}
			});
		}

})
})

function initData(){
	var speadTitle = "推广比例设置";
	switch(backFlag){
		case "1":
			speadTitle = "商品" + speadTitle;
			break;
		case "2":
			speadTitle = "音频" + speadTitle;
			break;
		case "3":
			speadTitle = "视频" + speadTitle;
			break;
	}
	
	$('#spreadTitle').html(speadTitle);
	
	if(id != null && id != ""){
		$.ajax({
			url:getRootPath() + '/spreadRatio/querySpreadRatioByID.action',//查询
			type:'post',
			dataType:'text',
			data:{
				"id":id	
			},
			success:function(data){
				data = JSON.parse(data);
				layui.use(['form','element','layer','laydate'], function(){
					layer = layui.layer;
					form=layui.form();
					$("#start_money_sort").val(data.start_money);
					$("#end_money_sort").val(data.end_money);
					$("#rate").val(data.rate);
					form.render();
				})

			}
		});
	}
}
