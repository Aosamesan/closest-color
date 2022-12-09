import React from 'react';
import {Provider} from 'react-redux'
import store from './states'
import {Container, Grid} from "@mui/material";
import ColorBox from "./ColorBox";
import {ColorSetList} from "./ColorSetList";
import ControlPanel from "./ControlPanel";

function App() {
  return (
    <Provider store={store}>
      <Container sx={{ py: 2}}>
        <Grid container spacing={2} sx={{ pb: 1 }}>
          <Grid item xs={4}>
            <ColorBox title="Preview Color" type="preview" />
          </Grid>
          <Grid item xs={4}>
            <ColorBox title="Current Color" type="current" />
          </Grid>
          <Grid item xs={4}>
            <ColorBox title="Closest Color Set" type="closest" />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <ControlPanel />
          </Grid>
          <Grid item xs={4}>
            <ColorSetList />
          </Grid>
        </Grid>
      </Container>
    </Provider>
  );
}

export default App;
