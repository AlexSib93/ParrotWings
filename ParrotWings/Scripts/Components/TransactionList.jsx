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
            <table>
                <thead>
                    <th>People</th>
                    <th>Recepient</th>
                    <th>Amount</th>
                    <th>DateTime</th>
                </thead>
                <TransactionRows transactions={this.state.transactions} />
            </table>
        );
    }
    componentDidMount() {
        $.ajax({
            type: 'GET',
            url: '/api/transaction',
            success: function (data) {
                this.setState({ transactions: data });
            }.bind(this)
        });

        var data =
            [{
                Recepient: '123@mail',
                People: '321@mail',
                Amount: '1000',
                DateTime: '02.03.2017'
            },
            {
                Recepient: 'adfasdfad@mail',
                People: '3adfads21@mail',
                Amount: '10asd00',
                DateTime: '02.03.sd2017'
                }]
    }
}

ReactDOM.render(
    <TransactinList />,
    document.getElementById("transactionList")
);