
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react' 
import { getAllMissingCatsApi } from '../apis/api-cats'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import logoSrc from '../images/MP-Logo-Black.svg'

// import * as dotenv from 'dotenv'
// dotenv.config()

export default function MissingCatList() {

  const [loadingTimePassed, setLoadingTimePassed] = useState(false)

  const {
    data: missingcats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['missing_cats'],
    queryFn: () => {
      return getAllMissingCatsApi()
    },
  })
  let errorImage = import.meta.env.VITE_NODE_ENV === 'development' ? '../client/images/catGif1.gif' : 'images/catGif1.gif'
  let loadingImage = import.meta.env.VITE_NODE_ENV === 'development' ? '../client/images/catGif2.gif' : 'images/catGif2.gif'
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingTimePassed(true)
    }, 1000) // Set the loading time in milliseconds (e.g., 3000ms or 3 seconds)

    return () => clearTimeout(timer) // Cleanup the timer on component unmount
  }, [])

  if (isError) {
    return (
      <div className="loading">
        <img src={`${errorImage}`} alt="" />
        <h1 className="loading-heading">Something's broken!</h1>
      </div>
    )
  }

  if (!missingcats || !loadingTimePassed || isLoading) {
    return (
      <div className="loading">
        <img src={`${loadingImage}`}  alt="" />
        <h1 className="loading-heading">Just a sec!</h1>
      </div>
    )
  }

  const backgroundColour = 'none'
  const itemColour = '#030303'
  const borderColour = '#030303'
  const getImageUrlsArray = (imageUrlString: string) => {
    if (!imageUrlString) return []
    if (import.meta.env.VITE_NODE_ENV === 'development') {
      return imageUrlString.split(',').map((url) => 'server/' + url.trim())
    }
    else {
      return imageUrlString.split(',').map((url) => url.trim())
    }
  }

  const filteredMissingCats = missingcats.filter((cat) => cat.catMissing)

  return (
    <>
      <Nav
        backgroundColour={backgroundColour}
        itemColour={itemColour}
        borderColour={borderColour}
        navLogoSrc={logoSrc}
      />
      <section className="cats">
        <div className="cats__left">
          <div className="cats-filter">
            <h2 className="cats-filter-header">Filter By</h2>
            <form action="" className="cats-filter-form">
              <div className="cats-filter-form__section">
                <label htmlFor="cats-region" className="cats-filter-form-label">
                  Region
                </label>
                <input
                  type="text"
                  id="cats-region"
                  className="cats-filter-form-input"
                />
              </div>
              <div className="cats-filter-form__section">
                <label htmlFor="cats-city" className="cats-filter-form-label">
                  City
                </label>
                <input
                  type="text"
                  id="cats-city"
                  className="cats-filter-form-input"
                />
              </div>
              <div className="cats-filter-form__section">
                <button className="cats-filter-form-btn" id="catsFilterFormBtn">
                  Search
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    viewBox="0 0 512 512"
                  >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="cats__right">
          <div className="cats__header">
            <h1 className="cats-header">These Kitties Need Your Help!</h1>
          </div>

          <div className="cats__cards">
            {filteredMissingCats.length > 0 ? (
              filteredMissingCats.map((cat) => (
                <div key={cat.catId} className="cats-card">
                  <div className="cats-card__img">
                    <img
                      src={`/${getImageUrlsArray(cat.missingImageUrl)[0]}`}
                      alt={cat.catName}
                      className="cats-card-img"
                    />
                  </div>
                  <div className="cats-card__info">
                    <h2 className="cats-card-title">{cat.catName}</h2>
                    <p className="cats-card-location">{cat.location}</p>
                    <p className="cats-card-bio">{cat.description}</p>
                    <div className="cats-card__link">
                      <Link
                        className="cats-card-link"
                        to={`/missingcats/singlecat/${cat.catId}`} 
                      >
                        More Info
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="16"
                          width="14"
                          viewBox="0 0 448 512"
                        >
                          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No missing cats with cat missing status TRUE found.</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
