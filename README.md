# Star Wars API React App
 Star Wars API React App by Andrew Kirchofer. Pulls all Star Wars characters from 
 
 ---
 
 ## How to start
 1. Download repository and unzip.
 2. Once inside directory, run "npm install"
 3. After node_modules have been installed, run "npm start"
 
 ## How to run automated tests
 1. After node_modules have been installed, run "npm test"
 
 ---
 
 ### CHANGELOG:
 - CHANGED: Implemented a much better "getAllPages" method. After testing, this new optimized method operates ~2.46x faster than the "getAllPagesWait" method (based on 15 results each, then averaged).
- ADDED: Ability for end-user to mark characters as their favorite.
- ADDED: Favorites are displayed at the top, and add a green favorite badge is added next to the item.
- ADDED: Better error handling.
- ADDED: Implemented automated tests using Jest.
- ADDED: Responsive design (Bootstrap)
- CHANGED: Split code up into folders.
