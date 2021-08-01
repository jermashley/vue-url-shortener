<template>
  <router-view />
</template>

<script>
import { onMounted } from "vue";
import { useShortenedLinks } from "./components/hooks/useShortenedLinks";
export default {
  name: `App`,

  setup() {
    const { getLocalShortenedLinks } = useShortenedLinks();

    onMounted(() => {
      getLocalShortenedLinks();
    });
  },
};
</script>

<style lang="scss">
//
</style>
