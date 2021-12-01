async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
       await Swal.fire({
            icon: 'success',
            title: 'Logged Out!',
            confirmButtonText: 'Bye.'
        })

        document.location.replace('/');
    } else {
        Swal.fire({
            icon: 'error',
            title: 'You are already logged out!'
        });
    }
}

document.getElementById('logout').addEventListener('click', logout);
