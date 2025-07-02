import { db } from "@/firebaseConfig";
import { addDoc, collection, query, where, getDoc, orderBy, getDocs, doc, limit, startAfter, startAt, QueryDocumentSnapshot, 
  DocumentData, } from "firebase/firestore";



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


async function getInitalPosts() : Promise<{posts: Post[], lastDoc: QueryDocumentSnapshot<DocumentData> | null, isEndOfCollection: boolean}> {
    const qRef = collection(db, "posts");
    const q = query(qRef, orderBy("createdAt", "desc"), limit(3));
    const qSnap = await getDocs(q);
    
    
   const posts: Post[] = qSnap.docs.map((doc) => {
      return {
        caption: doc.data().caption,
        image: doc.data().image,
        createdAt: doc.data().createdAt,
        createdBy: doc.data().createdBy,
      };
    } )
    const lastDoc = qSnap.docs.length > 0 ? qSnap.docs[qSnap.docs.length - 1] : null;
  const isEndOfCollection = qSnap.docs.length < 3; 

  return { posts, lastDoc, isEndOfCollection };
  }
async function getMorePosts (startAfterDoc: QueryDocumentSnapshot<DocumentData> | null // Expect a document snapshot, can be null if restarting
): Promise<{ posts: Post[]; lastDoc: QueryDocumentSnapshot<DocumentData> | null; isEndOfCollection: boolean }>{

  const qRef = collection(db, "posts");
  let q;
  if (startAfterDoc) {
    q = query(qRef, orderBy("createdAt", "desc"), startAfter(startAfterDoc), limit(3));
  } else {
    q = query(qRef, orderBy("createdAt", "desc"), limit(3))
  }

  const qSnap = await getDocs(q)

   const posts: Post[] = qSnap.docs.map((doc) => {
      return {
        caption: doc.data().caption,
        image: doc.data().image,
        createdAt: doc.data().createdAt,
        createdBy: doc.data().createdBy,
      };
    } )

    const lastDoc = qSnap.docs.length > 0 ? qSnap.docs[qSnap.docs.length - 1] : null;
    const isEndOfCollection = qSnap.docs.length < 3
    return {posts, lastDoc, isEndOfCollection}

  }


 

  async function addFav(post: Post){
    await addDoc(favorites, post)
}




export default {
    addPost,
    getInitalPosts,
    getMorePosts,
    addFav,
}