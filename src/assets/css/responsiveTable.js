import styled from 'styled-components';
import * as global from './variables';

export const ResponsiveTable = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin-bottom: 40px;
    background-color: ${global.background_color};
    font-size: 15px;

    thead{
        color: ${global.light_font_color};
        font-weight: bold;
        letter-spacing: 0.3px;

        td{
            padding: 15px;
            background-color: ${global.background_color};
        }
    }
    td {
        padding: 7px 15px;
        border: none;
    }
    tr{
        box-shadow: 0px 0px 5px ${global.background_color};
        background-color: #fff;

        td { 
            border-width: 2px;
            border-color: ${global.background_color};
            border-top-style: solid;
            border-bottom-style: solid; 

            &:first-child { 
                border-top-style: solid;
                border-left-style: solid;
                border-top-left-radius: 10px; 
                border-bottom-left-radius: 10px; 
            }
            &:last-child { 
                border-right-style: solid;
                border-bottom-right-radius: 10px; 
                border-top-right-radius: 10px;

                td:first-child {
                    border-bottom-style: solid;
                    border-bottom-left-radius: 10px;
                 }
            }
        }
    }

    @media(max-width: 600px) {
        thead {
            visibility: hidden;
            height: 0;
            position: absolute;
          }
        tr {
            display: block;
            margin-bottom: .625em;
            background-color: ${global.background_color};
        }
        td {
            display: flex;
            justify-content: space-between;
            font-size: .8em;
            text-align: right;
            border-radius: 10px; 
            background-color: #fff;

            &::before {
                content: attr(data-label);
                float: left;
                font-weight: bold;
                text-transform: uppercase;
              }
          }
    }
    
`