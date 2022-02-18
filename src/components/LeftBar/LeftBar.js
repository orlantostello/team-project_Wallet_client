import Navigation from '../Navigation';
import Balance from '../Balance';
import Rate from '../Rate';

import React, { Fragment } from 'react';
// import { NavLink } from 'react-router-dom';
import Media from 'react-media';
// import { MdHome, MdTimeline, MdAttachMoney } from 'react-icons/md';

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
              <Balance />
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
            <span>
              <Navigation />
              <Balance />
              <Rate />
            </span>
          )}
        </Fragment>
      )}
    </Media>
  );
}

export default LeftBar;
