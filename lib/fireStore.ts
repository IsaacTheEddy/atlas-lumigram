import { db } from "@/firebaseConfig";
import { addDoc, collection, query, where, getDoc, orderBy, getDocs, doc, limit, startAfter } from "firebase/firestore";



export interface Post{
    caption: string;
    image: string;
    createdAt: Date;
    createdBy: string;
}

const posts = collection(db, 'posts')
const favorites = collection(db, 'favorites')


async function addPost(post: Post){
    console.log(post)
    await addDoc(posts, post)
}


async function getPosts(nextPage?: string) {
    const qRef = collection(db, "posts");
    const first = query(qRef, orderBy("createdAt", "desc"));
    const qSnap = await getDocs(first);
    const last = qSnap.docs[qSnap.docs.length - 1]
    
   const posts: Post[] = [];

    qSnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());

      const data = doc.data();
      posts.push({
        caption: data.caption,
        image: data.image,
        // Firestore timestamps need to be converted to JS Date objects
        createdAt: data.createdAt.toDate(),
        createdBy: data.createdBy,
      });
    });

    return { posts};
  }
async function getFavorites(nextPage?: string) {
    const qRef = collection(db, "favorites");
    const first = query(qRef, orderBy("createdAt", "desc"));
    const qSnap = await getDocs(first);
    const last = qSnap.docs[qSnap.docs.length - 1]
    
   const posts: Post[] = [];

    qSnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());

      const data = doc.data();
      posts.push({
        caption: data.caption,
        image: data.image,
        // Firestore timestamps need to be converted to JS Date objects
        createdAt: data.createdAt.toDate(),
        createdBy: data.createdBy,
      });
    });

    return { posts};
  }

  async function addFav(post: Post){
    await addDoc(favorites, post)
}




export default {
    addPost,
    getPosts,
    addFav,
    getFavorites,
}