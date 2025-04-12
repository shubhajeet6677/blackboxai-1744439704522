// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    
    // Initialize theme from localStorage
    if (localStorage.getItem('darkMode') === 'true') {
        html.classList.add('dark');
    }

    darkModeToggle?.addEventListener('click', (e) => {
        e.preventDefault();
        html.classList.toggle('dark');
        localStorage.setItem('darkMode', html.classList.contains('dark'));
    });

    // Search Functionality
    const searchForm = document.querySelector('.search-form');
    searchForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = e.target.querySelector('input').value;
        // Implement search logic here
        console.log('Searching for:', searchTerm);
    });

    // Cart Functionality
    const cartCount = document.querySelector('.cart-count');
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    if (cartCount) {
        updateCartCount();
    }

    // Add to Cart Function
    window.addToCart = function(productId, name, price) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        
        const existingItem = cartItems.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({
                id: productId,
                name: name,
                price: price,
                quantity: 1
            });
        }
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount();
    };

    // Update Cart Count
    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.classList.toggle('hidden', totalItems === 0);
        }
    }

    // Initialize Google Maps (if the map container exists)
    const mapContainer = document.getElementById('orderTrackingMap');
    if (mapContainer && typeof google !== 'undefined') {
        initMap();
    }
});

// Google Maps Initialization
function initMap() {
    const map = new google.maps.Map(document.getElementById('orderTrackingMap'), {
        center: { lat: 20.5937, lng: 78.9629 }, // Center of India
        zoom: 5
    });

    // Example delivery tracking (replace with real-time data)
    const deliveryPath = [
        { lat: 19.0760, lng: 72.8777 }, // Mumbai
        { lat: 18.5204, lng: 73.8567 }, // Pune
        { lat: 17.3850, lng: 78.4867 }  // Hyderabad
    ];

    const deliveryRoute = new google.maps.Polyline({
        path: deliveryPath,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    deliveryRoute.setMap(map);
}

// Razorpay Integration
function initializeRazorpay(orderId, amount) {
    const options = {
        key: 'YOUR_RAZORPAY_KEY', // Replace with actual key
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        name: 'QuickMed',
        description: 'Medicine Purchase',
        order_id: orderId,
        handler: function (response) {
            // Handle successful payment
            console.log('Payment successful:', response);
            // Update order status and redirect to success page
            window.location.href = '/order-success.html';
        },
        prefill: {
            name: 'Customer Name',
            email: 'customer@example.com',
            contact: 'Customer Phone'
        },
        theme: {
            color: '#0F766E'
        }
    };

    const rzp = new Razorpay(options);
    rzp.open();
}

// Export functions for use in other files
window.initMap = initMap;
window.initializeRazorpay = initializeRazorpay;
