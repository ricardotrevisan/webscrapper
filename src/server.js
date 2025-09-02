const express = require('express');
const puppeteer = require('puppeteer');

const server= express();
server.get('/', async (request, response) => {
    const browser =  await puppeteer.launch();
    const page =  await browser.newPage();
    await page.goto('https://consulta-crf.caixa.gov.br/consultacrf/pages/consultaEmpregador.jsf');
    
    const content =  await page.evaluate(()=>{
        return{
            title: document.querySelector('span').innerHTML,
            description: document.querySelector('.wrapper p').innerHTML

        }
    })
    
    console.log('pageContent: ', content);
    response.send({
        "content": content.title,
        "description": content.description
    })

    await browser.close();
    
});

server.listen(3000, () => {
    console.log('✔ O pai tá on! ->  http://localhost:3000')
});
