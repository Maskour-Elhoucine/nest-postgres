import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from '../../helpers/entity.helper';
import * as bcrypt from 'bcryptjs';
import { AuthProvidersEnum } from '../../auth/auth-providers.enum';
import { FileEntity } from '../../files/file.entity';
import { Role } from '../../roles/entities/role.entity';
import { Status } from '../../status/entities/status.entity';
import { v4 } from 'uuid';

@Entity()
export class User extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @Column({ default: AuthProvidersEnum.EMAIL })
  provider: string;

  @Index()
  @Column({ nullable: true })
  socialId: string | null;

  @Index()
  @Column({ nullable: false })
  firstName: string;

  @Index()
  @Column({ nullable: false })
  lastName: string;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  photo: FileEntity | null;

  @ManyToOne(() => Role, {
    eager: true,
  })
  role: Role;

  @ManyToOne(() => Status, {
    eager: true,
  })
  status: Status;

  @Column({ nullable: true })
  @Index()
  hash: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
