import { Entity, Column, PrimaryColumn, CreateDateColumn } from "typeorm";

import { UUID } from "@shared/infra/adapters/uuid/UUID";

@Entity("role")
class Role {
  @PrimaryColumn({ length: 36 })
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: string;

  constructor() {
    if (!this.id) {
      this.id = UUID.generate();
    }
  }
}

export { Role };
