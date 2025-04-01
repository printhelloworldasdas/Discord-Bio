document.addEventListener('DOMContentLoaded', function() {
    // Audio control
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    
    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            bgMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
    
    // Try to autoplay music (may be blocked by browser)
    document.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play().catch(e => console.log("Autoplay prevented:", e));
        }
    }, { once: true });
    
    // Load dynamic content from API
    fetch('/api/profile')
        .then(response => response.json())
        .then(data => {
            if (data.username) document.getElementById('username').textContent = data.username;
            if (data.discordTag) document.getElementById('discord-tag').textContent = data.discordTag;
            if (data.bio) document.getElementById('bio-text').textContent = data.bio;
            if (data.status) {
                const statusElement = document.querySelector('.status');
                statusElement.className = 'status ' + data.status;
            }
            
            // Update visitor count
            if (data.visitorCount) {
                document.getElementById('visitorCount').textContent = data.visitorCount;
            }
        })
        .catch(error => console.error('Error loading profile:', error));
    
    // Update visitor count (separate call if needed)
    fetch('/api/visitors', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.count) {
                document.getElementById('visitorCount').textContent = data.count;
            }
        });
});
