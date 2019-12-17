import PropTypes from 'prop-types'
import { memo } from 'react'

import Pipeline from '../../components/pipeline/pipeline'

import './pipelines-list.scss'

function PipelinesList({ pipelines, setSingleFilter, projectId }) {
  if (pipelines.error) {
    const errorMessage =
      pipelines.error_description || pipelines.error || 'There was an error'
    return (
      <div className="pipelines-list__error">
        <h3>{errorMessage}</h3>
      </div>
    )
  }

  if (!pipelines.length) return null

  return (
    <div className="pipelines-list">
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
            projectId={projectId}
          />
        )
      })}
    </div>
  )
}

PipelinesList.propTypes = {
  pipelines: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  setSingleFilter: PropTypes.func,
  projectId: PropTypes.string
}

export default memo(PipelinesList)
