import { AnalyticForm } from "../../features/aggregator/UI/analyticForm/AnalyticForm.tsx";
import { GalacticDisplay } from "../../features/aggregator/UI/galacticDisplay/GalacticDisplay.tsx";
import classes from "./styles.module.css";
export const AnalyticPage = () => {
     return (
          <div className={classes.container}>
               <AnalyticForm />
               <GalacticDisplay />
          </div>
     );
};
