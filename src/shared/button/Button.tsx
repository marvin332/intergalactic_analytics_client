import * as React from "react";
import classes from "./styles.module.css";

type Variant = "active" | "unactive" | "download" | "clear" | "remove";

type Props = {
     children?: React.ReactNode;
     variant?: Variant;
     onClick?: () => void;
};

const { base, active, unactive, download, clear, remove } = classes;

const classesMap = {
     active,
     unactive,
     download,
     clear,
     remove,
} satisfies Record<Variant, string>;

export const Button: React.FC<Props> = ({ variant = "active", children, onClick }) => {
     const clickHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          if (onClick) onClick();
     };

     return (
          <button disabled={variant === "unactive"} onClick={clickHandle} className={`${base} ${classesMap[variant]}`}>
               {children}
          </button>
     );
};
