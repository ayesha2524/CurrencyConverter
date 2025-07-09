let BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

let dropdownSelect = document.querySelectorAll('select')
let btn = document.querySelector('form button')
let fromCurr = document.querySelector('.from select')
let toCurr = document.querySelector('.to select')
let msg= document.querySelector('.msg')
for (let select of dropdownSelect) {
    for (let currCode in countryList) {
        let newoption = document.createElement('option')
        newoption.innerText = currCode
        newoption.value = currCode
        if (select.name === 'from' && currCode === 'USD') {
            newoption.selected = 'selected'
        }
        else if (select.name === 'to' && currCode === 'PKR') {
            newoption.selected = 'selected'
        }
        select.appendChild(newoption)

    }
    select.addEventListener("change", (e) => {
        updateFlag(e.target)
    })
}
const updateFlag = (element) => {
    let currFlag = element.value
    console.log(currFlag);
    let countryCode = countryList[currFlag]
    console.log(countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector('img')
    img.src = newSrc
}

btn.addEventListener("click", async (e) => {
    e.preventDefault()
    let amount = document.querySelector('.amount input')
    let amountVal = amount.value
    if (amountVal === "" || amountVal < 0) {
        amountVal = 1
        amount.value = 1

    }
    console.log(fromCurr, toCurr.value);
    let url = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`
    let response = await fetch(url)
    let data = await response.json()
    console.log(data);

    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);
    let finalAmount = amountVal * rate;
    msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

})


