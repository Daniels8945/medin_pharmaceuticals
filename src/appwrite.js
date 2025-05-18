import { Client, Databases, Storage, ID, Account } from "appwrite"

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID
const SESSION_ID = import.meta.env.VITE_APPWRITE_SESSION_ID

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(PROJECT_ID)
    
const databases = new Databases(client)
const storage = new Storage(client)
export const account =  new Account(client)


export const uploadImage = async (file) => {
    if (file) {
        try{
            const response = await storage.createFile(
            BUCKET_ID,
            ID.unique(),
            file);
        return response.$id;
        } catch (error) {
            console.error("Image upload failed:", error);
        }
    }
};

export const addToDB = async ( formData, imageId ) => {
    try {
        const data = {  
        name: formData.name,
        description: formData.description,
        creator: formData.creator,
        imageId: imageId,
    }
        const response =  await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            data
        );
        return response.$id;
    } catch (error) {
        console.error("Item creation failed:", error)
    }
};      

export const getItems = async () => {
    const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
    )
    const allItems = response.documents.map(( doc ) => {
        const imageUrl = storage.getFileView(BUCKET_ID, doc.imageId);
        return { ...doc, imageUrl };
    });
    // console.log(allItems);
    return allItems;
}

export const deleteItems = async (documentId, imageId) => {
    const response =  await databases.deleteDocument(
        DATABASE_ID,
        COLLECTION_ID,
        documentId,
    )
    await storage.deleteFile(BUCKET_ID, imageId);
    return response.$id
}

export const login = async (email, password) => {
  try {
    const session = await account.createSession(
        email, 
        password
    );
    return session;
  } catch (error) {
    throw error;
  }
};

export const session  = async () => {
    await account.getSession(SESSION_ID);
    console.log(session );
}