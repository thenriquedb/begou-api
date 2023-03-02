import { Entity, Column, PrimaryColumn, CreateDateColumn } from "typeorm";

import { UUID } from "@shared/infra/uuid/UUID";

@Entity("animal_personality")
class AnimalPersonality {
  @PrimaryColumn()
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

export { AnimalPersonality };
