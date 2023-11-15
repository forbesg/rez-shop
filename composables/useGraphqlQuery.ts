type DatoGQLQueryOptions = {
  query: string;
  variables: Object | undefined;
};

type DatoHeaders = HeadersInit & { "X-Include-Drafts": boolean };

export default (options: DatoGQLQueryOptions) => {
  const { query, variables = {} } = options;
  const {
    public: { datoCmsToken },
  } = useRuntimeConfig();
  const key = JSON.stringify(options);
  const headers = {
    Authorization: `Bearer ${datoCmsToken}`,
    "X-Include-Drafts": true,
  };
  return useFetch("https://graphql.datocms.com/", {
    key,
    method: "POST",
    headers,
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
