import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Artists from './components/Artists'

export default function App(props) {
  const [artists, setArtists] = useState([])
  const [formInputs, updateFormInputs] = useState({
    name: "",
    biography: "",
    age: "",
    location: ""
  })
  const getArtists = async () => {
    try {
      const response = await fetch('http://localhost:3000/artists');
      const data = await response.json();
      console.log(data)
      setArtists(data);
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    (
      async function () {
        await getArtists()
      }
    )()
  }, []);

  const handleChange = (event) => {
    const updateInput = Object.assign({}, formInputs, { [event.target.id]: event.target.value })
    updateFormInputs(updateInput)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/artists', formInputs);
      const createdArtist = response.data;
      updateFormInputs({
        name: "",
        biography: "",
        age: "",
        location: ""
      })
      setArtists([createdArtist, ...artists])
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="App">
      <div className="container">
        <h1 className="header">
          Spotlight Artists
        </h1>
        <Artists artists={artists} />
        <br />
        <h3>
          Looking to Join Our Spotlight Artists? Fill the form below to be featured!
        </h3>
        <main>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Artist Name: </label>
            <input
              type="text"
              id="name"
              value={formInputs.name}
              onChange={handleChange} />
            <br />
            <label htmlFor="biography">Biography: </label>
            <input
              type="text-area"
              id="biography"
              value={formInputs.biography}
              onChange={handleChange} />
            <br />  
            <label htmlFor="age">Age: </label>
            <input
              type="text"
              id="age"
              value={formInputs.age}
              onChange={handleChange} />
            <br />  
            <label htmlFor="location">Location: </label>
            <input
              type="text"
              id="location"
              value={formInputs.location}
              onChange={handleChange} />
            <br />  
            <input type="submit" className="submit" />
          </form>
          <br />
        </main>
      </div>
    </div>
  )
}