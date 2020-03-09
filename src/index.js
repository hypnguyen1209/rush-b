const app = require('express')();
const cheerio = require('cheerio')
const request = require('request');
function techrum_() {
    return new Promise(function(resolve, reject) {
        setInterval(()=>{
            request.get('https://www.techrum.vn/', (err, res, body)=>{
                try {
                    resolve(body);
                } catch (error) {
                    reject(error)
                }
            })
        },3000)
    });
}
function topdev_() {
    return new Promise(function(resolve, reject) {
        setInterval(()=>{
            request.get('https://topdev.vn/blog/', (err, res, body)=>{
                try {
                    resolve(body);
                } catch (error) {
                    reject(error)
                }
            })
        }, 3000)
    });
}
function genk_() {
    return new Promise(function(resolve, reject) {
        setInterval(()=>{
            request.get('https://genk.vn/', (err, res, body)=>{
                try {
                    resolve(body);
                } catch (error) {
                    reject(error)
                }
            })
        }, 3000)
    });
}

var resultIndexGenK = [];
async function cheerioGenK(){
    var a = await genk_().then((r)=>{
        return r;
    })
    var $ = await cheerio.load(a);
    for(let i = 0; i < 10; i++){
        let childrenArray = await {
            title: $('a.kscliw-ava')[i].attribs.title,
            href: `https://genk.vn/${$('a.kscliw-ava')[i].attribs.href}`,
            dateTime: $('span.knswli-time')[i].attribs.title,
            img: $('div.knswli-left.fl img')[i].attribs.src
        };
        await resultIndexGenK.push(childrenArray);
    }
}

function getNewsGenK(){
    return cheerioGenK().then(()=>{
        return resultIndexGenK;
    });
}

var resultIndexTopDev = [];
async function cheerioTopDev(){
    var a = await topdev_().then((r)=>{
        return r;
    })
    var $ = await cheerio.load(a);
     for(let i = 0; i < 8; i++){
        let childrenArray = await {
            title: $('span.ez-toc-section a')[i].attribs.title, 
            href: $('span.ez-toc-section a')[i].attribs.href,
            dateTime: null,
            img: $('div.td-module-thumb img')[i].attribs.src
        }
        await resultIndexTopDev.push(childrenArray);
    } 
}

function getNewsTopDev(){
    return cheerioTopDev().then(()=>{
        return resultIndexTopDev;
    });
}

var resultIndexTechRum = [];
async function cheerioTechRum(){
    var a = await techrum_().then((r)=>{
        return r;
    })
    var $ = await cheerio.load(a);
    for(let i = 1; i < 7; i++){
        let childrenArray = await {
            title: $('div .block-header a')[i].children[0].data.trim(),
            href: `https://www.techrum.vn/${$('div .block-header a')[i].attribs.href.trim()}`,
            dateTime: $('div.message-attribution-main time')[i].attribs.datetime,
            img: $('div.message-body img')[i].attribs.src
        };
        await resultIndexTechRum.push(childrenArray);
    }
}

function getNewsTechRum(){
    return cheerioTechRum().then(()=>{
        return resultIndexTechRum;
    });
}

app.get('/', async function(req, res) {
    var a = await getNewsTopDev().then(e=>{
        resultIndexTopDev = [];
        return e;
    })
    var b = await getNewsTechRum().then(e=>{
        resultIndexTechRum = [];
        return e;
    })
    var c = await getNewsGenK().then(e=>{
        resultIndexGenK = [];
        return e;
    })
    await res.send(JSON.stringify(a.concat(b, c)));
})
app.listen(80, ()=> {
    console.log('Running....');
})