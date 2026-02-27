const express = require('express');
const app = express();
const PORT = 3000;
const fs = require("fs");
const { json } = require('stream/consumers');
// Configurar EJS como engine de visualização
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded())
// Rota para renderizar a página
app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/contato', (req, res) => {
    res.render('contato');
});
let Feedback = JSON.parse(fs.readFileSync("dados/nomes.json"))
app.post('/contato', (req, res) => { 
    console.log(req.body)
    let feedback = req.body
    if (!feedback){
        console.log("Não funcionou não mano brother")
    
        res.redirect("/contato")

    return
}
Feedback.push(feedback)
fs.writeFileSync("dados/nomes.json", JSON.stringify(Feedback))
res.render('contato');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
