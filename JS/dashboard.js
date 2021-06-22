const selesai = document.getElementById('selesai');
const belumSelesai = document.getElementById('belum-selesai');
let listData = [];

window.addEventListener('load', () => {
    let loaded = JSON.parse(localStorage.getItem('bookself'));
    selesai.innerText = loaded.filter(checkSelesai).length;
    belumSelesai.innerText = loaded.filter(checkBelumSelesai).length;
    console.log(loaded);
})

function checkSelesai(status) {
    return status.selesai === true;
}

function checkBelumSelesai(status) {
    return status.selesai === false;
}