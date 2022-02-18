import { useState } from 'react';
// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';

import Container from '../Container/Container';
import ChartStatistic from '../Chart/ChartStatistic';
import TableStatistic from '../Table/TableStatistic';
import colorsDiagram from '../colorsDiagram';

import s from './DiagramTab.module.css'

export default function DiagraTab() {

    let today = new Date();
 
    const [month, setMonth] = useState(() => {
        const initialState =     
         today.toLocaleString('ru', { month: 'long' });   
        return initialState;
    });
    const [year, setYear] = useState(() => {
        const initialState = String(today.getFullYear())        
        return initialState;
    });
    
    //const userDataInfo = useSelector(getCosts);
    // const categoriesRu = useSelector(getCategories);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //      dispatch(fetchCosts());
    // }, [month, year])
    
    const userDataInfo = {               // get from back   
    "totalExpenditures": 0,
    "totalIncome": '420420',
    "categories": {
        "1":' 100.006',
        "2":' 200.017',
        "3": '30.022',
        "4":'400.05',
        "5":' 50.005',
        "6": '600',
        "7":' 250',
        "8": '140',
        "9": '220',
        "10": '80',
        "11":'740'
    }
}

    const categoriesRU = {           // get from back  
    "costs": {
        "1": "одежда",
        "2": "еда",
        "3": "транспорт",
        "4": "спорт",
        "5": "дети",
        "6": "домашние животные",
        "7": "дом",
        "8": "образование",
        "9": "развлечения",
        "10": "здоровье",
        "11": "другие"
    },
    "income": {
        "1": "регулярные доходы",
        "2": "нерегулярные доходы"
    }
}

    const months = ['январь', 'февраль', 'март', 'апрель',
        'май', 'июнь', 'июль', 'август', 'сентябрь',
        'октябрь', 'ноябрь', 'декабрь'
    ]
    const years = ['2022', '2021', '2020']
 
    function chengeSelect(e) {
        const { name, value }= e.target;
 
            switch (name)  {
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

    const monthNumber = months.indexOf(month) + 1

    const newDate = {                     //send to back            
        month: String(monthNumber),
        year: year,      
    };  

    
    const arrCategoriesRU = Object.values(categoriesRU.costs)          //categories name    
    const arrCategoriesCosts = Object.values(userDataInfo.categories) // categories costs
    
    const arrCategoriesCostsForRender = arrCategoriesCosts.map(item => (
        parseFloat(Number((item*100)/100)).toFixed(2)                //'100.76', '200.12', '30.90', '400.02', '50.00',             
    ))
 
        
    const categoriesTable = arrCategoriesRU.map(function (item, index) { //make obj for render to table       
        return {
            'name': item,        
            'cost': arrCategoriesCostsForRender[index]||'0',
            'color':colorsDiagram[index]
        }
    })       
    
    const costsSum = arrCategoriesCostsForRender
        .map(item =>(Number(item)))
        .reduce(function (sum, elem) {            
            return sum + elem;        
        }, 0);
    
    const costsSumStatistic = costsSum.toFixed(2)
    
    const costsCategoryChart = arrCategoriesCosts.map(item => Math.round(360 / costsSum * Number(item)))
    
    const  totalIncome  = Number(userDataInfo.totalIncome).toFixed(2)
    
    return (
        <Container
            tag={'h2'}
            title={'Статистика'}
            styleContainer={s.section}
            styleTitle={s.sectionTitle}
        >
            <Container                    
                styleContainer={s.statisticContainer}            
            >
                <ChartStatistic
                    costsSumStatistic={costsSumStatistic}
                    costsCategoryChart={costsCategoryChart}
                    colorsDiagram={colorsDiagram}
                />

                <div>
                    <div className={s.select}> 
                        
                    <select
                        name='month'
                        value={month}
                        onChange={chengeSelect}
                    >                        
                        {months.map((item,ind) => (                           
                            <option
                                key={ind}
                                className={s.itemSelect}
                            >{item} </option>                            
                        ))}                      
                    </select>               
                
                    <select
                            name='year'
                            value={year}                        
                            onChange={chengeSelect}                         
                        >      
                            
                        {years.map((item,ind) => (                           
                            <option
                                key={ind}
                                className={s.itemSelect}
                            >{item} </option>                            
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
    )
}
