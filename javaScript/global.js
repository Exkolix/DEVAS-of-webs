// Toggle dropdowns on click
document.querySelectorAll('.dropdown-container').forEach(container => {
    const button = container.querySelector('button');
    const dropdown = container.querySelector('.dropdown-content');

    button.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent immediate closing
        const isActive = container.classList.contains('active');
        
        // Close all dropdowns first
        document.querySelectorAll('.dropdown-container').forEach(c => 
            c.classList.remove('active'));
        
        // Toggle clicked dropdown
        if (!isActive) container.classList.add('active');
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown-container')) {
        document.querySelectorAll('.dropdown-container').forEach(c => 
            c.classList.remove('active'));
    }
});