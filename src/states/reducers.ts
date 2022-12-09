import {DefaultState} from "./state";
import {
  AppAction,
  AppState,
  ClosestColorSetAlgorithmName,
  ColorSet,
  Nullable
} from "./index";
import {combineReducers} from "redux";

function colorSetList(state: Array<ColorSet> = DefaultState.colorSetList, action: AppAction<Array<ColorSet> | ColorSet>): Array<ColorSet> {
  switch (action.type) {
    case "SET_COLOR_LIST":
      return action.value as Array<ColorSet>
    case "ADD_COLOR_LIST":
      return [...state, action.value as ColorSet]
    case "REMOVE_COLOR_LIST":
      const value = action.value as ColorSet
      return state.filter(item => item.name !== value.name && item.color !== value.color)
    case "RESET":
      return DefaultState.colorSetList
    default:
      return state
  }
}

function currentColor(state: string = DefaultState.currentColor, action: AppAction<string>): string {
  switch (action.type) {
    case "SET_CURRENT_COLOR":
      return action.value
    case "RESET":
      return DefaultState.currentColor
    default:
      return state
  }
}

function algorithmList(state: Array<ClosestColorSetAlgorithmName> = DefaultState.algorithmList, action: AppAction<null>): Array<ClosestColorSetAlgorithmName> {
  switch (action.type) {
    default:
      return state
  }
}

function currentAlgorithmItem(state: ClosestColorSetAlgorithmName = DefaultState.currentAlgorithmItem, action: AppAction<ClosestColorSetAlgorithmName>): ClosestColorSetAlgorithmName {
  switch (action.type) {
    case "SET_CURRENT_ALGORITHM":
      return action.value
    case "RESET":
      return DefaultState.currentAlgorithmItem
    default:
      return state
  }
}

function closestColorSet(state: Nullable<ColorSet> = DefaultState.closestColorSet, action: AppAction<Nullable<ColorSet>>): Nullable<ColorSet> {
  switch (action.type) {
    case "SET_CLOSEST_COLOR_SET":
      return action.value
    case "RESET":
      return null
    default:
      return state
  }
}

function previewColor(state: string = DefaultState.currentColor, action: AppAction<string>): string {
  switch (action.type) {
    case "SET_PREVIEW_COLOR":
      return action.value
    case "RESET":
      return DefaultState.currentColor
    default:
      return state
  }
}

export default combineReducers<AppState>({
  colorSetList,
  currentColor,
  algorithmList,
  previewColor,
  currentAlgorithmItem,
  closestColorSet
})