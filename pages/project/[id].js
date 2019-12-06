import { useContext } from 'react'
import Layout from '../../components/layout'
import { AuthContext } from '../../contexts/auth'
import { MyProjectsContext } from '../../contexts/my-projects'
import LoadingPage from '../../components/loading-page'
import Pipeline from '../../components/pipeline'
import useFetch from '../../hooks/useFetch'
import useInterval from '../../hooks/useInterval'
import getSelectedProject from '../../helpers/get-selected-project'

import './project.scss'

const Project = ({ id }) => {
  const {
    credentials: { registry, token }
  } = useContext(AuthContext)

  const [pipelines, refetchData] = useFetch(
    `${registry}/projects/${id}/pipelines`,
    {
      headers: {
        'Private-Token': token
      }
    },
    [id, registry, token],
    []
  )

  const { myProjects } = useContext(MyProjectsContext)

  if (process.env.NODE_ENV === 'production') {
    useInterval(refetchData, 10000)
  }

  if (!pipelines || !pipelines.length || !myProjects.length)
    return (
      <Layout title="Loading">
        <LoadingPage />
      </Layout>
    )

  return (
    <Layout title={'GitLab project'}>
      <div className="project__header">
        <h1>{getSelectedProject(id, myProjects).name}</h1>
      </div>
      <div className="project">
        {pipelines.map(pipeline => {
          const { id, status, ref, web_url, updated_at, created_at } = pipeline
          return (
            <Pipeline
              key={id}
              id={id}
              status={status}
              branch={ref}
              gitlabUrl={web_url}
              updatedAt={updated_at}
              createdAt={created_at}
            />
          )
        })}
      </div>
    </Layout>
  )
}

Project.getInitialProps = ({ query }) => {
  const { id } = query

  return { id }
}

export default Project
