import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import AppwriteService from "../appwrite/config.js"
import {Button, Container} from "../Components/index.js";
import postcssValueParser from "html-react-parser"


function Post(props) {
    const [post, setPost] = useState(null)
    const navigate = useNavigate()
    const {slug} = useParams()


    const userData = useSelector((state) => state.auth.user)
    const isAuthor = post && userData ? post.userId === userData.$id : false


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

    const deletePost = () => {
        AppwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                AppwriteService.deleteFile(post.featuredImage)
                navigate("/")
            }
        })
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={AppwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id} `}>
                                <Button bgColor="bg-green-500" className="mr-3">Edit</Button>
                            </Link>
                            <Button bgColor="bg-red-500"
                                    onClick={deletePost()}>Delete</Button>
                        </div>
                    )}
                </div>

                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null
}

export default Post;