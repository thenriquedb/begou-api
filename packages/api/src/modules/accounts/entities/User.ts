import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Role } from "./Role";

@Entity("user")
class User {
  @PrimaryColumn()
  public id?: string;

  @Column()
  public email: string;

  @Column()
  public name: string;

  @Column({ length: 11 })
  public phone_number: string;

  @Column()
  public password: string;

  @CreateDateColumn()
  public created_at: Date;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: "role_id" })
  role: Role;
  role_id: string;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export { User };
