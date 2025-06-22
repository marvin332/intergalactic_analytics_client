import { useStore } from "../../../../app/store";
import classes from "./styles.module.css";
import { HighLights } from "../../../../entities/highLights/HighLights.tsx";
export const GalacticDisplay = () => {
     const metric = useStore((state) => state.aggregator.metric);

     if (!metric)
          return (
               <div className={classes.messageContainer}>
                    <span className={classes.message}>
                         Здесь <br /> появятся хайлайты
                    </span>
               </div>
          );

     return <HighLights metric={metric} isMain={true} />;
};
