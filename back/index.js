const express = require('express');
const cors = require('cors');
const app = express();

let userdata = [
    { user_num: 1, id: 'test', pw: 'test', name: '테스트' },
];

let classification = [
    { classification_num: 1, classification_name: '일반', user_num: 1 }
];

let todos = []
app.use(express.json());
app.use(cors());

app.listen(8080, function () {
    console.log("listening on 8080");
});

app.get('/mypage/userinfo/:num', (req, res) => {
    const user_num = Number(req.params.num);
    const userInfo = userdata.find(user => user.user_num === user_num);
    if (userInfo) {
        res.send({ name: userInfo.name });
    } else {
        res.send({ ok: false });
    }
});

app.get('/idcheck/:id', function (req, res) {
    const id = req.params.id;
    const idcheck = userdata.some(user => user.id === id);
    res.send({ "ok": !idcheck });
});

app.post('/signup',function (req, res) {
    const {id, pw, name} = req.body;
    const idcheck = userdata.some(user => user.id === id);

    if (idcheck) {
        res.send({ "ok": false });
    } else if (id && pw && name) {
        const newUser = { user_num: userdata.length + 1, id, pw, name };
        const newClassification = { classification_num : classification.length +1, classification_name : '일반', user_num : newUser.user_num};
        userdata.push(newUser);
        classification.push(newClassification);

        console.log("회원가입 완료 : ", userdata);
        console.log(classification);
        res.send({ "ok": true });
    } else {
        res.send({ "ok": false });
    }
});

app.get('/login/:id/:pw', function (req, res) {
    const id = req.params.id;
    const pw = req.params.pw;
    if (id && pw) {
        const user = userdata.find(user => user.id === id && user.pw === pw);

        if (user) {
            res.send({
                "ok": true,
                user_num: user.user_num
            });
        } else {
            res.send({ "ok": false });
        }
    } else {
        res.send({ "ok": false });
    }
});

app.post('/classification/add', (req, res) => {
    const { user_num, classification_name } = req.body;
    const user_number = Number(user_num);
    if (user_number && classification_name) {
        const newClassification = {
            classification_num: classification.length + 1,
            classification_name,
            user_num : user_number,
        };
        
        classification.push(newClassification);
        
        console.log("새 분류 추가: ", newClassification);
        res.send({ "ok": true, classification: newClassification });
    } else {
        res.send({ "ok": false, message: "잘못된 데이터" });
    }
});

app.get('/classifications/:user_num', (req, res) => {
    const user_num = Number(req.params.user_num);
    
    const filteredclassification = classification.filter(item => item.user_num === user_num);
    
    res.send(filteredclassification);
});

app.delete('/classification/delete/:classification_num', (req, res) => {
    const { classification_num } = req.params;
    const classificationIndex = classification.findIndex(item => item.classification_num === Number(classification_num));
    
    if (classificationIndex !== -1) {
        classification.splice(classificationIndex, 1);
        res.send({ ok: true });
    } else {
        res.send({ ok: false, message: "Classification not found" });
    }
});

app.post('/todos/add', (req, res) => {
    const { user_num, title, classification_name, priority, due_date } = req.body;

    if (!user_num || !title || !classification_name || !priority || !due_date) {
        return res.send({ ok: false, message: "잘못된 데이터" });
    }

    const user_number = Number(user_num);
    const newTodo = {
        id: todos.length + 1,
        title,
        classification_name,
        priority,
        due_date, 
        complete : false,
        user_num: user_number
    };

    todos.push(newTodo);
    console.log("새 투두 추가: ", newTodo);
    res.send({ ok: true, todo: newTodo });
});



app.get('/todos/:user_num', (req, res) => {
    const user_num = Number(req.params.user_num);
    const userTodos = todos.filter(todo => todo.user_num === user_num);
    res.send(userTodos);
});

app.delete('/todos/delete/:todo_id', (req, res) => {
    const { todo_id } = req.params;
    const todoIndex = todos.findIndex(todo => todo.id === Number(todo_id));

    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        res.send({ ok: true });
    } else {
        res.send({ ok: false, message: "투두를 찾을 수 없습니다" });
    }
});

app.put('/todos/complete/:todo_id', (req, res) => {
    const { todo_id } = req.params;
    const todo = todos.find(todo => todo.id === Number(todo_id));

    if (todo) {
        todo.complete = true;
        res.send({ ok: true });
    } else {
        res.send({ ok: false, message: "Todo not found" });
    }
});
