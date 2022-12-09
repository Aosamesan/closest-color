import {configureStore} from '@reduxjs/toolkit'
import reducers from "./reducers";
import {DefaultState} from "./state";
import {Action} from "redux";

export type Nullable<T> = T | null

export declare type ColorSet = {
  name: string,
  color: string
}

export declare type ClosestColorSetAlgorithm = (color: string, colorSetList: Array<ColorSet>) => Nullable<ColorSet>

export declare type ClosestColorSetAlgorithmName
  = "RGB Euclidean Distance"
  | "RGB Euclidean Distance (Fit)"

export declare type AppState = {
  colorSetList: Array<ColorSet>,
  currentColor: string,
  previewColor: string,
  algorithmList: Array<ClosestColorSetAlgorithmName>
  currentAlgorithmItem: ClosestColorSetAlgorithmName
  closestColorSet: Nullable<ColorSet>
}

export declare type AppActions
  = "SET_COLOR_LIST"
  | "ADD_COLOR_LIST"
  | "REMOVE_COLOR_LIST"
  | "SET_CURRENT_COLOR"
  | "SET_PREVIEW_COLOR"
  | "SET_CURRENT_ALGORITHM"
  | "SET_CLOSEST_COLOR_SET"
  | "RESET"

export declare type AppAction<T> = Action<AppActions> & {
  value: T
}
export default configureStore({
  reducer: reducers,
  preloadedState: DefaultState
})

export function complementColor(color: string) {
  return color.startsWith("#") ? color : `#${color}`
}