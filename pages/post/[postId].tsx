import React from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_POST_BY_POST_ID } from "../../graphQL/queries";
import Posts from "../../components/Posts";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { ADD_COMMENT } from "../../graphQL/mutations";
import { toast } from "react-hot-toast";
import Avatar from "../../components/Avatar";
import ReactTimeago from "react-timeago";

type Formdata = {
  comment: string;
};
function PostPage() {
  const [ADD_COMMENTS] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_ALL_POST_BY_POST_ID, "getPostListByPostId"],
  });
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Formdata>();

  const onSubmit = handleSubmit(async (formData) => {
    const notification = toast.loading("Posting your comment!");
    try {
      const { data: insertComment } = await ADD_COMMENTS({
        variables: {
          post_id: router?.query.postId,
          text: formData.comment,
          username: session?.user?.name,
        },
      });
      toast.success("Comment successfully posted!", {
        id: notification,
      });
      setValue("comment", "");
    } catch (error) {
      toast.error("Something went wrong!", {
        id: notification,
      });
    }
  });
  const router = useRouter();
  const { data: session } = useSession();

  const { data } = useQuery(GET_ALL_POST_BY_POST_ID, {
    variables: {
      id: router?.query.postId,
    },
  });

  const post: Posts = data?.getPostListByPostId;

  return (
    <div className="mx-auto max-w-5xl my-7">
      <Posts post={post} />
      <div className="rounded-b-md border border-t-0 bg-white p-5 -mt-2">
        <p className="text-sm">
          Comment as <span className="text-red-500">{session?.user?.name}</span>
        </p>
        <form onSubmit={onSubmit} className="flex max-w-5xl flex-col space-y-3">
          <textarea
            disabled={!session}
            value={getValues("comment")}
            onChange={(e) => setValue("comment", e.target.value)}
            placeholder={`${
              session ? "What are your thoughts" : "Please sign in to comment!"
            }`}
            className="h-24 rounded-md p-2 pl-4 outline-none border border-gray-200 disabled:bg-gray-50"
          />
          <button
            type="submit"
            className="bg-red-500 rounded-full font-semibold disabled:bg-gray-200 p-3 text-white"
          >
            Comment
          </button>
        </form>
      </div>
      <div className="-my-5 rounded-b-md border border-gray-300 bg-white py-5 px-10">
        <hr className="py-2" />
        {post?.comment.map((comments) => (
          <div
            key={comments.id}
            className="space-y-2 relative flex items-center space-x-2"
          >
            <hr className="absolute top-10 h-16 border left-7 z-0" />
            <div>
              <Avatar seed={comments.username} />
            </div>
            <div className="flex flex-col">
              <p className="py-2 text-sm text-gray-400">
                <span>{comments.username}</span>
                <ReactTimeago date={comments.created_at} />
              </p>
              <p className="">{comments.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostPage;
