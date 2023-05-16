let btn = document.getElementById('form-btn');
let form = document.getElementById('my-form');
btn.addEventListener('click', validation);
function validation() {
    const formData = new FormData(form);
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    console.log("validation....", data);


    if ((data['name'] == '' || data['name'] == null) || (data['password'] == '' || data['password'] == null)) {
        login(data);
    }
}

function login(data) {
    let html;
    let payload = {
        mail: data['mail'],
        password: data['password']
    }
    fetch('http://localhost:3000/login', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data['code'] == 3) {
                html = `<div class="col-12 home">
                                <h1>Welcome ${data['mail']}</h1>
                                <img src="../SignIn/draw1.webp" alt="">
                            </div>`;
            }
        }).then(()=>{
            // Navigate to Home and load the content
        });
}