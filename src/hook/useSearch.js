import { useMemo, useState } from 'react'
import { data } from '../services/data'

export function useSearch() {
  const [query, setQuery] = useState('')
  const customFilter = ({ data, tags, field }) => {
    if (Boolean(tags?.length) === false) return data

    const results = data.filter(element => {
      return tags.includes(element[field].toLowerCase())
    })
    return results
  }

  const filteredData = useMemo(() => {
    if (Boolean(query?.length) === false) return data

    //Convertir array de objetos a un arrays de strings
    const tagsLanguages = query
      .filter(query => query.type === 'lenguage')
      .map(query => query.value?.toLowerCase())

    const tagsLevel = query
      .filter(query => query.type === 'level')
      .map(query => query.value?.toLowerCase())

    const tagsRole = query
      .filter(query => query.type === 'role')
      .map(query => query.value?.toLowerCase())

    const _languages = data.filter(job => {
      return job.languages.some(language =>
        tagsLanguages.includes(language.toLowerCase())
      )
    })

    const _levels = customFilter({
      data: Boolean(_languages?.length) ? _languages : data,
      tags: tagsLevel,
      field: 'level',
    })

    const _roles = customFilter({
      data: _levels,
      tags: tagsRole,
      field: 'role',
    })

    return _roles
  }, [query])
  let lenguages = []

  data.forEach(job => {
    job.languages.forEach(language => {
      lenguages.push(language)
    })
  })

  const getOptions = ({ data, type }) => {
    return [...new Set(data)].map(element => {
      return {
        label: element,
        value: element?.toLowerCase(),
        type: type,
      }
    })
  }
  const lenguagesArray = getOptions({ data: lenguages, type: 'lenguage' })
  const levels = data.map(job => job.level)
  const levelsArray = getOptions({ data: levels, type: 'level' })
  const roles = data.map(job => job.role)
  const rolesArray = getOptions({ data: roles, type: 'role' })

  const selectOptions = [...lenguagesArray, ...levelsArray, ...rolesArray]
  //estilos de tags de busqueda
  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: '#fff' }),
    multiValue: styles => {
      return {
        ...styles,
        background: ' hsl(180, 31%, 92%)',
      }
    },
    multiValueLabel: styles => ({
      ...styles,
      color: 'hsl(180, 29%, 50%)',
    }),
    multiValueRemove: styles => ({
      ...styles,
      background: 'hsl(180, 29%, 50%)',
      color: '#fff',
      ':hover': {
        background: '#000',
        cursor: 'pointer',
      },
    }),
  }
  return {
    filteredData,
    selectOptions,
    colourStyles,
    query,
    setQuery,
  }
}
