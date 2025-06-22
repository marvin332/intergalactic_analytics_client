import React from "react";
import { useStore } from "../../../../app/store";
import { Row } from "../../../../entities/row/Row.tsx";
import classes from "./styles.module.css";
import { HistoryPopUp } from "../historyPopUp/HistoryPopUp.tsx";
export const History = () => {
     const rows = useStore((state) => state.history.rows);
     const getRows = useStore((state) => state.history.getRows);
     const deleteRow = useStore((state) => state.history.deleteRow);

     React.useEffect(() => {
          getRows();
     }, []);

     const onDelete = (id: string) => {
          deleteRow(id);
     };

     return (
          <div className={classes.container}>
               {rows.map((row) => (
                    <HistoryPopUp isSuccess={row.isSuccess} key={row.id} id={row.id}>
                         <Row
                              id={row.id}
                              onDelete={onDelete}
                              isSuccess={row.isSuccess}
                              date={new Date(row.date)}
                              fileName={row.fileName}
                         />
                    </HistoryPopUp>
               ))}
          </div>
     );
};
