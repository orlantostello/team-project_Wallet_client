import Navigation from '../Navigation';
import Balance from '../Balance';
import Rate from '../Rate';

import React, { Fragment } from 'react';
import Media from 'react-media';


import s from './LeftBar.module.css';

function LeftBar(props) {
  return (
    <Media
      queries={{
        small: '(max-width: 767px)',
        medium: '(min-width: 768px) and (max-width: 1279px)',
        large: '(min-width: 1280px)',
      }}
    >
      {matches => (
        <Fragment>
          {matches.small && (
            <span>
              <Navigation />
              {/* <Balance /> */}
            </span>
          )}
          {matches.medium && (
            <div className={s.Leftbar}>
              <div>
                <Navigation />
                <Balance />
              </div>
              <Rate />
            </div>
          )}
          {matches.large && (
            <div className={s.Leftbar}>
              <Navigation />
              <Balance />
              <Rate />
            </div>
          )}
        </Fragment>
      )}
    </Media>
  );
}

export default LeftBar;
