import { useStore } from "../../store";
import { ButtonUpload } from "../buttonUpload/ButtonUpload.tsx";
import { Loader } from "../loader/Loader.tsx";
import { Button } from "../button/Button.tsx";

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
          handleShowFilePicker("chlen", "csv")
               .then((result) => {
                    return fetchToGenerate(result);
               })
               .catch((err) => console.log(err));
     };

     if (status === "active") {
          return <Button onClick={clickHandle}>Начать генерацию</Button>;
     }

     let message = "Начать генерацию";

     if (status === "parsing") {
          message = "идёт процесс генерации";
     }

     if (status === "error") {
          message = "Ошибка";
     }

     if (status === "done") {
          message = "файл сгенерирован!";
     }

     return (
          <ButtonUpload label={message} variant={status} onRetry={() => setStatus("active")}>
               {status === "parsing" ? <Loader /> : "Done!"}
          </ButtonUpload>
     );
};
