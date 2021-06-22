const tombolMenuTambah = document.querySelector('.tambah-buku-baru');
const tombolSearch = document.getElementById('searchButton');
const searchBar = document.querySelector('.search-bar');
const menuTambah = document.querySelector('.menu-tambah-buku');
const dimContainer = document.querySelector('.dim-container');
const tombolClose = document.getElementById('close');
const form = document.getElementById('form');
let angka = 1;
let data = [];

tombolSearch.addEventListener('click', () => {
    searchBar.classList.toggle('active');
})

tombolMenuTambah.addEventListener('click', () => {
    menuTambah.classList.add('active');
    dimContainer.classList.add('active');
})

tombolClose.addEventListener('click', () => {
    menuTambah.classList.remove('active');
    dimContainer.classList.remove('active');
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    insertData(e.target);
})

function insertData(listData) {
    let id = listData[0].value;
    let judul = listData[1].value;
    let pengarang = listData[2].value;
    let tahun = listData[3].value;
    let selesai = listData[4].checked;

    let rowData = { id, judul, pengarang, tahun, selesai };
    generateTable(rowData);

    data.push(rowData);
    updateLocalStorage();

    // form.reset();
    menuTambah.classList.remove('active');
    dimContainer.classList.remove('active');

}

function updateLocalStorage() {
    localStorage.setItem('bookself', JSON.stringify(data));
}

function loadData() {
    let loaded = localStorage.getItem('bookself');
    let dataSementara = JSON.parse(loaded);
    dataSementara.forEach((item) => {
        data.push(item);
        generateTable(item);
    })
}

function generateTable(data) {
    let dataTable = `
                    <tr>
                        <td>${angka}</td>
                        <td>${data.id}</td>
                        <td>${data.judul}</td>
                        <td>${data.pengarang}</td>
                        <td>${data.tahun}</td>
                        <td>${data.selesai ? "Selesai" : "Belum Selesai"}</td>
                        <td>Aksi</td>
                    </tr>
               `;
    let tableRef = document.getElementById('table-list').getElementsByTagName('tbody')[0];
    let tableRow = tableRef.insertRow()
    tableRow.innerHTML = dataTable;

    angka++;
}

loadData();