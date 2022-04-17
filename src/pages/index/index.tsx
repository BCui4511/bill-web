import * as React from 'react';
import './index.scss';

import { TAGS } from './utils/const';

export default class indexPage extends React.Component {
  renderHeader() {
    return (
      <header className="header-wrap">
        <div className="top-tip">
          {TAGS.map((item) => {
            return (
              <span className="tag" key={item}>
                #{item}
              </span>
            );
          })}
        </div>
      </header>
    );
  }
  renderNameHeader() {
    return (
      <div className="name-tag">
        <span>Advanced Bill</span>
        <div className="liquid"></div>
      </div>
    );
  }
  render() {
    return (
      <div className="index-page">
        {this.renderHeader()}
        {this.renderNameHeader()}
      </div>
    );
  }
}
