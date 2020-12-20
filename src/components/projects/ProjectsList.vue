<template>
  <base-container v-if="user">
    <h2>{{ user.fullName }}: Projects</h2>
    <base-search
      v-if="hasProjects"
      @search="updateSearch"
      :search-term="enteredSearchTerm"
    ></base-search>
    <ul v-if="hasProjects">
      <project-item
        v-for="prj in availableProjects"
        :key="prj.id"
        :title="prj.title"
      ></project-item>
    </ul>
    <h3 v-else>No projects found.</h3>
  </base-container>
  <base-container v-else>
    <h3>No user selected.</h3>
  </base-container>
</template>

<script>
import { computed, toRefs, watch } from 'vue';
import ProjectItem from './ProjectItem.vue';
import useSearch from '../../hooks/search';

export default {
  components: {
    ProjectItem,
  },
  props: ['user'],
  setup(props) {
    const { user } = toRefs(props);
    // Used computed becasue props are not reactive and hence will not update
    const projects = computed(function() {
      return user.value ? user.value.projects : [];
    });
    console.log(projects);
    const {
      enteredSearchTerm,
      updateSearch,
      availableItems: availableProjects,
    } = useSearch(projects, 'title');

    watch(user, () => {
      updateSearch('');
    });

    const hasProjects = computed(function() {
      return user.value.projects && availableProjects.value.length > 0;
    });

    return {
      enteredSearchTerm,
      updateSearch,
      availableProjects,
      hasProjects,
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
