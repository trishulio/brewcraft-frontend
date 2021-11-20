import React, { Component } from 'react';
import {
  Col,
  Row,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import C3Chart from 'react-c3js';
import 'c3/c3.css';

class PieChart extends Component {

    render() {
        const data = {
            columns: [
                ["Fantastic Lager",78],["Special Ale",55],["Warm Stout",40],["Delicious IPA",25]
            ],
            type:"pie",
          };
          const color = {pattern:["#f0f1f4","#7a6fbe","#28bbe3","#2f8ee0"]}
          const pie = {
              label:{show:!1}
            }

        return (
            <React.Fragment>
               <C3Chart data={data} pie={pie} color={color}/>
            </React.Fragment>
        );
    }
}

export default function FinishedGoodsPieChart() {
    return (
        <Card  className="m-b-20">
            <CardHeader>
                <h4 className="card-title mb-1">Finished-Goods Inventory</h4>
            </CardHeader>
            <CardBody>
                <div id="pie-chart" dir="ltr">
                    <PieChart/>
                </div>
            </CardBody>
        </Card>
    );
}