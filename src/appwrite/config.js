import conf from '../conf/conf.js';
import { Client, Account, ID ,Databases,Storage,Query} from "appwrite";

export class Service{
    client=new Client();
    databases;
    bucket;
    // storage;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        
        // this.storage = new Storage(this.client);
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)

    }
    async createPost({title, slug, content , featuredImage, status ,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log(error);
            
        }
    }
    async updatePost(slug,{title,  content , featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log(error);
            
        }
    }
    
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log(error);
            return false;
            
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log(error);
            return false;
            
        }
    }

    async getPosts(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("status","active")
                ]
            )
        } catch (error) {
            console.log("get posts errr :: "+error);
        }
    }

    //file upload
    async uploadFile(file){
        try {
            //will return id of image
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(error);
            
        }

    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log(error);
            
        }
    }

    getFilePreview(fileId){
        return  this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
    getFileView(fileId){
        return  this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service = new Service()
export default service