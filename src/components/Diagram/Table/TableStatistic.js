import PropTypes from 'prop-types';
import s from './Table.module.css'

export default function TableStatistic({ categoriesTable, costsSumStatistic, income }) {
    return (
        <ul>
            <li
                className={s.tableTitle}>                
                <p>Категория</p><p>Сумма</p>
            </li>
                {categoriesTable.map(item => (
                    <li key={item.name + Math.random()} className={s.tableItem}>
                       <div  className={s.marker} style={{ backgroundColor: `${item.color}` }}></div>
                        <div className={s.itemInfo}>                            
                            <p className={s.itemName}>{item.name}</p>
                            <p>{item.cost}</p>
                        </div>
                    </li>
                ))}
            <li className={s.tableTitleCosts}>
                    <p>Расходы</p>
                    <p className={s.totalCosts}>{costsSumStatistic}</p>
            </li>
            <li className={s.tableTitleIncome}>
                    <p>Доходы</p>
                    <p className={s.totalIncome}>{income}</p>
            </li>
        </ul>
    )
}

TableStatistic.propTypes = {
    costs:PropTypes.array,
    costsSumStatistic:PropTypes.string,
    income:PropTypes.string,  
};