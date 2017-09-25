import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';
import Survey from './components/survey';
import Report from './components/report';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            store: store,
        }
    }
    updateStore = () => {
        // debugger
        this.setState({store: this.state.store})
    }
    render() {
        // console.log('init');
        // console.log(this.state.store.getState());
        // debugger
        return (
            <div id="root">
                <MuiThemeProvider id="survey-component">
                    <Survey store={this.state.store} updateStore={() => this.updateStore()}/>
                </MuiThemeProvider>
                <MuiThemeProvider id="report-component">
                    <Report store={this.state.store}/>
                </MuiThemeProvider>
            </div>
        );
    }
}
document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Root/>, document.getElementById('main'));
})
