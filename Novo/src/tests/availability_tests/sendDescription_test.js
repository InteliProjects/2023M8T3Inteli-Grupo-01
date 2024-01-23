import http from 'k6/http';
import { check, sleep } from 'k6';


export const options = {
  vus: 100,
  duration: '30s',
}

const payload = JSON.stringify(
  {
    dataText: "marketing"
  }
);

const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function () {
  let response = http.post('http://localhost:3030/api/sendDescription', payload, params);

  check(response, {
    'status is 202': (r) => r.status === 202,
  });
  sleep(10)

}
