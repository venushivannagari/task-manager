import styled from 'styled-components';
import * as global from './variables';

const basicColors = {
    "completed" : {
        "bg" : global.success_background,
        "color": global.success_font_color
    },
    "inprogress": {
        "bg" : global.primary_background,
        "color": global.primary_font_color
    }
}

export const Badge = styled.span`
    padding: 0.85em 1.1em;
    background-color: ${(props) => basicColors[props.status] ? basicColors[props.status]["bg"] : "#f4f4f4"};
    color: ${(props) => basicColors[props.status] ? basicColors[props.status]["color"] : "#000"};
    text-transform: uppercase;
    display: inline-block;
    font-size: 0.75em;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.375rem;
`