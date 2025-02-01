import React, { useEffect, useState } from 'react'
import JokeInfo from './JokeInfo.tsx'
import { Joke } from './types.ts'
import DropDown from './DropDown.tsx'

const ChuckCard = () => {
  const [jokes, setJokes] = useState<Joke | null>(null)
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJoke = async (category: string = '') => {
      setLoading(true)
      setError(null) // reset errors be4 new req

      try {
        let url = 'https://api.chucknorris.io/jokes/random'
        if (category) {
          url += `?category=${category}`
        }

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`)
        }

        const randomJoke: Joke = await response.json()
        setJokes(randomJoke)
      } catch (error: any) {
        setError(`Error: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchJoke(selectedCategory)
  }, [selectedCategory])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://api.chucknorris.io/jokes/categories'
        )

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`)
        }

        const cats: string[] = await response.json()
        setCategories(cats)
      } catch (error: any) {
        setError(`Error: ${error.message}`)
      }
    }
    fetchCategories()
  }, [])

  return (
    <div className="jokesWrapper">
      {/* Error msg */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Dropdwn for cats*/}
      <DropDown
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {jokes && !error && !loading && (
        <>
          <JokeInfo data={jokes.created_at ?? ''} label="Created At" />
          <JokeInfo data={jokes.id ?? ''} label="Id" />
          <div className="imageWrapper">
            <img src={jokes.icon_url ?? ''} alt="chuck_img" />
          </div>
          <JokeInfo data={jokes.updated_at ?? ''} label="Updated At" />
          <JokeInfo data={jokes.value ?? ''} label="Joke " />
        </>
      )}
    </div>
  )
}

export default ChuckCard
