<template>
  <div class="integral-rules-managers">
    <table width="auto" class="table">
      <tbody>
        <tr class="x1">
          <td rowspan="2">分类</td>
          <td rowspan="2">管理岗位</td>
          <td colspan="2">分布占比</td>
          <td colspan="5">占比明细</td>
          <td colspan="5">原始积分</td>
        </tr>

        <tr class="x2">
          <td>技术积分占比</td>
          <td>管理积分占比</td>
          <td>个人技术积分占比</td>
          <td>直属人员技术积分</td>
          <td>分管人员技术积分</td>
          <td>直属人员满足度积分（包含自己）</td>
          <td>分管人员满足度积分</td>
          <td>个人技术原始分</td>
          <td>直属技术原始分</td>
          <td>分管技术原始分</td>
          <td>直属满足度原始分</td>
          <td>分管满足度原始分</td>
        </tr>

        <tr class="x3">
          <td rowspan="3">取值</td>
          <td>组长</td>
          <td>70.0%</td>
          <td>30%</td>
          <td>50%</td>
          <td>20%</td>
          <td />
          <td>30%</td>
          <td />
          <td>20</td>
          <td>8</td>
          <td />
          <td>12</td>
          <td />
        </tr>

        <tr class="x4">
          <td>副经理</td>
          <td>50.0%</td>
          <td>50%</td>
          <td />
          <td>30%</td>
          <td>20%</td>
          <td>30%</td>
          <td>20%</td>
          <td />
          <td>12</td>
          <td>8</td>
          <td>12</td>
          <td>8</td>
        </tr>

        <tr class="x5">
          <td>经理</td>
          <td>50.0%</td>
          <td>50%</td>
          <td />
          <td>20%</td>
          <td>30%</td>
          <td>20%</td>
          <td>30%</td>
          <td />
          <td>8</td>
          <td>12</td>
          <td>8</td>
          <td>12</td>
        </tr>

        <tr class="x6">
          <td rowspan="3">算法</td>
          <td>组长</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td>个人项目管理和工程岗位</td>
          <td>直属人员的绩效平均分*0.2</td>
          <td />
          <td>直属人员项目需求和人员能力的满足度平均分*12</td>
          <td />
        </tr>

        <tr class="x7">
          <td>副经理</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td>直属人员的绩效平均分*0.3</td>
          <td>分管人员的绩效平均分*0.2</td>
          <td>直属人员项目需求和人员能力的满足度平均分*12</td>
          <td>分管人员项目需求和人员能力的满足度平均分*8</td>
        </tr>
        <tr class="x8">
          <td>副经理</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td>直属人员的绩效平均分*0.3</td>
          <td>分管人员的绩效平均分*0.2</td>
          <td>直属人员项目需求和人员能力的满足度平均分*8</td>
          <td>分管人员项目需求和人员能力的满足度平均分*12</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.integral-rules-managers {
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
