<template>
  <section>
    <p v-if="shortenedLinks[activeUser]?.length === 0">
      You haven't shortened any links yet!
    </p>

    <div
      class="
        grid grid-cols-12
        gap-x-4
        w-full
        px-2
        py-1
        rounded-t-lg
        bg-coolGray-200
        uppercase
        font-bold
        text-sm
      "
      v-if="shortenedLinks[activeUser].length >= 1"
    >
      <div class="col-span-5">Original Link</div>

      <div class="col-span-5">Shortened Link</div>

      <div
        class="opacity-0 group-hover:opacity-100 col-span-2 justify-self-end"
      >
        <!--        -->
      </div>
    </div>

    <div
      class="
        grid grid-cols-12
        gap-x-4
        w-full
        px-2
        py-1
        hover:bg-coolGray-100
        group
      "
      v-for="link in shortenedLinks[activeUser]"
      :key="link.id"
    >
      <div class="col-span-5">
        {{ link.originalURL }}
      </div>

      <div class="col-span-5">
        {{ link.secureShortURL }}
      </div>

      <div
        class="opacity-0 group-hover:opacity-100 col-span-2 justify-self-end"
      >
        <button @click="deleteStoredLink(link.id, activeUser)">
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6875 2.9375H10.418L9.48828 1.40625C9.24219 0.996094 8.83203 0.75 8.36719 0.75H5.60547C5.14062 0.75 4.73047 0.996094 4.48438 1.40625L3.55469 2.9375H1.3125C1.06641 2.9375 0.875 3.15625 0.875 3.375V3.8125C0.875 4.05859 1.06641 4.25 1.3125 4.25H1.75V13C1.75 13.9844 2.51562 14.75 3.5 14.75H10.5C11.457 14.75 12.25 13.9844 12.25 13V4.25H12.6875C12.9062 4.25 13.125 4.05859 13.125 3.8125V3.375C13.125 3.15625 12.9062 2.9375 12.6875 2.9375ZM5.55078 2.14453C5.57812 2.11719 5.63281 2.0625 5.71484 2.0625H8.28516C8.33984 2.0625 8.39453 2.11719 8.42188 2.14453L8.88672 2.9375H5.08594L5.55078 2.14453ZM10.5 13.4375H3.5C3.25391 13.4375 3.0625 13.2461 3.0625 13V4.25H10.9375V13C10.9375 13.2461 10.7188 13.4375 10.5 13.4375ZM7 12.125C7.21875 12.125 7.4375 11.9336 7.4375 11.6875V6C7.4375 5.78125 7.21875 5.5625 7 5.5625C6.75391 5.5625 6.5625 5.78125 6.5625 6V11.6875C6.5625 11.9336 6.75391 12.125 7 12.125ZM4.8125 12.125C5.03125 12.125 5.25 11.9336 5.25 11.6875V6C5.25 5.78125 5.03125 5.5625 4.8125 5.5625C4.56641 5.5625 4.375 5.78125 4.375 6V11.6875C4.375 11.9336 4.56641 12.125 4.8125 12.125ZM9.1875 12.125C9.40625 12.125 9.625 11.9336 9.625 11.6875V6C9.625 5.78125 9.40625 5.5625 9.1875 5.5625C8.94141 5.5625 8.75 5.78125 8.75 6V11.6875C8.75 11.9336 8.94141 12.125 9.1875 12.125Z"
              fill="#C53030"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { useShortenedLinks } from "./hooks/useShortenedLinks";
import { useUsers } from "./hooks/useUsers";

export default {
  name: "LinkList",

  setup() {
    const { deleteStoredLink, shortenedLinks } = useShortenedLinks();
    const { activeUser } = useUsers();

    return {
      activeUser,
      shortenedLinks,
      deleteStoredLink,
    };
  },
};
</script>
