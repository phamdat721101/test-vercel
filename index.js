const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const axios = require('axios');

// const fetch = require('node-fetch');

// async function getData() {
//     const url = 'http://localhost:4001/v1/status';
//     const response = await fetch(url);
//     const jsonResponse = await response.json();
//     console.log("PQD: ", jsonResponse);
// } 
  
// getData();

// app.use(express.static('public'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: '*'
}));

app.get('/', async (req, res) => {
    let resp = await axios.get('http://109.123.233.65:4001/v1/asset?assetAddress=0x23926749Faf9F9AB807e57010999e9f274390421')

    console.log("resp after: ", resp.data.data)
    res.json({
        code: 0,
        data: resp.data.data
    })
})

app.get('/v1/asset', async (req, res) => {
    let request = req.query.assetAddress
    let resp = await axios.get(`http://109.123.233.65:4001/v1/asset?assetAddress=${request}`)

    res.json({
        code: 0,
        data: resp.data.data
    })
})

app.post('/v1/create_invest', async (req, res) =>{
    let resp = await axios.post("http://109.123.233.65:4001/v1/order/createOrder", {
        assetAddress: req.body.assetAddress,
        symbol: req.body.symbol,
        startPrice: req.body.startPrice,
        endPrice:req.body.endPrice,
        openAt: req.body.openAt,
        closeAt: req.body.closeAt,
        amount: req.body.amount,
        duration: req.body.duration,
        owner: req.body.owner
    })
    
    res.json({
        code: 0,
        data: resp.data
    })
})

app.post('/v1/invest', async (req, res) => {
    let request = {
        assetAdr: req.body.assetAdr,
        investor: req.body.investor,
        amount: req.body.amount,
        data: req.body.data
    }

    res.json({
        code: 0,
        data: "invest success"
    })
})

//implement decentralized asset management service -> generate NFT token 


app.listen(process.env.PORT || 3000);

module.exports = app;