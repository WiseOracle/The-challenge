function enterGame() {
    document.getElementById('currency-selection').classList.remove('hidden');
    setTimeout(() => {
        document.querySelector('.paid').classList.remove('hidden');
    }, 3000);
}