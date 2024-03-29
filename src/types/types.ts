export interface BlogPostType {
	body: string;
	created_at: string;
	id: number;
	publish_date: null;
	title: string;
	comments: CommentType[];
	updated_at: string;
	user_id: number;
	views: number;
}

export interface CommentType {
	blog_post_id: number;
	body: string;
	created_at: string;
	id: number;
	updated_at: string;
	user_id: number;
}
