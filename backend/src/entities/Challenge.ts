import { Field, ObjectType, registerEnumType } from "type-graphql";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum ChallengeStatus {
  CREATED = "CREATED",
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
    default: ChallengeStatus.CREATED,
  })
  @Field(() => ChallengeStatus)
  status: ChallengeStatus;
}
