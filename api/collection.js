import request from "@/utils/request.js";

/**
 * 创建收款
 * 
*/
export function createOTronTrans(data){
  return request.post('order/createOTronTrans',JSON.stringify(data));
}