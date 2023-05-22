async function signup_handler(event) {
    event.preventDefault();

    const name = $('#signup-name').val().trim();
    const email = $('#signup-email').val().trim();
    const password = $('#signup-pw').val().trim();

    console.log(`name: ${name}\nemail: ${email}\npassword: ${password}`);

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            document.location.href = '/recipes';
        } else {
            alert(`Password needs to be 8 characters.`);
        }
    }

}

$('#signup_btn').click(signup_handler);