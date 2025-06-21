import React from "react";
import classes from "./styles.module.css";
import { Button } from "../button/Button.tsx";
import close from "../../assets/close.svg";
import { createPortal } from "react-dom";
type Props = {
     isOpen: boolean;
     onClose: () => void;
     children?: React.ReactNode;
     target?: Element;
};

const root = document.getElementById("root");

export const Modal: React.FC<Props> = (props) => {
     if (!props.isOpen) {
          return null;
     }

     const clickHandle = () => {
          props.onClose();
     };

     return createPortal(
          <div
               className={classes.overlay}
               onClick={() => {
                    clickHandle();
               }}
          >
               <div
                    className={classes.modal}
                    onClick={(e) => {
                         e.stopPropagation();
                    }}
               >
                    {props.children}
                    <div className={classes.buttonContainer}>
                         <Button variant={"clear"} onClick={clickHandle}>
                              <img src={close} alt="close" />
                         </Button>
                    </div>
               </div>
          </div>,
          props.target ? props.target : (root as Element),
     );
};
