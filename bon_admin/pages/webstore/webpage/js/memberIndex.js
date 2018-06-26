
//页面名称修改
$(modality).on("blur","input[name='title']",function(){
    var txt = $(this).val();
    $("#hyzy-title").html(txt);
    $(this).attr("value",txt);
});


//显示等级点击事件
$(modality).on("click","input[name='show_level']",function(){
    var ind=$(this).parents("div.app-sidebar").index();
    //让多选框选中或不选中
    if($(this).is(':checked')==true){
    	//h5的父div显示
    	$(module.children()[ind]).find(".control-group .custom-level-title-section").css("display","block");
    	$(module.children()[ind]).find(".control-group h5:eq(0)").css("display","block");
    	$(this).attr("checked",true);
    }else if($(this).is(':checked')==false){
    	var show_point = $(modality.children()[ind]).find("input[name='show_point']");
    	if(show_point.is(':checked')==false){
    		//两个都没选中，父div隐藏
    		$(module.children()[ind]).find(".control-group .custom-level-title-section").css("display","none");
    	}
    	$(module.children()[ind]).find(".control-group h5:eq(0)").css("display","none");
    	$(this).attr("checked",false);
    }
});


//显示积分点击事件
$(modality).on("click","input[name='show_point']",function(){
    var ind=$(this).parents("div.app-sidebar").index();
    //让多选框选中或不选中
    if($(this).is(':checked')==true){
    	//h5的父div显示
    	$(module.children()[ind]).find(".control-group .custom-level-title-section").css("display","block");
    	$(module.children()[ind]).find(".control-group h5:eq(1)").css("display","block");
    	$(this).attr("checked",true);
    }else if($(this).is(':checked')==false){
    	var show_level = $(modality.children()[ind]).find("input[name='show_level']");
    	if(show_level.is(':checked')==false){
    		//两个都没选中，父div隐藏
    		$(module.children()[ind]).find(".control-group .custom-level-title-section").css("display","none");
    	}
    	$(module.children()[ind]).find(".control-group h5:eq(1)").css("display","none");
    	$(this).attr("checked",false);
    }
});




/**
 * 调用共用图片选择弹出框
 * @param b_fun     图片选择后的回调父页面的方法名称(回调方法中的参数是图片数组记录图片的url)
 * @param mutl_type 图片弹出框里的图片是否可以多选  1 单选  2多选
 */
function addMemberIndexPho(b_fun,mutl_type){
	parent.layer.open({
		  title: ''
		  ,type:2
		  ,closeBtn: 1
		  ,area:["860px","530px"]
		  ,content:getRootPath()+'/commons/jsp/com_pho.jsp?b_fun='+b_fun+'&mutl_type='+mutl_type   //type=1 单选; 2多选
		});
}
	


//插入选择的图片
function insert_MemberIndexPho(phoArr){
	$("#rightHyzybjt").attr("src",phoArr);
	$("#leftHyzybjt").attr("src",phoArr);
}




//会员主页名称失去焦点事件
$("#hyzymc").blur(function(){
	var micro_name = $(this).val();
	if(micro_name == ""){
		$(".error-message").css("display","block");
	}else{
		$(".error-message").css("display","none");
	}
})