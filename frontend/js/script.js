document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Toggle para dropdowns de videos
    const videoDropdowns = document.querySelectorAll('.video-dropdown');
    
    videoDropdowns.forEach(dropdown => {
        const header = dropdown.querySelector('.dropdown-header');
        
        if (header) {
            header.addEventListener('click', function() {
                // Cerrar todos los dropdowns primero
                videoDropdowns.forEach(item => {
                    if (item !== dropdown) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle del dropdown actual
                dropdown.classList.toggle('active');
                
                // Cambiar el ícono
                const icon = header.querySelector('i');
                if (dropdown.classList.contains('active')) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            });
        }
    });
    
    // Detectar enlaces activos en la navegación
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('#main-nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        if (currentLocation.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if (currentLocation.endsWith('/') && linkPath === 'index.html') {
            link.classList.add('active');
        }
    });
    
    // Animaciones de aparición al hacer scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.feature-card, .about-content, .activities-grid, .resources-grid');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Función para mostrar mensajes de error
function showError(element, message) {
    // Buscar el contenedor de mensajes de error cercano
    const errorContainer = element.closest('form')?.querySelector('.error-message') || 
                          document.getElementById('error-message');
    
    if (errorContainer) {
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
        
        // Resaltar el campo con error
        element.classList.add('error-input');
        element.focus();
        
        // Limpiar error después de 5 segundos
        setTimeout(() => {
            errorContainer.style.display = 'none';
            element.classList.remove('error-input');
        }, 5000);
    } else {
        // Fallback a alert si no encuentra el contenedor de error
        alert(message);
    }
}

// Función para validar entrada numérica
function validateNumericInput(input) {
    // Verificar si es un número válido
    const value = input.value.trim();
    
    if (value === '') {
        showError(input, '⚠️ Este campo no puede estar vacío');
        return false;
    }
    
    if (isNaN(parseFloat(value))) {
        showError(input, '⚠️ Por favor ingresa un número válido');
        return false;
    }
    
    return true;
}

// Función para formatear números grandes con separador de miles
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}