import { useStore } from "../../../../app/store";
import { ButtonUpload } from "../../../../shared/buttonUpload/ButtonUpload.tsx";
import { Loader } from "../../../../shared/loader/Loader.tsx";
import { Button } from "../../../../shared/button/Button.tsx";
import { type ReactElement } from "react";

type Extension = "csv";

const handleShowFilePicker = async (suggestedName: string, fileExt: Extension) => {
     return window.showSaveFilePicker({
          suggestedName,
          types: [
               {
                    description: "All files",
                    accept: { "*/*": ["." + fileExt] },
               },
          ],
     });
};

export const Generator = () => {
     const status = useStore((state) => state.generator.status);

     const setStatus = useStore((state) => state.generator.setStatus);

     const fetchToGenerate = useStore((state) => state.generator.fetchToGenerate);

     const clickHandle = () => {
          handleShowFilePicker("output", "csv")
               .then((result) => {
                    return fetchToGenerate(result);
               })
               .catch((err) => console.log(err));
     };

     if (status === "active") {
          return <Button onClick={clickHandle}>Начать генерацию</Button>;
     }

     let message = "Начать генерацию";

     let child: ReactElement | string = <Loader />;

     if (status === "parsing") {
          message = "идёт процесс генерации";
     }

     if (status === "error") {
          message = "упс, не то...";
          child = "Ошибка";
     }

     if (status === "done") {
          message = "файл сгенерирован!";
          child = "Done!";
     }

     return (
          <ButtonUpload label={message} variant={status} onRetry={() => setStatus("active")}>
               {child}
          </ButtonUpload>
     );
};
