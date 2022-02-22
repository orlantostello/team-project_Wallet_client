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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 import Loader from '../../Loader/Loader';


export default function DiagramTab() {
  
  const [month, setMonth] = useState(() => {
    const initialState = new Date().toLocaleString('ru', { month: 'long' });
    return initialState;
  });
  const [year, setYear] = useState(() => {
    const initialState = String(new Date().getFullYear());
    return initialState;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    const monthNumber = (months.indexOf(month) + 1).toString();
    dispatch(transactionsOperations.getStatistics({ searchParams: { month: monthNumber, year } }));
  }, [month, year]);

  const categories = useSelector(categoriesSelectors.getAllCategories);
  const userDataInfo = useSelector(transactionsSelectors.getStatistics);

  const isFetchingStatistic = useSelector(transactionsSelectors.getIsFetchingStatistic)
  const statisticsError = useSelector(transactionsSelectors.getStatisticsError)
  
 
   async function createNotification() {
    await toast.error('За данный период транзакций не было', {
      toastId: 'custom-id-yes',
    });
  }
  useEffect(() => {
    if (statisticsError) {
      createNotification()     
    } return
  },[statisticsError])
  

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

  const currentMonth = new Date().getMonth() + 1;
    
    const monthsSelect = (year === String(new Date().getFullYear()))
    ?months.slice(0, currentMonth)
    : months  
  
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

  const arrCategories = Object.values(categories.costs); 
  const arrCategoriesCosts = Object.values(userDataInfo.categories); 

  const arrCategoriesCostsForRender = arrCategoriesCosts.map(
    item => parseFloat(Number((item * 100) / 100)).toFixed(2), );

  function generateRandomColor() {
    let color =
      "#" +
      (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase();
    return color;
  }
  const categoriesTable = arrCategories.map(function (item, index) {    
    return {
      name: item,
      cost: arrCategoriesCostsForRender[index] || '0',
      color: colorsDiagram[index] || generateRandomColor(),
    };
  });

  const costsSum = arrCategoriesCostsForRender
    .map(item => Number(item))
    .reduce(function (sum, elem) {
      return sum + elem;
    }, 0);

  const costsSumStatistic = costsSum.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

   const costsCategoryChart = (costsSum)
    ? arrCategoriesCosts.map(item => Math.round((360 / costsSum) * Number(item)))
      :[360]
  

  const totalIncome = Number(userDataInfo.totalIncome).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  

  return (
    <Container
      tag={'h2'}
      title={'Статистика'}
      styleContainer={s.section}
      styleTitle={s.sectionTitle}
    >
      {isFetchingStatistic ? <Loader /> :
        <Container styleContainer={s.statisticContainer}>
        
          <ChartStatistic
            costsSumStatistic={costsSumStatistic}
            costsCategoryChart={costsCategoryChart}
            colorsDiagram={colorsDiagram} />

          <div>
            <div className={s.select}>
              <select name="month" value={month} onChange={changeSelect}>
                {monthsSelect.map((item, ind) => (
                  <option key={ind} className={s.itemSelect}>
                    {item}
                  </option>
                ))}
              </select>

              <select name="year" value={year} onChange={changeSelect}>
                {years.map((item, ind) => (
                  <option key={ind} className={s.itemSelect}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <TableStatistic
              categoriesTable={categoriesTable}
              costsSumStatistic={costsSumStatistic}
              income={totalIncome} />
          </div>
        </Container>
      }
       {statisticsError && <ToastContainer autoClose={3000} position="top-center" theme="colored" />}  
    </Container>
  );
}
