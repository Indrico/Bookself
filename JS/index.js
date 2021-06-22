const tombolMenuTambah = document.querySelector('.tambah-buku-baru');
const tombolSearch = document.getElementById('searchButton');
const searchBar = document.querySelector('.search-bar');
const menuTambah = document.querySelector('.menu-tambah-buku');
const dimContainer = document.querySelector('.dim-container');
const tombolClose = document.getElementById('close');
const form = document.getElementById('form');
const table = document.getElementById('list-post');
let angka = 0;

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
    domData(e.target);
})

function domData(listData) {
    let id = listData[0].value;
    let judul = listData[1].value;
    let pengarang = listData[2].value;
    let tahun = listData[3].value;
    let selesai = listData[4].checked;

    let dataTable = `
                    <tr>
                        <td>${angka++}</td>
                        <td>${id}</td>
                        <td>${judul}</td>
                        <td>${pengarang}</td>
                        <td>${tahun}</td>
                        <td>${selesai}</td>
                        <td>Aksi</td>
                    </tr>
               `;
    
    table.innerHTML = dataTable;
    
    alert("Data telah ditambahkan");

    form.reset();
    menuTambah.classList.remove('active');
    dimContainer.classList.remove('active');
}

function simpanLocalStorage() {

}