<template>
  <div>
    <select
      name="users"
      id="users"
      v-model="activeUser"
      class="mb-12 px-2 py-1 text-base rounded-lg border border-coolGray-400"
    >
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.name }}
      </option>
    </select>

    <Form />

    <div class="mt-12" v-if="shortenedLink.length >= 1">
      <a :href="shortenedLink" target="_blank">{{ shortenedLink }}</a>
    </div>

    <div class="mt-12" v-if="error.length >= 1">
      <p class="text-base text-red-700">{{ error }}</p>
    </div>

    <div class="mt-12">
      <p v-if="filteredShortenedLinksByUser.length === 0">
        You haven't shortened any links yet!
      </p>

      <ul v-else>
        <li
          v-for="link in filteredShortenedLinksByUser"
          :key="link.id"
          class="flex flex-row justify-start items-center gap-x-4"
        >
          <a :href="link.secureShortURL">{{ link.secureShortURL }}</a>
          <button type="button" @click="deleteStoredLink(link.id)">❌</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useUsers } from "../components/hooks/useUsers";
import { useShortenedLinks } from "../components/hooks/useShortenedLinks";
import Form from "../components/Form";
import { computed } from "vue";

export default {
  name: `Home`,

  setup() {
    const { users, activeUser, setActiveUser } = useUsers();

    const { shortenedLinks, shortenedLink, error, deleteStoredLink } = useShortenedLinks();

    const filteredShortenedLinksByUser = computed(() => {
      const filteredLinks = shortenedLinks.value.filter(
        (shortenedLink) => (shortenedLink.userId = activeUser)
      );

      return filteredLinks;
    });

    const switchUser = (id) => {
      setActiveUser(id);
    };

    return {
      users,
      activeUser,
      switchUser,
      filteredShortenedLinksByUser,
      shortenedLink,
      deleteStoredLink,
      error,
      shortenedLinks,
    };
  },

  components: {
    Form,
  },
};
</script>
