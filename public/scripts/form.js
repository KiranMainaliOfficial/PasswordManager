  // Form Toggle
        function showRegister() {
            document.getElementById('login-form').classList.remove('active');
            document.getElementById('register-form').classList.add('active');
        }

        function showLogin() {
            document.getElementById('register-form').classList.remove('active');
            document.getElementById('login-form').classList.add('active');
        }

        // Password Strength
        const passwordInputs = document.querySelectorAll('input[type="password"]');
        passwordInputs.forEach(input => {
            input.addEventListener('input', function() {
                const strengthBar = this.parentElement.querySelector('.strength-bar');
                const strength = Math.min(this.value.length * 5, 100);
                strengthBar.style.width = strength + '%';
                strengthBar.style.background = strength < 50 ? 'var(--accent)' : 
                strength < 75 ? '#FFD700' : '#4CAF50';
            });
        });

        // Password Toggle
        document.querySelectorAll('.password-toggle').forEach(toggle => {
            toggle.addEventListener('click', function() {
                const input = this.parentElement.querySelector('input');
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                this.classList.toggle('fa-eye-slash');
            });
        });

        // Form Animation on Load
        setTimeout(() => {
            document.querySelector('.form-container').style.transform = 'translateY(0)';
            document.querySelector('.form-container').style.opacity = '1';
        }, 100);