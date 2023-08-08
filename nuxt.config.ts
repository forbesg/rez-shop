// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: {
        lang: "en-GB",
      },
      meta: [
        {
          name: "description",
          content: "Rez's Online Shop",
        },
      ],
      script: [
        {
          src: "https://js.stripe.com/v3/",
          defer: true,
          async: true,
        },
      ],
    },
  },
  css: ["/assets/style.scss"],
  modules: [
    "@nuxtjs/tailwindcss",
    // "@hexdigital/nuxt-datocms",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "@nuxt/image",
  ],
  // datocms: {
  //   publicReadOnlyToken: "e55ffa3128dfd55cb4ff392b76ea1d",
  //   // Optional - if you'd like to enable draft previews
  //   privateDraftEnabledToken: "4ad3bde087d38e71282182672468e1",
  //   privatePreviewModePassword: "showmethenewstuff", // A password required to enable draft previews
  //   privatePreviewModeEncryptionSecret:
  //     "14e6f2b5ebefb46270ed5543g916c452a377c70f5d548cb6b672ec40d7e1ab8ef", // A hash that is stored on the User's device once draft is enabled, to prove it's legitimate. Change this to turn-off all currently active draft previews
  // },
  googleFonts: {
    families: {
      Questrial: [400, 600],
      "Amatic+SC": [400],
    },
    preload: true,
    subsets: "latin",
    display: "swap",
  },
  image: {
    // Options
    domains: ["cdn.chec.io"],
    format: ["avif", "webp", "jpg"],
    quality: 80,
    loading: "lazy",
  },
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
  routeRules: {
    "/**": { prerender: true },
  },
  runtimeConfig: {
    public: {
      commerceJsKey: process.env.COMMERCE_JS_KEY,
      datoCmsToken: process.env.DATO_CMS_TOKEN,
      datoEndpoint: process.env.DATO_ENDPOINT,
    },
  },
  ssr: true,
});
