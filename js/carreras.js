/**
 * IESTP Paiján - Página de Carreras
 * Interactividad y efectos profesionales
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        
        // ========== MENÚ HAMBURGUESA ==========
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
        
        // ========== HEADER STICKY ==========
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
        
        // ========== SCROLL SUAVE EN INDICADOR ==========
        const scrollIndicator = document.querySelector('.hero-scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const firstCarrera = document.querySelector('.carrera-card-expandida');
                if (firstCarrera) {
                    firstCarrera.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
        
        // ========== SCROLL SUAVE EN ENLACES ANCLA ==========
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
        
        // ========== ANIMACIÓN DE ENTRADA AL SCROLL ==========
        const animatedElements = document.querySelectorAll('.carrera-card-expandida, .comparativa-card');
        
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            fadeObserver.observe(el);
        });
        
        // ========== EFECTO HOVER EN TARJETAS COMPARATIVAS ==========
        const comparativaCards = document.querySelectorAll('.comparativa-card');
        comparativaCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
        
        // ========== EFECTO RIPPLE EN BOTONES ==========
        const buttons = document.querySelectorAll('.global-btn, .btn-malla');
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                ripple.style.width = '0';
                ripple.style.height = '0';
                ripple.style.borderRadius = '50%';
                ripple.style.backgroundColor = 'rgba(255,255,255,0.5)';
                ripple.style.animation = 'rippleExpand 0.6s ease-out';
                ripple.style.pointerEvents = 'none';
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                
                const existingRipple = this.querySelector('.ripple-effect');
                if (existingRipple) existingRipple.remove();
                
                ripple.classList.add('ripple-effect');
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
        
        // Estilo ripple
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes rippleExpand {
                0% { width: 0; height: 0; opacity: 0.5; }
                100% { width: 300px; height: 300px; opacity: 0; }
            }
        `;
        document.head.appendChild(rippleStyle);
        
        // ========== APARICIÓN DEL HERO ==========
        const heroContent = document.querySelector('.carreras-hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // ========== LOG EN CONSOLA ==========
        console.log('✅ IESTP Paiján | Página de Carreras cargada correctamente');
    });
})();

// ========== FUNCIÓN PARA VER PDF EN MODAL ==========
function verPDF(url, titulo) {
    const modal = document.getElementById('globalPdfModal');
    const pdfFrame = document.getElementById('globalPdfFrame');
    const downloadLink = document.getElementById('globalPdfDownloadLink');
    const modalTitle = document.getElementById('modalPdfTitle');
    
    if (modal && pdfFrame && downloadLink) {
        // Establecer el título
        if (modalTitle) modalTitle.textContent = titulo || 'Documento PDF';
        
        // Cargar el PDF en el iframe
        pdfFrame.src = url;
        
        // Configurar el enlace de descarga
        downloadLink.href = url;
        
        // Mostrar el modal
        modal.style.display = 'flex';
        modal.style.animation = 'globalSlideIn 0.3s ease';
        
        // Configurar cierre
        const closeBtn = modal.querySelector('.global-modal-close');
        if (closeBtn) {
            closeBtn.onclick = function() {
                cerrarModalPDF();
            };
        }
        
        // Cerrar al hacer clic fuera del contenido
        modal.onclick = function(e) {
            if (e.target === modal) {
                cerrarModalPDF();
            }
        };
    }
}

// ========== FUNCIÓN PARA CERRAR MODAL PDF ==========
function cerrarModalPDF() {
    const modal = document.getElementById('globalPdfModal');
    const pdfFrame = document.getElementById('globalPdfFrame');
    
    if (modal) {
        modal.style.display = 'none';
        if (pdfFrame) {
            pdfFrame.src = '';
        }
    }
}

// ========== FUNCIÓN PARA DESCARGAR MALLA (alternativa) ==========
function descargarMalla(carrera) {
    const mallas = {
        'administracion': 'pdf/malla-administracion.pdf',
        'agropecuaria': 'pdf/malla-agropecuaria.pdf',
        'enfermeria': 'pdf/malla-enfermeria.pdf'
    };
    
    const url = mallas[carrera] || 'pdf/malla-generica.pdf';
    
    // Crear enlace temporal para descarga
    const link = document.createElement('a');
    link.href = url;
    link.download = '';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}