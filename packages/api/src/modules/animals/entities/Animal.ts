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
import { v4 as uuidV4 } from "uuid";

import { AnimalSize } from "@modules/animals/entities/AnimalSize";
import { Institution } from "@modules/institutions/entities/Institution";
import { Specie } from "@modules/animals/entities/Specie";
import { AnimalHealth } from "@modules/animals/entities/AnimalHealth";
import { AnimalPersonality } from "@modules/animals/entities/AnimalPersonality";
import { AnimalGenre } from "@modules/animals/enums/Genre";

@Entity("animal")
export class Animal {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({
    type: "enum",
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

  @ManyToOne(() => Specie)
  @JoinColumn({ name: "specie_id" })
  specie: Specie;

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
      this.id = uuidV4();
    }
  }
}
