import request from "@/utils/request.js";

  /**
  * 获取充值钱包二维码
  */
   export function getChargeQrCode(){
    return request.get('order/getChargeQrCode');
   }

/**
 * 生成充值二维码
 */
 export function createChargeQrCode(data){
  return request.post('order/createChargeQrCode', JSON.stringify(data));
 }


 /**
 * 生成充值二维码
 */
  export function cancelTronCharge(url){
    return request.get(url);
   }
  