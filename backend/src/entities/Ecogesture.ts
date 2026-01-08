import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEcogesture } from "./UserEcogesture";

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
}
