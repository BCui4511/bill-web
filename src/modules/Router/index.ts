import { History } from 'history';

export class Router {
  historyInstance: History<any> | null = null;

  initHistory(history: History<any>): void {
    if (this.historyInstance) {
      throw Error('[initHistory] 错误：history 已初始化，不能重复初始化');
    }
    this.historyInstance = history;
  }

  getHistory(): History {
    if (!this.historyInstance) {
      throw Error('[getHistory] 错误：history 尚未初始化');
    }
    return this.historyInstance;
  }

  pushPathWithSearch(path: string): void {
    const history = this.getHistory();
    history.push(`${path}${history.location.search}`);
  }

  replacePathWithSearch(path: string): void {
    const history = this.getHistory();
    history.replace(`${path}${history.location.search}`);
  }

  replceToIndex(): void {
    this.replacePathWithSearch('/index');
  }
}

const CustomRouter = new Router();

export default CustomRouter;
