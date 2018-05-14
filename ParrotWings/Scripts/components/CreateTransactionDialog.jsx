﻿class CreateTransactionDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            correspondentValid: true,
            amountValid: true
        }
    }
    render() {
        return (
            <dialog id="regDialog2" style={{ display: this.state.show ? 'block' : 'none', width: '80%' }}>
                <div>
                    <h1> New transaction </h1><br />
                    <label>Choose the recipient</label><br /><input type="text" style={{display: 'none'}} id="txtPeopleID" ref="correspondentId" minLength="1" required />
                    <input type="text" id="correspondent" ref="correspondentName" style={{ borderColor: this.state.correspondentValid ? '' : 'red' }} required />
                    <ComponentWithModalDialog text="Name can not be empty" show={!this.state.correspondentValid} /><br />

                    <label>Amount of transaction</label><br />
                    <input type="number" ref="amount" id="amount" style={{ borderColor: this.state.amountValid ? '' : 'red' }} required />
                    <ComponentWithModalDialog text="Amount can not be empty" show={!this.state.amountValid} /><br />

                    <input type="submit" id="confirmTransaction" value="Create" onClick={this.createTransaction.bind(this)} />
                    <button style={{float: 'right'}} onClick={this.hidden.bind(this)}>Cancel</button>
                </div>
            </dialog>
        );
    }
    componentDidMount() {
        $("#correspondent").autocomplete({
            source: this.getResults.bind(this),
            search: this.search.bind(this),
            select: this.setId.bind(this),
            messages: {
                noResults: '',
                results: function () { }
            }
        });
    }
    show() {
        this.setState({
            show: true
        })
    }
    hidden() {
        this.setState({
            show: false
        })
    }
    setId(event, ui) {
        this.refs.correspondentId.value = ui.item.id;
    }
    search(event) {
        console.log('search', this.refs.correspondentId, this.refs.correspondentName)
        this.refs.correspondentId.value = '';
    }
    getResults(request, response) {
        $.ajax({
            type: 'GET',
            url: '/api/filteredPeoples',
            data: { filter: this.refs.correspondentName.value },
            success: function (data) {
                response(data);
            },
            beforeSend: function (xhr) {
                var tokenKey = "tokenInfo";
                var token = sessionStorage.getItem(tokenKey);
                console.log("token ", token);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }
        });
    }
    createTransaction() {
        if (this.validate()) {
            var data = {
                RecepientID: this.refs.correspondentId.value,
                Amount: this.refs.amount.value
            };
            console.log('WTWTF2', data);
            $.ajax({
                type: 'POST',
                url: '/api/createTransaction',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data),
                beforeSend: function (xhr) {
                    var tokenKey = "tokenInfo";
                    var token = sessionStorage.getItem(tokenKey);
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: this.created.bind(this),
                fail: function (data) {
                    alert("Creating a transaction fail.")
                }
            });
        }
    }
    validate() {
        var cvalid = this.refs.correspondentId.checkValidity()
        var avalid = this.refs.amount.checkValidity()
        this.setState({
            correspondentValid: cvalid,
            amountValid: avalid
        })
        console.log(this.refs.correspondentId.checkValidity())
        return cvalid && avalid;
    }
    created(data) {
        alert("Transaction successfully created!");
        this.hidden();
    }
}

ReactDOM.render(
    <CreateTransactionDialog />,
    document.getElementById("createTransactionDialog")
);