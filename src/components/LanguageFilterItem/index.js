// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {languageFiltersData, isActive, updateActiveId} = props
  const {id, language} = languageFiltersData

  const onClickUpdatedId = () => {
    updateActiveId(id)
  }

  const classname = isActive ? 'active btn-el' : 'btn-el'

  return (
    <li>
      <button className={classname} onClick={onClickUpdatedId} type="button">
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
