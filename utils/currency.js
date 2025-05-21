export const dictionary = {
  0: 'USDT',
  1: 'TRX',
};

export function searchDictionary(key) {
  return dictionary[key]; // 如果键存在，返回对应的值，否则返回undefined
}

