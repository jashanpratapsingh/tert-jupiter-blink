import { createJupiterApiClient } from '@jup-ag/api';

const ENDPOINT = `https://jupiter-swap-api.quiknode.pro/XX123456`; // 👈 Replace with your Metis Key or a public one https://www.jupiterapi.com/
const CONFIG = {
    basePath: ENDPOINT
};
const jupiterApi = createJupiterApiClient(CONFIG);

jupiterApi.quoteGet({
    inputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    outputMint: "So11111111111111111111111111111111111111112",
    amount: 100_000_000,
}).then((quote) => {
    console.log(quote.outAmount, quote.outputMint);
}).catch((error) => {
    console.error(error);
});