document.addEventListener('DOMContentLoaded', function() {
    // Login functionality
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Login failed: ' + (data.message || 'Invalid credentials'));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Login failed. Please try again.');
            });
        });
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            fetch('/api/admin/logout', {
                method: 'POST'
            })
            .then(() => {
                window.location.href = 'login.html';
            });
        });
    }
    
    // Tab switching
    const tabs = document.querySelectorAll('.sidebar nav ul li a');
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                const tabId = this.getAttribute('href').substring(1);
                
                // Update active tab
                tabs.forEach(t => t.parentElement.classList.remove('active'));
                this.parentElement.classList.add('active');
                
                // Show corresponding content
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Load profile data in dashboard
    if (window.location.pathname.includes('dashboard.html')) {
        fetch('/api/admin/profile')
            .then(response => response.json())
            .then(data => {
                if (data.username) document.getElementById('editUsername').value = data.username;
                if (data.discordTag) document.getElementById('editDiscordTag').value = data.discordTag;
                if (data.status) document.getElementById('editStatus').value = data.status;
                if (data.bio) document.getElementById('editBio').value = data.bio;
                
                // Load social links
                if (data.socialLinks && data.socialLinks.length > 0) {
                    const container = document.getElementById('socialLinksContainer');
                    data.socialLinks.forEach(link => {
                        addSocialLinkField(link.platform, link.url);
                    });
                }
            })
            .catch(error => console.error('Error loading profile:', error));
    }
    
    // Add social link field
    const addSocialLinkBtn = document.getElementById('addSocialLink');
    if (addSocialLinkBtn) {
        addSocialLinkBtn.addEventListener('click', function() {
            addSocialLinkField('', '');
        });
    }
    
    // Profile form submission
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const socialLinks = [];
            document.querySelectorAll('.social-link-item').forEach(item => {
                const platform = item.querySelector('select').value;
                const url = item.querySelector('input[type="text"]').value;
                if (platform && url) {
                    socialLinks.push({ platform, url });
                }
            });
            
            const profileData = {
                username: document.getElementById('editUsername').value,
                discordTag: document.getElementById('editDiscordTag').value,
                status: document.getElementById('editStatus').value,
                bio: document.getElementById('editBio').value,
                socialLinks
            };
            
            fetch('/api/admin/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Profile updated successfully!');
                } else {
                    alert('Error updating profile: ' + (data.message || 'Unknown error'));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error updating profile. Please try again.');
            });
        });
    }
});

function addSocialLinkField(platform = '', url = '') {
    const container = document.getElementById('socialLinksContainer');
    const div = document.createElement('div');
    div.className = 'social-link-item';
    
    const select = document.createElement('select');
    select.innerHTML = `
        <option value="discord" ${platform === 'discord' ? 'selected' : ''}>Discord</option>
        <option value="twitter" ${platform === 'twitter' ? 'selected' : ''}>Twitter</option>
        <option value="youtube" ${platform === 'youtube' ? 'selected' : ''}>YouTube</option>
        <option value="twitch" ${platform === 'twitch' ? 'selected' : ''}>Twitch</option>
        <option value="instagram" ${platform === 'instagram' ? 'selected' : ''}>Instagram</option>
        <option value="github" ${platform === 'github' ? 'selected' : ''}>GitHub</option>
        <option value="website" ${platform === 'website' ? 'selected' : ''}>Website</option>
    `;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'URL';
    input.value = url;
    
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn-danger';
    button.innerHTML = '<i class="fas fa-trash"></i>';
    button.addEventListener('click', function() {
        div.remove();
    });
    
    div.appendChild(select);
    div.appendChild(input);
    div.appendChild(button);
    container.appendChild(div);
}
