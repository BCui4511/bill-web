import querystring from 'query-string';

// 浏览器对象相关，url 取值、屏幕、winname 等
// 修改下parse方法声明，默认parse出来一定是个字符串
export interface ParsedUrlQuery {
  readonly [key: string]: string;
}

export interface QueryOrHashObj {
  readonly [key: string]: string | number | undefined;
}

export interface Winname {
  readonly set: (name: string, value: any) => void;
  readonly get: (name: string) => string;
  readonly del: (name: string) => void;
}

/*
 * 多端统一约束接口Bom
 */
export class Bom {
  /**
   * 获取 window.location
   * @category url 处理
   */
  getLocation(): Location {
    return window.location;
  }

  /**
   * 给链接（//开头）加上当前 protocol
   *
   * @export
   * @param {string} url
   * @category url 处理
   */
  addProtocol(url: string): string {
    if (/^\/\//.test(url)) {
      return this.getLocation().protocol + url;
    }
    return url;
  }

  /**
   * 根据字段获取 url 参数的值，优先取 query，如没有则取 hash
   * @param n url 参数
   * @returns 优先取 query，如没有则取 hash
   * @category url 处理
   */
  getUrlParameter(n: string): string {
    return this.getQuery(n) || this.getHash(n);
  }


  /**
   * 获取 query 对象，以键值对形式返回
   * @category url 处理
   */
  getQueryObj(url?: string): ParsedUrlQuery {
    if (!url) {
      return querystring.parse(this.getLocation().search ?? '') as ParsedUrlQuery;
    }

    const idx = url.indexOf('?');
    const hashIdx = url.indexOf('#');

    // eslint-disable-next-line no-nested-ternary
    const query = idx === -1 ? '' : hashIdx === -1 ? url.slice(idx) : url.slice(idx, hashIdx);

    return querystring.parse(query) as ParsedUrlQuery;
  }

  /**
   * 获取 hash 对象，以键值对形式返回
   * @category url 处理
   */
  getHashObj(url?: string): ParsedUrlQuery {
    if (!url) {
      return querystring.parse(this.getLocation().hash ?? '') as ParsedUrlQuery;
    }

    const idx = url.indexOf('#');

    return querystring.parse(idx === -1 ? '' : url.slice(idx)) as ParsedUrlQuery;
  }

  /**
 * 设置 hash 值。传入键值对对象，拼接成 url
 *
 * @param {({ [k: string]: string | number })} hashObject hashObject
 * @param {string} [link=''] url 链接。如不传，则当前页面hash立即改变生效；如传值，可从返回值拿到完整链接，业务再自行处理
 * @returns 拼接成的完整 url
 * @category url 处理
 */
  setHash(hashObject: QueryOrHashObj | string, link = '') {
    let kvs = '';
    if (typeof hashObject === 'string') {
      kvs = hashObject;
    } else {
      const hashObj = { ...this.getHashObj(), ...hashObject };
      kvs = querystring.stringify(hashObj);
    }

    if (!link) {
      // 设置当前页面hash
      window.location.hash = `#${kvs}`;
    }

    let idx = link.indexOf('#');
    const seb = idx !== -1 ? '' : '#';
    idx = idx !== -1 ? idx + 1 : link.length;
    const url = link.substring(0, idx) + seb + kvs;

    return url;
  }

  /**
   * 根据字段获取url query参数的值
   * @param n url参数
   * @category url 处理
   */
  getQuery(n: string): string {
    const searchObj = this.getQueryObj();
    return searchObj[n] || '';
  }

  /**
   * 根据字段获取 url hash 的值
   * @param str 所需获取的字段
   * @returns
   * @category url 处理
   */
  getHash(str: string) {
    const hashObj = this.getHashObj();

    return hashObj[str] || '';
  }

  /**
   * 判断屏幕是否处于横屏状态
   *
   * @returns
   * @category 屏幕相关
   */
  isInLandscape(): boolean {
    if (window.matchMedia) {
      return window.orientation >= 90 && window.matchMedia('(orientation: landscape)').matches;
    }
    const { width, height } = this.getDeviceRect();

    // 不支持matchMedia的情况
    return width > height;
  }

  /**
   * 设置 URL 中的查询参数
   *
   * @param obj 查询参数（对象形式）
   * @param options 修改选项
   * @param options.url 需要修改的 URL，不传则直接操作 window.location
   * @param options.isReplace 是否完全替换 URL 中的查询参数
   */
  setUrlQuery(
    obj: QueryOrHashObj,
    {
      url,
      isReplace,
      isPushState,
    }: { readonly url?: string; readonly isReplace?: boolean; isPushState?: boolean } = {},
  ): string {
    const { location } = window;

    if (!url) {
      const { origin, pathname, hash } = location;
      const search = `?${querystring.stringify(isReplace ? obj : { ...this.getQueryObj(), ...obj })}`;
      const newUrl = `${origin}${pathname}${search}${hash}`;

      if (window.history && typeof window.history.replaceState === 'function') {
        if (isPushState) {
          window.history.pushState({}, document.title, newUrl);
        } else {
          window.history.replaceState({}, document.title, newUrl);
        }
      } else {
        location.search = search;
      }

      return newUrl;
    }
    const queryIdx = url.indexOf('?');
    const hashIdx = url.indexOf('#');
    // eslint-disable-next-line no-nested-ternary
    const pathname = queryIdx !== -1 ? url.substring(0, queryIdx) : hashIdx !== -1 ? url.substring(0, hashIdx) : url;
    const search = `?${querystring.stringify(isReplace ? obj : { ...this.getQueryObj(url), ...obj })}`;
    const hash = hashIdx === -1 ? '' : `#${querystring.stringify(this.getHashObj(url))}`;

    return `${pathname}${search}${hash}`;

  }

  /**
   * 获取屏幕宽高
   *
   * @returns
   * @category 屏幕相关
   */
  getDeviceRect(): {
    width: number;
    height: number;
    } {
    const { innerWidth, innerHeight } = window;
    const { clientWidth = 0, clientHeight = 0 } = document.documentElement || {};

    const width = Math.min(innerWidth, clientWidth) || document.body.clientWidth;
    const height = Math.min(innerHeight, clientHeight) || document.body.clientHeight;

    return { width, height };
  }

  /**
   * 转换链接为https协议
   *
   * @param {string} url
   */
  httpsProtocol(url: string) {
    if (/^https:/.test(url)) {
      return url;
    }
    if (/^http:/.test(url)) {
      const value = url;
      return value.replace('http', 'https');
    }
    if (/^\/\//.test(url)) {
      return `https:${url}`;
    }
    return url;
  }

}

const bom = new Bom();

export const getLocation = bom.getLocation.bind(bom);
export const addProtocol = bom.addProtocol.bind(bom);
export const getUrlParameter = bom.getUrlParameter.bind(bom);
export const getQueryObj = bom.getQueryObj.bind(bom);
export const getQuery = bom.getQuery.bind(bom);
export const getHashObj = bom.getHashObj.bind(bom);
export const getHash = bom.getHash.bind(bom);
export const setHash = bom.setHash.bind(bom);
export const setUrlQuery = bom.setUrlQuery.bind(bom);
export const isInLandscape = bom.isInLandscape.bind(bom);
export const getDeviceRect = bom.getDeviceRect.bind(bom);
export const httpsProtocol = bom.httpsProtocol.bind(bom);

