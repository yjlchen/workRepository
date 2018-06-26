//全局变量
var imageAd_count = 0;
var image_ad = function(){
	this.left = 
		'	<div class="app-field clearfix editing module_div">'
		+'		<div class="control-group">'
		+'      <div class="custom-image-swiper">'
		+'        <div class="swiper-container" style="height: 100px">'
		+'            <div class="swiper-wrapper">'
		+'                <img style="display: block;" src='+getRootPath()+'/pages/webstore/webpage/image/image_ad.jpg>'
		+'            </div>'
		+'        </div>'
		+'    </div>'
		+'	<!-- 轮播的div -->'
        +'   <div class="swiper-pagination" style="display: none;">'
        +'     <span class="swiper-pagination-switch swiper-active-switch"></span>'
        +'     <span class="swiper-pagination-switch"></span>'
        +'   </div>'
        +'      <!-- 分开显示 -->'
		+'		<ul class="custom-image clearfix" style="display: none;">'
		+'			<li id="adimgDefaultLi">'
		+'				<img style="display: block;" src = '+getRootPath()+'/pages/webstore/webpage/image/image_ad.jpg >'
		+'			</li>'
		+'		</ul>'
		+'		<div class="component-border"></div>'
		+'	</div>'
		+'	<div class="actions">'
		+'		<div class="actions-wrap">'
		//+'		  <span class="action edit">编辑</span>'
		//+'		  <span class="action add">加内容</span>'
		+'		  <span class="action delete">删除</span>'
		+'		</div>'
		+'	</div>'
		+'	<div class="sort">'
		+'		<i class="sort-handler"></i>'
		+'	</div>'
		+'	</div>'
		
		
    this.right = 
    	'	<div class="app-sidebar">'																		
    	+'		<div class="arrow"></div>'
    	+'		<div class="app-sidebar-inner js-sidebar-region"><div>'
    	+'		<form class="form-horizontal" novalidate="">'
    	+'		<div class="control-group">'
    	+'			<label class="control-label">显示方式：</label>'
    	+'			<div class="controls" style="margin-left: 10px;">'
	    +'					<label class="radio inline">'
	    +'						<input type="radio" name="show_method" value="0" checked="">折叠轮播'
	    +'					</label>'
	    +'					<label class="radio inline">'
	    +'						<input type="radio" name="show_method" value="1">分开显示'
	    +'					</label>'
    	+'			</div>'
    	+'		</div>'
    	+'		<div class="control-group">'
    	+'			<label class="control-label">显示大小：</label>'
    	+'			<div class="controls" style="margin-left: 10px;">'
    	+'				<label class="radio inline">'
    	+'					<input type="radio" name="size" value="0" checked="">大图 '
    	+'				</label>'
    	+'			</div>'
    	+'		</div>'
    	+'		<div class="control-group js-choices-region">'
    	+'		    <ul class="choices ui-sortable" style="margin:0"></ul>'
    	+'		</div>'
    	+'		<div class="control-group options">'
    	+'			<a href="javascript:void(0);" class="add-option js-add-option" id="addAd"><i class="icon-add"></i> 添加一个广告</a>'
    	+'		</div>'
    	+'		<div class="control-group"> '
    	+'			<div class="controls" name="sub_entry" style="margin-left: 0;"></div>'
    	+'		</div>'
    	+'		<p class="app-component-desc" style="font-size: 12px; color:#666;">最多添加10个广告</p>'
    	+'	</form>'
    	+'	</div>'
    	+'	</div>'
    	+'	</div>'
}


//显示方式切换事件
$(modality).on("click","input[name='show_method']",function(){
	var ind=$(this).parents("div.app-sidebar").index();
    var txt=$(this).val();
    
    var label1 = '<label class="radio inline"><input type="radio" name="size" value="0" checked="">大图</label>';
    var label2 = '<label class="radio inline"><input type="radio" name="size" value="0" checked="">大图</label>'+
    			 '<label class="radio inline"><input type="radio" name="size" value="1">小图</label>';
    if(txt=="0"){
    	$(module.children()[ind]).find(".custom-image-swiper").css("display","block");
    	$(module.children()[ind]).find(".swiper-wrapper").css("display","block");
    	$(module.children()[ind]).find("ul").css("display","none");
    	$(modality.children()[ind]).find("form .control-group").eq(1).find(".controls").html(label1);
    }else if(txt=="1"){
    	$(module.children()[ind]).find(".custom-image-swiper").css("display","none");
    	$(module.children()[ind]).find("ul").css("display","block");
    	//分开显示默认大图展现
    	$(module.children()[ind]).find("ul.custom-image .custom-image-small").addClass("adimgbig").removeClass("custom-image-small");
    	$(modality.children()[ind]).find("form .control-group").eq(1).find(".controls").html(label2);
    }
    $(this).attr("checked",true);
    $(this).parent("label").siblings().children().attr("checked",false);
});


