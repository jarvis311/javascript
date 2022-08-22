
var myDatabase = [
    { name: 'James Burton', email: 'James@gmail.com', age: 25 },
    { name: 'Mark Robinson', email: 'mark@gmail.com', age: 30 },
    { name: 'Lara Barbosa', email: 'lara@gmail.com', age: 28 }
];

(function Avatars(db) {

    var init = function () {
        generateList();
        enterUser();
    }

    var generateList = function () {
        var parent = document.querySelector('#parent_avatars');
        var template = '';

        for (var i = 0; i < db.length; i++) {

            template += '<div class="col-sm-4">';
            template += '<div class="card">';
            template += '<div class="card-delete" data-card="' + i + '">X</div>';
            template += '<div class="fa fa-pencil" id="card-edit" class="card-edit" data-edit="' + i + '"></div>';
            template += '<div class="card-block">';
            template += '<h3 class="card-title">' + db[i].name + '</h3>';
            template += '<p class="card-text">';
            template += '<strong>Email</strong>:<span>' + db[i].email + '</span>';
            template += '</p>';
            template += '<p class="card-text">';
            template += '<strong>Age</strong>:<span>' + db[i].age + '</span>';
            template += '</p>';
            template += '</div>';
            template += '</div>';
            template += '</div>';
        }

        parent.innerHTML = '';
        parent.insertAdjacentHTML('afterbegin', template);
        deleteCard();
        updateProduct();

    }

    var enterUser = function () {
        function grabUser() {
            var name = document.querySelector('#user_name').value;
            var email = document.querySelector('#user_email').value;
            var age = document.querySelector('#user_age').value;

            var elements = [name, email, age];

            if (validateUser(elements)) {
                document.querySelector('#myForm').reset();
                db.push({ name: name, email: email, age: age })
                generateList();
            } else {

                document.querySelector('#error').style.display = 'block';
                setTimeout(function () {
                    document.querySelector('#error').style.display = 'none';
                }, 2000)
            }
        }

        document.querySelector('#myForm').addEventListener("submit", function (event) {
            
            event.preventDefault();
            console.log('value>>>>>>>>>>>>',document.querySelector('.buttonEdit').value);
            if(document.querySelector('.buttonEdit').value.includes('Add user')){
                grabUser();
            }
                
        })
    }

    var validateUser = function (elements) {
        for (var i = 0; i < elements.length; i++) {
            if (elements[i] == "") {
                return false
            }
        }
        return true
    }

    var deleteCard = function () {
        var buttons = document.querySelectorAll('.card-delete');

        function deleteThis(element) {
            var obj = parseInt(element.getAttribute('data-card'));
            db.splice(obj, 1);
            generateList();
        }

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function (e) {
                deleteThis(this);
            })
        }

    }

    var updateProduct = function () {

        const editButton = document.querySelectorAll('#card-edit')

        function editThis(element) {
            var id = parseInt(element.getAttribute('data-edit'));
            console.log(myDatabase[id]);
            document.querySelector('#user_name').value = myDatabase[id].name
            document.querySelector('#user_email').value = myDatabase[id].email
            document.querySelector('#user_age').value = myDatabase[id].age
            document.querySelector('#index').value = id
            document.querySelector('.buttonEdit').value = 'Edit Product'

          
        }
        
        document.querySelector('.buttonEdit').addEventListener('click', function () {
            var id = document.querySelector('#index').value;

            myDatabase[id] = {
                name: document.querySelector('#user_name').value,
                email: document.querySelector('#user_email').value,
                age: document.querySelector('#user_age').value
                
            }
            generateList();

        })

        for (let i = 0; i < editButton.length; i++) {
            editButton[i].addEventListener('click', function (e) {
                editThis(this);
            })

        }

    }

    init();
}(myDatabase))