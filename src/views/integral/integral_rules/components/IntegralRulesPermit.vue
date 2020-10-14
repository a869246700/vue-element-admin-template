<template>
  <div class="integral-rules-permit">
    <table width="auto" class="table">
      <tbody>
        <tr class="x1">
          <td>序号</td>
          <td>类型</td>
          <td>最终结果</td>
        </tr>
        <tr class="x2">
          <td>1</td>
          <td>yang的代码的基数下调</td>
          <td />
        </tr>
        <tr class="x3">
          <td>2</td>
          <td>白盒项目的代码量的基数</td>
          <td />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.integral-rules-permit {
  overflow: auto;

  .table {
    width: 100%;
    background-color: rgb(250, 250, 250);
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    white-space: nowrap;
    border-collapse: collapse;

    tr,
    td {
      border: 1px solid rgb(203, 203, 203);
    }

    td {
      padding: 7px 10px;
      line-height: 1.5;
    }
  }
}
</style>
