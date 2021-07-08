const kbbi = require('kbbi-scraperv2');

(async () => {
    const query = 'buku'

    kbbi(query).then(res => {
        console.log(res)
    }).catch(console.error())
})()