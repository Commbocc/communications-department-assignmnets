<template>
  <main>
    <section class="py-5">
      <div class="container">
        <hc-select-field
          department-input-id="field59760408"
          prs-email-input-id="field59760500"
          mrs-email-input-id="field59760501"
          required
        ></hc-select-field>

        <input id="field59760408" readonly disabled aria-hidden="true" />
        <input id="field59760500" readonly disabled aria-hidden="true" />
        <input id="field59760501" readonly disabled aria-hidden="true" />
      </div>
    </section>

    <hr />

    <section class="py-5">
      <div class="container">
        <hc-staff-table filter="MRS" show-voip></hc-staff-table>
      </div>
    </section>
  </main>
</template>
