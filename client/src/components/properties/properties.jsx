import React, { useEffect, useState } from 'react'
import './properties.css'
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from 'react-router-dom'
import Search from '../search/search';
import { Button, Divider,Grid,Checkbox, FormControlLabel, Select, MenuItem, TextField} from '@mui/material';

const Properties = () => {

  const [searchTerm,setSearchTerm] = useState();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set('searchTerm',searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`?${searchQuery}`);

    
  }

  const handleChange = (e) => {
    setSearchTerm(prev => e.target.value);
  }

  const handleDropdownChange = (e) => {
    console.log(e.target.value);
  }

    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if(searchTermFromUrl) {
        setSearchTerm(searchTermFromUrl);
      }

    },[location.search]);

  return (
    <section className="properties--container">
      <Grid container className='grid-container'>
        <Grid item className='left-grid' xs={12} md={5}>
          <div className="left-container">
            <div className="search--field">
              <input type="text" placeholder='Name or location....' onChange={handleChange} value={searchTerm}/>
              <Button className='search-btn' onClick={handleSubmit} variant='contained'><SearchIcon /></Button>
            </div>
            <div className="filter-keys">
              <FormControlLabel control={<Checkbox  />} label="Parking" />
              <FormControlLabel control={<Checkbox  />} label="Furnished" />
            </div>
            <div className="filter-keys">
              <p>bedrooms: </p>
              <TextField variant='standard' sx={{
                width: "4rem"
              }}/>
            </div>
            <div className="filter-keys">
              <p>Sort:</p>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                // label="Sort"
                onChange={handleDropdownChange}
                defaultValue="Latest"
                sx={{
                  width: "8rem"
                }}
              >
                <MenuItem value="Latest">Latest</MenuItem>
                <MenuItem value="DSC">Price high to low</MenuItem>
                <MenuItem value="ASC">Price low to high</MenuItem>
              </Select>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={7}>

        </Grid>
      </Grid>
      {/* <section className="search-grid">
        <Search />
      </section> */}
    </section>
  )
}

export default Properties
