//全局变量
var showcase_count = 0;
var showcase = function (){
	this.left = 
		'	<div class="app-field clearfix editing module_div">'
		+'		<div class="control-group">'
		+'		<div class="custom-showcase-wrap custom-showcase-wrap-0">'
		+'		<div class="custom-showcase-wrap-title" style="display:none"></div>'
		+'			<div class="custom-showcase-body ">'
		+'				<ul class="custom-showcase clearfix">'
		+'					<li class="custom-showcase-big" id="showcaseli'+showcase_count+'">'
		+'						<a href="javascript:void(0);"><img src = '+getRootPath()+'/pages/webstore/webpage/image/showcase1.jpg></a>'
		+'					</li>'
		+'					<li class="custom-showcase-small" id="showcaseli'+(showcase_count+1)+'">'
		+'						<a href="javascript:void(0);"><img src = '+getRootPath()+'/pages/webstore/webpage/image/showcase2.jpg></a>'
		+'					</li>'
		+'					<li class="custom-showcase-small" id="showcaseli'+(showcase_count+2)+'">'
		+'						<a href="javascript:void(0);"><img src = '+getRootPath()+'/pages/webstore/webpage/image/showcase3.jpg></a>'
		+'					</li>'
		+'				</ul>'
		+'				<div class="custom-showcase-body-title text-center" style="display:none"></div>'
		+'				<p class="custom-showcase-body-desc text-center" style="display:none"></p>'	
		+'			</div>'
		+'		</div>'
		+'		<div class="component-border"></div>'
		+'	</div>'
		+'	<div class="actions">'
		+'		<div class="actions-wrap">'
		//+'		  <span class="action edit">编辑</span>'
		//+'		  <span class="action add">加内容</span>'
		+'		 	  <span class="action delete">删除</span>'
		+'		</div>'
		+'	</div>'
		+'	<div class="sort">'
		+'		<i class="sort-handler"></i>'
		+'	</div>'
		+'	</div>'
		
		
	this.right = 
		'	<div class="app-sidebar">'
		+'		<div class="arrow"></div>'
		+'		<div class="app-sidebar-inner js-sidebar-region">'
		+'		<div>'
		+'		<form class="form-horizontal" novalidate="">'
		+'		<div class="control-group">'
		+'			<label class="control-label">橱窗标题名：</label>'
		+'			<div class="controls" style="margin-left: 10px;">'
		+'				<input type="text" name="title" value="" maxlength="15">'
		+'			</div>'
		+'		</div>'
		+'		<div class="control-group">'
		+'			<label class="control-label">显示方式：</label>'
		+'			<div class="controls" style="margin-left: 10px;">'
		+'				<label class="radio inline">'
		+'					<input type="radio" name="mode" value="0" checked="">默认'
		+'				</label>'
		+'				<label class="radio inline">'
		+'					<input type="radio" name="mode" value="1">3 列'
		+'				</label>'
		+'				<p class="help-desc">PC版一直显示 3 列</p>'
		+'			</div>'
		+'		</div>'
		+'		<div class="control-group">'
		+'			<label class="control-label">图片间隙：</label>'
		+'			<div class="controls" style="margin-left: 10px;">'
		+'				<label class="radio inline">'
		+'					<input type="radio" name="without_space" value="0" checked="">保留'
		+'				</label>'
		+'				<label class="radio inline">'
		+'					<input type="radio" name="without_space" value="1">消除'
		+'				</label>'
		+'			</div>'
		+'		</div>'
		+'		<div class="control-group">'
		+'			<label class="control-label">内容区标题：</label>'
		+'			<div class="controls" style="margin-left: 10px;">'
		+'				<input type="text" name="body_title" value="" maxlength="15">'
		+'			</div>'
		+'		</div>'
		+'		<div class="control-group">'
		+'			<label class="control-label">内容区说明：</label>'
		+'			<div class="controls" style="margin-left: 10px;">'
		+'				<textarea name="body_desc" cols="15" rows="3" maxlength="50"></textarea>'
		+'			</div>'
		+'		</div>'
		+'		<div class="control-group js-collection-region">'
		+'		<ul class="choices ui-sortable" style="margin:0">'
		+'			<li class="choice" id="showcaseli'+showcase_count+'">'
		+'			<div class="choice-image">'
		+'			<a class="add-image js-trigger-image" href="javascript:;" onclick="addShowcasePho(1,this)"><i class="icon-add"></i>添加图片</a>'
		+'			<!-- for error msg -->'
		+'			<div class="control-group">'
		+'				<div class="controls">'
		+'					<input type="hidden" name="image_url">'
		+'				</div>'
		+'			</div>'
		+'			</div>'
		+'			<div class="choice-content" >'
		/*+'			<div class="control-group hide">'
		+'				<label class="control-label">文字：</label>'
		+'				<div class="controls">'
		+'					<input class="input-xxlarge" type="text" name="title" value="" maxlength="5">'
		+'				</div>'
		+'			</div> '*/
		+'			<div class="control-group" style="width: 260px;">'
		+'				<label class="control-label">链接：</label>'
		+'				<div class="controls" style="margin-left: 10px;" id="showcaseControls_'+showcase_count+'">'
		+'					<input type="hidden" name="link_url">'
		+'				<div class="dropdown hover">'
		+'				<a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:;">设置链接到的页面地址 <i class="caret"></i></a>'
		+'					<ul class="dropdown-menu">'
		+'					<li>'
		+'					<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageShowcase(this,0)">微页面</a>'
		+'					</li>'
		+'					<li>'
		+'					<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupShowcase(this,0)">商品</a>'
		+'					</li>'
		+'       			<li>'
        +'         				<a class="js-modal-links" data-type="links" href="javascript:void(0);">自定义外链</a>'
        +'       			</li>'
		+'					</ul>'
		+'			     	</div>'
		+'					</div>'
		+'				</div>'
		+'			  </div>'
		+'  		<div class="popover-inner popover-link" style="width:330px;position: absolute;top: 105px;display:none;z-index:100;">'
        +'  			<div class="popover-content">'
        +'      			<div class="form-inline">'
        +'          			<input type="text" class="link-placeholder js-link-placeholder" placeholder="链接地址：http://example.com">'
        +'          			<button type="button" class="btn btn-primary js-btn-confirm" style="color:#fff;background:#0080ed;" '
        +'							onclick=showcase_wl_queding(this,"'+showcase_count+'") data-loading-text="确定"> 确定</button>'
        +'          			<button type="reset" class="btn js-btn-cancel" onclick="mf_wl_quxiao(this)">取消</button>'
        +'      			</div>'
        +'  			</div>'
        +'			</div>'
		+'			</li>'
		+'			<li class="choice" id="showcaseli'+(showcase_count+1)+'">'
		+'			<div class="choice-image">'
		+'			<a class="add-image js-trigger-image" href="javascript:;" onclick="addShowcasePho(1,this)"><i class="icon-add"></i>添加图片</a>'
		+'			<!-- for error msg -->'
		+'			<div class="control-group">'
		+'				<div class="controls">'
		+'					<input type="hidden" name="image_url">'
		+'				</div>'
		+'			  </div>'
		+'			</div>'
		+'			<div class="choice-content">'
		/*+'			<div class="control-group hide">'
		+'					<label class="control-label">文字：</label>'
		+'					<div class="controls">'
		+'						<input class="input-xxlarge" type="text" name="title" value="" maxlength="5">'
		+'					</div>'
		+'				</div>'*/
		+'		<div class="control-group" style="width: 260px;">'
		+'			<label class="control-label">链接：</label>'
		+'			<div class="controls" style="margin-left: 10px;" id="showcaseControls_'+(showcase_count+1)+'">'
		+'			<input type="hidden" name="link_url">'
		+'			<div class="dropdown hover">'
		+'			<a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>'
		+'			<ul class="dropdown-menu">'
		+'			<li>'
		+'			<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageShowcase(this,0)">微页面</a>'
		+'			</li>'
		+'			<li>'
		+'			<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupShowcase(this,0)">商品</a>'
		+'			</li>'
		+'       	<li>'
        +'         		<a class="js-modal-links" data-type="links" href="javascript:void(0);">自定义外链</a>'
        +'       	</li>'
		+'			</ul>'
		+'			</div>'
		+'			</div>'
		+'			</div>'
		+'		   </div>'
		+'  		<div class="popover-inner popover-link" style="width:330px;position: absolute;top: 105px;display:none;z-index:100;">'
        +'  			<div class="popover-content">'
        +'      			<div class="form-inline">'
        +'          			<input type="text" class="link-placeholder js-link-placeholder" placeholder="链接地址：http://example.com">'
        +'          			<button type="button" class="btn btn-primary js-btn-confirm" style="color:#fff;background:#0080ed;" '
        +'							onclick=showcase_wl_queding(this,"'+(showcase_count+1)+'") data-loading-text="确定"> 确定</button>'
        +'          			<button type="reset" class="btn js-btn-cancel" onclick="mf_wl_queding(this)">取消</button>'
        +'      			</div>'
        +'  			</div>'
        +'			</div>'
		+'	    </li>'
		+'		<li class="choice" id="showcaseli'+(showcase_count+2)+'">'
		+'		<div class="choice-image">'
		+'		<a class="add-image js-trigger-image" href="javascript:;" onclick="addShowcasePho(1,this)"><i class="icon-add"></i> 添加图片</a>'
		+'		<!-- for error msg -->'
		+'		<div class="control-group">'
		+'			<div class="controls">'
		+'				<input type="hidden" name="image_url">'
		+'			</div>'
		+'		 </div>'
		+'	     </div>'
		+'		<div class="choice-content">'
		/*+'		<div class="control-group hide">'
		+'			<label class="control-label">文字：</label>'
		+'			<div class="controls">'
		+'				<input class="input-xxlarge" type="text" name="title" value="" maxlength="5">'
		+'			</div>'
		+'		</div>'
		*/
		+'		<div class="control-group" style="width: 260px;">'
		+'			<label class="control-label">链接：</label>'
		+'			<div class="controls" style="margin-left: 10px;"  id="showcaseControls_'+(showcase_count+2)+'">'
		+'				<input type="hidden" name="link_url">'
		+'		<div class="dropdown hover">'
		+'			<a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:;">设置链接到的页面地址 <i class="caret"></i></a>'
		+'			<ul class="dropdown-menu">'
		+'			<li>'
		+'				<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageShowcase(this,0)">微页面</a>'
		+'			</li>'
		+'			<li>'
		+'				<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupShowcase(this,0)">商品</a>'
		+'			</li>'
		+'       	<li>'
        +'         		<a class="js-modal-links" data-type="links" href="javascript:void(0);">自定义外链</a>'
        +'       	</li>'
		+'			</ul>'
		+'		</div>'
		+'		</div>'
		+'		</div>'
		+'	    </div>'
		+'   	<div class="popover-inner popover-link" style="width:330px;position: absolute;top: 105px;display:none;z-index:100;">'
        +'  		<div class="popover-content">'
        +'      		<div class="form-inline">'
        +'          		<input type="text" class="link-placeholder js-link-placeholder" placeholder="链接地址：http://example.com">'
        +'          		<button type="button" class="btn btn-primary js-btn-confirm" style="color:#fff;background:#0080ed;" '
        +'						onclick=showcase_wl_queding(this,"'+(showcase_count+2)+'") data-loading-text="确定"> 确定</button>'
        +'          		<button type="reset" class="btn js-btn-cancel" onclick="mf_wl_queding(this)">取消</button>'
        +'      		</div>'
        +'  		</div>'
        +'		</div>'
		+'	    </li>'
		+'	</ul>'
		+'	</div>'
		+'	</form>'
		+'	</div>'
		+'	</div>'
		+'	</div>'
		showcase_count+=3;
}


