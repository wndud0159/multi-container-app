import React, { useState, useEffect } from 'react'
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

function App() {

  const [lists, setLists] = useState([])
  const [value, setValue] = useState("")

  useEffect(() => {
    axios.get('/api/values')
      .then(response => {
        console.log('get lists response', response.data)
        setLists(response.data)
      })
  }, [])

  const changeHandler = (event) => {
    setValue(event.currentTarget.value)
  }

  const submitHandler = (event) => {
    event.preventDefault()

    axios.post(`/api/value`, { value: value })
      .then(response => {
        if (response.data.success) {
          console.log('post lists response', response)
          setLists([...lists, response.data])
          setValue("");
        } else {
          alert('Server Error')
        }
      }) 
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {
            lists && lists.map((list, index) => (
            <li key={index}>{list.value}</li>
            ))
          }
          <br/>
          <form className="example" onSubmit={submitHandler}>
            <input type="text" placeholder="입력해주세요.." value={value} required onChange={changeHandler}/>
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
