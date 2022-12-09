import {
  AppAction,
  AppActions,
  ClosestColorSetAlgorithmName,
  ColorSet,
  Nullable
} from "./index";

function actionCreator<TValue, TAction extends AppActions>(type: TAction): (value: TValue) => AppAction<TValue> {
  return (value) => ({
    type,
    value
  })
}

export const setColorSetList = actionCreator<Array<ColorSet>, "SET_COLOR_LIST">("SET_COLOR_LIST")
export const addColorSet = actionCreator<ColorSet, "ADD_COLOR_LIST">("ADD_COLOR_LIST")
export const removeColorSet = actionCreator<ColorSet, "REMOVE_COLOR_LIST">("REMOVE_COLOR_LIST")
export const setPreviewColor = actionCreator<string, "SET_PREVIEW_COLOR">("SET_PREVIEW_COLOR")
export const setCurrentColor = actionCreator<string, "SET_CURRENT_COLOR">("SET_CURRENT_COLOR")
export const setCurrentAlgorithm = actionCreator<ClosestColorSetAlgorithmName, "SET_CURRENT_ALGORITHM">("SET_CURRENT_ALGORITHM")
export const setClosestColorSet = actionCreator<Nullable<ColorSet>, "SET_CLOSEST_COLOR_SET">("SET_CLOSEST_COLOR_SET")
export const reset = actionCreator<null, "RESET">("RESET")