const axios = require('axios').default;
const cheerio = require('cheerio');
const baseUrl = require('./data.json').base_url;
const eror = require('./error');

module.exports = (query) => {
    try {
        return new Promise((resolve, reject) => {
            const q = query.trim().split(/ +/g);

            axios.get(`${baseUrl}/arti-kata/${q.join('%20')}.html`)
                .then((resp) => {
                    if (resp.status === 200) {
                        const data = resp.data;
                        const $ = cheerio.load(data);
                        let hasil = {}

                        $('#arti-kata').each(function (a, b) {
                            hasil.title = $(this).find('h2').eq(0).text().replace('1 ', ''),
                                hasil.arti = `${$(this).find('.daftar-arti').find('li').eq(0).text().includes('contoh:') ? $(this).find('.daftar-arti').find('li').eq(0).text().replace('contoh:', '\ncontoh:').replace('1)  ', '') : $(this).find('.daftar-arti').find('li').eq(0).text().replace('1)  ', '')}`

                            if (!hasil.title == '' || !hasil.arti == '') {
                                resolve({
                                    error: false,
                                    data: hasil
                                })
                            } eror(resolve, reject, query)
                        })
                    }
                }).catch(err => {
                    // console.log(err)
                    eror(resolve, reject, query)
                });
        })
    } catch (error) {
        // console.log('Terjadi kesalahan.', error)
        eror(query)
    }
}