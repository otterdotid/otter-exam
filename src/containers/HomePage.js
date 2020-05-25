import React, { Component } from 'react';
import Header from '../components/layout/Header';
import axios from 'axios';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listProvince: [],
      listDisctrict: [],
      district: true
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get('http://34.87.158.65/v1/location/provinces')
      .then(result => {
        this.setState({
          listProvince: result.data.data.provinces
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleChange(e) {
    let { name, value } = e.target;
    axios.get(`http://34.87.158.65/v1/location/provinces/${value}/districts`)
    .then(result => {
      this.setState({
        listDisctrict: result.data.data.districts,
        district: false
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    const { listProvince, listDisctrict, optionStyle, district } = this.state;
    return(
      <div>
        <Header title="React Test" />
        <div className="container mt-5 mb-4">
            <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Select Province</label>
                    <select 
                      name="province" 
                      className="form-control custom-select"
                      onChange={(e) => this.handleChange(e)}>
                        <option>No Selected</option>
                        { 
                          listProvince.map((key, i) => {
                            return (
                              <option value={key.id} key={i}>{key.name}</option>
                            )
                          })
                        }
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Select District</label>
                    <select 
                      name="district" 
                      className="form-control custom-select">
                        { 
                          district ? <option>No Selected</option> :
                          listDisctrict.map((key, i) => {
                            return <option value={key.id} key={i}>{key.name}</option>
                          })
                        }
                    </select>
                  </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default HomePage;