import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

@Entity("uf")
class Uf {
  @PrimaryColumn({ length: 2 })
  initials: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: string;
}

export { Uf };
