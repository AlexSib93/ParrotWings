class TransactinList extends React.Component {
    constructor() {
        super()
        this.state = {
            transactions: []
        }
    }
    render() {
        return (
            <div className='container table-responsive'>
                <table className='table table-bordered table-hover'>
                    <thead>
                        <tr className='active'>
                            <th>People</th>
                            <th>Correspondent</th>
                            <th>Amount</th>
                            <th>DateTime</th>
                            <th>Result balance</th>
                        </tr>
                    </thead>
                    <TransactionRows transactions={this.state.transactions} />
                </table>
                <button className='btn' onClick={this.refresh.bind(this)}>Refresh</button>
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

function TransactionRow(props) {
    const { transaction } = props
    const body =
        <tr >
            <td>{transaction.PeopleName}</td>
            <td>{transaction.RecepientName}</td>
            <td>{transaction.Amount}</td>
            <td>{(new Date(transaction.DateTime)).toDateString()}</td>
            <td>{transaction.ResultBalance}</td>
        </tr>

    return (body);
}

function TransactionRows(props) {
    const TransactionElements = props.transactions.map(transaction =>
        <TransactionRow key={transaction.ID} transaction={transaction} />)

    return (
        <tbody>
            {TransactionElements}
        </tbody>
    );

}