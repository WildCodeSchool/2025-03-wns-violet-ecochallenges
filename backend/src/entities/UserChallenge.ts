import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";
import { User } from "./User";
import { Challenge } from "./Challenge";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class UserChallenge extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @ManyToOne(() => User, (user) => user.participations)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Challenge, (challenge) => challenge.participants)
  @Field(() => Challenge)
  challenge: Challenge;

  @Column({ default: false })
  @Field()
  hasAccepted: boolean;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
