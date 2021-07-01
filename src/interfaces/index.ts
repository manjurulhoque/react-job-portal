export interface IUser {
    id: number
    first_name: string
    last_name: string
    date_joined: Date
    role: string
    gender: string
    email: string
}

export interface IApplicant {

}


export interface IJob {
    id: number
    title: string
    description: string
    location: string
    type: string | number
    category: string
    last_date: Date
    company_name?: string
    company_description?: string
    website?: string
    created_at: Date
    filled: boolean
    salary: number
    tags: Array<number> | undefined
    user: IUser
    applicant: any
}