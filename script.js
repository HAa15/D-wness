// Global variables
let currentTab = 'main';
let menuVisible = false;

// Initialize menu
document.addEventListener('DOMContentLoaded', function() {
    // Hide menu initially
    const menuContainer = document.getElementById('menu-container');
    menuContainer.classList.add('menu-hidden');
    
    // Listen for messages from Lua
    window.addEventListener('message', function(event) {
        const data = event.data;
        
        switch(data.action) {
            case 'showMenu':
                showMenu();
                break;
            case 'hideMenu':
                hideMenu();
                break;
            case 'toggleMenu':
                toggleMenu();
                break;
            case 'notification':
                showNotification(data.title, data.message);
                break;
            case 'updateWeapon':
                updateWeaponInput(data.weapon);
                break;
        }
    });
    
    // Make menu draggable
    makeDraggable();
});

// Menu visibility functions
function showMenu() {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.classList.remove('menu-hidden');
    menuVisible = true;
}

function hideMenu() {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.classList.add('menu-hidden');
    menuVisible = false;
}

function toggleMenu() {
    if (menuVisible) {
        hideMenu();
    } else {
        showMenu();
    }
}

function closeMenu() {
    hideMenu();
    sendToLua({action: 'menuClosed'});
}

// Tab switching
function switchTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab content
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Add active class to selected tab
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    currentTab = tabName;
}

// Notification system
function showNotification(title, message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `<strong>${title}</strong><br>${message}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Send data to Lua
function sendToLua(data) {
    fetch(`https://${GetParentResourceName()}/nuiCallback`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
}

// Main menu functions
function toggleIdShow() {
    const checked = document.getElementById('id-goster').checked;
    sendToLua({
        action: 'toggleIdShow',
        enabled: checked
    });
}

function executeFunction(functionName) {
    sendToLua({
        action: 'executeFunction',
        functionName: functionName
    });
}

// Vehicle menu functions
function createVehicle() {
    const model = document.getElementById('vehicle-model').value;
    const giveKey = document.getElementById('give-key').checked;
    
    if (!model) {
        showNotification('Hata', 'Geçerli bir araç modeli giriniz!');
        return;
    }
    
    sendToLua({
        action: 'createVehicle',
        model: model,
        giveKey: giveKey
    });
}

function toggleSpeedboost() {
    const enabled = document.getElementById('speedboost').checked;
    sendToLua({
        action: 'toggleSpeedboost',
        enabled: enabled
    });
}

function toggleVehicleGod() {
    const enabled = document.getElementById('vehicle-god').checked;
    sendToLua({
        action: 'toggleVehicleGod',
        enabled: enabled
    });
}

// Troll menu functions
function ramPlayer() {
    const targetId = document.getElementById('ram-target-id').value;
    if (!targetId) {
        showNotification('Hata', 'Geçerli bir oyuncu ID giriniz!');
        return;
    }
    
    sendToLua({
        action: 'ramPlayer',
        targetId: parseInt(targetId)
    });
}

function startVehicleRain() {
    const model = document.getElementById('vehicle-spawn-model').value;
    if (!model) {
        showNotification('Hata', 'Geçerli bir araç modeli giriniz!');
        return;
    }
    
    sendToLua({
        action: 'startVehicleRain',
        model: model
    });
}

function stopVehicleRain() {
    sendToLua({action: 'stopVehicleRain'});
}

function startHelicopterRain() {
    const targetId = document.getElementById('helicopter-target-id').value;
    if (!targetId) {
        showNotification('Hata', 'Geçerli bir oyuncu ID giriniz!');
        return;
    }
    
    sendToLua({
        action: 'startHelicopterRain',
        targetId: parseInt(targetId)
    });
}

function stopHelicopterRain() {
    sendToLua({action: 'stopHelicopterRain'});
}

function freezePlayer() {
    const targetId = document.getElementById('freeze-target-id').value;
    if (!targetId) {
        showNotification('Hata', 'Geçerli bir oyuncu ID giriniz!');
        return;
    }
    
    sendToLua({
        action: 'freezePlayer',
        targetId: parseInt(targetId)
    });
}

function startPedSpam() {
    const targetId = document.getElementById('ped-spam-target-id').value;
    if (!targetId) {
        showNotification('Hata', 'Geçerli bir oyuncu ID giriniz!');
        return;
    }
    
    sendToLua({
        action: 'startPedSpam',
        targetId: parseInt(targetId)
    });
}

function stopPedSpam() {
    sendToLua({action: 'stopPedSpam'});
}

function startNpcSpawn() {
    const targetId = document.getElementById('npc-target-id').value;
    if (!targetId) {
        showNotification('Hata', 'Geçerli bir oyuncu ID giriniz!');
        return;
    }
    
    sendToLua({
        action: 'startNpcSpawn',
        targetId: parseInt(targetId)
    });
}

