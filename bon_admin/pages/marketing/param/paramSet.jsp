<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>系统参数设置</title>
<jsp:include page="../../../commons/jsp/common2.0.jsp"></jsp:include>
<style type="text/css">
	.layui-form-select {
		width:500px
	}
	/* .layui-anim{
		height: 200px;
	}
	.selectpicker{
		width: 500px;
	} */
	/* .dropdown-toggle{
		width: 500px !important;
	} */
	
	/**外部边框 **/
	.inner-page-main.layui-clear.inner-page-main {
	    border: 1px solid #e5e5e5;
	    background-color: #F2F2F2;
	    height: auto;
	    overflow: hidden;
	}
	.inner-page-main-container{
	    border: 1px solid #e5e5e5;
	    margin: 10px;
	    padding: 15px;
	    background-color: #fff;
	    height: auto;
	    overflow: hidden;
	}
</style>
</head>
<body class="gray-bg">
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
		<span style="font-size: 18px;">系统参数设置 </span>
	</div>
	<div class="inner-page-main layui-clear inner-page-main">
		<div class="inner-page-main-container">
			<form action="" id="form0" class="layui-form">
				<div class="layui-inline" id="commonList">
					<label class="layui-form-label" style="width: 391px;"><span style="color: red;">*&nbsp;</span>赠送商品：</label>
					<div class="layui-input-inline" >
