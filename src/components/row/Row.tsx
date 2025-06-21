import * as React from "react";
import fileImg from "../../assets/file.svg";
import bucketImg from "../../assets/bucket.svg";
import classes from "./styles.module.css";
import { SmileIcon } from "../icons/SmileIcon.tsx";
import { SadIcon } from "../icons/SadIcon.tsx";
import { Button } from "../button/Button.tsx";

type Props = {
     isSuccess: boolean;
     fileName: string;
     date: Date;
     onDelete: (id: string) => void;
     id: string;
};

type CSSVars =
     | "--primary-color"
     | "--secondary-color"
     | "--primary-success-color"
     | "--secondary-sucess-color"
     | "--accent-color"
     | "--primary-text-color"
     | "--secondary-background-color"
     | "--disabled-color"
     | "--warning-color"
     | "--clear-color"
     | "--disabled-text-color"
     | "--error-color"
     | "--accent-disabled-color";

const getColor = (name: CSSVars): string => {
     return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};

export const Row: React.FC<Props> = (props) => {
     return (
          <div className={classes.container}>
               <div className={`${classes.wrapper} ${props.isSuccess ? classes.active : ""}`}>
                    <div className={classes.cell}>
                         <img src={fileImg} alt="document" />
                         <span>{props.fileName}</span>
                    </div>
                    <div className={classes.cell}>
                         {`${String(props.date.getDate()).padStart(2, "0")}.` +
                              `${String(props.date.getMonth() + 1).padStart(2, "0")}.` +
                              props.date.getFullYear()}
                    </div>
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
