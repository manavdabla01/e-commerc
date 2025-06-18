// Enhanced product data with more details
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "High-quality sound with active noise cancellation and 30-hour battery life",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8d2lyZWxlc3MlMjBoZWFkcGhvbmVzfGVufDB8fDB8fHww",
    category: "Electronics",
    rating: 4.8,
    reviews: 324,
    inStock: true,
    features: ["Active Noise Cancellation", "30-hour Battery", "Wireless Charging", "Premium Materials"],
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Track your health and fitness goals with advanced sensors and GPS",
    price: 299.99,
    originalPrice: 349.99,
    image: "https://images.pexels.com/photos/9130515/pexels-photo-9130515.jpeg",
    category: "Electronics",
    rating: 4.6,
    reviews: 189,
    inStock: true,
    features: ["GPS Tracking", "Heart Rate Monitor", "Sleep Tracking", "Water Resistant"],
  },
  {
    id: 3,
    name: "Organic Coffee Beans",
    description: "Premium roasted coffee from sustainable farms with rich, bold flavor",
    price: 24.99,
    originalPrice: 29.99,
    image: "https://images.pexels.com/photos/13549431/pexels-photo-13549431.jpeg",
    category: "Food & Beverage",
    rating: 4.9,
    reviews: 567,
    inStock: true,
    features: ["Organic Certified", "Fair Trade", "Single Origin", "Fresh Roasted"],
  },
  {
    id: 4,
    name: "Minimalist Backpack",
    description: "Stylish and functional everyday carry with laptop compartment",
    price: 89.99,
    originalPrice: 109.99,
    image: "https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg",
    category: "Fashion",
    rating: 4.7,
    reviews: 234,
    inStock: true,
    features: ["Laptop Compartment", "Water Resistant", "Ergonomic Design", "Multiple Pockets"],
  },
  {
    id: 5,
    name: "Wireless Charging Pad",
    description: "Fast wireless charging for all Qi-enabled devices with LED indicator",
    price: 49.99,
    originalPrice: 59.99,
    image: "https://images.pexels.com/photos/13130361/pexels-photo-13130361.jpeg",
    category: "Electronics",
    rating: 4.5,
    reviews: 156,
    inStock: true,
    features: ["Fast Charging", "LED Indicator", "Universal Compatibility", "Sleek Design"],
  },
  {
    id: 6,
    name: "Eco-Friendly Water Bottle",
    description: "Sustainable hydration solution made from recycled materials",
    price: 34.99,
    originalPrice: 39.99,
    image: "https://images.pexels.com/photos/5274793/pexels-photo-5274793.jpeg",
    category: "Lifestyle",
    rating: 4.8,
    reviews: 423,
    inStock: true,
    features: ["BPA Free", "Insulated", "Leak Proof", "Eco-Friendly Materials"],
  },
  {
    id: 7,
    name: "Gaming Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with customizable keys",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://images.pexels.com/photos/7915211/pexels-photo-7915211.jpeg",
    category: "Electronics",
    rating: 4.7,
    reviews: 289,
    inStock: true,
    features: ["RGB Backlighting", "Mechanical Switches", "Programmable Keys", "Gaming Optimized"],
  },
  {
    id: 8,
    name: "Yoga Mat Premium",
    description: "Non-slip yoga mat with alignment guides and carrying strap",
    price: 59.99,
    originalPrice: 79.99,
    image: "https://images.pexels.com/photos/4325462/pexels-photo-4325462.jpeg",
    category: "Sports",
    rating: 4.6,
    reviews: 178,
    inStock: true,
    features: ["Non-Slip Surface", "Alignment Guides", "Eco-Friendly", "Carrying Strap"],
  },
]

// Categories data
const categories = [
  { name: "Electronics", icon: "fas fa-laptop", count: 4 },
  { name: "Fashion", icon: "fas fa-tshirt", count: 1 },
  { name: "Food & Beverage", icon: "fas fa-coffee", count: 1 },
  { name: "Lifestyle", icon: "fas fa-home", count: 1 },
  { name: "Sports", icon: "fas fa-dumbbell", count: 1 },
]

// Application state
let cart = JSON.parse(localStorage.getItem("cart")) || []
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
let recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || []
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null
let filteredProducts = [...products]
let currentPage = 1
const productsPerPage = 6

