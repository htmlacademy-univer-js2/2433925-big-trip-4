function createFilterItem(filter, currentFilterType){
  const {type, name, count} = filter;
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" ${type === currentFilterType ? 'checked' : ''} value="${type}" ${count === 0 ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  );
}

function createFiltersTemplate(filterItems, currentFilterType){
  const filterItemsTemplate = filterItems.map((filter) => createFilterItem(filter, currentFilterType)).join('');
  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
}

export { createFiltersTemplate };
