export default (options) => {
  const { query, variables = {} } = options;
  const {
    public: { datoCmsToken },
  } = useRuntimeConfig();
  const key = JSON.stringify(options);
  return useFetch("https://graphql.datocms.com/", {
    key,
    method: "POST",
    headers: {
      Authorization: `Bearer ${datoCmsToken}`,
      "X-Include-Drafts": true,
    },
    body: {
      query,
      variables,
    },
    transform: ({ data, errors }) => {
      if (errors) throw new errors();

      return data;
    },
  });
};
