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
            <div>
                <h3> HelloLoginControl</h3>
                {this.state.isAutorized
                    ? <AutorizedForm peopleName={this.state.peopleName} updateState={this.getState.bind(this)} />
                    : <NotAutorizedForm updateState={this.getState.bind(this)}/>}
                <button onClick={this.getState.bind(this)}>GetState</button>
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
            peopleName: data.PeopleName 
        });
    }
    getStateResult(xhr, status) {
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

class AutorizedForm extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <h4>Hello, {this.props.peopleName}!</h4>
                <button onClick={this.logout.bind(this)}>Logout</button>
            </div>
        );
    }
    logout() {
        var tokenKey = "tokenInfo";
        sessionStorage.removeItem(tokenKey);
        this.props.updateState();
    }
}

class NotAutorizedForm extends React.Component {
    constructor(props) {
        super(props);        
    }
    render() {
        return (
            <div class="NotAutorizedForm">
                <h3>Autorization</h3>
                <label>Email</label><br />
                <input type="email" ref={(input) => { this.loginInput = input; }} /> <br /><br />
                <label>Password</label><br />
                <input type="password" ref={(input) => { this.passwordInput = input; }} /><br /><br />
                <input type="submit" value="Login" onClick={this.login.bind(this)} />
            </div>
        );
    }
    login() {
        var loginData = {
            grant_type: 'password',
            username: this.loginInput.value,
            password: this.passwordInput.value
        };

        $.ajax({
            type: 'POST',
            url: '/Token',
            data: loginData
        }).success(
            this.Logined.bind(this)
        ).fail(function (data) {
            alert('При логине возникла ошибка');
        });
    }
    Logined(data) {
        var tokenKey = "tokenInfo";
        sessionStorage.setItem(tokenKey, data.access_token);
        this.props.updateState();
    }
}

ReactDOM.render(
    <LoginControl />,
    document.getElementById("LoginControl")
);