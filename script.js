// ============================
// MOTIVATIONAL QUOTES
// ============================

const quotes = [
    {
        text: "Your time is limited, don't waste it living someone else's life.",
        author: "Steve Jobs"
    },
    {
        text: "Life is what happens when you're busy making other plans.",
        author: "John Lennon"
    },
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Don't count the days, make the days count.",
        author: "Muhammad Ali"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "Imagination is more important than knowledge.",
        author: "Albert Einstein"
    },
    {
        text: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
        author: "Albert Einstein"
    },
    {
        text: "Success is going from failure to failure without losing your enthusiasm.",
        author: "Winston Churchill"
    },
    {
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
    },
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Don't wait. There will never be a perfect time.",
        author: "Napoleon Hill"
    },
    {
        text: "Life is 10% what happens to you and 90% how you react to it.",
        author: "Charles R. Swindoll"
    },
    {
        text: "The purpose of our lives is to be happy.",
        author: "Dalai Lama"
    },
    {
        text: "To live is to be born at every instant.",
        author: "Erich Fromm"
    },
    {
        text: "Time is more valuable than money. You can get more money, but you cannot get more time.",
        author: "Jim Rohn"
    },
    {
        text: "Don't let yesterday take up too much of today.",
        author: "Will Rogers"
    },
    {
        text: "The secret of getting ahead is getting started.",
        author: "Mark Twain"
    },
    {
        text: "The years teach much which the days never knew.",
        author: "Ralph Waldo Emerson"
    },
    {
        text: "Life is really simple, but we insist on making it complicated.",
        author: "Confucius"
    },
    {
        text: "Time is the wisest counselor of all.",
        author: "Plutarch"
    },
    {
        text: "Every moment is a fresh beginning.",
        author: "Oprah Winfrey"
    },
    {
        text: "Time flies. It's up to you to be the navigator.",
        author: "Michael Altshuler"
    },
    {
        text: "There is nothing permanent except change.",
        author: "Heraclitus"
    },
    {
        text: "Action is the foundational key to all success.",
        author: "Pablo Picasso"
    },
    {
        text: "The most important moment is now.",
        author: "Buddha"
    }
];

// ============================
// DOM ELEMENTS
// ============================

const yearPercentageEl = document.getElementById('yearPercentage');
const currentYearEl = document.getElementById('currentYear');
const currentDateEl = document.getElementById('currentDate');
const daysRemainingEl = document.getElementById('daysRemaining');
const progressBarEl = document.getElementById('progressBar');
const wakeBtnEl = document.getElementById('wakeBtn');
const quoteContainerEl = document.getElementById('quoteContainer');
const quoteTextEl = document.getElementById('quoteText');
const quoteAuthorEl = document.getElementById('quoteAuthor');
const bucketInputEl = document.getElementById('bucketInput');
const addBtnEl = document.getElementById('addBtn');
const bucketListEl = document.getElementById('bucketList');
const completedCountEl = document.getElementById('completedCount');
const totalCountEl = document.getElementById('totalCount');

// Auth elements
const loginPageEl = document.getElementById('loginPage');
const mainAppEl = document.getElementById('mainApp');
const loginBtnEl = document.getElementById('loginBtn');
const logoutBtnEl = document.getElementById('logoutBtn');
const userInfoEl = document.getElementById('userInfo');
const userIconEl = document.getElementById('userIcon');
const userNameEl = document.getElementById('userName');

// ============================
// GLOBAL STATE
// ============================

let currentUser = null;

// ============================
// DATE AND PROGRESS FUNCTIONS
// ============================

/**
 * Calculates the percentage of the year that has passed
 */
function calculateYearProgress() {
    const now = new Date();
    const year = now.getFullYear();

    // Start of year
    const startOfYear = new Date(year, 0, 1);

    // End of year
    const endOfYear = new Date(year + 1, 0, 1);

    // Time elapsed since start of year
    const elapsed = now - startOfYear;

    // Total duration of year
    const total = endOfYear - startOfYear;

    // Percentage
    const percentage = (elapsed / total) * 100;

    return {
        percentage: percentage,
        year: year,
        daysRemaining: Math.ceil((endOfYear - now) / (1000 * 60 * 60 * 24))
    };
}

