import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { UUID } from "@shared/infra/uuid/UUID";
import { AnimalSize } from "@modules/animals/infra/typeorm/entities/AnimalSize";
import { Institution } from "@modules/institutions/infra/typeorm/entities/Institution";
import { Specie } from "@modules/animals/infra/typeorm/entities/Specie";
import { AnimalHealth } from "@modules/animals/infra/typeorm/entities/AnimalHealth";
import { AnimalPersonality } from "@modules/animals/infra/typeorm/entities/AnimalPersonality";
import { StageOfLife } from "@modules/animals/infra/typeorm/entities/StageOfLife";
import { AnimalGenre } from "@modules/animals/enums/Genre";

@Entity("animal")
export class Animal {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  available: boolean;

  @Column({
    type: "varchar",
    enum: AnimalGenre,
  })
  genre: AnimalGenre;

  @Column()
  description: string;

  @ManyToOne(() => AnimalSize)
  @JoinColumn({ name: "size_id" })
  size: AnimalSize;

  @ManyToOne(() => Institution)
  @JoinColumn({ name: "institution_id" })
  institution: Institution;

  @Column()
  institution_id: string;

  @ManyToOne(() => Specie)
  @JoinColumn({ name: "specie_id" })
  specie: Specie;

  @ManyToOne(() => StageOfLife)
  @JoinColumn({ name: "stage_of_life_id" })
  stage_of_life: StageOfLife;

  @ManyToMany(() => AnimalHealth)
  @JoinTable({
    name: "animal_has_health",
    joinColumn: { name: "animal_id" },
    inverseJoinColumn: { name: "health_id" },
  })
  healths: AnimalHealth[];

  @ManyToMany(() => AnimalPersonality)
  @JoinTable({
    name: "animal_has_personality",
    joinColumn: { name: "animal_id" },
    inverseJoinColumn: { name: "personality_id" },
  })
  personalities: AnimalPersonality[];

  @CreateDateColumn()
  created_at: string;

  constructor() {
    if (!this.id) {
      this.id = UUID.generate();
    }

    this.available = true;
  }
}
