import { Entity, PrimaryColumn, JoinColumn, ManyToOne, CreateDateColumn } from "typeorm";

import { UUID } from "@shared/infra/cryptography/UUID";
import { User } from "@modules/accounts/entities/User";
import { Animal } from "@modules/animals/infra/typeorm/entities/Animal";
import { Institution } from "@modules/institutions/entities/Institution";
import { AdoptionStatus } from "@modules/adoptions/entities/AdoptionStatus";

@Entity("adoption_request")
export class AdoptionRequest {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Animal)
  @JoinColumn({ name: "animal_id" })
  animal: Animal;

  @ManyToOne(() => Institution)
  @JoinColumn({ name: "institution_id" })
  institution: Institution;

  @ManyToOne(() => AdoptionStatus)
  @JoinColumn({ name: "status_id" })
  status: AdoptionStatus;

  @CreateDateColumn()
  created_at: string;

  constructor() {
    if (!this.id) {
      this.id = UUID.generate();
    }
  }
}
