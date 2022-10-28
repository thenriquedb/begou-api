import { Entity, Column, PrimaryColumn, CreateDateColumn, JoinColumn } from "typeorm";

import { UUID } from "@shared/infra/cryptography/UUID";

@Entity("animal_image")
export class AnimalHealth {
  @PrimaryColumn()
  id: string;

  @Column()
  @JoinColumn({ name: "animal_id" })
  animal_id: string;

  @Column()
  url: string;

  @CreateDateColumn()
  created_at: string;

  constructor() {
    if (!this.id) {
      this.id = UUID.generate();
    }
  }
}
