import conf from "../Conf/conf.js"
import {Client, Account, ID} from "appwrite"

export class AuthService {

    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client)
    }


    // Sign Up function
    async createAccount({email, password, name}, error1 = error) {
        // eslint-disable-next-line no-useless-catch
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }


//     CurrentUser Function

    //     Login Function
    async login({email, password}) {

        // eslint-disable-next-line no-useless-catch
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error
        }
    }

    //   conf releted functionality
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error)
        }

        return null;
    }


//     LogOut function

    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logOut :: error", error)
        }
    }
}


const authService = new AuthService()

export default authService
