import {ClosestColorSetAlgorithm, ClosestColorSetAlgorithmName, ColorSet, Nullable} from "./index";

type RGBColor = {
  red: number,
  green: number,
  blue: number
}

function getRGBColorFromString(currentColor: string): RGBColor {
  if (/^#?([0-9a-f]{6})$/i.test(currentColor)) {
    const sharpRemoved = currentColor.replace(/^#/, "")
    const red = Number.parseInt(sharpRemoved.substring(0, 2), 16)
    const green = Number.parseInt(sharpRemoved.substring(2, 4), 16)
    const blue = Number.parseInt(sharpRemoved.substring(4, 6), 16)
    return {
      red,
      green,
      blue
    }
  }

  return {
    red: 0,
    green: 0,
    blue: 0
  }
}

function getDistanceBetweenRGBColors(left: RGBColor, right: RGBColor): number {
  return Math.sqrt(
    Math.pow(left.red - right.red, 2) +
    Math.pow(left.green - right.green, 2) +
    Math.pow(left.blue - right.blue, 2)
  )
}

function byRGBEuclideanDistance(color: string, colorSetList: Array<ColorSet>): Nullable<ColorSet> {
  let minDistance = Number.MAX_VALUE
  let currentColor = getRGBColorFromString(color)
  let closestColorSet: Nullable<ColorSet> = null
  for (const colorSet of colorSetList) {
    const targetColor = getRGBColorFromString(colorSet.color)
    const distance = getDistanceBetweenRGBColors(currentColor, targetColor)
    if (distance < minDistance) {
      minDistance = distance
      closestColorSet = colorSet
    }
  }
  return closestColorSet
}

function byRGBEuclideanDistanceWeighed(color: string, colorSetList: Array<ColorSet>): Nullable<ColorSet> {
  let minDistance = Number.MAX_VALUE
  let currentColor = getRGBColorFromString(color)
  let closestColorSet: Nullable<ColorSet> = null

  for (const colorSet of colorSetList) {
    const targetColor = getRGBColorFromString(colorSet.color)
    const meanRed = (currentColor.red + targetColor.red) / 2
    let redWeight = 3
    const greenWeight = 4
    let blueWeight = 2
    if (meanRed < 128) {
      redWeight = 2
      blueWeight = 3
    }
    const distance =
      redWeight * Math.pow(currentColor.red - targetColor.red, 2) +
      greenWeight * Math.pow(currentColor.green - targetColor.green, 2) +
      blueWeight * Math.pow(currentColor.blue - targetColor.blue, 2)

    if (distance < minDistance) {
      minDistance = distance
      closestColorSet = colorSet
    }
  }

  return closestColorSet
}

export default function getSelectedAlgorithm(name: ClosestColorSetAlgorithmName): ClosestColorSetAlgorithm {
  switch (name) {
    case "RGB Euclidean Distance":
      return byRGBEuclideanDistance
    case "RGB Euclidean Distance (Fit)":
      return byRGBEuclideanDistanceWeighed
    default:
      return () => null
  }
}