// DOM elements
const productsGrid = document.getElementById("productsGrid")
const cartSidebar = document.getElementById("cartSidebar")
const wishlistSidebar = document.getElementById("wishlistSidebar")
const cartOverlay = document.getElementById("cartOverlay")
const wishlistOverlay = document.getElementById("wishlistOverlay")
const cartItems = document.getElementById("cartItems")
const wishlistItems = document.getElementById("wishlistItems")
const cartCount = document.querySelector(".cart-count")
const wishlistCount = document.querySelector(".wishlist-count")
const cartTotal = document.getElementById("cartTotal")
const cartSubtotal = document.getElementById("cartSubtotal")
const cartShipping = document.getElementById("cartShipping")
const loadingScreen = document.getElementById("loadingScreen")

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  // Show loading screen
  setTimeout(() => {
    loadingScreen.style.opacity = "0"
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 500)
  }, 1500)

  initializeApp()
})

function initializeApp() {
  renderCategories()
  renderProducts()
  updateCartUI()
  updateWishlistUI()
  updateUserUI()
  setupEventListeners()
  setupFilters()
  showRecentlyViewed()

  // Animate elements on scroll
  setupScrollAnimations()

  // Header scroll effect
  setupHeaderEffects()
}

function setupEventListeners() {
  // Search functionality
  const searchInput = document.getElementById("searchInput")
  searchInput.addEventListener("input", handleSearch)

  // Filter controls
  document.getElementById("categoryFilter").addEventListener("change", applyFilters)
  document.getElementById("priceFilter").addEventListener("change", applyFilters)
  document.getElementById("sortFilter").addEventListener("change", applyFilters)

  // View controls
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".view-btn").forEach((b) => b.classList.remove("active"))
      this.classList.add("active")
      toggleView(this.dataset.view)
    })
  })

  // Load more button
  document.getElementById("loadMoreBtn").addEventListener("click", loadMoreProducts)

  // Auth forms
  document.getElementById("loginForm").addEventListener("submit", handleLogin)
  document.getElementById("signupForm").addEventListener("submit", handleSignup)

  // Newsletter
  document.getElementById("newsletterEmail").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      subscribeNewsletter()
    }
  })

  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

function setupFilters() {
  const categoryFilter = document.getElementById("categoryFilter")
  categories.forEach((category) => {
    const option = document.createElement("option")
    option.value = category.name
    option.textContent = `${category.name} (${category.count})`
    categoryFilter.appendChild(option)
  })
}

function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  setTimeout(() => {
    document.querySelectorAll(".product-card, .category-card").forEach((card) => {
      card.style.opacity = "0"
      card.style.transform = "translateY(30px)"
      card.style.transition = "all 0.6s ease-out"
      observer.observe(card)
    })
  }, 100)
}

function setupHeaderEffects() {
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header")
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)"
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)"
      header.style.boxShadow = "none"
    }
  })
}

// Render functions
function renderCategories() {
  const categoriesGrid = document.getElementById("categoriesGrid")
  categoriesGrid.innerHTML = categories
    .map(
      (category) => `
        <div class="category-card" onclick="filterByCategory('${category.name}')">
            <div class="category-icon">
                <i class="${category.icon}"></i>
            </div>
            <div class="category-name">${category.name}</div>
        </div>
    `,
    )
    .join("")
}

function renderProducts(productsToRender = null) {
  const products = productsToRender || filteredProducts.slice(0, currentPage * productsPerPage)
  const isListView = document.querySelector('.view-btn[data-view="list"]').classList.contains("active")

  productsGrid.className = `products-grid ${isListView ? "list-view" : ""}`
  productsGrid.innerHTML = products
    .map(
      (product) => `
        <div class="product-card ${isListView ? "list-view" : ""}" data-product-id="${product.id}" onclick="showProductModal(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-actions">
                    <button class="action-btn ${wishlist.find((item) => item.id === product.id) ? "active" : ""}" 
                            onclick="event.stopPropagation(); toggleWishlistItem(${product.id})" 
                            title="Add to Wishlist">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="action-btn" onclick="event.stopPropagation(); showProductModal(${product.id})" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    ${product.originalPrice ? `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` : ""}
                    $${product.price.toFixed(2)}
                </div>
                <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `,
    )
    .join("")

  // Update load more button
  const loadMoreBtn = document.getElementById("loadMoreBtn")
  if (products.length >= filteredProducts.length) {
    loadMoreBtn.style.display = "none"
  } else {
    loadMoreBtn.style.display = "block"
  }
}

function generateStars(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  let stars = ""

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star star"></i>'
  }

  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt star"></i>'
  }

  const emptyStars = 5 - Math.ceil(rating)
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star star empty"></i>'
  }

  return stars
}

