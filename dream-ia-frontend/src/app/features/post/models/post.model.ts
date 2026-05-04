
export interface Post {
  id: string;
  title: string;
  content: string;
  nameUser: string;
  createdAt: string;
}

export interface CreatePost {
  nameUser: string;
  title: string;
  content: string;
}
