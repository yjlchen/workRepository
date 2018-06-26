
var line=function (){
    this.left = 
		'	<div class="app-field clearfix editing module_div">'
		+'	<div class="control-group">'
		+'		<div class="custom-line-wrap" style="margin: 0 ">'
		+'			<div class="custom-line"  style="height: 0px; border: none; border-top: 1px solid #e5e5e5"></div> '
		+'		</div>'
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
		'<div class="app-sidebar">'
        +'<div class="arrow"></div>'
		+'	<div class="app-sidebar-inner js-sidebar-region" >'
		+'	  <div class="edit-search"><div class="form-horizontal" novalidate="">'
		+'		<div class="control-group">'
		+'			<div class="pull-left">'
		+'				<label class="control-label">颜色：</label>'
		+'				<div class="input-append">'
		+'					<input type="color" value="#e5e5e5" name="color" class="span1">'
		+'					<button class="btn js-reset-bg" type="button">重置</button>'
		+'				</div>'
		+'			</div>'
		+'			<div class="pull-left">'
		+'				<label class="control-label"></label>'
		+'				<label class="checkbox inline">'
		+'					<input type="checkbox" name="hasPadding"> 左右留边'
		+'				</label>'
		+'			</div>'
		+'		</div>'
		+'		<div class="control-group">'
		+'			<label class="control-label">样式：</label>'
		+'			<div class="controls" style="margin-left: 10px;">'
		+'				<label class="radio inline">'
		+'					<input type="radio" name="lineType" value="solid" checked="">实线'
		+'				</label>'
		+'				<label class="radio inline">'
		+'					<input type="radio" name="lineType" value="dashed">虚线 '
		+'				</label>'
		+'				<label class="radio inline">'
		+'					<input type="radio" name="lineType" value="dotted">点线 '
		+'				</label>'
		+'			</div> '
		+'		</div>'
		+'	</div>'
		+'	</div></div></div>'
	
}



		//右边颜色选择
		$(modality).on("change","input[name='color']",function(){
	        var ind=$(this).parents("div.app-sidebar").index();
	        $(module.children()[ind]).find(".control-group .custom-line-wrap .custom-line").css("border-top-color",$(this).val());
	        $(this).attr("value",$(this).val());
		});
		
		
		//右边颜色重置
		$(modality).on("click",".js-reset-bg",function(){
	        var ind=$(this).parents("div.app-sidebar").index();
	        $(module.children()[ind]).find(".control-group .custom-line-wrap .custom-line").css("border-top-color","#e5e5e5");
	        $(this).prev().attr("value","#e5e5e5");
		});
		
		
		//左右留边点击事件，父元素样式切换
		$(modality).on("click","input[name='hasPadding']",function(){
	        var ind=$(this).parents("div.app-sidebar").index();
	        $(module.children()[ind]).find(".control-group .custom-line-wrap").toggleClass('left-right-margin');
	        //让多选框选中或不选中
	        if($(this).is(':checked')==true){
	        	$(this).attr("checked",true);
	        }else if($(this).is(':checked')==false){
	        	$(this).attr("checked",false);
	        }
		});
		
		
		//样式单选按钮点击事件
		//实线
		$(modality).on("click","input[name='lineType']:nth(0)",function(){
	        var ind=$(this).parents("div.app-sidebar").index();
	        $(module.children()[ind]).find(".control-group .custom-line-wrap .custom-line").css("border-top-style","solid");
	        $(this).attr("checked",true);
	        $("input[name='lineType']:nth(1)").attr("checked",false);
	        $("input[name='lineType']:nth(2)").attr("checked",false);
		});
		
		//虚线
		$(modality).on("click","input[name='lineType']:nth(1)",function(){
	        var ind=$(this).parents("div.app-sidebar").index();
	        $(module.children()[ind]).find(".control-group .custom-line-wrap .custom-line").css("border-top-style","dashed");
	        $(this).attr("checked",true);
	        $("input[name='lineType']:nth(0)").attr("checked",false);
	        $("input[name='lineType']:nth(2)").attr("checked",false);
		});
		
		//点线
		$(modality).on("click","input[name='lineType']:nth(2)",function(){
	        var ind=$(this).parents("div.app-sidebar").index();
	        $(module.children()[ind]).find(".control-group .custom-line-wrap .custom-line").css("border-top-style","dotted");
	        $(this).attr("checked",true);
	        $("input[name='lineType']:nth(0)").attr("checked",false);
	        $("input[name='lineType']:nth(1)").attr("checked",false);
		});
			
			  
		
