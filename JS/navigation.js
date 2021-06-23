const burger = document.getElementById('burger');
const navigation = document.querySelector('.navigation');
const dim_container = document.querySelector('.dim-container');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    dim_container.classList.toggle('active');
    navigation.classList.toggle('active');
})

dim_container.addEventListener('click', () => {
    burger.classList.remove('active');
    navigation.classList.remove('active');
    dim_container.classList.toggle('active');
})