import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Address } from "../../adresses/entities/Address";

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
  address_id: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
