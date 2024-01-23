const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'meu-app',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const connectKafka = async () => {
  await producer.connect();
};

const sendDescriptionToKafka = async (dataText, requestId) => {
  await producer.send({
    topic: 'descricao-topico',
    messages: [{ key: requestId, value: dataText }],
  });
};

module.exports = { connectKafka, sendDescriptionToKafka };
