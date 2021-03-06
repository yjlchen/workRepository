/**
 * 我的文件的js
 */
var group_id;
$(function() {
	$("#commodity_name").val("");
	group_id = "";
	searchPicPage(""); // 初始数据
	initgroup();//初始化分组的下拉列表
	initgroup1();//初始化修改分组的下拉列表
});

var alldeteid = "";//给全部删除定义变量
var file_group_name = "";//给分组定义变量
var groulength = "";//分组的长度
var form = "";
			layui.use([ 'form', 'layedit', 'laydate', 'jquery', 'laypage',
									'layer', 'upload' ],
							function() {
								form = layui.form(),
								layer = layui.layer,
								layedit = layui.layedit,
								laydate = layui.laydate,
								$ = layui.jquery,
								laypage = layui.laypage;
								
								$('.layui-form-checked span').stop().slideToggle("slow");
		
								// 创建一个编辑器
								var editIndex = layedit.build('LAY_demo_editor');
								// 创建下拉列表组件
								form.on('select(group)', function(data) {
									var group_ids = "{\"group_id\":\"" + data.value+ "\"}";
									$('#group_ids').val(data);//给#group_ids赋值
									alldeteid = data.value;//给批量删除赋值
									//获得被选中的下拉列表的id值
									group_id = data.value;
									//获取被选择分组的名称
									acquireName(group_id);
									//根据被选中的id查询页面
									currentPage=1;
									searchPicPage(data.value);
									//下拉列表被选中后实现上传
									layui.upload({
										url : getRootPath() + '/document/uploadDoc.action?group_ids='+data.value+'&type=video'
										,elem: '#uploadFile' //指定原始元素，默认直接查找class="layui-upload-file"
										,ext: 'mp4|AVI|rmvb'
										,before : function(input) {
										},
										success : function(res) {
											parent.layer.msg('上传成功！', {
												  icon: 1,
												  time: 1000 //（如果不配置，默认是3秒）
												}, function(){
													parent.layer.closeAll();
													searchPicPage(data.value);
												});
										}
									});
									return false;
								});
								//表单验证
								 form.verify({
									 groupname: function(value, item){ //value：表单的值、item：表单的DOM对象
										 	
										   if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
										     return '用户名不能有特殊字符';
										   }
										   if(/(^\_)|(\__)|(\_+$)/.test(value)){
										     return '用户名首尾不能出现下划线\'_\'';
										    }
										    if(/^\d+\d+\d$/.test(value)){
										      return '用户名不能全为数字';
										    }
										    if (value.length < 5) {
												return '标题至少得5个字符啊';
											}
										  }
										}); 
								// 监听指定开关
								form.on('switch(switchTest)', function(data) {
									layer.msg('开关checked：'
											+ (this.checked ? 'true' : 'false'), {
										offset : '6px'
									});
									layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF',
											data.othis)
								});
								// 监听提交
								form.on('submit(formDoc)', function(data) {
									var addDoc = JSON.stringify(data.field);
									$.ajax({
												url : getRootPath()
														+ '/document/addDoc.action',
												type : 'POST',
												dataType : 'TEXT',
												data : {
													addDocForm : addDoc
												},
												success : function(result) {
													if ("success" == result) {
														parent.layer.msg('添加成功！', {
															  icon: 1,
															  time: 1000 //（如果不配置，默认是3秒）
															}, function(){
																parent.layer.closeAll();
																window.setTimeout(window.location.href = getRootPath()+"/pages/webstore/mydoc/myDocument.jsp?type=2",0);
//																window.location.href = getRootPath()+"/pages/webstore/mydoc/myDocument.jsp?type=2";
															});
													} else {
														parent.layer.msg('添加失败！', {
															  icon: 2,
															  time: 1000 //（如果不配置，默认是3秒）
															}, function(){
																parent.layer.closeAll();
																window.location.href = getRootPath()+"/pages/webstore/mydoc/myDocument.jsp?type=2";
															});
													}
												},
												error : function(result) {
													parent.layer.alert("添加失败！");
												}
											});
									return false;
								});
								/* 单选框的监听     */
								form.on('checkbox(document)', function(data){
									if($('input[name="radio"]:checked').length==$('input[name="radio"]').length){
										$('#form1 div.layui-form-checkbox').addClass('layui-form-checked');
										$('#form2 div.layui-form-checkbox').addClass('layui-form-checked');
//										$('.updgroup').attr("class","layui-btn layui-btn-primary updgroup");//控制当
//								    	$('.delgroup').attr("class","layui-btn layui-btn-primary delgroup");
								}else{
										$('#form1 div.layui-form-checkbox').removeClass('layui-form-checked');
										$('#form2 div.layui-form-checkbox').removeClass('layui-form-checked');
//										$('.updgroup').attr("class","layui-btn layui-btn-disabled updgroup");
//								    	$('.delgroup').attr("class","layui-btn layui-btn-disabled delgroup");
								}
									 // form.render('checkbox');  
									});
								//按钮1全选或取消全选
								form.on('checkbox(allChoose)',function(data){
									 if (data.elem.checked == true) {
//										$('.updgroup').attr("class","layui-btn layui-btn-primary updgroup");
//								    	$('.delgroup').attr("class","layui-btn layui-btn-primary delgroup");
									}else if (data.elem.checked == false) {
//										$('.updgroup').attr("class","layui-btn layui-btn-disabled updgroup");
//								    	$('.delgroup').attr("class","layui-btn layui-btn-disabled delgroup");
									}
									var child = $("#images").find('input[type="checkbox"]'); 
							        child.each(function(index, item){  
							          item.checked = data.elem.checked;  
							        });  
							        form.render('checkbox');  
							        var isChecked = $('#form1 div.layui-form-checkbox').hasClass('layui-form-checked');
									 if(isChecked){
										 $('#form2 div.layui-form-checkbox').addClass('layui-form-checked');
									 }else{
										 $('#form2 div.layui-form-checkbox').removeClass('layui-form-checked');
									 }
								});
								//按钮二
								form.on('checkbox(allChoose1)',function(data){
									if (data.elem.checked == true) {
//										$('.updgroup').attr("class","layui-btn layui-btn-primary updgroup");
//										$('.delgroup').attr("class","layui-btn layui-btn-primary delgroup");
									}else if (data.elem.checked == false) {
//										$('.updgroup').attr("class","layui-btn layui-btn-disabled updgroup");
//										$('.delgroup').attr("class","layui-btn layui-btn-disabled delgroup");
									}
									var child = $("#images").find('input[type="checkbox"]'); 
									child.each(function(index, item){  
										item.checked = data.elem.checked;  
									});  
									form.render('checkbox');  
									var isChecked = $('#form2 div.layui-form-checkbox').hasClass('layui-form-checked');
									if(isChecked){
										$('#form1 div.layui-form-checkbox').addClass('layui-form-checked');
									}else{
										$('#form1 div.layui-form-checkbox').removeClass('layui-form-checked');
									}
								});
								//添加分组的按钮
								var tianjia=$("#queryform button.tianjia");
						        tianjia.on("click",function(e){
						            e.preventDefault();
						            $(this).next().toggle();
						            $('#popup').show();
						        });
						        var quxiao=$("#queryform button.quxiao");
						        quxiao.on("click",function(e){
						            e.preventDefault();
						            $(this).parent().hide();
						        });
						    	// 上传组件
						        var form = layui.form();
								layui.upload({
									url : getRootPath() + '/document/uploadDoc.action?group_ids='+""+'&type=video'
									,elem: '#uploadFile' //指定原始元素，默认直接查找class="layui-upload-file"
									,ext: 'mp4|AVI|rmvb'
									,before : function(input) {
										// 返回的参数item，即为当前的input DOM对象
										console.log('文件上传中...');
									},
									success : function(res) {
										parent.layer.msg('上传成功！', {
											  icon: 1,
											  time: 1000 //（如果不配置，默认是3秒）
											}, function(){
												parent.layer.closeAll();
												searchPicPage("");
											});
									}
								});
								form.render();
							});

							
