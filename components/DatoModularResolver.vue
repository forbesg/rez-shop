<template>
  <div>
    <div v-for="section in sections" :key="section.id">
      <RezIntro
        v-if="section.__typename === 'TitleBanner'"
        :section="section"
      />
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
