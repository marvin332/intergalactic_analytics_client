import React, { useState, useCallback, type DragEvent } from "react";
import classes from "./styles.module.css";
import type { Status } from "../../app/types.ts";

type Props = {
     onUpload: (files: FileList) => void;
     children?: React.ReactNode;

     status: Status;
};

export const DragAndDropUpload: React.FC<Props> = ({ onUpload, children, status }) => {
     const [isDragging, setIsDragging] = useState(false);

     const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
     }, []);

     const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
     }, []);

     const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          e.stopPropagation();
          e.dataTransfer.dropEffect = "copy";
          setIsDragging(true);
     }, []);

     const handleDrop = useCallback(
          (e: DragEvent<HTMLDivElement>) => {
               e.preventDefault();
               e.stopPropagation();
               setIsDragging(false);

               onUpload(e.dataTransfer.files);
          },
          [onUpload],
     );

     return (
          <div
               className={`${classes.dropzone}  ${status !== "active" ? classes.uploaded : ""} ${isDragging ? classes.active : ""}`}
               onDragEnter={handleDragEnter}
               onDragOver={handleDragOver}
               onDragLeave={handleDragLeave}
               onDrop={handleDrop}
          >
               {children}
          </div>
     );
};
