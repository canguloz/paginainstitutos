/**
 * IESTP Paiján - Página Servicios
 * Funcionalidad: Menú responsive, cambio de secciones, PDF viewer, Bolsa de Trabajo
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
        
        // ========== 3. FUNCIÓN PARA MOSTRAR SERVICIO (CORREGIDA - SIN SCROLL) ==========
        window.mostrarServicio = function(servicioId) {
            // Ocultar todas las secciones de contenido
            document.querySelectorAll('.servicio-contenido').forEach(serv => {
                serv.classList.remove('active');
            });
            
            // Mostrar la sección seleccionada
            const seccionMostrar = document.getElementById(`contenido-${servicioId}`);
            if (seccionMostrar) {
                seccionMostrar.classList.add('active');
            }
            
            // Mantener la posición actual, NO hacer scroll
            // Simplemente mostramos el contenido sin mover la página
        };
        
        // ========== 4. AGREGAR BOTONES DE MOSTRAR/OCULTAR CONTRASEÑA ==========
        function agregarTogglePassword() {
            // Para el formulario de login
            const loginPasswordInput = document.getElementById('loginPassword');
            if (loginPasswordInput && !loginPasswordInput.parentElement.querySelector('.toggle-password')) {
                const wrapperLogin = document.createElement('div');
                wrapperLogin.style.position = 'relative';
                wrapperLogin.style.width = '100%';
                loginPasswordInput.parentNode.insertBefore(wrapperLogin, loginPasswordInput);
                wrapperLogin.appendChild(loginPasswordInput);
                
                const toggleLogin = document.createElement('i');
                toggleLogin.className = 'fas fa-eye toggle-password';
                toggleLogin.style.cssText = `
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                    color: var(--global-gray);
                    z-index: 10;
                `;
                toggleLogin.onclick = function() {
                    const type = loginPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                    loginPasswordInput.setAttribute('type', type);
                    this.classList.toggle('fa-eye');
                    this.classList.toggle('fa-eye-slash');
                };
                wrapperLogin.appendChild(toggleLogin);
                loginPasswordInput.style.paddingRight = '40px';
            }
            
            // Para el formulario de registro - Contraseña
            const regPasswordInput = document.getElementById('regPassword');
            if (regPasswordInput && !regPasswordInput.parentElement.querySelector('.toggle-password')) {
                const wrapperReg = document.createElement('div');
                wrapperReg.style.position = 'relative';
                wrapperReg.style.width = '100%';
                regPasswordInput.parentNode.insertBefore(wrapperReg, regPasswordInput);
                wrapperReg.appendChild(regPasswordInput);
                
                const toggleReg = document.createElement('i');
                toggleReg.className = 'fas fa-eye toggle-password';
                toggleReg.style.cssText = `
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                    color: var(--global-gray);
                    z-index: 10;
                `;
                toggleReg.onclick = function() {
                    const type = regPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                    regPasswordInput.setAttribute('type', type);
                    this.classList.toggle('fa-eye');
                    this.classList.toggle('fa-eye-slash');
                };
                wrapperReg.appendChild(toggleReg);
                regPasswordInput.style.paddingRight = '40px';
            }
            
            // Para el formulario de registro - Confirmar contraseña
            const regConfirmInput = document.getElementById('regConfirmPassword');
            if (regConfirmInput && !regConfirmInput.parentElement.querySelector('.toggle-password-confirm')) {
                const wrapperConfirm = document.createElement('div');
                wrapperConfirm.style.position = 'relative';
                wrapperConfirm.style.width = '100%';
                regConfirmInput.parentNode.insertBefore(wrapperConfirm, regConfirmInput);
                wrapperConfirm.appendChild(regConfirmInput);
                
                const toggleConfirm = document.createElement('i');
                toggleConfirm.className = 'fas fa-eye toggle-password-confirm';
                toggleConfirm.style.cssText = `
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                    color: var(--global-gray);
                    z-index: 10;
                `;
                toggleConfirm.onclick = function() {
                    const type = regConfirmInput.getAttribute('type') === 'password' ? 'text' : 'password';
                    regConfirmInput.setAttribute('type', type);
                    this.classList.toggle('fa-eye');
                    this.classList.toggle('fa-eye-slash');
                };
                wrapperConfirm.appendChild(toggleConfirm);
                regConfirmInput.style.paddingRight = '40px';
            }
        }
        
        // ========== 5. FUNCIONES PARA BOLSA DE TRABAJO ==========
        window.cambiarTab = function(tab) {
            // Cambiar tabs
            const tabs = document.querySelectorAll('.tab-btn');
            const panels = document.querySelectorAll('.sistema-panel');
            
            tabs.forEach(btn => {
                if (btn.getAttribute('data-tab') === tab) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            
            panels.forEach(panel => {
                if (panel.id === `${tab}-panel`) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
            
            // Reaplicar los toggles de contraseña cuando cambia de tab
            setTimeout(agregarTogglePassword, 100);
        };
        
        // Manejar registro
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const nombres = document.getElementById('regNombres')?.value;
                const apellidos = document.getElementById('regApellidos')?.value;
                const dni = document.getElementById('regDni')?.value;
                const celular = document.getElementById('regCelular')?.value;
                const email = document.getElementById('regEmail')?.value;
                const password = document.getElementById('regPassword')?.value;
                const confirmPassword = document.getElementById('regConfirmPassword')?.value;
                const tipo = document.getElementById('regTipo')?.value;
                const terminos = document.getElementById('terminos')?.checked;
                
                // Validaciones
                if (!nombres || !apellidos) {
                    mostrarNotificacion('❌ Por favor, completa tus nombres y apellidos', 'error');
                    return;
                }
                
                if (!dni || dni.length !== 8 || isNaN(dni)) {
                    mostrarNotificacion('❌ Ingresa un DNI válido de 8 dígitos', 'error');
                    return;
                }
                
                if (!email || !email.includes('@')) {
                    mostrarNotificacion('❌ Ingresa un correo electrónico válido', 'error');
                    return;
                }
                
                if (!password || password.length < 6) {
                    mostrarNotificacion('❌ La contraseña debe tener al menos 6 caracteres', 'error');
                    return;
                }
                
                if (password !== confirmPassword) {
                    mostrarNotificacion('❌ Las contraseñas no coinciden', 'error');
                    return;
                }
                
                if (!tipo) {
                    mostrarNotificacion('❌ Selecciona tu condición (Estudiante/Egresado/Docente)', 'error');
                    return;
                }
                
                if (!terminos) {
                    mostrarNotificacion('❌ Debes aceptar los términos y condiciones', 'error');
                    return;
                }
                
                // Simular registro exitoso
                mostrarNotificacion('✅ ¡Registro exitoso! Ahora puedes iniciar sesión', 'success');
                registerForm.reset();
                
                // Cambiar a login después de 2 segundos
                setTimeout(() => {
                    cambiarTab('login');
                }, 2000);
            });
        }
        
        // Manejar inicio de sesión
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('loginEmail')?.value;
                const password = document.getElementById('loginPassword')?.value;
                
                if (!email || !email.includes('@')) {
                    mostrarNotificacion('❌ Ingresa un correo electrónico válido', 'error');
                    return;
                }
                
                if (!password) {
                    mostrarNotificacion('❌ Ingresa tu contraseña', 'error');
                    return;
                }
                
                // Simular inicio de sesión exitoso
                mostrarNotificacion('✅ ¡Bienvenido! Has iniciado sesión correctamente', 'success');
                loginForm.reset();
            });
        }
        
        // ========== 6. NOTIFICACIONES TOAST ==========
        window.mostrarNotificacion = function(mensaje, tipo = 'success') {
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
        };
        
        // ========== 7. FUNCIONES PARA PDF ==========
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
        
        // ========== 8. SCROLL SUAVE PARA INDICADOR ==========
        const scrollIndicator = document.querySelector('.hero-scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const tarjetasSection = document.querySelector('.servicios-tarjetas');
                if (tarjetasSection) {
                    tarjetasSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
        
        // ========== 9. ANIMACIÓN DE ENTRADA DEL HERO ==========
        const heroContent = document.querySelector('.servicios-hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(20px)';
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // ========== 10. ANIMACIÓN DE TARJETAS AL HACER SCROLL ==========
        const tarjetas = document.querySelectorAll('.servicio-card');
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
        
        tarjetas.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
        
        // ========== 11. EFECTO RIPPLE EN BOTONES ==========
        const buttons = document.querySelectorAll('.btn-servicio, .btn-interno, .global-btn, .btn-bolsa, .btn-oferta, .tab-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                // Prevenir comportamiento por defecto solo si es necesario
                if (this.classList.contains('btn-servicio') && this.getAttribute('onclick')) {
                    // No prevenir, dejar que el onclick maneje
                }
                
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
        
        // ========== 12. INICIALIZAR TOGGLES DE CONTRASEÑA ==========
        agregarTogglePassword();
        
        // ========== 13. LOG EN CONSOLA ==========
        console.log('✅ IESTP Paiján | Página Servicios cargada correctamente');
        console.log('✅ Funciones: Visibilidad de contraseña activada | Scroll corregido');
    });
})();

// ========== ESTILOS DINÁMICOS PARA ANIMACIONES ==========
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
    
    /* Estilos para los toggles de contraseña */
    .toggle-password, .toggle-password-confirm {
        transition: color 0.3s ease;
    }
    
    .toggle-password:hover, .toggle-password-confirm:hover {
        color: var(--global-secondary) !important;
    }
`;
document.head.appendChild(style);