<!-- 						<input id="star6" name="star6" type="text" maxlength="10" lay-verify="required" placeholder="请选择商品" autocomplete="off" class="layui-input" style="width: 500px">
 -->					<select id="common_commodity_gift1" name="val1" lay-verify="required"  lay-filter="hrefFilter2" lay-search  style="width: 500px">
					      		<!-- <option value="">请选择商品详情页链接</option> -->
					    </select>
					    
					</div>
					<div class="layui-input-inline">
						<button class="layui-btn layui-btn-radius  layui-btn-small layui-btn-normal" lay-submit lay-filter="form0">
							<i class="layui-icon">&#xe614;</i><span id="common_commodity_gift" key="common_commodity_gift">设置</span>
						</button>
					</div>
				</div>
			</form>	
			<form action="" id="form1" class="layui-form">
				<div class="layui-inline">
					<label class="layui-form-label" style="width: 391px;"><span style="color: red;">*&nbsp;</span>发布视频时长：</label>
					<div class="layui-input-inline">
						<input id="value1" name="value1" type="text" lay-verify="number" placeholder="请输入时长,秒为单位" autocomplete="off" class="layui-input" style="width: 500px;">
					</div>
					
					<div class="layui-input-inline">
						<button class="layui-btn layui-btn-radius  layui-btn-small layui-btn-normal" lay-submit lay-filter="form1">
							<i class="layui-icon">&#xe614;</i><span id="video_length_limit" key="video_length_limit">设置</span>
						</button>
					</div>
				</div>
			</form>
			<form action="" id="form2" class="layui-form">
				<div class="layui-inline">
					<label class="layui-form-label" style="width: 391px;"><span style="color: red;">*&nbsp;</span>分享信息赠送积分：</label>
					<div class="layui-input-inline">
						<input id="value2" name="value2" type="text" lay-verify="number" placeholder="请输入赠送积分" autocomplete="off" class="layui-input" style="width: 500px">
					</div>
					<div class="layui-input-inline">
						<button class="layui-btn layui-btn-radius  layui-btn-small layui-btn-normal" lay-submit lay-filter="form2">
							<i class="layui-icon">&#xe614;</i><span id="share_scores" key="share_scores">设置</span>
						</button>
					</div>
				</div>
			</form>
			
			<form action="" id="form3" class="layui-form">
				<div class="layui-inline">
					<label class="layui-form-label" style="width: 391px;"><span style="color: red;">*&nbsp;</span>棒健康热词：</label>
					<div class="layui-input-inline">
						<input id="value3" name="value3" type="text" lay-verify="required"  placeholder="多个热词以逗号分开" autocomplete="off" class="layui-input" style="width: 500px">
					</div>
					
					<div class="layui-input-inline">
						<button class="layui-btn layui-btn-radius  layui-btn-small layui-btn-normal" lay-submit lay-filter="form3">
							<i class="layui-icon">&#xe614;</i><span id="guide_words" key="guide_words">设置</span>
						</button>
					</div>
				</div>
			</form>
			<form action="" id="form4" class="layui-form">
				<div class="layui-inline">
					<label class="layui-form-label" style="width: 391px;"><span style="color: red;">*&nbsp;</span>音频时长限制：</label>
					<div class="layui-input-inline">
						<input id="value4" name="value4" type="text" lay-verify="number" placeholder="请输入时长,秒为单位" autocomplete="off" class="layui-input" style="width: 500px">
					</div>
					<div class="layui-input-inline">
						<button class="layui-btn layui-btn-radius  layui-btn-small layui-btn-normal" lay-submit lay-filter="form4">
							<i class="layui-icon">&#xe614;</i><span id="audio_length_limit" key="audio_length_limit">设置</span>
						</button>
					</div>
				</div>
			</form>	
			<!-- 评星对应的文字设置 -->
			<form action="" id="form5" class="layui-form">
				<div class="layui-inline">
					<label class="layui-form-label" style="width: 391px;"><span style="color: red;">*&nbsp;</span>1星文字：</label>
					<div class="layui-input-inline">
						<input id="star1" name="star1" type="text" maxlength="10" lay-verify="required" placeholder="最多输入10个字" autocomplete="off" class="layui-input" style="width: 500px">
					</div>
					<div class="layui-input-inline">
						<button class="layui-btn layui-btn-radius  layui-btn-small layui-btn-normal" lay-submit lay-filter="form5">
							<i class="layui-icon">&#xe614;</i><span id="star_1" key="star_1">设置</span>
						</button>
					</div>
				</div>
			</form>	
			<form action="" id="form6" class="layui-form">
				<div class="layui-inline">
					<label class="layui-form-label" style="width: 391px;"><span style="color: red;">*&nbsp;</span>2星文字：</label>
					<div class="layui-input-inline">
						<input id="star2" name="star2" type="text" maxlength="10" lay-verify="required" placeholder="最多输入10个字" autocomplete="off" class="layui-input" style="width: 500px">
					</div>
					<div class="layui-input-inline">
						<button class="layui-btn layui-btn-radius  layui-btn-small layui-btn-normal" lay-submit lay-filter="form6">
							<i class="layui-icon">&#xe614;</i><span id="star_2" key="star_2">设置</span>
						</button>
					</div>
				</div>
			</form>
			<form action="" id="form7" class="layui-form">
				<div class="layui-inline">
					<label class="layui-form-label" style="width: 391px;"><span style="color: red;">*&nbsp;</span>3星文字：</label>
					<div class="layui-input-inline">
						<input id="star3" name="star3" type="text" maxlength="10" lay-verify="required" placeholder="最多输入10个字" autocomplete="off" class="layui-input" style="width: 500px">
					</div>
					<div class="layui-input-inline">
						<button class="layui-btn layui-btn-radius  layui-btn-small layui-btn-normal" lay-submit lay-filter="form7">
							<i class="layui-icon">&#xe614;</i><span id="star_3" key="star_3">设置</span>
						</button>
					</div>
				</div>
			</form>
			<form action="" id="form8" class="layui-form">
				<div class="layui-inline">
					<label class="layui-form-label" style="width: 391px;"><span style="color: red;">*&nbsp;</span>4星文字：</label>
					<div class="layui-input-inline">
						<input id="star4" name="star4" type="text" maxlength="10" lay-verify="required" placeholder="最多输入10个字" autocomplete="off" class="layui-input" style="width: 500px">
					</div>
					<div class="layui-input-inline">
						<button class="layui-btn layui-btn-radius  layui-btn-small layui-btn-normal" lay-submit lay-filter="form8">
							<i class="layui-icon">&#xe614;</i><span id="star_4" key="star_4">设置</span>
						</button>
					</div>
				</div>
			</form>
			<form action="" id="form9" class="layui-form">
				<div class="layui-inline">
					<label class="layui-form-label" style="width: 391px;"><span style="color: red;">*&nbsp;</span>5星文字：</label>
					<div class="layui-input-inline">
						<input id="star5" name="star5" type="text" maxlength="10" lay-verify="required" placeholder="最多输入10个字" autocomplete="off" class="layui-input" style="width: 500px">
					</div>
					<div class="layui-input-inline">
						<button class="layui-btn layui-btn-radius  layui-btn-small layui-btn-normal" lay-submit lay-filter="form9">
							<i class="layui-icon">&#xe614;</i><span id="star_5" key="star_5">设置</span>
						</button>
					</div>
				</div>
			</form>		
			<form action="" id="form10" class="layui-form">
				<div class="layui-inline">
					<label class="layui-form-label" style="width: 391px;"><span style="color: red;">*&nbsp;</span>赠品领取后的有效天数：</label>
					<div class="layui-input-inline">
						<input id="commodity_gift_validate_days_input" name="commodity_gift_validate_days" type="text" maxlength="3" lay-verify="required" placeholder="请输入大于0的整数" autocomplete="off" class="layui-input" style="width: 500px">
					</div>
					<div class="layui-input-inline">
						<button class="layui-btn layui-btn-radius  layui-btn-small layui-btn-normal" lay-submit lay-filter="form10">
							<i class="layui-icon">&#xe614;</i><span id="commodity_gift_validate_days" key="commodity_gift_validate_days">设置</span>
						</button>
					</div>
				</div>
			</form>		
		</div>
	</div>
