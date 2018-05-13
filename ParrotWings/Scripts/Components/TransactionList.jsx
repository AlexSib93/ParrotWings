function TransactionRow(props) {
    const { transaction } = props
    const body =
        <tr >
            <td>{transaction.PeopleName}</td>
            <td>{transaction.RecepientName}</td>
            <td>{transaction.Amount}</td>
            <td>{transaction.DateTime}</td>
        </tr>
        
    return (
        <div>
            {body}
        </div>
    );
}

function TransactionRows(props) {
    const TransactionElements = props.transactions.map(transaction =>
            <TransactionRow transaction={transaction} />)

    return (
        <tbody>
            {TransactionElements}
        </tbody>
    );

}

class TransactinList extends React.Component {
    constructor() {
        super()
        this.state = {
            transactions: []
        }
    }
    render() {

        console.log('TransactionList.State', this.state.transactions );
        return (
            <div>
            <table>
                <thead>
                    <th>People</th>
                    <th>Recepient</th>
                    <th>Amount</th>
                    <th>DateTime</th>
                </thead>
                <TransactionRows transactions={this.state.transactions} />
            </table>
            <button onClick={this.refresh.bind(this)}>Refresh</button>
            </div>
        );
    }
    componentDidMount() {
        this.refresh();
    }
    refresh() {
        $.ajax({
            type: 'GET',
            url: '/api/transaction',
            beforeSend: function (xhr) {
                var tokenKey = "tokenInfo";
                var token = sessionStorage.getItem(tokenKey);
                console.log("token ", token);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function (data) {
                this.setState({ transactions: data });
            }.bind(this)
        });
    }
}

ReactDOM.render(
    <TransactinList />,
    document.getElementById("transactionList")
);