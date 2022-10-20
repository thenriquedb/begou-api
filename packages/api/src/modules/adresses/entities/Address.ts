import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { UUID } from "@shared/infra/cryptography/UUID";

import { Uf } from "./Uf";
import { City } from "./City";

@Entity("institution_address")
export class Address {
  @PrimaryColumn({ length: 36 })
  id: string;

  @Column()
  street: string;

  @Column()
  neighborhood: string;

  @Column({ nullable: true })
  complement: string;

  @CreateDateColumn()
  created_at: string;

  @ManyToOne(() => City, (city) => city.zip_code)
  @JoinColumn({ name: "zip_code" })
  city: City;

  @ManyToOne(() => Uf, (uf) => uf.initials)
  @JoinColumn({ name: "uf_initials" })
  uf: Uf;

  constructor() {
    if (!this.id) {
      this.id = UUID.generate();
    }
  }
}
