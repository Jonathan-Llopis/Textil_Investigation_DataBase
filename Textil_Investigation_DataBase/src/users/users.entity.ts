import { TelaEntity } from '../tela/tela.entity';
import { Entity, Column, PrimaryColumn, JoinTable, ManyToMany } from 'typeorm';

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

  @ManyToMany(() => TelaEntity, (tela) => tela.users)
  @JoinTable()
  telas_favoritas: TelaEntity[];
}
