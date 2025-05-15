<script setup lang="ts">
import { computed, provide } from "vue";

import StaffTableRow from "~~/components/StaffTable/Row.vue";

import type { StaffFilter } from "~~types/contentstack";

import { staffMembers } from "~~/composables/data";

const props = defineProps<{
  filter?: StaffFilter;
  showVoip?: boolean;
  dark?: boolean;
}>();

provide<boolean>("show-voip", props.showVoip);

const filteredStaff = computed(() => {
  return props.filter
    ? staffMembers.value.filter((x) => x.filter === props.filter)
    : staffMembers.value;
});
</script>

<template>
  <div
    :class="{ dark }"
    class="prose relative overflow-x-auto shadow-md sm:rounded-lg"
  >
    <table class="">
      <thead class="">
        <tr>
          <th scope="col" class="px-6 py-4">Name &amp; Responsibilities</th>
          <th scope="col" class="px-6 py-4">Contact Information</th>
        </tr>
      </thead>

      <tbody>
        <StaffTableRow
          v-for="person in filteredStaff"
          :person="person"
          :key="person.uid"
          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
        />
      </tbody>
    </table>
  </div>
</template>

<style>
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@custom-variant dark (&:where(.dark, .dark *));
</style>
