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

export enum ChallengeTimeStatus {
  UPCOMING = "UPCOMING",
  IN_PROGRESS = "IN_PROGRESS",
  TERMINATED = "TERMINATED",
}

registerEnumType(ChallengeTimeStatus, {
  name: "ChallengeTimeStatus",
  description:
    "The temporal status of a challenge based on start and end dates",
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
    enum: ChallengeTimeStatus,
    default: ChallengeTimeStatus.UPCOMING,
  })
  @Field(() => ChallengeTimeStatus)
  status: ChallengeTimeStatus;

  @ManyToOne(() => User, (user) => user.challengesCreated)
  @Field(() => User)
  createdBy: User;

  @OneToMany(() => UserChallenge, (userChallenge) => userChallenge.challenge)
  @Field(() => [UserChallenge])
  participants: Relation<UserChallenge[]>;
}
