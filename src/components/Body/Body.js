// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LeftBar from '../LeftBar';
import Balance from '../Balance';
import Rate from '../Rate';
import List from '../List/List';
import Diagram from '../Diagram/DiagramTab/DiagramTab'

import React, { Fragment } from 'react';
import Media from 'react-media';

import s from './Body.module.css';

function Body() {
  return (
    <div className={s.backgroundImageCVR}>
      <div className={s.backgroundImage}></div>
      <div className={s.container}>
        <LeftBar />
        <Routes>
          <Route exact="true" path="" element={
            <Media
              queries={{
                small: '(max-width: 767px)',
                medium: '(min-width: 768px) and (max-width: 1279px)',
                large: '(min-width: 1280px)',
              }}>
              
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
          } />
          <Route exact="true" path="diagram" element={<Diagram />} />
          <Route exact="true" path="rate" element={
            <Media
              queries={{
                small: '(max-width: 767px)',
                medium: '(min-width: 768px) and (max-width: 1279px)',
                large: '(min-width: 1280px)',
              }}>
              
              {matches => (
                <Fragment>
                  {matches.small && (
                    <Rate />
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
          } />
        </Routes>
      </div>
    </div>
  );
}
export default Body;
