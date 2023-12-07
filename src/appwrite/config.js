import conf from "../Conf/conf.js";
import {Client, Databases, Storage, Query, ID} from "appwrite"

export class Service {
    client = new Client()
    databases
    bucket

    // Constructor
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }


    //     Creat post
    async creatPost({title, slug, content, featuredImage, status, userId}) {

        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            ),
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
        } catch (error) {
            console.log("Appwrite service :: creatPost :: error", error)
        }
    }

//     Update post

    async updatePost(slug, {title, content, featuredimage, status}) {

        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            ),
                {
                    title,
                    content,
                    featuredimage,
                    status
                }
        } catch (error) {

            console.log("Appwrite service :: updatePost :: error", error)

        }
    }

//     Delete post

    async deletePost(slug) {

        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {

            console.log("Appwrite service :: deletPost :: error", error)
            return false
        }
    }

//     Get Post

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug)
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error)
            return false
        }
    }


//     Get Posts
    async getPosts(queries = [Query.equal("status", "active")]) {

        try {

            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {

            console.log("Appwrite service :: getPosts :: error", error)
            return false

        }
    }

    // File Uplode file

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error)
            return false;
        }
    }

    // Delete File

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
        } catch (error) {

            console.log("Appwrite service :: deleteFile :: error", error);
            return false

        }

    }

    // Get FilePreview

    getFilePreview(fileId) {
        this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}

const service = new Service()
export default service