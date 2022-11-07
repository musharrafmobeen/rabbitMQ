import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserBackup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
