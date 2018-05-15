class LoginControl extends React.Component {
    constructor() {
        super()
        this.state = {
            isAutorized: false,
            peopleName: null,
            balance: null
        }
    }
    componentWillMount() {
        this.getState()
    }
    render() {
        return (
            <div className='container'>
                {this.state.isAutorized
                    ? <AutorizedForm updateState={this.getState.bind(this)} peopleName={this.state.peopleName} balance={this.state.balance} updateState={this.getState.bind(this)} />
                    : <NotAutorizedForm updateState={this.getState.bind(this)}/>}
            </div>
        );
    }
    getState() {
        $.ajax({
            type: 'GET',
            url: '/api/PeopleState',
            beforeSend: function (xhr) {
                var tokenKey = "tokenInfo";
                var token = sessionStorage.getItem(tokenKey);
                console.log("token ", token);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: this.login.bind(this),
            complete: this.getStateResult.bind(this)

        });
    }
    login(data) {
        this.setState({
            isAutorized: true,
            peopleName: data.PeopleName,
            balance: data.Balance
        });
    }
    getStateResult(xhr, status) {
        console.log('server response',xhr, status)
        if (xhr.status === 401) {
            this.logout();
        }
    }
    logout() {
        this.setState({
            isAutorized: false,
            peopleName: null,
            balance: null
        })
    }
}

ReactDOM.render(
    <LoginControl />,
    document.getElementById("LoginControl")
);