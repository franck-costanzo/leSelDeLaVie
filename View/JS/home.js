export default function home()
{
    let select = document.getElementById('CategorySelect');
    let option1 = document.createElement('option');
    option1.value = 0;
    option1.innerHTML = "Toutes les catégories"
    select.appendChild(option1);

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
            if(e.target.value == 0)
            {
                document.location.href = "./";
            }
            else
            {
                document.location.href = "./?id_category="+e.target.value;
            }
            
        })
    })
}