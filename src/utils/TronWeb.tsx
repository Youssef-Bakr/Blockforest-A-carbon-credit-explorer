// @ts-ignore
import TronWeb from 'tronweb';
export const tronWeb: any = new TronWeb({
    fullHost: "https://api.shasta.trongrid.io",
    //fullHost:'https://api.trongrid.io' ,
    headers: { 
       //"TRON-PRO-API-KEY": "0dfe48ab-064a-4c2b-aefc-9b31dd2adf96", 
    }    
});