//显示方式切换事件
$(modality).on("click","input[name='mode']:nth(0)",function(){
    var ind=$(this).parents("div.app-sidebar").index();
    $(module.children()[ind]).find(".custom-showcase-wrap").attr("class","custom-showcase-wrap custom-showcase-wrap-0");
    $(this).attr("checked",true);
    $("input[name='mode']:nth(1)").attr("checked",false);
});

$(modality).on("click","input[name='mode']:nth(1)",function(){
    var ind=$(this).parents("div.app-sidebar").index();
    $(module.children()[ind]).find(".custom-showcase-wrap").attr("class","custom-showcase-wrap custom-showcase-wrap-1");
    $(this).attr("checked",true);
    $("input[name='mode']:nth(0)").attr("checked",false);
});


//图片间隙切换事件
$(modality).on("click","input[name='without_space']",function(){
	var ind=$(this).parents("div.app-sidebar").index();
    var txt=$(this).val();
    //保留
    if(txt=="0"){
    	$(module.children()[ind]).find(".custom-showcase-body").removeClass("custom-showcase-without-space");
    	$(this).attr("checked",true);
    	$("input[name='without_space']:nth(1)").attr("checked",false);
    }
    //消除
    else if(txt=="1"){
    	$(module.children()[ind]).find(".custom-showcase-body").addClass("custom-showcase-without-space");
    	$(this).attr("checked",true);
    	$("input[name='without_space']:nth(0)").attr("checked",false);
    }
});



