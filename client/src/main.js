import React from 'react';
import {Router, Route, Link} from 'react-router';

class About extends React.Component {
    render() {
        return <div>about</div>;
    }
}

class Inbox extends React.Component {
    render() {
        return <div>inbox</div>;
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Wazzok</h1>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/inbox">Inbox</Link></li>
                    <li><Link to="/inbox">Inbox</Link></li>
                </ul>

                {this.props.children}
            </div>
        );
    }
}

// Finally we render a Router component with some Routes.
// It does all the fancy routing stuff for us.
React.render((
    <Router>
        <Route path="/" component={App}>
            <Route path="about" component={About} />
            <Route path="inbox" component={Inbox} />
        </Route>
    </Router>
), document.body);
