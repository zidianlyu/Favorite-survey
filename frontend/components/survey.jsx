import React from 'react';
import surveyAction from '../actions/surveyAction';
import Report from './report';

import Paper from 'material-ui/Paper'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Divider from 'material-ui/Divider';
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';

import ContentCreate from 'material-ui/svg-icons/content/create';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import {blue300, indigo900} from 'material-ui/styles/colors';

class Survey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionId: '',
            answerId: '',
            snackBarOpen: false,
            snackBarMsg: '',
            optionTrigger: false,
            stepIdx: 1,
            stepLabel: 'Start',
            stepMsg: 'Please share your thought!',
            stepClass: 'alert alert-info text-center',
            optionStack: [...Array(this.props.store.getState().length).keys()].sort((a, b) => 0.5 - Math.random())
        }
        this.surveyAction = surveyAction.bind(this);
    }

    updateCheckBoxInfo = (e, questionId) => {
        let msg = 'Added ' + this.props.store.getState().filter(x => x.id === questionId)[0].answers.filter(x => x.id === parseInt(e.target.value))[0].text + ' to the survey!';
        this.setState({
            questionId: questionId,
            answerId: parseInt(e.target.value),
            snackBarMsg: msg,
            optionTrigger: true
        })
    }

    updateSurveyState = (e) => {
        this.props.store.dispatch(this.surveyAction(this.state.questionId, this.state.answerId));
        this.props.updateStore();
        this.handleSnackBarOpen();
        this.state.optionStack.shift();
        if (this.state.optionStack.length === 0) {
            this.setState({
                optionStack: [...Array(this.props.store.getState().length).keys()].sort((a, b) => 0.5 - Math.random()),
                stepIdx: 1,
                stepLabel: 'Retake',
                stepClass: 'alert alert-success text-center font-weight-bold',
                stepMsg: 'Appreciate your time!'
            })
        }
        this.setState({optionTrigger: false, questionId: 0, answerId: 0})
    }

    handleSnackBarOpen = () => {
        this.setState({snackBarOpen: true});
    };

    handleSnackBarClose = () => {
        this.setState({snackBarOpen: false});
    };

    moveToNextStep = (e) => {
        if (this.state.stepIdx === 1) {
            this.setState({stepIdx: 2, stepLabel: 'Ongoing'})
        }
    }
    handleClickChip(s) {
        this.setState({snackBarMsg: s});
        this.handleSnackBarOpen();
    }

    render() {
        const surveyPaperStyle = {
            margin: '20px',
            padding: '20px',
            position: 'relative',
            height: '96%'
        };

        const checkBoxStyles = {
            radioButton: {
                marginBottom: 16
            }
        };

        const submitBtnStyle = {
            display: 'block',
            width: '120px',
            margin: '0 auto'
        };

        const chipStyles = {
            chip: {
                margin: 4
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap'
            }
        };

        let surveyInput = this.props.store.getState().map(info => (
            <div key={info.id} className="survey-item">
                <h4>
                    <span>#{this.props.store.getState().length + 1 - this.state.optionStack.length}&nbsp;</span>{info.text}
                </h4>
                <Divider/>
                <div className="survey-item-input-group">
                    <RadioButtonGroup name="survey" valueSelected={this.state.answerId} onChange={(e) => this.updateCheckBoxInfo(e, info.id)}>
                        <RadioButton label={info.answers[0].text} value={1} checkedIcon={< ActionFavorite />} uncheckedIcon={< ActionFavoriteBorder />} style={checkBoxStyles.radioButton} labelStyle={{
                            color: '#FF6384'
                        }}/>
                        <RadioButton label={info.answers[1].text} value={2} checkedIcon={< ActionFavorite />} uncheckedIcon={< ActionFavoriteBorder />} style={checkBoxStyles.radioButton} labelStyle={{
                            color: '#FF6384'
                        }}/>
                        <RadioButton label={info.answers[2].text} value={3} checkedIcon={< ActionFavorite />} uncheckedIcon={< ActionFavoriteBorder />} style={checkBoxStyles.radioButton} labelStyle={{
                            color: '#FF6384'
                        }}/>
                    </RadioButtonGroup>
                </div>
                {this.state.optionTrigger
                    ? (
                        <div>
                            <RaisedButton label="Submit" secondary={true} style={submitBtnStyle} onClick={(e) => this.updateSurveyState(e)}/>
                        </div>
                    )
                    : (
                        <div className='survey-option-alert'>
                            <span className="alert alert-warning option-tips">Please make an option</span>
                        </div>
                    )}
            </div>
        ));

        return (
            <div className="survey-container">
                <Paper style={surveyPaperStyle} zDepth={4}>
                    <div className="survey-top-bar"></div>
                    <div className="survey-top-header">
                        <FloatingActionButton>
                            <ContentCreate/>
                        </FloatingActionButton>
                    </div>
                    {this.state.stepIdx === 1
                        ? (
                            <div className="survey-body">
                                <h4 className="init-survey-hearder text-center">A survey about favorite</h4>
                                <p className={this.state.stepClass}>{this.state.stepMsg}</p>
                                <RaisedButton label={this.state.stepLabel} primary={true} style={submitBtnStyle} onClick={(e) => this.moveToNextStep(e)}/>
                            </div>
                        )
                        : (
                            <div className="survey-body">
                                {surveyInput[this.state.optionStack[0]]}
                            </div>
                        )}
                    <Card style={{
                        margin: '25px 0 0',
                        height: '358px',
                    }}>
                        <CardHeader title="Zidian Lyu" subtitle="Software Engineer" avatar="asset/img/profile_img.jpg"/>
                        <Divider/>
                        <CardTitle title="Survey Project" titleStyle={{fontSize: '20px'}} subtitle="Sep-2017"/>
                        <Divider/>
                        <CardText>
                            <div className="chip-wrapper" style={chipStyles.wrapper}>
                                <Chip onClick={() => this.handleClickChip('The first language that I learn about web development!')} style={chipStyles.chip}>
                                    <Avatar size={32}>
                                        <i className="devicon-html5-plain colored"></i>
                                    </Avatar>
                                    HTML5
                                </Chip>
                                <Chip onClick={() => this.handleClickChip('An enchanting magic for visual pleasure!')} style={chipStyles.chip}>
                                    <Avatar size={32}>
                                        <i className="devicon-css3-plain colored"></i>
                                    </Avatar>
                                    CSS3
                                </Chip>
                                <Chip onClick={() => this.handleClickChip('The prossional CSS-based framework that I use in most of my development.')} style={chipStyles.chip}>
                                    <Avatar size={32}>
                                        <i className="devicon-bootstrap-plain-wordmark colored"></i>
                                    </Avatar>
                                    Boostrap
                                </Chip>
                                <Chip onClick={() => this.handleClickChip('I used Reactjs to develope this project. Please reach out to me for more demos!')} style={chipStyles.chip}>
                                    <Avatar size={32}>
                                        <i className="devicon-react-original colored"></i>
                                    </Avatar>
                                    Reactjs
                                </Chip>
                                <Chip onClick={() => this.handleClickChip('I am developing in Django-base web framework in my work.')} style={chipStyles.chip}>
                                    <Avatar size={32}>
                                        <i className="devicon-django-plain colored" style={{fontSize: '24px'}}></i>
                                    </Avatar>
                                    Django
                                </Chip>
                                <Chip onClick={() => this.handleClickChip('Please feel free to ask me for a Flask project demo!')} style={chipStyles.chip}>
                                    <Avatar size={32}>
                                        <i className="fa fa-flask"></i>
                                    </Avatar>
                                    Flask
                                </Chip>
                                <Chip onClick={() => this.handleClickChip('I am happy to show you my Rails project demo!')} style={chipStyles.chip}>
                                    <Avatar size={32}>
                                        <i className="devicon-rails-plain colored"></i>
                                    </Avatar>
                                    Rails
                                </Chip>
                                <Chip onClick={() => this.handleClickChip('The IDE that I feel the most comfortable to work with.')} style={chipStyles.chip}>
                                    <Avatar size={32}>
                                        <i className="devicon-atom-original colored"></i>
                                    </Avatar>
                                    Atom
                                </Chip>
                                <Chip onClick={() => this.handleClickChip('The database that I work with in my work.')} style={chipStyles.chip}>
                                    <Avatar size={32}>
                                        <i className="devicon-mysql-plain colored"></i>
                                    </Avatar>
                                    MySQL
                                </Chip>
                                <Chip onClick={() => this.handleClickChip('The database that I personally like the best, appreciate for its flexibility!')} style={chipStyles.chip}>
                                    <Avatar size={32}>
                                        <i className="devicon-postgresql-plain colored"></i>
                                    </Avatar>
                                    PostgreSQL
                                </Chip>
                                <Chip onClick={() => this.handleClickChip('The tools that I use for code commitment.')} style={chipStyles.chip}>
                                    <Avatar size={32}>
                                        <i className="devicon-git-plain colored"></i>
                                    </Avatar>
                                    Git
                                </Chip>
                                <Chip onClick={() => this.handleClickChip('The site I use the most to deploy my personal projects.')} style={chipStyles.chip}>
                                    <Avatar size={32}>
                                        <i className="devicon-heroku-plain-wordmark colored"></i>
                                    </Avatar>
                                    Heroku
                                </Chip>
                            </div>
                        </CardText>
                    </Card>
                    <Snackbar open={this.state.snackBarOpen} message={this.state.snackBarMsg} autoHideDuration={1700} onRequestClose={this.handleSnackBarClose}/>
                </Paper>
            </div>
        )
    }
}

export default Survey;
