import * as React from "react";
import generatorImg from "../../assets/generator.svg";
import historyImg from "../../assets/history.svg";
import uploadImg from "../../assets/upload.svg";
import classes from "./styles.module.css";
import { NavLink } from "react-router-dom";

type Variant = "upload" | "generator" | "history";

type Props = {
     variant: Variant;
     children: React.ReactNode;
     to: string;
};

const iconMap = {
     upload: uploadImg,
     generator: generatorImg,
     history: historyImg,
} satisfies Record<Variant, string>;

export const MenuItem: React.FC<Props> = ({ variant, children, to }) => {
     return (
          <NavLink
               to={to}
               className={({ isActive }) => (isActive ? `${classes.button} ${classes.active}` : classes.button)}
          >
               <img className={classes.img} src={iconMap[variant]} alt="icon" />
               <span className={classes.title}>{children}</span>
          </NavLink>
     );
};