// Search functionality
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase()
  const searchResults = document.getElementById("searchResults")

  if (searchTerm.length > 0) {
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm),
    )

    searchResults.innerHTML =
      results.length > 0
        ? results
            .slice(0, 5)
            .map(
              (product) => `
                <div class="search-result-item" onclick="showProductModal(${product.id}); toggleSearch();">
                    <img src="${product.image}" alt="${product.name}">
                    <div>
                        <div style="font-weight: 600;">${product.name}</div>
                        <div style="color: var(--text-light); font-size: 0.9rem;">$${product.price.toFixed(2)}</div>
                    </div>
                </div>
            `,
            )
            .join("")
        : '<p style="text-align: center; color: var(--text-light);">No products found</p>'
  } else {
    searchResults.innerHTML = ""
  }
}

function toggleSearch() {
  const searchOverlay = document.getElementById("searchOverlay")
  const searchInput = document.getElementById("searchInput")

  searchOverlay.classList.toggle("active")

  if (searchOverlay.classList.contains("active")) {
    setTimeout(() => searchInput.focus(), 300)
  } else {
    searchInput.value = ""
    document.getElementById("searchResults").innerHTML = ""
  }
}

// Filter functionality
function applyFilters() {
  const categoryFilter = document.getElementById("categoryFilter").value
  const priceFilter = document.getElementById("priceFilter").value
  const sortFilter = document.getElementById("sortFilter").value

  filteredProducts = [...products]

  // Category filter
  if (categoryFilter) {
    filteredProducts = filteredProducts.filter((product) => product.category === categoryFilter)
  }

  // Price filter
  if (priceFilter) {
    const [min, max] = priceFilter.split("-")
    if (max === "+") {
      filteredProducts = filteredProducts.filter((product) => product.price >= Number.parseInt(min))
    } else {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= Number.parseInt(min) && product.price <= Number.parseInt(max),
      )
    }
  }

  // Sort filter
  if (sortFilter) {
    switch (sortFilter) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "name":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
    }
  }

  currentPage = 1
  renderProducts()
}

function filterByCategory(category) {
  document.getElementById("categoryFilter").value = category
  applyFilters()
  scrollToProducts()
}

function toggleView(view) {
  renderProducts()
}

function loadMoreProducts() {
  currentPage++
  renderProducts()
}

// Cart functionality
function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...product, quantity: 1 })
  }

  updateCartUI()
  saveToLocalStorage()
  showAddToCartAnimation(productId)
  showToast("Product added to cart!", "success")
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  updateCartUI()
  saveToLocalStorage()
  showToast("Product removed from cart", "success")
}

function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId)
  if (item) {
    item.quantity += change
    if (item.quantity <= 0) {
      removeFromCart(productId)
    } else {
      updateCartUI()
      saveToLocalStorage()
    }
  }
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 9.99
  const total = subtotal + shipping

  cartCount.textContent = totalItems
  cartSubtotal.textContent = subtotal.toFixed(2)
  cartShipping.textContent = shipping.toFixed(2)
  cartTotal.textContent = total.toFixed(2)

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="margin-left: 10px; background: #fee2e2; color: #dc2626;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `,
      )
      .join("")
  }
}

function toggleCart() {
  cartSidebar.classList.toggle("active")
  cartOverlay.classList.toggle("active")
  document.body.style.overflow = cartSidebar.classList.contains("active") ? "hidden" : "auto"
}

// Wishlist functionality
function toggleWishlistItem(productId) {
  const existingItem = wishlist.find((item) => item.id === productId)

  if (existingItem) {
    wishlist = wishlist.filter((item) => item.id !== productId)
    showToast("Removed from wishlist", "success")
  } else {
    const product = products.find((p) => p.id === productId)
    wishlist.push(product)
    showToast("Added to wishlist!", "success")
  }

  updateWishlistUI()
  saveToLocalStorage()
  renderProducts() // Re-render to update wishlist buttons
}

function updateWishlistUI() {
  wishlistCount.textContent = wishlist.length

  if (wishlist.length === 0) {
    wishlistItems.innerHTML = `
            <div class="empty-wishlist">
                <i class="fas fa-heart"></i>
                <p>Your wishlist is empty</p>
            </div>
        `
  } else {
    wishlistItems.innerHTML = wishlist
      .map(
        (item) => `
            <div class="wishlist-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="wishlist-item-info">
                    <div class="wishlist-item-title">${item.name}</div>
                    <div class="wishlist-item-price">$${item.price.toFixed(2)}</div>
                    <div style="margin-top: 0.5rem;">
                        <button class="quantity-btn" onclick="addToCart(${item.id})" style="background: var(--primary-color); color: white;">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                        <button class="quantity-btn" onclick="toggleWishlistItem(${item.id})" style="margin-left: 10px; background: #fee2e2; color: #dc2626;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `,
      )
      .join("")
  }
}

