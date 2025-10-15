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
        alert("Digite usu�rio e senha!");
    }
}

function updateBalance(amount) {
    balance += amount;
    document.getElementById('balance').innerText = `Saldo: ${balance} cr�ditos`;
}

// Hist�rico
function addHistory(text) {
    const ul = document.querySelector("#history ul");
    const li = document.createElement("li");
    li.innerText = text;
    ul.prepend(li);
}

// --- SLOTS com anima��o ---
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
            alert("Parab�ns! Voc� ganhou 200 cr�ditos!");
            updateBalance(200);
            addHistory(`Slots: ${result.join(' ')} - Vit�ria (+200)`);
        } else {
            addHistory(`Slots: ${result.join(' ')} - Perdeu (-50)`);
        }
    }, 500);
}

// --- ROULETTE com cor e anima��o ---
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
            alert("Voc� ganhou 100 cr�ditos!");
            updateBalance(100);
            addHistory(`Roleta: ${spin} - Vit�ria (+100)`);
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
    let resultText = `Voc�: ${player} | Dealer: ${dealer} `;
    if(player>dealer){
        resultText+="?? Voc� venceu! (+100 cr�ditos)";
        updateBalance(100);
    }else if(player===dealer){
        resultText+="?? Empate! (+50 cr�ditos)";
        updateBalance(50);
    }else{
        resultText+="?? Voc� perdeu!";
    }
    document.getElementById('blackjackResult').innerText=resultText;
    addHistory(`Blackjack: ${resultText}`);
}
