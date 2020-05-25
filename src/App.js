import React, { useState, useEffect } from 'react';
import './App.css';
import { TextField, Card, CardContent, Typography, MenuItem, Grid, LinearProgress } from '@material-ui/core';
import axios from 'axios';

const url = 'http://34.87.158.65/v1/location/provinces'

function App() {

  // Set Data
  const [isLoading, setIsLoading] = useState(false);
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');

  // List Data
  const [districts, setDistricts] = useState([]);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    fetchProvinces();
  }, [])

  const fetchProvinces = async () => {
    await setIsLoading(true);
    const { data } = await axios.get(url)
      .catch(error => alert(error));

    setProvinces(data.data.provinces)
    setIsLoading(false);
  };

  const handleDistrict = (event) => {
    setDistrict(event.target.value);
  };

  const handleProvince = async (event) => {
    const valueProvince = event.target.value
    await setIsLoading(true);
    await setProvince(valueProvince)

    const { data } = await axios.get(`${url}/${valueProvince.id}/districts`)
      .catch(error => alert(error));

    setDistricts(data.data.districts);
    setIsLoading(false);
  }

  return (
    <div className="App">
      <div className='App-title'>
        <Typography variant="h4" style={{ padding: 20 }}>
          Otter Fullstack Engineer Test
        </Typography>
      </div>
      <header className="App-header">
        <Card>
          {isLoading && <LinearProgress />}
          <CardContent>
            <Grid container spacing={2}>
              <Grid item md>
                <TextField disabled={isLoading} value={province} style={{ minWidth: '200px' }} onChange={handleProvince} fullWidth select id="provinces" label="Provinces" variant="outlined" >
                  {provinces.map(item => (
                    <MenuItem key={item.id} value={item}>{item.name}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item md>
                <TextField disabled={province === '' || isLoading} value={district} style={{ minWidth: '200px' }} onChange={handleDistrict} fullWidth select id="districts" label="Districts" variant="outlined" >
                  {districts.map(item => (
                    <MenuItem key={item.id} value={item}>{item.name}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </header>
    </div>
  );
}

export default App;
