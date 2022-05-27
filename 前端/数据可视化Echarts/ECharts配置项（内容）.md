### ECharts

各个属性的 配置项

```javascript
theme = {
    // 全局默认背景
    // backgroundColor：'rgba(,,,)'

    // 默认色板
    color: ['', '', ''],

    // 图标标题
    title: {
        x: 'left',		// 水平安放位置，默认左对齐
        // 可选的值 center left right 90px
        y: 'top',		// 垂直  默认顶部对齐
        // 可选值 top bottom center 80px
        // textAlign: null,			// 水平居中对齐方式，默认根据x自动调整
        backgroundColor: 'rgba(0,0,0,0)',		// 图标标题 的背景颜色
        borderColor: '#ccc',		// 标题边框 的颜色
        borderWidth: 0,					// 标题边框线宽，px 默认0
        padding: 5,							// 默认内边距，px 默认5
        itemGap: 10,						// 主副标题纵向间隔，px 默认10
        textStyle: {
            fontSize: 18,					// 主标题文字默认配置
            fontWeight: 'bolder',
            color: '#333'
        },
        subtextStyle: {
            color: '#aaa'					// 副标题文字颜色
        }
    },

    // 图例
    legend: {
        orient: 'horizontal',			// 布局方式，默认水平
        // 可选 horizontal vertical
        x: 'center',               // 水平安放位置，默认为全图居中，可选为：
        // 'center' ¦ 'left' ¦ 'right'
        // ¦ {number}（x坐标，单位px）
        y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
        // 'top' ¦ 'bottom' ¦ 'center'
        // ¦ {number}（y坐标，单位px）
        backgroundColor: '',
        borderColor: '',
        borderWidth: 0,
        padding: 5,
        itemGap: 10,			// 各个item之间的间隔，px 默认10
        itemWidth: 20,    // 图例图形宽度
        itemHeight: 14,   // 图例图形高度
        textStyle: {
            color: '',			// 图例文字颜色
        }
    },

    // 值域
    dataRange: {
        orient: 'vertical', 		// 默认垂直布局的 可选 horizontal
        x: 'left',							// 水平安放位置，默认左对齐
        // center left right px
        y: 'bottom',						// 垂直 center top bottom px
        backgroundColor: '',
        borderColor: '',
        borderWidth: 0,					// 边框线宽
        padding: 5,
        itemGap: 10,
        itemWidth: 20,					// 值域图形宽度
        itemHeight: 14,
        splitNumber: 5,					// 分割段数
        color: ['#1e90ff', '#f0ffff'],//颜色
        text: ['高', '低'],
        textStyle: {
            color: ''
        }
    },

    // 工具箱（右上角操作栏）
    toolbox: {
        orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
        // 'horizontal' ¦ 'vertical'
        x: 'right',                // 水平安放位置，默认为全图右对齐，可选为：
        // 'center' ¦ 'left' ¦ 'right'
        // ¦ {number}（x坐标，单位px）
        y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
        // 'top' ¦ 'bottom' ¦ 'center'
        // ¦ {number}（y坐标，单位px）
        color: ['#1e90ff', '#22bb22', '#4b0082', '#d2691e'],
        backgroundColor: 'rgba(0,0,0,0)', // 工具箱背景颜色
        borderColor: '#ccc',       // 工具箱边框颜色
        borderWidth: 0,            // 工具箱边框线宽，单位px，默认为0（无边框）
        padding: 5,                // 工具箱内边距，单位px，默认各方向内边距为5，
        // 接受数组分别设定上右下左边距，同css
        itemGap: 10,               // 各个item之间的间隔，单位px，默认为10，
        // 横向布局时为水平间隔，纵向布局时为纵向间隔
        itemSize: 16,              // 工具箱图形宽度
        featureImageIcon: {},     // 自定义图片icon
        featureTitle: {
            mark: '辅助线开关',			// 值为true或false，下同
            markUndo: '删除辅助线',
            markClear: '清空辅助线',
            dataZoom: '区域缩放',
            dataZoomReset: '区域缩放后退',
            dataView: '数据视图',
            lineChart: '折线图切换',
            barChart: '柱形图切换',
            restore: '还原',
            saveAsImage: '保存为图片'
        }
    },

    // 提示框
    tooltip: {
        trigger: 'item',			// 数据出发  item axis
        showDelay: 20,				// 延迟显示（避免频繁切换）  默认20ms
        hideDelay: 100,				// 延迟隐藏		默认100ms
        transitionDuration: 0.4, // 动画变换时间  默认0.4s
        backgroundColor: 'rgba(0,0,0,0.7)',
        // 提示背景颜色，默认0.7透明的黑色
        borderColor: '#333',	// 边框色 默认#333
        borderRadius: 4,			// 提示框圆角 默认4px
        borderWidth: 0,
        padding: 5,
        axisPointer: {				// 坐标轴指示器（坐标轴触发有效）
            type: 'line',				// 默认直线，可选 line shadow
            lineStyle: {				// 指示器样式设置
                color: '#48b',
                width: 2,
                type: 'solid'
            },
            shadowStyle: {			// 阴影指示器样式
                width: 'auto',		// 阴影大小
                color: 'rgba(150,150,150,0.3)'  // 阴影颜色
            }
        },
        textStyle: {
            color: '#fff'
        }
    },

    // 区域缩放控制器
    dataZoom: {
        orient: 'horizontal',		// 布局方式，默认水平，可选：
        // horizontal  vertical
        x: { number },
        y: { number },
        width: { number },
        height: { number },
        backgroundColor: 'rgba(0,0,0,0)',  // 背景色，默认黑
        dataBackgroundColor: '#eee',			// 数据 背景颜色
        fillerColor: '',			// 填充颜色
        handleColor: '',			// 手柄颜色
    },

    // 网格
    grid: {
        x: 80,
        y: 60,
        x2: 80,
        y2: 60,
        // width: {totalWidth} - x - x2,
        // height: {totalHeight} - y - y2,
        backgroundColor: 'rgba(0,0,0,0)',
        borderWidth: 1,
        borderColor: '#ccc'
    },

    // 类目轴
    categoryAxis: {
        position: 'bottom',				// 位置。默认bottom
        nameLocation: 'end',			// 坐标轴起始位置  start end
        boundaryGap: true,				// 类目其实结束  两端空白
        axisLine: {						// 坐标轴线
            show: true,					// 坐标轴线，默认显示
            lineStyle: {				// 属性 lineStyle 控制线条样式
                color: '#48b',
                width: 2,
                type: 'solid'
            }
        },
        axisTick: {						// 坐标轴标记
            show: true,					// 控制类目轴显示隐藏  默认不显示
            interval: 'auto',		// 间隔 自适应
            inside: false, 			// 控制小标记是否在grid之中
            length: 5,
            lineStyle: {		// 属性lineStyle 控制线条样式
                color: '#333',
                width: 1
            }
        },
        axisLable: {					// 坐标轴文本标签
            show: true,
            interval: 'auto',
            rotate: 0,
            margin: 8,
            formatter: null,
            textStyle: {
                color: '#333'
            }
        },
        splitLine: {					// 分割线
            show: true,
            onGap: null,
            lineStyle: {				// 线条样式
                color: ['#ccc'],
                width: 1,
                type: 'solid'
            }
        },
        splitArea: {					// 分割区域
            show: false,
            onGap: null,
            areaStyle: {				// 控制区域样式
                color: ['', '']
            }
        },
        splitLine: {
            show: true,
            areaStyle: {
                width: 1,
                color: '#ccc'
            }
        }
    },

    // 柱形图默认参数
    bar: {
        barMinHeight: 0,          // 最小高度改为0
        // barWidth: null,        // 默认自适应
        barGap: '30%',            // 柱间距离，默认为柱形宽度的30%，可设固定值
        barCategoryGap: '20%',   // 类目间柱形距离，默认为类目间距的20%，可设固定值
        itemStyle: {
            normal: {
                // color: '各异',
                barBorderColor: '#fff',       // 柱条边线
                barBorderRadius: 0,           // 柱条边线圆角，单位px，默认为0
                barBorderWidth: 1,            // 柱条边线线宽，单位px，默认为1
                label: {
                    show: false
                    // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
                    //           'inside'|'left'|'right'|'top'|'bottom'
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                }
            },
            emphasis: {
                // color: '各异',
                barBorderColor: 'rgba(0,0,0,0)',   // 柱条边线
                barBorderRadius: 0,                // 柱条边线圆角，单位px，默认为0
                barBorderWidth: 1,                 // 柱条边线线宽，单位px，默认为1
                label: {
                    show: false
                    // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
                    //           'inside'|'left'|'right'|'top'|'bottom'
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                }
            }
        }
    },

    // 折线图默认参数
    line: {
        itemStyle: {
            normal: {
                // color: 各异,
                label: {
                    show: false
                    // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
                    //           'inside'|'left'|'right'|'top'|'bottom'
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                },
                lineStyle: {
                    width: 2,
                    type: 'solid',
                    shadowColor: 'rgba(0,0,0,0)', //默认透明
                    shadowBlur: 5,
                    shadowOffsetX: 3,
                    shadowOffsetY: 3
                }
            },
            emphasis: {
                // color: 各异,
                label: {
                    show: false
                    // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
                    //           'inside'|'left'|'right'|'top'|'bottom'
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                }
            }
        },
        //smooth : false,
        //symbol: null,         // 拐点图形类型
        symbolSize: 2,          // 拐点图形大小
        //symbolRotate : null,  // 拐点图形旋转控制
        showAllSymbol: false    // 标志图形默认只有主轴显示（随主轴标签间隔隐藏策略）
    },

    // K线图默认参数
    k: {
        // barWidth : null          // 默认自适应
        // barMaxWidth : null       // 默认自适应 
        itemStyle: {
            normal: {
                color: '#fff',          // 阳线填充颜色
                color0: '#00aa11',      // 阴线填充颜色
                lineStyle: {
                    width: 1,
                    color: '#ff3200',   // 阳线边框颜色
                    color0: '#00aa11'   // 阴线边框颜色
                }
            },
            emphasis: {
                // color: 各异,
                // color0: 各异
            }
        }
    },

    // 散点图默认参数
    scatter: {
        //symbol: null,      // 图形类型
        symbolSize: 4,       // 图形大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
        //symbolRotate : null,  // 图形旋转控制
        large: false,        // 大规模散点图
        largeThreshold: 2000,// 大规模阀值，large为true且数据量>largeThreshold才启用大规模模式
        itemStyle: {
            normal: {
                // color: 各异,
                label: {
                    show: false
                    // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
                    //           'inside'|'left'|'right'|'top'|'bottom'
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                }
            },
            emphasis: {
                // color: '各异'
                label: {
                    show: false
                    // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
                    //           'inside'|'left'|'right'|'top'|'bottom'
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                }
            }
        }
    },

    // 雷达图默认参数
    radar: {
        itemStyle: {
            normal: {
                // color: 各异,
                label: {
                    show: false
                },
                lineStyle: {
                    width: 2,
                    type: 'solid'
                }
            },
            emphasis: {
                // color: 各异,
                label: {
                    show: false
                }
            }
        },
        //symbol: null,         // 拐点图形类型
        symbolSize: 2           // 可计算特性参数，空数据拖拽提示图形大小
        //symbolRotate : null,  // 图形旋转控制
    },

    // 饼图默认参数
    pie: {
        center: ['50%', '50%'],    // 默认全局居中
        radius: [0, '75%'],
        clockWise: false,          // 默认逆时针
        startAngle: 90,
        minAngle: 0,                // 最小角度改为0
        selectedOffset: 10,         // 选中是扇区偏移量
        itemStyle: {
            normal: {
                // color: 各异,
                borderColor: '#fff',
                borderWidth: 1,
                label: {
                    show: true,
                    position: 'outer'
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                },
                labelLine: {
                    show: true,
                    length: 20,
                    lineStyle: {
                        // color: 各异,
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            emphasis: {
                // color: 各异,
                borderColor: 'rgba(0,0,0,0)',
                borderWidth: 1,
                label: {
                    show: false
                    // position: 'outer'
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                },
                labelLine: {
                    show: false,
                    length: 20,
                    lineStyle: {
                        // color: 各异,
                        width: 1,
                        type: 'solid'
                    }
                }
            }
        }
    },

    map: {
        mapType: 'china',   // 各省的mapType暂时都用中文
        mapLocation: {
            x: 'center',
            y: 'center'
            // width    // 自适应
            // height   // 自适应
        },
        showLegendSymbol: true,       // 显示图例颜色标识（系列标识的小圆点），存在legend时生效
        itemStyle: {
            normal: {
                // color: 各异,
                borderColor: '#fff',
                borderWidth: 1,
                areaStyle: {
                    color: '#ccc'//rgba(135,206,250,0.8)
                },
                label: {
                    show: false,
                    textStyle: {
                        color: 'rgba(139,69,19,1)'
                    }
                }
            },
            emphasis: {                 // 也是选中样式
                // color: 各异,
                borderColor: 'rgba(0,0,0,0)',
                borderWidth: 1,
                areaStyle: {
                    color: 'rgba(255,215,0,0.8)'
                },
                label: {
                    show: false,
                    textStyle: {
                        color: 'rgba(139,69,19,1)'
                    }
                }
            }
        }
    },

    force: {
        // 数据map到圆的半径的最小值和最大值
        minRadius: 10,
        maxRadius: 20,
        density: 1.0,
        attractiveness: 1.0,
        // 初始化的随机大小位置
        initSize: 300,
        // 向心力因子，越大向心力越大
        centripetal: 1,
        // 冷却因子
        coolDown: 0.99,
        // 分类里如果有样式会覆盖节点默认样式
        itemStyle: {
            normal: {
                // color: 各异,
                label: {
                    show: false
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                },
                nodeStyle: {
                    brushType: 'both',
                    color: '#f08c2e',
                    strokeColor: '#5182ab'
                },
                linkStyle: {
                    strokeColor: '#5182ab'
                }
            },
            emphasis: {
                // color: 各异,
                label: {
                    show: false
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                },
                nodeStyle: {},
                linkStyle: {}
            }
        }
    },

    chord: {
        radius: ['65%', '75%'],
        center: ['50%', '50%'],
        padding: 2,
        sort: 'none', // can be 'none', 'ascending', 'descending'
        sortSub: 'none', // can be 'none', 'ascending', 'descending'
        startAngle: 90,
        clockWise: false,
        showScale: false,
        showScaleText: false,
        itemStyle: {
            normal: {
                label: {
                    show: true
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                },
                lineStyle: {
                    width: 0,
                    color: '#000'
                },
                chordStyle: {
                    lineStyle: {
                        width: 1,
                        color: '#666'
                    }
                }
            },
            emphasis: {
                lineStyle: {
                    width: 0,
                    color: '#000'
                },
                chordStyle: {
                    lineStyle: {
                        width: 2,
                        color: '#333'
                    }
                }
            }
        }
    },

    island: {
        r: 15,
        calculateStep: 0.1  // 滚轮可计算步长 0.1 = 10%
    },

    markPoint: {
        symbol: 'pin',         // 标注类型
        symbolSize: 10,        // 标注大小，半宽（半径）参数，
        // 当图形为方向或菱形则总宽度为symbolSize * 2
        //symbolRotate : null, // 标注旋转控制
        itemStyle: {
            normal: {
                // color: 各异，
                // borderColor: 各异,     // 标注边线颜色，优先于color 
                borderWidth: 2,            // 标注边线线宽，单位px，默认为1
                label: {
                    show: true,
                    position: 'inside' // 可选为'left'|'right'|'top'|'bottom'
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                }
            },
            emphasis: {
                // color: 各异
                label: {
                    show: true
                    // position: 'inside'  // 'left'|'right'|'top'|'bottom'
                    // textStyle: null     // 默认使用全局文本样式，详见TEXTSTYLE
                }
            }
        }
    },

    markLine: {
        // 标线起始和结束的symbol介绍类型，如果都一样，可以直接传string
        symbol: ['circle', 'arrow'],
        // 标线起始和结束的symbol大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
        symbolSize: [2, 4],
        // 标线起始和结束的symbol旋转控制
        //symbolRotate : null,
        itemStyle: {
            normal: {
                // color: 各异,           // 标线主色，线色，symbol主色
                // borderColor: 随color,     // 标线symbol边框颜色，优先于color 
                borderWidth: 2,          // 标线symbol边框线宽，单位px，默认为2
                label: {
                    show: false,
                    // 可选为 'start'|'end'|'left'|'right'|'top'|'bottom'
                    position: 'inside',
                    textStyle: {         // 默认使用全局文本样式，详见TEXTSTYLE
                        color: '#333'
                    }
                },
                lineStyle: {
                    // color: 随borderColor, // 主色，线色，优先级高于borderColor和color
                    // width: 随borderWidth, // 优先于borderWidth
                    type: 'solid',
                    shadowColor: 'rgba(0,0,0,0)', //默认透明
                    shadowBlur: 5,
                    shadowOffsetX: 3,
                    shadowOffsetY: 3
                }
            },
            emphasis: {
                // color: 各异
                label: {
                    show: false
                    // position: 'inside' // 'left'|'right'|'top'|'bottom'
                    // textStyle: null    // 默认使用全局文本样式，详见TEXTSTYLE
                },
                lineStyle: {}
            }
        }
    },

    textStyle: {
        decoration: 'none',
        fontFamily: 'Arial, Verdana, sans-serif',
        fontFamily2: '微软雅黑',    // IE8- 字体模糊并且不支持不同字体混排，额外指定一份
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: 'normal'
    },

    // 默认标志图形类型列表
    symbolList: [
        'circle', 'rectangle', 'triangle', 'diamond',
        'emptyCircle', 'emptyRectangle', 'emptyTriangle', 'emptyDiamond'
    ],
    loadingText: 'Loading...',
    // 可计算特性配置，孤岛，提示颜色
    calculable: false,              // 默认关闭可计算特性
    calculableColor: 'rgba(255,165,0,0.6)',       // 拖拽提示边框颜色
    calculableHolderColor: '#ccc', // 可计算占位提示颜色
    nameConnector: ' & ',
    valueConnector: ' : ',
    animation: true,
    animationThreshold: 2500,       // 动画元素阀值，产生的图形原素超过2500不出动画
    addDataAnimation: true,         // 动态数据接口是否开启动画效果
    animationDuration: 2000,
    animationEasing: 'ExponentialOut'    //BounceOut
}
```