import React from 'react';
import { HEADER_NAME } from '../../../constants/constants';
import s from '../Item/Item.module.css';
import { capitalizeFirsLetter } from '../../../helper/helper';

function Item({ elem, categories }) {
  return (
    <li className={s.HomeTableBody}>
      <div className={s.box}>
        <span className={s.test}>{capitalizeFirsLetter(HEADER_NAME.DATA)}</span>
        <span className={s.TableRow}>
          {new Date(elem.date).toLocaleString('ru', {
            day: 'numeric',
            month: 'numeric',
            year: '2-digit',
          })}
        </span>
      </div>

      <div className={`${s.box} ${s.center}`}>
        <span className={s.test}>{capitalizeFirsLetter(HEADER_NAME.TYPE)}</span>
        <span className={s.TableRow}>{elem.isIncome ? '+' : '-'}</span>
      </div>

      <div className={s.box}>
        <span className={s.test}>{capitalizeFirsLetter(HEADER_NAME.CATEGORY)}</span>
        <span className={s.TableRow}>
          {capitalizeFirsLetter(
            elem.isIncome ? categories.income[elem.category] : categories.costs[elem.category],
          )}
        </span>
      </div>

      <div className={s.box}>
        <span className={s.test}>{capitalizeFirsLetter(HEADER_NAME.COMMENTARY)}</span>
        <span className={s.TableRow}>{capitalizeFirsLetter(elem.comment)}</span>
      </div>

      <div className={`${s.box} ${s.center}`}>
        <span className={s.test}>{capitalizeFirsLetter(HEADER_NAME.AMOUNT)}</span>
        <span
          className={`${s.TableRow} ${s.bold}`}
          style={{ color: elem.isIncome ? 'var(--green-text)' : 'var(--pink-text)' }}
        >
          {Number(elem.amount)
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
        </span>
      </div>

      <div className={`${s.box} ${s.center}`}>
        <span className={s.test}>{capitalizeFirsLetter(HEADER_NAME.BALANCE)}</span>
        <span className={s.TableRow}>
          {Number(elem.currentBalance)
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
        </span>
      </div>
    </li>
  );
}
export default Item;
