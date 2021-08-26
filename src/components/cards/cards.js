import React from 'react'
import imageHeaderMobile from '../../images/bg-header-mobile.svg'
import imageHeaderDesktop from '../../images/bg-header-desktop.svg'
import CustomSelect from '../search/search'
import { useSearch } from '../../hook/useSearch'
import './cards.css'

export function Cards() {
  const { filteredData, query, setQuery } = useSearch()
  return (
    <div className="App">
      <div>
        <img
          className="image__header"
          src={imageHeaderMobile}
          alt="imageHeaderMobile"
        />
        <img
          className="image__header2"
          src={imageHeaderDesktop}
          alt="imageHeaderDesktop"
        />
      </div>
      <div>
        <CustomSelect
          type="text"
          value={query}
          placeholder="Buscar"
          onChange={tags => {
            setQuery(tags)
          }}
        />
      </div>
      <div>
        {filteredData &&
          filteredData.map(dato => (
            <div key={dato.id} className="container__card">
              <img src={dato.logo} alt="logo" />
              <div className="container__card--info">
                <div className="content__header--card">
                  <h3 className="title__card">{dato.company}</h3>
                  {dato.new ? <span className="card__new">NEW!</span> : false}
                  {dato.featured ? (
                    <span className="card__featured">FEATURED</span>
                  ) : (
                    false
                  )}
                </div>
                <h3 className="title__body--card">{dato.position}</h3>
                <div className="body__card">
                  <p>{dato.postedAt}</p>
                  <li>{dato.contract}</li>
                  <li>{dato.location}</li>
                </div>
              </div>
              <div className="footer__card">
                <p>{dato.role}</p>
                <p>{dato.level}</p>
                <p>{dato.languages[0]}</p>
                <p>{dato.languages[1]}</p>
                <p>{dato.languages[2]}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
