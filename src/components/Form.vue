<template>
  <form @submit.prevent="shortenUrl">
    <div class="flex flex-col items-start justify-start gap-y-2">
      <label
        for="UrlInput"
        class="text-sm uppercase font-bold text-coolGray-600"
        >URL Input</label
      >
      <input
        v-model="urlInput"
        type="text"
        name="UrlInput"
        id="UrlInput"
        class="border border-coolGray-400 px-2 py-1 text-base rounded-lg"
      />
      <button
        type="submit"
        class="bg-pink-300 text-pink-900 px-4 py-1 text-base rounded-lg"
      >
        Shorten Url!
      </button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { useUsers } from "./hooks/useUsers";
import { useShortenedLinks } from "./hooks/useShortenedLinks";
import { ref } from "vue";

export default {
  name: `Form`,

  setup() {
    const { activeUser } = useUsers();
    const { storeLink, setError } = useShortenedLinks();
    const urlInput = ref(``);

    const getShortenedUrl = async () => {
      const shortenerResponse = await axios
        .post(
          `https://api.short.io/links/public`,
          {
            domain: `1g3n.short.gy`,
            originalURL: urlInput.value,
          },
          {
            headers: {
              Authorization: `XN7nymwHbvmK34N5KUsEseB3GapaIKlm`,
              Accept: `application/json`,
              "Content-Type": `application/json`,
            },
          }
        )
        .then((res) => {
          return res.data;
        })
        .catch((e) => {
          const errorResponse = e.response.data.error;

          if (errorResponse) {
            setError(errorResponse);
          }
        });

      return shortenerResponse;
    };

    const shortenUrl = async () => {
      const data = await getShortenedUrl().then((res) => res);

      storeLink(data, activeUser.value);
    };

    return {
      urlInput,
      shortenUrl,
    };
  },

  methods: {},
};
</script>
