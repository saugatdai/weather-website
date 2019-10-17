console.log('Client side javascript file is loaded');


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;


    fetch(`/weather?address=${location}`).then(response => {
        response.json().then(data => {
            const para1 = document.querySelector('#message-1');
            const para2 = document.querySelector('#message-2');

            if (data.error) {
                para1.textContent = data.error;
            } else {
                para1.textContent = `From the forecast of ${data.location} : `;
                para2.textContent = `Temperature : ${data.temperature}
                Rain Chance : ${data.precipProbability}
                Summary:${data.summary}`;
            }
        });
    });
});