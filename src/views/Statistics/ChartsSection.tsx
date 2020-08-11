import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import React from 'react';

const echarts = require("echarts");
type Props = {
    records: RecordItem[]
}

const Wrapper = styled.section`
    width: 100%;
    height: 250px;
    padding:10px;
    &>.chart{
        height:100%;
    }
`;
const ChartsSection: React.FC<Props> = (props) => {
    const refChart = useRef(null);
    useEffect(() => {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(refChart.current);
        myChart.setOption({
            title: {
                text: "总支出3999元",
                subtext: "其中每天平均消费xxx元",
                textStyle: { fontWeight: "normal" },
            },
            xAxis: {
                type: "category",
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: "line",
                },
            ],
        });
    });
    return (
        <Wrapper>
            <div className="chart" ref={refChart}></div>
        </Wrapper>
    );
}

export { ChartsSection };