
window.onload = () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('main-ui').style.display = 'block';
    }, 2000);
};

function enterGame() {
    document.getElementById('payment-modal').style.display = 'block';
}

function selectCurrency(currency) {
    document.getElementById('payment-status').innerText = "✅ Payment received in " + currency;
}
