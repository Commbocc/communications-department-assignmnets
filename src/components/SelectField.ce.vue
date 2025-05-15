<script setup lang="ts">
import { useId, onMounted } from "vue";
import { departments, selectedDepartmentUid } from "~~/composables/data";
import {
  departmentInput,
  mrsEmailInput,
  prsEmailInput,
} from "~~/composables/dom";

const id = useId();

const props = withDefaults(
  defineProps<{
    label?: string;
    required?: boolean;
    departmentInputId?: string;
    prsEmailInputId?: string;
    mrsEmailInputId?: string;
  }>(),
  {
    label: "Department",
    required: true,
  }
);

onMounted(() => {
  departmentInput.value = props.departmentInputId
    ? document.getElementById(props.departmentInputId)
    : undefined;
  prsEmailInput.value = props.prsEmailInputId
    ? document.getElementById(props.prsEmailInputId)
    : undefined;
  mrsEmailInput.value = props.mrsEmailInputId
    ? document.getElementById(props.mrsEmailInputId)
    : undefined;
});
</script>

<template>
  <div class="space-y-3 my-3">
    <label class="block text-sm/6 text-gray-900 font-bold" :for="id">
      {{ label }}
      <span v-if="required" class="text-red-400">*</span>
    </label>

    <select
      v-model="selectedDepartmentUid"
      :id="id"
      class="block w-full bg-white px-4 py-2 outline outline-solid outline-offset-2 outline-gray-500"
    >
      <option :value="null"></option>
      <option v-for="{ uid, title } in departments" :value="uid" :key="uid">
        {{ title }}
      </option>
    </select>
  </div>
</template>

<style>
@import "tailwindcss";
</style>
