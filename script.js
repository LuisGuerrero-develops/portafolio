document.addEventListener('DOMContentLoaded', () => {
    

    const langToggle = document.getElementById('language-toggle');
    let currentLang = localStorage.getItem('portfolioLang') || 'es';

    function setLanguage(lang) {
        document.querySelectorAll('[data-es], [data-en]').forEach(element => {
            const newText = element.getAttribute(`data-${lang}`) || element.innerHTML;
            element.innerHTML = newText;
        });

        const toggleText = lang === 'es' ? langToggle.getAttribute('data-es') : langToggle.getAttribute('data-en');
        langToggle.textContent = toggleText;
        
        currentLang = lang;
        localStorage.setItem('portfolioLang', lang);
    }

    setLanguage(currentLang);

    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'es' ? 'en' : 'es';
        setLanguage(newLang);
    });


    //  (Scroll-Reveal)
   

    const animatedSections = document.querySelectorAll('.section-padding'); 

    const observerOptions = {
        root: null, 
        rootMargin: "0px",
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    animatedSections.forEach(section => {
        if (section.id !== 'inicio') {
            section.classList.add('hidden'); 
            observer.observe(section);
        }
    });

    // ----------------------------------------------------
    // 3. Lógica del MODAL para Certificados
    // ----------------------------------------------------

    const modal = document.getElementById('certModal');
    const modalImage = document.getElementById('modalCertImage');
    const closeBtn = document.querySelector('.close-btn');
    const modalTriggers = document.querySelectorAll('.modal-trigger');

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = 'auto'; 
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const imageUrl = trigger.getAttribute('data-cert-image');
            modalImage.src = imageUrl;
            modal.style.display = "block";
            document.body.style.overflow = 'hidden'; 
        });
    });

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // ----------------------------------------------------
    // 4. Lógica del HEADER DINÁMICO (Nueva funcionalidad)
    // ----------------------------------------------------

    const header = document.querySelector('.header');
    const heroSection = document.getElementById('inicio');
    const heroTitle = document.querySelector('.hero-title');
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const scrollThreshold = 100; 

        if (window.scrollY > scrollThreshold) {
            // Header: Se hace pequeño y fijo
            header.classList.add('scrolled');
            heroSection.classList.add('scrolled');
        } else {
            // Header: Vuelve a su estado normal
            header.classList.remove('scrolled');
            heroSection.classList.remove('scrolled');
        }
    });
});