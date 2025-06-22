import { Generator } from "../../features/generator/UI/generator/Generator.tsx";
import classes from "./styles.module.css";
export const GeneratorPage = () => {
     return (
          <div className={classes.container}>
               <h2 className={classes.h2}>Сгенерируйте готовый csv-файл нажатием одной кнопки</h2>
               <Generator />
          </div>
     );
};
