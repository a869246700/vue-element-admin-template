<template>
  <div class="integral-rules-base">
    <table width="auto" class="table">
      <tbody>
        <tr class="x1">
          <td>基准计算</td>
          <td />
          <td />
        </tr>
        <tr class="x2">
          <td>分值计算</td>
          <td>标准值</td>
          <td>算法说明</td>
        </tr>
        <tr class="x3">
          <td>项目分值</td>
          <td>累加处理15</td>
          <td>项目管理和项目工程分累加</td>
        </tr>
        <tr class="x4">
          <td>蓝军分值</td>
          <td>累加除以10</td>
          <td>
            2019年半年产出150分，全年300分，考虑到去年统计分数偏新，本年度的满足设置为400，折算到40分，除以10
          </td>
        </tr>
        <tr class="x5">
          <td>故障分值</td>
          <td>累加除以10</td>
          <td>2019年全年最高分200+，设定本年度的最高挑战分为360，折算到36分，除以10</td>
        </tr>
        <tr class="x6">
          <td>入围分值</td>
          <td>累加除以10</td>
          <td>2019年全年最高分200+，设定本年度的最高挑战分为360，折算到36分，除以10</td>
        </tr>
        <tr class="x7">
          <td>RF自动化分数</td>
          <td>bug基准分/3</td>
          <td>按照单天的效率折算，在积分和资质通用</td>
        </tr>
        <tr class="x8">
          <td>灰盒自动化分数</td>
          <td>为RF自动化的3/4</td>
          <td>单天效率，RF脚本开发3个，灰盒脚本开发4个</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.integral-rules-base {
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
