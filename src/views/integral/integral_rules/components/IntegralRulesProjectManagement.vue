<template>
  <div class="integral-rules-project-management">
    <table width="auto" class="table">
      <tbody>
        <tr class="x1">
          <td rowspan="3">角色</td>
          <td rowspan="3">基准分</td>
          <td colspan="9">目标达成积分</td>
          <td colspan="3">基线效率积分</td>
        </tr>

        <tr class="x2">
          <td>外部市场目标（10%）</td>
          <td>项目版本对事业部版本承诺</td>
          <td>试点发布偏差(从项目转测试通过算起)</td>
          <td colspan="5">质量</td>
          <td rowspan="2">效率管理</td>
          <td colspan="3">同比基线提升</td>
        </tr>

        <tr class="x3">
          <td />
          <td />
          <td />
          <td>工作包内测质量（准入+内测）10%</td>
          <td>遗留缺陷目标（准入+内测）</td>
          <td>
            遗漏率（含遗留BUG+工作包）
            <br>
            （平台首轮回归启动开始算，包含PJ项目中的遗漏）
            <br>
            事业部测试发现平台开发的BUG/当期项目代码量
          </td>
          <td>技术项目把控</td>
          <td>遗漏到下一个平台的缺陷</td>
          <td>进展</td>
          <td>质量</td>
          <td>效率</td>
        </tr>

        <tr class="x4">
          <td>PTM</td>
          <td>全项目积分*0.1</td>
          <td>达成目标积分加15%，未达成扣10%</td>
          <td>达成/未达成，加减总积分5%</td>
          <td>
            偏差率小于10%，积分加10%；
            <br>
            偏差率小于15%，积分加5%；
            <br>
            偏差大于30%，积分减5%；
          </td>
          <td>达标，积分加10%，未达标，偏差20%，扣积分的5%</td>
          <td>达标，积分加10%，未达标，偏差20%，扣积分的5%</td>
          <td>
            达标，积分加10%
            <br>
            和目标偏差20%，积分加减5%
            <br>
            和目标偏差80%，积分加减10%
          </td>
          <td />
          <td>和目标偏差20%，积分加减5%</td>
          <td>
            偏差率＜=5%，积分加5%
            <br>
            偏差率＜=15%，积分加10%
            <br>
            偏差率＞=25%，积分扣10%
          </td>
          <td>
            进展周期偏差率同比基线提升20%，积分加5%
            <br>
            同比基线提升40%，积分加10%
          </td>
          <td>
            遗漏同比基线提升20%，积分加5%
            <br>
            遗漏同比基线提升40%，积分加10%
          </td>
          <td>
            成本效率同比基线提升20%，积分加5%
            <br>
            同比基线提升40%，积分加10%
          </td>
        </tr>

        <tr class="x5">
          <td>PTGTTL</td>
          <td>全项目积分*0.05</td>
          <td>达成目标积分加10%，未达成扣5%</td>
          <td />
          <td />
          <td>达标，积分加15%，未达标，偏差20%，扣积分的10%</td>
          <td>达标，积分加10%，未达标，偏差20%，扣积分的10%</td>
          <td>
            达标，积分加10%
            <br>
            和目标偏差20%，积分加减5%
            <br>
            和目标偏差80%，积分加减10%
          </td>
          <td>达成，积分加10%，未达成，积分扣5%</td>
          <td>和目标偏差20%，积分加减5%</td>
          <td />
          <td />
          <td>
            遗漏同比基线提升20%，积分加5%
            <br>
            遗漏同比基线提升40%，积分加10%
          </td>
          <td />
        </tr>

        <tr class="x6">
          <td>PTTL</td>
          <td>全项目积分*0.03</td>
          <td />
          <td />
          <td>
            偏差率小于10%，积分加10%；
            <br>
            偏差率小于15%，积分加5%；
            <br>
            偏差大于30%，积分减5%；
          </td>
          <td>达标，积分加10%，未达标，偏差20%，扣积分的5%</td>
          <td />
          <td />
          <td />
          <td />
          <td>
            偏差率＜±5%，积分加5%
            <br>
            偏差率＜±15%，积分加10%
            <br>
            偏差率＞±25%，积分扣10%
          </td>
          <td>
            进展周期偏差率同比基线提升20%，积分加5%
            <br>
            同比基线提升40%，积分加10%
          </td>
          <td />
          <td>
            成本效率同比基线提升20%，积分加5%
            <br>
            同比基线提升40%，积分加10%
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.integral-rules-project-management {
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
