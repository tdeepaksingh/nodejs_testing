const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());
const courses=[
    { id:1, name: "course1"},
    { id:2, name: "course2"},
    { id:3, name: "course3"}
]

app.get('/:id', (req ,res) =>{
res.send(`Hello there ! id is ${req.params.id}`);
});
app.post('/course',(req,res)=>{
    const { error } = validatecourse(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
    }
    const course = {
        id : courses.length + 1,
        name : req.body.name
    }
    courses.push(course);
    res.send(courses);
    
});

app.put('/course/:id',(req,res)=>{
    const course = courses.find(c => c.id===parseInt(req.params.id));
    const { error } = validatecourse(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    
    if(!course){
        return res.status(404).send('Given Course does not exists');
    }

    course.name=req.body.name;
    res.send(courses);


});
app.delete('/course/del/:id',(req,res) => {
    const course = courses.find( c => c.id===parseInt(req.params.id));
    if(!course){
        res.status(404).send('course not found');
    }
    const i = courses.indexOf(course);
    courses.splice(i,1);

    res.send(courses);



});




function validatecourse(course){
    const schema={
       name : Joi.string().min(3).required()
    };
    return Joi.validate(course,schema);
}


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server Start at ${port}`));

