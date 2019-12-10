import Link from 'next/link'
import CloseIcon from 'react-ionicons/lib/MdClose'
import { useContext } from 'react'
import { MyProjectsContext } from '../contexts/my-projects'
import trimNamespace from '../helpers/trim-namespace'
import './project-card.scss'

const ProjectCard = ({ id, name, nameWithNamespace }) => {
  const { deleteMyProject } = useContext(MyProjectsContext)
  return (
    <div className="project-card">
      <div>
        <Link href={`/project/[id]`} as={`/project/${id}`}>
          <h4 className="project-card__name">{name}</h4>
        </Link>
        <div className="project-card__namespace">
          {trimNamespace(nameWithNamespace)}
        </div>
      </div>
      <button
        className="project-card__delete"
        onClick={() => {
          deleteMyProject(id)
        }}
      >
        <CloseIcon />
      </button>
    </div>
  )
}

export default ProjectCard
