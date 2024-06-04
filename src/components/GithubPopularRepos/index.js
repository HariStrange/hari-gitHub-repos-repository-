import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants[0].initial,
    activeFilterId: languageFiltersData[0].id,
    reposData: [],
  }

  componentDidMount() {
    this.getPopularRepos()
  }

  getPopularRepos = async () => {
    const {activeFilterId} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeFilterId}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachData => ({
        name: eachData.name,
        id: eachData.id,
        issuesCount: eachData.issues_count,
        forksCount: eachData.forks_count,
        starsCount: eachData.stars_count,
        avatarUrl: eachData.avatar_url,
      }))
      this.setState({
        reposData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="faliure-image"
      />
      <h1 className="failure-head">Something Went Wrong</h1>
    </div>
  )

  renderSuccessView = () => {
    const {reposData} = this.state
    return (
      <ul className="repository-list">
        {reposData.map(eachData => (
          <RepositoryItem key={eachData.id} repositoryItems={eachData} />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.failure:
        return this.renderFailureView()
      case apiStatus.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  updateActiveId = id => {
    this.setState({activeFilterId: id}, this.getPopularRepos)
  }

  renderLanguageFilterList = () => {
    const {activeFilterId} = this.state
    return (
      <ul>
        {languageFiltersData.map(eachData => (
          <LanguageFilterItem
            key={eachData.id}
            isActive={eachData.id === activeFilterId}
            updateActiveId={this.updateActiveId}
            languageFiltersData={eachData}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="responsive-Container">
          <h1 className="heading-el">Popular</h1>
          {this.renderLanguageFilterList()}
          {this.renderRepositories()}
        </div>
      </div>
    )
  }
}
// Write your code here
export default GithubPopularRepos
