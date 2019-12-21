export function addQueryParams(objectWithParams) {
  const hasValues = Object.keys(objectWithParams).filter(key =>
    Boolean(objectWithParams[key])
  );

  if (!hasValues.length) return '';

  const queryString = hasValues.reduce((total, currentValue, index) => {
    if (index === 0)
      return `?${currentValue}=${objectWithParams[currentValue]}`;

    return `${total}&${currentValue}=${objectWithParams[currentValue]}`;
  }, '?');

  return queryString;
}

export function getSelectedProject(id, projects) {
  return projects.find(project => Number(project.id) === Number(id));
}

export function removeObjectPropertyByKey(object, deleteKey) {
  // eslint-disable-next-line no-unused-vars
  const { [deleteKey]: deletedId, ...restOfTheObject } = object;
  return restOfTheObject;
}
