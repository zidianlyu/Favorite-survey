import React from 'react';
import Paper from 'material-ui/Paper';
import {Doughnut} from 'react-chartjs-2';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Visibility from 'material-ui/svg-icons/action/visibility';

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resStore: this.props.store.getState()
        }
    }

    buildSurveyReport() {
        let surveyReport = [];
        this.state.resStore.map((info, idx) => {
            let themeColor = ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB'];
            let backgroundColor = themeColor.sort((a, b) => 0.5 - Math.random());
            let borderColor = backgroundColor.slice().map(x => x.replace(new RegExp('0.2', 'gi'), '1'));
            let hoverBackgroundColor = backgroundColor.slice().map(x => x.replace(new RegExp('0.2', 'gi'), '0.4'));

            const data = {
                datasets: [
                    {
                        data: [
                            info.answers[0].responses, info.answers[1].responses, info.answers[2].responses
                        ],
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,
                        hoverBackgroundColor: hoverBackgroundColor,
                        borderWidth: 1,
                        label: 'My dataset'
                    }
                ],
                labels: [info.answers[0].text, info.answers[1].text, info.answers[2].text]
            };


            surveyReport.push(
                <div key={info.id} className="doughnut-chart-pack" style={{margin: '20px 0 0'}}>
                    <h4 className="doughnut-chart-header">{info.text}</h4>
                    <div className='doughnut-chart'>
                        <Doughnut data={data}/>
                    </div>
                    <div className='data-under-chart'>
                        <div className='data-under-chart-item'>
                            <label>
                                {info.answers[0].text}&nbsp;
                            </label>
                            <span className='data-num-label' style={{
                                color: backgroundColor[0]
                            }}>
                                {info.answers[0].responses}
                            </span>
                        </div>
                        <div className='data-under-chart-item'>
                            <label>
                                {info.answers[1].text}&nbsp;
                            </label>
                            <span className='data-num-label' style={{
                                color: backgroundColor[1]
                            }}>
                                {info.answers[1].responses}
                            </span>
                        </div>
                        <div className='data-under-chart-item'>
                            <label>
                                {info.answers[2].text}&nbsp;
                            </label>
                            <span className='data-num-label' style={{
                                color: backgroundColor[2]
                            }}>
                                {info.answers[2].responses}
                            </span>
                        </div>
                    </div>
                </div>
            );
            if (idx !== this.state.resStore.length - 1) {
                surveyReport.push(<Divider key={~~(Math.random() * 100 + 3)}/>);
            }
        });
        return surveyReport;
    }

    render() {
        const reportPaperStyle = {
            margin: '20px',
            padding: '20px',
            position: 'relative',
            height: '95%',
        };

        return (
            <div className="report-container">
                <Paper style={reportPaperStyle} zDepth={4}>
                    <div className='report-top-bar'></div>
                    <div className="report-top-header">
                        <FloatingActionButton>
                            <Visibility/>
                        </FloatingActionButton>
                    </div>
                    {this.buildSurveyReport()}
                </Paper>
            </div>
        );
    }
}

export default Report;