//显示大小切换事件
$(modality).on("click","input[name='size']",function(){
	var ind=$(this).parents("div.app-sidebar").index();
    var txt=$(this).val();
    if(txt=="0"){
    	$(module.children()[ind]).find("ul.custom-image .custom-image-small").addClass("adimgbig").removeClass("custom-image-small");
    }else if(txt=="1"){
    	$(module.children()[ind]).find("ul.custom-image .adimgbig").addClass("custom-image-small").removeClass("adimgbig");
    }
    $(this).attr("checked",true);
    $(this).parent("label").siblings().children().attr("checked",false);
});



/**
 * 调用共用图片选择弹出框
 * @param b_fun     图片选择后的回调父页面的方法名称(回调方法中的参数是图片数组记录图片的url)
 * @param mutl_type 图片弹出框里的图片是否可以多选  1 单选  2多选
 */
$(modality).on("click","#addAd",function(){
	var ind=$(this).parents("div.app-sidebar").index();
	parent.layer.open({
		  title: ''
		  ,type:2
		  ,closeBtn: 1
		  ,area:["860px","530px"]
		  ,content:getRootPath()+'/commons/jsp/com_pho.jsp?ind='+ind+'&mutl_type=2&b_fun=query_adpho'
	});
});
//点击重新上传按钮弹出选择图片的对话框
$(modality).on("click","div.reUpload",function(){
	//获取当前是右边第几个元素
	var ind=$(this).parents("div.app-sidebar").index();
	var liInd=$(this).parents("li.choice").attr("id").substring(7);
	//获取当前元素是第几个元素
	var div_ind=$(this).parent("li").index();
	parent.layer.open({
		  title: ''
		  ,type:2
		  ,closeBtn: 1
		  ,area:["860px","530px"]
		  ,content:getRootPath()+'/commons/jsp/com_pho.jsp?ind='+ind+'&liInd='+liInd+'&div_ind='+div_ind+'&mutl_type=2&b_fun=query_anew'
	});
});
//重新上传图片调用的函数
function query_anew(urlArr,ind,liInd,div_ind){
	$(modality.children()[ind]).find("#imageAd"+liInd).find(".choice-image>img").attr("src",urlArr);
	//获取图片的大小，让图片可以平铺展示
	var img_original_width=getNaturalWidth(urlArr);
	var img_original_height=getNaturalHeight(urlArr);
	if(img_original_width<320){
		var proportion=1;
	}else{
		var proportion=img_original_width/320;
	}
	var img_height=img_original_height/proportion;
	if(div_ind=="0"){
		$(module.children()[ind]).find(".swiper-container").css("height",img_height);
	}
	$(module.children()[ind]).find(".imageAd"+liInd).find("img").attr("src",urlArr);
	$(module.children()[ind]).find("div.imageAd"+liInd).find("img").attr("style","height:"+img_height+"px");
	$(module.children()[ind]).find("div.imageAd"+liInd).attr("style","height:"+img_height+"px");
}
//获取图片选择页面传入的图片数组，插入到图片
function query_adpho(urlArr,ind){
	if( urlArr.length>0){
		for(var i=0;i<urlArr.length;i++){
			var url=urlArr[i];
			insert_adpho(url,ind);
			imageAd_count++;
		}
	}
}
//获取图片原始大小(高度)
function getNaturalHeight(img) { 
	var image = new Image();
	image.src = img;
	var naturalHeight = image.height;
	return naturalHeight;
}
//获取图片原始大小(宽度)
function getNaturalWidth(img) { 
	var image = new Image();
	image.src = img;
	var naturalWidth = image.width;
	return naturalWidth;
}
//插入图片
function insert_adpho(url,ind){
	var right = 
		'	<li class="choice" id="imageAd'+imageAd_count+'" style="padding:5px">'
		+'		<div class="choice-image reUpload">'
		+'		<img src="'+url+'"  width="118" height="118" class="thumb-image">'
		+'		<a class="modify-image js-trigger-image" href="javascript: void(0);" style="color:#fff">重新上传</a>'
		+'		<!-- for error msg -->'
		+'		<div class="control-group">'
		+'			<div class="controls">'
		+'				<input type="hidden" name="image_url">'
		+'			</div>'
		+'		</div>'
		+'	</div>'
		+'	<div class="choice-content" style="width: 266px;">'
		+'		<div class="control-group">'
		+'			<label class="control-label">标题：</label>'
		+'			<div class="controls" style="margin-left: 5px;">'
		+'				<input class="" type="text" name="title[c1010]" value="" style="width: 140px;" onblur="addTitleOfImageAd(this)">'
		+'			</div>'
		+'		</div>'
		+'		<div class="control-group">'
		+'			<label class="control-label">链接：</label>'
		+'			<div class="controls" style="margin-left: 5px;" id="imageAdControls_'+imageAd_count+'">'
		+'				<input type="hidden" name="link_url">'
		+'		<div class="dropdown hover">'
		+'		<a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:;">设置链接到的页面地址 <i class="caret"></i></a>'
		+'		<ul class="dropdown-menu">'
		+'			<li>'
		+'				<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageImageAd(this,0)" >微页面</a>'
		+'			</li>'
		+'			<li>'
		+'				<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupImageAd(this,0)">商品</a>'
		+'			</li>'
		+'          <li>'
        +'              <a class="js-modal-links" data-type="links" href="javascript:void(0);">自定义外链</a>'
        +'           </li>'
		+'		</ul>'
		+'	</div>'
		+'	</div>'
		+'	</div>'
		+'	</div>'
		+'	<div class="actions">'
	//	+'		<span class="action add close-modal" title="添加">+</span> '
		+'		<span class="action delete close-modal" title="删除" onclick="deleteImageAdLi(this)">×</span>'	
		+'	</div>'
		+'  <div class="popover-inner popover-link" style="width:330px;position: absolute;top: 105px;display:none">'
        +'  	<div class="popover-content">'
        +'      <div class="form-inline">'
        +'       <input type="text" class="link-placeholder js-link-placeholder" placeholder="链接地址：http://example.com">'
        +'        <button type="button" class="btn btn-primary js-btn-confirm" style="color:#fff;background:#0080ed;" ' 
        +' 			onclick=imageAd_wl_queding(this,"'+imageAd_count+'") data-loading-text="确定"> 确定</button>'
        +'         <button type="reset" class="btn js-btn-cancel" onclick="mf_wl_quxiao(this)">取消</button>'
        +'      </div>'
        +'  	</div>'
        +'	</div>'
		+'	</li>'

	//右边加上li
	$(modality.children()[ind]).find(".ui-sortable").append(right);
	if($(module.children()[ind]).find(".swiper-container .swiper-slide"))
	//获取图片的大小，让图片可以平铺展示
	var img_original_width=getNaturalWidth(url);
	var img_original_height=getNaturalHeight(url);
	if(img_original_width<=320){
		var proportion=1;
	}else{
		var proportion=img_original_width/320;
	}
	var img_height=img_original_height/proportion;
	//隐藏左边div下的那个默认图片	
	$(module.children()[ind]).find(".swiper-wrapper >img").css("display","none");
	if($(module.children()[ind]).find(".swiper-container .swiper-slide").length==0){
		$(module.children()[ind]).find(".swiper-container").css("height",img_height);
	}else{
		var div_height=$(module.children()[ind]).find(".swiper-container .swiper-slide").eq(0).height();
		$(module.children()[ind]).find(".swiper-container").css("height",div_height);
	}
	//改变左边div高度
	//$(module.children()[ind]).find(".swiper-container").css("height",img_height);
	//console.log("aa");
	var left = 
		'	<div style="height:'+img_height+'px;" class="swiper-slide imageAd'+imageAd_count+'" id="imageAd'+imageAd_count+'">'
		+'		<a href="javascript: void(0);" style="width:100%;">  '
		+'			<img style="height:'+img_height+'px;" src="'+url+'">'
		+'		</a>'
		+'	</div>';
	//左边div下加上子div
	$(module.children()[ind]).find(".swiper-wrapper").append(left);
	var left2 = '<li class="adimgbig imageAd'+imageAd_count+'" id="imageAd'+imageAd_count+'"><img src="'+url+'"></li>'
	
	/*左边的ul下加上li*/
	//默认的li隐藏
	$(module.children()[ind]).find("ul.custom-image #adimgDefaultLi").css("display","none");
	//追加上新的
	$(module.children()[ind]).find("ul.custom-image").append(left2);
	
	
	//左边的折叠轮播div超过1个时，显示轮播div
	var leftlength = $(module.children()[ind]).find(".swiper-wrapper").children("div").length;
	if(leftlength>1){
		$(module.children()[ind]).find("div.swiper-pagination").css("display","block");
		//左边的折叠轮播div大于等于3时，增加下面的小圆点的数量（就是增加一个div）
		if(leftlength>=3){
			$(module.children()[ind]).find("div.swiper-pagination")
			.append('<span class="swiper-pagination-switch" id="imageAd'+imageAd_count+'"></span>');
		}
	}
	
	//获取显示方式单选框，选中的按钮的值
	var num = $(modality.children()[ind]).find("input[name='show_method']:checked").val();
	if(num=="0"){
		//左边div显示，ul隐藏
		$(module.children()[ind]).find(".swiper-wrapper").css("display","block");
		$(module.children()[ind]).find("ul.custom-image").css("display","none");
		
	}else if(num=="1"){
		//左边ul显示，div隐藏
		$(module.children()[ind]).find(".swiper-wrapper").css("display","none");
		$(module.children()[ind]).find("ul.custom-image").css("display","block");
		var size = $(modality.children()[ind]).find("input[name='size']:checked").val();
		//大图0
		if(size=="0"){
			//console.log("aa")
			$(module.children()[ind]).find("ul.custom-image .custom-image-small").removeClass("custom-image-small").addClass("adimgbig");
		}
		//小图1
		else if(size=="1"){
			//console.log("bb");
			$(module.children()[ind]).find("ul.custom-image .adimgbig").addClass("custom-image-small").removeClass("adimgbig");
		}
	}


}




