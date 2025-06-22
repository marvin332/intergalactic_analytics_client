export type CSSVars =
     | "--primary-color"
     | "--secondary-color"
     | "--primary-success-color"
     | "--secondary-sucess-color"
     | "--accent-color"
     | "--primary-text-color"
     | "--secondary-background-color"
     | "--disabled-color"
     | "--warning-color"
     | "--clear-color"
     | "--disabled-text-color"
     | "--error-color"
     | "--accent-disabled-color";

export const getColor = (name: CSSVars): string => {
     return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};
