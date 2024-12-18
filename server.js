const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

// Helper function to serve files
function serveFile(res, filePath, contentType, statusCode = 200) {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 Internal Server Error');
        } else {
            res.writeHead(statusCode, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // Route handling
    if (req.url === '/' || req.url === '/index.html') {
        serveFile(res, path.join(__dirname, 'public', 'index.html'), 'text/html');
    } else if (req.url === '/style.css') {
        serveFile(res, path.join(__dirname, 'public', 'style.css'), 'text/css');
    } else if (req.url === '/script.js') {
        serveFile(res, path.join(__dirname, 'public', 'script.js'), 'application/javascript');
    } else if (['/breakfast.html', '/lunch.html', '/dinner.html', '/snack.html', '/teatime.html'].includes(req.url)) {
        serveFile(res, path.join(__dirname, 'public', req.url), 'text/html');
    } else if (req.url.startsWith('/')) {
        const filePath = path.join(__dirname, 'public', req.url);
        const ext = path.extname(filePath);
        const contentType = {
            '.jpeg': 'image/jpeg',
            '.jpg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
        }[ext] || 'application/octet-stream';
    
        serveFile(res, filePath, contentType);
    } else {
        serveFile(res, path.join(__dirname, 'public', '404.html'), 'text/html', 404);
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

// Create example files if they don't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}


// Main example files
const exampleFiles = {
    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RecipeShare - Discover, Cook, Share</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
    <style>
        /* Custom styles to enhance Tailwind */
        .recipe-card {
            transition: transform 0.3s ease;
        }
        .recipe-card:hover {
            transform: scale(1.05);
        }
        .hero-bg {
            background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
                        url('https://www.archanaskitchen.com/images/archanaskitchen/0-Archanas-Kitchen-Recipes/2019/Vegetable_Makhanwala_Recipe_North_Indian_Punjabi_1_1600.jpg');
            background-size: cover;
            background-position: center;
        }
    </style>
</head>
<body class="bg-gray-100 font-sans">
    <!-- Navigation -->
    <nav class="bg-white shadow-md fixed w-full z-10 top-0">
        <div class="container mx-auto px-4 py-3 flex justify-between items-center">
            <div class="text-2xl font-bold text-green-600">RecipeShare</div>
            <div class="space-x-4">
                <a href="#home" class="text-gray-700 hover:text-green-600">Home</a>
                <a href="categories.html" class="text-gray-700 hover:text-green-600">Recipes</a>
                <a href="meal.html" class="text-gray-700 hover:text-green-600">Meal Planner</a>
                <input type="text" placeholder="Search recipes..." 
                    class="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                <a href="login.html" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Login</a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <header id="home" class="hero-bg text-white text-center pt-24 pb-16">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold mb-6">Discover Delicious Organic Recipes</h1>
            <p class="text-xl mb-8">Fresh, Healthy, and Easy to Cook</p>
            <div class="flex justify-center space-x-4">
                <a href="#recipes" class="bg-white text-green-600 px-6 py-3 rounded-full hover:bg-green-100">
                    Browse Recipes
                </a>
                <a href="#meal-planner" class="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-green-600">
                    Plan Meals
                </a>
            </div>
        </div>
    </header>

    <!-- Popular Recipes Section -->
    <section id="recipes" class="container mx-auto px-4 py-16">
        <h2 class="text-3xl font-bold text-center mb-10">Popular Recipes</h2>
        <div class="grid md:grid-cols-3 gap-6">
            <div class="recipe-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
                <img src="thai.jpg" 
                     alt="Vegetable Makhanwala" 
                     class="w-full h-48 object-cover"/>
                <div class="p-4">
                    <h3 class="font-bold text-xl mb-2">Thai Fried Rice</h3>
                    <p class="text-gray-600"> Authentic Thai  Delight</p>
                    <div class="mt-4 flex justify-between items-center">
                        <span class="text-green-600">39 mins</span>
                        <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            <a href="thaifood.html">View Recipe</a>
                        </button>
                    </div>
                </div>
            </div>

            <div class="recipe-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
                <img src="avo3.jpg" 
                     alt="Quinoa Salad" 
                     class="w-full h-48 object-cover"/>
                <div class="p-4">
                    <h3 class="font-bold text-xl mb-2">Avocado Toast</h3>
                    <p class="text-gray-600">Healthy & Nutritious Meal</p>
                    <div class="mt-4 flex justify-between items-center">
                        <span class="text-green-600">15 mins</span>
                        <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            <a href = "avocado.html">View Recipe</a>
                        </button>
                    </div>
                </div>
            </div>

            <div class="recipe-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
                <img src="pie1.jpg" 
                     alt="Smoothie Bowl" 
                     class="w-full h-48 object-cover"/>
                <div class="p-4">
                    <h3 class="font-bold text-xl mb-2">S'mores Pie</h3>
                    <p class="text-gray-600">Baked English Dessert</p>
                    <div class="mt-4 flex justify-between items-center">
                        <span class="text-green-600">48 mins</span>
                        <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            <a href ="pie.html">View Recipe</a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-green-600 text-white py-8">
        <div class="container mx-auto px-4 text-center">
            <p>&copy; 2024 RecipeShare | All Rights Reserved</p>
            <div class="mt-4 space-x-4">
                <a href="#" class="hover:underline">Privacy Policy</a>
                <a href="#" class="hover:underline">Terms of Service</a>
                <a href="#" class="hover:underline">Contact Us</a>
            </div>
        </div>
    </footer>

</body>
</html>
`,

    'style.css': `body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
  }
  
  header {
    background-color: #333;
    color: white;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  header .logo {
    font-size: 24px;
  }
  
  nav a {
    color: white;
    margin: 0 10px;
    text-decoration: none;
  }
  
  nav input {
    padding: 5px;
    font-size: 16px;
  }
  
  .hero {
    background-color: #fff;
    text-align: center;
    padding: 50px 0;
  }
  
  .carousel img {
    width: 80%;
    max-width: 800px;
    height: auto;
    margin: 20px 0;
  }
  
  .recipe-section {
    background-color: #fff;
    padding: 20px;
    text-align: center;
  }
  
  .recipe-cards {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
  
  .recipe-cards .card {
    width: 200px;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    background-color: #e8e8e8;
    border-radius: 10px;
  }
  
  .recipe-cards .card img {
    width: 100%;
    border-radius: 10px;
  }
  
  footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 10px;
  }
  
  .categories {
    padding: 20px;
    text-align: center;
  }
  
  .category-cards {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
  
  .category-cards .category {
    width: 150px;
    text-align: center;
    cursor: pointer;
  }
  
  .category-cards .category img {
    width: 100%;
    border-radius: 10px;
  }
  
  .login-section {
    padding: 50px;
    text-align: center;
  }
  
  .login-section input {
    width: 300px;
    padding: 10px;
    margin: 10px;
  }
  
  .login-section button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
  }
  `,

    'script.js': `console.log('Welcome to the Recipe App');`,

    '404.html': `<!DOCTYPE html>
<html lang="en">
<head><title>404 Not Found</title></head>
<body><h1>404 - Page Not Found</h1></body></html>`,
};

// Add HTML for each button
const recipePages = {
    'breakfast.html': `<h1>Breakfast Recipes</h1><p>Start your day with healthy and tasty breakfast options!</p>`,
    'lunch.html': `<h1>Lunch Recipes</h1><p>Delicious lunch ideas to keep you energized throughout the day.</p>`,
    'dinner.html': `<h1>Dinner Recipes</h1><p>End your day with a satisfying dinner.</p>`,
    'snack.html': `<h1>Snack Recipes</h1><p>Quick and easy snack ideas for anytime hunger strikes.</p>`,
    'teatime.html': `<h1>Teatime Recipes</h1><p>Perfect recipes to pair with your favorite tea.</p>`,
};

// Merge all files into public folder
const allFiles = { ...exampleFiles, ...recipePages };

for (const [fileName, content] of Object.entries(allFiles)) {
    const filePath = path.join(publicDir, fileName);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
    }
}
