const cardsContainer = document.getElementById('cards-container');
let currentPeriod = 'weekly';
let data = [];

function getPreviousLabel(period) {
    switch (period) {
        case 'daily': return 'Yesterday';
        case 'weekly': return 'Last Week';
        case 'monthly': return 'Last Month';
        default: return '';
    }
}

function renderCards() {
    cardsContainer.innerHTML = '';
    data.forEach(item => {
        const timeframe = item.timeframes[currentPeriod];
        const previousLabel = getPreviousLabel(currentPeriod);
        const titleLower = item.title.toLowerCase().replace(" ", "-");

        const cardHTML = `
            <div class="card ${titleLower}">
                <div class="card-header">
                    <img src="./images/icon-${titleLower}.svg" alt="${item.title} icon" class="todo-icon">
                
              </div>
                <div class="card-content">
                    <div class="card-title-bar">
                        <p class="card-title">${item.title}</p>
                        <img src="./images/icon-ellipsis.svg" alt="ellipsis" class="ellipsis-icon">
                    </div>
                    <div class="card-time">
                        <p class="current-time">${timeframe.current}hrs</p>
                        <p class="previous-time">${previousLabel} - ${timeframe.previous}hrs</p>
                    </div>
                </div>
            </div>
        `;
        cardsContainer.innerHTML += cardHTML;
    });
}

fetch('data.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        renderCards();
    })
    .catch(error => console.error('Error loading data.json:', error));

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentPeriod = btn.dataset.period;
        renderCards();
    });
});
