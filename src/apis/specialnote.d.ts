import { Specialty, AddSpecialtyProps, UpdateSpecialtyProps } from "../types/specialnotes";
export declare const getAllSpecialties: (studentId: number) => Promise<Specialty[]>;
export declare const getFilteredSpecialties: (studentId: number) => Promise<Specialty[]>;
export declare const postSpecialty: (studentId: number, specialtyData: AddSpecialtyProps) => Promise<any>;
export declare const updateSpecialty: (specialtyId: number, specialtyData: UpdateSpecialtyProps) => Promise<any>;
export declare const deleteSpecialty: (specialtyId: number) => Promise<void>;