/**
 * 实现选项卡
 * 
 * @param element
 */
function fun_element(element) {
	element.on('tab(commodityTab)', function(data) {
		var index = data.index;
		$("#commodity_status").val(index);
		searchPage();
	});
}
/**
 * 初始化分组下拉框内容
 */
							function initgroup() {
								var group_type = $("input[name=group_type]").val();
								$.ajax({
									url : getRootPath() + "/document/queryDocGroupList.action?group_type="+group_type,
									type : "post",
									async : false,
									"dataType" : "json",
									success : function(gdata) {
										if (gdata != null) {
											var glist = gdata.data;
											for (var i = 0; i < glist.length; i++) {
											var gindex = glist[i];
											var id = gindex.id;
											var file_group_name = gindex.file_group_name;
											$("#group_id").append("<option id='" + id + "' value='" + id + "'>" + file_group_name+"</option>");
											}
										}
									}
								})
}
/**
 * 初始化分组下拉框内容(修改分组的)
 */
							function initgroup1() {
								var group_type = $("input[name=group_type]").val();
								$.ajax({
									url : getRootPath() + "/document/queryDocGroupList.action?group_type="+group_type,
									type : "post",
									async : false,
									"dataType" : "json",
									success : function(gdata) {
										if (gdata != null) {
											var glist = gdata.data;
											for (var i = 0; i < glist.length; i++) {
												var gindex = glist[i];
												var id = gindex.id;
												var file_group_name = gindex.file_group_name;
												$("#group_id1").append("<option value='" + id + "'>" + file_group_name+ "</option>");
											}
										}
									}
								})
}
							
