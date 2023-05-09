const logoutButton = $("#logout");

logoutButton.click( async (event) => {
    const response = await fetch('/api/users/logout', {
        method: 'POST'
    });

    if (response.ok) {
        window.location.replace('/');
    }

})