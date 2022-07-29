import * as am5 from "@amcharts/amcharts5"
import * as am5percent from "@amcharts/amcharts5/percent"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"

function renderPieChart(chartElem, data) {
  let root = am5.Root.new(chartElem)

  root.setThemes([am5themes_Animated.new(root)])

  let chart = root.container.children.push(
    am5percent.PieChart.new(root, {
      startAngle: 160,
      endAngle: 380,
    })
  )
}

export { renderPieChart }
