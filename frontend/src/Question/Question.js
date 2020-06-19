import React from 'react'
import axios from 'axios';
import SubmitAnswer from './SubmitAnswer';
import auth0Client from '../Auth0';

class Question extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            question:null
        }
        this.submitAnswer = this.submitAnswer.bind(this);
    }
    async componentDidMount(){
        await this.refreshQuestions()
    }
    async refreshQuestions(){
        const { match: { params } } = this.props;
        const question = (await axios.get(`http://localhost:8081/${params.questionId}`)).data;
        this.setState({
            question : question
        })
    }

    async submitAnswer(answer) {
        await axios.post(`http://localhost:8081/answer/${this.state.question.id}`, {
          answer,
        }, {
          headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        });
        await this.refreshQuestions();
    }

    render(){
        const question = this.state.question;
        if(question === null) return <p>Loading ... </p>
        return (
            <div className="container">
            <div className="row">
            <div className="jumbotron col-12">
                <h1 className="display-3">{question.title}</h1>
                <p className="lead">{question.description}</p>
                <hr className="my-4" />
                <SubmitAnswer questionId={question.id} submitAnswer={this.submitAnswer} />
                <p>Answers:</p>
                {
                question.answers.map((answer, idx) => (
                    <p className="lead" key={idx}>{answer.answer}</p>
                ))
                }
            </div>
            </div>
            </div>
        )
    }
} 

export default Question