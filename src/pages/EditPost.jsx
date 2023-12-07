import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import AppwriteService from "../appwrite/config.js"
import {Container, PostForm} from "../Components/index.js"

function EditPost(props) {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            AppwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                } else {
                    navigate("/")
                }
            })
        }
    }, [slug, navigate]);
    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ) : null
}

export default EditPost;