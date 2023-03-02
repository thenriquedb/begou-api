import { Entity, Column, PrimaryColumn } from "typeorm";

import { UUID } from "@shared/infra/adapters/uuid/UUID";

@Entity("adoption_status")
export class AdoptionStatus {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  constructor() {
    if (!this.id) {
      this.id = UUID.generate();
    }
  }
}
