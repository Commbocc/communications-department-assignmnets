import { ref, watch } from "vue";

import {
  selectedDepartmentUid,
  selectedDepartment,
  selectedDepartmentPrs,
  selectedDepartmentMrs,
} from "./data";

export const departmentInput = ref<HTMLElement | null>();
export const prsEmailInput = ref<HTMLElement | null>();
export const mrsEmailInput = ref<HTMLElement | null>();

watch(selectedDepartmentUid, () => {
  if (!!departmentInput.value) {
    changeInputValue(
      departmentInput.value,
      selectedDepartment.value?.title ?? null
    );
  }

  if (!!prsEmailInput.value) {
    changeInputValue(
      prsEmailInput.value,
      selectedDepartmentPrs.value?.email ?? null
    );
  }

  if (!!mrsEmailInput.value) {
    changeInputValue(
      mrsEmailInput.value,
      selectedDepartmentMrs.value?.email ?? null
    );
  }
});

// formstack uses react, this function is now required to have react see the changes to the input's value
export function changeInputValue(input: HTMLElement, value: any) {
  const key = input.constructor.name as keyof Window;

  const nativeInputValueSetter = Object?.getOwnPropertyDescriptor?.(
    window[key].prototype,
    "value"
  )?.set;

  nativeInputValueSetter?.call(input, value);

  const inputEvent = new Event("input", {
    bubbles: true,
  });

  input.dispatchEvent(inputEvent);
}
