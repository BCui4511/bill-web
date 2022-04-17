import { TYPE_ENUM } from '../../utils/types';
import NEW_IMG from './imgs/1.png';
import TECH_IMG from './imgs/2.png';
import LIFE_IMHG from './imgs/3.png';
import CAMERA_IMG from './imgs/4.png';

export const LIST_IMG_MAP = {
  [TYPE_ENUM.new]: NEW_IMG,
  [TYPE_ENUM.tech]: TECH_IMG,
  [TYPE_ENUM.life]: LIFE_IMHG,
  [TYPE_ENUM.camera]: CAMERA_IMG
};

export const LIST_NAME_MAP = {
  [TYPE_ENUM.new]: '最新动态',
  [TYPE_ENUM.tech]: '技术成长',
  [TYPE_ENUM.life]: '生活随笔',
  [TYPE_ENUM.camera]: '记录影像'
};
