import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { data } from './data-router';
import styles from './style.module.css';

function Admin() {
  return (
    <>
      <Routes>
        {data.map(elem => (
          <Route
            key={elem.path}
            path={elem.path}
            element={
              <Suspense
                id="loader"
                fallback={
                  <div className={styles.loader_wrapp}>
                    <HashLoader
                      size={70}
                      color="#368fd7"
                    />
                  </div>
                }
              >
                {elem.Element}
              </Suspense>
            }
          />
        ))}
      </Routes>
    </>
  );
}

export default Admin;
