import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Media from 'react-media';
import useMediaQuery from '../../hooks/useMediaQuery';
import { MdHome, MdTimeline, MdAttachMoney } from 'react-icons/md';

import s from './Navigation.module.css';

function Navigation() {
  let isLinkActive = ({ isActive }) => (isActive ? s.activeLink : s.link);
  const isMobile = useMediaQuery('(max-width: 767px)');

  return isMobile ? (
    <>
      <div className={s.container}>
        <ul className={s.list}>
          <li className={s.item}>
            <NavLink end to="/current" className={isLinkActive}>
              <MdHome className={s.svg} />
            </NavLink>
          </li>
          <li className={s.item}>
            <NavLink end to="/current/diagram" className={isLinkActive}>
              <MdTimeline className={s.svg} />
            </NavLink>
          </li>
          <li className={s.item}>
            <NavLink end to="/current/rate" className={isLinkActive}>
              <MdAttachMoney className={s.svg} />
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  ) : (
    <>
      <div className={s.container}>
        <ul className={s.list}>
          <li className={s.item}>
            <NavLink end to="/current" className={isLinkActive}>
              <MdHome className={s.svg} />
              <div className={s.itemTitle}>Главная</div>
            </NavLink>
          </li>
          <li className={s.item}>
            <NavLink end to="/current/diagram" className={isLinkActive}>
              <MdTimeline className={s.svg} />
              <div className={s.itemTitle}>Статистика</div>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navigation;
