import { defineCustomElement } from "vue";

import SelectFieldComponent from "~~/components/SelectField.ce.vue";
import StaffTableComponent from "~~/components/StaffTable/index.ce.vue";

import { trackWithLoggly } from "./composables/loggly";

trackWithLoggly();

// convert into custom element constructor
const HcSelectFiled = defineCustomElement(SelectFieldComponent);
const HcStaffTable = defineCustomElement(StaffTableComponent);

// register
customElements.define("hc-select-field", HcSelectFiled);
customElements.define("hc-staff-table", HcStaffTable);
