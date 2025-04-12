# Stepone - Your First Step Toward a Healthier Life 💪

**StepOne** is a beginner-friendly fitness website designed to guide users through the early stages of their health journey. It offers simple and accessible tools like gym workout splits, nutrition tips, and event updates — all designed to help you take that powerful first step toward a better you.

---

## 🌟 What the Website Offers

- 🏋️‍♂️ Beginner & intermediate workout splits
- 🥗 Nutrition guidance including no-fish and protein-powder-free options
- 📅 Information on upcoming fitness-related events
- 📖 Motivational content and health tips
- ✨ Smooth animations and clean UI

---

## 🛠️ Built With

- **HTML5**
- **CSS3**
- **JavaScript**
- **AOS (Animate on Scroll)**
- **Node.js** & **Express.js**
- **MongoDB** & **Mongoose**
- **bcrypt**, **dotenv**, **helmet**, **cors**

---

##  🔐  Environment Variables

This project uses a '.env' file to manage environment-specific variables securely. 
Before running the server, make sure to create a '.env' file in the root directery of the project with the following structures:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/stepone
JWT_SECRET=your_jwt_secret_key_here
```

How to generate a JWT secret key:

✅ Option 1: Use Node.js (Best for Custom Secrets)

In your terminal, run:
```
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
This will output a secure 128-character hexadecimal string you can copy into your .env file.

✅ Option 2: Use an Online Generator (Quick & Easy)

You can also use tools like: 

• https://generate-random.org/string

• https://randomkeygen.com/

Look for something at least 32–64 characters long with a mix of letters, numbers, and symbols.

Example:
```
JWT_SECRET=ksf82ndA9sL0vB19#vNaPz^1dEx79MQ3yWtV%g92kLc5Xe$
```
---

## 📬 Contact

**Omar Ahmed Hamdy Mohamed Abdelnaby**  
📩 Email: omarahmedoa141@gmail.com  
🌐 Website: TBD

---

> *StepOne — The journey begins with one step. Let’s make it count.*
