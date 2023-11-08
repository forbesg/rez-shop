<template>
  <div class="bg-yellow-100 text-primary">
    <Title>This is The Title</Title>
    <DatoModularResolver v-if="homepage" :sections="homepage.sections" />
    <RezFixedBackground />
    <RezEmailCapture />
  </div>
</template>

<script setup lang="ts">
  const homepageQuery = `
    query HomepageQuery {
      homepage {
        id
        sections {
          __typename
          ... on HeroRecord {
            id
            title
            subtitle
            image {
              responsiveImage(imgixParams: { w: 1600, h: 900, auto: format, fit: crop } ) {
                alt
                src
                srcSet
              }
            }
          }
          ... on TitleBannerRecord {
            id
            title
            subtitle
            content
          }
        }
        _seoMetaTags {
          attributes
          content
          tag
        }
      }
    }
  `;

  const { data } = await useGraphqlQuery({ query: homepageQuery });

  // if (error) {
  //   console.log(error);
  // }

  const { homepage } = data?.value;
</script>

<style lang="scss" scoped></style>
