import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

@Entity("city")
class City {
  @PrimaryColumn({ length: 8 })
  zip_code: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: string;
}

export { City };
