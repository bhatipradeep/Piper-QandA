const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

var questions = [];
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/',(req,res)=>{
    const allQuestions = questions.map(q => ({
        id : q.id,
        title : q.title,
        descritption : q.descritption,
        answers : q.answers
    }));
    res.send(allQuestion);
})

app.get('/:id',(req,res)=>{
    const question = questions.filter(q => (q.id === parseInt(req.params.id)));
    if(question.length>1){
        return res.status(500).send();
    }
    if(question.length==0){
        return res.status(404).send();
    }
    res.send(question[0]);
})

app.post('/',(req,res) => {
    const {title,descritption} = req.body;
    const newQuestion = {
        id : questions.length-1,
        title,
        descritption,
        answers : [] 
    }
    questions.push(newQuestion)
    res.status(200).send;
})


app.post('answer/:id',(req,res) => {
    const {answer} = req.body;
    const question = questions.filter(q => (q.id === req.params.id));
    if(question.length>1){
        res.status(500).send;
    }
    if(question.length==0){
        res.status(404).send;
    }
    question[0].answer.push({
        answer,
    });
    res.status(200).send();
})

app.listen(8081, () => {
    console.log('listening on port 8081');
});