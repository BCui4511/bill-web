export const NODE_ENV_MAP = {
  dev: 'development',
  test: 'test',
  production: 'production'
};

export class Env {
  uaLowerCase = navigator.userAgent.toLowerCase();

  getUA() {
    return window.navigator.userAgent;
  }

  getEnv() {
    return process.env.NODE_ENV;
  }

  isDevEnv() {
    return this.getEnv() === NODE_ENV_MAP.dev;
  }

  isTestEnv() {
    return this.getEnv() === NODE_ENV_MAP.test;
  }

  isMobile() {
    return /Android|iPhone|iPod|BlackBerry|IEMobile|MiniProgram|iPad/i.test(this.getUA());
  }

  isProdEnv() {
    return this.getEnv() === NODE_ENV_MAP.production;
  }

  isIOS() {
    return /iPhone|iPod|iPad/i.test(this.getUA());
  }

  isAndroid() {
    return this.uaLowerCase.indexOf('android') !== -1;
  }
}

const env = new Env();

export const getEnv = env.getEnv.bind(env);
export const isLocalEnv = env.isDevEnv.bind(env);
export const isTestEnv = env.isTestEnv.bind(env);
export const isMobile = env.isMobile.bind(env);
export const isProdEnv = env.isProdEnv.bind(env);
export const isIOSEnv = env.isIOS.bind(env);
export const isAndroidEnv = env.isAndroid.bind(env);
