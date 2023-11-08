<template>
  <div>
    <div v-for="(section, index) in sections" :key="section.id">
      <RezIntro
        v-if="section.__typename === 'TitleBannerRecord'"
        :section="section"
      />
      <RezHero v-if="section.__typename === 'HeroRecord'" :section="section" />
    </div>
  </div>
</template>

<script setup lang="ts">
  // interface DatoSection {
  //   id: string;
  //   __typename: string;
  //   title: string | null;
  // }
  import type { DatoSection } from "@/types";
  defineProps({
    sections: {
      type: Array<DatoSection>,
      required: true,
    },
  });
</script>

<style scoped></style>
