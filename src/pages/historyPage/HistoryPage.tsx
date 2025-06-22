import { History } from "../../features/history/UI/history/History.tsx";
import { Button } from "../../shared/button/Button.tsx";
import { useStore } from "../../app/store";
import classes from "./styles.module.css";
import { useNavigate } from "react-router-dom";

export const HistoryPage = () => {
     const clear = useStore((state) => state.history.clear);

     const navigate = useNavigate();

     const clickHandle = () => {
          clear();
     };

     return (
          <div className={classes.container}>
               <History />
               <div className={classes.buttonGroup}>
                    <Button onClick={clickHandle} variant="clear">
                         Очистить всё
                    </Button>
                    <Button variant={"active"} onClick={() => navigate("/generator")}>
                         Сгенерировать больше
                    </Button>
               </div>
          </div>
     );
};
