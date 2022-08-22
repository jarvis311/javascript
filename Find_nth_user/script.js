
let id = ''
// localStorage.clear();
showData();

searchUser()
function manageData() {

    let name = document.querySelector('#name').value;
    if (name == '') {
        alert('Please EnterUser Name')
    } else {
        if (id == '') {
            let userData = JSON.parse(localStorage.getItem('userData'))
            if (userData == null) {
                let data = [name];
                localStorage.setItem('userData', JSON.stringify(data))
                window.location.reload()
            } else {

                userData.push(name)
                localStorage.setItem('userData', JSON.stringify(userData));
                window.location.reload()
            }
            document.querySelector('#name').value = ''

        }
    }

}


function showData() {
    let userData = JSON.parse(localStorage.getItem('userData'))

    if (userData != null) {
        let html = ''
        let id = 1;
        for (let data in userData) {
            html = html + `
            <tr>
                <td>${id}</td>
                <td>${userData[data]}</td>
            </tr>
            `
            id++;
        }
        document.querySelector('#root').innerHTML = html
    }
}



function searchUser() {
    // let input = document.querySelector('#search')

    document.querySelector('#search').addEventListener('input', function (e) {
        let data = JSON.parse(localStorage.getItem('userData'))
        const filter = data.filter(element => {
            if (element.includes(e.target.value)) return element
        });
       
        let html = ''
        filter.forEach(element => {
            html = html + `
            <tr>
                <td>${element}</td>
            </tr>
            `
            
            document.querySelector('#root').innerHTML = html
        });

    })
}

