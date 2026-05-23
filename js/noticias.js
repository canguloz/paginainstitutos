/**
 * IESTP Paiján - Página de Noticias
 * Interactividad: menú responsive, filtros, modal de noticias, newsletter
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
                    // Animación de entrada
                    navMenu.style.animation = 'slideInMenu 0.3s ease';
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    navMenu.style.animation = 'slideOutMenu 0.3s ease';
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
        
        // ========== 3. FILTROS POR CATEGORÍA ==========
        const filtroBtns = document.querySelectorAll('.filtro-btn');
        const noticias = document.querySelectorAll('.noticia-card');
        const noResultados = document.getElementById('noResultados');
        const noticiasGrid = document.getElementById('noticiasGrid');
        
        function filtrarNoticias(categoria) {
            let noticiasVisibles = 0;
            
            noticias.forEach(noticia => {
                const categoriaNoticia = noticia.getAttribute('data-categoria');
                
                if (categoria === 'todas' || categoriaNoticia === categoria) {
                    noticia.style.display = 'block';
                    noticiasVisibles++;
                    // Animación sutil al filtrar
                    noticia.style.animation = 'fadeInUp 0.4s ease';
                } else {
                    noticia.style.display = 'none';
                }
            });
            
            // Mostrar u ocultar mensaje de "no resultados"
            if (noResultados) {
                if (noticiasVisibles === 0) {
                    noResultados.style.display = 'block';
                    if (noticiasGrid) noticiasGrid.style.display = 'none';
                } else {
                    noResultados.style.display = 'none';
                    if (noticiasGrid) noticiasGrid.style.display = 'grid';
                }
            }
        }
        
        // Evento para botones de filtro
        filtroBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Quitar clase active de todos
                filtroBtns.forEach(b => b.classList.remove('active'));
                // Agregar clase active al clickeado
                this.classList.add('active');
                // Filtrar noticias
                const categoria = this.getAttribute('data-categoria');
                filtrarNoticias(categoria);
            });
        });
        
        // ========== 4. LEER MÁS (Mostrar/ocultar detalles) ==========
        const botonesLeerMas = document.querySelectorAll('.noticia-btn');
        
        botonesLeerMas.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const noticiaCard = this.closest('.noticia-card');
                const detalle = noticiaCard.querySelector('.noticia-detalle');
                
                if (detalle) {
                    if (detalle.style.display === 'none' || detalle.style.display === '') {
                        detalle.style.display = 'block';
                        this.innerHTML = 'Mostrar menos <i class="fas fa-arrow-up"></i>';
                    } else {
                        detalle.style.display = 'none';
                        this.innerHTML = 'Leer más <i class="fas fa-arrow-right"></i>';
                    }
                }
            });
        });
        
        // ========== 5. MODAL DE NOTICIAS COMPLETAS ==========
        window.verNoticiaCompleta = function(noticiaId) {
            const modal = document.getElementById('noticiaModal');
            const modalTitulo = document.getElementById('modalNoticiaTitulo');
            const modalFecha = document.getElementById('modalNoticiaFecha');
            const modalContenido = document.getElementById('modalNoticiaContenido');
            const modalImagen = document.getElementById('modalNoticiaImagen');
            
            // Datos de las noticias (puedes expandir este objeto)
            const noticiasData = {
                1: {
                    titulo: 'Jornada de Puertas Abiertas 2026',
                    fecha: '15 de Marzo, 2026',
                    imagen: 'images/noticia-puertas.jpg',
                    contenido: `
                        <p>El IESTP Paiján abre sus puertas a la comunidad para mostrar sus instalaciones, laboratorios y carreras técnicas.</p>
                        <p><strong>📍 Lugar:</strong> Campus IESTP Paiján</p>
                        <p><strong>🕒 Horario:</strong> 9:00 am - 4:00 pm</p>
                        <p><strong>🎯 Actividades:</strong> Talleres prácticos, demostraciones de laboratorio, charlas informativas y recorridos guiados.</p>
                        <p>¡Te esperamos con actividades prácticas y talleres demostrativos! No faltes a esta experiencia única donde podrás conocer de cerca nuestra oferta educativa.</p>
                        <p>Para más información, contáctanos al 919 490 297 o escríbenos a admision@iestpaijan.edu.pe</p>
                    `
                },
                2: {
                    titulo: 'Nuevo convenio con Clínica San Pablo',
                    fecha: '01 de Marzo, 2026',
                    imagen: 'images/noticia-convenio.jpg',
                    contenido: `
                        <p>El IESTP Paiján y la Clínica San Pablo firman un importante convenio de cooperación interinstitucional que beneficiará a estudiantes de Enfermería Técnica.</p>
                        <p><strong>🤝 Beneficios:</strong> Prácticas profesionales en la clínica, pasantías y bolsa de trabajo exclusiva.</p>
                        <p><strong>👩‍⚕️ Dirigido a:</strong> Estudiantes de Enfermería Técnica</p>
                        <p><strong>📅 Inicio:</strong> Ciclo académico 2026</p>
                        <p>Este convenio permitirá a nuestros estudiantes realizar sus prácticas en una de las mejores clínicas de la región, adquiriendo experiencia real en el campo de la salud.</p>
                    `
                },
                3: {
                    titulo: 'Inician clases del ciclo académico 2026',
                    fecha: '20 de Febrero, 2026',
                    imagen: 'images/noticia-clases.jpg',
                    contenido: `
                        <p>Damos la bienvenida a nuestros nuevos y antiguos estudiantes. Comienza un nuevo ciclo lleno de aprendizajes y oportunidades profesionales.</p>
                        <p><strong>📅 Fecha:</strong> 20 de Mayo de 2026</p>
                        <p><strong>📍 Lugar:</strong> Campus IESTP Paiján</p>
                        <p><strong>📌 Importante:</strong> Revisar el cronograma de actividades en la página web.</p>
                        <p>Los esperamos con entusiasmo para iniciar este nuevo periodo académico. Revisen el calendario académico para conocer las fechas importantes.</p>
                    `
                },
                4: {
                    titulo: 'IESTP Paiján obtiene certificación ISO 9001:2025',
                    fecha: '10 de Enero, 2026',
                    imagen: 'images/noticia-logro.jpg',
                    contenido: `
                        <p>El instituto recibe la certificación internacional de calidad educativa, reafirmando su compromiso con la excelencia académica.</p>
                        <p><strong>🏅 Certificación:</strong> ISO 9001:2025</p>
                        <p><strong>📋 Alcance:</strong> Gestión de la calidad educativa</p>
                        <p><strong>🌐 Vigencia:</strong> 3 años</p>
                        <p>Este importante logro posiciona al IESTP Paiján como un instituto de calidad reconocido internacionalmente, garantizando a nuestros estudiantes una formación de excelencia.</p>
                    `
                },
                5: {
                    titulo: 'Feria de Carreras Técnicas 2025',
                    fecha: '05 de Diciembre, 2025',
                    imagen: 'images/noticia-feria.jpg',
                    contenido: `
                        <p>Estudiantes de últimos ciclos presentaron sus proyectos de innovación tecnológica, agropecuaria y de salud ante empresarios de la región.</p>
                        <p><strong>🏆 Proyectos destacados:</strong> Sistema de riego automatizado, aplicación de telemedicina, software de gestión académica.</p>
                        <p><strong>👥 Participantes:</strong> 150 estudiantes expositores</p>
                        <p>La feria fue todo un éxito, con más de 300 visitantes que conocieron los proyectos innovadores de nuestros estudiantes.</p>
                    `
                },
                6: {
                    titulo: 'Alianza con principales agroexportadoras',
                    fecha: '20 de Noviembre, 2025',
                    imagen: 'images/noticia-agro.jpg',
                    contenido: `
                        <p>El IESTP Paiján establece alianzas estratégicas con empresas agroexportadoras para prácticas y bolsa de trabajo exclusiva.</p>
                        <p><strong>🤝 Empresas aliadas:</strong> Camposol, Danper, Virú, Agroindustrial Laredo</p>
                        <p><strong>🎯 Beneficios:</strong> Prácticas preprofesionales y oportunidades laborales</p>
                        <p>Esta alianza permitirá a nuestros estudiantes acceder a prácticas en las principales empresas agroexportadoras de la región.</p>
                    `
                }
            };
            
            const data = noticiasData[noticiaId];
            if (data && modal) {
                modalTitulo.textContent = data.titulo;
                modalFecha.innerHTML = `<i class="far fa-calendar-alt"></i> ${data.fecha}`;
                modalContenido.innerHTML = data.contenido;
                modalImagen.src = data.imagen;
                modalImagen.alt = data.titulo;
                modal.style.display = 'flex';
            }
        };
        
        // ========== 6. CERRAR MODAL NOTICIA ==========
        window.cerrarModalNoticia = function() {
            const modal = document.getElementById('noticiaModal');
            if (modal) {
                modal.style.display = 'none';
            }
        };
        
        // Cerrar modal con click en la X o fuera del contenido
        document.addEventListener('click', function(e) {
            const modal = document.getElementById('noticiaModal');
            if (modal && modal.style.display === 'flex') {
                const modalContent = modal.querySelector('.modal-noticia-content');
                const closeBtn = modal.querySelector('.modal-noticia-close');
                if (closeBtn && closeBtn.contains(e.target)) {
                    cerrarModalNoticia();
                } else if (modalContent && !modalContent.contains(e.target)) {
                    cerrarModalNoticia();
                }
            }
        });
        
        // ========== 7. NEWSLETTER - ENVÍO DE FORMULARIO ==========
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const emailInput = this.querySelector('input[type="email"]');
                const email = emailInput.value;
                
                if (email && email.includes('@')) {
                    // Mostrar notificación de éxito
                    mostrarNotificacion('✅ ¡Gracias por suscribirte! Recibirás nuestras noticias en tu correo.', 'success');
                    emailInput.value = '';
                } else {
                    mostrarNotificacion('❌ Por favor, ingresa un correo electrónico válido.', 'error');
                }
            });
        }
        
        // ========== 8. NOTIFICACIONES TOAST ==========
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
            
            // Estilos del toast
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
        
        // ========== 9. FUNCIONES PARA PDF ==========
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
        
        // ========== 10. FUNCIÓN PARA RESET FILTROS ==========
        window.resetFiltros = function() {
            const btnTodas = document.querySelector('.filtro-btn[data-categoria="todas"]');
            if (btnTodas) {
                btnTodas.click();
            }
        };
        
        // ========== 11. FUNCIÓN PARA CARGAR MÁS NOTICIAS (paginación) ==========
        window.cargarMasNoticias = function() {
            // Aquí se puede implementar lógica de paginación AJAX
            mostrarNotificacion('🔍 Próximamente más noticias.', 'info');
        };
        
        // ========== 12. SCROLL SUAVE PARA ENLACES INTERNOS ==========
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
        
        // ========== 13. ANIMACIÓN DE ENTRADA DE NOTICIAS ==========
        const noticiasCards = document.querySelectorAll('.noticia-card');
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
        
        noticiasCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
        
        // ========== 14. EFECTO RIPPLE EN BOTONES ==========
        const buttons = document.querySelectorAll('.global-btn, .noticia-btn, .filtro-btn');
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
        
        // ========== 15. APARICIÓN DEL HERO ==========
        const heroContent = document.querySelector('.noticias-hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(20px)';
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // ========== 16. LOG EN CONSOLA ==========
        console.log('✅ IESTP Paiján | Página de Noticias cargada correctamente');
    });
})();

// ========== ESTILOS DINÁMICOS PARA ANIMACIONES ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInMenu {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOutMenu {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
    
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