//弹出选择微页面及分类的列表
function chooseWebpageImageAd(obj,flag){
	var controls = "";
	//获得变化的div
	if(flag=="0"){
		controls = $(obj).parent().parent().parent().parent();
	}else if(flag=="1"){
		controls = $(obj).parent().parent().parent().parent().parent();
	}
	//获得变化的div的id
	var id = controls.attr("id");
	//获得id的_后面的数字
	var num  = id.substr(id.lastIndexOf('_')+1);
	var ind=$(obj).parents("div.app-sidebar").index();
	
	layui.use(['form','element'], function(){ 
	  var form = layui.form(),
		  element = layui.element(),
		  layer = layui.layer;
	      form.render();
		  parent.layer.open({
			  title:"",
			  type: 2,
			  id:100,
			  area: ['800px', '500px'],
			  content: getRootPath()+'/commons/jsp/com_pageinfoChooseTab.jsp?num='+num+'&leixing=pageinfoOfImageAd&ind='+ind
		  });

	})
}



//弹出选择商品及分类的列表
function chooseGoodsAndGroupImageAd(obj,flag){
	var controls = "";
	//获得变化的div
	if(flag=="0"){
		controls = $(obj).parent().parent().parent().parent();
	}else if(flag=="1"){
		controls = $(obj).parent().parent().parent().parent().parent();
	}
	//获得变化的div的id
	var id = controls.attr("id");
	//获得id后面的数字
	var num  = id.substr(id.lastIndexOf('_')+1);
	var ind=$(obj).parents("div.app-sidebar").index();
	
	layui.use(['form','element'], function(){ 
	  var form = layui.form(),
		  element = layui.element(),
		  layer = layui.layer;
	      form.render();
		  parent.layer.open({
			  title:"",
			  type: 2,
			  area: ['800px', '530px'],
			  content: getRootPath()+'/commons/jsp/com_goodsAndGroupChooseTab.jsp?num='+num+'&leixing=goodsOfImageAd&ind='+ind
		  });

	})
}