//橱窗标题名blur事件
$(modality).on("blur","input[name='title']",function(){
	var ind=$(this).parents("div.app-sidebar").index();
    var txt=$(this).val();
    if(txt==""){
    	$(module.children()[ind]).find(".custom-showcase-wrap-title").empty();
    	$(module.children()[ind]).find(".custom-showcase-wrap-title").css("display","none");
    }else{
    	$(module.children()[ind]).find(".custom-showcase-wrap-title").css("display","block");
    	$(module.children()[ind]).find(".custom-showcase-wrap-title").html(txt);
    }
    $(this).attr("value",txt);
});


//内容区标题blur事件
$(modality).on("blur","input[name='body_title']",function(){
	var ind=$(this).parents("div.app-sidebar").index();
    var txt=$(this).val();
    if(txt==""){
    	$(module.children()[ind]).find(".custom-showcase-body-title").empty();
    	$(module.children()[ind]).find(".custom-showcase-body-title").css("display","none");
    }else{
    	$(module.children()[ind]).find(".custom-showcase-body-title").css("display","block");
    	$(module.children()[ind]).find(".custom-showcase-body-title").html(txt);
    }
    $(this).attr("value",txt);
});



//内容区说明blur事件
$(modality).on("blur","textarea[name='body_desc']",function(){
	var ind=$(this).parents("div.app-sidebar").index();
    var txt=$(this).val();
    if(txt==""){
    	$(module.children()[ind]).find(".custom-showcase-body-desc").empty();
    	$(module.children()[ind]).find(".custom-showcase-body-desc").css("display","none");
    }else{
    	$(module.children()[ind]).find(".custom-showcase-body-desc").css("display","block");
    	$(module.children()[ind]).find(".custom-showcase-body-desc").html(txt);
    }
    $(this).text(txt);
});


