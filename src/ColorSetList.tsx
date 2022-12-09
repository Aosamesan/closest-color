import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState, ColorSet} from "./states";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton
} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Delete'
import ColorIcon from '@mui/icons-material/Colorize'
import PreviewIcon from '@mui/icons-material/Visibility'
import CopyButton from '@mui/icons-material/CopyAll'
import {removeColorSet, setPreviewColor} from "./states/actions";

export function ColorSetList() {
  const colorList = useSelector<AppState, Array<ColorSet>>(state => state.colorSetList)
  const dispatch = useDispatch()

  function createPreviewSelector(color: string) {
    return function () {
      dispatch(setPreviewColor(color))
    }
  }

  function createRemover(colorSet: ColorSet) {
    return function () {
      dispatch(removeColorSet(colorSet))
    }
  }

  async function copyColorListJson() {
    await navigator.clipboard.writeText(JSON.stringify(colorList))
  }

  return (
    <>
      <Card style={{height: '100%', overflowY: 'auto'}}>
        <CardHeader title="Color Sets"
                    action={
                      <IconButton onClick={copyColorListJson} title="Copy Preset JSON">
                        <CopyButton/>
                      </IconButton>
                    }
        />
        <CardContent sx={{ maxHeight: '700px', overflowY: 'auto' }}>
          {
            colorList.map(({name, color}) => (
              <Card key={name} sx={{ mt: 1 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{bgcolor: color}} aria-label={name}>
                      <ColorIcon/>
                    </Avatar>
                  }
                  action={
                    <>
                      <IconButton aria-label="preview" onClick={createPreviewSelector(color)}>
                        <PreviewIcon/>
                      </IconButton>
                      <IconButton aria-label="remove" onClick={createRemover({name, color})}>
                        <RemoveIcon/>
                      </IconButton>
                    </>
                  }
                  title={name}
                  subheader={color}
                />
                <CardMedia
                  component="div"
                  sx={{bgcolor: color, height: "20px"}}
                />
              </Card>
            ))
          }
        </CardContent>
      </Card>
    </>
  )
}