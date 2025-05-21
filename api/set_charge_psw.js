import request from "@/utils/request.js";

/**
 * 修改支付密码
 * 
*/
export function resetChargePsw(data){
  return request.post('user/resetChargePsw',data);
}

/**
 * 验证支付密码
 */
 export function checkChargePsw(data){
  return request.post('user/checkChargePsw',data);
}
/**
 * 重置密码
 */
 export function resetPassword(){
  return request.post('user/resetPassword');
}