//修改时点击叉号删除
function deleteUpdateImageAd(obj){
	//获得div
	var controls = $(obj).parent().parent().parent();
	//清空内容
	controls.empty();
	//追加上原有的内容
	var str = 
		'<div class="dropdown hover">'
    	+'	<a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:;">设置链接到的页面地址 <i class="caret"></i></a>'
    	+'	<ul class="dropdown-menu">'
    	+'	<li>'
    	+'		<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageImageAd(this,0)">微页面</a>'
    	+'	</li>'
    	+'	<li>'
    	+'		<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupImageAd(this,0)">商品</a>'
    	+'	</li>'
    	+'  <li>'
        +'      <a class="js-modal-links" data-type="links"  href="javascript:void(0);">自定义外链</a>'
        +'  </li>'
    	+'	</ul>'
    	+'	</div>'
    	+'<input type="hidden" name="link_url">'
    
    controls.html(str);
}



//点击叉号删除右边一个li,左边也同时删除相应元素
function deleteImageAdLi(obj){
	var ind = $(obj).parents("div.app-sidebar").index();
	var thisli = $(obj).parent().parent();
	//获得当前li的id
	var id = thisli.attr("id");
	//删除左边的div，以及li，以及下面的小圆点
	$(module.children()[ind]).find("[id="+id+"]").remove();
	//删除右边的li
	thisli.remove();
	
	//左边新增的折叠轮播div全部删除时
	var leftlength = $(module.children()[ind]).find(".swiper-wrapper").children("div").length;
	if(leftlength==0){
		//显示那个默认图片	
		$(module.children()[ind]).find(".swiper-wrapper >img").css("display","block");
		//改变div高度
		$(module.children()[ind]).find(".swiper-container").css("height","100px");
	}
	//左边的折叠轮播div小于等于1个时，隐藏轮播div
	else if(leftlength<=1){
		$(module.children()[ind]).find("div.swiper-pagination").css("display","none");
	}

	//左边的ul下的新增的li全部删除时
	var leftlilength = $(module.children()[ind]).find("ul.custom-image").children().length;
	if(leftlilength<=1){
		//显示那个默认图片	
		$(module.children()[ind]).find("ul.custom-image #adimgDefaultLi").css("display","block");
	}
}