/**
 * Updates year information in the UI
 */
function updateYearInfo() {
    const progress = calculateYearProgress();

    // Update percentage
    yearPercentageEl.textContent = `${Math.floor(progress.percentage)}%`;

    // Update current year
    currentYearEl.textContent = progress.year;

    // Update current date
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    currentDateEl.textContent = now.toLocaleDateString('en-US', options);

    // Update days remaining
    daysRemainingEl.textContent = progress.daysRemaining;

    // Update progress bar
    progressBarEl.style.width = `${progress.percentage}%`;
}

// ============================
// MOTIVATIONAL QUOTES FUNCTIONS
// ============================

/**
 * Gets a random quote
 */
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

/**
 * Shows a motivational quote
 */
function showQuote() {
    const quote = getRandomQuote();

    // Fade out
    quoteContainerEl.classList.remove('show');

    // Change content after animation
    setTimeout(() => {
        quoteTextEl.textContent = `"${quote.text}"`;
        quoteAuthorEl.textContent = quote.author;

        // Fade in
        quoteContainerEl.classList.add('show');
    }, 300);
}

// ============================
// AUTHENTICATION FUNCTIONS
// ============================

/**
 * Sign in with Google
 */
async function signInWithGoogle() {
    try {
        await auth.signInWithPopup(googleProvider);
    } catch (error) {
        console.error('Error signing in:', error);
        alert('Error signing in. Please try again.');
    }
}

/**
 * Sign out
 */
async function signOut() {
    try {
        await auth.signOut();
    } catch (error) {
        console.error('Error signing out:', error);
        alert('Error signing out. Please try again.');
    }
}

/**
 * Update UI based on auth state
 */
function updateAuthUI(user) {
    if (user) {
        // User is signed in - show main app, hide login page
        currentUser = user;
        loginPageEl.style.display = 'none';
        mainAppEl.style.display = 'flex';
        userNameEl.textContent = user.displayName || user.email;
    } else {
        // User is signed out - show login page, hide main app
        currentUser = null;
        loginPageEl.style.display = 'flex';
        mainAppEl.style.display = 'none';
    }
}

// ============================
// BUCKET LIST FUNCTIONS
// ============================

/**
 * Loads items from Firestore or localStorage
 */
async function loadBucketList() {
    bucketListEl.innerHTML = '';

    if (currentUser) {
        // Load from Firestore
        try {
            const docRef = db.collection('users').doc(currentUser.uid);
            const doc = await docRef.get();

            if (doc.exists) {
                const items = doc.data().bucketList || [];
                items.forEach((item, index) => {
                    createBucketItem(item.text, item.completed, index);
                });
            }
        } catch (error) {
            console.error('Error loading from Firestore:', error);
            loadFromLocalStorage();
        }
    } else {
        // Load from localStorage
        loadFromLocalStorage();
    }

    updateCounter();
}

/**
 * Loads items from localStorage (fallback)
 */
function loadFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem('bucketList')) || [];
    items.forEach((item, index) => {
        createBucketItem(item.text, item.completed, index);
    });
}

/**
 * Saves items to Firestore and localStorage
 */
async function saveBucketList() {
    const items = [];
    const listItems = bucketListEl.querySelectorAll('.bucket-item');

    listItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const label = item.querySelector('label');

        items.push({
            text: label.textContent,
            completed: checkbox.checked
        });
    });

    // Always save to localStorage as backup
    localStorage.setItem('bucketList', JSON.stringify(items));

    // If user is signed in, save to Firestore
    if (currentUser) {
        try {
            await db.collection('users').doc(currentUser.uid).set({
                bucketList: items,
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (error) {
            console.error('Error saving to Firestore:', error);
        }
    }
}

/**
 * Enables edit mode for an item
 */
function enableEditMode(li, label) {
    const currentText = label.textContent;
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'edit-input';
    editInput.value = currentText;
    editInput.maxLength = 100;

    // Replace label with input
    li.replaceChild(editInput, label);
    editInput.focus();
    editInput.select();

    // Function to save changes
    const saveEdit = () => {
        const newText = editInput.value.trim();
        if (newText !== '' && newText !== currentText) {
            label.textContent = newText;
        }
        li.replaceChild(label, editInput);
        saveBucketList();
    };

    // Function to cancel edit
    const cancelEdit = () => {
        li.replaceChild(label, editInput);
    };

    // Event listeners for input
    editInput.addEventListener('blur', saveEdit);
    editInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            cancelEdit();
        }
    });
}

