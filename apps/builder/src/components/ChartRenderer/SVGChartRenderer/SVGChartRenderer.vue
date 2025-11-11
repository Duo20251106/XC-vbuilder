<script setup lang="ts">
import * as d3 from 'd3'
import { onMounted, ref } from 'vue'

const containerRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
    const width = containerRef.value?.clientWidth || 1024
    const height = containerRef.value?.clientHeight || 768

    const svg = d3
        .select(containerRef.value)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g') //添加一个<g>，所有地图路径都放在这里
        .attr('transform', 'translate(0,0)')

    const projection = d3
        .geoMercator() //墨卡托投影
        .center([107, 38]) //地图中心点
        .scale(500) //缩放比例
        .translate([width / 2, height / 2]) //平移到画布中心

    const path = d3.geoPath(projection) //把地理数据（GeoJSON）转换为 SVG d 属性路径

    d3.json<d3.ExtendedFeatureCollection>(
        'https://gist.githubusercontent.com/zhulinpinyu/8e18d57b3b18fb74e776/raw/efbb74cfea53decb1fe7d6bf279fd351c28c4810/china_simplify.json'
    ).then((root: any) => {
        const featuresLen = root.features.length

        //创建颜色比例尺(线性比例尺)
        const colors = d3.scaleLinear(
            [0, featuresLen * 0.33, featuresLen * 0.66, featuresLen],
            ['#B58929', '#C61C6F', '#268BD2', '#85992C']
        )

        //show province
        const tooltip = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0)

        //绘制地图
        svg.selectAll('path')
            .data(root.features) //绑定每个省份数据
            .enter() //进入选择集
            .append('path') //为每个省份添加一个<path>
            .attr('stroke', '#000')
            .attr('stroke-width', 1)
            .style('opacity', 0.8)
            .attr('fill', function (d, i: number) {
                return colors(i)
            })
            // @ts-ignore
            .attr('d', path) //使用 D3 计算出的地理路径
            .on('mouseover', function (ev, d) {
                const hoveredData = d as d3.ExtendedFeature
                if (!hoveredData) return

                d3.select(this).style('opacity', 1)

                tooltip.transition().duration(200).style('opacity', 0.9)

                tooltip
                    .html(hoveredData.properties?.name)
                    .style('left', ev.pageX + 'px')
                    .style('top', ev.pageY - 28 + 'px')
            })
            .on('mouseout', function () {
                d3.select(this).style('opacity', 0.8)
                tooltip.transition().duration(500).style('opacity', 0)
            })
    })
})
</script>

<template>
    <div class="svg" ref="containerRef"></div>
</template>

<style scoped>
.svg {
    width: 100%;
    height: 560px;
}
</style>

<style lang="css">
.tooltip {
    position: absolute;
    z-index: 9999;
    padding: 0;
    color: const(--color-primary);
    font-size: 13px;
    text-align: left;
    border-radius: 2px;
    pointer-events: none;
}
</style>
