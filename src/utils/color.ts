import color from 'css-color-function'
import {formula} from './constant/config'

declare type colorsType={
    [key: string]: any;
}
 export const generateColors = (primary: any) => {
  const colors:colorsType = {}
  Object.keys(formula).forEach(key => {
    const value = formula[key].replace(/primary/g, primary)
    colors[key] = color.convert(value)
  })
  return colors
}
export default generateColors
