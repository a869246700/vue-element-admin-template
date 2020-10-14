<template>
  <div class="integral-rules-maintenance">
    <table width="auto" class="table">
      <tbody>
        <tr class="x1">
          <td>分类</td>
          <td>任务</td>
          <td>角色</td>
          <td>全年算法</td>
          <td>算法明细</td>
          <td colspan="6">算法明细</td>
          <td />
          <td />
        </tr>

        <tr class="x2">
          <td rowspan="20">维护入围绩效分</td>
          <td rowspan="9">故障维护组</td>
          <td rowspan="5">故障复现</td>
          <td rowspan="9">累加，分数除以15</td>
          <td>等级</td>
          <td>等级定义规则</td>
          <td>基础分</td>
          <td>疑难</td>
          <td>复现</td>
          <td>时效性</td>
          <td>最终分</td>
          <td />
          <td />
        </tr>

        <tr class="x3">
          <td>1</td>
          <td>故障在Csos/品控认定为一级</td>
          <td>10</td>
          <td>
            疑难故障*2.0
            <br>
            疑难定义：内存改写/无故复位/偶发性问题
          </td>
          <td>成功*1.0</td>
          <td>
            完成*1.0（等级1时效性3天、等级2时效性5天、
            <br>
            等级3时效性10天、等级4时效性15天）
          </td>
          <td>故障基础分*疑难*复现*时效性+维护版本基础分*时效性-故障反馈</td>
          <td />
          <td />
        </tr>

        <tr class="x4">
          <td>2</td>
          <td>
            1、故障在Csos/品控认定为二级
            <br>
            2、拦截故障属于DCN项目认定为二级
          </td>
          <td>5</td>
          <td>非疑难故障*1.0</td>
          <td>失败*0.5</td>
          <td>
            未完成*0.5（等级1时效性3天、等级2时效性5天、
            <br>
            等级3时效性10天、等级4时效性15天）
          </td>
          <td>故障基础分*疑难*复现*时效性+维护版本基础分*时效性-故障反馈</td>
          <td />
          <td />
        </tr>

        <tr class="x5">
          <td>3</td>
          <td>
            1、故障在Csos/品控认定为三级
            <br>
            2、拦截故障属于非DCN项目、非需求类认定为三级
          </td>
          <td>3</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x6">
          <td>4</td>
          <td>拦截故障属于需求类认定为四级</td>
          <td>1</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x7">
          <td rowspan="4">维护版本</td>
          <td>等级</td>
          <td>等级定义规则</td>
          <td>基础分</td>
          <td>时效性</td>
          <td>故障反馈</td>
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x8">
          <td>1</td>
          <td>事业部点名或者客户点名版本</td>
          <td>10</td>
          <td>
            等级1达成*1.2
            <br>
            等级2、3达成*1.0
            <br>
            （等级1时效性2天、等级2时效性4天、等级3时效性15天）
          </td>
          <td>一级：市场故障1级，扣5分</td>
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x9">
          <td>2</td>
          <td>DCN/无线/SW非严重问题</td>
          <td>5</td>
          <td>
            等级1达成*0.8
            <br>
            等级2、3达成*0.5
            <br>
            （等级1时效性2天、等级2时效性4天、等级3时效性15天）
          </td>
          <td>二级：市场故障2级、事业部故障扣3分</td>
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x10">
          <td>3</td>
          <td>非紧急/非头部客户</td>
          <td>3</td>
          <td />
          <td>三级：市场故障3级、事业部投诉扣1分</td>
          <td />
          <td>1000</td>
          <td />
          <td />
        </tr>

        <tr class="x11">
          <td rowspan="7">蓝军测试组</td>
          <td rowspan="4">对标测试</td>
          <td rowspan="7">累加，全年除以10</td>
          <td>等级</td>
          <td>等级定义规则</td>
          <td>基础分</td>
          <td>项目落地</td>
          <td>最终分</td>
          <td />
          <td>300</td>
          <td />
          <td />
        </tr>

        <tr class="x12">
          <td>1</td>
          <td>
            1、系统性的对标方案，导入项目落地，对比红军方
            <br>
            案提升30%~50%；
          </td>

          <td>10</td>
          <td>落地项目并达成等级需求*1.0</td>
          <td>(需求+对标+评审)基础分*项目落地</td>
          <td />
          <td>300</td>
          <td />
          <td />
        </tr>

        <tr class="x13">
          <td>2</td>
          <td>
            1、复杂规格性分析，针对实现和技术有详细的差距
            <br>
            分析，输出详细的对标测试方案；
          </td>

          <td>5</td>
          <td>只有对标产出*0.5</td>
          <td />
          <td />
          <td>100</td>
          <td />
          <td />
        </tr>

        <tr class="x14">
          <td>3</td>
          <td>1、简单规格/单一规格的对标，给出规格级的差距；</td>

          <td>0.5</td>
          <td />
          <td />
          <td />
          <td>15</td>
          <td />
          <td />
        </tr>

        <tr class="x15">
          <td rowspan="3">对标评审</td>
          <td>等级</td>
          <td>等级定义规则</td>
          <td>基础分</td>
          <td>项目落地</td>
          <td />
          <td />
          <td>10</td>
          <td />
          <td />
        </tr>

        <tr class="x16">
          <td>1</td>
          <td>对标技术文档评审[开发认可]</td>
          <td>0.2</td>
          <td>落地项目并达成等级需求*1.0</td>
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x17">
          <td>2</td>
          <td>需求导入评审</td>
          <td>0.05</td>
          <td>只有对标产出*0.5</td>
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x18">
          <td rowspan="4">入围测试组</td>
          <td rowspan="4">客户入围</td>
          <td rowspan="4">累加，全年除以10</td>
          <td>角色</td>
          <td>
            入围需求导入
            <br>
            项目需求导入，目标测算今年需求需导入1000项，每
            <br>
            项需求导入0.008分
          </td>
          <td>
            入围TP设计
            <br>
            TP用例输出测算目标300个用例，每个用例0.04分；
            <br>
            评审折算规则=1脚本：10评审
          </td>
          <td>
            入围自动化
            <br>
            自动化脚本测算目标100个，每个脚本0.04分；
            <br>
            1脚本=3key
          </td>
          <td>
            入围基础执行
            <br>
            自动化轮次目标测算20轮，每轮次0.2分
          </td>
          <td>
            入围演练
            <br>
            入围用例块测算总块数10块，每块分数0.8分
          </td>
          <td>责任系数</td>
          <td>项目结果分（pass 1.1 fail 0.7）</td>
          <td>最终分</td>
        </tr>

        <tr class="x19">
          <td>入围负责</td>
          <td>8</td>
          <td>12</td>
          <td />
          <td />
          <td />
          <td>2</td>
          <td>√</td>
          <td>过程分*责任系数分*项目结果分</td>
        </tr>

        <tr class="x20">
          <td>入围支撑</td>
          <td>8</td>
          <td>12</td>
          <td>4</td>
          <td>4</td>
          <td>8</td>
          <td>1.2</td>
          <td>×</td>
          <td>过程分*责任系数分</td>
        </tr>

        <tr class="x21">
          <td>内部测试</td>
          <td>8</td>
          <td>12</td>
          <td>4</td>
          <td>4</td>
          <td>8</td>
          <td>1</td>
          <td>×</td>
          <td>过程分*责任系数分</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.integral-rules-maintenance {
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
