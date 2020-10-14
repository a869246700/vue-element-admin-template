<template>
  <div class="integral-rules-score">
    <table width="auto" class="table">
      <tbody>
        <tr class="x1">
          <td rowspan="2" class="x1y1">绩效分</td>
          <td rowspan="2" class="x1y2">总分</td>
          <td rowspan="2" class="x1y3">岗位</td>
          <td rowspan="2" class="x1y4">算法说明</td>
          <td rowspan="2" class="x1y5">岗位分类</td>
          <td class="x1y6">项目积分</td>
          <td class="x1y7">项目管理积分</td>
          <td class="x1y8">系统支撑积分</td>
          <td colspan="3" class="x1y9">维护入围积分</td>
          <td colspan="2" class="x1y10">分管技术分</td>
          <td colspan="2" class="x1y11">人员满足度分</td>
          <td>备注</td>
        </tr>

        <tr class="x2">
          <td>项目分占比</td>
          <td>项目管理分值占比</td>
          <td>支撑岗分数</td>
          <td>维护/故障分占比</td>
          <td>蓝军分占比</td>
          <td>入围分占比</td>
          <td>分管绩效分占比</td>
          <td>直属绩效分占比</td>
          <td>分管人员项目满足度占比</td>
          <td>直属人员项目满足度占比</td>
          <td />
        </tr>

        <tr class="x3">
          <td>基础分</td>
          <td>50</td>
          <td>全员</td>
          <td>50*全年的百分比值，目前百分比暂取100%</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x4">
          <td>创新分</td>
          <td>6</td>
          <td>全员</td>
          <td>提供数据导入，直接加入</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x5">
          <td>组织贡献分</td>
          <td>4</td>
          <td>全员</td>
          <td>提供数据导入，直接加入</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x6">
          <td>额外加减分</td>
          <td>根据结果直接减扣</td>
          <td>全员</td>
          <td>提供数据导入，直接加减</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x7">
          <td rowspan="12">绩效分</td>
          <td rowspan="12">根据结果直接减扣</td>
          <td>工程岗</td>
          <td>(项目分+项目管理分)/15</td>
          <td>工程岗</td>
          <td colspan="2">100%（两个累加）</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x8">
          <td rowspan="3">项目管理</td>
          <td rowspan="3">(项目分+项目管理分)/15</td>
          <td>PTM</td>
          <td />
          <td>100%</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td>项目有产出，直接加上</td>
        </tr>

        <tr class="x9">
          <td>PTGTTL</td>
          <td />
          <td>100%</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td>项目有产出，直接加上</td>
        </tr>

        <tr class="x10">
          <td>PTTL</td>
          <td />
          <td>100%</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td>项目有产出，直接加上</td>
        </tr>

        <tr class="x11">
          <td>支撑岗</td>
          <td>40*百分比，百分比暂取60%</td>
          <td>支撑岗位</td>
          <td />
          <td />
          <td>100%</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td>项目有产出，直接加上</td>
        </tr>

        <tr class="x12">
          <td rowspan="3">维护入围</td>
          <td>0.1*(项目分+项目管理分)/15+0.9*(维护测试分+复现数）/10%</td>
          <td>维护测试</td>
          <td>10%</td>
          <td />
          <td />
          <td>90%</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x13">
          <td>蓝军分/10</td>
          <td>蓝军</td>
          <td />
          <td />
          <td />
          <td>100%</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x14">
          <td>0.1*(项目分+项目管理分)/15+0.9*入围分</td>
          <td>入围</td>
          <td>10%</td>
          <td />
          <td />
          <td />
          <td>90%</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x15">
          <td rowspan="3">管理岗</td>
          <td>
            0.5*(项目分+项目管理分)/15+0.2*直属的技术平均分（40分绩效分的平均分）+0.3*直属人员的满足度分，
            <br>
            但黄贝思的分数=0.5*入围分/15+0.2*直属的技术平均分（40分绩效分的平均分）+直属人员的满足度*12
          </td>
          <td>组长</td>
          <td colspan="2">50%（取平均值）</td>
          <td />
          <td />
          <td />
          <td>50%（仅个别特定人员）</td>
          <td />
          <td>20%</td>
          <td />
          <td>30%</td>
          <td />
        </tr>

        <tr class="x16">
          <td>分管人员的平均绩效分*0.2+直属人员的平均绩效分*0.3+分管人员满足度*8+直属人员满足度*12</td>
          <td>副经理</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td>20%</td>
          <td>30%</td>
          <td>20%</td>
          <td>30%</td>
          <td />
        </tr>

        <tr class="x16">
          <td>分管人员的平均绩效分*0.3+直属人员的平均绩效分*0.2+分管人员满足度*12+直属人员满足度*8</td>
          <td>经理</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td>30%</td>
          <td>20%</td>
          <td>30%</td>
          <td>20%</td>
          <td />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.integral-rules-score {
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
