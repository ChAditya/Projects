document.getElementById('output').style.visibility = 'hidden';
document.getElementById('user-input').addEventListener('input',(k) =>{
    document.getElementById('output').style.visibility = 'visible';
    const pounds = k.target.value;
    console.log(pounds);
    document.getElementById('gramsOutput').innerHTML = pounds/0.00220462;
    document.getElementById('kilogramsOutput').innerHTML = pounds*0.45359237;
    document.getElementById('ouncesOutput').innerHTML = pounds*16;
});