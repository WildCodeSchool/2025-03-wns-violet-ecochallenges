import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEcogesture } from "./UserEcogesture";
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

  @OneToMany(
    () => UserEcogesture,
    (userEcogesture) => userEcogesture.ecogesture
  )
  public UserEcogesture: UserEcogesture[];

  @ManyToMany(() => Challenge, (challenge) => challenge.ecogestures)
  @Field(() => [Challenge], { nullable: true })
  challenges?: Challenge[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
