//import React from 'React'
//import {render} from 'react-dom'

class Hello extends React.Component {
    render() {
        return <h1>Привет, React.JS</h1>;
    }
}

ReactDOM.render(
    <Hello />,
    document.getElementById("content")
);

class HelloWorld extends React.Component {
    render() {
        return (
            <div>
                <h1> Hello world with REACT </h1>
                <h3>
                    current date: {(new Date()).toDateString()}
                </h3>
            </div>
        )
    }    
}

ReactDOM.render(
    <HelloWorld />,
    document.getElementById("newcontent")
);


//function People() {
//    return (
//        <div>
//            <h1> Name </h1>
//            <h1> LastName </h1>
//        </div>
//    )
//}