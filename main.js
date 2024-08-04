async function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    for (const element of elements) {
        const file = element.getAttribute('data-include');
        try {
            const response = await fetch(file);
            if (response.ok) {
                const text = await response.text();
                element.innerHTML = text;
            } else {
                console.error('Error fetching file:', file, response.status);
            }
        } catch (error) {
            console.error('Error fetching file:', file, error);
        }
    }
}

document.addEventListener('DOMContentLoaded', includeHTML);
