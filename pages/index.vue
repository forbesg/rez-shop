<template>
  <div class="bg-yellow-100 text-primary">
    <Title>This is The Title</Title>
    <DatoModularResolver :sections="homepage.sections" />
    <!-- <pre>{{ homepage }}</pre> -->
    <RezIntro
      :section="{ title: 'This is the title', align: { center: true } }"
    />
    <RezFixedBackground />
    <RezEmailCapture />
    <!-- <div class="container">
      <h1 class="font-header text-5xl mb-4"></h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi itaque
        fugiat velit non atque omnis, facere quia architecto perspiciatis
        laboriosam, natus placeat eum ipsa corporis nemo illo. Et, excepturi
        impedit.
      </p>
    </div> -->
  </div>
</template>

<script setup lang="ts">
  const homepageQuery = `
    query HomepageQuery {
      homepage {
        id
        sections {
          __typename
          content
          subtitle
          title
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

  const { homepage } = data.value;
</script>

<style lang="scss" scoped></style>
