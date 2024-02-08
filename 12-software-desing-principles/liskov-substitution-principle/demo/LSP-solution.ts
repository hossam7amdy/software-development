export interface IPost {
  createPost(post: string): void;
}

class Post implements IPost {
  createPost(post: string) {
    console.log(`Original post: ${post}`);
  }
}

class TagPost implements IPost {
  createPost(post: string): void {
    console.log(`Tag post: ${post}`);
  }
}

class SharePost implements IPost {
  createPost(post: string): void {
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

  postObj.createPost(post); // will create the correct post
}
