import { watch, ref, computed } from 'vue';

const useSearch = (items, searchProp) => {
  const enteredSearchTerm = ref('');
  const activeSearchTerm = ref('');

  function updateSearch(val) {
    enteredSearchTerm.value = val;
  }

  // Computes
  const availableItems = computed(() => {
    let filteredItems = [];
    if (activeSearchTerm.value) {
      filteredItems = items.value.filter((item) =>
        item[searchProp].includes(activeSearchTerm.value)
      );
    } else if (items.value) {
      filteredItems = items.value;
    }
    return filteredItems;
  });

  watch(enteredSearchTerm, (val) => {
    setTimeout(() => {
      if (val === enteredSearchTerm.value) {
        activeSearchTerm.value = val;
      }
    }, 300);
  });
  return { enteredSearchTerm, updateSearch, availableItems };
};

export default useSearch;
