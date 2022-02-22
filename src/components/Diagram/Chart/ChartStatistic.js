import PropTypes from 'prop-types';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import s from './Chart.module.css'

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartStatistic({ costsSumStatistic, costsCategoryChart, colorsDiagram }) { 
        const data = {   
        datasets: [{           
            data: costsCategoryChart||[360],
            backgroundColor:colorsDiagram,            
            borderColor:colorsDiagram,         
            borderWidth: 1,
            },
        ],
    };

    const options = {
        cutout: `70%`, 
        hoverOffset: 5,
        plugins: {
            tooltip: {
                enabled: false
            },    
        }
    }
    
    
    return (        
        <div className={s.chartContainer} >             
            <Doughnut                              
                data={data}                      
                options={options}               
            />  
            
            
            <pre className={s.chartText}>              
               &#8372; {costsSumStatistic}    
            </pre>
            
        </div>               
    )     
}

ChartStatistic.propTypes = {
    costsSumStatistic: PropTypes.string,
    costsCategory: PropTypes.array, 
    colorsDiagram:PropTypes.array,
};