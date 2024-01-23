const Redis = require('ioredis');

const client = new Redis({
    port: 6377,
});

client.on('connect', function () {
    console.log('Conectado ao Redis');
});

client.on('error', function (err) {
    console.log('Erro no Redis: ' + err);
});

function cacheResult(dataType, key, value) {
    const fullKey = `${dataType}:${key}`
    const valueAsString = JSON.stringify(value)
    client.set(fullKey, valueAsString, 'EX', 3600);
    console.log(`Resposta salva para a chave: ${fullKey}`);
}

async function getCachedResult(dataType, key, defaultValue = null) {
    try {
        const fullKey = `${dataType}:${key}`
        const cachedResult = await client.get(fullKey);

        if (cachedResult === null) {
            console.log(`Nenhum resultado encontrado no cache para a chave: ${fullKey}`);
            return defaultValue;
        }

        console.log(`Resposta encontrada no cache para a chave: ${fullKey}`);
        // return cachedResult;
        return JSON.parse(cachedResult);
    } catch (error) {
        console.error('Erro ao recuperar resultado do cache:', error);
        return defaultValue;;
    }
}

async function measureRedisLatency() {
    try {
        const start = Date.now();
        const pingas = await client.ping();
        console.log("PING:", pingas)
        const end = Date.now();

        const latency = end - start;

        console.log(`Latência do Redis: ${latency}ms`);
        return latency;
    } catch (error) {
        console.error('Erro ao medir a latência do Redis:', error);
        return -1;
    }
}

function flushAll() {
    client.flushall((err, reply) => {
        if (err) {
            console.error('Erro ao limpar o cache:', err);
            return err
        } else {
            console.log('Cache limpo com sucesso!');
            return "OK"
        }
    });
}

module.exports = {
    cacheResult,
    getCachedResult,
    flushAll,
    measureRedisLatency,
};