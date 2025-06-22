import logo from "../../assets/logo.svg";
import classes from "./styles.module.css";
import { MenuItem } from "../../shared/menuItem/MenuItem.tsx";
export const Header = () => {
     return (
          <div className={classes.container}>
               <div className={classes.links}>
                    <img src={logo} alt="logo" />
                    <span className={classes.title}>Межгалактическая аналитика</span>
               </div>

               <div className={classes.links}>
                    <MenuItem to={"/"} variant={"upload"}>
                         CSV Аналитик
                    </MenuItem>
                    <MenuItem to={"/generator"} variant={"generator"}>
                         CSV Генератор
                    </MenuItem>
                    <MenuItem to={"/history"} variant={"history"}>
                         История
                    </MenuItem>
               </div>
          </div>
     );
};
