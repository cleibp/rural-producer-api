import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Producer } from './producer.entity';
import { Crop } from '../../crops/entities/crop.entity';

@Entity()
export class Farm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    farmName: string;

    @Column({ type: 'varchar', length: 100 })
    city: string;

    @Column({ type: 'varchar', length: 2 })
    state: string;

    @Column({ type: 'numeric' })
    totalArea: number;

    @Column({ type: 'numeric' })
    arableArea: number;

    @Column({ type: 'numeric' })
    vegetationArea: number;

    @ManyToOne(() => Producer, (producer) => producer.farms)
    @JoinColumn({ name: 'producerId' })
    producer: Producer;

    @Column()
    producerId: number;

    @OneToMany(() => Crop, (crop) => crop.farm)
    crops?: Crop[]; // Opcional, pois pode não ter culturas
}