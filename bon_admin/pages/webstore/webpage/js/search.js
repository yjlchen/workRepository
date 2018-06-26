
var search = function (){
	this.left = 
		'	<div class="app-field clearfix editing module_div">'
		+'	<div class="control-group">'
		+'		<div class="custom-search" style="background-color: #f8f8f8">'
		+'			<form action=""> '
		+'				<input type="text" class="custom-search-input"  placeholder="搜索商品" disabled="">'
		+'  			<input type="button" class="custom-search-button" style="width: 22px;" >'
		+'			</form>'
		+'		</div>'
		+'		<div class="component-border"></div>'
		+'	</div>'
		+'	<div class="actions">'
		+'		<div class="actions-wrap">'
		//+'			<span class="action edit">编辑</span>'
		//+'			<span class="action add">加内容</span>'
		+'			<span class="action delete">删除</span>'
		+'		</div>'
		+'	</div>'
		+'	<div class="sort">'
		+'		<i class="sort-handler"></i>'
		+'	</div>'
		+'	</div>'



	this.right =
		'	<div class="app-sidebar">'
		+'		<div class="arrow"></div>'
		+'			<div class="app-sidebar-inner js-sidebar-region">'
		+'				<div class="edit-search">'
		+'				<div class="form-horizontal" novalidate="">'
		+'				<div class="control-group">'
		+'					<label class="control-label">背景色：</label>'
		+'					<div class="controls" style="margin-left: 10px;">'
		+'						<input type="color" value="#f8f8f8" name="color">'
		+'						<button class="btn js-reset-bg" type="button">重置</button>'
		+'					</div>'
		+'				</div>'
		+'			</div>'
		+'		</div>'
		+'	</div>'
		+'	</div>'
}



	//右边颜色选择
	$(modality).on("change","input[name='color']",function(){
	    var ind = $(this).parents("div.app-sidebar").index();
	    //改变左边的背景色
	    $(module.children()[ind]).find(".custom-search").css("background-color",$(this).val());
	    $(this).attr("value",$(this).val());
	});
	
	
	//右边颜色重置
	$(modality).on("click",".js-reset-bg",function(){
	    var ind=$(this).parents("div.app-sidebar").index();
	    $(module.children()[ind]).find(".custom-search").css("background-color","#f8f8f8");
	    $(this).prev().attr("value","#f8f8f8");
	});


