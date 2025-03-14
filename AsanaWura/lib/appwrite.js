import { Client, ID, Account, Databases, Avatars,User, Query } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.AsanaWura.KokoWura",
    projectId: "676abe41003a0ea809a3",
    databaseId: "676ac19500247d2e31d6",
    userCollectionId: "676ac1ee00319768c43e",
    menuCollectionId: "676ac2e9001af5578178",
    orderCollectionId: "676ac3570034ceb49ba9",
    storageId: "676acd3c00145a5a351c",
    cartCollectionId: "677350320005c3a129ea"
};

// Initialize the React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
export const query = new Query(client);

// Create a new user
export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );
        if (!newAccount) throw new Error('Failed to create new account');

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                userId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl,
            }
        );
        return newUser;
    } catch (error) {
        console.log('Error creating user:', error.message);
        throw new Error('Could not create user');
    }
};

// Sign in a user
export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        const user = await account.get();
        return session;
        
    } catch (error) {
        if (error.message.includes("Invalid credentials")) {
            throw new Error('Invalid email or password');
        }
        throw new Error('Sign-in failed: ' + error.message);
    }
};

// Get the current user
export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw new Error('No active session');

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('userId', currentAccount.$id)]
        );
        if (!currentUser || currentUser.documents.length === 0) 
            throw /*new*/ Error('User data not found');
        

        return currentUser.documents[0];
    } catch (error) {
        console.log('Error fetching current user:', error.message);
        throw new Error('Could not fetch current user');
    }
};

// Fetch menu data
export const fetchMenu = async () => {
    try {
        const menuData = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId
        );
        return menuData.documents; // Return the array of menu items
    } catch (error) {
        console.error('Error fetching menu:', error.message);
        throw new Error('Could not fetch menu data');
    }
};

// Fetch order history for the current user
export const fetchOrderHistory = async (userId) => {
    try {
        const response = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.orderCollectionId,
            [Query.equal('userId', userId)]
        );
        return response.documents; // Return the array of orders
    } catch (error) {
        console.error('Error fetching order history:', error.message);
        throw new Error('Could not fetch order data');
    }
};

// Logout the current user
export const logoutUser = async () => {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    throw new Error(error)
  }
};


// Fetch a specific menu item by its ID
export const fetchMenuItemById = async (itemsId) => {
    try {
        const response = await databases.getDocument(
            appwriteConfig.databaseId, 
            appwriteConfig.menuCollectionId, 
            itemsId);
        return response; // This will be the full item details
    } catch (error) {
        console.error('Error fetching menu item:', error);
        throw error;
    }
};

//new
// Add item to cart with quantity 1
export const addToCart = async (cartItems) => {
    try {
        // Ensure the itemId is correctly added to the cart
        const newCartItem = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.cartCollectionId,
            ID.unique(), // Unique ID for the cart item
            {
                userId: cartItems.userId, // The user who added the item
                orderId: cartItems.orderId,
                itemName: cartItems.itemName,
            /**/itemsId: cartItems.itemsId, // Use itemId (the unique ID from the menu collection)
                quantity: 1, // Initial quantity is 1
                price: cartItems.price, // The price of the item
                imageurl: cartItems.imageurl, // Item's image URL
            }
        );
        return newCartItem;
    } catch (error) {
        console.error('Error adding item to cart:', error.message);
        throw new Error('Could not add item to cart');
    }
};



// Add this function to your appwrite.js file
export const fetchCartItems = async (userId) => {
    try {
        const response = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.cartCollectionId,
            [Query.equal("userId", userId)]
        );
        return response.documents;
    } catch (error) {
        console.error('Error fetching cart items:', error.message);
        throw new Error('Could not fetch cart items');
    }
};



// Update quantity of an item in the cart
export const updateCartItem = async (itemName, quantity) => {
    try {
        // Fetch the cart item and update the quantity
        const cartItem = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.cartCollectionId,
            itemName
        );
        
        // Update the item document with the new quantity
        const updatedItem = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.cartCollectionId,
            itemName,
            {
                quantity: quantity,
            }
        );
        return updatedItem;
    } catch (error) {
        console.error('Error updating cart item:', error.message);
        throw new Error('Could not update cart item');
    }
};

// Remove an item from the cart
export const removeCartItem = async (itemName) => {
    try {
        // Remove the item document from the cart collection
        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.cartCollectionId,
            itemName
        );
    } catch (error) {
        console.error('Error removing cart item:', error.message);
        throw new Error('Could not remove cart item');
    }
};

//today
export const createOrder = async (userId, cartItems, totalPrice, itemName) => {
    try {
        const orderId = ID.unique();
        const orderData = {
            userId,
            cart: cartItems.map(item => ({
                itemsId: item.itemsId,
                orderId: orderId,
                itemName: item.itemName,
                quantity: item.quantity,
                price: item.price,
                imageurl:item.imageurl,
                userId: item.userId
            })),
            totalPrice: totalPrice,
            orderId: orderId,
            timestamp: new Date().toISOString(),
            status: 'pending'
        };

        const newOrder = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.orderCollectionId,
            ID.unique(),
            orderData
        );

        return newOrder;
    } catch (error) {
        console.error("Error creating order:", error.message);
        throw new Error("Could not create order");
    }
};

export const fetchOrdersByUserId = async (userId) => {
    try {
        const menuData = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.orderCollectionId,
            [Query.equal("userId", userId)]
        );
        return menuData.documents; // Return the array of menu items
    } catch (error) {
        console.error('Error fetching menu:', error.message);
        throw new Error('Could not fetch menu data');
    }

};

export const deleteOrderById = async (orderId) => {
    try {
        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.orderCollectionId,
            orderId
        );
    } catch (error) {
        console.error('Error deleting order:', error.message);
        throw new Error('Could not delete order');
    }
};