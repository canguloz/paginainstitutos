/**
 * IESTP Paiján - Página Instituto
 * Funcionalidad: Menú responsive, cambio de secciones, PDF viewer
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        
        // ========== 1. MENÚ HAMBURGUESA ==========
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                const icon = menuToggle.querySelector('i');
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
            
            document.querySelectorAll('.global-nav-list a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                });
            });
        }
        
        // ========== 2. HEADER STICKY ==========
        const header = document.querySelector('.global-header');
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    header.classList.add('global-header-scroll');
                } else {
                    header.classList.remove('global-header-scroll');
                }
            });
        }
        
        // ========== 3. FUNCIÓN PARA MOSTRAR SECCIÓN ==========
        window.mostrarSeccion = function(seccionId) {
            // Ocultar todas las secciones
            document.querySelectorAll('.seccion-contenido').forEach(sec => {
                sec.classList.remove('active');
            });
            
            // Mostrar la sección seleccionada
            const seccionMostrar = document.getElementById(`contenido-${seccionId}`);
            if (seccionMostrar) {
                seccionMostrar.classList.add('active');
            }
            
            // Scroll suave hacia el contenido
            const contenidoSection = document.querySelector('.instituto-contenido');
            if (contenidoSection) {
                contenidoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
        
        // ========== 4. CONTADORES NUMÉRICOS ==========
        const counters = document.querySelectorAll('.hero-number');
        
        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-target'));
            if (isNaN(target)) return;
            
            let current = 0;
            const duration = 2000;
            const stepTime = 16;
            const steps = duration / stepTime;
            const increment = target / steps;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, stepTime);
        }
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => counterObserver.observe(counter));
        
        // ========== 5. FUNCIONES PARA PDF ==========
        window.verPDF = function(url, titulo) {
            const modal = document.getElementById('globalPdfModal');
            const pdfFrame = document.getElementById('globalPdfFrame');
            const downloadLink = document.getElementById('globalPdfDownloadLink');
            const modalTitle = document.getElementById('modalPdfTitle');
            
            if (modal && pdfFrame && downloadLink) {
                if (modalTitle) modalTitle.textContent = titulo || 'Documento PDF';
                pdfFrame.src = url;
                downloadLink.href = url;
                modal.style.display = 'flex';
                
                const closeBtn = modal.querySelector('.global-modal-close');
                if (closeBtn) {
                    closeBtn.onclick = () => cerrarModalPDF();
                }
                
                modal.onclick = (e) => {
                    if (e.target === modal) cerrarModalPDF();
                };
            }
        };
        
        window.cerrarModalPDF = function() {
            const modal = document.getElementById('globalPdfModal');
            const pdfFrame = document.getElementById('globalPdfFrame');
            if (modal) {
                modal.style.display = 'none';
                if (pdfFrame) pdfFrame.src = '';
            }
        };
        
        // ========== 6. SCROLL SUAVE ==========
        const scrollIndicator = document.querySelector('.hero-scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const seccionesSection = document.querySelector('.instituto-secciones');
                if (seccionesSection) {
                    seccionesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
        
        // ========== 7. ANIMACIÓN DE ENTRADA ==========
        const heroContent = document.querySelector('.instituto-hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(20px)';
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // ========== 8. LOG EN CONSOLA ==========
        console.log('✅ IESTP Paiján | Página Instituto cargada correctamente');
    });
})();