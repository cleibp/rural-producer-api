import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Farm } from '../../producers/entities/farm.entity';

@Entity()
export class Crop {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    harvest: string;

    @Column({ type: 'varchar', length: 255 })
    plantedCrop: string;

    @ManyToOne(() => Farm, (farm) => farm.crops)
    @JoinColumn({ name: 'farmId' })
    farm: Farm;

    @Column()
    farmId: number;
}