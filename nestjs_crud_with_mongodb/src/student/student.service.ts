import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IStudent } from 'src/interfaces/student.interface';
import { Model } from 'mongoose';
import { CreateStudentDto } from 'src/dtos/create-student.dto';
import { UpdateStudentDto } from 'src/dtos/update-student.dto';

@Injectable()
export class StudentService {
    constructor(@InjectModel('Student') private studentModel: Model<IStudent>){}

    async createStudent(createStudentDto: CreateStudentDto): Promise<IStudent> {
        const newStudent = await new this.studentModel(createStudentDto);
        return newStudent.save();
    }

    async updateStudent(studentId: string, updateStudentDto: UpdateStudentDto): Promise<IStudent> {
        try{
            const existingStudent = await this.studentModel.findByIdAndUpdate(studentId, updateStudentDto, {new : true});
            return existingStudent;
        }
        
        catch (err)
        {
            console.log("ASDFASDFASDFASDFASDFASDFSADFASDF");
            throw new NotFoundException(`Student #${studentId} not found`);
        }
        
        
    }

    async getAllStudents(): Promise<IStudent[]> {
        try{
            const studentData = await this.studentModel.find();
            return studentData;
        }
        
        catch (err)
        {
            throw new NotFoundException('Students data not found !');
        }
        
    }

    async getStudent(studentId: string): Promise<IStudent> {
        try{
            const existingStudent = await this.studentModel.findById(studentId).exec();
            return existingStudent;
        }
        
        catch (err)
        {
            throw new NotFoundException(`Student #${studentId} not found`);
        }
        
    }

    async deleteStudent(studentId: string): Promise<IStudent> {
        const deletedStudent = await this.studentModel.findByIdAndDelete(studentId);
        if (!deletedStudent){
            throw new NotFoundException(`Student #${studentId} not found`);
        }
        return deletedStudent;
    }


}
