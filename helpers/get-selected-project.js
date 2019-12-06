export default (id, projects) =>
  projects.find(project => Number(project.id) === Number(id))
