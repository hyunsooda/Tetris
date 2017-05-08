


function blockDownSound() {
    document.querySelector('#blockDownSound').pause();
    document.querySelector('#blockDownSound').currentTime = 0;
    document.querySelector('#blockDownSound').play();
}

function blockClearSound() {
    document.querySelector('#lineClearSound').play();
}

function gameOverSound() {
    document.querySelector('#gameOverSound').play();
}

function createIDSound() {
    document.querySelector('#createIDSound').play();
}
