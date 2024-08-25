import { collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "./config";

export const fetchPosts = async () => {
  try {
    const postsCol = collection(db, "posts");
    const postSnapshot = await getDocs(postsCol);

    const postsWithAuthors = await Promise.all(
      postSnapshot.docs.map(async (postDoc) => {
        const postData = postDoc.data();

        // Get the author (hospital) reference
        const authorRef = postData.author;
        const authorDoc = await getDoc(authorRef);

        return {
          id: postDoc.id,
          ...postData,
          authorDetails: authorDoc.exists() ? authorDoc.data() : null,
        };
      })
    );

    return postsWithAuthors;
  } catch (error) {
    console.error("Error fetching posts and author details: ", error);
  }
};

export const fetchRequirements = async () => {
  try {
    const reqCol = collection(db, "requirements");
    const reqSnapshot = await getDocs(reqCol);

    const reqWithHospitals = await Promise.all(
      reqSnapshot.docs.map(async (reqDoc) => {
        const reqData = reqDoc.data();

        // Fetch hospital details using the reference
        const hospitalRef = reqData.hospital;
        const hospitalDoc = await getDoc(hospitalRef);

        return {
          id: reqDoc.id,
          ...reqData,
          hospitalDetails: hospitalDoc.exists() ? hospitalDoc.data() : null,
        };
      })
    );

    return reqWithHospitals;
  } catch (error) {
    console.error("Error fetching requirements and hospital details: ", error);
  }
};