//标题变化事件
function addTitleOfImageAd(obj){
	var title = $(obj).val();
	var ind = $(obj).parents("div.app-sidebar").index();
	//获得要操作元素的id
	var changeid = $(obj).parent().parent().parent().parent().attr("id");
	//左边的div下面加上h3,li下面也加上h3
	if(title==""){
		$(module.children()[ind]).find("#"+changeid+" h3").remove();
	}else{
		$(module.children()[ind]).find("div#"+changeid+" a").prepend("<h3 class='title' style='margin:0;'>"+title+"</h3>");
		$(module.children()[ind]).find("li#"+changeid+"").prepend("<h3 class='title' style='margin:0;>"+title+"</h3>");
	}
	
}
//链接到  显示
$(modality).on("mouseenter","div.js-choices-region .control-group div.dropdown",function(){
	$(this).children(".dropdown-menu").show();
});
//链接到  隐藏
$(modality).on("mouseleave","div.js-choices-region .control-group div.dropdown",function(){
	$(this).children(".dropdown-menu").hide();
});



//点击确定
function imageAd_wl_queding(obj,jishu){
	//获得文本框中的值
	var lianjie = $(obj).prev().val();
	var ind=$(obj).parents("div.app-sidebar").index();
	//alert(lianjie);
	if(""!=lianjie){
		var str = 
			'	<div class="control-action clearfix">'
			+'	<div class="pull-left js-link-to link-to">'
			+'		<a href="'+lianjie+'" target="_blank" class="new-window link-to-title" >'
			+'			<span class="label label-success">'
			+'				  外链'
			+'				<em class="link-to-title-text">'+lianjie+'</em>'
			+'			</span>'
			+'		</a>'
			+'		<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateImageAd(this)">×</a>'
			+'	</div>'
			+'	<div class="dropdown hover pull-right">'
			+'	<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
			+'		<ul class="dropdown-menu">'
			+'		<li>'
			+'		<a class="js-modal-magazine" data-type="feature" href="javascript:void(0);" onclick="chooseWebpageImageAd(this,1)">微页面</a>'
			+'		</li>'
			+'		<li>'
			+'		<a class="js-modal-goods" data-type="goods" href="javascript:void(0);" onclick="chooseGoodsAndGroupImageAd(this,1)">商品</a>'
			+'		</li>'
			+'      <li>'
	        +'      <a class="js-modal-links" data-type="links"  href="javascript:void(0);">自定义外链</a>'
	        +'      </li>'
			+'		</ul>'
			+'	</div>'
			+'	</div>'
			+'	<input type="hidden" name="link_url" value="'+lianjie+'">'
		
			//改变原来div中的内容
			$("#imageAdControls_"+jishu).html(str);
			//获得div的父级li的id
			var liid = $("#imageAdControls_"+jishu).parent().parent().parent().attr("id");
			//左边div下的a加上链接
			$(module.children()[ind]).find(".swiper-wrapper div[id='"+liid+"'] a").attr("href",lianjie);
			//左边li加上onclick
			$(module.children()[ind]).find("ul.custom-image li[id='"+liid+"']").attr("onclick","isWeiXinOut('"+lianjie+"')"); 
			
	}
	//关闭外链窗口
	$(obj).parents(".popover-inner").hide();
}