</body>
<script type="text/javascript">
$(function(){
	//initGood();
	initdata();
})
function initdata(){
	var f = 0;
	$.ajax({
		url:getRootPath() + '/param/queryParamList.action',
		type:'post',
		dataType:'json',
		async: false,//同步ajax
		success:function(data){
			$.each(data.paramList,function(index,item){
				if(item.key_val!='common_commodity_gift'){
					$('#'+item.key_val).parents('.layui-form').find('input').val(item.val1);
				}else{
					f = 1;
					var test = $('#'+item.key_val).parents('.layui-form').find('select');
					test.html('<option value="" selected>请选择赠品</option>');
					$.ajax({
						url:getRootPath() + '/param/queryCommonList.action',
						type:'post',
						dataType:'json',
						async:false,
						success:function(data2){
							//console.log(data2);
							$.each(data2,function(index2,item2){
								if(item.val1==item2.id){
									test.append('<option selected="selected" value='+item2.id+'>'+item2.commodity_name+'</option>');
								}else{
									test.append('<option value='+item2.id+'>'+item2.commodity_name+'</option>');
								}
							});
						}
					});
				}
				
			})
			if(f==0){
				initGood()
			}
		}
	});
}
	
	layui.use(['form','layer'],function(){
		var form = layui.form;
		var layer = layui.layer;
		
		//视频时间设置
		form.on('submit(form1)',function(data){
			var type = $('#video_length_limit').attr("key");
			var value1 = data.field.value1;
			console.log("type"+type);
			setParamCommon(type,value1);
			return false;
		});
		
		//分享积分设置
		form.on('submit(form2)',function(data){
			var type = $('#share_scores').attr("key");
			var value2 = data.field.value2;
			setParamCommon(type,value2);
			return false;
		});
		
		// 关键热词设置
		form.on('submit(form3)',function(data){
			var type = $('#guide_words').attr("key");
			var value3 = data.field.value3;
			setParamCommon(type,value3);
			return false;
		});
		//音频时长限制
		form.on('submit(form4)',function(data){
			var type = $('#audio_length_limit').attr("key");
			var value4 = data.field.value4;
			setParamCommon(type,value4);
			return false;
		});
		//星级评价对应文字
		form.on('submit(form5)',function(data){
			var type = $('#star_1').attr("key");
			var value = data.field.star1;
			setParamCommon(type,value);
			return false;
		});
		form.on('submit(form6)',function(data){
			var type = $('#star_2').attr("key");
			var value = data.field.star2;
			setParamCommon(type,value);
			return false;
		});
		form.on('submit(form7)',function(data){
			var type = $('#star_3').attr("key");
			var value = data.field.star3;
			setParamCommon(type,value);
			return false;
		});
		form.on('submit(form8)',function(data){
			var type = $('#star_4').attr("key");
			var value = data.field.star4;
			setParamCommon(type,value);
			return false;
		});
		form.on('submit(form9)',function(data){
			var type = $('#star_5').attr("key");
			var value = data.field.star5;
			setParamCommon(type,value);
			return false;
		});
		form.on('submit(form0)',function(data){
			var type = $('#common_commodity_gift').attr("key");
			var value =  $('#common_commodity_gift1').val();
			setParamCommon(type,value);
			return false;
		});
		form.on('submit(form10)',function(data){
			var type = $('#commodity_gift_validate_days').attr("key");
			var value =  $('#commodity_gift_validate_days_input').val();
			var reg = /(^[1-9]\d*$)/;
			if(!reg.test(value))
			{
				console.log("12122");
				alert("请输入大于0的正整数");
				return false;
			}else{
				setParamCommon(type,value);
				return false;
			}
			
			
		});
	});
	
	//保存方法（参数设置）
	function setParamCommon(type,val){
		console.log(type)
		$.ajax({
			url:getRootPath()+'/param/saveParams.action',
			type:'post',
			dataType:'text',
			async:false,
			traditional:true,
			data:{
				"type":type,
				"val":val
			},
			success:function(data){
				if(data=="success"){
					layer.msg("设置成功",{icon:6,time:1200});
				}
			}
		});
	}
	
	function initGood(){
		//查询所有的链接类型里面的所支持的类型的数据
		$.ajax({
			url:getRootPath() + '/param/queryCommonList.action',
			type:'post',
			dataType:'json',
			async: false,//同步ajax
			success:function(data){
				console.log("同步2");
				var detailHtml="<option  value=''>请选择赠品</option>";
				$.each(data,function(index,item){
					detailHtml += '<option  value="'+item.id+'">'+item.commodity_name+'</option>';
				});
				$('#common_commodity_gift1').html(detailHtml);
			}			
		});
	}
</script>
</html>