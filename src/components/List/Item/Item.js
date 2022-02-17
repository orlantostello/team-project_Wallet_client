import React from 'react';
import s from '../Item/Item.module.css';

function Item({ elem, categories }) {
  return (
    <li className={s.HomeTableBody}>
      <span className={s.TableRow}>
        {new Date(elem.date).toLocaleString('ru', {
          day: 'numeric',
          month: 'numeric',
          year: '2-digit',
        })}
      </span>
      <span className={s.TableRow}>{elem.isIncome ? '+' : '-'}</span>
      <span className={s.TableRow}>
        {elem.isIncome ? categories.income[elem.category] : categories.costs[elem.category]}
      </span>
      <span className={s.TableRow}>{elem.comment}</span>
      <span
        className={s.TableRow}
        style={{ color: elem.isIncome ? 'var(--green-text)' : 'var(--pink-text)' }}
      >
        {elem.amount}
      </span>
      <span className={s.TableRow}>{elem.currentBalance}</span>
    </li>
  );
}
export default Item;
