import React from 'react'
import Select from 'react-select'
import { useSearch } from '../../hook/useSearch'
import './search.css'

function CustomSelect({ onChange }) {
  const { selectOptions, colourStyles } = useSearch()
  return (
    <div className="container">
      <Select
        type="text"
        options={selectOptions}
        isMulti
        placeholder="Buscar"
        styles={colourStyles}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: 'hsl(180, 31%, 90%)',
            primary: 'hsl(180, 29%, 50%)',
          },
        })}
        onChange={event => onChange(event)}
      />
    </div>
  )
}
export default CustomSelect
