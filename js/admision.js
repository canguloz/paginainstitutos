/**
 * IESTP Paiján - Página de Admisión
 * Funcionalidad: Menú responsive, header sticky, animaciones, 
 *                modal de términos, redirección a gracias.html
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        
        // ========== 1. MENÚ HAMBURGUESA RESPONSIVE ==========
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
            
            // Cerrar menú al hacer clic en un enlace
            document.querySelectorAll('.global-nav-list a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                });
            });
        }
        
        // ========== 2. HEADER STICKY CON CAMBIO DE ESTILO ==========
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
        
        // ========== 3. FORMULARIO - REDIRECCIÓN A GRACIAS.HTML ==========
        const form = document.getElementById('preinscripcionForm');
        const submitBtn = document.getElementById('submitBtn');
        
        if (form && submitBtn) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Verificar que el checkbox de términos esté marcado
                const terminosCheckbox = document.getElementById('terminos');
                if (!terminosCheckbox || !terminosCheckbox.checked) {
                    mostrarNotificacion('❌ Debes aceptar los términos y condiciones', 'error');
                    return;
                }
                
                // Guardar el texto original del botón
                const originalText = submitBtn.innerHTML;
                
                // Cambiar texto del botón y mostrar spinner
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;
                
                // Redirigir a gracias.html después de 1 segundo
                setTimeout(function() {
                    window.location.href = 'gracias.html';
                }, 1000);
            });
        }
        
        // ========== 4. MODAL DE TÉRMINOS Y CONDICIONES ==========
        const terminosLink = document.getElementById('terminosLink');
        const terminosModal = document.getElementById('terminosModal');
        const modalClose = document.querySelector('.modal-terminos-close');
        const aceptarTerminosBtn = document.getElementById('aceptarTerminosBtn');
        const terminosCheckbox = document.getElementById('terminos');
        
        // Abrir modal al hacer clic en "términos y condiciones"
        if (terminosLink && terminosModal) {
            terminosLink.addEventListener('click', function(e) {
                e.preventDefault();
                terminosModal.style.display = 'flex';
            });
        }
        
        // Cerrar modal con la X
        if (modalClose && terminosModal) {
            modalClose.addEventListener('click', function() {
                terminosModal.style.display = 'none';
            });
        }
        
        // Aceptar términos y cerrar modal
        if (aceptarTerminosBtn && terminosModal && terminosCheckbox) {
            aceptarTerminosBtn.addEventListener('click', function() {
                terminosModal.style.display = 'none';
                terminosCheckbox.checked = true;
            });
        }
        
        // Cerrar modal al hacer clic fuera del contenido
        window.addEventListener('click', function(e) {
            if (terminosModal && e.target === terminosModal) {
                terminosModal.style.display = 'none';
            }
        });
        
        // ========== 5. NOTIFICACIONES TOAST ==========
        function mostrarNotificacion(mensaje, tipo = 'success') {
            // Eliminar toast existente
            const toastExistente = document.querySelector('.toast-notificacion');
            if (toastExistente) toastExistente.remove();
            
            const toast = document.createElement('div');
            toast.className = `toast-notificacion toast-${tipo}`;
            toast.innerHTML = `
                <i class="fas ${tipo === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${mensaje}</span>
            `;
            
            toast.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                gap: 0.75rem;
                z-index: 9999;
                animation: slideInRight 0.3s ease;
                border-left: 4px solid ${tipo === 'success' ? '#16a085' : '#e74c3c'};
            `;
            
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => toast.remove(), 300);
            }, 4000);
        }
        
        // ========== 6. SCROLL SUAVE PARA INDICADOR DEL HERO ==========
        const scrollIndicator = document.querySelector('.hero-scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const nextSection = document.querySelector('.proceso-admision');
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
        
        // ========== 7. SCROLL SUAVE PARA ENLACES ANCLA ==========
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
        
        // ========== 8. ANIMACIÓN DE ENTRADA DE ELEMENTOS AL SCROLL ==========
        const animatedElements = document.querySelectorAll('.paso-card, .requisitos-wrapper, .cronograma-item, .vacante-card, .info-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
        
        // ========== 9. PREVISUALIZACIÓN DE PDF ==========
        const pdfPreview = document.querySelector('.pdf-preview');
        if (pdfPreview) {
            pdfPreview.addEventListener('click', () => {
                verPDF('pdf/calendario-academico-2026.pdf', 'Calendario Académico 2026');
            });
        }
        
        // ========== 10. APARICIÓN DEL HERO ==========
        const heroContent = document.querySelector('.admision-hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(20px)';
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // ========== 11. EFECTO RIPPLE EN BOTONES ==========
        const buttons = document.querySelectorAll('.global-btn, .btn-pdf, .btn-submit, .filtro-btn, .btn-modal-terminos');
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
        
        // ========== 12. EFECTO DE ENFOQUE EN INPUTS ==========
        const inputs = document.querySelectorAll('.preinscripcion-form input, .preinscripcion-form select, .preinscripcion-form textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.transform = 'scale(1.01)';
                input.style.transition = 'transform 0.2s ease';
            });
            input.addEventListener('blur', () => {
                input.style.transform = 'scale(1)';
            });
        });
        
        // ========== 13. FUNCIONES PARA PDF ==========
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
                modal.style.animation = 'globalSlideIn 0.3s ease';
                
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
        
        // ========== 14. ESTILOS DINÁMICOS PARA ANIMACIONES ==========
        const style = document.createElement('style');
        style.textContent = `
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
            
            @keyframes globalSlideIn {
                from {
                    transform: translateY(-50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // ========== 15. LOG EN CONSOLA ==========
        console.log('✅ IESTP Paiján | Página de Admisión cargada correctamente');
        console.log('🎯 Proceso de admisión 2026 - Vacantes disponibles');
        console.log('📋 Formulario: Al enviar redirige a gracias.html');
        console.log('🔒 Modal de términos y condiciones: Funcional');
    });
})();