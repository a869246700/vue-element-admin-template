<template>
  <div class="integral-rules-project-management-ptm">
    <table width="auto" class="table">
      <tbody>
        <tr class="x1">
          <td>PTM难度系数</td>
          <td />
          <td />
          <td />
          <td />
        </tr>

        <tr class="x2">
          <td>项目类型</td>
          <td>项目类型难度系数</td>
          <td>主干/组件属性系数</td>
          <td>PTM难度系数</td>
          <td>备注</td>
        </tr>

        <tr class="x3">
          <td>预研&原型</td>
          <td>0.3</td>
          <td rowspan="9">
            主干为1，组件项目代码量大
            <br>
            于50K，取1，小于50为0.5
          </td>
          <td rowspan="9">目类型难度系数*主干/组件属性系数</td>
          <td />
        </tr>

        <tr class="x3">
          <td>补丁项目</td>
          <td>0.2</td>
          <td />
        </tr>

        <tr class="x4">
          <td>定制项目</td>
          <td>0.5</td>
          <td />
        </tr>

        <tr class="x5">
          <td>新功能项目</td>
          <td>0.8</td>
          <td>其中较大的新品项目为1.0--12.5PL1，12.4PL1，12.RPL1</td>
        </tr>

        <tr class="x6">
          <td>其他</td>
          <td>0</td>
          <td />
        </tr>

        <tr class="x7">
          <td>临时项目</td>
          <td>0.5</td>
          <td />
        </tr>

        <tr class="x8">
          <td>组件包/组件</td>
          <td>0.5</td>
          <td />
        </tr>

        <tr class="x9">
          <td>维护升级</td>
          <td>0.8</td>
          <td />
        </tr>

        <tr class="x10">
          <td>品控版本</td>
          <td>0</td>
          <td />
        </tr>
      </tbody>
    </table>

    <table width="auto" class="table" style="margin-top: 20px; width: auto;">
      <tbody>
        <tr class="x1">
          <td>PTGTTL难度系数</td>
          <td />
        </tr>

        <tr class="x2">
          <td>条件</td>
          <td>难度系数</td>
        </tr>

        <tr class="x3">
          <td>项目代码量＜5K</td>
          <td>0</td>
        </tr>

        <tr class="x4">
          <td>项目代码量【5K，10K】</td>
          <td>0.5</td>
        </tr>

        <tr class="x5">
          <td>项目代码量>5K</td>
          <td>1</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.integral-rules-project-management-ptm {
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
