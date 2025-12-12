import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Ecogesture } from "./Ecogesture";

@Entity()
@ObjectType()
export class Challenge extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  label: string;

  @Column()
  @Field()
  description: string;

  @Column({ type: "timestamp" })
  @Field()
  startingDate: Date;

  @Column({ type: "timestamp" })
  @Field()
  endingDate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  picture?: string;

  @ManyToMany(() => Ecogesture)
  @JoinTable({
    name: "challenge_ecogesture",
    joinColumn: { name: "challenge_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "ecogesture_id", referencedColumnName: "id" },
  })
  @Field(() => [Ecogesture], { nullable: true })
  ecogestures: Ecogesture[];
}