<template>
  <div>
    <tr class="row">
      <th>{{ title }}</th>
      <td>
        <slot />
      </td>
    </tr>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  border-bottom: 1px solid #ddd;

  &:nth-last-child(1) {
    border-bottom: transparent;
  }

  th,
  td {
    border-right: 1px solid #ddd;
    padding: 16px 24px;

    &:nth-child(3n) {
      border-right: transparent;
    }

    &:nth-last-child(1) {
      border-right: transparent;
    }
  }
}
</style>
