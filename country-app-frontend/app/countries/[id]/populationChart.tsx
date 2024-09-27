import React from "react";
import Chart from "react-apexcharts";
import { Box, Heading } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";

const PopulationChart = ({data}: {data: [{year: number, value: number}]}) => {
    const years = data.map(item => item.year);
    const values = data.map(item => item.value);

    const chartOptions: ApexOptions = {
        chart: {
            type: "line",
            height: 400,
            zoom: {
                enabled: false,
            },
        },
        xaxis: {
            categories: years,
            title: {
                text: "Year",
            },
            labels: {
                rotate: -45,
                style: {
                    fontSize: '10px',
                },
            },
            tickPlacement: 'on',
        },
        yaxis: {
            title: {
                text: "Population",
            },
        },
        title: {
            text: "Population Growth Over Years",
            align: "center",
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5,
            },
        },
    };

    return (
        <Box p={4} overflowX="auto">
            <Heading as="h2" size="lg" mb={4}>
                Population Growth Chart
            </Heading>
            <div style={{ width: '100%', maxWidth: '1200px' }}>
                <Chart options={chartOptions} series={[{ name: "Population", data: values }]} type="line" height={400} />
            </div>
        </Box>
    );

};

export default PopulationChart;
