import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "./User";
import { Challenge } from "./Challenge";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class UserChallenge {
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
}
