class CreateTransactionDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            correspondentValid: true,
            amountValid: true,
            enoughPWValid: true
        }
    }
    render() {
        return (
            <dialog id="regDialog2" className='container' style={{ display: this.state.show ? 'block' : 'none' }}>
                <div>
                    <h1> New transaction </h1><br />
                    <label>Choose the recipient</label><br /><input type="text" style={{display: 'none'}} id="txtPeopleID" ref="correspondentId" minLength="1" required />
                    <input type="text" id="correspondent" className='form-control' ref="correspondentName" style={{ borderColor: this.state.correspondentValid ? '' : 'red' }} required />
                    <ComponentWithModalDialog text="Name can not be empty" show={!this.state.correspondentValid} /><br />

                    <label>Amount of transaction</label><br />
                    <input type="number" ref="amount" id="amount" className='form-control' min='0' style={{ borderColor: this.state.amountValid ? '' : 'red' }} required />
                    <ComponentWithModalDialog text="Amount can not be empty or negative" show={!this.state.amountValid} />
                    <ComponentWithModalDialog text="You don't have enough PW" show={!this.state.enoughPWValid} /><br />

                    <input type="submit" className='btn btn-default' id="confirmTransaction" value="Create" onClick={this.createTransaction.bind(this)} />
                    <button className='btn btn-default' style={{ float: 'right' }} onClick={this.hidden.bind(this)}>Cancel</button>
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
        this.refs.correspondentName.value = '';
        this.refs.amount.value = '';
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
                complete: this.createTransactionResult.bind(this)
            });
        }
    }
    createTransactionResult(xhr, status) {
        if (xhr.status === 500) {
            alert(xhr.responseText)
        }
    }
    validate() {
        var cvalid = this.refs.correspondentId.checkValidity()
        var avalid = this.refs.amount.checkValidity()
        var enaughvalid = this.refs.amount.value <= this.props.Balance
        this.setState({
            correspondentValid: cvalid,
            amountValid: avalid,
            enoughPWValid: enaughvalid
        })
        console.log(this.refs.correspondentId.checkValidity())
        return cvalid && avalid && enaughvalid;
    }
    created(data) {
        alert("Transaction successfully created!");
        this.hidden();
        this.props.updateUserState();
    }
}

ReactDOM.render(
    <CreateTransactionDialog />,
    document.getElementById("createTransactionDialog")
);