import React from "react";
import ResponsiveXYFrame from "semiotic/lib/ResponsiveXYFrame";
import { curveCatmullRom } from "d3-shape"
import { scaleTime } from "d3-scale"
import { formatComma, formatDate } from '../../../utils/utilities'
import './XYGraph.css';
import Alert from '../../Alert/Alert';

const theme = ["#FF0000"];

const XYGraph = ({data, topic, dateCap, yAccessor}) => {
    if (typeof(data) === "undefined" || data.length === 0) {
        return (
            <Alert type={"danger"} text={"Oops, we can't fetch that data at the moment. Please check back later."} />
        )
    }

    const frameProps = {   
        lines: { 
            coordinates: [
                    ...data 
                ]
            },
        size: [860, 400],
        responsiveWidth: true,
        margin: { 
            left: 60, 
            bottom: 90, 
            right: 10, 
            top: 40 
        },
        lineType: { 
            type: "line", 
            interpolator: curveCatmullRom 
        },
        xScaleType: scaleTime(),
        xAccessor: function(e) {
            return new Date(e["date"]);
        },
        yAccessor: yAccessor,
        yExtent: [0],
        lineStyle: (d, i) => ({
            stroke: theme[i],
            strokeWidth: 2,
            fill: "none"
        }),
        title: (
            <text textAnchor="middle">Number of Colorado Covid-19 {topic} by Day</text>
        ),
        axes: [
            { 
                orient: "left", 
                label: "Number of Cases", 
                tickFormat: function(e){
                    return e / 1e3 + "k";
                } 
            },
            { 
                orient: "bottom", 
                tickFormat: function(e) {  
                    return e.getMonth() + 1 + "/" + e.getDate();
                }, 
                label: { 
                    name: "Date", 
                    locationDistance: 55 
                } 
            }
        ],
        hoverAnnotation: true,
        tooltipContent: d => {
            return (
                <React.Fragment>
                    {
                        (d["date"] && d[yAccessor]) ? 
                        <div className="tooltip-content">
                            <p>Date: {formatDate(d["date"])}</p>
                            <p>Total {topic} Count: {formatComma(d[yAccessor])}</p>
                        </div>
                        : 
                        <div className="tooltip-content">
                            <p>Date: {d["date"]}</p>
                            <p>Total {topic} Count: {d[yAccessor]}</p>
                        </div>
                    }
                </React.Fragment>
            )
        } 
    }
    return <ResponsiveXYFrame {...frameProps} />
}

export default XYGraph;