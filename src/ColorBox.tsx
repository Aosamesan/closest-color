import React from 'react'
import {Box, Button, Card, CardContent, CardHeader} from "@mui/material";
import {useSelector} from "react-redux";
import {AppState, ColorSet, complementColor, Nullable} from "./states";


export type ColorBoxProps = {
  title: string,
  type: "current" | "closest" | "preview"
}

function createCopyHandler(value: string): () => Promise<void> {
  return () => window.navigator.clipboard.writeText(value)
}

export default function ColorBox({title, type}: ColorBoxProps) {
  const currentColor = useSelector<AppState, string>(state => state.currentColor)
  const closestColorSet = useSelector<AppState, Nullable<ColorSet>>(state => state.closestColorSet)
  const previewColor = useSelector<AppState, string>(state => state.previewColor)
  let bgColor = "#FFFFFF"
  let text = ""
  let copyColor: () => Promise<void> = async () => {}
  let copyToolTip = "Copy RGB Color"
  switch (type) {
    case "current":
      bgColor = complementColor(currentColor)
      text = bgColor
      copyColor = createCopyHandler(bgColor)
      break
    case "preview":
      bgColor = complementColor(previewColor)
      text = bgColor
      copyColor = createCopyHandler(bgColor)
      break
    case "closest":
      if (closestColorSet != null) {
        bgColor = complementColor(closestColorSet.color)
        text = `${closestColorSet.name} (${bgColor})`
        copyColor = createCopyHandler(closestColorSet.name)
        copyToolTip = "Copy ColorSet Name"
      } else {
        bgColor = text = '#FFFFFF'
        copyColor = createCopyHandler(bgColor)
        copyToolTip = "Copy RGB Color"
      }
      break
  }


  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <Box component="div" bgcolor={bgColor} style={{
          width: "100%",
          height: "50px",
        }} sx={{ mb: 1}} />
        <Button fullWidth
                onClick={copyColor}
                title={copyToolTip}
                variant="contained"
                color="info"
        >{text}</Button>
      </CardContent>
    </Card>
  )
}