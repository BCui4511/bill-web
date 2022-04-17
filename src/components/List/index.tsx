import { TYPE_ENUM } from '../../utils/types';
import { LIST_IMG_MAP, LIST_NAME_MAP } from './const';

import './index.scss';

interface ListProps {
  type: TYPE_ENUM;
}

export default function List(props: ListProps) {
  const { type } = props;

  const renderCard = (index: number) => {
    return <li className="card-item" key={index.toString()}></li>;
  };

  return (
    <section className="list-wrap">
      <div className={`list-title img-${type}`}>
        <img className="title-img" src={LIST_IMG_MAP[type]} />
        <span className="text">{LIST_NAME_MAP[type]}</span>
      </div>
      <ul className="card-list">
        {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
          return renderCard(index);
        })}
      </ul>
    </section>
  );
}
