async function includeHTML() {
    document.body.classList.add('content-hidden');
    
    const elements = document.querySelectorAll('[data-include]');
    for (const element of elements) {
        const file = element.getAttribute('data-include');
        try {
            const response = await fetch(file);
            if (response.ok) {
                const text = await response.text();
                element.innerHTML = text;
                
                if (file.includes('header.html')) {
                    setActiveNavLink();
                }
            } else {
                console.error('Error fetching file:', file, response.status);
            }
        } catch (error) {
            console.error('Error fetching file:', file, error);
        }
    }
    
    document.body.classList.remove('content-hidden');
    document.body.classList.add('content-visible');
}

function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        link.classList.remove('nav__link--active');
        const href = link.getAttribute('href');
        
        // Handle root/home page
        if ((currentPath === '/' || currentPath === '/index.html') && href === '/') {
            link.classList.add('nav__link--active');
            return;
        }
        
        // Handle other pages
        if (currentPath.endsWith('/') && href === currentPath.slice(0, -1)) {
            link.classList.add('nav__link--active');
        } else if (currentPath === href) {
            link.classList.add('nav__link--active');
        }
    });
}

// Call includeHTML immediately when script loads
includeHTML();