/**
 * 视频拼接字符串
 * 
 * @param data
 */
						function append_table(result,group_ids) {
							var result = result.data;
							if (!result) {
								return;
							}
							var str = "";
							$.each(result,function(i, item) {
								str += "<div style='widht:350px;height:250px;margin-left:120px' id='splice'>";
								str += "<div style='margin-top: -4px;'>";
								str += "<img onclick='ivideo(\""+item.file_url+"\")' src='timg.jpg'>";
								str += "</div >";
								str += "<div style='margin-left: 15px;'>";
								str += "<br> <div class='layui-form' id='d123'><input name='radio' type='checkbox' lay-skin='primary' lay-filter='document' value="+item.id+">"+""+"  <font id='font"+item.id+"' class='docname' color='#4B0082' size='2' style='border:0;outline:none;'>"+ showColumnValue(item.file_name,12) +"</font>"+ "</div>" +"<br>";
								str += "</div>";
								str += "<div style='margin-left: 15px;'>";
								str +=  "<a href='#' id='renameid' onclick='rename(\""+item.file_name+"\",\""+item.id+"\")'>改名    </a>" +
										"<a href='#' onclick='showUrl(\""+item.id+"\")'>链接    </a>" +
										"<a href='#' onclick='groupic(\""+item.file_name+"\",\""+item.id+"\",\""+group_ids+"\")'>分组    </a>" +
										"<a href='#' onclick='delepic(\""+item.id+"\",\""+item.file_url+"\")'> 删除</a>";
								str += "</div>";
								str += "</div>";
											});
							$("#images").html(str);
							$("#popup1").html(str);
}
						
