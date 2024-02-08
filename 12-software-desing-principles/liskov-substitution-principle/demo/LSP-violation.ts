class Post {
  public createPost(post: string) {
    console.log(`Original post: ${post}`);
  }
}

class TagPost extends Post {
  public createTagPost(post: string) {
    console.log(`Tag post: ${post}`);
  }
}

class SharePost extends Post {
  createMentionPost(post: string) {
    console.log(`Mention post: ${post}`);
  }
}

let newPosts = ["original post", "#tag post", "@mention post"];
let postObj: Post;

for (const post of newPosts) {
  if (post.startsWith("#")) {
    postObj = new TagPost();
  } else if (post.startsWith("@")) {
    postObj = new SharePost();
  } else {
    postObj = new Post();
  }

  postObj.createPost(post); // BUG: will always create `Original post` only
}
