import { ThreeDots } from 'react-loader-spinner';

import s from './Loader.module.css';

export default function Loader() {
  return (
    <div className={s.box}>
      <div className={s.spinner}>
        <ThreeDots color="#24cca7" width={100} />
      </div>
    </div>
  );
}
