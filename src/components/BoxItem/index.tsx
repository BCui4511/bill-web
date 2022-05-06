import { TYPE_ENUM } from '../../utils/types';
import './index.scss';

interface BoxItemProps {
  title: string;
  abstract: string;
  type: TYPE_ENUM;
  id: number;
}

export default function BoxItem(props: BoxItemProps) {
  return (
    <li className={`box-item type-${props.type}`}>
      <title className="title">{props.title}</title>
      <p className="abstract">{props.abstract}</p>
    </li>
  );
}
