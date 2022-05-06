import * as React from 'react';
import './index.scss';

import { TYPE_ENUM } from '../../utils/types';
import Footer from '../../components/Footer';
import List from '../../components/List';

export default class indexPage extends React.Component {
  renderHeader() {
    return <header className="header-wrap"></header>;
  }
  renderNameHeader() {
    return (
      <div className="name-tag">
        <span>Advanced Bill</span>
        <div className="liquid"></div>
      </div>
    );
  }

  renderList() {
    return (
      <>
        <List type={TYPE_ENUM.new} />
        <List type={TYPE_ENUM.tech} />
        <List type={TYPE_ENUM.life} />
        <List type={TYPE_ENUM.camera} />
      </>
    );
  }

  render() {
    return (
      <div className="index-page">
        {this.renderHeader()}
        {this.renderNameHeader()}
        {this.renderList()}
        <Footer />
      </div>
    );
  }
}
