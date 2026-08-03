export interface IUser {
	id: number;
	first_name: string;
	last_name: string;
	date_joined: Date;
	role: string;
	gender: string;
	email: string;
}

export interface ITag {
	id: number;
	name: string;
}

export interface ICompany {
	id: number;
	name: string;
	slug?: string;
	tagline?: string | null;
	description?: string | null;
	website?: string | null;
	logo?: string | null;
	industry?: string | null;
	headquarters?: string | null;
	size?: string;
	size_display?: string;
	culture_benefits?: string | null;
	is_verified?: boolean;
	featured?: boolean;
	linkedin_url?: string | null;
	facebook_url?: string | null;
	cover_image?: string | null;
	created_at?: string | Date;
	updated_at?: string | Date;
}

export interface IApplicantJob extends IJob {
	job_tags: ITag[];
}

export interface IApplicant {
	id: number;
	job_id: number;
	applied_user: IUser;
	job: IApplicantJob;
	status: string;
	comment: string;
	created_at: Date;
}

export interface IJob {
	id: number;
	title: string;
	description: string;
	responsibilities?: string;
	requirements?: string;
	location: string;
	type: string | number;
	type_display?: string;
	workplace_type?: string;
	workplace_type_display?: string;
	experience_level?: string;
	experience_level_display?: string;
	category?: ICategory | null;
	application_deadline?: string | Date;
	last_date?: Date;
	company?: ICompany | null;
	company_name?: string;
	company_description?: string;
	website?: string | null;
	created_at: Date;
	filled: boolean;
	status?: string;
	status_display?: string;
	salary: number;
	salary_min?: number | null;
	salary_max?: number | null;
	salary_currency?: string;
	salary_period?: string;
	salary_period_display?: string;
	tags: Array<number> | undefined;
	vacancy?: number;
	is_featured?: boolean;
	user: IUser;
	applicant: IApplicant | undefined;
	job_tags?: ITag[];
	total_candidates?: number;
}

export interface ICategory {
	id: number;
	name: string;
	slug: string;
	description?: string;
	icon?: string;
	total_jobs?: number;
}

export interface IPaginated<T> {
	count: number;
	next: string | null;
	previous: string | null;
	results: T[];
}
