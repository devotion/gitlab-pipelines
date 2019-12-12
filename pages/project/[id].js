import PropTypes from 'prop-types'
import { useContext, useState } from 'react'
import CloseIcon from 'react-ionicons/lib/MdClose'

import Layout from '../../components/layout'
import { AuthContext } from '../../contexts/auth'
import { MyProjectsContext } from '../../contexts/my-projects'
import LoadingPage from '../../components/loading/loading-page'
import Pipeline from '../../components/pipeline/pipeline'
import useFetch from '../../hooks/useFetch'
import useInterval from '../../hooks/useInterval'
import getSelectedProject from '../../helpers/get-selected-project'
import RefreshIcon from 'react-ionicons/lib/MdRefresh'
import { useRouter } from 'next/router'
import addQueryParams from '../../helpers/add-query-params'

import './project.scss'

const Project = ({ id }) => {
  const {
    credentials: { registry }
  } = useContext(AuthContext)

  // REMOVE THIS
  // const [fakeStatus, setFakeStatus] = useState('success')

  // useEffect(() => {
  //   setTimeout(() => {
  //     setFakeStatus('failed')
  //   }, 3000)

  //   setTimeout(() => {
  //     setFakeStatus('success')
  //   }, 6000)

  //   setTimeout(() => {
  //     setFakeStatus('running')
  //   }, 9000)

  //   setTimeout(() => {
  //     setFakeStatus('success')
  //   }, 12000)
  // }, [])
  // REMOVE THIS

  const router = useRouter()

  const [filters, setFilters] = useState({
    ref: '',
    status: '',
    per_page: 20,
    username: ''
  })

  const setSingleFilter = (name, value) => {
    setFilters({ ...filters, [name]: value })
  }

  const [pipelines, fetchingPipelines, refetchData] = useFetch(
    `${registry}/projects/${id}/pipelines${addQueryParams(filters)}`,
    []
  )

  const { myProjects } = useContext(MyProjectsContext)

  useInterval(refetchData, 10000)

  const renderContent = () => {
    if (fetchingPipelines) return <LoadingPage />

    if (pipelines.error) {
      const errorMessage =
        pipelines.error_description || pipelines.error || 'There was an error'
      return (
        <div className="project__error">
          <h3>{errorMessage}</h3>
        </div>
      )
    }

    if (!pipelines.length) return null

    return (
      <div className="project">
        {pipelines.map(pipeline => {
          const { id: pipelineId, status, ref, web_url } = pipeline
          return (
            <Pipeline
              key={pipelineId}
              id={pipelineId}
              status={status}
              branch={ref}
              gitlabUrl={web_url}
              setSingleFilter={setSingleFilter}
              projectId={id}
            />
          )
        })}
      </div>
    )
  }

  if (myProjects.length && !getSelectedProject(id, myProjects)) {
    router.push('/')
    return null
  }

  return (
    <Layout title={'GitLab pipelines'}>
      <div className="project__header">
        <div>
          <h1>
            {myProjects.length ? getSelectedProject(id, myProjects).name : null}
          </h1>
        </div>
        <button onClick={refetchData}>
          <RefreshIcon />
        </button>
      </div>
      <div className="project__filters">
        {Object.keys(filters).map(filterName => {
          if (!filters[filterName]) return null
          if (filterName === 'per_page' || filterName === 'page') return null
          return (
            <div key={filters[filterName]}>
              {filters[filterName]}
              <CloseIcon
                onClick={() => {
                  setFilters({ ...filters, [filterName]: '' })
                }}
              />
            </div>
          )
        })}
      </div>
      {renderContent()}
    </Layout>
  )
}

Project.getInitialProps = ({ query }) => {
  const { id } = query

  return { id }
}

Project.propTypes = {
  id: PropTypes.string
}

export default Project