/**
 * 查询视频列表
 */
						function searchPicPage(group_ids) {
							layui.use([ 'form' ],function() {
									var	form = layui.form();
									var file_name=$("#commodity_name").val();
									var length = 8;
									$.ajax({
										url : getRootPath() + '/document/queryDocPageList.action',
										type : 'POST',
										dataType : 'json',
										data:{"file_name":file_name,
												"group_id":group_ids,
												"currentPage":currentPage,
												"length":length,
												"type":"3"
												},
										success : function(result) {
											groulength = result.data.length;//定义分组的长度
											//当分组没有数据时，就将高度增大
											if (groulength == 0) {
												$('.inner-page-main-container').css("height","300");
											}else {
												$('.inner-page-main-container').css("height","100%");
											}
											//当长度等于0时，隐藏分页信息
											if (groulength == 0) {
												document.getElementById("form1").style.display='none';
												document.getElementById("form2").style.display='none';
											}else {
												document.getElementById("form1").style.display='';
												document.getElementById("form2").style.display='';
											}
											if(groulength ==0){
												document.getElementById('empty').style.display='';
											}else {
												document.getElementById('empty').style.display='none';
											}
											if(result!=null){
												var glist=result.data;
												up_page(result);//更新分页信息
											}
											append_table(result,group_ids);
											$("[name=quanxuan]:checkbox").attr("checked", false);//进入页面时，将全选置为未选中状态
											form.render("checkbox");//重新全部渲染
//											$('.updgroup').attr("class","layui-btn layui-btn-disabled updgroup");
//									    	$('.delgroup').attr("class","layui-btn layui-btn-disabled delgroup");
										},
										error : function() {
											parent.layer.alert("失败！");
											location.reload();
										}
									});
							});
}
/*
 * 删除视频
 * */
								function delepic(id,fileUrl){
									var curleft = $(event.target).offset().left+200+"px";//获取left坐标
									var curtop = $(event.target).offset().top+$(event.target).outerHeight()+"px";//获取top坐标
									parent.layer.confirm('确定要删除这条信息吗？', {
										  btn: ['是', '否'] //可以无限个按钮
										  ,offset: [curtop,curleft]
										}, function(index, layero){
										  //按钮【按钮一】的回调
											$.ajax({
										        url : getRootPath() +"/document/deletePicture.action",
										        type : "post",
										        data : {
										            id : id,
										            fileUrl:fileUrl,
										            type:"video"
										        },
										        datatype : "text",
										        success : function (data) {
												        	parent.layer.msg('删除成功！', {
																  icon: 1,
																  time: 1000 //（如果不配置，默认是3秒）
																}, function(){
																	searchPicPage(alldeteid);
																	parent.layer.closeAll();
																});
										        }
										    })
										}, function(index){
										  //按钮【按钮二】的回调
											layer.closeAll('dialog');
										});
}
/*
 * 修改文件名称
 */
							function rename(file_name,id){
								document.getElementById("file_name").value = file_name;//给input标签里面的value赋值 
								document.getElementById("id").value = id;//给input标签里面的value赋值 
								var curleft = $(event.target).offset().left+"px";//获取left坐标
								var curtop = $(event.target).offset().top+$(event.target).outerHeight()+"px";//获取top坐标
									  layer.open({
										  title:"修改文件名称",
										  type: 1 ,
										  content: $('#renamepic') ,
										  data:{"file_name":file_name},
									      shade: 0 //不显示遮罩
									      ,offset: [curtop,curleft]
									      ,btn: ['确定', '取消']
								          ,yes: function(){//按钮一的回调函数
								        	  var newname = document.getElementById("file_name").value;  //获取修改后的名称
								        	  $.ajax({
								  		        url : getRootPath() +"/document/updatePicture.action",
								  		        type : "post",
								  		        data : {
								  		        	file_name : newname
								  		        	,id : id
								  		        },
								  		        datatype : "text",
								  		        success : function (data) {
										        	parent.layer.msg('修改名称成功！', {
													  icon: 1,
													  time: 1000 //（如果不配置，默认是3秒）
													}, function(){
														$('#font'+id).text(newname);
														layer.closeAll();
														searchPicPage(alldeteid);
													});
								  		        }
								  		    })
								          }
										  ,btn2:function(){//按钮二的回调函数
									        	layer.closeAll();
									        },cancel:function(index, layero){ 
									        	layer.close(index);
									        }
										  });
							//	});
}

/**
 * 弹出链接
 * @param id
 */
									function showUrl(id){
										var url = getRootPath()+'/pages/webstore/mydoc/showUrl.jsp?id='+id;
										var curleft = $(event.target).offset().left+"px";//获取left坐标
										var curtop = $(event.target).offset().top+$(event.target).outerHeight()+"px";//获取top坐标
										layer.open({
											type: 2,
											  title: false,
											  closeBtn: 0, //不显示关闭按钮
											  shade: [0],
											  area: ['416px', '38px'],
											  offset: '100px', //右下角弹出
											  time: 3000, //3秒后自动关闭
											  shadeClose :true, //是否点击遮罩关闭
											  anim: 2,
											  offset: [curtop,curleft],
											  content: [url, 'no'], //iframe的url，no代表不显示滚动条
											  yes: function(){
												  layer.closeAll();
									        }
									      });
}
/**
 * 修改文件分组
 * @ groupic
 */
					function groupic(file_name,id,groupid){
						document.getElementById("file_name").value = file_name;//给input标签里面的value赋值 
						document.getElementById("id").value = id;//给input标签里面的value赋值 
						var curleft = $(event.target).offset().left+"px";//获取left坐标
						var curtop = $(event.target).offset().top+$(event.target).outerHeight()+"px";//获取top坐标
						layer.open({
							  title:"修改文件分组",
							  type: 1,
							  area: ['200px', '300px'],
							  offset: [curtop,curleft],
							  content: $('#editgroup') ,
						      shade: 0 //不显示遮罩
							});
							var form = layui.form();
							// 创建下拉列表组件(修改分组的)
							form.on('select(group1)', function(data) {
								layer.open({
									  title: '修改分组'
									  ,btn: ['确定', '取消']
									  ,content: '您确定要修改分组么？'
									  ,yes: function(){
										  layer.closeAll();
										  var group_ids = "{\"group_id\":\"" + data.value
											+ "\"}";
											$('#group_ids').val(data.value);
											var checked = data.value;
											$.ajax({
										        url : getRootPath() +"/document/editGroup.action",
										        type : "post",
										        data : {id : id,group_id : data.value },
										        datatype : "text",
										        success : function (data) {
										        	parent.layer.msg('修改分组成功！', {
														  icon: 1,
														  time: 1500 //（如果不配置，默认是3秒）
														}, function(){
															if (id == "") {
																location.reload();
															}else {
																searchPicPage(groupid);
																layer.closeAll();
															}
															form.render();
														});
										        }
											})
									  }
									  ,btn2:function(){//按钮二的回调函数
								        	layer.closeAll();
								        },cancel:function(index, layero){ 
								        	layer.close(index);
								        }
									  });
									});
								
						}
