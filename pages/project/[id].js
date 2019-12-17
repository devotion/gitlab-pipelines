import PropTypes from 'prop-types'
import { useContext, useState, useCallback } from 'react'
import CloseIcon from 'react-ionicons/lib/MdClose'

import Layout from '../../components/layout'
import { AuthContext } from '../../contexts/auth'
import { MyProjectsContext } from '../../contexts/my-projects'
import LoadingPage from '../../components/loading/loading-page'
import PipelinesList from '../../components/pipeline/pipelines-list'
import useFetch from '../../hooks/useFetch'
// import useInterval from '../../hooks/useInterval'

import useWhyDidYouUpdate from '../../hooks/useWhyDidYouUpdate'
import {
  getSelectedProject,
  addQueryParams
} from '../../helpers/general.helpers'
import RefreshIcon from 'react-ionicons/lib/MdRefresh'
import { useRouter } from 'next/router'

import './project.scss'

function Project({ id }) {
  const {
    credentials: { registry }
  } = useContext(AuthContext)

  // REMOVE THIS - use to fake stuff for notifications
  // const [fakeStatus, setFakeStatus] = useState('success')
  // const [fakeLoading, setFakeLoading] = useState(false)

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setFakeLoading(true)
  //     setFakeStatus('failed')
  //     setFakeLoading(false)
  //   }, 3000)

  //   setTimeout(() => {
  //     setFakeLoading(true)
  //     setFakeStatus('success')
  //     setFakeLoading(false)
  //   }, 6000)
  // }, [])
  // REMOVE THIS

  const router = useRouter()

  const [filters, setFilters] = useState({
    ref: '',
    status: '',
    per_page: 1,
    username: ''
  })

  const setSingleFilter = useCallback(
    (name, value) => {
      setFilters({ ...filters, [name]: value })
    },
    [filters]
  )

  const [pipelines, fetchingPipelines, refetchData] = useFetch(
    `${registry}/projects/${id}/pipelines${addQueryParams(filters)}`
  )

  const { myProjects } = useContext(MyProjectsContext)

  useWhyDidYouUpdate('Project', {
    id,
    pipelines,
    fetchingPipelines,
    setSingleFilter,
    filters,
    router
  })

  // useInterval(refetchData, 10000)

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
      {fetchingPipelines ? (
        <LoadingPage />
      ) : (
        <PipelinesList
          pipelines={pipelines}
          projectId={id}
          setSingleFilter={setSingleFilter}
        />
      )}
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
