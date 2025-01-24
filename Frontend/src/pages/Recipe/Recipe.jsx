import React from 'react'
import Navbar from '../../Components/Recipe/Navbar'
import RecipeChatbot from '../../Components/Recipe/RecipeChatbot'
import SearchBar from '../../Components/Recipe/SearchBar'

const Recipe = () => {
  return (
    <div className='bg-green-100 h-screen'>
      <Navbar></Navbar>
      <SearchBar></SearchBar>
      <RecipeChatbot></RecipeChatbot>
    
    </div>
  )
}

export default Recipe
