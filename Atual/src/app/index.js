const express = require("express");
const systemRoutes = require("./routes/index");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectKafka } = require('./services/kafkaService');

const app = express();
const PORT = process.env.PORT || 3030;

app.use(bodyParser.json());
app.use(cors())
app.use("/api", systemRoutes);

app.listen(PORT, async () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    try {
        // await connectKafka();
        console.log('Conexão com Kafka estabelecida com sucesso.');
    } catch (error) {
        console.error('Falha ao conectar com o Kafka:', error);
    }
});
