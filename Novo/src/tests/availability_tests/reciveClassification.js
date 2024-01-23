import http from 'k6/http';
import { sleep } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';

export let reqDuration = new Trend('req_duration');
export let errorRate = new Rate('errors');

export let options = {
  stages: [
    { duration: '5s', target: 1000 }, // Simula 1000 usuários por 5 segundos
    { duration: '20s', target: 1000 }, // Mantém 1000 usuários por mais 20 segundos
    { duration: '5s', target: 0 },   // Encerra gradualmente os usuários
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // Verifica se 95% das respostas são abaixo de 500ms
    'http_req_failed': ['rate<0.1'], // Verifica se a taxa de erros é inferior a 10%
  },
};

const data = JSON.stringify({
  "predicted_category": "Sales, Marketing & Events",
  "requestId": "c3aa78d4-fcce-459b-ae0e-f1089e1b644f"
});

const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function () {
  let res;
  try {
    res = http.post('http://localhost:3030/api/receiveClassification', data, params);
    reqDuration.add(res.timings.duration);
    if (res.status !== 202) {
      errorRate.add(1);
    }
  } catch (error) {
    errorRate.add(1);
    console.log(`Erro na requisição: ${error}`);
  }
  sleep(1);
}