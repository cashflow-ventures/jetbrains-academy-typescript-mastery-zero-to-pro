export interface BlogPost {
    id: number;
    title: string;
    body: string;
    author: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

// TODO: Define PostPreview using Pick (id, title, author)
export type PostPreview = {};

// TODO: Define CreatePostInput using Omit (exclude id, createdAt, updatedAt)
export type CreatePostInput = {};

// TODO: Implement toPreview — return only the picked fields
export function toPreview(post: BlogPost): PostPreview {
    // Write your solution here
    return {} as PostPreview;
}

// TODO: Implement toCreateInput — return the post without omitted fields
export function toCreateInput(post: BlogPost): CreatePostInput {
    // Write your solution here
    return {} as CreatePostInput;
}