function toggleWishlist() {
  wishlistSidebar.classList.toggle("active")
  wishlistOverlay.classList.toggle("active")
  document.body.style.overflow = wishlistSidebar.classList.contains("active") ? "hidden" : "auto"
}

// Product modal functionality
function showProductModal(productId) {
  const product = products.find((p) => p.id === productId)
  const modal = document.getElementById("productModal")
  const modalBody = document.getElementById("productModalBody")

  // Add to recently viewed
  addToRecentlyViewed(product)

  modalBody.innerHTML = `
        <div class="product-modal-content">
            <div class="product-modal-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-modal-info">
                <h2>${product.name}</h2>
                <div class="product-modal-rating">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-count">(${product.reviews} reviews)</span>
                </div>
                <div class="product-modal-price">
                    ${product.originalPrice ? `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` : ""}
                    $${product.price.toFixed(2)}
                </div>
                <div class="product-modal-description">
                    <p>${product.description}</p>
                    <h4>Features:</h4>
                    <ul>
                        ${product.features.map((feature) => `<li>${feature}</li>`).join("")}
                    </ul>
                </div>
                <div class="product-modal-actions">
                    <button class="modal-btn primary" onclick="addToCart(${product.id}); closeProductModal();">
                        Add to Cart
                    </button>
                    <button class="modal-btn secondary" onclick="toggleWishlistItem(${product.id})">
                        ${wishlist.find((item) => item.id === product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                    </button>
                </div>
            </div>
        </div>
    `

  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeProductModal() {
  document.getElementById("productModal").classList.remove("active")
  document.body.style.overflow = "auto"
}

// Recently viewed functionality
function addToRecentlyViewed(product) {
  recentlyViewed = recentlyViewed.filter((item) => item.id !== product.id)
  recentlyViewed.unshift(product)
  recentlyViewed = recentlyViewed.slice(0, 5)
  saveToLocalStorage()
  showRecentlyViewed()
}

function showRecentlyViewed() {
  const recentlyViewedSection = document.getElementById("recentlyViewed")
  const recentlyViewedGrid = document.getElementById("recentlyViewedGrid")

  if (recentlyViewed.length > 0) {
    recentlyViewedSection.style.display = "block"
    recentlyViewedGrid.innerHTML = recentlyViewed
      .map(
        (product) => `
            <div class="product-card" onclick="showProductModal(${product.id})">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                </div>
            </div>
        `,
      )
      .join("")
  }
}

// Authentication functionality
function toggleUserMenu() {
  document.getElementById("userMenu").classList.toggle("active")
}

function showAuthModal(type) {
  const modal = document.getElementById("authModal")
  const loginForm = document.getElementById("loginForm")
  const signupForm = document.getElementById("signupForm")

  if (type === "login") {
    loginForm.style.display = "block"
    signupForm.style.display = "none"
  } else {
    loginForm.style.display = "none"
    signupForm.style.display = "block"
  }

  modal.classList.add("active")
  document.body.style.overflow = "hidden"
  toggleUserMenu()
}

function closeAuthModal() {
  document.getElementById("authModal").classList.remove("active")
  document.body.style.overflow = "auto"
}

function switchAuthForm(type) {
  const loginForm = document.getElementById("loginForm")
  const signupForm = document.getElementById("signupForm")

  if (type === "login") {
    loginForm.style.display = "block"
    signupForm.style.display = "none"
  } else {
    loginForm.style.display = "none"
    signupForm.style.display = "block"
  }
}

function handleLogin(e) {
  e.preventDefault()
  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value

  // Simple validation (in real app, this would be server-side)
  if (email && password) {
    currentUser = {
      name: email.split("@")[0],
      email: email,
      loginDate: new Date().toISOString(),
    }

    saveToLocalStorage()
    updateUserUI()
    closeAuthModal()
    showToast("Login successful!", "success")
  } else {
    showToast("Please fill in all fields", "error")
  }
}

function handleSignup(e) {
  e.preventDefault()
  const name = document.getElementById("signupName").value
  const email = document.getElementById("signupEmail").value
  const password = document.getElementById("signupPassword").value
  const confirmPassword = document.getElementById("signupConfirmPassword").value

  if (password !== confirmPassword) {
    showToast("Passwords do not match", "error")
    return
  }

  if (name && email && password) {
    currentUser = {
      name: name,
      email: email,
      signupDate: new Date().toISOString(),
    }

    saveToLocalStorage()
    updateUserUI()
    closeAuthModal()
    showToast("Account created successfully!", "success")
  } else {
    showToast("Please fill in all fields", "error")
  }
}

function updateUserUI() {
  const userInfo = document.getElementById("userInfo")
  const userLinks = document.getElementById("userLinks")

  if (currentUser) {
    userInfo.innerHTML = `<p>Welcome, ${currentUser.name}!</p>`
    userInfo.style.display = "block"
    userLinks.style.display = "block"
  } else {
    userInfo.innerHTML = `
            <button onclick="showAuthModal('login')" class="auth-btn">Login</button>
            <button onclick="showAuthModal('signup')" class="auth-btn">Sign Up</button>
        `
    userLinks.style.display = "none"
  }
}

function logout() {
  currentUser = null
  localStorage.removeItem("currentUser")
  updateUserUI()
  toggleUserMenu()
  showToast("Logged out successfully", "success")
}

function showOrderHistory() {
  showToast("Order history feature coming soon!", "warning")
  toggleUserMenu()
}

function showProfile() {
  showToast("Profile management coming soon!", "warning")
  toggleUserMenu()
}

// Utility functions
function showAddToCartAnimation(productId) {
  const productCard = document.querySelector(`[data-product-id="${productId}"]`)
  const button = productCard.querySelector(".add-to-cart")

  button.style.background = "#22c55e"
  button.innerHTML = '<i class="fas fa-check"></i> Added!'

  setTimeout(() => {
    button.style.background = ""
    button.innerHTML = "Add to Cart"
  }, 1500)
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast")
  const toastIcon = toast.querySelector(".toast-icon")
  const toastMessage = toast.querySelector(".toast-message")

  toast.className = `toast ${type}`
  toastMessage.textContent = message

  switch (type) {
    case "success":
      toastIcon.className = "toast-icon fas fa-check-circle"
      break
    case "error":
      toastIcon.className = "toast-icon fas fa-exclamation-circle"
      break
    case "warning":
      toastIcon.className = "toast-icon fas fa-exclamation-triangle"
      break
  }

  toast.classList.add("show")

  setTimeout(() => {
    toast.classList.remove("show")
  }, 3000)
}

function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart))
  localStorage.setItem("wishlist", JSON.stringify(wishlist))
  localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed))
  if (currentUser) {
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
  }
}

