/**
 * IESTP Paiján - Página de Inicio
 * Animaciones profesionales y efectos interactivos
 * Versión: 1.0
 */

(function() {
    'use strict';

    // ========== ESPERA A QUE EL DOM ESTÉ LISTO ==========
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
            
            // Cerrar menú al hacer clic en enlace
            document.querySelectorAll('.global-nav-list a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                });
            });
        }
        
        // ========== 2. HEADER CON CAMBIO AL SCROLL ==========
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
        
        // ========== 3. CONTADORES NUMÉRICOS ==========
        const counters = document.querySelectorAll('.index-stat-number');
        
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
                    element.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        element.style.transform = 'scale(1)';
                    }, 200);
                }
                element.textContent = Math.floor(current);
            }, stepTime);
        }
        
        // Observador para contadores
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => counterObserver.observe(counter));
        
        // ========== 4. ANIMACIÓN DE ENTRADA AL HACER SCROLL ==========
        const animatedElements = document.querySelectorAll(
            '.index-beneficio-card, .index-carrera-card, .index-noticia-card, .campus-feature'
        );
        
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            fadeObserver.observe(el);
        });
        
        // ========== 5. EFECTO PARALLAX EN HERO ==========
        const hero = document.querySelector('.index-hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.scrollY;
                if (scrolled < 600) {
                    hero.style.backgroundPosition = `center ${scrolled * 0.3}px`;
                }
            });
        }
        
        // ========== 6. BOTÓN DE SCROLL SUAVE (indicador de scroll) ==========
        const scrollIndicator = document.querySelector('.hero-scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const nextSection = document.querySelector('.index-beneficios');
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
        
        // ========== 7. EFECTO DE TARJETAS 3D AL HOVER ==========
        const cards = document.querySelectorAll('.index-carrera-card, .index-beneficio-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 25;
                const rotateY = (centerX - x) / 25;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
        
        // ========== 8. EFECTO RIPPLE EN BOTONES ==========
        const buttons = document.querySelectorAll('.global-btn, .index-btn-carrera');
        
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
                ripple.style.transform = 'translate(-50%, -50%)';
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
        
        // Estilo para la animación ripple
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes rippleExpand {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 0.5;
                }
                100% {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
        
        // ========== 9. PARTÍCULAS FLOTANTES EN EL HERO ==========
        const heroSection = document.querySelector('.index-hero');
        if (heroSection) {
            const particleContainer = document.createElement('div');
            particleContainer.style.position = 'absolute';
            particleContainer.style.top = '0';
            particleContainer.style.left = '0';
            particleContainer.style.width = '100%';
            particleContainer.style.height = '100%';
            particleContainer.style.overflow = 'hidden';
            particleContainer.style.pointerEvents = 'none';
            particleContainer.style.zIndex = '1';
            
            for (let i = 0; i < 40; i++) {
                const particle = document.createElement('div');
                const size = Math.random() * 4 + 2;
                const duration = Math.random() * 10 + 5;
                const delay = Math.random() * 5;
                
                particle.style.position = 'absolute';
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.backgroundColor = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;
                particle.style.borderRadius = '50%';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.animation = `floatParticle ${duration}s linear infinite`;
                particle.style.animationDelay = `${delay}s`;
                
                particleContainer.appendChild(particle);
            }
            
            heroSection.style.position = 'relative';
            heroSection.appendChild(particleContainer);
            
            const particleAnimation = document.createElement('style');
            particleAnimation.textContent = `
                @keyframes floatParticle {
                    0% {
                        transform: translateY(0) translateX(0);
                        opacity: 0;
                    }
                    20% {
                        opacity: 1;
                    }
                    80% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100px) translateX(${Math.random() * 50 - 25}px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(particleAnimation);
        }
        
        // ========== 10. EFECTO DE GLOW EN INPUTS DEL FOOTER ==========
        const footerInputs = document.querySelectorAll('.footer-newsletter input');
        footerInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.boxShadow = '0 0 10px rgba(230,126,34,0.5)';
                input.style.transition = 'box-shadow 0.3s ease';
            });
            input.addEventListener('blur', () => {
                input.style.boxShadow = 'none';
            });
        });
        
        // ========== 11. EFECTO DE ZOOM EN IMÁGENES DE NOTICIAS ==========
        const newsImages = document.querySelectorAll('.noticia-img');
        newsImages.forEach(img => {
            img.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05)';
                img.style.transition = 'transform 0.4s ease';
            });
            img.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });
        });
        
        // ========== 12. BOTÓN WHATSAPP FLOTANTE (opcional) ==========
        const whatsappBtn = document.querySelector('.whatsapp-btn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('mouseenter', () => {
                whatsappBtn.style.transform = 'scale(1.05)';
            });
            whatsappBtn.addEventListener('mouseleave', () => {
                whatsappBtn.style.transform = 'scale(1)';
            });
        }
        
        // ========== 13. EFECTO DE TEXTO GRADIENTE DINÁMICO ==========
        const highlightTexts = document.querySelectorAll('.global-highlight');
        highlightTexts.forEach(text => {
            text.style.transition = 'text-shadow 0.3s ease';
            text.addEventListener('mouseenter', () => {
                text.style.textShadow = '0 0 10px rgba(230,126,34,0.5)';
            });
            text.addEventListener('mouseleave', () => {
                text.style.textShadow = 'none';
            });
        });
        
        // ========== 14. CARGA PEREZOSA DE IMÁGENES (Lazy Load) ==========
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imageObserver.observe(img));
        
        // ========== 15. EFECTO DE APARICIÓN CON FADE EN EL HERO ==========
        const heroContent = document.querySelector('.index-hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // ========== 16. SCROLL SUAVE PARA ENLACES INTERNOS ==========
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
        
        // ========== 17. EFECTO DE CARGA DE IMÁGENES CON PLACEHOLDER ==========
        const allImages = document.querySelectorAll('img');
        allImages.forEach(img => {
            if (!img.complete) {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
            } else {
                img.style.opacity = '1';
            }
        });
        
        // ========== 18. ANIMACIÓN DE TARJETAS DE BENEFICIOS ==========
        const benefitIcons = document.querySelectorAll('.beneficio-icon');
        benefitIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            });
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
        });
        
        // ========== 19. EFECTO DE NEÓN EN BOTONES PRINCIPALES ==========
        const primaryBtns = document.querySelectorAll('.global-btn-primary');
        primaryBtns.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.boxShadow = '0 0 20px rgba(230,126,34,0.6)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.boxShadow = '0 5px 15px rgba(230,126,34,0.3)';
            });
        });
        
        // ========== 20. LOG EN CONSOLA (Profesional) ==========
        console.log('✅ IESTP Paiján | Página de inicio cargada correctamente');
        console.log('🎯 Animaciones activas | Modo profesional');
    });
})();

// ========== FUNCIÓN GLOBAL PARA ABRIR PDF ==========
function abrirPDF(url, titulo = 'Documento PDF') {
    const modal = document.getElementById('globalPdfModal');
    const pdfFrame = document.getElementById('globalPdfFrame');
    const downloadLink = document.getElementById('globalPdfDownloadLink');
    const modalTitle = document.querySelector('#globalPdfModal .global-modal-header h3');
    
    if (modal && pdfFrame && downloadLink) {
        pdfFrame.src = url;
        downloadLink.href = url;
        if (modalTitle) modalTitle.textContent = titulo;
        modal.style.display = 'flex';
        modal.style.animation = 'globalSlideIn 0.3s ease';
        
        const closeBtn = modal.querySelector('.global-modal-close');
        if (closeBtn) {
            closeBtn.onclick = () => {
                modal.style.display = 'none';
                pdfFrame.src = '';
            };
        }
        
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                pdfFrame.src = '';
            }
        };
    }
}