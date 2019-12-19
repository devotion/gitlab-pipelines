import { useContext, useState, useCallback } from 'react'
import CloseIcon from 'react-ionicons/lib/MdClose'

import Layout from '../../components/layout'
import { AuthContext } from '../../contexts/auth'
import { MyProjectsContext } from '../../contexts/my-projects'
import LoadingPage from '../../components/loading/loading-page'
import PipelinesList from '../../components/pipeline/pipelines-list'
import useFetch from '../../hooks/useFetch'
import useInterval from '../../hooks/useInterval'

import {
  getSelectedProject,
  addQueryParams
} from '../../helpers/general.helpers'
import RefreshIcon from 'react-ionicons/lib/MdRefresh'
import { useRouter } from 'next/router'

import './project.scss'

function Project() {
  const {
    credentials: { registry }
  } = useContext(AuthContext)

  const router = useRouter()
  const { id } = router.query

  const [filters, setFilters] = useState({
    ref: '',
    status: '',
    per_page: 20,
    username: ''
  })

  const [pipelines, fetchingPipelines, refetchData] = useFetch(
    `${registry}/projects/${id}/pipelines${addQueryParams(filters)}`,
    [id, registry, filters],
    []
  )

  const setSingleFilter = useCallback(
    (name, value) => {
      setFilters({ ...filters, [name]: value })
    },
    [filters]
  )

  const { myProjects } = useContext(MyProjectsContext)

  useInterval(refetchData, 10000)

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

export default Project
