<template>
  <select
    name="users"
    id="users"
    v-model="activeUser"
    @change="switchUser(activeUser)"
    class="mb-12 px-2 py-1 text-base rounded-lg border border-coolGray-400"
  >
    <option v-for="user in users" :key="user.id" :value="user.id">
      {{ user.name }}
    </option>
  </select>
</template>

<script>
import { useUsers } from "../components/hooks/useUsers";

export default {
  name: "UserSwitcher",

  setup() {
    const { users, activeUser, setActiveUser } = useUsers();

    const switchUser = (id) => {
      setActiveUser(id);
    };

    return {
      users,
      activeUser,
      setActiveUser,
      switchUser,
    }
  },
};
</script>

<style scoped>

</style>