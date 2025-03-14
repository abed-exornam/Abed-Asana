# React Native Food Ordering App

## Overview
This is a **React Native** food ordering app that allows users to browse menu items, add them to a cart, place orders, and view order details. The app uses **Appwrite** for backend services, including authentication, database storage, and file management.

## Features
- **User Authentication** (Sign Up, Login, Logout)
- **View Menu Items** (Fetched from Appwrite Database)
- **Add Items to Cart**
- **Place Orders**
- **View Order History**

## Tech Stack
- **Frontend:** React Native (Expo Router)
- **Backend:** Appwrite (Database, Authentication, Storage)
- **State Management:** useState, useEffect, and Context API
- **Navigation:** Expo Router

## 📂 Project Structure
```
📦 food-ordering-app
├── 📂 src
│   ├── 📂 components  # Reusable UI components
│   ├── 📂 screens     # App screens (Menu, Cart, Orders, Profile)
│   ├── 📂 services    # API calls to Appwrite
│   ├── 📂 utils       # Helper functions
│   ├── App.js        # Entry point
├── 📂 assets          # Images & icons
├── package.json      # Dependencies
├── README.md         # Project documentation
```

## Setup & Installation
### 1 Clone the Repository
```sh
git clone https://github.com/abed-exornam/food-ordering-app.git
cd food-ordering-app
```

### 2️ Install Dependencies
```sh
npm install
```

### 3️ Setup Appwrite Configuration
- Create a **project** in Appwrite.
- Configure **Database** with collections for `menu`, `cart`, `orders`, and `users`.
- Set up **Authentication** and **Storage**.
- Create a `.env` file and add your Appwrite credentials:

```sh
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_DATABASE_ID=your_database_id
APPWRITE_MENU_COLLECTION_ID=your_menu_collection_id
APPWRITE_CART_COLLECTION_ID=your_cart_collection_id
APPWRITE_ORDER_COLLECTION_ID=your_order_collection_id
APPWRITE_USER_COLLECTION_ID=your_user_collection_id
```

### 4️ Run the Project
```sh
npx expo start
```

## Key App Functionalities

### Fetching Menu Items
```javascript
const fetchMenu = async () => {
  try {
    const menuItems = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId
    );
    return menuItems.documents;
  } catch (error) {
    console.error("Error fetching menu:", error.message);
  }
};
```

### Handling Checkout
```javascript
const handleCheckout = async () => {
  try {
    const user = await getCurrentUser();
    const totalPrice = getTotalPrice();
    
    const orders = cartItems.map(item => ({
      itemsId: item.itemsId,
      itemName: item.itemName,
      quantity: item.quantity,
      price: item.price,
      imageurl: item.imageurl,
      userId: user.userId,
    }));
    
    await createOrder(user.userId, orders, totalPrice);
    setCartItems([]);
    Alert.alert("Success", "Your order has been placed!");
  } catch (error) {
    console.error("Checkout error:", error.message);
  }
};
```

### Fetching Orders for a User
```javascript
const fetchOrdersByUserId = async (userId) => {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.orderCollectionId,
      [Query.equal("userId", userId)]
    );
    return result.documents;
  } catch (error) {
    console.error("Error fetching orders:", error.message);
  }
};
```

## 🐞 Debugging & Common Issues
### **Invalid Hook Call Warning**
- Ensure hooks are only used inside function components.
- Avoid calling hooks inside async functions.

### **Orders Not Displaying**
- Check if orders are correctly stored in Appwrite.
- Verify the `fetchOrdersByUserId` function.
- Log API responses to debug issues.

## Future Improvements
- Implement push notifications for order status updates.
- Add real-time updates using Appwrite subscriptions.
- Enhance UI with animations and styling.

## License
MIT License. Free to use and modify!

