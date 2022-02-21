import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Container from '../Container/Container';
import ChartStatistic from '../Chart/ChartStatistic';
import TableStatistic from '../Table/TableStatistic';
import colorsDiagram from '../colorsDiagram';
import categoriesSelectors from '../../../redux/categories/categories-selectors';
import transactionsSelectors from '../../../redux/transactions/transactions-selectors';
import { transactionsOperations } from '../../../redux/transactions';
import s from './DiagramTab.module.css';

export default function DiagraTab() {
  let today = new Date();

  const [month, setMonth] = useState(() => {
    const initialState = today.toLocaleString('ru', { month: 'long' });
    return initialState;
  });
  const [year, setYear] = useState(() => {
    const initialState = String(today.getFullYear());
    return initialState;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    const monthNumber = (months.indexOf(month) + 1).toString();
    dispatch(transactionsOperations.getStatistics({ searchParams: { month: monthNumber, year } }));
  }, [month, year]);

  const categories = useSelector(categoriesSelectors.getAllCategories);
  const userDataInfo = useSelector(transactionsSelectors.getStatistics);

  const months = [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ];
  const years = ['2022', '2021', '2020'];

  function changeSelect(e) {
    const { name, value } = e.target;

    switch (name) {
      case 'month':
        setMonth(value);
        break;

      case 'year':
        setYear(value);
        break;

      default:
        return;
    }
  }

  const arrCategories = Object.values(categories.costs); //categories name
  const arrCategoriesCosts = Object.values(userDataInfo.categories); // categories costs

  const arrCategoriesCostsForRender = arrCategoriesCosts.map(
    item => parseFloat(Number((item * 100) / 100)).toFixed(2), //'100.76', '200.12', '30.90', '400.02', '50.00',
  );

  const categoriesTable = arrCategories.map(function (item, index) {
    //make obj for render to table
    return {
      name: item,
      cost: arrCategoriesCostsForRender[index] || '0',
      color: colorsDiagram[index],
    };
  });

  const costsSum = arrCategoriesCostsForRender
    .map(item => Number(item))
    .reduce(function (sum, elem) {
      return sum + elem;
    }, 0);

  const costsSumStatistic = costsSum.toFixed(2);

  const costsCategoryChart = arrCategoriesCosts.map(item =>
    Math.round((360 / costsSum) * Number(item)),
  );

  const totalIncome = Number(userDataInfo.totalIncome).toFixed(2);

  return (
    <Container
      tag={'h2'}
      title={'Статистика'}
      styleContainer={s.section}
      styleTitle={s.sectionTitle}
    >
      <Container styleContainer={s.statisticContainer}>
        <ChartStatistic
          costsSumStatistic={costsSumStatistic}
          costsCategoryChart={costsCategoryChart}
          colorsDiagram={colorsDiagram}
        />

        <div>
          <div className={s.select}>
            <select name="month" value={month} onChange={changeSelect}>
              {months.map((item, ind) => (
                <option key={ind} className={s.itemSelect}>
                  {item}{' '}
                </option>
              ))}
            </select>

            <select name="year" value={year} onChange={changeSelect}>
              {years.map((item, ind) => (
                <option key={ind} className={s.itemSelect}>
                  {item}{' '}
                </option>
              ))}
            </select>
          </div>

          <TableStatistic
            categoriesTable={categoriesTable}
            costsSumStatistic={costsSumStatistic}
            income={totalIncome}
          />
        </div>
      </Container>
    </Container>
  );
}
