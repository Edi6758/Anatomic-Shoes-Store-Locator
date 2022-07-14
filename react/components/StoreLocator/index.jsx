import React, { useState, useEffect } from 'react'
import { useDevice } from 'vtex.device-detector'

import StoreCard from './StoreCard'

import './styles.global.css'

const StoreLocator = () => {
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [filteredStores, setFiltered] = useState([])

  const { isMobile } = useDevice()

  const fetchData = async () => {
    return fetch(
      '/api/dataentities/SO/search?_fields=address,name,zipRange,city,postalCode,number,zipRange,workingDays,workingInterval,workingHours',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((response) =>
      response.json().then((data) => {
        setStores(data)
        setLoading(false)
      })
    )
  }

  useEffect(() => {
    setLoading(true)
    fetchData()
  }, [])

  useEffect(() => {
    const reduzidos = stores.reduce((accumulator, value) => {
      value.zipRange = JSON.parse(value.zipRange)
      value.workingDays = JSON.parse(value.workingDays)
      value.workingHours = JSON.parse(value.workingHours)
      accumulator.push(value)

      // Remove itens duplicados
      accumulator = [...new Set(accumulator)]

      return accumulator
    }, [])

    setFiltered(reduzidos)
  }, [stores])

  useEffect(() => {
    if (search.length < 3) {
      return setFiltered(stores)
    }

    const arr = []

    stores.map((item) => {
      item.zipRange.forEach((zip) => {
        if (zip.indexOf(search.toUpperCase()) > -1 && arr.indexOf(item) < 0) {
          arr.push(item)
        }
      })

      if (item.name.toLowerCase().includes(search.toLowerCase())) {
        arr.push(item)
      }

      return arr
    })

    setFiltered(arr)
  }, [search, stores])

  if (loading) return <p>Loading...</p>

  return (
    <div className={`store-locator__wrapper ${isMobile ? 'mobile' : ''}`}>
      <div className="store-locator__search">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="E16AN"
        />
      </div>
      <ul className="cards__list">
        {filteredStores.map((item, index) => (
          <StoreCard key={index} {...item} />
        ))}
      </ul>
    </div>
  )
}

export default StoreLocator
