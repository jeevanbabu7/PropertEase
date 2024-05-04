import React, { useEffect, useState } from 'react'
import './properties.css'
import SearchIcon from '@mui/icons-material/Search';
import {Link, useNavigate} from 'react-router-dom'
import Search from '../search/search';
import { Button, Divider,Grid,Checkbox, FormControlLabel, Select, MenuItem, TextField, Backdrop, CircularProgress, Paper, Card, CardMedia, CardContent, Typography} from '@mui/material';

const Properties = () => {

  const [sidebarData,setSidebarData] = useState({
    searchTerm: '',
    bedrooms: 1,
    parking: false,
    furnished: false,
    sort: 'createdAt',
    order: 'desc'
  });
  
  console.log(sidebarData);
  const [searchTerm,setSearchTerm] = useState();
  const [loading,setLoading] = useState(false);
  const [listings,setListings] = useState([]);
  const [error,setError] = useState(false);

  console.log(listings);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm',searchTerm);
    urlParams.set('parking',sidebarData.parking);
    urlParams.set('furnished',sidebarData.furnished);
    urlParams.set('sort',sidebarData.sort);
    urlParams.set('order',sidebarData.order);
    urlParams.set('bedrooms',sidebarData.bedrooms);
    rlParams.set('bathrooms',sidebarData.bathrooms);
    const searchQuery = urlParams.toString();
    navigate(`?${searchQuery}`);

    
  }

  const handleChange = (e) => {
    setSearchTerm(prev => e.target.value);
  }


  const handleInputChange = (e) => {
    const elem = e.target;
    setSidebarData((prev) => {

      if(elem.id == 'parking' || elem.id == 'furnished' ) {

        return {...prev,[elem.id]: elem.checked};
      }
      else if(elem.name && elem.name == 'sort') {
      
        const sort = e.target.value.split('_')[0] || 'created_at';
        const order = e.target.value.split('_')[1] || "desc";
        console.log(sort,order);
        return {...prev,sort,order}
      }
      else {
        return {...prev,[elem.id]: elem.value};
      }
    });
  }

    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if(searchTermFromUrl) {
        setSearchTerm(searchTermFromUrl);
      }
      // use Effect will get executed after clicking search , then fetch properties
      const fetchListings = async () => {
        
        try {
          const searchQuery = urlParams.toString();
          const res = await fetch(`/api/listing/get?${searchQuery}`);
          const data = await res.json();
          console.log(data);
          setListings(data);
          setError(false);
        }catch(err) {
          setError(err.message);
        }

      }
      setLoading(true);
      setTimeout(() => {
        fetchListings();
        setLoading(false);
      },1000)
      

    },[location.search]);

  return (
    
    <section className="properties--container">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid container className='grid-container'>
        <Grid item className='left-grid' xs={12} md={4}>
          <div className="left-container">
            <div className="search--field">
              <input type="text" id='searchTerm' placeholder='Name or location....' onChange={(e) => {
                handleChange(e);
                handleInputChange(e);
              }} value={searchTerm}/>
              <Button className='search-btn' onClick={handleSubmit} variant='contained'><SearchIcon /></Button>
            </div>
            <div className="filter-keys">
              <FormControlLabel control={<Checkbox id='parking' onChange={handleInputChange} checked={sidebarData.parking} />} label="Parking" />
              <FormControlLabel control={<Checkbox checked={sidebarData.furnished} onChange={handleInputChange}  id='furnished' />} label="Furnished" />
            </div>
            <div className="filter-keys">
              <p>bedrooms: </p>
              <TextField variant='standard' id='bedrooms' 
              onChange={handleInputChange}
              value={sidebarData.bedrooms}
              sx={{
                width: "4rem"
              }}/>

            </div>
            <div className="filter-keys">
              <p>Sort:</p>
              <Select
                labelId="demo-simple-select-label"
                
                // value={filter}
                // label="Sort"
                
                onChange={handleInputChange}
                
                defaultValue="createdAt_desc"
                name='sort'
                sx={{
                  width: "10rem",
                  height: '2.2rem'
                }}
              >
                <MenuItem value="createdAt_desc">Latest</MenuItem>
                <MenuItem value="createdAt_asc">Oldest</MenuItem>
                <MenuItem value="price_desc">Price high to low</MenuItem>
                <MenuItem value="price_asc">Price low to high</MenuItem>
              </Select>
            </div>
          </div>
        </Grid>
        <Grid className='right-grid' item xs={12} md={8}>
              <section className='outer-container'>
                <div className="property-container">
                  {listings.length && listings.map((property,index) => {

                    return (
                            <Paper elevation={6} sx={{margin: "auto" }}>
                              <Card sx={{ maxWidth: 345, flexShrink: 0, overflow: "hidden" }} key={index}>
                                  <Link to={`/properties/${property._id}`}>
                                      <CardMedia
                                          sx={{ height: 150,
                                              '&:hover': {
                                                  transform: 'scale(1.1)',
                                              },
                                              transitionDuration:'.5s'
                                              
                                          }}
                                          image={`${property.imageUrls[0]}`}
                                          title="green iguana"
                                      />
                                      <CardContent sx={{ height: 150 }}>
                                          <Typography gutterBottom variant="h5" component="div">
                                              {property.name}
                                          </Typography>

                                          <Typography variant="body2" color="text.secondary">
                                              {`${property.description.slice(0, 80)}...`}
                                          </Typography>
                                      </CardContent>
                                  </Link>
                              </Card>
                          </Paper>
                    )
                  })}
                </div>
              </section>
        </Grid>
      </Grid>
      {/* <section className="search-grid">
        <Search />
      </section> */}
    </section>
  )
}

export default Properties
