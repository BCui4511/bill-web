/*
 * 多端统一约束接口Cookie
 */

// 1小时秒数
const SECONDS_OF_HOUR = 3600000;
// 过期时间
const OVER_TIME = 'Mon, 26 Jul 1997 05:00:00 GMT';

export class Cookie {
  /**
   * 获取cookie
   *
   * @param {string} k key
   * @returns
   */
  getCookie(k: string): string {
    const cookieReg = new RegExp(`(^| )${k}=([^;]*)(;|$)`);
    const matches = document.cookie.match(cookieReg);

    return !matches ? '' : decodeURIComponent(matches[2]);
  }

  /**
   * 设置 cookie
   *
   * @param {string} k key
   * @param {*} v value
   * @param {string} domain domain
   * @param {string} path path
   * @param {number} hour 过期时间
   */
  setCookie(k: string, v: any, domain?: string, path?: string, hour?: number): void{
    const ts = Date.now() + SECONDS_OF_HOUR * (hour || 0);
    const expireKV = hour ? `; expires=${new Date(ts).toUTCString()}` : '';
    const pathKV = ` path=${path || '/'}`;
    const domainKV = domain ? ` domain=${domain};` : '';

    document.cookie = `${k}=${v}${expireKV};${pathKV};${domainKV}`;
  }

  /**
   * 删除指定cookie
   *
   * @param {string} k
   * @param {string} domain
   * @param {string} path 注意path要严格匹配，/id 不同于/id/
   */
  delCookie(k: string, domain?: string, path?: string): void{
    document.cookie = `${k}=; expires=${OVER_TIME}; path=${path || '/'}; ${domain ? `domain=${domain};` : ''}`;
  }

  /**
   * 清除可删除的所有cookie
   *
   * @returns
   */
  clearCookie(): void{
    const rs = document.cookie.match(new RegExp('([^ ;][^;]*)(?=(=[^;]*)(;|$))', 'gi'));
    if (!rs) {
      return;
    }
    rs.forEach((item) => {
      document.cookie = `${item}=;expires=${OVER_TIME}; path=/; `;
    });
  };
}

const cookie = new Cookie();


// 供类型判断
export const getCookie = cookie.getCookie.bind(cookie);
export const setCookie = cookie.setCookie.bind(cookie);
export const delCookie = cookie.delCookie.bind(cookie);
export const clearCookie = cookie.clearCookie.bind(cookie);
