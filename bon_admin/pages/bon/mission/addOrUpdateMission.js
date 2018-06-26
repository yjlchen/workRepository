var id=getUrlParam("id");
var layer;
var form;	
$(function(){//初始时加载
	$("#return").click(function(){
		window.location.href=getRootPath()+"/pages/bon/mission/mission.jsp";
	})
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	if(id!=null&&id!=""){
		$.ajax({
			url:getRootPath() + '/mission/queryMissionByID.action',//查询
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
					$('#misssionForm1').setForm(data);
					$("#number_sort").val(data.number);
					$("#score_sort").val(data.score);
					$("#everyday_valid_times_sort").val(data.everyday_valid_times);
					form.render();
				})

			}
		});
	}
	$("#select_featured").click(function(){		
	var number_sort=$("#number_sort").val();
		var score_sort=$("#score_sort").val();
		var everyday_valid_times_sort=$("#everyday_valid_times_sort").val();		
    });
})
layui.use(['form','element','layer','laydate'], function(){
	layer = layui.layer;
	form=layui.form();
	
	//提交
	$("#confirmBtn").click(function(){
		disable_submit(true,'confirmBtn');
		var type = $("#type").val();
		if(!isNotEmpty(type)){
			parent.layer.msg('请选择任务名称', {icon: 2,time: 2000});
			disable_submit(false,'confirmBtn');
			return false;
		}
		var number=$("#number_sort").val();
		if(number=="" || number==null){
			disable_submit(false,'confirmBtn');
			parent.layer.msg("请输入任务序号");
			return false;
		}
		var score=$("#score_sort").val();
		if(score=="" || score==null){
			disable_submit(false,'confirmBtn');
			parent.layer.msg("请填写分值");
			return false;
		}
		var everyday_valid_times=$("#everyday_valid_times_sort").val();
		if(everyday_valid_times=="" || everyday_valid_times==null){
			disable_submit(false,'confirmBtn');
			parent.layer.msg("请输入每日有效次数");
			return false;
		}
		var p = /^[1-9]+\d*$/;
		if(number.length>0&&!p.test(number)){
				disable_submit(false,'confirmBtn');
				parent.layer.msg("请输入正整数");
				return false;
		}else if(score.length>0&&!p.test(score)){
				disable_submit(false,'confirmBtn');
				parent.layer.msg("请输入正整数");
				return false;
		}else if(everyday_valid_times.length>0&&!p.test(everyday_valid_times)){
			disable_submit(false,'confirmBtn');
			parent.layer.msg("请输入正整数");
			return false;
	}
		
	var queryJsonStr = '{"type":"'+type+'","number":"'+number+'","score":"'+score+'","everyday_valid_times":"'+everyday_valid_times+ '"}';	
	if(id != null && id != ""){
			$.ajax({
				url:getRootPath() + '/mission/updateMissionInfo.action',
				type:'post',
				dataType:'text',
				data:{
					"queryJsonStr":queryJsonStr,
					"id":id
					
				},
				success:function(data){
					if(data=="success"){
						window.location.href=getRootPath()+"/pages/bon/mission/mission.jsp";
					}else if(data=="typeExists"){
						disable_submit(false,'confirmBtn');
						parent.layer.alert("该类型已存在!");
					}else if(data=="numberExists"){
						disable_submit(false,'confirmBtn');
						parent.layer.alert("该序号已存在!");
					}
					
				}
			});
		}else{
			$.ajax({
				url:getRootPath() + '/mission/addMissionInfo.action',
				type:'post',
				dataType:'text',
				data:{
					"queryJsonStr":queryJsonStr
					
				},
				success:function(data){
					if(data=="success"){
						window.location.href=getRootPath()+"/pages/bon/mission/mission.jsp";
					}else if(data=="typeExists"){
						disable_submit(false,'confirmBtn');
						parent.layer.alert("该类型已存在!");
					}else if(data=="numberExists"){
						disable_submit(false,'confirmBtn');
						parent.layer.alert("该序号已存在!");
					}
				}
			});
		}

	
})
})