//获得被选中的下拉列表的名称
						function acquireName(group_id){
							$.ajax({
						        url : getRootPath() +"/document/acquireName.action",
						        type : "post",
						        data : {
						            group_id : group_id
						        },
						        datatype : "json",
						        success : function (data) {
						        	file_group_name = data.file_group_name;
						        	//拼接修改分组名称的字符串
						        	$("#file_group_name").html("<div style='text-align: center;'>").append("<font id='group_name_show' size='2'>"+data.file_group_name+"</font>").append("<a href='javascript:void(0);' id='renameDocId' onclick='renameDoc(\""+data.file_group_name+"\",\""+data.id+"\")'><font size='2' >       重命名</font>").append("<a href='javascript:void(0);' onclick='deleteGroup(\""+data.file_group_name+"\",\""+data.id+"\")'><font size='2'>       删除分组</font></a>").append("</div>");
						        }
						    })
}
/**
 * 重命名分组
 */
					function renameDoc(file_group_name,id){
						document.getElementById("groupname").value = file_group_name;//给input标签里面的value赋值 
						document.getElementById("groupid").value = id;//给input标签里面的value赋值 
							  layer.open({
								  title:"修改分组名称",
								  type: 1,
								  content: $('#renamegroup') ,
								  data:{"file_group_name":file_group_name},
							      shade: 0 //不显示遮罩
							      ,btn: ['确定', '取消']
						          ,yes: function(){//按钮一的回调函数
						        	  var newname = document.getElementById("groupname").value;  //获取修改后的名称
						        	  $.ajax({
						  		        url : getRootPath() +"/document/updateGroupName.action",
						  		        type : "post",
						  		        data : {
						  		        	file_group_name : newname
						  		        	,id : id
						  		        },
						  		        datatype : "text",
						  		        success : function (data) {
						  				        	parent.layer.msg('修改成功！', {
						  							  icon: 1,
						  							  time: 1000 //（如果不配置，默认是3秒）
						  							}, function(){
						  								$('#'+id).text(newname);
						  								$('#group_name_show').text(newname);
						  								$('.layui-unselect').val(newname);
						  								$('.layui-form-select dl dd.layui-this').text(newname);
						  								layer.closeAll();
						  								acquireName(id);
						  								searchPicPage(id);
						  							});
						  		        }
						  		    })
						          }
								  ,btn2:function(){//按钮二的回调函数
							        	layer.closeAll();
							        },cancel:function(index, layero){ 
							        	layer.close(index);
							        }
								  });
}
/**
 * 删除分组
 */
						function deleteGroup(file_group_name,id){
							parent.layer.confirm('确定要删除分组吗？仅删除分组，不删除视频，组内视频将自动归入未分组', {
								  btn: ['是', '否'] //可以无限个按钮
								}, function(index, layero){
								  //按钮【按钮一】的回调
									$.ajax({
								        url : getRootPath() +"/document/deleteGroup.action",
								        type : "post",
								        data : {
								        	file_group_name : file_group_name,
								            id : id
								        },
								        datatype : "text",
								        success : function (data) {
								        	if (data == "success") {
								        		parent.layer.msg('删除分组成功！', {
													  icon: 1,
													  time: 1000 //（如果不配置，默认是3秒）
													}, function(){
														parent.layer.closeAll();
														window.location.href = getRootPath()+"/pages/webstore/mydoc/myDocument.jsp?type=2";
													});
											}else {
												parent.layer.msg('删除分组失败！', {
													  icon: 2,
													  time: 1000 //（如果不配置，默认是3秒）
													}, function(){
														parent.layer.closeAll();
														window.location.href = getRootPath()+"/pages/webstore/mydoc/myDocument.jsp?type=2";
													});
											}
								        }
								    })
								}, function(index){
								  //按钮【按钮二】的回调
									layer.closeAll('dialog');
								});
							
}
/*
 * 批量删除文件(上按钮)
 * */
					function deleteAllDoc(){
						var curleft = $(event.target).offset().left+200+"px";//获取left坐标
						var curtop = $(event.target).offset().top+$(event.target).outerHeight()+"px";//获取top坐标
						if(!ischeck()){
					    	 parent.layer.msg('请先选择视频！', {
					 		  icon: 1,
					 		  time: 1000 //（如果不配置，默认是3秒）
					 		});
					       return;
					 	}
						//选中多个选项
						var spCodesTemp = "";
						$('input:checkbox[name=radio]:checked').each(function(i){
							if(0==i){
								spCodesTemp = $(this).val();
							}else{
								spCodesTemp += (","+$(this).val());
							}
						});
						parent.layer.confirm('确定要删除所有选中的文件吗？', {
							  btn: ['是', '否'], //可以无限个按钮
							  offset: [curtop,curleft]
							}, function(index, layero){
								$.ajax({
							        url : getRootPath() +"/document/batchDeleteDoc.action",
							        type : "post",
							        data : {
							            allData : spCodesTemp,
							            type:"video"
							        },
							        datatype : "json",
							        success : function (data) {
							        	if (data == 'success') {
								        	parent.layer.msg('删除成功！', {
												  icon: 1,
												  time: 1000 //（如果不配置，默认是3秒）
												}, function(){
													searchPicPage(alldeteid);
													parent.layer.closeAll();
												});
										}else {
											parent.layer.msg('删除失败！', {
												icon: 2,
												  time: 1000 //（如果不配置，默认是3秒）
												}, function(){
													
													searchPicPage(alldeteid);
													parent.layer.closeAll();
												});
										}
							        }
							    })
							}, function(index){
							  //按钮【按钮二】的回调
								layer.closeAll('dialog');
							});
}
					/*
					 * 批量删除文件(下按钮)
					 * */
					function deleteAllDoc1(){
						var curleft = $(event.target).offset().left+200+"px";//获取left坐标
						var curtop = $(event.target).offset().top+$(event.target).outerHeight()+-190+"px";//获取top坐标
						if(!ischeck()){
					    	 parent.layer.msg('请先选择视频！', {
					 		  icon: 1,
					 		  time: 1000 //（如果不配置，默认是3秒）
					 		});
					       return;
					 	}
						//选中多个选项
						var spCodesTemp = "";
						$('input:checkbox[name=radio]:checked').each(function(i){
							if(0==i){
								spCodesTemp = $(this).val();
							}else{
								spCodesTemp += (","+$(this).val());
							}
						});
						parent.layer.confirm('确定要删除所有选中的文件吗？', {
							btn: ['是', '否'], //可以无限个按钮
							offset: [curtop,curleft]
						}, function(index, layero){
							$.ajax({
								url : getRootPath() +"/document/batchDeleteDoc.action",
								type : "post",
								data : {
									allData : spCodesTemp,
									type:"video"
								},
								datatype : "json",
								success : function (data) {
									if (data == 'success') {
										parent.layer.msg('删除成功！', {
											icon: 1,
											time: 1000 //（如果不配置，默认是3秒）
										}, function(){
											searchPicPage(alldeteid);
											parent.layer.closeAll();
										});
									}else {
										parent.layer.msg('删除失败！', {
											icon: 2,
											time: 1000 //（如果不配置，默认是3秒）
										}, function(){
											
											searchPicPage(alldeteid);
											parent.layer.closeAll();
										});
									}
								}
							})
						}, function(index){
							//按钮【按钮二】的回调
							layer.closeAll('dialog');
						});
					}

					/*
					 * 批量修改分组
					 * */
					function updateAllDoc(){
						var curleft = $(event.target).offset().left+"px";//获取left坐标
						var curtop = $(event.target).offset().top+$(event.target).outerHeight()+"px";//获取top坐标
					if(!ischeck()){
				    	 parent.layer.msg('请先选择视频！', {
				    		  icon: 1,
				    		  time: 1000 //（如果不配置，默认是3秒）
				    		});
				          return;
				    	}
						//批量修改时的弹出框
						  layer.open({
							  title:"修改文件分组",
							  type: 1,
							  area: ['200px', '280px'],
							  content: $('#editgroup') ,
							  offset: [curtop,curleft],
							  data:{"file_name":file_name},
						      shade: 0 //不显示遮罩
							  });
							//获取全选的信息
							var spCodesTemp = "";
							$('input:checkbox[name=radio]:checked').each(function(i){
								if(0==i){
									spCodesTemp = $(this).val();
								}else{
									spCodesTemp += (","+$(this).val());
								}
							});
							var form = layui.form();
							form.on('select(group1)', function(data) {
								layer.open({
									  title: '修改分组'
									  ,btn: ['确定', '取消']
									  ,content: '您确定要修改分组么？'
									  ,yes: function(){
											var group_ids = "{\"group_id\":\"" + data.value+ "\"}";
											$('#group_ids').val(data.value);
											var checked = data.value;//获得被选中的分组的ID
											$.ajax({
										        url : getRootPath() +"/document/batchEditGroup.action",
										        type : "post",
										        data : {
										            allId : spCodesTemp,
										            group_id  : data.value
										        },
										        datatype : "text",
										        success : function (data) {
										        	if (data == "success") {
										        		parent.layer.msg('修改分组成功！', {
										        			  icon: 1,
										        			  time: 1000 //（如果不配置，默认是3秒）
										        			}, function(){
											        			searchPicPage(alldeteid);
											        			layer.closeAll();
										        			});
													}else {
														parent.layer.msg('修改分组失败！', {
															  icon: 2,
															  time: 1000 //（如果不配置，默认是3秒）
															}, function(){
																searchPicPage(alldeteid);
																layer.closeAll();
															});
													}
										        }
										    }) 
									  },btn2:function(){//按钮二的回调函数
								        	layer.closeAll();
								        },cancel:function(index, layero){ 
								        	layer.close(index);
								        }
								});
							});
}
					function updateAllDoc1(){
						var curleft = $(event.target).offset().left+"px";//获取left坐标
						var curtop = $(event.target).offset().top+$(event.target).outerHeight()+-320+"px";//获取top坐标
						if(!ischeck()){
					    	 parent.layer.msg('请先选择视频！', {
					 		  icon: 1,
					 		  time: 1000 //（如果不配置，默认是3秒）
					 		});
					       return;
					 	}
						//批量修改时的弹出框
						layer.open({
							title:"修改文件分组",
							type: 1,
							area: ['200px', '280px'],
							content: $('#editgroup') ,
							offset: [curtop,curleft],
							data:{"file_name":file_name},
							shade: 0 //不显示遮罩
						});
						//获取全选的信息
						var spCodesTemp = "";
						$('input:checkbox[name=radio]:checked').each(function(i){
							if(0==i){
								spCodesTemp = $(this).val();
							}else{
								spCodesTemp += (","+$(this).val());
							}
						});
						var form = layui.form();
						form.on('select(group1)', function(data) {
							layer.open({
								title: '修改分组'
									,btn: ['确定', '取消']
							,content: '您确定要修改分组么？'
								,yes: function(){
									var group_ids = "{\"group_id\":\"" + data.value+ "\"}";
									$('#group_ids').val(data.value);
									var checked = data.value;//获得被选中的分组的ID
									$.ajax({
										url : getRootPath() +"/document/batchEditGroup.action",
										type : "post",
										data : {
											allId : spCodesTemp,
											group_id  : data.value
										},
										datatype : "text",
										success : function (data) {
											if (data == "success") {
												parent.layer.msg('修改分组成功！', {
													icon: 1,
													time: 1000 //（如果不配置，默认是3秒）
												}, function(){
													searchPicPage(alldeteid);
													layer.closeAll();
												});
											}else {
												parent.layer.msg('修改分组失败！', {
													icon: 2,
													time: 1000 //（如果不配置，默认是3秒）
												}, function(){
													searchPicPage(alldeteid);
													layer.closeAll();
												});
											}
										}
									}) 
								},btn2:function(){//按钮二的回调函数
									layer.closeAll();
								},cancel:function(index, layero){ 
									layer.close(index);
								}
							});
						});
					}


