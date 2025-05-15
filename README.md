# Hillsborough County Communication's PRS & MRS Department Assignments

## `<hc-select-field>` Component

### Overview

`<hc-select-field>` is a Vue 3 custom element built with `defineCustomElement`. It renders a labeled `<select>` dropdown to choose a department from a predefined list. The selected department is stored reactively and can be integrated with external DOM inputs for form handling.

### Example Usage

```html
<script src="./communications-department-assignmnets.umd.js"></script>

<hc-select-field
  department-input-id="field59760408"
  prs-email-input-id="field59760500"
  mrs-email-input-id="field59760501"
  required
></hc-select-field>
```

### Props

| Prop                | Type      | Default        | Required | Description                                                  |
| ------------------- | --------- | -------------- | -------- | ------------------------------------------------------------ |
| `label`             | `string`  | `"Department"` | No       | Label for the dropdown field.                                |
| `required`          | `boolean` | `true`         | No       | Whether the field is required. Displays an asterisk if true. |
| `departmentInputId` | `string`  | `undefined`    | No       | ID of a hidden input to store the selected department.       |
| `prsEmailInputId`   | `string`  | `undefined`    | No       | ID of a hidden input for storing PRS email address.          |
| `mrsEmailInputId`   | `string`  | `undefined`    | No       | ID of a hidden input for storing MRS email address.          |

### Behavior

- On mount, the component locates DOM elements by the provided IDs and links them to internal reactive refs:
  - `departmentInput`
  - `prsEmailInput`
  - `mrsEmailInput`
- Dropdown options are sourced from the `departments` array.
- The selected value is bound to the global `selectedDepartmentUid`, making it accessible across components.

### Integration Example

```html
<form>
  <hc-select-field
    department-input-id="departmentField"
    prs-email-input-id="prsEmail"
    mrs-email-input-id="mrsEmail"
    label="Choose Department"
    required
  ></hc-select-field>

  <input id="departmentField" name="department" type="hidden" />
  <input id="prsEmail" name="prs_email" type="hidden" />
  <input id="mrsEmail" name="mrs_email" type="hidden" />
</form>
```

## `<hc-staff-table>` Component

### Overview

`<hc-staff-table>` is a Vue 3 custom element built using `defineCustomElement`. It renders a dynamic staff listing table with optional filtering and a toggle for VOIP display. The table is styled with Tailwind CSS and supports light/dark theming.

### Example Usage

```html
<script src="./communications-department-assignmnets.umd.js"></script>

<hc-staff-table filter="MRS" show-voip></hc-staff-table>
```

### Props

| Prop       | Type                     | Default     | Required | Description                                                                  |
| ---------- | ------------------------ | ----------- | -------- | ---------------------------------------------------------------------------- |
| `filter`   | `string` (`StaffFilter`) | `undefined` | No       | Filters the displayed staff by the provided type (e.g., `"MRS"` or `"PRS"`). |
| `showVoip` | `boolean`                | `false`     | No       | If `true`, enables display of VOIP phone numbers in the table rows.          |
| `dark`     | `boolean`                | `false`     | No       | Enables dark theme styling on the component.                                 |

### Behavior

- The component consumes a list of `staffMembers` from a composable.
- If a `filter` is provided, it filters the staff list to only include entries with a matching filter property.
- Child component `<StaffTableRow>` handles the rendering of individual staff members, including conditional VOIP display.
- (Not yet implemented) The outer container supports dark mode via the `dark` prop.

### Notes

The filter prop should match the structure of your StaffFilter type ("MRS", "PRS", etc.).

## Styling

- Utilizes [Tailwind CSS](https://tailwindcss.com/) for spacing, layout, and typography.

## Build Setup

```bash
# install dependencies
npm

# serve with hot reload
npm run dev

# build for production
npm run build
```
