import classes from "./styles.module.css";

export const Loader = () => {
     return (
          <svg className={classes.svg} viewBox="22 22 44 44">
               <circle className={classes.track} cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" />
               <circle className={classes.circle} cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" />
          </svg>
     );
};
