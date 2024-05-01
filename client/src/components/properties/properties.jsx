import React, { useEffect, useState } from 'react'
import './properties.css'
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from 'react-router-dom'
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

    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if(searchTermFromUrl) {
        setSearchTerm(searchTermFromUrl);
      }

    },[location.search]);

  return (
    <section className="properties--container">
      <div className="search--field">
        <input type="text" placeholder='Name ,location etc' onChange={handleChange} value={searchTerm}/>
        <button className='search-btn' onClick={handleSubmit}><SearchIcon /></button>
      </div>
    </section>
  )
}

export default Properties
