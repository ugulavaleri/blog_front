export interface BlogPostType {
	body: string;
	created_at: string;
	id: number;
	publish_date: null;
	title: string;
	comments: CommentType[];
	user: User;
	updated_at: string;
	user_id: number;
	views: number;
	last_page: number;
}

export interface CommentType {
	blog_post_id: number;
	body: string;
	created_at: string;
	id: number;
	user: User;
	updated_at: string;
	user_id: number;
}

export interface User {
	id: number;
	name: string;
	email: string;
	email_verified_at: null;
	created_at: string;
	updated_at: string;
}
