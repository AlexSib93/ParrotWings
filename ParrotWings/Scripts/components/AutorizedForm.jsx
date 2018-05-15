class AutorizedForm extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <h2>Hello, {this.props.peopleName}! <button className='btn btn-default' onClick={this.logout.bind(this)}>Logout</button> </h2>
                <h3>Balance: --{this.props.balance} PW--<button className='btn btn-default' onClick={this.props.updateState.bind(this)}>Update</button>
                    <button className='btn btn-default' onClick={this.createTransact.bind(this)}>Create transaction</button> </h3>
                <CreateTransactionDialog Balance={this.props.balance} updateUserState={this.props.updateState.bind(this)} ref="transactCreation" />
                <TransactinList />
            </div>
        );
    }
    logout() {
        var tokenKey = "tokenInfo";
        sessionStorage.removeItem(tokenKey);
        this.props.updateState();
    }
    createTransact() {
        this.refs.transactCreation.show();
    }
}