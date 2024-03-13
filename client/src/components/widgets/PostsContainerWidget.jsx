// import { useEffect } from "react"
// import React from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { setPosts } from "../../store/store"
// import SinglePostWidget from "./SinglePostWidget"


// const PostsContainerWidget = ({ userId, isProfile = false }) => {
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.token)
//   const posts = useSelector((state) => state.posts)
//   const loggedInUserId = useSelector((state) => state.user._id)

//   const fetchPosts = async () => {
//     const url = isProfile ? `http://localhost:3001/posts/${userId}/posts` : "http://localhost:3001/posts";
//     const response = await fetch(url, {
//       method: "GET",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (!response.ok) {
//       console.error('Failed to fetch posts');
//       return [];
//     }
//     const data = await response.json();
//     return data;
//   };

//   const fetchUsers = async (posts) => {
//     const promises = posts.map(async (post) => {
//       const response = await fetch(`http://localhost:3001/users/${post.userId}`, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok) {
//         console.error('Failed to fetch user data');
//         return '';
//       }
//       const userData = await response.json();
//       return `${userData.firstName} ${userData.lastName}`;
//     });
//     const users = await Promise.all(promises);
//     return users;
//   };

//   useEffect(() => {
//     const fetchPostsAndUsers = async () => {
//       const posts = await fetchPosts()
//       const users = await fetchUsers(posts)

//       const combinedData = posts.map((post, index) => ({
//         ...post,
//         firstName: users[index].firstName,
//         lastName: users[index].lastName,
//       }));

//       dispatch(setPosts({ posts: combinedData }))
//     };

//     fetchPostsAndUsers();
//   }, [dispatch, token, isProfile, userId])


//   return (
//     <div className={`${isProfile && loggedInUserId !== userId ? 'transform -translate-y-8' : ''}`}>
//       {posts && posts.length > 0 ? (
//         posts.slice().reverse().map(({
//           _id,
//           userId,
//           firstName,
//           lastName,
//           description,
//           location,
//           picturePath,
//           userPicturePath,
//           likes,
//           comments,
//         }) => {
//           const name = firstName && lastName ? `${firstName} ${lastName}` : "Default Name";
//           return (
//             <SinglePostWidget
//               key={_id}
//               postId={_id}
//               postUserId={userId}
//               name={name}
//               description={description}
//               location={location}
//               picturePath={picturePath}
//               userPicturePath={userPicturePath}
//               likes={likes}
//               comments={comments}
//             />
//           );
//         })
//       ) : (
//         <p>No posts available</p>
//       )}
//     </div>
//   );
  
//   }
  
//   export default React.memo(PostsContainerWidget)






import { useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store/store";
import SinglePostWidget from "./SinglePostWidget";

const PostsContainerWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);
  const loggedInUserId = useSelector((state) => state.user._id);

  const fetchPosts = async () => {
    const url = isProfile ? `http://localhost:3001/posts/${userId}/posts` : "http://localhost:3001/posts";
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      const fetchedPosts = await fetchPosts();
      const filteredPosts = isProfile ? fetchedPosts.filter(post => post.userId === userId) : fetchedPosts;
      dispatch(setPosts({ posts: filteredPosts }));
    };

    fetchPostsAndUsers();
  }, [dispatch, token, isProfile, userId]);

  return (
    <div className={`${isProfile && loggedInUserId !== userId ? 'transform -translate-y-8' : ''}`}>
      {posts && posts.length > 0 ? posts.slice().reverse().map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => {
          const name = firstName && lastName ? `${firstName} ${lastName}` : "Default Name";
          return (
            <SinglePostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={name}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          );
        }
      ) : <p>No posts available</p>}
    </div>
  );
};

export default React.memo(PostsContainerWidget);