/*************以下与分页有关***************/
var currentPage=1;
var totalPage=1 ;					
var start ;
var end ;
function selectPage(page){
	 if(page == 'first'){
		 currentPage = 1;
		 
	 }else if(page == 'pre'){
		 if(currentPage > 1){
			 currentPage -= 1;
		 }else{
			 currentPage = 1;
			
		 }
	 }else if(page == 'next'){
		 if(currentPage < totalPage){
			 currentPage += 1;
		 }else{
			 currentPage = totalPage;
			
		 }
	 }else if(page == 'end'){
		 currentPage = totalPage;
		
	 }else{
		 currentPage = page;
	 }
	 searchPicPage(group_id);
}
/**
 * 初始化 
 * 当前页等于1时，将frist按钮禁用
 * 
 */
function initPage(){
	if(currentPage == 1){
		 $("#li_first").addClass('disabled');
		 $("#li_pre").addClass('disabled');
		 $("#li_first > a").removeAttr('onclick');
		 $("#li_pre > a").removeAttr('onclick');
	 }else if(currentPage == totalPage){
		 $("#li_next").addClass('disabled');
		 $("#li_end").addClass('disabled');
		 $("#li_next > a").removeAttr('onclick');
		 $("#li_end > a").removeAttr('onclick');
	 }
}
//更新分页
function up_page(gdata){
	currentPage=gdata.currentPage;  
	totalPage=gdata.totalPage;
	var dataCount=gdata.dataCount;
	var start=parseInt(gdata.start);
	var end=parseInt(gdata.end);
	var str="";
	str+="<ul class='pagination ng-isolate-scope ng-valid'>";
	
	str+="<li class='ng-scope' id='li_first'><a href='javascript:;' onclick=selectPage('first') class='ng-binding'>|&lt;</a></li>";
	
	str+="<li class='ng-scope' id='li_pre'><a href='javascript:;' onclick=selectPage('pre') class='ng-binding'>&lt;&lt;</a></li>";
	for(var i=start;i<=end;i++){
		var lstyle="";
		if(i==currentPage){
			lstyle="style='background-color:LightSkyBlue'";
		}
		str+="<li class='ng-scope'><a href='javascript:;' onclick='selectPage("+i+")' class='ng-binding' "+lstyle+">"+i+"</a></li>";
	}
    str+="<li class='ng-scope' id='li_next'><a href='javascript:;' onclick=selectPage('next') class='ng-binding'>&gt;&gt;</a></li>";
	
	str+="<li class='ng-scope' id='li_end'><a href='javascript:;' onclick=selectPage('end') class='ng-binding'>&gt;|</a></li>";
	
	str+="<li class='ng-scope' ><a href='javascript:;' style='height:32px' class='ng-binding'> 第"+currentPage+"页 | 共"+totalPage+"页 | "+dataCount+"条记录</a></li>";
	
	str+="</ul>";
	$("#picture_page_index").html(str);
	initPage();//
}
//点击确定按钮
function to_return(){
	if(phoArr.length>0){
		var b_fun=getUrlParam("b_fun");
		eval('window.parent.'+b_fun+'(phoArr)'); 
//		window.parent.up_spe_pho(phoArr);
	}else{
		layer.alert("请选择视频!");
	}
}

