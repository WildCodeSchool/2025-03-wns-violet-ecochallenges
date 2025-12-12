import { Field, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Relation,
} from "typeorm";
import { User } from "./User";
import { UserChallenge } from "./UserChallenge";

export enum ChallengeStatus {
  IN_PROGRESS = "IN_PROGRESS",
  TERMINATED = "TERMINATED",
}

registerEnumType(ChallengeStatus, {
  name: "ChallengeStatus",
  description: "The status of a challenge",
});

@Entity()
@ObjectType()
export class Challenge extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  label: string;

  @Column({ type: "timestamp" })
  @Field()
  startingDate: Date;

  @Column({ type: "timestamp" })
  @Field()
  endingDate: Date;

  @Column()
  @Field()
  picture: string;

  @Column({
    type: "enum",
    enum: ChallengeStatus,
    default: ChallengeStatus.IN_PROGRESS,
  })
  @Field(() => ChallengeStatus)
  status: ChallengeStatus;

  @ManyToOne(() => User, (user) => user.challengesCreated)
  @Field(() => User)
  createdBy: User;

  @OneToMany(() => UserChallenge, (userChallenge) => userChallenge.challenge)
  @Field(() => [UserChallenge])
  participants: Relation<UserChallenge[]>;
}
