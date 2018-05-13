//import React from 'React'
//import {render} from 'react-dom'

class Hello extends React.Component {
    render() {
        return <h1>Привет, React.JS</h1>;
    }
}

ReactDOM.render(
    <Hello />,
    document.getElementById("content")
);

//class UserInfo extends React.Component {
//    constructor(props) {
//        super(props);
//        this.state = { data: props.login };
//    }
//    render() {
//        return (
//            <div>
//                <div>
//                    <div className='card'>
//                        <h1>Sibiryakov Alexandr</h1>
//                    </div>
//                    <div style={{ float: 'right' }}>
//                        <button >Exit</button>
//                    </div>
//                </div>
//                <div>
//                    <h2>- 7000 PW -</h2>
//                </div>
//            </div>
//        );
//    }
//}

//class InputAutocomplete extends React.Component {
//    constructor(props) {
//        super(props)
//        this.state = {
//            SelectedId: null,
//            availableTags: [
//                { value: "Испанский", id: "6E49B2B05445" },
//                { value: "Итальянский", id: "6E49B2B05445" },
//                { value: "Английский", id: "6E49B2B05445" },
//                { value: "Китайский", id: "6E49B2B05445" },
//                { value: "Русский", id: "6E49B2B05445" }]
//        }
//        console.log("good", this.state.availableTags);
//    }
//    render() {
//        return (
//            <div>
//                <div id="txtAllowSearchID"></div>
//                <label>Choose People</label>
//                <input id="autocompl" type="text" />
//                <button id="showbutton">Show compl</button>
//            </div>
//        );
//    }
//    componentDidMount() {
//        console.log("may be good?");
//        $("#autocompl").autocomplete({
//            source: availableTags
//        });
//        //    search: function (event) {
//        //        ////$("#txtAllowSearchID").val('');
//        //        //this.setState(
//        //        //    { SelectedId: null }
//        //        //);
//        //    },
//        //    select: function (event, ui) {
//        //        //// $("#txtAllowSearchID").val(ui.item.id);
//        //        //this.setState(
//        //        //    { SelectedId: ui.item.id }
//        //        //);
//        //    }
//        //});
//        //$('#showbutton').click(function () {
//        //    alert($("#txtAllowSearchID").val()) // get the id from the hidden input
//        //});
//        console.log("yes, all good!");
//    }   

//}

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
        //console.log('123123123123', transaction);
        //var request = new XMLHttpRequest();
        //request.open('POST', '/api/transaction', true);
        //request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        //request.send(transaction);

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

        //if (request.status != 200) {
        //    // обработать ошибку
        //    alert(request.status + ': ' + request.statusText +'ДЕЛА вот такие'); // пример вывода: 404: Not Found
        //} else {
        //    // вывести результат
        //    alert(request.responseText + 'вОТ ТАКИЕ ДЕЛА'); // responseText -- текст ответа.
        //}

        console.log('----', this.state)
    }
}

//class TransactionRow extends React.Component {
//    constructor(props) {
//        super(props)
//        this.state = {
//            transaction = props.transaction
//        }
//    }
//    render() {
//        return (
//            <tr>
//                <td>{this.state.data.DateTime}</td>
//                <td>{this.state.data.Correspondent}</td>
//                <td>{this.state.data.Amount}</td>
//                <td>{this.state.data.ResultBalance}</td>
//            </tr>
//        );
//    }
//}

//class TransactionList ({ transactions }) {
//    const transactionRows = transactions.map((transaction, index) =>
//        <tr>
//            <td>{this.state.data.DateTime}</td>
//            <td>{this.state.data.Correspondent}</td>
//            <td>{this.state.data.Amount}</td>
//            <td>{this.state.data.ResultBalance}</td>
//        </tr>
//    )
//    return (
//        {transactionRows}    
//    )
//}

//ReactDOM.render(
//    <UserInfo />,
//    document.getElementById("people-info")
//);



// file: Registration.jsx
//var React = require('react')
//var AccountFields = require('./AccountFields')
//var SurveyFields = require('./SurveyFields')
//var Confirmation = require('./Confirmation')
//var Success = require('./Success')


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

//class LoginBox extends React.Component {
//    constructor() {
//        super()
//        this.state = {
//            showUserInfo: false,
//            showLoginForms: true
//        }
//    }
//    render() {
//        return (
//            <div>
//                <div className="userInfo" style={{ display: this.state.showUserInfo ? "block" :"none" }}>
//                    <p>Вы вошли как: <span className="userName"></span></p>
//                    <input type="button" value="Выйти" id="logOut" onClick={this.collapseUserInfo.bind(this)} />
//                </div>
//                <div className="loginForm" style={{ display: this.state.showLoginForms ? "block" : "none" }}>
//                    <h3>Вход на сайт</h3>
//                    <label>Введите email</label><br />
//                    <input type="email" id="emailLogin" /> <br /><br />
//                    <label>Введите пароль</label><br />
//                    <input type="password" id="passwordLogin" /><br /><br />
//                    <input type="submit" id="submitLogin" value="Логин" />
//                </div>
//            </div>
//        );
//    }
//    collapseUserInfo = () => {

//        console.log("setState NOW!!!!", this.state);
//        this.setState({
//            showUserInfo: false,
//            showLoginForms: true
//        })


//        console.log("setState Good!!!!", this.state);
//    }
//}

ReactDOM.render(
    <LoginBox />,
    document.getElementById("LoginBox")
);

ReactDOM.render(
    <TransactionCreator />,
    document.getElementById("create-transaction")
);

