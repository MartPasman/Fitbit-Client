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
                // Saxion
                // paletteColors: "#B3E660,#A4D84E,#91BF45,#80A83D,#6F962F,#587A20",
                // Bright
                // paletteColors: "#6BE563,#D87165,#EFCE64,#9764EF,#54E1E5",
                // Saxion Bright
                paletteColors: "#DC4F62",
                labelDisplay: "auto",
                baseFontColor: "#333333",
                baseFont: "Helvetica Neue,Arial",
                captionFontSize: "14",
                subcaptionFontSize: "14",
                subcaptionFontBold: "0",
                showBorder: "0",
                bgColor: "#fdfdfd",
                showShadow: "0",
                canvasBgColor: "#ffffff",
                showCanvasBorder: "0",
                useplotgradientcolor: "0",
                useRoundEdges: "0",
                showPlotBorder: "0",
                showAlternateHGridColor: "0",
                showAlternateVGridColor: "0",
                toolTipColor: "#ffffff",
                toolTipBorderThickness: "1",
                toolTipBorderColor: "#fff",
                toolTipBgColor: "#000000",
                toolTipBgAlpha: "80",
                toolTipBorderRadius: "6",
                toolTipPadding: "8",
                legendBgAlpha: "0",
                legendBorderAlpha: "0",
                legendShadow: "0",
                legendItemFontSize: "10",
                legendItemFontColor: "#666666",
                legendCaptionFontSize: "9",
                divlineAlpha: "100",
                divlineColor: "#999999",
                divlineThickness: "0",
                divLineIsDashed: "1",
                divLineDashLen: "1",
                divLineGapLen: "1",
                scrollheight: "10",
                flatScrollBars: "1",
                scrollShowButtons: "0",
                scrollColor: "#cccccc",
                showHoverEffect: "1",
                valueFontSize: "12",
                showXAxisLine: "0",
                xAxisLineThickness: "1",
                xAxisLineColor: "#777"
            },
            dataset: [{}],
            trendlines: [{}]
        },
        pie2d: {
            chart: {
                placeValuesInside: "0",
                use3dlighting: "0",
                valueFontColor: "#333333",
                captionPadding: "15"
            },
            data: function (c, a, b) {
                a = window.Math;
                return {
                    alpha: 100 -
                    (50 < b ? a.round(100 / a.ceil(b / 10)) : 20) * a.floor(c / 10)
                }
            }
        },
        doughnut2d: {
            chart: {
                placeValuesInside: "0",
                use3dlighting: "0",
                valueFontColor: "#333333",
                centerLabelFontSize: "12",
                centerLabelBold: "1",
                centerLabelFontColor: "#333333",
                captionPadding: "15"
            }, data: function (c, a, b) {
                a = window.Math;
                return {alpha: 100 - (50 < b ? a.round(100 / a.ceil(b / 10)) : 20) * a.floor(c / 10)}
            }
        },
        line: {
            chart: {
                lineThickness: "12"
            }
        },
        spline: {
            chart: {
                lineThickness: "2"
            }
        },
        column2d: {
            chart: {
                valueFontColor: "#fff",
                placeValuesInside: "1",
                rotateValues: "0"
            }
        },
        bar2d: {
            chart: {
                valueFontColor: "#ffffff",
                placeValuesInside: "1"
            }
        },
        column3d: {
            chart: {
                valueFontColor: "#ffffff",
                placeValuesInside: "1",
                rotateValues: "1"
            }
        },
        bar3d: {
            chart: {
                valueFontColor: "#ffffff",
                placeValuesInside: "1"
            }
        },
        area2d: {
            chart: {
                valueBgColor: "#ffffff",
                valueBgAlpha: "90",
                valueBorderPadding: "-2",
                valueBorderRadius: "2"
            }
        }
    }
});
