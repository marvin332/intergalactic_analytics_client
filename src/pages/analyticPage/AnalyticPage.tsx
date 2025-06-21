import { AnalyticForm } from "../../components/analyticForm/AnalyticForm.tsx";
import { GalacticDisplay } from "../../components/galacticDisplay/GalacticDisplay.tsx";
import classes from "./styles.module.css";
export const AnalyticPage = () => {
     return (
          <div className={classes.container}>
               <AnalyticForm />
               <GalacticDisplay />
          </div>
     );
};
