import React from 'react';
import Paper from 'material-ui/Paper';
import {Polar} from 'react-chartjs-2';
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
            var themeColor = ['rgba(255, 99, 132, 0.75)', 'rgba(75, 192, 192, 0.75)', 'rgba(255, 206, 86, 0.75)', 'rgba(231, 233, 237, 0.75)', 'rgba(54, 162, 235, 0.75)'];
            let backgroundColor = themeColor.sort((a, b) => 0.5 - Math.random());
            let hoverBackgroundColor = backgroundColor.slice().map(x => x.replace(new RegExp('0.75', 'gi'), '1'));

            const data = {
                datasets: [
                    {
                        data: [
                            info.answers[0].responses, info.answers[1].responses, info.answers[2].responses
                        ],
                        backgroundColor: backgroundColor,
                        borderWidth: 2,
                        hoverBackgroundColor: hoverBackgroundColor,
                        label: 'My dataset'
                    }
                ],
                labels: [info.answers[0].text, info.answers[1].text, info.answers[2].text]
            };

            const options = {
                legend: {
                    // hide the polar grid
                    // display: false
                    labels: {
                        fontSize: 13
                    }
                },
                scale: {
                    display: false
                },
                startAngle: Math.random() * 5
            }

            surveyReport.push(
                <div key={info.id} className="doughnut-chart-pack" style={{
                    margin: '20px 0 0'
                }}>
                    <h4 className="doughnut-chart-header">{info.text}</h4>
                    <div className='doughnut-chart'>
                        <Polar data={data} options={options}/>
                    </div>
                    <div className='data-under-chart'>
                        <div className='data-under-chart-item'>
                            <label>
                                {info.answers[0].text}&nbsp;
                            </label>
                            <span className='data-num-label' style={{
                                color: hoverBackgroundColor[0]
                            }}>
                                {info.answers[0].responses}
                            </span>
                        </div>
                        <div className='data-under-chart-item'>
                            <label>
                                {info.answers[1].text}&nbsp;
                            </label>
                            <span className='data-num-label' style={{
                                color: hoverBackgroundColor[1]
                            }}>
                                {info.answers[1].responses}
                            </span>
                        </div>
                        <div className='data-under-chart-item'>
                            <label>
                                {info.answers[2].text}&nbsp;
                            </label>
                            <span className='data-num-label' style={{
                                color: hoverBackgroundColor[2]
                            }}>
                                {info.answers[2].responses}
                            </span>
                        </div>
                    </div>
                </div>
            );
        });
        return surveyReport;
    }

    render() {
        const reportPaperStyle = {
            margin: '20px',
            padding: '20px',
            position: 'relative',
            height: '96%'
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
