import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { UUID } from "@shared/infra/adapters/uuid/UUID";
import { Address } from "@modules/adresses/infra/typeorm/entities/Address";

@Entity("institution")
export class Institution {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: string;

  @OneToOne(() => Address)
  @JoinColumn({ name: "address_id" })
  address: Address;

  constructor() {
    if (!this.id) {
      this.id = UUID.generate();
    }
  }
}
