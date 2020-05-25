import React, {useState, useEffect} from 'react';
import fetch from 'isomorphic-fetch';
import './app.css';

export default function App() {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => { 
        fetch('http://34.87.158.65/v1/location/provinces')
        .then((obj) => obj.json())
        .then((obj) =>  { 
            setProvinces(obj.data.provinces);
        })
    }, []);

    const provOpt = (
        provinces.map((obj, i) => {
            return <option key={i} value={obj.id} >{obj.name}</option>
        })
    );

    const getCities = ((provinceID) => {
        setSelectedCity('loading');
        setDistricts([]);
        return fetch(`http://34.87.158.65/v1/location/provinces/${provinceID}/districts`)
            .then(obj => 
                {
                    if (obj.status == 200) {
                        return obj.json();
                    }

                    setSelectedCity('');
                    console.error('terjadi kesalahan saat mengambil data');
                }
            )
            .then(obj =>  {
                setDistricts(obj.data.districts)
                setSelectedCity('');
            })
            .catch(obj =>  {
                setSelectedCity('');
                console.error('terjadi kesalahan saat mengambil data');
            })
    });

    const distictOpt = (
        districts.map((obj, i) => {
            return <option key={i} value={obj.id}>{obj.name}</option>
        })
    );

    return (
        <div className="container">
            <h1>Otter Exam</h1>
            <div className="select-container">
                <select onChange={(ev) => getCities(ev.target.value)}>
                    <option value="">Pilih Provinsi</option>
                    {provOpt}
                </select>
                <select value={selectedCity} disabled={selectedCity == 'loading'} onChange={(ev) => setSelectedCity(ev.target.value)}>
                    <option value="">Pilih Kota</option>
                    {
                        selectedCity == 'loading' ? <option value="loading">-- Load Cities -- </option> : null
                    }
                    {distictOpt}
                </select>
            </div>
        </div>
    );
}
