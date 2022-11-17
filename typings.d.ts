type Comments = {
  created_at: string;
  id: string;
  post: string;
  text: string;
  username: string;
};

type Vote = {
  created_at: string;
  id: string;
  post_id: string;
  upvote: boolean;
  username: string;
};

type subreddit = {
  id: string;
  created_at: string;
  topic: string;
};
type Posts = {
  created_at: string;
  id: string;
  image: string;
  title: string;
  subreddit_id: string;
  body: string;
  username: string;
  votes: Vote[];
  subreddit: subreddit;
  comment: Comments[];
};
