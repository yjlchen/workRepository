 /** 
  * 申请退款
  * @param out_trade_no    订单号(加密后 DESUtils工具类中方法)
  * @param total_fee       订单总金额
  * @param refund_fee      退款金额（不能大于订单总金额）
  * @param refund_desc     退款原因
  */
  function toreturn(out_trade_no,total_fee,refund_fee,refund_desc){
	  var result = "";
	  var JsonStr="{";
	  JsonStr+="'out_trade_no':'"+out_trade_no+"'";
	  JsonStr+=",'total_fee':'"+total_fee+"'";     //订单金额
	  JsonStr+=",'refund_fee':'"+refund_fee+"'";   //退款金额
	  JsonStr+=",'refund_desc':'"+refund_desc+"'"; 
	  JsonStr+="}";
	  $.ajax({
		   "url": getRootPath()+"/wxOperate/payReturn.action",
   		type : 'POST',
   		dataType : 'json',
   		data : {"JsonStr":JsonStr},
   		async:false,
   		success : function(rejson){
   			result = rejson;
   			//console.log(rejson);
   			//console.log(JSON.stringify(rejson));
//   			return_code:SUCCESS/FAIL
//   			return_msg:返回信息，如非空，为错误原因
//   			result_code
//   			err_code_des
		},
		error:function(){
			alert('error');
		}
	});
	  return result;
  }
  /**
   * 申请退款查询
   * @param out_trade_no  订单号(加密后 DESUtils工具类中方法)
   */
  function toreturnfund(out_trade_no){
	  var returnInfo;
	  $.ajax({
		   "url": getRootPath()+"/wxOperate/payReturnFund.action",
   		type : 'POST',
   		dataType : 'json',
   		data : {"out_trade_no":out_trade_no},
   		async:false,
   		success : function(rejson){
   			returnInfo = rejson;
   			//  result_code:SUCCESS/FAIL
   			//  return_msg:返回信息，如非空，为错误原因
   			//   refund_status:退款状态
   			//			SUCCESS—退款成功
   			//			REFUNDCLOSE—退款关闭。
   			//			PROCESSING—退款处理中
   			//			CHANGE—退款异常，退款到银行发现用户的卡作废或者冻结了，导致原路退款银行卡失败，
   		    // refund_recv_accout:退款入账账户
			//   			取当前退款单的退款入账方
			//			1）退回银行卡：
			//			{银行名称}{卡类型}{卡尾号}
			//			2）退回支付用户零钱:
			//			支付用户零钱
			//			3）退还商户:
			//			商户基本账户
			//			商户结算银行账户
			//			4）退回支付用户零钱通:
			//			支付用户零钱通
//   			refund_success_time:退款时间  2016-07-25 15:26:26
			},
			error:function(){
				alert('error');
			}
	});
	  return returnInfo;
  }
