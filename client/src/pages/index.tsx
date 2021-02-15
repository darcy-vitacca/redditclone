import Axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState, Fragment } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Post } from "../types";

import PostCard from "../components/PostCard";
import { GetServerSideProps } from "next";

dayjs.extend(relativeTime);

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  //Fetch home page posts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchPosts = await Axios.get("/posts");
        return setPosts(fetchPosts.data);
      } catch (err) {
        console.log(err);
        throw err;
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pt-12">
      <Head>
        <title>reddit: the front page of the internet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container flex pt-4">
        {/* Post Feed */}
        <div className="w-160">
          {posts.map((post) => (
            <PostCard post={post} key={post.identifier} />
          ))}
        </div>
        {/* Sidebar */}
      </div>
    </div>
  );
}

//this is a fucntion that runs on the server side before the page is rendered
//client side rendering can be used for certain parts of the page and while it is
//being rendered you can add a loading animation etc. If your server is running
//slow its a disadvantage of client side because interactions won't be as
//quick.
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const res = await Axios.get("/posts");
//     return { props: { posts: res.data } };
//   } catch (err) {
//     return { props: { error: "Something went wrong" } };
//   }
// };
