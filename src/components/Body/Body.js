import s from './Body.module.css';
import LeftBar from '../LeftBar';
import Rate from '../Rate';
import List from '../List/List'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function Body() {

  return (
    <div className={s.container}> 
      <LeftBar />

        <Routes>
        <Route exact path="" element={
          <List/>
            } />
            <Route exact path="diagram" element={
              <h1>Это диаграмма</h1>
            } />
            <Route exact path="rate" element={
              <Rate />
            } />
        </Routes>


    </div>
  );
}
export default Body;