/**
 * 调用共用图片选择弹出框
 * @param b_fun     图片选择后的回调父页面的方法名称(回调方法中的参数是图片数组记录图片的url)
 * @param mutl_type 图片弹出框里的图片是否可以多选  1 单选  2多选
 */
function addShowcasePho(mutl_type,obj){
	//获得其父li的id
	var id  = $(obj).parent().parent().attr("id");
	parent.layer.open({
		  title: ''
		  ,type:2
		  ,closeBtn: 1
		  ,area:["860px","530px"]
		  ,content:getRootPath()+'/commons/jsp/com_pho.jsp?mutl_type='+mutl_type+'&liId='+id+'&b_fun=query_showcasepho'   
		});
}




//获取图片选择页面传入的图片数组，插入到图片
function query_showcasepho(urlArr,liId){
	if( urlArr.length>0){
		for(var i=0;i<urlArr.length;i++){
			var url=urlArr[i];
			insert_showcasepho(url,liId);
		}
	}
}

//插入图片
function insert_showcasepho(url,liId){
	var str = 
		'    <img src="'+url+'" width="118" height="118" class="thumb-image">'
		+'    <a class="modify-image js-trigger-image" style="color:#fff" href="javascript: void(0);" onclick="addShowcasePho(1,this)">重新上传</a>'
		+'	  <div class="control-group">'
		+'		<div class="controls">'
		+'			<input type="hidden" name="image_url" value="'+url+'"> '
		+'		</div>'
		+'	  </div>'

	//右边替换为选择的图片
	$("#"+liId+" .choice-image").html(str);
	//左边替换为选择的图片
	$("#"+liId).find("img").attr("src",url);
}



