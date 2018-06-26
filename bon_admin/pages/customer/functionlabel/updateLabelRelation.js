var id = getUrlParam("id");
var lable_name = getUrlParam("name");
lable_name = reconvert(lable_name)
/*console.log(lable_name)*/
$(function() {
	initData();
	initEvent();
	$("#lable-name").text(lable_name)
})

function initEvent() {
	$("#commit").click(function() {
		subForm();
	});
}
function initData() {
	// 初始化下拉标签
	$
			.ajax({
				url : getRootPath() + '/functionLabel/rankFourLabel.action',
				type : 'POST',
				async : false,
				dataType : 'json',
				success : function(data) {
					console.log(data)
					if (isNotEmpty(data)) {
						for (var i = 0; i < data.length; i++) {
							var gindex = data[i];
							var id = gindex.id;
							var name = gindex.name;
							$("#label_id").append(
									"<option value='" + id + "'>" + name
											+ "</option>");
						}
						// 原因是$.browser这个api从jQuery1.9开始就正式废除，js代码里只要用到$.browser就会报这个错
						// 具体的解决方法：注意确保下面代码的加载顺序在jQuery文件之后，$.browser的代码之前。
						jQuery.browser = {};
						(function() {
							jQuery.browser.msie = false;
							jQuery.browser.version = 0;
							if (navigator.userAgent.match(/MSIE ([0-9]+)./)) {
								jQuery.browser.msie = true;
								jQuery.browser.version = RegExp.$1;
							}
						})();
						// 调用chosen插件方法
						$("#label_id").chosen();
						 fillValue();
					}
				}
			});
}

// 填充下拉值

function fillValue() {
	// 填充值
	$.ajax({
		url : getRootPath() + '/functionLabel/queryLableName.action',
		type : 'POST',
		dataType : 'json',
		data : {
			"id" : id,
			"lable_relation_name" : lable_name
		},
		success : function(result) {
			if (result) {
				var data = result.data;
				//console.log(data)
				if (!isNotEmpty(data) || data.length == 0) {
					return;
				}
				// var groupArr=[];
				$.each(data, function(i, n) {
					// groupArr.push(n.group_id);
					$("#label_id" + " option[value='" +n.id + "']").attr('selected', 'selected');
				});
				// 这样可以解决同一select不断动态加载的问题。
				$("#label_id").trigger("liszt:updated");
				// 重新调用chosen插件方法
				$("#label_id").chosen();
			}
		}
	});
}
function subForm() {
	disable_submit(true, 'commit');
	// 标签集合
	layui
			.use(
					[ 'form', 'element', 'layer', 'laydate' ],
					function() {
						var layer = layui.layer, form = layui.form(), laydate = layui.laydate, element = layui.element;
						var jsonlabels = '[';
						var c_label = $("#label_id").val();
						if (c_label != null && c_label.length > 0) {
							for ( var index in c_label) {
								var label_id = c_label[index];
								var tbody = '{';
								tbody += '"label_id":"' + id;
								tbody += '","label_relation_id":"' + label_id;
								tbody += '","label_relation_name":"'
										+ $(
												"#label_id option[value="
														+ label_id + "]")
												.text();
								tbody += '"}';
								if (jsonlabels.length > 2) {
									jsonlabels += ',' + tbody;
								} else {
									jsonlabels += tbody;
								}
							}
						} else {
							jsonlabels += '{';
							jsonlabels += '"label_id":"' + id;
							jsonlabels += '"}';
						}
						jsonlabels += ']';
						//console.log("jsonlabels:" + jsonlabels)
						$
								.ajax({
									url : getRootPath()
											+ '/functionLabel/updateLabelRelation.action',
									type : 'POST',
									dataType : 'TEXT',
									data : {
										infoJsonStr : jsonlabels
									},
									async : false,
									success : function(result) {
										if ("success" == result) {
											parent.layer.msg('操作成功', {
												icon : 1,
												time : 500
											// （如果不配置，默认是3秒）
											}, function() {
												window.parent.query();
												parent.layer.closeAll();
											});
										} else {
											parent.layer.msg('操作失败，请重试', {
												icon : 1,
												time : 1000
											// （如果不配置，默认是3秒）
											});
											disable_submit(false, 'commit');
										}
									},
									error : function() {
										parent.layer.msg('操作失败，请重试', {
											icon : 1,
											time : 1000
										// （如果不配置，默认是3秒）
										});
										disable_submit(false, 'commit');
									}
								});
					})
					

}