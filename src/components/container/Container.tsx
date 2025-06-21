import React from "react";
import classes from "./styles.module.css";

type Props = {
     children: React.ReactNode;
};
export const Container: React.FC<Props> = (props) => {
     return <div className={classes.container}>{props.children}</div>;
};
