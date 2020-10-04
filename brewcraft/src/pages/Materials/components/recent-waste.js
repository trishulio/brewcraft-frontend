import React, { Component } from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    Button
} from "reactstrap";
import TransactionTable from "../../../component/TransactionsTable";

class RecentWaste extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [{
                text: "Hi",
                dataField: "hi"
            }],
            data: [{ hi: 1}, { hi: 2}]
        };
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <h4 className="card-title float-left">Recent Waste</h4>
                    <TransactionTable {...this.state} />
                </CardBody>
                <CardFooter>
                    <Button type="button" outline className="float-right waves-effect waves-light">View Records</Button>
                </CardFooter>
            </Card>
        );
    }
}

export default RecentWaste;