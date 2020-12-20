<template>
  <base-container>
    <h2>Active Users</h2>
    <base-search
      @search="updateSearch"
      :search-term="enteredSearchTerm"
    ></base-search>
    <div>
      <button @click="sort('asc')" :class="{ selected: sorting === 'asc' }">
        Sort Ascending
      </button>
      <button @click="sort('desc')" :class="{ selected: sorting === 'desc' }">
        Sort Descending
      </button>
    </div>
    <ul>
      <user-item
        v-for="user in displayedUsers"
        :key="user.id"
        :user-name="user.fullName"
        :id="user.id"
        @list-projects="$emit('list-projects', $event)"
      ></user-item>
    </ul>
  </base-container>
</template>

<script>
import { toRefs } from 'vue';
import UserItem from './UserItem.vue';
import useSearch from '../../hooks/search';
import useSort from '../../hooks/sort';

export default {
  components: {
    UserItem,
  },
  props: ['users'],
  emits: ['list-projects'],
  setup(props) {
    // Hook
    const { users } = toRefs(props);
    const {
      enteredSearchTerm,
      updateSearch,
      availableItems: availableUsers,
    } = useSearch(users, 'fullName');

    const { sort, displayedUsers, sorting } = useSort(
      availableUsers,
      'fullName'
    );

    return {
      updateSearch,
      sort,
      enteredSearchTerm,
      sorting,
      availableUsers,
      displayedUsers,
    };
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
