import React from "react";
import type { Metric } from "../../store/aggregator";
import classes from "./styles.module.css";
import { Cell } from "../cell/Cell.tsx";
type Props = {
     metric: Metric;
     isMain: boolean;
};

function dayOfYearToDate(dayNumber: number): string {
     if (dayNumber < 0) {
          throw new RangeError("dayNumber должен быть ≥ 0");
     }

     // Используем непривязанный к году расчёт:
     // 0 → 1 января, 1 → 2 января, …, 364 → 31 декабря, 365+ → 31 декабря
     const ordinal = Math.min(dayNumber + 1, 365);

     // Берём условный невисокосный год, чтобы не было смещения февраля
     const year = 2021;
     const date = new Date(year, 0); // 1 января этого года
     date.setDate(ordinal);

     const day = date.getDate();
     const monthNames = [
          "января",
          "февраля",
          "марта",
          "апреля",
          "мая",
          "июня",
          "июля",
          "августа",
          "сентября",
          "октября",
          "ноября",
          "декабря",
     ];
     const month = monthNames[date.getMonth()];

     return `${day} ${month}`;
}

export const HighLights: React.FC<Props> = (props) => {
     const {
          total_spend_galactic,
          rows_affected,
          less_spent_at,
          big_spent_civ,
          less_spent_civ,
          big_spent_at,
          big_spent_value,
          average_spend_galactic,
     } = props.metric;

     return (
          <div className={`${classes.main} ${props.isMain ? "" : classes.col}`}>
               <Cell
                    isMain={props.isMain}
                    title={total_spend_galactic.toString()}
                    body={"общие расходы в галактических кредитах"}
               />
               <Cell isMain={props.isMain} title={rows_affected.toString()} body={"количество обработанных записей"} />
               <Cell
                    isMain={props.isMain}
                    title={dayOfYearToDate(less_spent_at)}
                    body={"день года с минимальными расходами"}
               />
               <Cell isMain={props.isMain} title={big_spent_civ} body={"цивилизация с максимальными расходами"} />
               <Cell isMain={props.isMain} title={less_spent_civ} body={"цивилизация с минимальными расходами"} />
               <Cell
                    isMain={props.isMain}
                    title={dayOfYearToDate(big_spent_at)}
                    body={"день года с максимальными расходами  "}
               />
               <Cell
                    isMain={props.isMain}
                    title={big_spent_value.toString()}
                    body={"максимальная сумма расходов за день "}
               />
               <Cell
                    isMain={props.isMain}
                    title={average_spend_galactic.toString()}
                    body={"средние расходы в галактических кредитах"}
               />
          </div>
     );
};
