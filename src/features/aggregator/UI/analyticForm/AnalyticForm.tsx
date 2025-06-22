import { ButtonUpload } from "../../../../shared/buttonUpload/ButtonUpload.tsx";
import classes from "./styles.module.css";
import { DragAndDropUpload } from "../../../../shared/dragAndDropUpload/DragAndDropUpload.tsx";
import React from "react";
import { useStore } from "../../../../app/store";
import { Button } from "../../../../shared/button/Button.tsx";
import { Loader } from "../../../../shared/loader/Loader.tsx";

export const AnalyticForm = () => {
     const [file, setFile] = React.useState<File | null>(null);
     const status = useStore((state) => state.aggregator.status);
     const setStatus = useStore((state) => state.aggregator.setStatus);
     const fetchToSetMetric = useStore((state) => state.aggregator.fetchToSetMetric);
     const setMetric = useStore((state) => state.aggregator.setMetric);
     const onUpload = (files: FileList) => {
          setFile(files[0]);
          if (files[0].type !== "text/csv") {
               setStatus("error");
               return;
          }
          setStatus("process");
     };

     let message: string = "или перетащите сюда";

     if (status === "process") {
          message = "файл загружен!";
     }

     if (status === "error") {
          message = "упс, не то...";
     }

     if (status === "done") {
          message = "готово!";
     }

     if (status === "parsing") {
          message = "идёт парсинг файла";
     }

     const clickHandle = async () => {
          if (file) {
               await fetchToSetMetric(file);
          }
     };

     const onRetry = () => {
          setStatus("active");
          setFile(null);
          setMetric(null);
     };

     return (
          <div className={classes.container}>
               <h2 className={classes.message}>
                    Загрузите <strong>csv</strong> файл и получите <strong>полную информацию</strong> о нём за
                    сверхнизкое время
               </h2>
               <DragAndDropUpload status={status} onUpload={onUpload}>
                    <ButtonUpload onUpload={onUpload} label={message} variant={status} onRetry={onRetry}>
                         {status === "parsing" ? <Loader /> : file ? file.name : "Загрузить файл"}
                    </ButtonUpload>
               </DragAndDropUpload>
               {status !== "parsing" && status !== "done" && (
                    <Button variant={status === "process" ? "active" : "unactive"} onClick={clickHandle}>
                         Отправить
                    </Button>
               )}
          </div>
     );
};
