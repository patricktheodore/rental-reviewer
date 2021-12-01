const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (!validateEmail(email)) {
        Swal.fire("Oh No!", "Please Enter a Valid Email.", "error"); //sweet alert library (bootstrap dialogues, modals?)
        return
    }

    if (!password) {
        Swal.fire("Please Enter Your Password", "", "error");
    }

    if (email && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/dashboard');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Incorrect Email or Password!',
                text: 'Please check your credentials and try again.'

            });        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (!validateEmail(email)) {
        Swal.fire("Oh No!", "Please Enter a Valid Email.", "error"); //sweet alert library (bootstrap dialogues, modals?)
        return
    }

    if (!name) {
        Swal.fire("Ooops!", "Please Enter Your Name.", "error");
        return
    }

    if (!password) {
        Swal.fire("Something Went Wrong", "Password Must Be Minimum 8 Characters Long!", "error");

    }

    if (name && email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            await Swal.fire({
                icon: 'success',
                title: `Welcome ${name}`,
                text: 'Start by either adding a review or browsing properties already reviews by other users.',
                confirmButtonText: 'Thanks',
            })
            document.location.replace('/dashboard');
        } else {
            Swal.fire({
                icon: 'error',
                title: response.statusText
            });
        }
    }
};

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
