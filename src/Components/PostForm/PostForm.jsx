import React, {useEffect, useCallback} from 'react';
import appwriteService from "../../appwrite/config.js"
import {Input, Button, RTE, Seclect} from "../index.js"
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useForm} from "react-hook-form";


function PostForm({post}) {

    const {register, handleSubmit, control, setValue, watch, getValues} = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    })
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
        if (data) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

            if (file) {
                appwriteService.deleteFile(post.featuredImage)
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredimage: file ? file.$id : undefined
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0])
            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await appwriteService.creatPost({...data, userId: userData.$id})

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
                .toLocaleLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "_")
                .replace(/\s/g, "_")

        return ""
    }, [])

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if (name === "titile") {
                setValue("slug", slugTransform(value.title), {shouldValidate: true})
            }
        })

        return () => subscription.unsubscribe()

    }, [slugTransform, watch, setValue()]);
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="title :"
                    placeholder="title"
                    className="mb-4"
                    {...register("title", {required: true})}
                />

                <Input
                    label="slug :"
                    placeholder="slug"
                    className="mb-4"
                    {...register("slug", {required: true})}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
                    }}
                />

                <RTE
                    label="content :"
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
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Seclect
                    options={["active", "inactive"]}
                    lael="Status"
                    className="mb-4"
                    {...register("status", {required: true})}
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