const fetchData = (data) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(data);
    }, 1000)
  );
};

const sendUserLoginRequest = (userId) => {
  console.log(`Sending login request for ${userId}...`);
  return fetchData(userId).then(() => {
    console.log("Login successfull.", userId);
    return userId;
  });
};

const getUserProfile = (userId) => {
  console.log(`Fetching profile for ${userId}...`);
  return fetchData({
    user1: { name: "Vijay", points: 100 },
    user2: { name: "Sahana", points: 200 },
  }).then((profiles) => {
    console.log(`Received profile for ${userId}`);
    return profiles[userId];
  });
};

const getUserPosts = (userId) => {
  console.log(`Fetching posts for ${userId}...`);
  return fetchData({
    user1: [
      { id: 1, title: "Economics 101" },
      { id: 2, title: "How to negotiate" },
    ],
    user2: [
      { id: 3, title: "CSS Animations" },
      { id: 4, title: "Understanding event loop" },
    ],
  }).then((posts) => {
    console.log(`Received posts for ${userId}`);
    return posts[userId];
  });
};

// **
//  * Task 1: Send a login request for user1 -> get user profile data -> get user posts data
//  */

const userDataSerial = async () => {
  console.time("userData-serial");
  // Write code here
  const userId = await sendUserLoginRequest("user1");

  const userProfile = await getUserProfile(userId);
  console.log("User Profile", userProfile);

  const userPosts = await getUserPosts(userId);
  console.log("user posts", userPosts);

  console.timeEnd("userData-serial");
};

/**
 * Task 2: Send a login request for user1 -> get user profile data and get user posts data simultaneously
 */

const userDataParallel = async () => {
  console.time("userData-parallel");
  // Write code here
  const userId = await sendUserLoginRequest("user1");

  const profileAndPost = await Promise.all([
    getUserProfile(userId),
    getUserPosts(userId),
  ]);

  const [profile, posts] = profileAndPost;
  console.log("Profile of User1 ", profile);
  console.log("Posts of User1 ", posts);

  console.timeEnd("userData-parallel");
};

userDataSerial();
userDataParallel();
