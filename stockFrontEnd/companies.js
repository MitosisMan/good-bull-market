let API_KEY="AIzaSyDSzmK3gKOXUbvlre6EGV7hTcXnJQsr1_I"
let API_KEY_2 = "a2a73aaa2224a45c9" // programmable search engine

async function getCompanies(query) {
    query += " stocks"
    let url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${API_KEY_2}&q=${query}`
// request api
    return fetch(url)
    .then(response => response.json())
    .then(data => {
        let tickers = []
        if (!data.items) {
            return tickers
        }
        for (let i = 0; i < data.items.length; i++) {
            let item = data.items[i]
            let desc = item.snippet
            let regex = /\(?(?:\w+:\s?)?([A-Z]{3,4})\)?/gm
            // find all regex matches in desc
            let matches = [...desc.matchAll(regex)]
            if (matches && matches.length) {
                for (let match of matches) {
                    tickers.push(match[1])
                }
            } else {
                console.log(desc)
            }
        }
        tickers = [...new Set(tickers)]
        let notAllowed = ["SEC", "FAQ"]
        tickers = tickers.filter(ticker => !notAllowed.includes(ticker))

        return tickers;
    })
    .catch(error => console.error(error))
}

export default getCompanies;