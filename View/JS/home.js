export default function home()
{
    let select = document.getElementById('CategorySelect');

    fetch('/leSelDeLaVie/getAllCategories')
    .then(response =>{
        return response.json();
    })
    .then(response => {
        response.forEach(element => {
            console.log(element)
            let option = document.createElement('option');
            option.innerHTML = element.name_category;
            option.value = element.id_category;
            select.appendChild(option);
        })

        select.addEventListener('change', (e) => {
            console.log(e.target.value);
            document.location.href = "./?id_category="+e.target.value;
        })
    })
}