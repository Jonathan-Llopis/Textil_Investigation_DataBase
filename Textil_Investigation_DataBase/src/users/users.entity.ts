import {
  Entity,
  Column,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryColumn()
  id_user: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  token: string;

  @Column({ type: 'timestamp', nullable: true })
  tokenExpiration: Date;
}
