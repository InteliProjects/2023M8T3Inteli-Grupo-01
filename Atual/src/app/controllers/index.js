const { sendDescriptionToKafka } = require('../services/kafkaService');
const { cacheResult, getCachedResult, measureRedisLatency, flushAll } = require('../services/redisService');
const WebhookService = require('../services/webhookService');
const { v4: uuidv4 } = require('uuid');
let requestMap = new Map();

exports.sendDescription = async (req, res) => {
    try {
        const dataText = req.body.new_description;

        if (!dataText || !Array.isArray(dataText)) {
            return res.status(400).send({ error: 'new_description é necessário e deve ser um array' });
        }

        const requestId = uuidv4();
        requestMap.set(requestId, res);

        // await sendDescriptionToKafka(dataText, requestId);
        await WebhookService.sendTextHooks(dataText, requestId);

        cacheResult('request', requestId, dataText);
        console.log(cacheResult)

        res.status(202).send({ requestId: requestId });
    } catch (error) {
        console.error('Erro ao enviar texto para processamento: ' + error.message);
        res.status(500).send({ error: error.message });
    }
};

exports.receiveClassification = async (req, res) => {
    try {
        const predicted_category = req.body.classification;
        console.log("Predicted Category:", predicted_category)
        const predicted_category02 = req.body.classification02;
        console.log("Predicted Category 02:", predicted_category02);

        const requestId = req.body.key;
        console.log("Request ID:", requestId)

        const originalRes = requestMap.get(requestId);

        if (originalRes) {
            requestMap.delete(requestId);

            const cachedResult = await getCachedResult('result', requestId);
            if (!cachedResult) {
                cacheResult('result', requestId, { predicted_category, predicted_category02 });
            }
        } else {
            const cachedResult = await getCachedResult('result', requestId);
            if (cachedResult) {
                console.log("Enviando resultado do cache...");
                return res.send({ predicted_category: JSON.parse(cachedResult) });
            } else {
                console.error(`Não foi possível encontrar a resposta original para a solicitação ${requestId}`);
                return res.status(404).send({ message: `Não foi possível encontrar a resposta para a solicitação ${requestId}` });
            }
        }
    } catch (error) {
        console.error('Erro no processamento da classificação:', error);
        res.status(500).send({ error: 'Erro interno ao processar a classificação.' });
    }
};

exports.measureRedisLatency = async (req, res) => {
    try {
        const latency = await measureRedisLatency();
        res.send(`Latência do Redis: ${latency}ms`);
    } catch (error) {
        console.error('Erro ao medir a latência do Redis:', error);
        res.status(500).send('Ocorreu um erro ao medir a latência do Redis.');
    }
};

exports.getClassificationByRedisKey = async (req, res) => {
    try {
        const { key } = req.params;

        if (!key) {
            return res.status(400).send({ error: 'Chave do Redis não fornecida' });
        }

        const cachedResult = await getCachedResult('result', key);
        console.log("Cached Result:", cachedResult);
        console.log("Key:", key);

        // Verifica se o cachedResult é uma string e faz o parse, se necessário
        let resultToSend;
        if (typeof cachedResult === 'string') {
            resultToSend = JSON.parse(cachedResult);
        } else {
            resultToSend = cachedResult;
        }

        if (resultToSend) {
            res.send({ cachedResult: resultToSend });
        } else {
            res.status(404).send({ message: `Não foi encontrada uma classificação para a chave ${key}` });
        }
    } catch (error) {
        console.error('Erro ao buscar classificação no Redis:', error);
        res.status(500).send({ error: 'Erro interno ao buscar classificação no Redis' });
    }
};


exports.resetRedis = async (req, res) => {
    try {
        await flushAll();
        res.send('Redis resetado com sucesso.');
    } catch (error) {
        console.error('Erro ao resetar o Redis:', error);
        res.status(500).send('Ocorreu um erro ao resetar o Redis.');
    }
}