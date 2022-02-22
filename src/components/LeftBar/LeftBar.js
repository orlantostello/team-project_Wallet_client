import Navigation from '../Navigation';
import Balance from '../Balance';
import Rate from '../Rate';

import useMediaQuery from '../../hooks/useMediaQuery';

import s from './LeftBar.module.css';

function LeftBar(props) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(max-width: 1279px)');

  return (
    <>
      {isMobile ? (
        <span>
          <Navigation />
          {/* <Balance /> */}
        </span>
      ) : isTablet ? (
        <div className={s.Leftbar}>
          <div>
            <Navigation />
            <Balance />
          </div>
          <Rate />
        </div>
      ) : (
        <div className={s.Leftbar}>
          <Navigation />
          <Balance />
          <Rate />
        </div>
      )}
    </>
  );
}

export default LeftBar;
