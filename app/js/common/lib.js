import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Calendar from 'antd/lib/calendar';

class App extends Component {
    render() {
        function onPanelChange(value, mode) {
            console.log(value, mode);
        }
        return <Calendar onPanelChange={onPanelChange} />
    }
}
module.exports = App;