/**
 * Creates a bucket list item element
 */
function createBucketItem(text, completed = false, index) {
    const li = document.createElement('li');
    li.className = 'bucket-item';
    if (completed) li.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.id = `item-${index}`;

    const label = document.createElement('label');
    label.textContent = text;
    label.setAttribute('for', `item-${index}`);

    // Edit button (pencil)
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    const editIcon = document.createElement('span');
    editIcon.className = 'material-symbols-outlined';
    editIcon.textContent = 'edit';
    editBtn.appendChild(editIcon);
    editBtn.title = 'Edit';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '×';
    deleteBtn.title = 'Delete';

    // Event listeners
    checkbox.addEventListener('change', () => {
        const wasCompleted = li.classList.contains('completed');

        if (checkbox.checked) {
            li.classList.add('completed');
            // Celebration animation if just completed
            if (!wasCompleted) {
                li.classList.add('celebrate');
                setTimeout(() => li.classList.remove('celebrate'), 500);
            }
        } else {
            li.classList.remove('completed');
        }
        saveBucketList();
        updateCounter();
    });

    // Double click on label to edit
    label.addEventListener('dblclick', (e) => {
        e.preventDefault();
        enableEditMode(li, label);
    });

    // Click on edit button
    editBtn.addEventListener('click', (e) => {
        e.preventDefault();
        enableEditMode(li, label);
    });

    deleteBtn.addEventListener('click', () => {
        li.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            li.remove();
            saveBucketList();
            updateCounter();
        }, 300);
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    bucketListEl.appendChild(li);
}

/**
 * Adds a new item to the bucket list
 */
function addBucketItem() {
    const text = bucketInputEl.value.trim();

    if (text === '') {
        bucketInputEl.focus();
        return;
    }

    const items = JSON.parse(localStorage.getItem('bucketList')) || [];
    const index = items.length;

    createBucketItem(text, false, index);
    saveBucketList();
    updateCounter();

    // Clear input and remove expanded class from button
    bucketInputEl.value = '';
    addBtnEl.classList.remove('expanded');
    bucketInputEl.focus();
}

/**
 * Updates the completed items counter
 */
function updateCounter() {
    const items = bucketListEl.querySelectorAll('.bucket-item');
    const completedItems = bucketListEl.querySelectorAll('.bucket-item.completed');

    totalCountEl.textContent = items.length;
    completedCountEl.textContent = completedItems.length;
}

// ============================
// EVENT LISTENERS
// ============================

// Wake Me Up button
wakeBtnEl.addEventListener('click', showQuote);

// Add item button
addBtnEl.addEventListener('click', addBucketItem);

// Enter on input
bucketInputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addBucketItem();
    }
});

// Show/hide "Add" text on button
bucketInputEl.addEventListener('input', () => {
    if (bucketInputEl.value.trim() !== '') {
        addBtnEl.classList.add('expanded');
    } else {
        addBtnEl.classList.remove('expanded');
    }
});

// Auth buttons
loginBtnEl.addEventListener('click', signInWithGoogle);
logoutBtnEl.addEventListener('click', signOut);

// Auth state observer
auth.onAuthStateChanged((user) => {
    updateAuthUI(user);
    loadBucketList();
});

// ============================
// INITIALIZATION
// ============================

/**
 * Initializes the application
 */
function init() {
    // Update year information
    updateYearInfo();

    // Update every minute
    setInterval(updateYearInfo, 60000);

    // Show first quote automatically
    showQuote();

    // Note: bucket list is loaded by auth state observer
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);
