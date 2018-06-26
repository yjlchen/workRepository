var id=getUrlParam("id");
var layer;
var form;	
$(function(){//初始时加载
	$("#return").click(function(){
		window.location.href=getRootPath()+"/pages/bon/moneyBonpoint/moneyBonpoint.jsp";
	})
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	if(id!=null&&id!=""){
		$.ajax({
			url:getRootPath() + '/moneyBonpoint/queryBonByID.action',//查询
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
					$("#money_sort").val(data.money);
					$("#bonpoint_sort").val(data.bonpoint);
					form.render();
				})

			}
		});
	}
	$("#select_featured").click(function(){		
	    var number_sort=$("#money_sort").val();
		var score_sort=$("#bonpoint_sort").val();
			
    });
})
layui.use(['form','element','layer','laydate'], function(){
	layer = layui.layer;
	form=layui.form();
	
	//提交
	$("#confirmBtn").click(function(){
		disable_submit(true,'confirmBtn');
		
		var money=$("#money_sort").val();
		if(money=="" || money==null){
			disable_submit(false,'confirmBtn');
			parent.layer.msg("请填写金额数");
			return false;
		}
		var bonpoint=$("#bonpoint_sort").val();
		if(bonpoint=="" || bonpoint==null){
			disable_submit(false,'confirmBtn');
			parent.layer.msg("请填写棒点值");
			return false;
		}
		//var p=/^([1-9]\d*|[0]{1,1})$/;
		  var p = /^[1-9]+\d*$/;
		if(money.length>0&&!p.test(money)){
			disable_submit(false,'confirmBtn');
			parent.layer.msg("请输入正整数");
			return false;
		}else if(bonpoint.length>0&&!p.test(bonpoint)){
			disable_submit(false,'confirmBtn');
			parent.layer.msg("请输入正整数");
			return false;
		}

	var queryJsonStr = '{"money":"'+money+'","bonpoint":"'+bonpoint+'"}';	
	if(id != null && id != ""){
			$.ajax({
				url:getRootPath() + '/moneyBonpoint/updateBonInfo.action',
				type:'post',
				dataType:'text',
				data:{
					"queryJsonStr":queryJsonStr,
					"id":id
					
				},
				success:function(data){
					if(data=="success"){
						window.location.href=getRootPath()+"/pages/bon/moneyBonpoint/moneyBonpoint.jsp";
					}else if(data=="moneyExists"){
						disable_submit(false,'confirmBtn');
						parent.layer.alert("该金额数已存在!");
					}else if(data=="bonpointExists"){
						disable_submit(false,'confirmBtn');
						parent.layer.alert("该棒点数已存在!");
					}
					
				}
			});
		}else{
			$.ajax({
				url:getRootPath() + '/moneyBonpoint/addBonInfo.action',
				type:'post',
				dataType:'text',
				data:{
					"queryJsonStr":queryJsonStr
					
				},
				success:function(data){
					if(data=="success"){
						window.location.href=getRootPath()+"/pages/bon/moneyBonpoint/moneyBonpoint.jsp";
					}else if(data=="moneyExists"){
						disable_submit(false,'confirmBtn');
						parent.layer.alert("该金额数已存在!");
					}else if(data=="bonpointExists"){
						disable_submit(false,'confirmBtn');
						parent.layer.alert("该棒点数已存在!");
					}
				}
			});
		}

	
})
})
