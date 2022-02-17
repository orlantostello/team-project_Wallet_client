import React from 'react';
import s from '../Header/Header.module.css';

function Header() {
  return (
    <li className={s.HomeTableHead}>
      <span className={s.TableRow}>Дата</span>
      <span className={s.TableRow}>Тип</span>
      <span className={s.TableRow}>Категория</span>
      <span className={s.TableRow}>Комментарий</span>
      <span className={s.TableRow}>Сумма</span>
      <span className={s.TableRow}>Баланс</span>
    </li>
  );
}

export default Header;
