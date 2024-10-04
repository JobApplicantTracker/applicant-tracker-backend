import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ApplyJobDto {
    @IsString()
    @IsNotEmpty()
    userEmail: string;

    @IsInt()
    @IsNotEmpty()
    jobId: number;
}