const axios = require('axios')

const csAPI = "https://api.cloudservices.f5.com"
const ingestAPI = "https://ingestion.ovr.prd.f5aas.com:50443"
const account =  process.env.BEACON_ACCT
const un =  process.env.BEACON_UN
const pw =  process.env.BEACON_PW


// LOGIN
const login = async (un,pw) => {
    const loginrequest = await axios.post('https://api.cloudservices.f5.com/v1/svc-auth/login', {
        username: un,
        password: pw
    })
    return loginrequest.data.access_token
}

const createToken = async (tkn) => {
    const config = {
        headers:{ 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer' + tkn, 
        'X-F5aas-Preferred-Account-Id': account
      }
    }

    const data = JSON.stringify({"name":"bacon_token","description":"Demo-lab token for Bacon App"})
    const send = await axios.post('https://api.cloudservices.f5.com/beacon/v1/telemetry-token', data, config)
    return(send)
}

const test = async (un,pw) => {
    try {
        const tkn = await login(un,pw)
        const newToken = await createToken(tkn)
        console.log(newToken) 
    }
    catch (e) {
        console.log(e)
    }
}

test(un,pw)





