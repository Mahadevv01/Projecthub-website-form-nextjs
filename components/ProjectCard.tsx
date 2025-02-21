import { Project, Author } from "@/sanity.types";

export type ProjectTypeCard = Omit<Project, 'author'> & {author ? : Author};