/**
 * 弹出视频播放器
 */
function ivideo(file_url){
	var url_path = getRootPath()+"/pages/webstore/mydoc/playVideo.jsp";
	openPostWindow(url_path,file_url,"playVideo.jsp");
}

//通过post的方式弹出窗口
function openPostWindow(url,data,name){  //url要跳转到的页面，data要传递的数据，name显示方式（可能任意命名）
    var tempForm = document.createElement("form");  
    tempForm.id="tempForm1";  
    tempForm.method="post";  
    tempForm.action=url;  
    tempForm.target=name;  
    var hideInput = document.createElement("input");  
    hideInput.type="hidden";  
    hideInput.name= "dataname"
    hideInput.value= data;
    tempForm.appendChild(hideInput);   
    tempForm.addEventListener("onsubmit",function(){ openWindow(name); });//必须用name不能只用url，否则无法传值到新页面
    document.body.appendChild(tempForm);           
    //tempForm.fireEvent("onsubmit");
    tempForm.submit();
    document.body.removeChild(tempForm);  
}


function openWindow(name)  {  
	var iWidth=1100; //弹出窗口的宽度;
	var iHeight=550; //弹出窗口的高度;
	var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
	var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;        
	window.open('about:blank',name,"height="+iHeight+", width="+iWidth+", top="+iTop+", left="+iLeft+",toolbar=no, menubar=no,  scrollbars=yes,resizable=yes,location=no, status=no");  
} 

/**
 * 判断复选框是否有选中
 * @returns {Boolean}
 */
function ischeck(){
	  var tcheck=false;
	    var child = $("#images").find('input[type="checkbox"]'); 
	    child.each(function(index, item){ //当全选按钮被选中的时候，就遍历所有的单选框，并让它们被选中
	    	 if(item.checked){
	    		 tcheck=true;
	    	 }
	  });
	  return tcheck;
}

