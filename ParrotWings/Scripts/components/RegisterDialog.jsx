class RegisterDialog extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            mailValid: true,
            passValid: true,
            confirmpassValid: true,
            birthdayValid: true,         
            nameValid: true
        }
    }
    render() {
        return (
            <dialog id="regDialog" className='container' style={{ display: this.state.show ? 'block' : 'none' }}>
                <div >
                    <h1> Registration </h1><br />
                    <div >
                        <label>Email</label><br />
                        <input type="email" ref='mail' className='form-control' style={{ borderColor: this.state.mailValid ? '' : 'red' }} required />
                        <ComponentWithModalDialog text="Not valid mail" show={!this.state.mailValid} /><br /><br />

                        <label>Password</label><br />
                        <input type="password" ref='pass' className='form-control' style={{ borderColor: this.state.passValid ? '' : 'red' }} required />
                        <ComponentWithModalDialog text="Not valid password" show={!this.state.passValid} /><br /><br />

                        <label>Confirm password</label><br />
                        <input type="password" ref='confirmpass' className='form-control' style={{ borderColor: this.state.confirmpassValid ? '' : 'red' }} required />
                        <ComponentWithModalDialog text="Not valid password" show={!this.state.confirmpassValid} /><br /><br />

                        <label>First name</label><br />
                        <input type="text" ref='firstname' className='form-control' style={{ borderColor: this.state.nameValid ? '' : 'red' }} required />
                        <ComponentWithModalDialog text="Name can not be empty" show={!this.state.nameValid} /><br /><br />

                        <label>Last name</label><br />
                        <input type="text" ref='lastname' className='form-control' /><br /><br />

                        <label>Middle name</label><br />
                        <input type="text" className='form-control' ref='middlename' /><br /><br />

                        <label>Birthday</label><br />
                        <input type="date" className='form-control' ref='birthday' style={{ borderColor: this.state.birthdayValid ? '' : 'red' }} />
                        <ComponentWithModalDialog text="Date not valid" show={!this.state.birthdayValid} /><br /><br />

                        <input type="submit" className='btn btn-success' value="Register" onClick={this.register.bind(this)} />
                        <button className='btn btn-default' style={{ float: 'right' }} onClick={this.hidden.bind(this)}>Cancel</button>
                    </div>
                </div>
            </dialog>
        );
    }
    show() {
        this.setState({
            show: true
        })
    }
    hidden() {
        this.setState({
            show: false
        });
        this.refs.mail.value = '';
        this.refs.pass.value = '';
        this.refs.confirmpass.value = '';
        this.refs.firstname.value = '';
        this.refs.lastname.value = '';
        this.refs.middlename.value = '';
        this.refs.birthday.value = '';
    }
    register() {
        if (this.validate()) {
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
                complete: this.registrationResult.bind(this)
            });
            this.hidden()
        }        
    }
    registrationResult(xhr, status) {
        if (xhr.status === 400 || xhr.status === 500)
            alert(xhr.responseText)
    }
    validate() {
        var lvalid = this.refs.mail.checkValidity()
        var pvalid = this.refs.pass.checkValidity()
        var confpvalid = this.refs.confirmpass.checkValidity()
        var namevalid = this.refs.firstname.checkValidity()
        var birthvalid = this.refs.birthday.checkValidity()
        var confirmpassvalid = confpvalid
            && (this.refs.confirmpass.value == this.refs.pass.value)
        this.setState({
            mailValid: lvalid,
            passValid: pvalid,
            confirmpassValid: confirmpassvalid,
            nameValid: namevalid,
            birthValid: birthvalid
        })
        return lvalid
            && pvalid
            && namevalid
            && birthvalid
            && confirmpassvalid;
    }
}