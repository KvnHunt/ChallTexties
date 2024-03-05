const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = event;
    // Update UI to notify the user they can add to home screen
    showInstallPromotion();
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        
        deferredPrompt.prompt();
  
        const choiceResult = await deferredPrompt.userChoice;
      
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the installation prompt');
        } else {
            console.log('User dismissed the installation prompt');
        }
    
        deferredPrompt = null;
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('App installed successfully!');
});
