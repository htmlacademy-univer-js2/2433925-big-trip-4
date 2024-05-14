const FILTER_ITEMS = [
  'Everything',
  'Future',
  'Present',
  'Past',
];

function createFilterItems () {
  const container = [];
  for (const filter of FILTER_ITEMS) {
    const item = `<div class="trip-filters__filter">
                    <input id="filter-${filter.toLocaleLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.toLocaleLowerCase()}"
                    ${filter === 'Everything' ? 'checked' : ''}>
                    <label class="trip-filters__filter-label" for="filter-${filter.toLocaleLowerCase()}">${filter}</label>
                  </div>`;
    container.push(item);
  }
  return container.join('');
}
function createFiltersTemplate() {
  return `<form class="trip-filters" action="#" method="get">
  ${createFilterItems()}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
}


export { createFiltersTemplate };
