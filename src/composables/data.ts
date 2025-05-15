import { $fetch } from "ofetch";
import { computed, ref } from "vue";
import type { CommunicationsStaff, Department } from "~~types/contentstack";

const data = ref<{
  staffMemberEntries: CommunicationsStaff[];
  departmentEntries: Department[];
}>();

(async () => {
  data.value = await $fetch(
    // @ts-ignore
    import.meta.env.VITE_DATA_URL
  );
})();

export const staffMembers = computed(
  () => data.value?.staffMemberEntries ?? []
);
export const departments = computed(() => data.value?.departmentEntries ?? []);

export const selectedDepartmentUid = ref<string>();

export const selectedDepartment = computed(() =>
  departments.value.find((x) => x.uid === selectedDepartmentUid.value)
);

export const selectedDepartmentPrs = computed(() => {
  return staffMembers.value.find(
    (x) =>
      x.filter?.includes("PRS") &&
      x.departments?.some((d) => d.entry_uid === selectedDepartmentUid.value)
  );
});

export const selectedDepartmentMrs = computed(() => {
  return staffMembers.value.find(
    (x) =>
      x.filter?.includes("MRS") &&
      x.departments?.some((d) => d.entry_uid === selectedDepartmentUid.value)
  );
});