function stopNpcSpawn() {
    sendToLua({action: 'stopNpcSpawn'});
}

function bringPlayer() {
    const targetId = document.getElementById('bring-target-id').value;
    if (!targetId) {
        showNotification('Hata', 'Geçerli bir oyuncu ID giriniz!');
        return;
    }
    
    sendToLua({
        action: 'bringPlayer',
        targetId: parseInt(targetId)
    });
}

function followPlayer() {
    const targetId = document.getElementById('follow-target-id').value;
    if (!targetId) {
        showNotification('Hata', 'Geçerli bir oyuncu ID giriniz!');
        return;
    }
    
    sendToLua({
        action: 'followPlayer',
        targetId: parseInt(targetId)
    });
}

function followAndOpenInventory() {
    const targetId = document.getElementById('follow-target-id').value;
    if (!targetId) {
        showNotification('Hata', 'Geçerli bir oyuncu ID giriniz!');
        return;
    }
    
    sendToLua({
        action: 'followAndOpenInventory',
        targetId: parseInt(targetId)
    });
}

function openNearbyInventory() {
    sendToLua({action: 'openNearbyInventory'});
}

function cagePlayer() {
    const targetId = document.getElementById('cage-target-id').value;
    if (!targetId) {
        showNotification('Hata', 'Geçerli bir oyuncu ID giriniz!');
        return;
    }
    
    sendToLua({
        action: 'cagePlayer',
        targetId: parseInt(targetId)
    });
}

function startBlackhole() {
    const targetId = document.getElementById('blackhole-target-id').value;
    if (!targetId) {
        showNotification('Hata', 'Geçerli bir oyuncu ID giriniz!');
        return;
    }
    
    sendToLua({
        action: 'startBlackhole',
        targetId: parseInt(targetId)
    });
}

function stopBlackhole() {
    sendToLua({action: 'stopBlackhole'});
}

function spawnVehicleAtTarget() {
    const targetId = document.getElementById('blackhole-target-id').value;
    if (!targetId) {
        showNotification('Hata', 'Geçerli bir oyuncu ID giriniz!');
        return;
    }
    
    sendToLua({
        action: 'spawnVehicleAtTarget',
        targetId: parseInt(targetId)
    });
}

function startBlackholeV2() {
    const targetId = document.getElementById('blackhole-target-id').value;
    if (!targetId) {
        showNotification('Hata', 'Geçerli bir oyuncu ID giriniz!');
        return;
    }
    
    sendToLua({
        action: 'startBlackholeV2',
        targetId: parseInt(targetId)
    });
}

function stopBlackholeV2() {
    sendToLua({action: 'stopBlackholeV2'});
}

function startBringV2() {
    const targetId = document.getElementById('bringv2-target-id').value;
    if (!targetId) {
        showNotification('Hata', 'Geçerli bir oyuncu ID giriniz!');
        return;
    }
    
    sendToLua({
        action: 'startBringV2',
        targetId: parseInt(targetId)
    });
}

function allBring() {
    sendToLua({action: 'allBring'});
}

// ERP menu functions
function applyERPAnimation() {
    const targetId = document.getElementById('erp-target-id').value;
    if (!targetId) {
        showNotification('Hata', 'Geçerli bir oyuncu ID giriniz!');
        return;
    }
    
    sendToLua({
        action: 'applyERPAnimation',
        targetId: parseInt(targetId)
    });
}

function erpNearby() {
    sendToLua({action: 'erpNearby'});
}

function erpExhaust() {
    sendToLua({action: 'erpExhaust'});
}

// Anticheat functions
function scanElectron() {
    sendToLua({action: 'scanElectron'});
}

function scanFiveGuard() {
    sendToLua({action: 'scanFiveGuard'});
}

function toggleElectron() {
    sendToLua({action: 'toggleElectron'});
}

function toggleFiveGuard() {
    sendToLua({action: 'toggleFiveGuard'});
}

function toggleZCN() {
    sendToLua({action: 'toggleZCN'});
}

// Weapon functions
function updateWeaponInput(weapon) {
    document.getElementById('weapon-name').value = weapon;
}

// Make menu draggable
function makeDraggable() {
    const menuContainer = document.getElementById('menu-container');
    const header = document.querySelector('.menu-header');
    
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    
    header.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    
    function dragStart(e) {
        if (e.target.classList.contains('close-btn')) return;
        
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        
        if (e.target === header || header.contains(e.target)) {
            isDragging = true;
        }
    }
    
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            
            xOffset = currentX;
            yOffset = currentY;
            
            menuContainer.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px))`;
        }
    }
    
    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }
}

// Utility function to get parent resource name
function GetParentResourceName() {
    return window.location.hostname;
}