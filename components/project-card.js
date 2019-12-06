import Link from 'next/link'
import './project-card.scss'

const ProjectCard = ({ id, name, nameWithNamespace }) => {
  return (
    <div className="project-card">
      <Link href={`/project/[id]`} as={`/project/${id}`}>
        <h4 className="project-card__name">{name}</h4>
      </Link>
      <div className="project-card__namespace">{nameWithNamespace}</div>
    </div>
  )
}

export default ProjectCard
