# gradient-progress

## 属性说明

|属性名|类型|默认值|说明|
| -- | -- | --|--|
| progress | Number | 10 | 进度 |
| color1 | String | '#72EDE3' | 渐变颜色1 |
| color2 | String | '#A08EFF' | 渐变颜色2 |
| filterDeg | Number | 0 | 滤镜设置色调旋转 |
| playNum | Number/String | 1 infinite:无限次播放 | 动画的播放次数 |
| duration | String | 2s | 动画的播放时长 |
带有slot插槽

## 使用示例

```html
<gradient-progress :progress="progress" color1="#72EDE3" color2="#A08EFF">魅力指数</gradient-progress>

```

```javascript
import gradientProgress from '@/components/gradient-progress/gradient-progress.vue'
export default {
  components: {
	gradientProgress
  },
  data() {
    return {
		progress:78
     }
  },
}
```

## 效果图

![]()
