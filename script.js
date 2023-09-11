document.addEventListener("DOMContentLoaded", function () {
    fetch('/api/buttons')
        .then(response => response.json())
        .then(data => {
            const buttonListContainer = document.getElementById("button-list");
            data.forEach(item => {
                const button = document.createElement("button");
                button.className = "button";
                button.textContent = item;

                // Add click event listener (customize the action here)
                button.addEventListener("click", () => {
                    alert(`You clicked ${item}`);
                });

                buttonListContainer.appendChild(button);
            });
        })
        .catch(error => {
            console.error('Error fetching button names:', error);
        });
});
