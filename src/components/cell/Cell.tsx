import * as React from "react";
import classes from "./styles.module.css";

type Props = {
     title: string;
     body: string;
     isMain: boolean;
};

export const Cell: React.FC<Props> = ({ title, body, isMain }) => {
     return (
          <div className={`${classes.wrapper} ${isMain ? "" : classes.secondary}`}>
               <div className={classes.title}>{title}</div>
               <div className={classes.body}>{body}</div>
          </div>
     );
};
