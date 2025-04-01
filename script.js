document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const welcomeScreen = document.getElementById('welcomeScreen');
    const bioContent = document.getElementById('bioContent');
    const videoBackground = document.querySelector('.video-background');
    const profilePicture = document.getElementById('profilePicture');
    const username = document.getElementById('username');
    const description = document.getElementById('description');
    
    // Click handler for welcome screen
    welcomeScreen.addEventListener('click', function() {
        // Hide welcome screen with fade out effect
        welcomeScreen.style.opacity = '0';
        welcomeScreen.addEventListener('transitionend', function() {
            welcomeScreen.style.display = 'none';
        }, { once: true });
        
        // Show bio content with fade in effect
        bioContent.style.display = 'block';
        setTimeout(() => {
            bioContent.style.opacity = '1';
        }, 10);
        
        // Remove blur from background
        videoBackground.classList.add('clear');
        
        // Make elements editable
        username.contentEditable = true;
        description.contentEditable = true;
        
        // Focus on the username first
        username.focus();
        
        // Highlight all text for easy replacement
        selectElementContents(username);
    });
    
    // Function to select all contents of an element
    function selectElementContents(el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
    
    // Optional: Add profile picture upload functionality
    profilePicture.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    profilePicture.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        };
        
        input.click();
    });
    
    // Optional: Save content to localStorage
    function saveBio() {
        const bioData = {
            username: username.textContent,
            description: description.textContent,
            profilePicture: profilePicture.src
        };
        localStorage.setItem('discordBio', JSON.stringify(bioData));
    }
    
    // Optional: Load saved bio
    function loadBio() {
        const savedBio = localStorage.getItem('discordBio');
        if (savedBio) {
            const bioData = JSON.parse(savedBio);
            username.textContent = bioData.username;
            description.textContent = bioData.description;
            profilePicture.src = bioData.profilePicture;
        }
    }
    
    // Call loadBio if you want to implement saving
    // loadBio();
    
    // Add event listeners to save on edit
    username.addEventListener('blur', saveBio);
    description.addEventListener('blur', saveBio);
});
