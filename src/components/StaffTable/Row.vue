<script setup lang="ts">
import { computed, inject } from "vue";
import { departments, staffMembers } from "~~/composables/data";
import type { CommunicationsStaff, Department } from "~~types/contentstack";

const props = defineProps<{ person: CommunicationsStaff }>();

const staffDepartments = computed<Department[]>(() =>
  departments.value.filter((x) =>
    props.person.departments?.map((x) => x.entry_uid).includes(x.uid)
  )
);

const oooBackup = computed<CommunicationsStaff | undefined>(() => {
  const [oooBu] = props.person.out_of_office_backup ?? [undefined];
  return staffMembers.value.find((x) => x.uid === oooBu?.uid);
});

const showVoip = inject<boolean>("show-voip");
</script>

<template>
  <tr>
    <td class="px-6 py-4">
      <p class="text-lg font-medium">
        {{ person.title }}
        <small class="font-thin">
          <br />
          {{ person.job_title }}
        </small>
      </p>

      <ul v-if="staffDepartments.length">
        <li
          v-for="{ uid: departmentUid, title } in staffDepartments"
          :key="departmentUid"
        >
          {{ title }}
        </li>
      </ul>

      <em v-if="!!oooBackup" class="text-xs">
        <strong>Out of Office Backup:</strong>
        {{ oooBackup.title }}
      </em>
    </td>

    <td class="px-6 py-4 space-y-1">
      <a
        :href="`mailto:${person.email}`"
        title="Email"
        class="text-nowrap flex items-center gap-2"
      >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>

        Email</a
      >

      <div
        v-if="showVoip"
        class="text-nowrap flex items-center gap-2"
        title="VOIP Phone"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0 6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
          />
        </svg>

        {{ person.voip }}
      </div>

      <div title="Office Phone" class="text-nowrap flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
          />
        </svg>

        {{ person.office_phone }}
      </div>

      <div title="Cell Phone" class="text-nowrap flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
          />
        </svg>

        {{ person.mobile_phone }}
      </div>
    </td>
  </tr>
</template>
