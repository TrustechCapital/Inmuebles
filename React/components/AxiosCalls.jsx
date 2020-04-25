import axios from 'axios';

export default axios.create({
    /*URL DEMO: http://127.0.0.1:7101/FiduciaWeb/getRef.do?json={"id":"funRegistroGarantias"}*/
  baseURL: `http://127.0.0.1:7101/FiduciaWeb`
});