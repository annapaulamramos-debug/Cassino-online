let balance = 1000;

// Login simples
function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if(user && pass) {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('casinoContainer').style.display = 'block';
        addHistory("Login realizado com sucesso!");
    } else {
        alert("Digite usuário e senha!");
    }
}

function updateBalance(amount) {
    balance += amount;
    document.getElementById('balance').innerText = `Saldo: ${balance} créditos`;
}

// Histórico
function addHistory(text) {
    const ul = document.querySelector("#history ul");
    const li = document.createElement("li");
    li.innerText = text;
    ul.prepend(li);
}

// --- SLOTS com animação ---
function playSlots() {
    if (balance < 50) { alert("Saldo insuficiente!"); return; }
    updateBalance(-50);
    const symbols = ['??','??','??','?','7??'];
    let result = [];
    const slotsDiv = document.getElementById('slotsResult');
    slotsDiv.innerHTML = '';
    
    for(let i=0;i<3;i++){
        let span = document.createElement('span');
        span.innerText = symbols[Math.floor(Math.random()*symbols.length)];
        slotsDiv.appendChild(span);
        result.push(span.innerText);
        span.style.transform = 'rotate(360deg)';
    }

    setTimeout(()=>{
        if(result[0]===result[1] && result[1]===result[2]){
            alert("Parabéns! Você ganhou 200 créditos!");
            updateBalance(200);
            addHistory(`Slots: ${result.join(' ')} - Vitória (+200)`);
        } else {
            addHistory(`Slots: ${result.join(' ')} - Perdeu (-50)`);
        }
    }, 500);
}

// --- ROULETTE com cor e animação ---
function playRoulette() {
    if (balance < 50) { alert("Saldo insuficiente!"); return; }
    updateBalance(-50);
    const numbers = Array.from({length:37}, (_,i)=>i);
    let spin = numbers[Math.floor(Math.random()*numbers.length)];
    const rouletteDiv = document.getElementById('rouletteResult');
    rouletteDiv.innerText = spin;
    rouletteDiv.style.color = spin===0?'green':(spin%2===0?'red':'black');
    rouletteDiv.style.fontSize='2em';
    rouletteDiv.style.transition='transform 0.5s';
    rouletteDiv.style.transform='rotate(720deg)';

    setTimeout(()=>{
        rouletteDiv.style.transform='rotate(0deg)';
        if(spin!==0 && spin%2===0){
            alert("Você ganhou 100 créditos!");
            updateBalance(100);
            addHistory(`Roleta: ${spin} - Vitória (+100)`);
        } else {
            addHistory(`Roleta: ${spin} - Perdeu (-50)`);
        }
    },500);
}

// --- BLACKJACK ---
function playBlackjack() {
    if (balance < 50) { alert("Saldo insuficiente!"); return; }
    updateBalance(-50);
    let player = Math.floor(Math.random()*21)+1;
    let dealer = Math.floor(Math.random()*21)+1;
    let resultText = `Você: ${player} | Dealer: ${dealer} `;
    if(player>dealer){
        resultText+="?? Você venceu! (+100 créditos)";
        updateBalance(100);
    }else if(player===dealer){
        resultText+="?? Empate! (+50 créditos)";
        updateBalance(50);
    }else{
        resultText+="?? Você perdeu!";
    }
    document.getElementById('blackjackResult').innerText=resultText;
    addHistory(`Blackjack: ${resultText}`);
}
