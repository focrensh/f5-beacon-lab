const axios = require('axios')

const csAPI = "https://api.cloudservices.f5.com"
const ingestAPI = "https://ingestion.ovr.prd.f5aas.com:50443"
const account =  ""

// INGESTION

const sendMetrics = async (metrics, token) => {
    const ingestHeaders = { 
      'Content-Type': 'text/plain; charset=utf-8', 
      'X-F5-Ingestion-Token': token
    }
    const send = await axios.post( ingestAPI + '/beacon/v1/ingest-metrics', metrics, {headers: ingestHeaders})
    return send
}


// LOGIN
// const login = async (un,pw) => {
//     const loginrequest = await axios.post('https://api.cloudservices.f5.com/v1/svc-auth/login', {
//         username: un,
//         password: pw
//     })
//     return loginrequest
// }

// login(un,pw).then((res) => {
//     console.log(res)
// }).catch((e) => {
//     console.log(e)
// })
/////////////

module.exports = sendMetrics


