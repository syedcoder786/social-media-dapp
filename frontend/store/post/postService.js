import { ethers } from 'ethers';

// const API_URL = "http://localhost:5000/api/cart/";

import { dappContract } from "../../etherjs/dappWrapper";


// Create Post
const createPost = async (postData) => {

    const contract = await dappContract()

    console.log(contract)

    try {
        const postTx = await contract.addPost(postData.id, postData.name, postData.title, postData.description)

        // const response = await axios.post(API_URL, postData);
    
        const postRc = await postTx.wait()
        console.log(postRc);
    
        return postData;
    } catch (error) {
        console.log(err)
    }
};

// Fetch posts
const fetchPosts = async () => {

    const contract = await dappContract()

    console.log(contract)

    // console.log("before call")

    try{
        let postCount = await contract.postCount()
        postCount = ethers.utils.formatEther(postCount)*(10**18)

        console.log("Post count is: "+postCount)

        let posts = []
        for(let i=0; i<postCount; i++){
            posts.push(contract.getPost(i))
        }
        // const post = await contract.getPost(0)

        const responses = await Promise.all(posts);

        // console.log("after call")

        console.log(responses)

        // post = ethers.utils.formatEther(post)*(10**18)

        // console.log(post)

        return responses;
    }catch(err){
        console.log(err)
        return []
    }
};

// const removePost = async (id, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await axios.delete(API_URL + id, config);

//   console.log(response.data);

//   return response.data;
// };

const postService = {
  createPost,
  fetchPosts,
//   removePost,
};

export default postService;
