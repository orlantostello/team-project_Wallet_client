import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';

import LeftBar from '../LeftBar';
import Balance from '../Balance';
import Rate from '../Rate';
import List from '../List/List';
import Diagram from '../Diagram/DiagramTab/DiagramTab';
import { categoriesOperations } from '../../redux/categories';
import { transactionsOperations } from '../../redux/transactions';
import s from './Body.module.css';

function Body() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoriesOperations.categories({ searchParams: { lang: 'ru' } }));
    dispatch(transactionsOperations.getAllTransactions());
  }, [dispatch]);

  return (
    <div className={s.backgroundImageCVR}>
      <div className={s.backgroundImage}></div>
      <div className={s.container}>
        <LeftBar />
        <Routes>
          <Route
            exact="true"
            path=""
            element={
              <>
                {isMobile ? (
                  <div>
                    <Balance />
                    <List />
                  </div>
                ) : (
                  <div>
                    <List />
                  </div>
                )}
              </>
            }
          />
          <Route exact="true" path="diagram" element={<Diagram />} />
          <Route
            exact="true"
            path="rate"
            element={
              <>
                {isMobile ? (
                  <Rate />
                ) : (
                  <div>
                    <List />
                  </div>
                )}
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
export default Body;
