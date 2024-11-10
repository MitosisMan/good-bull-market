async function getStockSummary(ticker) {
    if (localStorage[`stockSummary_${ticker}`]) {
        return JSON.parse(localStorage[`stockSummary_${ticker}`]);
    }
    const finnhubApiKey = 'csoe2bpr01qt3r349rd0csoe2bpr01qt3r349rdg';
    try {
        // Fetch the latest price from Finnhub (quote)
        const quoteResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${finnhubApiKey}`);
        const quoteData = await quoteResponse.json();

        // Fetch the fundamental data (P/E ratio, 52-week range)
        const fundamentalsResponse = await fetch(`https://finnhub.io/api/v1/stock/metric?symbol=${ticker}&metric=all&token=${finnhubApiKey}`);
        const fundamentalsData = await fundamentalsResponse.json();
        
        const finnhubPeRatio = fundamentalsData.metric.peExclExtraTTM; // P/E ratio from Finnhub
        const maxPrice = fundamentalsData.metric['52WeekHigh'];
        const minPrice = fundamentalsData.metric['52WeekLow'];

        // Get the current price from the quote data
        const currentPrice = quoteData.c; // Current price (last traded price)

        // Construct the final stock summary object
        const stockSummary = {
            ticker: ticker,
            currentPrice: currentPrice || 'N/A',  // Current price
            peRatio: finnhubPeRatio || 'N/A',     // P/E ratio from Finnhub
            range52Week: { low: minPrice, high: maxPrice },
        };

        // Store the stock summary in local storage
        localStorage[`stockSummary_${ticker}`] = JSON.stringify(stockSummary);

        console.log("Stock Summary:", stockSummary);
        return stockSummary;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

export default getStockSummary;