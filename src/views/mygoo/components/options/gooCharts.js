export default function(data) {
  return {
    title: {
      text: 'Goo测试模板',
      subtext: '纯属虚构',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      left: 'center',
      top: 'bottom',
      data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: {
          show: true,
          type: ['pie', 'funnel']
        },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '面积模式',
        type: 'pie',
        radius: [30, 110],
        center: ['50%', '50%'],
        roseType: 'area',
        data
      }
    ]
  }
}
