import React, {useEffect, useCallback} from 'react';
import appwriteService from "../../appwrite/config.js"
import {Input, Button, RTE, Select} from "../index.js"
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useForm} from "react-hook-form";


function PostForm({post}) {

    const {register, handleSubmit, control, setValue, watch, getValues} = useForm({
        defaultValues: {
            title_1: post?.title_1 || "",
            slug: post?.$id || "",
            content_1: post?.content_1 || "",
            status_1: post?.status_1 || "active",
        }
    })
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

            if (file) {
                appwriteService.deleteFile(post.featured_image_1)
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featured_image_1: file ? file.$id : undefined
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0])
            if (file) {
                const fileId = file.$id
                data.featured_image_1 = fileId
                const dbPost = await appwriteService.createPost({...data, userId: userData.$id})

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return ""
    }, [])

    React.useEffect(() => {
        const subscription = watch((value, {name}) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {shouldValidate: true})
            }
        })

        return () => subscription.unsubscribe();

    }, [slugTransform, watch, setValue]);
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", {required: true})}
                />

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", {required: true})}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
                    }}
                />

                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", {required: !post})}
                />

                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featured_image_1)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status_1"
                    className="mb-4"
                    {...register("status_1", {required: true})}
                />

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full"
                >
                    {post ? "update" : "submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;