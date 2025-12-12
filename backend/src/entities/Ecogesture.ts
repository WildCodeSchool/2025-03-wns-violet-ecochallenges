import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Challenge } from "./Challenge";

@Entity()
@ObjectType()
export class Ecogesture extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  label: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  pictureUrl: string;

  @Column()
  @Field()
  level1Expectation: string;

  @Column()
  @Field()
  level2Expectation: string;

  @Column()
  @Field()
  level3Expectation: string;

  @ManyToMany(() => Challenge, (challenge) => challenge.ecogestures)
  challenges: Challenge[];
}
