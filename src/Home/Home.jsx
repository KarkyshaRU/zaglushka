import React from "react";

import Header from "../components/Header";
import s from "./Home.module.scss";

function Home() {
  return (
    <>
      <Header />

      <div className={s.home}>
        <div className={s.text}>
          <div className={s.title}>
            Сервис патронажных услуг "Добрые руки"- начало открытого
            тестирования 13.12.2020
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
