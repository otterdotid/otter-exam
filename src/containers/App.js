import React from 'react';
import Select from '../components/Select';
import './App.css';

const App = () => {
  const [provinces, setProvinces] = React.useState(null);
  const [districts, setDistricts] = React.useState(null);

  // Fetching Provinces
  React.useEffect(() => {
    fetch('http://34.87.158.65/v1/location/provinces')
      .then((response) => response.json())
      .then((data) => setProvinces(data))
      .catch((error) => alert(error));
  }, []);

  const handleProvince = (event) => {
    let id = event.target.value;

    // fetching districts
    fetch(`http://34.87.158.65/v1/location/provinces/${id}/districts`)
      .then((response) => response.json())
      .then((data) => setDistricts(data))
      .catch((error) => alert(error));
  };

  return (
    <React.Fragment>
      <div className='app'>
        <h1 className='mb-1'>Otter Exam</h1>
        <div className='flex flex-col '>
          <div className='form-input mb-1'>
            <Select
              label='Provinces'
              data={provinces?.data.provinces}
              onChange={handleProvince}
            />
          </div>
          <div className='form-input'>
            <Select label='Districts' data={districts?.data.districts} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