//弹出选择微页面及分类的列表
function chooseWebpageShowcase(obj,flag){
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
			  content: getRootPath()+'/commons/jsp/com_pageinfoChooseTab.jsp?num='+num+'&leixing=pageinfoOfShowcase'
		  });

	})
}


//弹出选择商品及分类的列表
function chooseGoodsAndGroupShowcase(obj,flag){
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
	
	layui.use(['form','element'], function(){ 
	  var form = layui.form(),
		  element = layui.element(),
		  layer = layui.layer;
	      form.render();
		  parent.layer.open({
			  title:"",
			  type: 2,
			  area: ['800px', '530px'],
			  content: getRootPath()+'/commons/jsp/com_goodsAndGroupChooseTab.jsp?num='+num+'&leixing=goodsOfShowcase'
		  });
	})
}




//修改时点击叉号删除
function deleteUpdateShowcase(obj){
	//获得div
	var controls = $(obj).parent().parent().parent();
	//清空内容
	controls.empty();
	//追加上原有的内容
	var str = 
		'<div class="dropdown hover">'
    	+'	<a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>'
    	+'	<ul class="dropdown-menu">'
    	+'	<li>'
    	+'		<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageShowcase(this,0)">微页面</a>'
    	+'	</li>'
    	+'	<li>'
    	+'		<a class="js-modal-goods" data-type="goods" href="javascript:;"  onclick="chooseGoodsAndGroupShowcase(this,0)">商品</a>'
    	+'	</li>'
    	+'  <li>'
        +'      <a class="js-modal-links" data-type="links"  href="javascript:void(0);">自定义外链</a>'
        +'  </li>'
    	+'	</ul>'
    	+'</div>'
    	+'<input type="hidden" name="link_url">'
    
    controls.html(str);
}





//外链点击确定
function showcase_wl_queding(obj,jishu){
	//获得文本框中的值
	var lianjie = $(obj).prev().val();
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
			+'	<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateShowcase(this)">×</a>'
			+'	</div>'
			+'	<div class="dropdown hover pull-right">'
			+'	<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
			+'		<ul class="dropdown-menu">'
			+'		<li>'
			+'		<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageShowcase(this,1)">微页面</a>'
			+'		</li>'
			+'		<li>'
			+'		<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupShowcase(this,1)">商品</a>'
			+'		</li>'
			+'      <li>'
	        +'      <a class="js-modal-links" data-type="links"  href="javascript:void(0);">自定义外链</a>'
	        +'      </li>'
			+'		</ul>'
			+'	</div>'
			+'	</div>'
			+'	<input type="hidden" name="link_url" value="'+lianjie+'">'
		
			//改变原来div中的内容
			$("#showcaseControls_"+jishu).html(str);
			//获得当前父级li的id
			var liid = $("#showcaseControls_"+jishu).parent().parent().parent().attr("id");
			//改变左边的li对象下的a的href
			$("#"+liid).find("a").attr("href",lianjie);
			
	}
	//关闭外链窗口
	$(obj).parents(".popover-inner").hide();
}

