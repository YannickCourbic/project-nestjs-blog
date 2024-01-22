
export class GetAllCategoryDto {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    logo: string | null;
    visibility: boolean;
    parent: number | null;
    createdAt: Date;
    updatedAt: Date | null;
}