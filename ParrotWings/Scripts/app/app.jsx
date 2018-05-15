class App extends React.Component {
    render() {
        return <LoginControl />;
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("app")
);

class TransactionCreator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            People: { PeopleId: null },
            Recepient: { PeopleId: null },
            Amount: null,
            Number: null
        }
    }
    render() {
        return (<div>
            <label>Choose People</label>
            <input id="autocompl" type="text" onChange={this.onPeopleChange.bind(this)} />
            <label>Number</label>
            <input type="text" onChange={this.onNumberChange.bind(this)} />
            <label>Choose Recepient</label>
            <input type="text" onChange={this.onRecipientChange.bind(this)} />
            <label>Type amount of transaction</label>
            <input type="text" onChange={this.onAmountChange.bind(this)} />
            <li className="form-footer">
                <button className="btn -primary pull-right" onClick={this.createTransaction.bind(this)}> Continue</button>
            </li>
        </div>)

    }
    onPeopleChange(e) {
        var people = e.target.value
        this.setState(
            { People: { PeopleId: people } }
        )
    }
    onNumberChange(e) {
        var number = e.target.value
        this.setState(
            { Number: number }
        )
    }
    onRecipientChange(e) {
        var recip = e.target.recip
        this.setState(
            { Recepient: { PeopleId: people } }
        )
    }
    onAmountChange(e) {
        var amount = e.target.value
        this.setState(
            { Amount: amount }
        )
    }
    createTransaction() {
        var transaction = JSON.stringify(this.state);
        console.log("111", transaction);

        $.ajax({
            url: '/api/transaction/',
            type: 'post',
            data: transaction,//JSON.stringify(transaction),
            contentType: "application/json;charset=utf-8",
            success: function () {
                alert("All good!")
            },
            error: function () {
                alert("All bad!")
            }
        });

        console.log('----', this.state)
    }
}

class TransactionCreation extends React.Component {

    constructor() {
        super()
        this.state = {
            step: 1
        }
    }
    render() {
        switch (this.state.step) {
            case 1:
                return (
                    <AccountField key="1"
                        // fieldValues={this.props.fieldValues}
                        nextStep={this.nextStep.bind(this)}
                // saveValues={this.saveValues}
                />)
            case 2:
                return (//<h1>Sibiryakov Alexandr</h1>
                    <AmountField
                    //fieldValues={this.props.fieldValues}
                    // nextStep={this.nextStep}
                    // previousStep={this.previousStep}
                    // saveValues={this.saveValues}
                    />);
            case 3:
                return //<h1>Sibiryakov Alexandr</h1>
                <Confirmation
                    //fieldValues={this.props.fieldValues}
                    previousStep={this.previousStep}
                    confirm={this.confirm()}/>
            case 4:
                return //<h1>Sibiryakov Alexandr</h1>
                <Success
                //fieldValues={fieldValues} 
                />
        }
    }
    nextStep() {
        this.setState({
            step: this.state.step + 1
        })
    }
    // Same as nextStep, but decrementing
    previousStep() {
        this.setState({
            step: this.state.step - 1
        })
    }
    confirm() {
        this.nextStep()
    }
}

class AccountField extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <p1>Choose Recepient</p1>
                <li className="form-footer">
                    <button className="btn -primary pull-right" onClick={this.continue}> Continue</button>
                </li>
            </div>
        )
    }
    continue(e) {
        //e.preventDefault()
        // Get values via this.refs
        //var data = {
        //    name: this.refs.name.getDOMNode().value
        //}
        //this.props.saveValues(data)
        this.props.nextStep()
        //console.log('---', this.props)
    }
}

class AmountField extends React.Component {
    render() {
        return (
            <div>
                <label>Type amount of transaction</label>
                <input type="text" ref="amount" defaultValue={this.props.fieldValues.name} />
                <button className="btn -default pull-left" onClick={this.props.previousStep}>Back</button>
                <button className="btn -primary pull-right" onClick={this.nextStep}>Continue</button>
            </div>
        )
    }
    nextStep() {
        var data = {
            amount: this.refs.amount.getDOMNode().value
        }
       // this.props.saveValues(data)
        this.props.nextStep()
    }
}

class Confirmation extends React.Component {
    render() {
        return (
            <div>
                <h2>Confirm Transaction</h2>
                <ul>
                    <li><b>Recepient:</b> {this.props.fieldValues.name}</li>
                    <li><b>Amount:</b> {this.props.fieldValues.amount}</li>
                </ul>
                <ul className="form-fields">
                    <li className="form-footer">
                        <button className="btn -default pull-left" onClick={this.props.previousStep}>Back</button>
                        <button className="btn -primary pull-right" onClick={this.props.confirm}>Ok</button>
                    </li>
                </ul>
            </div>
        )
    }
}

class Success extends React.Component {
    render() {
        return (
            <div>
                <h2>Success!!!</h2>
            </div>
        )
    }
}

ReactDOM.render(
    <TransactionCreator />,
    document.getElementById("create-transaction")
);