function scrollToProducts() {
  document.getElementById("products").scrollIntoView({
    behavior: "smooth",
  })
}

function subscribeNewsletter() {
  const email = document.getElementById("newsletterEmail").value
  if (email && email.includes("@")) {
    showToast("Thank you for subscribing!", "success")
    document.getElementById("newsletterEmail").value = ""
  } else {
    showToast("Please enter a valid email address", "error")
  }
}

// Checkout functionality
document.querySelector(".checkout-btn").addEventListener("click", () => {
  if (cart.length > 0) {
    if (currentUser) {
      const total =
        cart.reduce((sum, item) => sum + item.price * item.quantity, 0) +
        (cart.reduce((sum, item) => sum + item.price * item.quantity, 0) > 100 ? 0 : 9.99)
      showToast(`Order placed successfully! Total: $${total.toFixed(2)}`, "success")
      cart = []
      updateCartUI()
      saveToLocalStorage()
      toggleCart()
    } else {
      showAuthModal("login")
      showToast("Please login to checkout", "warning")
    }
  }
})

// Close modals when clicking outside
document.addEventListener("click", (e) => {
  const userMenu = document.getElementById("userMenu")
  const userBtn = document.querySelector(".user-btn")

  if (!userMenu.contains(e.target) && !userBtn.contains(e.target)) {
    userMenu.classList.remove("active")
  }

  const searchOverlay = document.getElementById("searchOverlay")
  const searchBtn = document.querySelector(".search-btn")

  if (!searchOverlay.contains(e.target) && !searchBtn.contains(e.target)) {
    searchOverlay.classList.remove("active")
  }
})

// Mobile menu toggle
document.querySelector(".menu-toggle").addEventListener("click", () => {
  const navMenu = document.querySelector(".nav-menu")
  navMenu.classList.toggle("active")
})
