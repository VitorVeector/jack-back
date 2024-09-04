import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './DTO/CreateTaskDTO';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    findAll(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.taskRepository.create(createTaskDto);
        return this.taskRepository.save(task);
    }

    async markAsCompleted(id: number): Promise<Task> {
        const task = await this.taskRepository.findOneBy({ id });

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        task.isCompleted = true;
        return this.taskRepository.save(task);
    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }
}
