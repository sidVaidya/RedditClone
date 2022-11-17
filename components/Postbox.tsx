import { LinkIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { HiPhotograph } from "react-icons/hi";
import Avatar from "./Avatar";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_POST, ADD_SUBREDDIT } from "../graphQL/mutations";
import client from "../apollo-client";
import { GET_ALL_POST, GET_SUBREDDIT_BY_TOPIC } from "../graphQL/queries";
import { toast } from "react-hot-toast";

type formData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

type Props = {
  subreddit?: string;
};
function Postbox({ subreddit }: Props) {
  const { data: session } = useSession();
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POST, "getPostList"],
  });
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);
  const [imageBoxOpen, setimageBoxOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<formData>();

  const onSubmit = handleSubmit(async (formData) => {
    const notification = toast.loading("Creating new post");
    try {
      const { data: getSubredditListByTopic } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: subreddit || formData.subreddit,
        },
      });
      if (getSubredditListByTopic?.length !== 0) {
        try {
          const {
            data: { insertSubreddit: newSubreddit },
          } = await addSubreddit({
            variables: {
              topic: formData.subreddit,
            },
          });
          const image = formData.postImage || "";
          const { data: insertPost } = await addPost({
            variables: {
              body: formData.postBody,
              image: image,
              title: formData.postTitle,
              subreddit_id: newSubreddit?.id,
              username: session?.user?.name,
            },
          });
        } catch (error) {}
      } else {
        console.log("....2", getSubredditListByTopic);
        const image = formData.postImage || "";
        const { data: insertPost } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            topic: formData.postTitle,
            subreddit_id: getSubredditListByTopic[0]?.id,
            username: session?.user?.name,
          },
        });
      }
      setValue("postBody", "");
      setValue("postImage", "");
      setValue("subreddit", "");
      setValue("postTitle", "");

      toast.success("New post created!", {
        id: notification,
      });
    } catch (error) {
      toast.error("Something went wrong!", {
        id: notification,
      });
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-16 z-50 bg-white rounded-md border-gray-300 p-2"
    >
      <div className="flex items-center space-x-3">
        <Avatar seed={session?.user?.name} />
        <input
          {...(register("postTitle"), { required: true })}
          disabled={!session}
          type={"text"}
          onChange={(e) => setValue("postTitle", e.target.value)}
          className="outline-none p-2 pl-5 bg-gray-50 rounded-md flex-1"
          placeholder={
            session
              ? subreddit
                ? `Create a post in ${subreddit}`
                : "Create a post by entering a title"
              : "Sign in to create a post"
          }
        />
        <HiPhotograph
          onClick={() => setimageBoxOpen(!imageBoxOpen)}
          className={`h-10 text-gray-300 text-2xl ${
            imageBoxOpen && `text-blue-300`
          }`}
        />
        <LinkIcon className="h-6 text-gray-300" />
      </div>
      {watch("postTitle") && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register("postBody")}
              type={"text"}
              placeholder="optional"
            />
          </div>
          {!subreddit ? (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">SubReddit</p>
              <input
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                {...register("subreddit")}
                type={"text"}
                placeholder="optional"
              />
            </div>
          ) : null}
          {imageBoxOpen ? (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image</p>
              <input
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                {...register("subreddit")}
                type={"text"}
                placeholder="optional"
              />
            </div>
          ) : null}

          {Object.keys(errors).length > 0 ? (
            <div>
              {errors.postTitle?.type === "required" && (
                <p>Title is required</p>
              )}
              {errors.subreddit?.type === "required" && (
                <p>subreddit is required</p>
              )}
              {errors.postTitle?.type === "required" && (
                <p>Title is required</p>
              )}
            </div>
          ) : null}
          {!!watch("postTitle") ? (
            <button
              type="submit"
              className="w-full p-2 rounded-md bg-blue-500 text-white"
            >
              Create Post
            </button>
          ) : null}
        </div>
      )}
    </form>
  );
}

export default Postbox;
