import Header from './Header/Header';
import Item from './Item/Item';

const data = [
  {
    _id: '620caa5efdf95292ade34849',
    owner: '620ca806fdf95292ade34836',
    category: '2',
    comment: 'oil',
    amount: 2000,
    currentBalance: 6000,
    isIncome: true,
    date: 1645007141919,
    month: 'NaN',
    year: 'NaN',
  },
  {
    _id: '620cbb686ae74c947659ac7a',
    owner: '620ca806fdf95292ade34836',
    category: '3',
    comment: 'food',
    amount: 2000,
    currentBalance: 4000,
    isIncome: false,
    date: 1645007223601,
    month: 'NaN',
    year: 'NaN',
  },
  {
    _id: '620cbb986ae74c947659ac81',
    owner: '620ca806fdf95292ade34836',
    category: '5',
    comment: 'подарок',
    amount: 2000,
    currentBalance: 4000,
    isIncome: false,
    date: 1645007440852,
    month: 'NaN',
    year: 'NaN',
  },
];
const categories = {
  costs: {
    1: 'одежда',
    2: 'еда',
    3: 'транспорт',
    4: 'спорт',
    5: 'дети',
    6: 'домашние животные',
    7: 'дом',
    8: 'образование',
    9: 'развлечения',
    10: 'здоровье',
    11: 'другие',
  },
  income: {
    1: 'регулярные доходы',
    2: 'нерегулярные доходы',
  },
};

function List() {
  return (
    <ul>
      <Header />
      {data.map(elem => (
        <Item key={elem._id} elem={elem} categories={categories} />
      ))}
    </ul>
  );
}

export default List;
