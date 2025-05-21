import request from "@/utils/request.js";

  /**
  * 获取配置数据
  */
   export function getTAntwalletConfig(url){
    return request.get(url);
   }
