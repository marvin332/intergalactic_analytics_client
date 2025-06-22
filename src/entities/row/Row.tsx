import * as React from "react";
import fileImg from "../../assets/file.svg";
import bucketImg from "../../assets/bucket.svg";
import classes from "./styles.module.css";
import { SmileIcon } from "../../shared/icons/SmileIcon.tsx";
import { SadIcon } from "../../shared/icons/SadIcon.tsx";
import { Button } from "../../shared/button/Button.tsx";
import { formatDMY } from "../../app/helpers/formatDMY.ts";
import { getColor } from "../../app/helpers/getColor.ts";

type Props = {
     isSuccess: boolean;
     fileName: string;
     date: Date;
     onDelete: (id: string) => void;
     id: string;
};

export const Row: React.FC<Props> = (props) => {
     return (
          <div className={classes.container}>
               <div className={`${classes.wrapper} ${props.isSuccess ? classes.active : ""}`}>
                    <div className={classes.cell}>
                         <img src={fileImg} alt="document" />
                         <span>{props.fileName}</span>
                    </div>
                    <div className={classes.cell}>{formatDMY(props.date)}</div>
                    <div className={classes.cell}>
                         <span className={props.isSuccess ? "" : classes.disabled}>Обработан успешно</span>
                         <SmileIcon
                              fill={props.isSuccess ? getColor("--clear-color") : getColor("--accent-disabled-color")}
                         />
                    </div>
                    <div className={classes.cell}>
                         <span className={props.isSuccess ? classes.disabled : ""}>Не удалось обработать</span>
                         <SadIcon
                              fill={props.isSuccess ? getColor("--accent-disabled-color") : getColor("--clear-color")}
                         />
                    </div>
               </div>

               <Button variant={"remove"} onClick={() => props.onDelete(props.id)}>
                    <img src={bucketImg} alt="bucket" />
               </Button>
          </div>
     );
};
