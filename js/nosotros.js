/**
 * IESTP Paiján - Página Nosotros
 * Funcionalidad: Menú responsive, contadores animados, filtros de docentes y jerárquicos
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
        
        // ========== 3. CONTADORES NUMÉRICOS ==========
        const counters = document.querySelectorAll('.stat-number');
        
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
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => counterObserver.observe(counter));
        
        // ========== 4. FILTROS DE DOCENTES POR CARRERA ==========
        const filtrosDocentes = document.querySelectorAll('.filtro-docente');
        const docentes = document.querySelectorAll('.docente-card');
        
        function filtrarDocentes(carrera) {
            docentes.forEach(docente => {
                const carreraDocente = docente.getAttribute('data-carrera');
                
                if (carrera === 'todas' || carreraDocente === carrera) {
                    docente.style.display = 'block';
                    docente.style.animation = 'fadeInUp 0.4s ease';
                } else {
                    docente.style.display = 'none';
                }
            });
        }
        
        if (filtrosDocentes.length > 0) {
            filtrosDocentes.forEach(filtro => {
                filtro.addEventListener('click', function() {
                    // Quitar clase active de todos
                    filtrosDocentes.forEach(f => f.classList.remove('active'));
                    // Agregar clase active al clickeado
                    this.classList.add('active');
                    // Filtrar docentes
                    const carrera = this.getAttribute('data-carrera');
                    filtrarDocentes(carrera);
                });
            });
        }
        
        // ========== 5. FILTROS PARA PLANA JERÁRQUICA ==========
        const filtrosJerarquicos = document.querySelectorAll('.filtro-jerarquico');
        const jerarquicos = document.querySelectorAll('.jerarquico-card');
        
        function filtrarJerarquicos(cargo) {
            jerarquicos.forEach(jerarquico => {
                const cargoJerarquico = jerarquico.getAttribute('data-cargo');
                
                if (cargo === 'todos' || cargoJerarquico === cargo) {
                    jerarquico.style.display = 'block';
                    jerarquico.style.animation = 'fadeInUp 0.4s ease';
                } else {
                    jerarquico.style.display = 'none';
                }
            });
        }
        
        if (filtrosJerarquicos.length > 0) {
            filtrosJerarquicos.forEach(filtro => {
                filtro.addEventListener('click', function() {
                    // Quitar clase active de todos
                    filtrosJerarquicos.forEach(f => f.classList.remove('active'));
                    // Agregar clase active al clickeado
                    this.classList.add('active');
                    // Filtrar jerarquicos
                    const cargo = this.getAttribute('data-cargo');
                    filtrarJerarquicos(cargo);
                });
            });
        }
        
        // ========== 6. SCROLL SUAVE PARA INDICADOR ==========
        const scrollIndicator = document.querySelector('.hero-scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const historiaSection = document.querySelector('.nosotros-historia');
                if (historiaSection) {
                    historiaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
        
        // ========== 7. ANIMACIÓN DE ENTRADA DEL HERO ==========
        const heroContent = document.querySelector('.nosotros-hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(20px)';
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // ========== 8. ANIMACIÓN DE ELEMENTOS AL SCROLL ==========
        const animatedElements = document.querySelectorAll('.historia-content, .mv-card, .valor-card, .jerarquico-card, .docente-card, .campus-content');
        
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
        
        // ========== 9. EFECTO RIPPLE EN BOTONES ==========
        const buttons = document.querySelectorAll('.global-btn, .filtro-docente, .filtro-jerarquico');
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
        
        // ========== 10. FUNCIONES PARA PDF ==========
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
        
        // ========== 11. LOG EN CONSOLA ==========
        console.log('✅ IESTP Paiján | Página Nosotros cargada correctamente');
        console.log('✅ Secciones: Historia, Misión/Visión, Valores, Plana Jerárquica, Plana Docente');
        console.log('✅ Filtros activos: Docentes por carrera | Jerárquicos por cargo');
    });
})();

// ========== ESTILOS DINÁMICOS ==========
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
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .docente-card, .jerarquico-card {
        animation: fadeInUp 0.4s ease;
    }
`;
document.head.appendChild(style);