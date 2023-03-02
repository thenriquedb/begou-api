import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

import { UUID } from "@shared/infra/uuid/UUID";

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

  constructor() {
    if (!this.id) this.id = UUID.generate();
  }
}

export { User };
