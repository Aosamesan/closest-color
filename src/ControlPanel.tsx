import React from 'react'
import {
  Accordion, AccordionDetails, AccordionSummary,
  Box, Button, Card,
  CardContent,
  CardHeader, Chip, Divider, FormControl, Grid,
  IconButton,
  InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent,
  TextField, Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppState, ClosestColorSetAlgorithmName, ColorSet, complementColor} from "./states";
import DoneIcon from '@mui/icons-material/Done'
import ResetIcon from '@mui/icons-material/RestartAlt'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  addColorSet,
  reset,
  setClosestColorSet,
  setColorSetList,
  setCurrentAlgorithm,
  setCurrentColor
} from "./states/actions";
import getSelectedAlgorithm from "./states/algorithms";

export default function ControlPanel() {
  const dispatch = useDispatch()
  const currentAlgorithm = useSelector<AppState, ClosestColorSetAlgorithmName>(state => state.currentAlgorithmItem)
  const currentColor = useSelector<AppState, string>(state => state.currentColor)
  const colorSetList = useSelector<AppState, Array<ColorSet>>(state => state.colorSetList)

  function handleReset() {
    dispatch(reset(null))
  }

  function handleExecute() {
    const algorithm = getSelectedAlgorithm(currentAlgorithm)
    const closestColorSet = algorithm(currentColor, colorSetList)
    dispatch(setClosestColorSet(closestColorSet))
  }

  return (
    <Card style={{maxHeight: '100%', overflowY: 'auto'}}>
      <CardHeader title="Control Panels"
                  action={(
                    <IconButton onClick={handleReset}>
                      <ResetIcon/>
                    </IconButton>
                  )}
      />
      <CardContent sx={{maxHeight: '700px', overflowY: 'auto'}}>
        <Divider>
          <Chip variant="filled" label="Color Control"/>
        </Divider>
        <Box sx={{mt: 2}}>
          <InputColorComponent/>
        </Box>
        <Box sx={{mt: 2}}>
          <AlgorithmSelectComponent/>
        </Box>
        <Box sx={{mt: 2}}>
          <Button fullWidth variant="outlined" onClick={handleExecute}>Execute</Button>
        </Box>
        <Divider sx={{my: 2}}>
          <Chip variant="filled" label="Color Set Controls"/>
        </Divider>
        <Box sx={{mt: 2}}>
          <ColorSetsComponent/>
        </Box>
      </CardContent>
    </Card>
  )
}

function checkJsonParsable(json: string) {
  try {
    JSON.parse(json)
    return true
  } catch {
    return false
  }
}

function ColorSetsComponent() {
  const dispatch = useDispatch()
  const colorSetList = useSelector<AppState, Array<ColorSet>>(state => state.colorSetList)
  const [colorSetListJson, setColorSetColorList] = React.useState('')
  const [colorSetListJsonError, setColorSetListJsonError] = React.useState(false)
  const [color, setColor] = React.useState('')
  const [name, setName] = React.useState('')
  const [colorError, setColorError] = React.useState(true)
  const [nameError, setNameError] = React.useState(true)

  function handleColorSetListJsonChanged(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.currentTarget.value
    const valid = checkJsonParsable(value)
    setColorSetColorList(value)
    setColorSetListJsonError(!valid)
  }

  function updateJson() {
    setColorSetColorList(JSON.stringify(colorSetList, null, 4))
    setColorSetListJsonError(false)
  }

  function handleParse() {
    if (!colorSetListJsonError) {
      const parsed = JSON.parse(colorSetListJson) as Array<ColorSet>
      dispatch(setColorSetList(parsed))
    }
  }

  function checkValidColor(c: string) {
    return /^#?[0-9a-f]{6}$/i.test(c)
  }

  function handleColorChanged(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value
    setColorError(!checkValidColor(value))
    setColor(value)
  }

  function handleNameChanged(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value
    setNameError(!value)
    setName(value)
  }

  function handleAddColorSet() {
    if (!nameError && !colorError) {
      dispatch(addColorSet({
        color: complementColor(color),
        name
      }))
    }
  }

  React.useEffect(() => {
    const value = JSON.stringify(colorSetList, null, 2)
    setColorSetColorList(value)
    setColorSetListJsonError(!checkJsonParsable(value))
  }, [colorSetList])

  console.log('foo')

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>} id="add-colors">
          <Typography fontWeight="bold">Add Colors</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <TextField fullWidth
                         label="Color"
                         size="small"
                         error={colorError}
                         helperText={colorError && "Invalid Color"}
                         value={color}
                         onChange={handleColorChanged}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField fullWidth
                         label="Name"
                         size="small"
                         error={nameError}
                         helperText={nameError && "Invalid Name"}
                         value={name}
                         onChange={handleNameChanged}
              />
            </Grid>
            <Grid item xs={2}>
              <Button fullWidth
                      variant="contained"
                      disabled={colorError}
                      onClick={handleAddColorSet}
              >Add</Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
          <Typography fontWeight="bold">As JSON</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField multiline
                     fullWidth
                     maxRows={30}
                     value={colorSetListJson}
                     error={colorSetListJsonError}
                     onChange={handleColorSetListJsonChanged}
                     helperText={colorSetListJsonError && "JSON Parse Error"}
          />
          <Grid container sx={{my: 1}} spacing={1}>
            <Grid item xs={6}>
              <Button fullWidth
                      color="warning"
                      variant="contained"
                      onClick={updateJson}
              >
                Reload
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth
                      variant="contained"
                      disabled={colorSetListJsonError}
                      onClick={handleParse}
              >Parse</Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

function AlgorithmSelectComponent() {
  const dispatch = useDispatch()
  const algorithms = useSelector<AppState, Array<ClosestColorSetAlgorithmName>>(state => state.algorithmList)
  const selectedAlgorithm = useSelector<AppState, ClosestColorSetAlgorithmName>(state => state.currentAlgorithmItem)

  function handleChange(e: SelectChangeEvent<ClosestColorSetAlgorithmName>) {
    dispatch(setCurrentAlgorithm(e.target.value as ClosestColorSetAlgorithmName))
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="algorithm-select-label">Algorithms</InputLabel>
      <Select labelId="algorithm-select-label"
              id="algorithm-select"
              value={selectedAlgorithm}
              label="Algorithms"
              onChange={handleChange}
      >
        {
          algorithms.map(algorithm => (
            <MenuItem value={algorithm} key={algorithm}>{algorithm}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}

function InputColorComponent() {
  const dispatch = useDispatch()
  const currentColor = useSelector<AppState, string>(state => state.currentColor)
  const [color, setColor] = React.useState(currentColor.replace(/^#/, ''))
  const [error, setError] = React.useState(false)

  function handleColorChanged(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value
    if (!/^#?[0-9a-f]{6}$/i.test(value)) {
      setError(true)
    } else {
      setError(false)
    }
    setColor(value)
  }

  function handleSetCurrentColor() {
    dispatch(setCurrentColor(complementColor(color)))
  }

  return (
    <TextField id="current-color"
               label="Input Your Color"
               fullWidth
               error={error}
               value={color}
               onChange={handleColorChanged}
               InputProps={{
                 startAdornment: (
                   <InputAdornment position="start">#</InputAdornment>
                 ),
                 endAdornment: (
                   <InputAdornment position="end">
                     <IconButton disabled={error} onClick={handleSetCurrentColor}>
                       <DoneIcon/>
                     </IconButton>
                   </InputAdornment>
                 )
               }}
               helperText={error && "Format : #?[0-9a-fA-F]{6}"}
    />
  )
}