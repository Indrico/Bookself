const tombolMenuTambah = document.querySelector('.tambah-buku-baru');
const tombolSearch = document.getElementById('searchButton');
const searchBar = document.querySelector('.search-bar');
const menuTambah = document.querySelector('.menu-tambah-buku');
const dimContainer = document.querySelector('.dim-container');
const tombolClose = document.getElementById('close');
const form = document.getElementById('form');
const clearSearch = document.querySelector('#clear-search');
const selesai = document.getElementById('selesai');
const belum = document.getElementById('belum');
const semua = document.getElementById('semua');
let angka = 1;
let data = [];


semua.addEventListener('click', (e) => {
    clearActiveClass();
    e.target.classList.add('active');
    loadData();
})

belum.addEventListener('click', (e) => {
    clearActiveClass();
    e.target.classList.add('active');
    let dataBelum = data.filter(function (item) {
        return item.selesai == false;
    });
    cleanTable();
    dataBelum.forEach(item => generateTable(item));
})

selesai.addEventListener('click', (e) => {
    clearActiveClass();
    e.target.classList.add('active');
    let dataBelum = data.filter(function (item) {
        return item.selesai == true;
    });
    cleanTable();
    dataBelum.forEach(item => generateTable(item));
})

function clearActiveClass() {
    let opsi = document.querySelectorAll('.opsi');
    opsi.forEach((item) => {
        item.classList.remove('active');
    })
}

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
    semua.click();
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

function cleanTable() {
    document.getElementById('list-post').innerHTML = "";
    angka = 1;
}

function loadData() {
    cleanTable();
    cleanData();

    let loaded = localStorage.getItem('bookself');
    let dataSementara = JSON.parse(loaded);
    if (dataSementara){
        dataSementara.forEach((item) => {
            data.push(item);
            generateTable(item);
        })
    }
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
                        <td>
                            ${!data.selesai ? "<i class='fas fa-check-square fa-2x' onclick='markCompleted(this)' title='Tandai sebagai selesai'></i>"
            : "<i class='fas fa-undo fa-2x' onclick='markNotCompleted(this)' title='Tandai sebagai belum selesai'></i>"}
                            <i class='fas fa-trash fa-2x' onclick='hapusData(this)' title='Hapus ${data.judul}'></i>
                        </td>
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

function hapusData(e) {
    Swal.fire({
        icon: 'warning',
        title: 'Konfirmasi Hapus',
        text: 'Apakah anda ingin menghapus entry ini ?',
        showDenyButton: true,
        confirmButtonText: 'Iya',
        denyButtonText: 'Tidak',
        focusDeny: true
    }).then((res) => {
        console.log(res);
        if (res.isConfirmed) {
            let currentElement = e.parentNode.parentNode;
            let id = currentElement.getElementsByTagName('td')[1];
            const bookPosition = findDataById(id.innerText);
            data.splice(bookPosition, 1);

            e.parentElement.parentElement.remove();
            updateLocalStorage();
            Swal.fire({
                icon: 'success',
                title: 'Berhasil...',
                text: 'Data berhasil dihapus!',
            })
        }
    })
}

function markCompleted(e) {
    Swal.fire({
        icon: 'warning',
        title: 'Konfirmasi',
        text: 'Apakah anda ingin menandai buku ini selesai ?',
        showDenyButton: true,
        confirmButtonText: 'Iya',
        denyButtonText: 'Tidak',
        focusDeny: true
    }).then((res) => {
        console.log(res);
        if (res.isConfirmed) {
            let currentElement = e.parentNode.parentNode;
            let id = currentElement.getElementsByTagName('td')[1];
            const currentIndexBook = findDataById(id.innerText);
            data[currentIndexBook].selesai = true;

            updateLocalStorage();
            semua.click();
            Swal.fire({
                icon: 'success',
                title: 'Berhasil...',
                text: 'Buku berhasil ditandai selesai!',
            })
        }
    })
}

function markNotCompleted(e) {
    Swal.fire({
        icon: 'warning',
        title: 'Konfirmasi',
        text: 'Apakah anda ingin menandai buku ini belum selesai ?',
        showDenyButton: true,
        confirmButtonText: 'Iya',
        denyButtonText: 'Tidak',
        focusDeny: true
    }).then((res) => {
        console.log(res);
        if (res.isConfirmed) {
            let currentElement = e.parentNode.parentNode;
            let id = currentElement.getElementsByTagName('td')[1];
            const currentIndexBook = findDataById(id.innerText);
            data[currentIndexBook].selesai = false;

            updateLocalStorage();
            semua.click();
            Swal.fire({
                icon: 'success',
                title: 'Berhasil...',
                text: 'Buku berhasil ditandai belum selesai!',
            })
        }
    })
}



function findDataById(id) {
    let index = 0;
    for (item of data) {
        if (item.id == id)
            return index;
        index++;
    }

    return -1;
}

loadData();