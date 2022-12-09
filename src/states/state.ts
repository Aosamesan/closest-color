import {AppState, ClosestColorSetAlgorithmName} from './index'

const Algorithms: Array<ClosestColorSetAlgorithmName> = [
  "RGB Euclidean Distance",
  "RGB Euclidean Distance (Fit)"
]

export const DefaultState: AppState = {
  colorSetList: [
    {
      name: "header",
      color: "#620D25"
    },
    {
      name: "bg",
      color: "#A13034"
    },
    {
      name: "nav",
      color: "#A7988B"
    },
    {
      name: "content",
      color: "#F1EBE4"
    },
    {
      name: "footer",
      color: "#C8C0D3"
    },
  ],
  currentColor: '#FFFFFF',
  previewColor: '#FFFFFF',
  algorithmList: Algorithms,
  currentAlgorithmItem: Algorithms[0],
  closestColorSet: null
}