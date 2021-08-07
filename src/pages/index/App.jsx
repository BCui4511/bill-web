import { Component } from 'react';
import './App.css';
import BG_IMG from './img/bg.png';
import { gaussBlur } from './utils/index';

class App extends Component {
  componentDidMount() {
    const canvas = document.getElementById('canvas-background');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = BG_IMG;
    img.onload = () => {
      // 将图像绘制到canvas上面
      ctx.drawImage(img, 0, 0, 60, 40);
      // 从画布获取部分图像
      const data = ctx.getImageData(0, 0, 60, 40);
      // 将图像数据进行高斯模糊
      const emptyData = gaussBlur(data);
      // 将模糊的图像数据再渲染到画布上面
      ctx.putImageData(emptyData, 0, 0);
    };
  }

  render() {
    return (
      <>
        <canvas id="canvas-background" className="canvas-background" width="60" height="40" />
        <div className="App">
          <main className="App-main">
            Hello world! This is Bill
            <div className="tip">coming soon...</div>
          </main>
        </div>
      </>
    );
  }
}

export default App;
