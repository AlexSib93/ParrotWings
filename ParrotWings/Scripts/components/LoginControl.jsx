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
                    ? <AutorizedForm peopleName={this.state.peopleName} balance={this.state.balance} updateState={this.getState.bind(this)} />
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
            peopleName: data.PeopleName,
            balance: data.Balance
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
                <h4>Hello, {this.props.peopleName}! balance: --{this.props.balance} PW--</h4>
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
        this.state = {
            mailValid: true,
            passValid: true
        }
    }
    render() {
        return (
            <div class="NotAutorizedForm">
                <h3>Autorization</h3>
                <label>Email</label><br />
                <input type="email" ref="loginmail" style={{ borderColor: this.state.mailValid ? '' : 'red' }} required /> <br /><br />
                <label>Password</label><br />
                <input type="password" ref="loginpassword" style={{ borderColor: this.state.passValid ? '' : 'red' }} required /><br /><br />
                <input type="submit" value="Login" onClick={this.login.bind(this)} />
                <input type="submit" id="regDalogShow" value="Register" onClick={this.showDiag.bind(this)} />
                <RegisterDialog ref="dialog" />
            </div>
        );
    }
    login() {
        
        if (this.validate()) {
            var loginData = {
                grant_type: 'password',
                username: this.refs.loginmail.value,
                password: this.refs.loginpassword.value
            };
            $.ajax({
                type: 'POST',
                url: '/Token',
                data: loginData
            }).success(
                this.Logined.bind(this)
                ).fail(function (data) {
                    alert('Autorization error. Please, check your mail and password!');
                });
        }
        else {
            alert('Enter valid email and password!')
        }
    }
    Logined(data) {
        var tokenKey = "tokenInfo";
        sessionStorage.setItem(tokenKey, data.access_token);
        this.props.updateState();
    }
    showDiag() {
        console.log('1');
        this.refs.dialog.show();
        console.log('2');
    }
    validate() {
        var lvalid = this.refs.loginmail.checkValidity()
        var pvalid = this.refs.loginpassword.checkValidity()
        this.setState({
            mailValid: lvalid,
            passValid: pvalid
        })
        return lvalid && pvalid;
    }
}

class RegisterDialog extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }
    render() {
        return (
            <dialog id="regDialog" style={{display: this.state.show ? 'block' : 'none' }}>
                <div>
                    <label>Email</label><br />
                    <input type="email" ref='mail' /> <br /><br />
                    <label>Password</label><br />
                    <input type="password" ref='pass'  /><br /><br />
                    <label>Confirm password</label><br />
                    <input type="password" ref='confirmpass' /><br /><br />
                    <label>First name</label><br />
                    <input type="text" ref='firstname' /><br /><br />
                    <label>Last name</label><br />
                    <input type="text" ref='lastname' /><br /><br />
                    <label>Middle name</label><br />
                    <input type="text" ref='middlename' /><br /><br />
                    <label>Birthday</label><br />
                    <input type="date" ref='birthday' /><br /><br />
                    <input type="submit" value="Register" onClick={this.register.bind(this)} />
                </div>
            </dialog>
        );
    }
    show() {
        console.log('try to show')
        this.setState({
            show: true
        })
    }
    hidden() {
        this.setState({
            show: false
        })
    }
    register() {
        console.log('123', this.refs)
        var data = {
            Email: this.refs.mail.value,
            Password: this.refs.pass.value,
            ConfirmPassword: this.refs.confirmpass.value,            
            Name: this.refs.firstname.value,
            LasName: this.refs.lastname.value,
            MiddleName: this.refs.middlename.value,
            Birthday: this.refs.birthday.value
        };
        $.ajax({
            type: 'POST',
            url: '/api/Account/Register',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (data) {
                alert("Success!" + data)
            },
            fail: function (data) {
                alert("Failed!" + data)
            }
        });
        this.hidden()
    }
}

ReactDOM.render(
    <LoginControl />,
    document.getElementById("LoginControl")
);