<template>
  <div class="flex flex-row items-center justify-end gap-x-2 mb-12">
    <label for="users" class="text-sm uppercase font-bold text-coolGray-600"
      >Switch users</label
    >

    <select
      name="users"
      id="users"
      v-model="activeUser"
      @change="switchUser(activeUser)"
      class="px-2 py-1 text-base rounded-lg border border-coolGray-400"
    >
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { useUsers } from "./hooks/useUsers";

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
    };
  },
};
</script>

<style scoped></style>
