<template>
  <el-card style="margin: 20px; font-size: 14px;">
    <el-row>
      <el-col :span="10">
        <span>路由：</span>
        <el-cascader
          ref="cascaderRef"
          :options="routerList"
          :props="{ checkStrictly: true, label: 'title' }"
          :show-all-levels="false"
          placeholder
          size="small"
          style="width: 200px;"
          @change="handleRouterChange"
        />
      </el-col>
    </el-row>

    <el-tabs
      v-model="active"
      type="card"
      closable
      style="margin-top: 20px;"
      @tab-remove="handleRemoveTabClick"
    >
      <el-tab-pane v-for="item in panes" :key="item.key" :label="item.title" :name="item.key">
        <div v-html="word(item.content)" />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import request from '@/services/request'

export default {
  name: 'SystemHelp',
  filters: {
    wordFilter(content) {
      console.log(content)
      switch (content) {
        case 'cardContent':
          return `<div>
              <p>1. 点击上方路由选择框</p>
              <p>2. 选择需要查询帮助的页面</p>
            </div>`
      }
    }
  },
  data() {
    return {
      routerList: undefined,
      routerIds: [
        24,
        27,
        29,
        40,
        46,
        49,
        65,
        66,
        20,
        25,
        34,
        30,
        61,
        19,
        35,
        42,
        36,
        37,
        43,
        48,
        53,
        50,
        39,
        68,
        47,
        45,
        62,
        67,
        70,
        72,
        73,
        74,
        77,
        78,
        81,
        84,
        89,
        90,
        91,
        93,
        94,
        95
      ],
      active: 'help0',
      panes: [
        {
          title: '系统帮助',
          key: 'help0',
          content: 'cardContent'
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getRouterSelect()
    },
    word(content) {
      switch (content) {
        case 'cardContent':
          return `<div><p>1. 点击上方路由选择框</p><p>2. 选择需要查询帮助的页面</p></div>`
        case 'cardContent0':
          return `<div><p>该页面过于简单暂未有帮助说明</p></div>`
        case 'cardContent24':
          return `<div><p>说明：</p><p>1. 该页面数据均从测试管理平台取值（实时取值）</p><p>2. 根据测试管理平台的子系统关联本系统二级域，能关联上则显示二级域，关联不上二级域显示为空</p></div>`
        case 'cardContent27':
          return `<div><p>说明：</p><p>1. 根据项目里程碑、项目工作包代码量、二级域每千行代码量需人日，计算未来预计需要多少人日</p><p>2. 项目里程碑来自【项目基础信息-项目阶段月份列表】录入</p><p>3. 项目工作包代码量来自PMS系统工作包（每天凌晨1点半更新），工作包对应二级域可在【项目基础信息-项目工作包二级域列表】修改</p><p>4. 二级域每千行代码量需人日来自excel统计，可在【项目基础信息-基础数据导出】页面第一行第4个按钮（导出二级域千行代码资源投入列表）导出，暂无可修改的页面</p></div>`
        case 'cardContent29':
          return `<div><p>说明：</p><p>1. 代码量来自PMS系统工作包（每天凌晨1点半更新），工作包对应二级域可在【项目基础信息-项目工作包二级域列表】修改</p><p>2. 月份根据项目里程碑【项目基础信息-项目阶段月份列表】结束时间的当月得来</p></div>`
        case 'cardContent40':
          return `<div><p>说明：</p><p>1. 浪费资源以 “【浪费” 和 “浪费” 开头为格式统计</p><p>2. 表格最后一列的浪费资源单位为小时</p><p>3. 数据为资源统计同步得来（每天凌晨零点30分同步数据）</p></div>`
        case 'cardContent46':
          return `<div><p>说明：</p><p>1. 根据项目工作包代码量，bug数，按月计算遗漏率</p><p>2. 项目计算遗漏率的时间点可在【项目过程信息-项目遗漏率统计】查看，目前没有可修改的地方</p><p>3. 项目工作包代码量来自PMS系统工作包（每天凌晨1点半更新），工作包对应二级域可在【项目基础信息-项目工作包二级域列表】修改。根据项目计算遗漏率的时间点累计部门代码量</p><p>4. bug来自bug系统（每天凌晨零点30分同步数据），根据项目计算遗漏率的时间点，bug的提交时间，按月统计bug数</p><p>5. bug数和代码量每月是累计的</p><p>6. 遗漏率=bug数/代码量</p></div>`
        case 'cardContent49':
          return `<div><p>说明：</p><p>1. 根据项目工作包代码量，bug数，统计遗漏率</p><p>2. 项目工作包代码量来自PMS系统工作包（每天凌晨1点半更新），工作包对应二级域可在【项目基础信息-项目工作包二级域列表】修改。</p><p>3. 算法：计算遗漏时间点后提交的bug，且工作包归属是平台，且提交人是事业部的测试人员</p><p>4. bug来自bug系统（每天凌晨零点30分同步数据），根据工作包名称，分总计遗漏bug数（所有工作包，包括工作包为空的）、遗漏bug数（去掉工作包为空的）、去掉遗留bug的bug数（去掉工作包为空和工作包名称为遗留或delay的bug(其他)的）、事业部提交bug数（遗留）和事业部提交bug数（不含遗留）是全周期的</p><p>5. 遗漏率=bug数/代码量</p></div>`
        case 'cardContent65':
          return `<div><p>说明：</p><p>1. 根据研究院平台测试各部门项目资源投入统计，单位为人日</p><p>2. 部门由平台测试一部到平台测试五部，其中平台测试一部分为：路由测试组、领域测试&架构测试组、维护测试&客户测试&蓝军测试组；平台测试五部分为：自动化运维组、自动化支撑组分别统计</p><p>3. 统计出的项目周资源大于3人日，月资源大于5人日</p><p>4. 可按月和周分别查询。资源投入为总计投入，包含加班时间，资源每天凌晨0点30分刷新</p></div>`
        case 'cardContent66':
          return `<div><p>说明：</p><p>1. 根据研究院平台测试各部门分类资源投入统计，单位为人日</p><p>2. 部门由平台测试一部到平台测试五部，其中平台测试一部分为：路由测试组、领域测试&架构测试组、维护测试&客户测试&蓝军测试组；平台测试五部分为：自动化运维组、自动化支撑组分别统计</p><p>3. 分类分为：项目、市场、测试改进、其他。是根据资源类型来确认的分类，可在项目基础信息-基础数据导出中导出资源映射规则列表查看</p><p>4. 可按月和周分别查询。资源投入为总计投入，包含加班时间，资源每天凌晨0点30分刷新</p></div>`
        case 'cardContent20':
          return `<div><p>说明：</p><p>1. 第一个表格（项目汇总表格），资源投入单位均为人日</p><p>1.1. 项目和里程碑在【项目基础信息-项目基础信息列表】中增加删除，修改暂未实现。周期是根据里程碑时间段计算得出（只去掉了周六周日，与实际工作日有偏差） </p><p>1.2. 投入目标到试点是根据项目各专业分类加和得来，目标比值为固定【1:6.2:5:3:2:0.3】，实际比值根据各阶段资源投入占比总计资源投入算出，具体算法如下： </p><p>1.3. 实际比值 = 需求投入资源/(投入目标/目标比值加和) : 设计投入资源/(投入目标/目标比值加和) : 准入投入资源/(投入目标/目标比值加和)... </p><p>2. 第二个表格（各专业分类统计表格），资源投入单位均为人日</p><p>2.1. 项目名称，专业分类，代码量，效率目标可在【项目基础信息-项目基础信息列表】中增加删除，修改暂未实现。目前修改可以先删除再新增实现。</p><p>2.2. 投入目标=代码量*效率目标</p><p>2.3. 总投入为包含加班的投入，正常投入为不包含加班的投入，投入占比=资源投入/投入目标</p><p>2.4. 各阶段投入，计划值为根据目标比值和投入目标算出该阶段计划投入人日（需求计划值=需求目标比值/目标比值加和*投入目标），实际值为根据里程碑计算专业分类各资源投入</p><p>2.5. 缺陷密度=bug数/代码量。有效的缺陷密度是bug提交人是该专业分类，并且bug的工作包也是该专业分类，全部缺陷密度为bug提交人是该专业分类就行了。个数是bug数，会有小数点的情况，是因为bug的工作包，可能归属多个专业分类，平均分。</p><p>2.6. 全周期为项目里程碑需求启动时间到试点结束时间，如果时间为空，取当前时间，内测时间只是里程碑测试启动时间到回归启动时间</p><p>2.7. 各专业分类实际比值同1.3</p><p>3. 资源和bug数据每天凌晨零点30分同步</p></div>`
        case 'cardContent25':
          return ` <div><p>说明：</p><p>1. 数据主要来自测试管理平台，除了遗漏率数据，遗漏数据是根据工作包对应到二级域算出的遗漏率，具体算法为二级域所有工作包的bug数/二级域所有工作包的代码量</p><p>2. 测试管理平台的数据有很多并不能对应到二级域上，有些数据有合并统计</p><p>3. 具体分数计算公式如下：</p><p>&nbsp;&nbsp;自动化率分数：如果实际值&gt;=目标值，则为10分；如果实际值&lt;目标值，则=实际值/目标值*10分</p><p>&nbsp;&nbsp;覆盖率分数：如果实际值&gt;=目标值，则为10分；如果实际值&lt;目标值，则=实际值/目标值*10分 </p><p>&nbsp;&nbsp;遗漏率分数：如果实际值&lt;=目标值，则为10分；如果实际值&gt;目标值，则=目标值/实际值*10分 </p><p>&nbsp;&nbsp;SDV-F分数：如果实际值&lt;=目标值，则=实际值/目标值*10分；如果实际值&gt;目标值，则=目标值/实际值*10分 *10/12；之所以要*10/12是鼓励：友商的每K用例数*0.8小于我们的每K用例数小于等于友商的每K用例数，下同；</p><p>&nbsp;&nbsp;SDV-P分数：如果实际值&lt;=目标值，则=实际值/目标值*10分；如果实际值&gt;目标值，则=目标值/实际值*10分 *10/12；</p><p>&nbsp;&nbsp;SIT分数：如果实际值&lt;=目标值，则=实际值/目标值*10分；如果实际值&gt;目标值，则=目标值/实际值*10分 *10/12；</p><p>&nbsp;&nbsp;总分：(自动化率分数+覆盖率分数+遗漏率分数+(SDV-F分数+SDV-P分数+SIT分数)/3)/4</p><p>4. 测试管理平台的数据每天早上6点同步</p></div>`
        case 'cardContent34':
          return `<div><p>说明：</p><p>1. 根据【项目结果信息-工程力专业域数据】页面分数统计排序</p><p>2. 可按照升序和降序查询</p><p>3. 测试管理平台的数据每天早上6点同步</p></div>`
        case 'cardContent30':
          return `<div><p>说明：</p><p>1. 根据【项目基础信息-项目阶段月份列表】、【项目过程信息-项目需求资源统计】、【项目过程信息-二级域人员技能统计】页面合并统计月份缺少资源投入数</p><p>2. 具体是根据项目工作包关联二级域算出代码量，再根据【项目基础信息-基础数据导出】中导出二级域千行代码资源投入列表和项目阶段里程碑算出是否缺少资源投入</p><p>3. 具体定位到哪月是根据项目阶段月份结束时间的当月来计算</p><p>4. 项目里程碑脚本结束时间要大于当天时间才能统计出</p></div>`
        case 'cardContent61':
          return `<div><p>说明：</p><p>1. 默认查询12.2PL1项目</p><p>2. 阶段bug实际值：根据各专业分类提交的bug统计，有分不包含工作包为【遗留或delay的bug(其他)】</p><p>3. 阶段bug计划值：</p><p>&nbsp;不包含遗留：</p><p>&nbsp;&nbsp;准入：PD-组件域=代码量*3&nbsp;&nbsp;其他专业分类=代码量*1</p><p>&nbsp;&nbsp;内测：PD-组件域=代码量*3.6*0.95&nbsp;&nbsp;其他专业分类=代码量*1.6*0.95</p><p>&nbsp;&nbsp;回归：PD-组件域=代码量*3.6*0.05&nbsp;&nbsp;其他专业分类=代码量*1.6*0.05</p><p>&nbsp;包含遗留：</p><p>&nbsp;&nbsp;准入：PD-组件域=代码量*3*1.4&nbsp;&nbsp;其他专业分类=代码量*1*1.4</p><p>&nbsp;&nbsp;内测：PD-组件域=代码量*3.6*0.95*1.4&nbsp;&nbsp;其他专业分类=代码量*1.6*0.95*1.4</p><p>&nbsp;&nbsp;回归：PD-组件域=代码量*3.6*0.05*1.4&nbsp;&nbsp;其他专业分类=代码量*1.6*0.05*1.4</p><p>&nbsp;其中12.2PL2项目比较特殊：</p><p>&nbsp;不包含遗留：</p><p>&nbsp;&nbsp;准入：非X86-AC=代码量*3*0.75&nbsp;&nbsp;其他专业分类=代码量*1*0.75</p><p>&nbsp;&nbsp;内测：非X86-AC=代码量*3*0.95&nbsp;&nbsp;其他专业分类=代码量*1*0.95</p><p>&nbsp;&nbsp;回归：非X86-AC=代码量*3*0.05&nbsp;&nbsp;其他专业分类=代码量*1*0.05</p><p>&nbsp;包含遗留：</p><p>&nbsp;&nbsp;准入：非X86-AC=代码量*3*1.4*0.75&nbsp;&nbsp;其他专业分类=代码量*1*1.4*0.75</p><p>&nbsp;&nbsp;内测：非X86-AC=代码量*3*0.95*1.4&nbsp;&nbsp;其他专业分类=代码量*1*0.95*1.4</p><p>&nbsp;&nbsp;回归：非X86-AC=代码量*3*0.05*1.4&nbsp;&nbsp;其他专业分类=代码量*1*0.05*1.4</p><p>4. 阶段资源实际值：根据各专业分类人员填写的资源统计</p><p>5. 阶段资源计划值：根据各专业分类的目标比值计算得出（例：需求计划值=需求目标比值/目标比值加和*投入目标），这个和【项目结果信息-项目效率统计】页面第二个列表中的阶段计划值算法相同</p><p>6. bug计算阶段时间：准入阶段是需求到内测前；内测阶段是需求到回归前；回归阶段是回归到试点前。也就是说准入和内测是累计的，回归是本身阶段的</p><p>7. 资源计算阶段时间：需求阶段是需求到设计前；设计阶段是需求到准入前；准入阶段是需求到内测前；内测阶段是需求到回归前；回归阶段是需求到试点前；试点阶段是需求到试点结束。也就是说资源的统计各阶段都是累计的</p></div>`
        case 'cardContent77':
          return `
            <div>
              <p>说明：</p>
              <p>1. 根据【项目基础信息-项目基础信息列表】项目里程碑计算bug数和资源投入</p>
              <p>2. 缺陷率=bug数/代码量；千行代码量投入=资源投入/代码量</p>
              <p>3. 内测前缺陷率、回归前缺陷率为累计bug数，回归缺陷率只为回归阶段bug数。</p>
              <p>4. 可根据项目查询具体专业分类缺陷率和千行代码量投入。</p>
            </div>
            `
        case 'cardContent78':
          return `
            <div>
              <p>说明：</p>
              <p>1. 根据【项目基础信息-项目基础信息列表】项目里程碑计算bug数和资源投入</p>
              <p>2. 缺陷率=bug数/代码量；千行代码量投入=资源投入/代码量</p>
              <p>3. 内测前缺陷率、回归前缺陷率为累计bug数，回归缺陷率只为回归阶段bug数。</p>
              <p>4. 可根据专业分类查询具体项目缺陷率和千行代码量投入。</p>
            </div>
          `
        case 'cardContent81':
          return `
            <div>
              <p>说明：</p>
              <p>1. 根据文档类型分为：需求类、设计类、测试文档类、开发集成类</p>
              <p>2. 代码量来自【项目基础信息-项目基础信息列表】，没有录入则来自PMS</p>
              <p>3. 缺陷率=个数/代码量。</p>
            </div>
          `
        case 'cardContent19':
          return `
            <div>
              <p>说明：</p>
              <p>1. 根据周期查询事业部统计资源，可根据月和周查询</p>
              <p>2. 该资源统计只统计测试人员的数据</p>
              <p>3. 有效性Y、N和其他规则资源数据都属于3大类（测试改进、项目、市场）</p>
              <p>4. 全部资源是所有测试人员的统计</p>
            </div>
          `
        case 'cardContent35':
          return `
            <div>
              <p>说明：</p>
              <p>1. 根据人员等级和资源等级统计各事业部初中高资源</p>
              <p>2. 每行前面有个加号可以点开查看详细数据</p>
            </div>
          `
        case 'cardContent42':
          return `
            <div>
              <p>说明：</p>
              <p>1. 根据人员等级和资源等级统计各事业部初中高资源</p>
              <p>2. 会按照人员等级分类排序，初阶任务不超过80%的，中阶任务不超过60%的，高阶任务不超过40%的会标红，表示没有达标。</p>
            </div>
          `
        case 'cardContent36':
          return `
            <div>
              <p>说明：</p>
              <p>1. 页面查询条件，项目名称、按需查询年月是查询第一个图表的。周是查询后2个图表的，根据选择的周数量，变化查询周期。</p>
              <p>2. 第一个图表，项目资源投入趋势图是根据各专业分类在当月或当周的资源统计。标准值=各专业分类的目标比值计算得出（例：需求计划值=需求目标比值/目标比值加和*投入目标），再均分给每月或每周。鼠标移动到图上，括号里的数据是各专业分类标准值</p>
              <p>3. 第二个图表，项目资源投入趋势图（累加）是项目全周期的资源统计，累计而成。可根据查询周数量，变化横坐标周期。鼠标移动到图上，括号里的值为资源占总计资源的百分比。</p>
              <p>4. 第三个图表，项目bug数趋势图是项目全周期的bug统计。可根据查询周数量，变化横坐标周期</p>
            </div>
          `
        case 'cardContent37':
          return `
            <div>
              <p>说明：</p>
              <p>1. 根据专业分类统计人员项目资源投入。默认查询PTM/TSE专业分类。</p>
              <p>2. 第一个列表，根据各专业分类统计投入项目资源。人数根据各项目汇总人家来统计，可通过【页面-待开发】来调整人员，周期为当月或当年工作日，标准资源是人数*周期，浪费资源根据【项目过程信息-资源浪费列表】页面数据汇总得来。</p>
              <p>3. 第二个图表，根据专业分类查询各项目资源投入</p>
              <p>4. 第三个列表，根据专业分类查询各人员投入项目数据</p>
              <p>4. 第四个列表，根据专业分类查询各人员投入项目详细数据</p>
            </div>
          `
        case 'cardContent43':
          return `
            <div>
              <p>说明：</p>
              <p>1. 根据人员提交CAF统计人员提交各类文档个数，只算提交时间在2019年1月1日以后的。每天早上6点40同步数据</p>
              <p>2. 各文档分类根据提交文件名区分。具体如下：</p>
              <p>&nbsp;&nbsp;STP:文件名包含：【STP.】、【-STP.】、【_STP.】、【-STP-PI.】</p>
              <p>&nbsp;&nbsp;测试报告:文件名包含：【试点报告】、【验证报告】、【测试报告】、【验收报告】、【核实报告】</p>
              <p>&nbsp;&nbsp;测试方案:文件名包含：【-TP.】、【_TP.】、【-TP-】、【-TP_】、【测试方案】</p>
              <p>&nbsp;&nbsp;测试用例:文件名包含：【-TS.】、【-TSPS.】</p>
              <p>&nbsp;&nbsp;测试计划:文件名包含：【-plan】、【计划】</p>
              <p>&nbsp;&nbsp;验收方案:文件名包含：【验收方案】</p>
            </div>
          `
        case 'cardContent48':
          return `
            <div>
              <p>说明：</p>
              <p>1. 根据高阶人员且还是测试工程师来统计资源投入，单位：人日。每天凌晨5点同步资源数据。</p>
              <p>2. 总计资源：所有填入资源统计的数据合计；总计分类资源：能关联到工序的资源合计。如果这2个资源合计数值不一样，总计分类资源列数据会标红。也就是这个人有异常数据未关联到工序。如果是本周数据，可以在【资源信息-本周资源异常数据列表】页面查看具体数据。</p>
            </div>
          `
        case 'cardContent53':
          return `
            <div>
              <p>说明：</p>
              <p>1. 根据高阶人员且还是测试工程师来统计近4周的资源投入，单位：人日。每天凌晨5点同步资源数据。</p>
              <p>2. 当前选择周为查询框中周的选择，如果为空则默认本周。</p>
            </div>
          `
        case 'cardContent50':
          return `
            <div>
              <p>说明：</p>
              <p>1. 根据人员未关联到具体的工序查询出的数据为异常数据，只统计本周的异常数据。每天凌晨5点同步资源数据。</p>
              <p>2. 异常数据为：工作大类、项目阶段、项目工序未填全或匹配不到工序。</p>
            </div>
          `
        case 'cardContent39':
          return `
            <div>
              <p>说明：</p>
              <p>1. 根据每周与质量部核对市场故障汇总归属PI的市场故障。每周末不定时间更新数据。</p>
              <p>2. 目前只显示了基本信息，导入功能未开发完成</p>
            </div>
          `
        case 'cardContent68':
          return `
            <div>
              <p>说明：</p>
              <p>1. 根据市场故障CAR回溯文档导入系统，截取预防措施、纠正措施、拉通排查内容入库，展示列表。</p>
              <p>2. 导入的CAR回溯文档请保持格式一致。</p>
            </div>
          `
        case 'cardContent47':
          return `
            <div>
              <p>说明：</p>
              <p>1. 根据各人员资质等级列出该人员是否升级保级，以及升保级周期</p>
              <p>2. 该页面不仅需要拥有该菜单权限，还需要拥有数据权限。已拥有该页面的人员请勿相互传播数据。</p>
            </div>
          `
        case 'cardContent45':
          return `
            <div>
              <p>说明：</p>
              <p>1. 根据人员资质等级升保级所需产出统计是否达成，未达成还差哪些产出。每天凌晨4点20更新数据</p>
              <p>2. 总计人数：为该部门所有人数；工程力人数：为该部门去掉经理的人数</p>
              <p>3. 目前产出计算资质的有：bug数（内部bug系统、外部导入）、新增用例数、CAF文档、优秀作品、5级专业域考试。详细计算公式如下：</p>
              <p>&nbsp;bug数：</p>
              <p>&nbsp;&nbsp;根据人员资质周期时间段内的bug系统提交的bug和外部导入的bug合计</p>
              <p>&nbsp;新增用例数：</p>
              <p>&nbsp;&nbsp;根据【测试管理平台】提供的数据，只算新增的用例数。修改的和删除再新增的，都是不算的。</p>
              <p>&nbsp;CAF文档：</p>
              <p>&nbsp;&nbsp;请查看【资质信息-人员CAF列表】页面帮助说明。</p>
              <p>&nbsp;优秀作品：</p>
              <p>&nbsp;&nbsp;根据各方评审后的文档总分，最终计算：分数&gt;=8分为一级优秀作品；8&gt;分数&gt;=6为二级优秀作品。</p>
              <p>&nbsp;5级专业域考试：</p>
              <p>&nbsp;&nbsp;根据e-Learning考试系统导出数据是否通过。</p>
            </div>
          `
        case 'cardContent62':
          return `
            <div>
              <p>说明：</p>
              <p>1. 根据人员资质周期段在CAF提交的文档来统计文档的代码量和用例数，计算文档归属等级</p>
              <p>2. TP文档：</p>
              <p>&nbsp;文档代码量：根据【项目管理系统-查询对应项目-STP分解】页面查询代码量，再根据这个需求下有几个TP均分代码量。</p>
              <p>&nbsp;文档用例数：根据【项目管理系统-查询对应项目-STP分解】页面查询分解后的用例数</p>
              <p>&nbsp;代码量等级：先判断【代码量、用例数其一为空或为0则文档等级为0，用例数/代码量&gt;20 或 用例数/代码量&lt;2 则文档等级为0】。之后【前面的比值在5-15之间，代码量&gt;10为一级。比值在2-20之间，10&gt;=代码量&gt;=3为二级，其余则为0】</p>
              <p>&nbsp;用例数等级：先判断【代码量、用例数其一为空或为0则文档等级为0，用例数/代码量&gt;20 或 用例数/代码量&lt;2 则文档等级为0】。之后【前面的比值在5-15之间，用例数&gt;=100为一级。比值在2-20之间，用例数&gt;=30为二级，其余为0</p>
              <p>&nbsp;最终等级：根据代码量等级和用例数等级，以最高等级为准，其中一个是一级就是一级，没有一级，有二级就是二级，都没有就是0</p>
              <p>3. STP文档：</p>
              <p>&nbsp;文档代码量：文档代码量就是项目代码量</p>
              <p>&nbsp;文档用例数：根据【项目管理系统-查询对应项目-STP分解】页面的总计用例数</p>
              <p>&nbsp;代码量等级：代码量&gt;50为一级，50&gt;=代码量&gt;=10为二级，其余则为0</p>
              <p>&nbsp;用例数等级：用例数&gt;300为一级，300&gt;=用例数&gt;=100为二级，其余为0</p>
              <p>&nbsp;最终等级：根据代码量等级和用例数等级，以最高等级为准，其中一个是一级就是一级，没有一级，有二级就是二级，都没有就是0</p>
            </div>
          `
        case 'cardContent67':
          return `
            <div>
              <p>说明：</p>
              <p>1. 根据人员在外部做的项目，bug未提交到内部的bug系统，所需要把外部产出bug导入系统计算bug产出。</p>
              <p>2. 该导入模版根据腾讯项目bug系统导出bug数据模版做的。模版为页面表格顺序。</p>
            </div>
          `
        case 'cardContent70':
          return `
            <div>
              <p>说明：</p>
              <p>1. 根据人员提交CAF计划计算是否达成</p>
              <p>2. 计划有文档名称，直接匹配文档名称；没有文档名称的匹配项目或者文档类型；都没有则任意匹配</p>
              <p>3. 根据实际文档提交的时间和等级，计算是否达成、超期达成、文档等级为0</p>
            </div>
          `
        case 'cardContent72':
          return `
            <div>
              <p>说明：</p>
              <p>1. 可增加人员专业/技能域提升计划</p>
              <p>2. 当前等级为系统计算所得，不可自定义。</p>
              <p>&nbsp;当前等级计算途径：1.【资质信息-专业/技能域达成列表】页面导入（导入请遵循页面列表提示），并通过管理员审核；2.https://pan.ruijie.com.cn/apps/files/desktop/files/folder/275000791442 云盘文档上传，根据文档名称获取等级（这里请注意上传文档的名称格式）；3.e-learning技能域专业域考试通过</p>
              <p>3. 根据这里的专业/技能域等级计算资质所需的专业/技能域</p>
            </div>
          `
        case 'cardContent74':
          return `
            <div>
              <p>说明：</p>
              <p>1. 可导入人员专业/技能域达成情况</p>
              <p>2. 导入后需管理员评审通过后，才能真正算达成。云盘扫描数据只需域名在【资质信息-资质规则定义】中能查到，就算通过</p>
            </div>
          `
        case 'cardContent73':
          return `
            <div>
              <p>说明：</p>
              <p>1. 根据提交CAF作品查询未定级原因</p>
              <p>2. 如有提交CAF却在定级和未定级页面查不到作品，大概率是被别人提交覆盖，按照文档名称查询下。</p>
              <p>3. 请根据未定级原因，去补齐定级所需代码量和用例数</p>
            </div>
          `
        case 'cardContent84':
          return `
            <div>
              <p>说明：</p>
              <p>1. 根据提交CAF作品的项目名称为12.0CERT统计文档</p>
              <p>2. 该文档可自定义等级，用于资质计算和排行榜</p>
            </div>
          `
        case 'cardContent89':
          return `
            <div>
              <p>说明：</p>
              <p>1.设计排行榜算法：</p>
              <p>&nbsp;TP一级50分，二级30分，其他5分；</p>
              <p>&nbsp;STP一级50分，二级30分，其他5分；</p>
              <p>&nbsp;优秀作品一级30分，二级10分，其他5分；</p>
              <p>&nbsp;评审一般0.5分，严重1分；</p>
              <p>&nbsp;1.1 TP等级:</p>
              <p>&nbsp;&nbsp;代码量等级：先判断【代码量、用例数其一为空或为0则文档等级为0，用例数/代码量&gt;20 或 用例数/代码量&lt;2 则文档等级为0】。之后【代码量&gt;10为一级，10&gt;=代码量&gt;=5为二级，其余则为0】</p>
              <p>&nbsp;&nbsp;用例数等级：先判断【代码量、用例数其一为空或为0则文档等级为0，用例数/代码量&gt;20 或 用例数/代码量&lt;2 则文档等级为0】。之后【300&gt;用例数&gt;=100为一级，100&gt;用例数&gt;=50为二级，其余为0】</p>
              <p>&nbsp;&nbsp;最终等级：根据代码量等级和用例数等级，以最高等级为准，其中一个是一级就是一级，没有一级，有二级就是二级，都没有就是0</p>
              <p>&nbsp;1.2 STP等级:</p>
              <p>&nbsp;&nbsp;代码量等级：代码量&gt;50为一级，50&gt;=代码量&gt;=10为二级，其余则为0</p>
              <p>&nbsp;&nbsp;用例数等级：用例数&gt;300为一级，300&gt;=用例数&gt;=100为二级，其余为0</p>
              <p>&nbsp;&nbsp;最终等级：根据代码量等级和用例数等级，以最高等级为准，其中一个是一级就是一级，没有一级，有二级就是二级，都没有就是0</p>
              <p>&nbsp;1.3 优秀作品等级:</p>
              <p>&nbsp;&nbsp;一级：根据评委打分，平均分8分以上（包括8分）</p>
              <p>&nbsp;&nbsp;二级：根据评委打分，平均分6分以上（包括6分）</p>
              <p>&nbsp;&nbsp;其他：根据评委打分，平均分6分以下</p>
              <p>&nbsp;1.4 项目评审：</p>
              <p>&nbsp;&nbsp;一般0.5分，严重1分。</p>
              <p>2.执行排行榜算法：</p>
              <p>&nbsp;2.1 TES（bug）算法:</p>
              <p>&nbsp;&nbsp;2.1.1 按照BUG数量及BUG严重等级，给予初始TES(Test Execution Skills)值</p>
              <p>&nbsp;&nbsp;&nbsp;TES=严重级别的问题个数*5+一般级别的问题个数*3+提示级别的问题个数*1</p>
              <p>&nbsp;&nbsp;&nbsp;blocker/critical/major：5；normal：3；minor/trivial/enhancement：1</p>
              <p>&nbsp;&nbsp;&nbsp;非工作包负责人发现的，以初始DI值的30%进行计算</p>
              <p>&nbsp;&nbsp;&nbsp;遗留问题以初始DI值的40%进行计算</p>
              <p>&nbsp;&nbsp;2.1.2 BUG可重现率,扣TES值 （在BUG数量中TES值80%扣除）</p>
              <p>&nbsp;&nbsp;&nbsp;从项目初给出计算遗漏时间（12.3PL1暂以次轮回归里程碑11.18号始进行统计）</p>
              <p>&nbsp;&nbsp;2.1.3 事业部遗漏问题（负向激励），给予2倍DI值的扣除</p>
              <p>&nbsp;&nbsp;&nbsp;遗留问题以初始DI值的40%进行计算</p>
              <p>&nbsp;&nbsp;2.1.4 BUG提交信息完整/可用性（一键收集/log日志……）；扣2倍TES值，最少0分（PTTL反馈，PTM抽查到问题扣TES; PTTL、PTM积分奖励）</p>
              <p>&nbsp;&nbsp;&nbsp;通过系统一键收集字段&系统抽查方式进行核实</p>
              <p>&nbsp;&nbsp;2.1.5 定位信息的分析处理 (加 TES,单列）</p>
              <p>&nbsp;&nbsp;&nbsp;有使用定位工具(MOM Trace/故障log分析……) ，有完整的分析BUG问题的，给予加2倍TES值，通过系统筛选抽查，需要结合效果，按分数值增加 </p>
              <p>&nbsp;2.2 自动化脚本算法:</p>
              <p>&nbsp;&nbsp;2.2.1 脚本开发/存量脚本</p>
              <p>&nbsp;&nbsp;&nbsp;2019年完全新增脚本《提交PASS日志》+0.8分/个，入库成功+0.2分；//入库成功以规范审核通过为准；</p>
              <p>&nbsp;&nbsp;&nbsp;2019年移植存量脚本入库成功+0.2分/个；//之前未入库的存量脚本；</p>
              <p>&nbsp;&nbsp;&nbsp;2019年之前的存量脚本按维护初始分:+0.05分/脚本 给定初始积分；</p>
              <p>&nbsp;&nbsp;2.2.2 脚本入库/规范审核问题：</p>
              <p>&nbsp;&nbsp;&nbsp;脚本入库验收/脚本规范存在问题按BUG扣0.2分/BUG；//以BUG系统为准，操作系统为《自动化脚本》；</p>
              <p>&nbsp;&nbsp;2.2.3 脚本维护：</p>
              <p>&nbsp;&nbsp;&nbsp;脚本问题完成脚本维护+0.2分；//按BUG统计，BUG为RESOLVED/CLOSE；</p>
              <p>&nbsp;&nbsp;2.2.4 自动化工厂负责的分析脚本：0.05分/脚本；//同存量脚本给予分析初始分；</p>
              <p>&nbsp;&nbsp;2.2.5 自动化公共库KEY开发：0.5分；//KEY与脚本按1:2折算；</p>
            </div>
          `
        case 'cardContent90':
          return `
            <div>
              <p>说明：</p>
              <p>1.设计排行榜算法：</p>
              <p>&nbsp;TP一级50分，二级30分，其他5分；</p>
              <p>&nbsp;STP一级50分，二级30分，其他5分；</p>
              <p>&nbsp;优秀作品一级30分，二级10分，其他5分；</p>
              <p>&nbsp;评审一般0.5分，严重1分；</p>
              <p>&nbsp;1.1 TP等级:</p>
              <p>&nbsp;&nbsp;代码量等级：先判断【代码量、用例数其一为空或为0则文档等级为0，用例数/代码量&gt;20 或 用例数/代码量&lt;2 则文档等级为0】。之后【代码量&gt;10为一级，10&gt;=代码量&gt;=5为二级，其余则为0】</p>
              <p>&nbsp;&nbsp;用例数等级：先判断【代码量、用例数其一为空或为0则文档等级为0，用例数/代码量&gt;20 或 用例数/代码量&lt;2 则文档等级为0】。之后【300&gt;用例数&gt;=100为一级，100&gt;用例数&gt;=50为二级，其余为0】</p>
              <p>&nbsp;&nbsp;最终等级：根据代码量等级和用例数等级，以最高等级为准，其中一个是一级就是一级，没有一级，有二级就是二级，都没有就是0</p>
              <p>&nbsp;1.2 STP等级:</p>
              <p>&nbsp;&nbsp;代码量等级：代码量&gt;50为一级，50&gt;=代码量&gt;=10为二级，其余则为0</p>
              <p>&nbsp;&nbsp;用例数等级：用例数&gt;300为一级，300&gt;=用例数&gt;=100为二级，其余为0</p>
              <p>&nbsp;&nbsp;最终等级：根据代码量等级和用例数等级，以最高等级为准，其中一个是一级就是一级，没有一级，有二级就是二级，都没有就是0</p>
              <p>&nbsp;1.3 优秀作品等级:</p>
              <p>&nbsp;&nbsp;一级：根据评委打分，平均分8分以上（包括8分）</p>
              <p>&nbsp;&nbsp;二级：根据评委打分，平均分6分以上（包括6分）</p>
              <p>&nbsp;&nbsp;其他：根据评委打分，平均分6分以下</p>
              <p>&nbsp;1.4 项目评审：</p>
              <p>&nbsp;&nbsp;一般0.5分，严重1分。</p>
              <p>2.执行排行榜算法：</p>
              <p>&nbsp;2.1 TES（bug）算法:</p>
              <p>&nbsp;&nbsp;2.1.1 按照BUG数量及BUG严重等级，给予初始TES(Test Execution Skills)值</p>
              <p>&nbsp;&nbsp;&nbsp;TES=严重级别的问题个数*5+一般级别的问题个数*3+提示级别的问题个数*1</p>
              <p>&nbsp;&nbsp;&nbsp;blocker/critical/major：5；normal：3；minor/trivial/enhancement：1</p>
              <p>&nbsp;&nbsp;&nbsp;非工作包负责人发现的，以初始DI值的30%进行计算</p>
              <p>&nbsp;&nbsp;&nbsp;遗留问题以初始DI值的40%进行计算</p>
              <p>&nbsp;&nbsp;2.1.2 BUG可重现率,扣TES值 （在BUG数量中TES值80%扣除）</p>
              <p>&nbsp;&nbsp;&nbsp;从项目初给出计算遗漏时间（12.3PL1暂以次轮回归里程碑11.18号始进行统计）</p>
              <p>&nbsp;&nbsp;2.1.3 事业部遗漏问题（负向激励），给予2倍DI值的扣除</p>
              <p>&nbsp;&nbsp;&nbsp;遗留问题以初始DI值的40%进行计算</p>
              <p>&nbsp;&nbsp;2.1.4 BUG提交信息完整/可用性（一键收集/log日志……）；扣2倍TES值，最少0分（PTTL反馈，PTM抽查到问题扣TES; PTTL、PTM积分奖励）</p>
              <p>&nbsp;&nbsp;&nbsp;通过系统一键收集字段&系统抽查方式进行核实</p>
              <p>&nbsp;&nbsp;2.1.5 定位信息的分析处理 (加 TES,单列）</p>
              <p>&nbsp;&nbsp;&nbsp;有使用定位工具(MOM Trace/故障log分析……) ，有完整的分析BUG问题的，给予加2倍TES值，通过系统筛选抽查，需要结合效果，按分数值增加 </p>
              <p>&nbsp;2.2 自动化脚本算法:</p>
              <p>&nbsp;&nbsp;2.2.1 脚本开发/存量脚本</p>
              <p>&nbsp;&nbsp;&nbsp;2019年完全新增脚本《提交PASS日志》+0.8分/个，入库成功+0.2分；//入库成功以规范审核通过为准；</p>
              <p>&nbsp;&nbsp;&nbsp;2019年移植存量脚本入库成功+0.2分/个；//之前未入库的存量脚本；</p>
              <p>&nbsp;&nbsp;&nbsp;2019年之前的存量脚本按维护初始分:+0.05分/脚本 给定初始积分；</p>
              <p>&nbsp;&nbsp;2.2.2 脚本入库/规范审核问题：</p>
              <p>&nbsp;&nbsp;&nbsp;脚本入库验收/脚本规范存在问题按BUG扣0.2分/BUG；//以BUG系统为准，操作系统为《自动化脚本》；</p>
              <p>&nbsp;&nbsp;2.2.3 脚本维护：</p>
              <p>&nbsp;&nbsp;&nbsp;脚本问题完成脚本维护+0.2分；//按BUG统计，BUG为RESOLVED/CLOSE；</p>
              <p>&nbsp;&nbsp;2.2.4 自动化工厂负责的分析脚本：0.05分/脚本；//同存量脚本给予分析初始分；</p>
              <p>&nbsp;&nbsp;2.2.5 自动化公共库KEY开发：0.5分；//KEY与脚本按1:2折算；</p>
            </div>
          `
        case 'cardContent91':
          return `
            <div>
              <p>说明：</p>
              <p>1. 可根据选择的日期查询时间段排行榜数据变化</p>
            </div>
          `
        case 'cardContent93':
          return `
            <div>
              <p>说明：</p>
              <p>可增加、修改、删除、查询动作和检查点树形基础列表</p>
              <p>&nbsp;&nbsp;增加：可任意增加动作和检查点</p>
              <p>&nbsp;&nbsp;修改：只能修改除根节点之外的动作和检查点</p>
              <p>&nbsp;&nbsp;删除：只能删除没有子节点的节点</p>
            </div>
          `
        case 'cardContent94':
          return `
            <div>
              <p>说明：</p>
              <p>根据【动作和检查点基础列表】中数据，可在树上增加、修改、删除、评论、查看动作和检查点明细</p>
              <p>&nbsp;&nbsp;增加：先选中左边要添加明细的树形列表，在右边基础信息中添加</p>
              <p>&nbsp;&nbsp;修改：先选中左边要添加明细的树形列表，在右边基础信息中修改</p>
              <p>&nbsp;&nbsp;删除：先选中左边要添加明细的树形列表，在右边右上角删除数据（会把基础数据、评论数据、操作明细都删掉），请谨慎操作！</p>
              <p>&nbsp;&nbsp;评论：先选中左边要添加明细的树形列表，要评论需要先在基础信息中添加数据。可自己评论数据，也可评论别人的评论，还有点赞的功能。</p>
              <p>&nbsp;&nbsp;查看：先选中左边要添加明细的树形列表，查看明细、查看评论、查看操作明细</p>
            </div>
          `
        case 'cardContent95':
          return `
            <div>
              <p>说明：</p>
              <p>可增加、修改、删除、查询工程方法集</p>
            </div>
          `
      }
    },
    // 级联选择，改变则添加 tab
    handleRouterChange() {
      let { value } = this.$refs.cascaderRef.getCheckedNodes()[0]
      const { label } = this.$refs.cascaderRef.getCheckedNodes()[0]
      const panes = this.panes
      const routerIds = this.routerIds
      let flag = true

      for (const index in routerIds) {
        if (routerIds[index] === value) {
          flag = false
          break
        }
      }

      if (flag) {
        value = 0
      }

      const activeKey = `newTab${value}`
      for (const index in panes) {
        if (panes[index].key === activeKey) {
          panes[index].title = label
          this.active = activeKey
          this.panes = panes
          // 折叠
          this.$refs.cascaderRef.dropDownVisible = false
          return
        }
      }
      panes.push({ title: label, content: `cardContent${value}`, key: activeKey })
      this.active = activeKey
      this.panes = panes
      // 折叠
      this.$refs.cascaderRef.dropDownVisible = false
    },
    // 移除 tab
    handleRemoveTabClick(targetKey) {
      let activeKey = this.active
      let lastIndex
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1
        }
      })
      const panes = this.panes.filter(pane => pane.key !== targetKey)
      if (lastIndex >= 0 && activeKey === targetKey) {
        activeKey = panes[lastIndex].key
      }
      this.panes = panes
      this.active = activeKey
    },
    async getRouterSelect() {
      const { data: res } = await request('/api/router/listHelpTreeSelect', {
        method: 'POST',
        data: {}
      })
      this.routerList = res
    }
  }
}
</script>
