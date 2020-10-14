<template>
  <div class="integral-rules-project">
    <table width="auto" class="table">
      <tbody>
        <tr class="x1">
          <td rowspan="22">
            项目积分--
            <br>
            三大类累加
          </td>
          <td rowspan="9">
            域/工作包归
            <br>
            属人的分数
          </td>
          <td rowspan="4">代码量（工作包/域）</td>
          <td colspan="6">基础分</td>
          <td colspan="12">加减分</td>
        </tr>

        <tr class="x2">
          <td rowspan="3">基准分</td>
          <td colspan="5">工序分</td>
          <td colspan="4">进度</td>
          <td colspan="6">质量</td>
          <td colspan="2">效率</td>
        </tr>

        <tr class="x3">
          <td colspan="3">工序标准分</td>
          <td rowspan="2">工序可加减比例</td>
          <td rowspan="2">得工序分标准</td>
          <td colspan="2">进度偏差</td>
          <td colspan="2">资源偏差</td>
          <td colspan="2">陷率</td>
          <td colspan="2">遗留率</td>
          <td colspan="2">组件项目遗漏率</td>
          <td colspan="2">效率</td>
        </tr>

        <tr class="x4">
          <td>评审</td>
          <td>设计</td>
          <td>执行</td>
          <td>正向</td>
          <td>负向</td>
          <td>正向</td>
          <td>负向</td>
          <td>正向</td>
          <td>负向</td>
          <td>正向</td>
          <td>负向</td>
          <td>正向</td>
          <td>负向</td>
          <td>正向</td>
          <td>负向</td>
        </tr>

        <tr class="x5">
          <td>小于1k</td>
          <td>5</td>
          <td>3</td>
          <td>2</td>
          <td>5</td>
          <td>100%</td>
          <td rowspan="5">
            评审和执行，产
            <br>
            出占比80%，得
            <br>
            全分数，少于80%
            <br>
            ，产出的百分比
            <br>
            *工序基准分
          </td>
          <td>设计/任务，每任务提前 1d加1分</td>
          <td>和正向相反</td>
          <td>设计/任务，每任务少投入1d加1分</td>
          <td>和正向相反</td>
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
          <td>大于1k且小于等于2k</td>
          <td>20</td>
          <td>5</td>
          <td>5</td>
          <td>10</td>
          <td>80%</td>
          <td>设计/任务，每任务提前 1d加1分</td>
          <td>和正向相反</td>
          <td>设计/任务，每任务少投入1d加1分</td>
          <td>和正向相反</td>
          <td>
            超标100%，每工作包加3分。
            <br>
            （评审和bug缺陷分开计算，
            <br>
            评审分值为bug执行的一半）
          </td>
          <td>和正向相反</td>
          <td />
          <td>遗漏率超标扣5分</td>
          <td />
          <td>遗漏率超标扣5分</td>
          <td>
            评审，设计，执行等关键工序，
            <br>
            效率超过基准的20%，
            <br>
            加分2分，超过50%，加3分。
          </td>
          <td>和正向相反</td>
        </tr>

        <tr class="x7">
          <td>大于2k且小于等于5k</td>
          <td>50</td>
          <td>10</td>
          <td>15</td>
          <td>25</td>
          <td>80%</td>
          <td>设计/任务，每任务提前 1d加2分</td>
          <td>和正向相反</td>
          <td>设计/任务，每任务少投入1d加2分</td>
          <td>和正向相反</td>
          <td>
            缺陷率超标，
            <br>
            超过30%，每工作包加3分，
            <br>
            超标50%，每工作包加5分，
            <br>
            超标100%，每个工作包加20分
            <br>
            （评审和bug缺陷分开计算，
            <br>
            评审分值为bug执行的一半）
          </td>
          <td>和正向相反</td>
          <td />
          <td>遗漏率超标扣10分</td>
          <td />
          <td>遗漏率超标扣10分</td>
          <td>
            评审，设计，执行等关键工序，
            <br>
            效率超过基准的20%，
            <br>
            加分5分，超过50%，加10分。
          </td>
          <td>和正向相反</td>
        </tr>

        <tr class="x8">
          <td>大于5k且小于10k</td>
          <td>100</td>
          <td>25</td>
          <td>25</td>
          <td>100</td>
          <td>70%</td>
          <td>设计/任务，每任务提前 1d加3分</td>
          <td>和正向相反</td>
          <td>设计/任务，每任务少投入1d加3分</td>
          <td>和正向相反</td>
          <td>
            缺陷率超标，
            <br>
            超过10%以上，每工作包加5分，
            <br>
            超过30%，每工作包加10分，
            <br>
            超标50%，每工作包加30分。
            <br>
            （评审和bug缺陷分开计算，
            <br>
            评审分值为bug执行的一半）
          </td>
          <td>和正向相反</td>
          <td />
          <td>遗漏率超标扣15分</td>
          <td />
          <td>遗漏率超标扣15分</td>
          <td>
            评审，设计，执行等关键工序，
            <br>
            效率超过基准的20%，
            <br>
            加分10分，超过50%，加20分。
          </td>
          <td>和正向相反</td>
        </tr>

        <tr class="x9">
          <td>大于10k</td>
          <td>250</td>
          <td>80</td>
          <td>100</td>
          <td>120</td>
          <td>60%</td>
          <td>设计/任务，每任务提前 1d加5分</td>
          <td>和正向相反</td>
          <td>设计/任务，每任务少投入1d加5分</td>
          <td>和正向相反</td>
          <td>
            缺陷率超标，
            <br>
            超过10%以上，每工作包加10分，
            <br>
            超过30%，每工作包加20分，
            <br>
            超标50%，每工作包加50分。
            <br>
            （评审和bug缺陷分开计算，
            <br>
            评审分值为bug执行的一半）
          </td>
          <td>和正向相反</td>
          <td />
          <td>遗漏率超标扣20分</td>
          <td />
          <td>遗漏率超标扣30分</td>
          <td>
            评审，设计，执行等关键工序，
            <br>
            效率超过基准的20%，
            <br>
            加分15分，超过50%，加30分。
          </td>
          <td>和正向相反</td>
        </tr>

        <tr class="x10">
          <td rowspan="7">零散投入分数 （非自动化）</td>
          <td>子项</td>
          <td>70</td>
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
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x11">
          <td>工序基准分算法</td>
          <td>
            设计/试行/评审的基准分=单项目所有的设
            <br>
            计/执行/评审的分数除以个数（bug分进行
            <br>
            折算规则为：严重设置为3，一般设置为1，
            <br>
            微小设置为0.2 ，用例的折算规则为：非功
            <br>
            能用例=2个功能用例，评审不区分严重性）
          </td>
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
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x12">
          <td>基准分选择</td>
          <td>
            1.通用的基准分选择：评审分值--0.5
            <br>
            bug分值--1：设计用例分值--0.25
            <br>
            2.各项目的基准分算法为：
            <br>
            1）组件项目，如果本项目的设计/执行/评
            <br>
            审的基准分＜通用的基准分，设计/试行/评
            <br>
            审的基准分保持不变
            <br>
            2）非组件项目
            <br>
            本项目的设计/执行/评审的基准分在【0.1
            <br>
            通用基准分，1.5倍通用基准分】，设计/试
            <br>
            行/评审的基准分保持不变，否则替换为设
            <br>
            计/试行/评审的基准分=通用基准分
          </td>
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
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x13">
          <td>评审分数</td>
          <td>评审个数*评审基准分</td>
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
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x14">
          <td>设计分数</td>
          <td>设计个数（以功能用例为准）*设计基准分</td>
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
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x15">
          <td>执行分数</td>
          <td>
            BUG折算个数（严重性，复现率等折算）*
            <br>
            BUG基准分
          </td>
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
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x16">
          <td>总分</td>
          <td>评审分数+设计分数+执行分数</td>
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
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x17">
          <td rowspan="6">自动化分数</td>
          <td>子项</td>
          <td>算法</td>
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
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x18">
          <td>基准分</td>
          <td>通用的1个bug分数来折算</td>
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
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x19">
          <td>自动化开发</td>
          <td>
            1bug分=3RF脚本开发=3API开发=4个灰盒
            <br>
            脚本开发=9个key开发
          </td>
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
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x20">
          <td>自动化执行</td>
          <td>1BUG分=60个fail</td>
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
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x21">
          <td>自动化维护</td>
          <td>1BUG分=10个自动化bug</td>
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
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x22">
          <td>总分</td>
          <td>
            自动化开发分数+自动化执行分数+自动化
            <br>
            维护分数
          </td>
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
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.integral-rules-project {
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
