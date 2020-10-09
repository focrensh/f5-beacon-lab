const fast = require('@f5devcentral/f5-fast-core')
const uts = require('unix-timestamp')
const cron = require('node-cron')
uts.round = true
const sendMetrics = require('./beaconCall')

const alljobs = []

const templates = {
    bigipSystem: `
    definitions:
      source:
        default: bigip1
      cpu:
        default: 25
        type: integer
      tmmcpu:
        default: 17
        type: integer
      memory:
        default: 60
        type: integer
      tmmmemory:
        default: 55
        type: integer
    template: |
        bigip-system,build=0.0.2187,chassisId=42252842-7e9a-8ead-61ea28ca905e,location=missing\\ data,macAddress=FA:16:3E:20:12:1C,marketingName=BIG-IP\\ Virtual\\ Edition,platform=Z100,source={{source}} systemCpuUsage={{cpu}}i,systemMemoryUsage={{memory}}i,tmmCpuUsage={{tmmcpu}}i,tmmMemoryUsage={{tmmmemory}}i {{time}}\n`,
    tgSystem: `
    definitions:
      host:
        default: autohost1
      cpu:
        default: 38
        type: integer
      memory:
        default: 60
        type: integer
    template: |
        cpu,cpu=cpu-total,host={{host}} usage_guest=0,usage_guest_nice=0,usage_idle=98.4,usage_iowait=0,usage_irq=0,usage_nice=0,usage_softirq=0,usage_steal=0,usage_system={{cpu}},usage_user=1 {{time}}\n
        mem,host={{host}} active=9299595264i,available=16818249728i,available_percent=80.41654254645131,buffered=2383761408i,cached=13316689920i,swap_cached=1302528i,swap_free=4286128128i,swap_total=4294963200i,total=20913917952i,used=3335778304i,used_percent={{memory}} {{time}}\n`,
    beaconMonitor: `
    definitions:
      source:
        default: beaconMonitor
      health:
        default: 2
        type: integer
      healthReason:
        default: Generic reason
    template: |
        monitor,source={{source}} healthStatus={{health}}i,healthStatusReason="{{healthReason}}" {{time}}\n`,
    bigipVirtual: `
    definitions:
      source:
        default: bigip1
      ippt:
        default: 10.27.39.1:443
      name:
        default: /Common/demovs1
      clientBitsIn:
        default: 240
        type: integer
      clientBitsOut:
        default: 66
        type: integer
      clientCurConns:
        default: 9
        type: integer
      health:
        default: 2
        type: integer
    template: |
        bigip-virtual,destinationAddress={{ippt}},destinationMask=255.255.255.255,name={{name}},protocol=tcp,source={{source}} clientsideBitsIn={{clientBitsIn}}i,clientsideBitsOut={{clientBitsOut}}i,clientsideCurConns={{clientCurConns}}i,healthStatus={{health}}i {{time}}\n`

}

// add jitter
const jitter = (n)  => {
    return new Promise((resolve, reject) => {
        const drift = n * .1
        const min = n - drift
        const max = n + drift
        const newnum =  Math.floor(Math.random() * (max - min + 1) + min)
        if (newnum <= 0) { return resolve(0)}
        if ( newnum >= 100) {return resolve(100)}
        return resolve(newnum)
    }) 
}



const fastRender = async (dt) => {
    const tempdata = Object.assign({}, dt) // is this correct?
    tempdata.time = String(uts.now()) + '000000000'
    for (const [ key, value ] of Object.entries(tempdata)) {
        const nonjitterFields = ['health','time']
        for (let it = 0; it < nonjitterFields.length; it++) {
            if (key.includes(nonjitterFields[it]) || typeof tempdata[key] === 'string') {
                //ignore
            } else {
                tempdata[key] = await jitter(value)
            }
        }
    }
    const cvrt = await fast.Template.loadYaml(templates[tempdata.type])
    // console.log(cvrt.getParametersSchema())
    console.log('TempData', tempdata)
    const render = cvrt.render(tempdata)
    return render
}

const nj = async (cmetric) => {
    const fr = await fastRender(cmetric)
    console.log(fr)
    const send = await sendMetrics(fr, global.declaration.token)
    if ( send.status != 204) {
        console.log(send)
    }
    console.log(send.status)    
}

const loopdeclaration = (decl) => {
    for (let index = 0; index < decl.length; index++) {
        const cmetric = decl[index]
        if (!cmetric.interval) {
            const interval = 1
        } else {
            const interval = cmetric.interval
        }
        const sjob = cron.schedule('*/5 * * * * *', () => {
        // const sjob = cron.schedule('*/' + String(interval) + ' * * * *', () => {
            console.log('Original Data:',cmetric)
            const ss = nj(cmetric)
        })
        alljobs.push(sjob)
    }
}

// Start jobs within declaration
const startJobs = (declaration) => { 
    global.declaration = declaration
    loopdeclaration(declaration.inputs)
}

// Delete all current jobs
const clearJobs = () =>  {
    for (let index = 0; index < alljobs.length; index++) {
        alljobs[index].destroy()
    }
}

// GET declare
const getDeclare = () =>  {
    return global.declaration
}



// sjob()
module.exports = { startJobs, clearJobs, getDeclare }