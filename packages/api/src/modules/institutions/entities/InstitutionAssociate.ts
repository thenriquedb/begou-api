import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";

import { UUID } from "@shared/infra/cryptography/UUID";
import { User } from "@modules/accounts/entities/User";
import { Role } from "@modules/accounts/entities/Role";
import { Institution } from "@modules/institutions/entities/Institution";

@Entity("institution_associate")
export class InstitutionAssociate {
  @PrimaryColumn({ length: 36 })
  id: string;

  @Column({ length: 36 })
  institution_id: string;

  @Column({ length: 36 })
  user_id: string;

  @Column({ length: 36 })
  role_id: string;

  @ManyToOne(() => Institution)
  @JoinColumn({ name: "institution_id" })
  institution: Institution;

  @ManyToOne(() => Role)
  @JoinColumn({ name: "role_id" })
  role: Role;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn()
  created_at: string;

  constructor() {
    if (!this.id) {
      this.id = UUID.generate();
    }
  }
}
