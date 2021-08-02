<template>
  <router-view />
</template>

<script>
import { onMounted } from "vue";
import { useShortenedLinks } from "./components/hooks/useShortenedLinks";
import { useUsers } from "./components/hooks/useUsers";
export default {
  name: `App`,

  setup() {
    const { getLocalShortenedLinks } = useShortenedLinks();
    const { users } = useUsers();

    onMounted(() => {
      getLocalShortenedLinks(users.value);
    });
  },
};
</script>

<style lang="scss">
//
</style>
