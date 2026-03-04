const express = require('express');
const app = express();
const PORT = 3000;
const fs = require("fs");


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));


if (!fs.existsSync('./dados')) {
    fs.mkdirSync('./dados');
}


if (!fs.existsSync('./dados/nomes.json')) {
    fs.writeFileSync('./dados/nomes.json', '[]');
}


app.get('/index', (req, res) => {
    res.render('index');
});


app.get('/contato', (req, res) => {
    res.render('contato');
});


app.post('/contato', (req, res) => { 
    console.log('Dados recebidos:', req.body);
    
  
    if (!req.body || Object.keys(req.body).length === 0) {
        console.log("Nenhum dado recebido");
        res.redirect("/contato?erro=1");
        return;
    }
    
    try {
     
        let feedbacks = [];
        if (fs.existsSync('./dados/nomes.json')) {
            const data = fs.readFileSync('./dados/nomes.json', 'utf-8');
            feedbacks = JSON.parse(data);
        }
        
     
        const novoFeedback = {
            id: Date.now(),
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone || '',
            mensagem: req.body.mensagem,
            data: new Date().toISOString()
        };
        
        feedbacks.push(novoFeedback);
        
      
        fs.writeFileSync('./dados/nomes.json', JSON.stringify(feedbacks, null, 2));
        
        console.log('Feedback salvo com sucesso!');
        
      
        res.redirect("/contato?sucesso=1");
        
    } catch (error) {
        console.error('Erro ao salvar feedback:', error);
        res.redirect("/contato?erro=2");
    }
});

app.get('/feedbacks', (req, res) => {
    try {
        const data = fs.readFileSync('./dados/nomes.json', 'utf-8');
        const feedbacks = JSON.parse(data);
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao ler feedbacks' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});