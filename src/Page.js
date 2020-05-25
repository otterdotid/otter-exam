import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LinearProgress from '@material-ui/core/LinearProgress';



const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Page = () => {
    const classes = useStyles();
    const [listProvince, setListProvince] = useState([])
    const [listDistrict, setListDistrict] = useState([])
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [isLoadProv, setIsLoadProv] = useState(true)
    const [isLoadDist, setIsLoadDist] = useState(false)


    useEffect(() => {
        fetch(`http://34.87.158.65/v1/location/provinces`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(resp => {
                setListProvince(resp.data.provinces)
            }).finally(() => setIsLoadProv(false));
        return () => {
        }
    }, [isLoadProv])

    const getDistrict = (idProv) => {
        fetch(`http://34.87.158.65/v1/location/provinces/${idProv}/districts`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(resp => {
                setListDistrict(resp.data.districts)
            }).finally(() => setIsLoadDist(false));
    }
    const handleProv = (ev) => {
        setProvince(ev.target.value)
        setIsLoadDist(true)
        getDistrict(ev.target.value)
    }
    return (
        <div>
            {isLoadProv ? (<LinearProgress />) : (
                <FormControl className={classes.formControl}>
                    <InputLabel>Provinces</InputLabel>
                    <Select
                        value={province}
                        onChange={handleProv}
                        label="Provinces"
                        fullWidth
                    >
                        {listProvince.map((el, i) => {
                            return (
                                <MenuItem key={i} value={el.id}>{el.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            )}
            {isLoadDist ? (<LinearProgress />) : (
                <FormControl className={classes.formControl}>
                    <InputLabel>Districts</InputLabel>
                    <Select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        label="Districts"
                        fullWidth
                    >
                        {listDistrict.map((el, i) => {
                            return (
                                <MenuItem key={i} value={el.id}>{el.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            )}
        </div>
    );
}
export default Page;
