import React from "react";
import type { Metric } from "../../store/aggregator";
import classes from "./styles.module.css";
import { Cell } from "../cell/Cell.tsx";
type Props = {
     metric: Metric;
     isMain: boolean;
};

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
                    title={less_spent_at.toString()}
                    body={"день года с минимальными расходами"}
               />
               <Cell isMain={props.isMain} title={big_spent_civ} body={"цивилизация с максимальными расходами   "} />
               <Cell isMain={props.isMain} title={less_spent_civ} body={"цивилизация с минимальными расходами"} />
               <Cell
                    isMain={props.isMain}
                    title={big_spent_at.toString()}
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
