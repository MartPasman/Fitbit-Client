/*
 Zune Theme v0.0.3
 FusionCharts JavaScript Library

 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>
 */
FusionCharts.register("theme", {
    name: "goals", theme: {
        base: {
            chart: {
                paletteColors: "#dc4f62",

                baseFontSize: 14,
                baseFontColor: "#333333",
                baseFont: "Helvetica Neue, Arial",

                showBorder: 0,
                bgColor: "#ffffff",
                showCanvasBorder: 0,
                useplotgradientcolor: 0,
                useRoundEdges: 0,
                showPlotBorder: 0,
                showAlternateHGridColor: 0,
                showAlternateVGridColor: 0,

                showShadow: 0,
                showHoverEffect: 1,
                showXAxisLine: 0,
                showYAxisLine: 0,
                xAxisLineThickness: 1,
                xAxisLineColor: "#777",

                canvasBgColor: "transparent",

                labelPadding: 10,
                yAxisValuesPadding: 10,

                decimalSeparator: ",",
                thousandSeparator: ".",
                formatNumberScale: 0,

                showToolTip: 0,
                toolTipColor: "#fff",
                toolTipBorderThickness: "1",
                toolTipBorderColor: "#fff",
                toolTipBgColor: "#333",
                toolTipBgAlpha: 80,
                toolTipBorderRadius: 6,
                toolTipPadding: 8,

                divlineThickness: 0,

                valueFontColor: "#333",
                valuePadding: 10,

                anchorRadius: 4,
                drawAnchors: 1,

                legendShadow: 0,
                legendBorderThickness: 0
            },
            dataset: [{}],
            trendlines: [{}]
        },
        pie2d: {
            chart: {
                placeValuesInside: 0,
                use3dlighting: 0,
                valueFontColor: "#333",
                captionPadding: 15
            },
            data: function (c, a, b) {
                a = window.Math;
                return {
                    alpha: 100 -
                    (50 < b ? a.round(100 / a.ceil(b / 10)) : 20) * a.floor(c / 10)
                }
            }
        },
        line: {
            chart: {
                valueBorderColor: "#999",
                valueBorderRadius: 4,
                valueBgColor: "#fff",
                lineThickness: 14
            }
        },
        mscolumn2d: {
            chart: {
                valueBorderColor: "#999",
                valueBorderRadius: 4,
                valueBgColor: "#fff",
                placeValuesInside: 0,
                baseFontSize: 24,
                legendIconScale: 2,
                setAdaptiveYMin: 1,
                paletteColors: "#aaaaaa, #74DB8A"
            }
        },
        column2d: {
            chart: {
                valueFontColor: "#fff",
                placeValuesInside: 1,
                rotateValues: 0,
                decimals: 1
            }
        }
    }
});
