'use server'
import { ID } from "node-appwrite"
import { createSessionClient, createAdminClient } from "./appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"

export const signIn = async({email, password}: signInProps) => {
    try{

        const userLoggedIn = await getLoggedInUser();

        if(userLoggedIn) return userLoggedIn

        const {account} = await createAdminClient();

        const response = await account.createEmailPasswordSession({
            email,
            password
        })

        const cookieStore = await cookies();
        cookieStore.set("appwrite-session", response.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });


        return response

    }
    catch(error){
        console.log("Error", error)
    }
}


export const signUp = async(userData: SignUpParams) => {
    try{
        const {firstName, lastName, address1, city, state, postalCode, dateOfBirth, ssn, email, password} = userData
        const { account } = await createAdminClient();

        const newUserAccount = await account.create({
            userId: ID.unique(),
            email,
            password,
            name: `${firstName} ${lastName}`
        });
        const session = await account.createEmailPasswordSession({
            email,
            password
        });

        const cookieStore = await cookies();
        cookieStore.set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUserAccount);

    }
    catch(error){
        console.log("Error", error)
    }
}


export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}


export const logoutAccount = async() =>{
    const {account} = await createSessionClient();

    const cookieStore = await cookies();
    cookieStore.delete("appwrite-session");
    
    const currentSession = await account.deleteSession({
        sessionId: "current"
    });
    return currentSession
}