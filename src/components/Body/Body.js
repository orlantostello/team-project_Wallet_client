// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LeftBar from '../LeftBar';
import Rate from '../Rate';
import List from '../List/List';
import Diagram from '../Diagram/DiagramTab';
import s from './Body.module.css';

function Body() {
  return (
    <div className={s.backgroundImageCVR}>
      <div className={s.backgroundImage}></div>
      <div className={s.container}>
        <LeftBar />
        <Routes>
          <Route exact="true" path="" element={<List />} />
          <Route exact="true" path="diagram" element={<Diagram />} />
          <Route exact="true" path="rate" element={<Rate />} />
        </Routes>
      </div>
    </div>
  );
}
export default Body;
