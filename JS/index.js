const tombolMenuTambah = document.querySelector('.tambah-buku-baru');
const tombolSearch = document.getElementById('searchButton');
const searchBar = document.querySelector('.search-bar');
const menuTambah = document.querySelector('.menu-tambah-buku');
const dimContainer = document.querySelector('.dim-container');
const tombolClose = document.getElementById('close');
const form = document.getElementById('form');
const clearSearch = document.querySelector('#clear-search')
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

clearSearch.addEventListener('click', () => {
    searchBar.value = "";
    document.getElementById('list-post').innerHTML = "";
    angka = 1;
    cleanData();
    loadData();
})

function cleanData() {
    while (data.length > 0) {
        data.pop();
    }
}

function insertData(listData) {
    let judul = listData[0].value;
    let pengarang = listData[1].value;
    let tahun = listData[2].value;
    let selesai = listData[3].checked;

    let rowData = { id: +new Date(), judul, pengarang, tahun, selesai };
    generateTable(rowData);

    data.push(rowData);
    updateLocalStorage();

    form.reset();
    Swal.fire({
        icon: 'success',
        title: 'Berhasil...',
        text: 'Data berhasil disimpan!',
    }).then(() => {
        menuTambah.classList.remove('active');
        dimContainer.classList.remove('active');
    })

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
                        <td><i class='fas fa-trash' onclick='hapusData()'></i></td>
                    </tr>
               `;
    let tableRef = document.getElementById('table-list').getElementsByTagName('tbody')[0];
    let tableRow = tableRef.insertRow()
    tableRow.innerHTML = dataTable;

    angka++;
}

searchBar.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        angka = 1;
        let keyword = e.target.value.toLowerCase();
        let filterData = data.filter(function (item) {
            return item.judul.toLowerCase().includes(keyword);
        });

        document.getElementById('list-post').innerHTML = "";
        filterData.forEach((item) => {
            generateTable(item);
        })
    }
})

function hapusData() {
    console.log("Terhapus");
}

function findDataById(id) {
    let index = 0;
    for (item of data) {
        if (item.id === id)
            return index;
        index++;
    }

    return -1;
}

loadData();