import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Media from 'react-media';

import LeftBar from '../LeftBar';
import Balance from '../Balance';
import Rate from '../Rate';
import List from '../List/List';
import Diagram from '../Diagram/DiagramTab/DiagramTab';
import { categoriesOperations } from '../../redux/categories';
import { transactionsOperations } from '../../redux/transactions';
import s from './Body.module.css';

function Body() {
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
              <Media
                queries={{
                  small: '(max-width: 767px)',
                  medium: '(min-width: 768px) and (max-width: 1279px)',
                  large: '(min-width: 1280px)',
                }}
              >
                {matches => (
                  <Fragment>
                    {matches.small && (
                      <div>
                        <Balance />
                        <List />
                      </div>
                    )}
                    {matches.medium && (
                      <div>
                        <List />
                      </div>
                    )}
                    {matches.large && (
                      <div>
                        <List />
                      </div>
                    )}
                  </Fragment>
                )}
              </Media>
            }
          />
          <Route exact="true" path="diagram" element={<Diagram />} />
          <Route
            exact="true"
            path="rate"
            element={
              <Media
                queries={{
                  small: '(max-width: 767px)',
                  medium: '(min-width: 768px) and (max-width: 1279px)',
                  large: '(min-width: 1280px)',
                }}
              >
                {matches => (
                  <Fragment>
                    {matches.small && <Rate />}
                    {matches.medium && (
                      <div>
                        <List />
                      </div>
                    )}
                    {matches.large && (
                      <div>
                        <List />
                      </div>
                    )}
                  </Fragment>
                )}
              </Media>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
export default Body;
