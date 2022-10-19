import { Entity, Column, PrimaryColumn, CreateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("specie")
export class Specie {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
