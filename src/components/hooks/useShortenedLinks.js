import { reactive, toRefs } from "vue";

const LOCAL_STORAGE_KEY = `useShortenedLinks`;

const state = reactive({
  shortenedLinks: [],
  shortenedLink: ``,
  error: ``,
  loading: false,
});

export const useShortenedLinks = () => {
  const stringifyData = (data) => {
    return JSON.stringify(data);
  };

  const setError = (data) => {
    state.error = data;
  };

  const createLocalStorage = () => {
    if (window && !window.localStorage.getItem(LOCAL_STORAGE_KEY)) {
      window.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        stringifyData(state.shortenedLinks)
      );
    }
  };

  const getLocalShortenedLinks = () => {
    if (window && window.localStorage.getItem(LOCAL_STORAGE_KEY)) {
      const localShortenedLinks = JSON.parse(
        window.localStorage.getItem(LOCAL_STORAGE_KEY)
      );

      state.shortenedLinks = localShortenedLinks;
    } else {
      createLocalStorage();
    }
  };

  const setLocalShortenedLinks = (data) => {
    if (window && window.localStorage.getItem(LOCAL_STORAGE_KEY)) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, stringifyData(data));
    }
  };

  const updateShortenedLinks = (data) => {
    state.shortenedLinks = data;
    setLocalShortenedLinks(data);
  };

  const storeLink = (data, userId) => {
    if (!storedLinksContainsDuplicate(data.originalURL, userId)) {
      const { id, secureShortURL, originalURL, createdAt } = data;

      const formattedShortenedLink = {
        id,
        userId,
        secureShortURL,
        originalURL,
        createdAt,
      };

      const updatedShortenedLinks = [
        formattedShortenedLink,
        ...state.shortenedLinks,
      ];
      updateShortenedLinks(updatedShortenedLinks);
    }
  };

  const deleteStoredLink = (id) => {
    const filteredLinks = state.shortenedLinks.filter((shortenedLink) => {
      return shortenedLink.id != id;
    });

    updateShortenedLinks(filteredLinks);
  };

  const storedLinksContainsDuplicate = (originalURL, userId) => {
    const duplicates = state.shortenedLinks.find(
      (shortenedLink) =>
        shortenedLink.originalURL === originalURL &&
        shortenedLink.userId === userId
    );

    const duplicateExists = typeof duplicates !== `undefined`;

    return duplicateExists;
  };

  return {
    ...toRefs(state),
    setError,
    getLocalShortenedLinks,
    storeLink,
    deleteStoredLink,
  };
};
