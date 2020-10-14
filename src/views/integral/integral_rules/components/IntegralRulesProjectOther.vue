<template>
  <div class="integral-rules-project-other">
    <table width="auto" class="table">
      <tbody>
        <tr class="x1">
          <td>域/工作包代码量</td>
          <td />
          <td>小于1k（小于0.5不计算）</td>
          <td>大于1k且小于等于2k</td>
          <td>大于2k且小于等于5k</td>
          <td>大于5k且小于10k</td>
          <td>大于10K</td>
        </tr>

        <tr class="x2">
          <td rowspan="4">基础分</td>
          <td>总分</td>
          <td>5</td>
          <td>20</td>
          <td>50</td>
          <td>100</td>
          <td>250</td>
        </tr>

        <tr class="x3">
          <td>评审</td>
          <td>1</td>
          <td>5</td>
          <td>10</td>
          <td>25</td>
          <td>70</td>
        </tr>

        <tr class="x4">
          <td>设计</td>
          <td>2</td>
          <td>5</td>
          <td>15</td>
          <td>25</td>
          <td>80</td>
        </tr>

        <tr class="x5">
          <td>执行</td>
          <td>3</td>
          <td>10</td>
          <td>25</td>
          <td>100</td>
          <td>100</td>
        </tr>

        <tr class="x6">
          <td rowspan="5">加减分</td>
          <td>加减比例</td>
          <td>100%</td>
          <td>80%</td>
          <td>80%</td>
          <td>70%</td>
          <td>60%</td>
        </tr>

        <tr class="x7">
          <td>可加减总分</td>
          <td>5</td>
          <td>16</td>
          <td>40</td>
          <td>70</td>
          <td>150</td>
        </tr>

        <tr class="x8">
          <td>进度</td>
          <td>1</td>
          <td>4</td>
          <td>10</td>
          <td>10</td>
          <td>40</td>
        </tr>

        <tr class="x9">
          <td>质量</td>
          <td>3</td>
          <td>10</td>
          <td>25</td>
          <td>50</td>
          <td>80</td>
        </tr>

        <tr class="x10">
          <td>效率</td>
          <td>1</td>
          <td>2</td>
          <td>5</td>
          <td>10</td>
          <td>30</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.integral-rules-project-other {
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
