import React from "react";
import { data } from "./data-router";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import NotFound from "../../components/notFound";
import Cookies from "universal-cookie";
import styles from "./style.module.css";
import HashLoader from "react-spinners/HashLoader";
function Manager() {
  return (
    <>
      <Routes>
        {data.map((elem) => (
          <Route
            path={elem.path}
            element={
              <Suspense
                id="loader"
                fallback={
                  <div className={styles.loader_wrapp}>
                    <HashLoader size={70} color="#368fd7" />
                  </div>
                }
              >
                {elem.Element}
              </Suspense>
            }
          />
        ))}

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default Manager;
