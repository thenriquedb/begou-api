import { Entity, Column, PrimaryColumn, CreateDateColumn } from "typeorm";

import { UUID } from "@shared/infra/uuid/UUID";

@Entity("specie")
export class Specie {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: string;

  constructor() {
    if (!this.id) {
      this.id = UUID.generate();
    }
  }
}
