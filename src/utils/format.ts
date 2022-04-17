
// 给数字加千分符
export function milliFormatNumber(num: string|number) {
  return num && num.toString()
    .replace(/\d+/, (s)=> {
      return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    });
}

