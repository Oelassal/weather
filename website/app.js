/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?zip='
const apiKey = '&appid=65117ef4c46c67b402a31f5a342b8c99'

// Create a new date instance dynamically with JS
const n = new Date();
const newDate = n.getMonth() + '.' + n.getDate() + '.' + n.getFullYear();

document.getElementById('generate').addEventListener('click', doSomething)

function doSomething(e) {
    const zipCode = document.getElementById('zip').value;
    const feels = document.getElementById('feelings').value;

    getWeather(baseUrl, zipCode, apiKey)
        .then(function(data) {
            console.log(data);
            //adding data to post request
            postData('/add', { date: n, temprature: data.list[0].main.temprature, content: feelings })
            UiUpdate();
        })
}
// GET PROJECT DATA
const getWeather = async(baseUrl, zip, Key) => {
    const res = await fetch(baseUrl + zip + Key);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
}

// POST DATA FUNCTION

const postData = async(url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/JSON'
        },
        body: JSON.stringify(data)

    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log('error', error);
    }
}

// UPDATING UI WITH FUNCTION
const UiUpdate = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('data').innerHTML = `Date: ${allData[0].date}`;
        document.getElementById('temp').innerHTML = `temprature: ${allData[0].temprature}`;
        document.getElementById('content').innerHTML = `Feeling: ${allData[0].content}`;
    } catch (error) {
        console.log('error', error)
    }

}