// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryItems} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repositoryItems
  return (
    <li className="repo-container">
      <img src={avatarUrl} alt={name} className="avatar" />
      <h1 className="avatar-head">{name}</h1>
      <div className="repo-details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="logo"
        />
        <p className="repo-desx">{starsCount} stars</p>
      </div>
      <div className="repo-details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt=" forks"
          className="logo"
        />
        <p className="repo-desx">{forksCount} forks</p>
      </div>
      <div className="repo-details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="logo"
        />
        <p className="repo-desx">{issuesCount} issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
