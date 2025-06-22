import * as React from "react";
import closeIco from "../../assets/close.svg";
import classes from "./styles.module.css";
import type { ChangeEvent } from "react";

export type Variant = "active" | "process" | "parsing" | "done" | "error";

const { file, message, container, base, active, process, parsing, done, error, wrapper, close } = classes;

type Props = {
     variant?: Variant;
     label?: string;
     children?: React.ReactNode;
     onRetry?: () => void;
     onUpload?: (files: FileList) => void;
};

const messageMap = {
     active,
     process,
     parsing,
     done,
     error,
} satisfies Record<Variant, string>;

export const ButtonUpload: React.FC<Props> = ({ variant = "active", label, children, onRetry, onUpload }) => {
     const inputRef = React.useRef<HTMLInputElement>(null);
     const clickHandle = () => {
          inputRef.current?.click();
     };

     const changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
          const target = e.currentTarget;
          e.preventDefault();
          if (target.files) {
               onUpload?.(target.files);
          }
     };

     return (
          <div className={container}>
               <div className={wrapper}>
                    <input
                         onClick={(e) => {
                              // @ts-ignore
                              e.currentTarget.value = null;
                         }}
                         onChange={changeHandle}
                         ref={inputRef}
                         className={file}
                         type={"file"}
                    />
                    <button onClick={clickHandle} className={`${base} ${messageMap[variant]}`}>
                         {children}
                    </button>
                    {(variant === "done" || variant === "error" || variant === "process") && (
                         <button onClick={onRetry} className={close}>
                              <img src={closeIco} alt="close" />
                         </button>
                    )}
               </div>
               {label && <span className={message}>{label}</span>}
          </div>
     );
};
